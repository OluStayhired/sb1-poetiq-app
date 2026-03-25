// src/components/EligibilityPillModal.tsx
import React, { useState, useEffect, useRef } from 'react';
import { 
  X, 
  Send, 
  Mail, 
  CheckCircle2, 
  Sparkles,
  ArrowUpRight,
  Loader2,
  Shield,
  AlertCircle,
  Minimize2,
  MessageCircle,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { z } from 'zod';
import { supabase } from '../lib/supabase';
import { getLongTermCareSupport } from '../lib/geminiLongTermCareSupport';
import { TooltipHelp } from '/src/utils/TooltipHelp';
import { TypingEffect } from './TypingEffect';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string | React.ReactNode;
  timestamp: Date;
}

const newsletterSchema = z.object({
  email: z.string().email('Invalid email address'),
});

export function EligibilityPillModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '0',
      role: 'assistant',
      //content: "Hi I'm Ellie, your Long-Term Care Assistant. I'm here to answer all your questions about healthcare insurance and Medicaid eligibility. How can I help you today?",
      content:"Hi I'm Ellie, happy to answer your questions about long term care eligibility. How can I help you today?",
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [email, setEmail] = useState('');
  const [welcomeMail, setWelcomeMail] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [error, setError] = useState('');
  const [sessionId, setSessionId] = useState<string>('');
  const [showQuotaAlert, setShowQuotaAlert] = useState(false);
  const [quotaMessage, setQuotaMessage] = useState('');
  const [quotaEmail, setQuotaEmail] = useState('');
  const [isPillVisible, setIsPillVisible] = useState(true);
  const [lastTypedMessageId, setLastTypedMessageId] = useState<string>('1'); // Track the last message that had typing effect



  const messagesEndRef = useRef<HTMLDivElement>(null);
  const dailyQuota = 10;

  const suggestedQuestions = [
    "What are basic eligibility requirements for LTC insurance?",
    "How do pre-existing conditions affect eligibility?"
  ];

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Generate or retrieve session_id on component mount
  useEffect(() => {
    let storedSessionId = localStorage.getItem('medicaid_session_id');
    
    if (!storedSessionId) {
      storedSessionId = `session_${Date.now()}_${Math.random().toString(36).substring(7)}`;
      localStorage.setItem('medicaid_session_id', storedSessionId);
    }
    
    setSessionId(storedSessionId);
  }, []);

  // Check if user has reached daily quota
  const checkDailyQuota = async (sessionId: string): Promise<boolean> => {
    try {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const todayISO = today.toISOString();

      const { data, error } = await supabase
        .from('eldercare_medicaid_responses')
        .select('id')
        .eq('session_id', sessionId)
        .gte('created_at', todayISO);

      if (error) {
        console.error('Error checking quota:', error);
        return false;
      }

      return (data?.length || 0) >= dailyQuota;
    } catch (error) {
      console.error('Error in checkDailyQuota:', error);
      return false;
    }
  };

  // Insert question and answer into database
  const insertQuestionAnswer = async (
    sessionId: string,
    question: string,
    answer: string
  ): Promise<boolean> => {
    try {
      const { error } = await supabase
        .from('eldercare_medicaid_responses')
        .insert({
          session_id: sessionId,
          questions: question,
          answers: answer,
          created_at: new Date().toISOString()
        });

      if (error) {
        console.error('Error inserting data:', error);
        return false;
      }

      return true;
    } catch (error) {
      console.error('Error in insertQuestionAnswer:', error);
      return false;
    }
  };

  // Update all session records with user email
  const updateSessionEmail = async (
    sessionId: string,
    userEmail: string
  ): Promise<boolean> => {
    try {
      if (!userEmail.trim()) {
        return true;
      }

      const { error } = await supabase
        .from('eldercare_medicaid_responses')
        .update({ user_email: userEmail })
        .eq('session_id', sessionId);

      if (error) {
        console.error('Error updating session email:', error);
        return false;
      }

      return true;
    } catch (error) {
      console.error('Error in updateSessionEmail:', error);
      return false;
    }
  };

  // Handle closing quota alert and saving email
  const handleCloseQuotaAlert = async () => {
    if (quotaEmail.trim()) {
      await updateSessionEmail(sessionId, quotaEmail);
    }
    
    setShowQuotaAlert(false);
    setQuotaEmail('');
  };

  // Handle sending a message with Gemini integration
  const handleSendMessage = async (content: string) => {
    if (!content.trim()) return;

    // Check daily quota before proceeding
    const hasReachedQuota = await checkDailyQuota(sessionId);
    
    if (hasReachedQuota) {
      setQuotaMessage('You have reached the maximum of 5 questions per day. Please try again tomorrow or leave your email to continue the conversation.');
      setShowQuotaAlert(true);
      return;
    }

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: content,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    try {
      // Call Gemini API to generate response
      const geminiResponse = await getLongTermCareSupport(content, '800');
      
      if (!geminiResponse.error && geminiResponse.text) {
        const assistantMessage: Message = {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content: geminiResponse.text,
          timestamp: new Date()
        };
        
        setMessages(prev => [...prev, assistantMessage]);
        await insertQuestionAnswer(sessionId, content, geminiResponse.text);
      } else {
        console.error('Error from Gemini:', geminiResponse.error);
        const errorMessage: Message = {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content: "I'm having trouble processing that right now. Could you please try rephrasing your question about long term care insurance?",
          timestamp: new Date()
        };
        setMessages(prev => [...prev, errorMessage]);
      }
    } catch (error) {
      console.error('Error calling Gemini:', error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: "I'm experiencing technical difficulties. Please try again in a moment.",
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  // Handle email submission
  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    setIsSending(true);

    try {
      newsletterSchema.parse({ email });
      setWelcomeMail(true);

      const { error: supabaseError } = await supabase.from('newsletter_list').insert({
        email: email,
        welcome_email: welcomeMail,
        project_name: 'poetiq community',
      });

      if (supabaseError) {
        if (supabaseError.code === '23505') {
          setError("You're already subscribed to our newsletter!");
        } else {
          console.error("Supabase Error:", supabaseError);
          setError(`Failed to join newsletter: ${supabaseError.message || 'An unexpected database error occurred.'}`);
        }
        return;
      }

      setEmailSent(true);
      setTimeout(() => {
        setEmailSent(false);
        setEmail('');
      }, 3000);
    } catch (error) {
      console.error('Error subscribing to newsletter:', error);
    } finally {
      setIsSending(false);
    }
  };

  const toggleOpen = () => {
    setIsOpen(!isOpen);
    setIsMinimized(false);
  };

  const toggleMinimize = () => {
    setIsMinimized(!isMinimized);
  };

  const closeCompletely = () => {
    setIsOpen(false);
    setIsMinimized(false);
  };

  return (
    <>
      {/* Floating Pill Button - Always visible */}
      {isPillVisible && !isOpen && (
      //<div className="fixed bottom-6 right-6 z-40 animate-bounce-subtle">
        <div className="fixed bottom-6 right-1 -translate-x-1/2 sm:left-auto sm:right-6 sm:translate-x-0 z-40 animate-bounce-subtle">

          <button
            onClick={toggleOpen}
            //className="group relative bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white rounded-full shadow-2xl hover:shadow-red-500/50 transition-all duration-300 hover:scale-105 active:scale-95 pl-4 pr-6 py-3 flex items-center space-x-3 border-2 border-red-400"

            //className="group relative bg-gradient-to-r from-gray-700 via-gray-800 to-gray-900 hover:from-red-600 hover:to-red-700 text-white rounded-full shadow-2xl hover:shadow-red-500/50 transition-all duration-300 hover:scale-105 active:scale-95 p-0 sm:pl-4 sm:pr-6 sm:py-3 flex items-center space-x-3 border-4 border-red-400 hover:sm:border-red-400 hover:border-green-400"

            className="group relative bg-gradient-to-r from-gray-700 via-gray-800 to-gray-900 text-white rounded-full shadow-2xl hover:shadow-red-500/50 transition-all duration-300 hover:scale-105 active:scale-95 p-0 sm:pl-4 sm:pr-6 sm:py-3 flex items-center space-x-3 border-4 border-red-400 hover:sm:border-green-400 hover:border-green-400"
          >
            {/* Ellie's Avatar */}
            <div className="relative w-20 h-20 sm:w-12 sm:h-12 flex-shrink-0">
              <div className="w-full h-full rounded-full overflow-hidden border-2 border-white shadow-lg">
                <img
                  src="https://selrznkggmoxbpflzwjz.supabase.co/storage/v1/object/public/poetiq_homepage/ellie_ai_square.png"
                  alt="Ellie"
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Online status indicator */}
          <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 rounded-full border-2 sm:border-white animate-ping sm:animate-ping"></div>
              <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 rounded-full"></div>
            </div>

            {/* Text Content */}
            <div className="hidden sm:flex flex-col items-start">
              <div className="flex items-center space-x-1.5">
                <span className="font-bold text-sm sm:text-base">Ask Ellie</span>
                <Sparkles className="w-4 h-4 animate-pulse" />
              </div>
              <span className="text-xs text-red-100 font-medium">Long-Term Care Assistant</span>
              {/*<span className="sm:hidden text-xs text-red-100 font-medium">Care Assistant</span>*/}
            </div>

            {/* Pulsing dot indicator */}
            <div className="hidden absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-ping"></div>
            <div className="hidden absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full"></div>
          </button>
        </div>
      )}

      {/* Expanded Chat Modal */}
      {isOpen && (
        <div className={`fixed bottom-6 right-6 z-40 transition-all duration-300 ${isMinimized ? 'w-80' : 'w-80 sm:w-[480px]'}`}>
          {/* Quota Limit Alert Popup */}
          {showQuotaAlert && (
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 rounded-xl">
              <div className="bg-white rounded-lg shadow-2xl p-6 max-w-md mx-4">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <AlertCircle className="w-8 h-8 text-red-500" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-gray-900 mb-2">Daily Limit Reached</h3>
                    <p className="text-sm text-gray-700 mb-4">{quotaMessage}</p>
                    
                    <div className="mb-4">
                      <label htmlFor="quota-email" className="block text-sm font-medium text-gray-700 mb-2">
                        Enter your email to receive this conversation (optional)
                      </label>
                      <input
                        id="quota-email"
                        type="email"
                        value={quotaEmail}
                        onChange={(e) => setQuotaEmail(e.target.value)}
                        placeholder="your.email@example.com"
                        className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none"
                      />
                    </div>

                    <button
                      onClick={handleCloseQuotaAlert}
                      className="w-full px-4 py-2 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600 transition-colors"
                    >
                      {quotaEmail.trim() ? 'Save & Close' : 'Got it'}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/*<div className="bg-white rounded-xl shadow-2xl flex flex-col overflow-hidden border border-gray-200">*/}
          <div className="bg-white rounded-xl shadow-2xl flex flex-col overflow-hidden border border-gray-200 max-h-[calc(100vh-100px)]">

            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 bg-gradient-to-r from-red-500 to-red-600 border-b border-red-400">
              <div className="flex items-center space-x-3">
                {/* Ellie's Avatar in Header */}
                <div className="relative w-10 h-10 flex-shrink-0">
                  <div className="w-full h-full rounded-full overflow-hidden border-2 border-white shadow-md">
                    <img
                      src="https://selrznkggmoxbpflzwjz.supabase.co/storage/v1/object/public/poetiq_homepage/ellie_ai_square.png"
                      alt="Ellie"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-400 rounded-full border-2 border-white"></div>
                </div>

                <div className="flex flex-col">
                  <h2 className="text-lg font-bold text-white flex items-center space-x-1">
                    <span>Ellie</span>
                    <Sparkles className="w-4 h-4" />
                  </h2>
                  <p className="text-xs text-red-100 font-medium">Long-Term Care Specialist</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-1">
                <button
                  onClick={toggleMinimize}
                  className="p-1.5 hover:bg-red-700 rounded-lg transition-colors"
                  title={isMinimized ? "Expand" : "Minimize"}
                >
                  {isMinimized ? (
                    <ChevronUp className="w-5 h-5 text-white" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-white" />
                  )}
                </button>
                <button
                  onClick={closeCompletely}
                  className="p-1.5 hover:bg-red-700 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5 text-white" />
                </button>
              </div>
            </div>

            {/* Chat Content - Only show when not minimized */}
            {!isMinimized && (
              <>
                {/* Confidence Message Banner */}
                <div className="hidden sm:block bg-gradient-to-r from-red-50 to-rose-50 px-4 py-3 border-b border-red-100">
                  <div className="flex items-start space-x-2">
                    <Shield className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs text-gray-700 leading-relaxed">
                        <span className="font-semibold text-red-600">Expert guidance at your fingertips.</span> I'll answer all your questions about healthcare insurance and Medicaid eligibility with accuracy and care.
                      </p>                 
                    </div>
                  </div>
                </div>

                {/* Messages Area */}
                {/*<div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50 h-[400px]">*/}
                <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50 min-h-[300px] max-h-[300px]">

                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      {message.role === 'assistant' && (
                        <div className="flex-shrink-0 mr-2">
                          <div className="relative w-7 h-7">
                            <div className="w-full h-full rounded-full overflow-hidden border-2 border-red-200">
                              <img
                                src="https://selrznkggmoxbpflzwjz.supabase.co/storage/v1/object/public/poetiq_homepage/ellie_ai_square.png"
                                alt="Ellie"
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div className="absolute bottom-0 right-0 w-2 h-2 bg-green-500 rounded-full border border-white"></div>
                          </div>
                        </div>
                      )}

                      <div className="flex flex-col max-w-[75%]">
                        {message.role === 'assistant' && (
                          <span className="text-xs font-semibold text-red-600 mb-1 ml-1">Ellie</span>
                        )}
                        
                        <div
                          className={`rounded-lg p-3 ${
                            message.role === 'user'
                              ? 'bg-red-500 text-white'
                              : 'bg-white text-gray-900 border border-gray-200 shadow-sm'
                          }`}
                        >
                          
                          {/*This section ensures the gaps are persisted once typed*/}

                          <p className="text-xs leading-relaxed whitespace-pre-wrap">
                            {message.role === 'assistant' ? (
                              typeof message.content === 'string' ? (
                            // Only show typing effect for the most recent assistant message that hasn't been typed yet
                              message.id !== lastTypedMessageId && message.id === messages.filter(m => m.role === 'assistant').pop()?.id ? (
                                <TypingEffect 
                                  text={message.content} 
                                  speed={20}
                                  onComplete={() => setLastTypedMessageId(message.id)}
                                />
                            ) : (
                              // Apply the same formatting to completed messages
                              (() => {
                                const sentences = message.content.split(/(?<=[.!?])\s+/);
                                let result = '';
                                sentences.forEach((sentence, index) => {
                                  result += sentence;
                                  if ((index + 1) % 2 === 0 && index !== sentences.length - 1) {
                                    result += '\n\n';
                                  } else if (index !== sentences.length - 1) {
                                    result += ' ';
                                  }
                                });
                                return result;
                              })()
                              )
                            ) : (
                              message.content
                              )
                            ) : (
                              message.content
                            )}
                          </p>

                          {/*
                          <p className="text-xs leading-relaxed">
                            {message.role === 'assistant' ? (
                              typeof message.content === 'string' ? (
      // Only show typing effect for the most recent assistant message that hasn't been typed yet
                              message.id !== lastTypedMessageId && message.id === messages.filter(m => m.role === 'assistant').pop()?.id ? (
                                <TypingEffect 
                                  text={message.content} 
                                  speed={20}
                                  onComplete={() => setLastTypedMessageId(message.id)}
                                />
                            ) : (
                              message.content
                              )
                            ) : (
                              message.content
                              )
                            ) : (
                              message.content
                            )}
                          </p>
                          */}

                          {/*
                          <p className="text-xs leading-relaxed">
                            {message.role === 'assistant' ? (
                              typeof message.content === 'string' ? (
                                <TypingEffect text={message.content} speed={20} />
                              ) : (
                                message.content
                              )
                            ) : (
                              message.content
                            )}
                          </p>
                          */}
                          
                          <p className={`text-xs mt-1 ${message.role === 'user' ? 'text-red-100' : 'text-gray-500'}`}>
                            {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}

                  {isTyping && (
                    <div className="flex justify-start">
                      <div className="bg-white rounded-lg p-3 border border-gray-200 shadow-sm">
                        <div className="flex items-center space-x-2">
                          <Loader2 className="w-4 h-4 text-red-500 animate-spin" />
                          <span className="text-xs text-gray-600">Ellie is typing...</span>
                        </div>
                      </div>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>

                {/* Suggested Questions */}
                <div className="hidden px-4 py-2 bg-gray-50 border-t border-gray-200">
                  <div className="flex flex-wrap gap-2">
                    {suggestedQuestions.map((question, index) => (
                      <button
                        key={index}
                        onClick={() => handleSendMessage(question)}
                        className="text-xs px-3 py-1.5 bg-white border border-red-200 text-red-600 rounded-full hover:bg-red-50 hover:border-red-300 transition-all duration-200 shadow-sm hover:shadow-md"
                      >
                        {question}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Input Area */}
                <div className="border-t border-gray-200 p-4 bg-white">
                  <div className="flex items-end space-x-2 mb-3">
                    <textarea
                      rows={2}
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      onKeyPress={(e) => {
                        if (e.key === 'Enter' && !e.shiftKey) {
                          e.preventDefault();
                          handleSendMessage(inputValue);
                        }
                      }}
                      placeholder="Ask me about long-term care"
                      className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none resize-none"
                    />
                    
                    <button
                      onClick={() => handleSendMessage(inputValue)}
                      disabled={!inputValue.trim()}
                      className={`p-2.5 rounded-lg transition-all ${
                        inputValue.trim()
                          ? 'bg-red-500 hover:bg-red-600 shadow-lg shadow-red-500/50'
                          : 'bg-gray-300 cursor-not-allowed'
                      }`}
                    >
                      <ArrowUpRight className="w-5 h-5 text-white" />
                    </button>
                  </div>

                  {/* Email Newsletter Section */}
                  <div className="bg-gradient-to-r from-red-50 to-rose-50 rounded-lg p-3 border border-red-100">
                    <form onSubmit={handleEmailSubmit} className="flex items-center space-x-2">
                      <Mail className="w-4 h-4 text-red-500 flex-shrink-0" />
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value);
                          setError('');
                        }}
                        placeholder="Subscribe to Newsletter"
                        className="flex-1 px-2 py-1.5 text-xs border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none"
                      />
                      <TooltipHelp className="font-normal" text="Subscribe Now">
                        <button
                          type="submit"
                          disabled={isSending || !email.trim()}
                          className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all flex items-center space-x-1 ${
                            emailSent
                              ? 'bg-green-500 text-white'
                              : email.trim()
                              ? 'bg-red-500 text-white hover:bg-red-600'
                              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                          }`}
                        >
                          {emailSent ? (
                            <>
                              <CheckCircle2 className="w-3 h-3" />
                              <span>Done!</span>
                            </>
                          ) : (
                            <>
                              <Send className="w-3 h-3" />
                              <span className="hidden sm:inline">Send</span>
                            </>
                          )}
                        </button>
                      </TooltipHelp>
                    </form>
                    {error && (
                      <p className="text-xs text-red-600 mt-1 flex items-center space-x-1">
                        <X className="w-3 h-3" />
                        <span>{error}</span>
                      </p>
                    )}
                  </div>
                </div>
              </>
            )}

            {/* Minimized View */}
            {isMinimized && (
              <div className="p-4 bg-gray-50 text-center">
                <p className="text-sm text-gray-600 font-medium">Chat minimized</p>
                <p className="text-xs text-gray-500 mt-1">Click the arrow to continue chatting</p>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default EligibilityPillModal;
