// src/components/EligibilityModal.tsx
import React, { useState, useEffect, useRef } from 'react';
import { 
  X, 
  Send, 
  Upload, 
  Mail, 
  CheckCircle2, 
  User,
  Sparkles,
  FileText,
  ArrowUpRight,
  Loader2,
  Brain,
  Shield,
  AlertCircle
  //CircleAlert
} from 'lucide-react';
import { z } from 'zod';
import { supabase } from '../lib/supabase';
import { getLongTermCareSupport } from '../lib/geminiLongTermCareSupport';
import { TooltipExtended } from '/src/utils/TooltipExtended';
import { TooltipHelp } from '/src/utils/TooltipHelp';
import { TypingEffect } from './TypingEffect'

interface EligibilityModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string | React.ReactNode;
  timestamp: Date;
}


const newsletterSchema = z.object({
  email: z.string().email('Invalid email address'),
});

export function EligibilityModal({ isOpen, onClose }: EligibilityModalProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '0',
      role: 'assistant',
      //content: "Hi I'm Ellie, here to help you with long term care insurance. What questions do you have about LTCI eligibility?",
      content: "Hi I'm Ellie, happy to answer your questions about long term care insurance.",
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

  // New state variables for the declarations
  const [sessionId, setSessionId] = useState<string>('');
  const [showQuotaAlert, setShowQuotaAlert] = useState(false);
  const [quotaMessage, setQuotaMessage] = useState('');
  const [quotaEmail, setQuotaEmail] = useState('');

  const [lastTypedMessageId, setLastTypedMessageId] = useState<string>('1'); // Track the last message that had typing effect



  
  const [currentQuestions, setCurrentQuestions] = useState<string[]>([
  "Tell me basic eligibility requirements for LTC insurance?",
  "How do pre-existing conditions affect LTCI eligibility?"
]);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  //const [isGeneratingResponse, setIsGeneratingResponse] = useState(false);

  const prewrittenQuestions = [
    //"What are the basic eligibility requirements for long term care insurance?",
    "Tell me basic eligibility requirements for LTC insurance?",
    "How do pre-existing conditions affect LTCI eligibility?"
  ];

  // Auto-scroll to bottom when new messages arrive
  
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);
  
// Generate or retrieve session_id on component mount
useEffect(() => {
  let storedSessionId = localStorage.getItem('medicaid_session_id');
  
  if (!storedSessionId) {
    // Generate a new session ID (timestamp + random string)
    storedSessionId = `session_${Date.now()}_${Math.random().toString(36).substring(7)}`;
    localStorage.setItem('medicaid_session_id', storedSessionId);
  }
  
  setSessionId(storedSessionId);
}, []);

 

  if (!isOpen) return null;

  
 
  // Simulate typing effect
  const simulateTyping = async (text: string) => {
    setIsTyping(true);
    
    // Simulate AI processing time
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const newMessage: Message = {
      id: Date.now().toString(),
      role: 'assistant',
      content: text,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, newMessage]);
    setIsTyping(false);
  };

  // Handle topic selection from the left panel
const handleMedicaidTopic = async (topic: string) => {
  // Define topic configurations
  const topicConfig: Record<string, { message: string | React.ReactNode; questions: string[] }> = {
    "Starting a Long Term Care Application": {
      message: "Applying for long-term elder care in the U.S. involves filling out numerous, often complex, forms for programs like Medicaid or VA benefits, requiring extensive documentation of personal, financial (bank statements, income, assets, insurance), and medical information to prove eligibility for facility care or home-based support. The process can be lengthy, so having documents like proof of identity, income, and assets ready is crucial.",
      questions: [
        "What documents do I need?",
        "Tell me how to start my application?",
        "How do I access VA Long Term Care?"
      ]
    },
    "Understanding LTCI eligibility criteria": {
       message: "Eligibility for long-term care (LTC) insurance is primarily determined by your age and current health status, which are assessed through a rigorous underwriting process. You must generally apply while you are still healthy enough to not need care in the near future. To qualify for coverage, insurance companies conduct a thorough review of your medical history, which may include health questionnaires, a review of medical records, and potentially a medical exam.",
       questions: [
         "What are the key factors for eligibility?", 
         "Once I have a policy what's next?",
         "What if my application gets rejected?"
       
       ]
     },
    "Navigating pre-existing condition questions": {
      message: "Long-term care (LTC) insurance, pre-existing conditions are a major hurdle, often leading to denial or exclusions, as insurers assess immediate risk of needing care, with conditions like dementia, Parkinson's, advanced diabetes, or recent major surgery being red flags; however, managing conditions well, shopping around for insurers with different risk appetites, and considering disease-specific plans can improve chances, but generally, good health at application is key.",
      questions: [
        "What do insurers look for?",
        "How do insurers handle pre-existing conditions?",
        "What to do if I have a condition?"       
      ]
    },
    "Reviewing health underwriting issues": {
  message: ( 
    <>
      Generally, reviewing health underwriting issues requires understanding the legal framework, particularly the Affordable Care Act (ACA), and the specific underwriting methods used by different types of plans.
      <br />
      <br />
      <b>The Regulatory Context: Affordable Care Act (ACA)</b>
      <br />
      For qualified individual and group health plans that comply with the ACA, medical underwriting based on pre-existing conditions is largely banned.
      <br />
      <br />
      <b>Guaranteed Coverage:</b> Insurers generally cannot deny coverage or charge higher premiums due to a person's current or past health status (pre-existing conditions).
      <br />
      <br />
      <b>Limited Rating Factors:</b> Premiums for these plans can only be based on a few factors: age, geography, family size, and tobacco use.
      <br />
      <br />
      <b>No Pre-existing Condition Exclusions:</b> The ACA prohibits waiting periods or exclusions for pre-existing conditions in compliant plans.
    </>
  ),
  questions: [
    "Which plans are subject to underwritting?",
    "What to do if my plan allows underwritting?"
  ]
}




    // Add more topics here as needed in the future
    // "Understanding LTCI eligibility criteria": {
    //   message: "Your message here",
    //   questions: ["Question 1", "Question 2"]
    // }
  };

  
   // Get the configuration for the selected topic
    const config = topicConfig[topic];
    
    if (config) {
      // First, add user message showing the topic they clicked
      const userTopicMessage: Message = {
        id: Date.now().toString(),
        role: 'user',
        content: topic,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, userTopicMessage]);
      
      // Show typing indicator
      setIsTyping(true);
      
      // Simulate AI processing time
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Add assistant message with the topic-specific content
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: config.message,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, assistantMessage]);
      
      // Update the prewritten questions
      setCurrentQuestions(config.questions);

      // Hide typing indicator
      setIsTyping(false);
    }
};

//----------- Start Helper Functions for Processing ------------//

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

    return (data?.length || 0) >= 5;
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
//------------ End Helper Functions for Processing -------------//  



//------------- Start Update Session Email After --------------//

// Update all session records with user email
const updateSessionEmail = async (
  sessionId: string,
  userEmail: string
): Promise<boolean> => {
  try {
    if (!userEmail.trim()) {
      // If no email provided, just close the popup
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
//------------- End Update Session Email After --------------//


// Handle closing quota alert and saving email
const handleCloseQuotaAlert = async () => {
  if (quotaEmail.trim()) {
    await updateSessionEmail(sessionId, quotaEmail);
  }
  
  setShowQuotaAlert(false);
  setQuotaEmail(''); // Reset email input
};
  
  
//------------ Start Handle Send Message Function  -------------// 
  // Add this function to handle content generation
  // Handle sending a message
  // Handle sending a message with Gemini integration
  
  {/*  
const handleSendMessage = async (content: string) => {
  if (!content.trim()) return;

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
    //const geminiResponse = await getLongTermCareSupport(content);
    
    if (!geminiResponse.error && geminiResponse.text) {
      // Add AI response to messages
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: geminiResponse.text,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, assistantMessage]);
    } else {
      // Handle error by showing a fallback message
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
    // Show error message to user
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
*/}
  
//--------- End Old HandleSendMessage Without Data Capture ----------------*/} 
  
  // Handle file upload
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const userMessage: Message = {
        id: Date.now().toString(),
        role: 'user',
        content: `📎 Uploaded document: ${file.name}`,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, userMessage]);
      
      simulateTyping("Thank you for uploading your document. I'm reviewing it now. Based on the information provided, I can help you understand your LTCI eligibility better. What specific questions do you have about the document?");
    }
  };
 
//------------- Start Handle New Send Message -----------------//
const handleSendMessage = async (content: string) => {
  if (!content.trim()) return;

  // Check daily quota before proceeding
  const hasReachedQuota = await checkDailyQuota(sessionId);
  
  if (hasReachedQuota) {
    setQuotaMessage('You have reached the maximum of 5 questions per day. Please try again tomorrow.');
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
      // Add AI response to messages
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: geminiResponse.text,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, assistantMessage]);

      // Insert question and answer into database
      await insertQuestionAnswer(sessionId, content, geminiResponse.text);
      
    } else {
      // Handle error by showing a fallback message
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
    // Show error message to user
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


//------------ End Handle Send Message Function  -------------// 

  // Handle email submission
  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    setIsSending(true);
   

    try {
      // Validate input using Zod
      newsletterSchema.parse({ email });
       setWelcomeMail(true);
      
      // Save conversation summary to database
      //const conversationSummary = messages
       // .map(m => `${m.role === 'user' ? 'You' : 'Ellie'}: ${m.content}`)
        //.join('\n\n');

       // Insert data into Supabase
      const { error: supabaseError } = await supabase.from('newsletter_list').insert({
        email: email,
        welcome_email: welcomeMail,
        project_name: 'poetiq community',
      });

      //const { error } = await supabase
        //.from('ltci_conversations')
        //.insert({
          //email: email,
          //conversation: conversationSummary,
          //created_at: new Date().toISOString()
        //});

      //if (supabaseError) throw error;
      
       // --- CRITICAL ERROR HANDLING SECTION ---
      if (supabaseError) {
        // Check for the specific PostgreSQL unique constraint violation error code
        if (supabaseError.code === '23505') {
          setError("You're already subscribed to our newsletter!"); // User-friendly message
        } else {
          // For other Supabase errors, log the technical error for debugging
          console.error("Supabase Error:", supabaseError);
          // And provide a more general user-friendly error message
          setError(`Failed to join newsletter: ${supabaseError.message || 'An unexpected database error occurred.'}`);
        }
        // IMPORTANT: Exit the function here after handling a Supabase error
        return;
      }
      // --- END CRITICAL ERROR HANDLING SECTION ---

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

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">

{/* ----------------  Quota Limit Alert Popup ----------------------- */}

{/*      
{showQuotaAlert && (
  <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 rounded-xl">
    <div className="bg-white rounded-lg shadow-2xl p-6 max-w-md mx-4">
      <div className="flex items-start space-x-4">
        <div className="flex-shrink-0">
          <AlertCircle className="w-8 h-8 text-red-500" />
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-bold text-gray-900 mb-2">Daily Limit Reached</h3>
          <p className="text-sm text-gray-700 mb-4">
            {quotaMessage}
          </p>
          <button
            onClick={() => setShowQuotaAlert(false)}
            className="w-full px-4 py-2 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600 transition-colors"
          >
            Got it
          </button>
        </div>
      </div>
    </div>
  </div>
)}
*/}

{/* ----------------  Quota Limit Alert Popup ----------------------- */}
{showQuotaAlert && (
  <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 rounded-xl">
    <div className="bg-white rounded-lg shadow-2xl p-6 max-w-md mx-4">
      <div className="flex items-start space-x-4">
        <div className="flex-shrink-0">
          <AlertCircle className="w-8 h-8 text-red-500" />
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-bold text-gray-900 mb-2">Daily Limit Reached</h3>
          <p className="text-sm text-gray-700 mb-4">
            {quotaMessage}
          </p>
          
          {/* Email Input Section */}
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

{/*--------------------- End Quota Limit Alert Pop Up ---------------------*/} 

      
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-6xl h-[85vh] flex flex-col relative">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-red-50 rounded-lg">
              <Shield className="w-6 h-6 text-red-500" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">Ask Ellie</h2>
            
          </div>
          
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>
        
        {/* Main Content - Split Layout */}
        <div className="flex-1 flex overflow-hidden">
          {/* Left Side - Ellie's Profile */}
          <div className="hidden sm:flex w-1/3 bg-gradient-to-br from-red-50 to-rose-50 p-6 border-r rounded-bl-xl overflow-y-auto">
            <div className="space-y-6">
              {/* Avatar and Name */}
              <div className="text-center">
                <div className="relative mx-auto w-24 h-24 bg-gradient-to-br from-red-400 to-red-500 rounded-full flex items-center justify-center mb-4 shadow-lg border-4 border-white">
                  <img
              //src="https://selrznkggmoxbpflzwjz.supabase.co/storage/v1/object/public/poetiq_homepage/ltci-care-assistant.png"
              src="https://selrznkggmoxbpflzwjz.supabase.co/storage/v1/object/public/poetiq_homepage/ellie_ai_square.png"
              alt="Image 1"
              className="relative rounded-full w-full h-full aspect-square" // Square aspect ratio for stacked images
            />
                  {/* Online status indicator */}
                  <div className="absolute bottom-0 right-2 w-3.5 h-3.5 bg-green-500 rounded-full border-2 border-white"></div>
                  
                  {/*<User className="w-12 h-12 text-white" />*/}
                </div>
                <h3 className="text-2xl font-bold text-gray-900">Ellie</h3>
                <p className="text-sm font-semibold text-red-600 flex items-center justify-center space-x-1 mt-1">
                  <Sparkles className="w-4 h-4" />
                  <span>Long Term Care Specialist</span>
                </p>
              </div>

              {/* Description */}
              <div className="bg-white rounded-lg p-4 shadow-sm border border-red-100 duration-500 hover:border-red-200 hover:shadow-md">
                <p className="text-sm text-gray-700 leading-relaxed hover:text-red-600 duration-500">
                  {/*
                  Hey there I'm Ellie! I know how hard it is to navigate long term care insurance. 
                  I'm here to help you figure out your options, answer your questions and guide you through the eligibility process with clarity.
                  */}
                  {/*I help career professionals with long term care insurance applications and Medicaid elgibility checks. */}
                  I help busy career professionals with long term care insurance applications and Medicaid elgibility checks for their aging parents.
                </p>
              </div>

              {/* What I Can Help With */}
              <div className="bg-white rounded-lg p-4 shadow-sm border border-red-100 duration-500 hover:border-red-200 hover:shadow-md">
                <h4 className="font-semibold text-gray-900 mb-3 flex items-center space-x-2">
                  <Brain className="w-4 h-4 text-red-500" />
                  <span>What I Can Help With 👇</span>
                </h4>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li className="flex items-start space-x-2">
                    <span className="text-red-500 mt-0.5">•</span>
                    
                    {/*<span className="hover:text-red-500 duration-500">Starting a Long Term Care Application</span>*/}
                    <TooltipHelp text="⚡Click for more info">
                    <span 
                        className="hover:text-red-500 duration-500 cursor-pointer"
                        onClick={() => handleMedicaidTopic("Starting a Long Term Care Application")}
                    >
                        Starting a Long Term Care Application
                    </span>
                    </TooltipHelp>

                  </li>
                  
                  <li className="flex items-start space-x-2">
                    <span className="text-red-500 mt-0.5">•</span>
                    {/*<span className="hover:text-red-500 duration-500">Understanding LTCI eligibility criteria</span>*/}
                    <TooltipHelp text="⚡Click for more info">
                    <span 
                        className="hover:text-red-500 duration-500 cursor-pointer"
                        onClick={() => handleMedicaidTopic("Understanding LTCI eligibility criteria")}
                    >
                        Understanding LTCI eligibility criteria
                    </span>
                    </TooltipHelp>
                    
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-red-500 mt-0.5">•</span>
                    {/*<span className="hover:text-red-500 duration-500">Navigating pre-existing condition questions</span>*/}
                    <TooltipHelp text="⚡Click for more info">
                    <span 
                        className="hover:text-red-500 duration-500 cursor-pointer"
                        onClick={() => handleMedicaidTopic("Navigating pre-existing condition questions")}
                    >
                        Navigating pre-existing conditions
                    </span>
                    </TooltipHelp>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-red-500 mt-0.5">•</span>
                    {/*<span className="hover:text-red-500 duration-500">Reviewing health underwriting issues</span>*/}
                    <TooltipHelp text="⚡Click for more info">
                    <span 
                        className="hover:text-red-500 duration-500 cursor-pointer"
                        onClick={() => handleMedicaidTopic("Reviewing health underwriting issues")}
                    >
                        Reviewing health underwriting issues
                    </span>
                    </TooltipHelp>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-red-500 mt-0.5">•</span>
                    <TooltipExtended text="⚡ For a deeper dive into age and timing considerations regarding Medicaid insurance eligibility, join Poetiq. Get connected to Elder Law Experts in our network">
                    <span className="text-gray-300 hover:text-red-500 duration-500">Explaining age and timing considerations</span>
                    </TooltipExtended>  
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-red-500 mt-0.5">•</span>
                    <TooltipExtended text="⚡ For access to alternative coverage options join Poetiq. Gain full access to the community. Get connected to Medicaid and Elder Law Experts in our network">
                    <span className="text-gray-300 hover:text-red-500 duration-500">Discussing alternative coverage options</span>
                    </TooltipExtended> 
                  </li>
                </ul>
              </div>

              {/* Trust Badge */}
              <div className="bg-gradient-to-r from-red-500 to-red-400 rounded-lg p-4 text-white text-center">
                <FileText className="w-8 h-8 mx-auto mb-2" />
                <p className="text-sm font-semibold">
                  Your information is confidential and secure
                </p>
              </div>
            </div>
          </div>

          {/* Right Side - Chat Interface */}
          <div className="flex-1 flex flex-col">
            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-2 sm:p-6 space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  {/* Avatar for Ellie (assistant messages only) */}
                  {message.role === 'assistant' && (
                    <div className="flex-shrink-0 mr-3">
                      <div className="relative w-8 h-8">
                        <div className="w-full h-full rounded-full overflow-hidden border-2 border-red-200 shadow-sm">
                          <img
                            //src="https://selrznkggmoxbpflzwjz.supabase.co/storage/v1/object/public/poetiq_homepage/ltci-care-assistant.png"
                            src="https://selrznkggmoxbpflzwjz.supabase.co/storage/v1/object/public/poetiq_homepage/ellie_ai_square.png"
                            alt="Ellie"
                            className="w-full h-full object-cover"
                          />
                        </div>
                      {/* Online status indicator */}
                      <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-white"></div>
                    </div>                         
                  </div>                                         
                  )}

                    <div className="flex flex-col">
                      {/* Name label for Ellie */}
                      {message.role === 'assistant' && (
                      <span className="text-xs font-semibold text-red-600 mb-1 ml-1">
                        Ellie
                      </span>
                      )}
      
              {/* Message bubble */}
                  <div
                    className={`max-w-[75%] rounded-lg p-2 sm:p-4 ${
                      message.role === 'user'
                        ? 'bg-red-500 text-white hover:shadow-md hover:shadow-red-200 duration-500'
                        : 'bg-gray-100 text-gray-900 border border-gray-200 hover:shadow-md hover:border-red-200 duration-500 h-full w-full min-w-[230px] sm:min-w-[520px]'
                    }`}
                  >
                    

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
                    
                    <p
                      className={`text-xs mt-2 ${
                        message.role === 'user' ? 'text-red-100' : 'text-gray-500'
                      }`}
                    >
                      {message.timestamp.toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </p>
                  </div>
                </div>
            </div>
              ))}

              {/* Typing Indicator */}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-gray-100 rounded-lg p-4 border border-gray-200">
                    <div className="flex items-center space-x-2">
                      <Loader2 className="w-4 h-4 text-red-500 animate-spin" />
                      <span className="text-sm text-gray-600">Ellie is typing...</span>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>


            {/*--------------- Pre-written Questions -------------*/}
            
              <div className="hidden sm:block px-6 pb-2">
                <div className="flex flex-wrap gap-2">
                    {currentQuestions.map((question, index) => (
                      <button
                        key={index}
                        onClick={() => handleSendMessage(question)}
                        className="text-xs px-3 py-2 bg-white border border-red-200 text-red-600 rounded-full hover:bg-red-50 hover:border-red-300 transition-all duration-200 shadow-sm hover:shadow-md"
                    >
                      {question}
                </button>
                ))}
            </div>
          </div>
        
            {/*----------------  End New Pre-written Questions --------------*/}


            {/* Input Area */}
            <div className="border-t border-gray-200 p-6">
              <div className="flex items-end text-sm space-x-3 mb-4">
                <textarea
                  rows={4}
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleSendMessage(inputValue);
                    }
                  }}
                  placeholder="Ask me anything about long-term care eligibility 🤔"
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none resize-none min-h-[100px] max-h-[160px]"
                />
                
                {/* Upload Button */}
                <input
                  ref={fileInputRef}
                  type="file"
                  onChange={handleFileUpload}
                  className="hidden"
                  accept=".pdf,.doc,.docx,.txt"
                />
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="hidden p-3 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors group"
                  title="Upload document"
                >
                  <Upload className="w-5 h-5 text-gray-600 group-hover:text-gray-900" />
                </button>

                {/* Send Button */}
                <button
                  onClick={() => handleSendMessage(inputValue)}
                  disabled={!inputValue.trim()}
                  className={`p-3 rounded-lg transition-all ${
                    inputValue.trim()
                      ? 'bg-red-500 hover:bg-red-600 shadow-lg shadow-red-500/50'
                      : 'bg-gray-300 cursor-not-allowed'
                  }`}
                >
                  <ArrowUpRight className="w-5 h-5 text-white" />
                </button>
              </div>

              {/* Email Summary Section */}
              <div className="hidden sm:block bg-gradient-to-r from-red-50 to-rose-50 rounded-lg p-4 border border-red-100">
                <form onSubmit={handleEmailSubmit} className="flex items-center space-x-3">
                  <Mail className="w-5 h-5 text-red-500 flex-shrink-0" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      setError('');
                    }}

                    //placeholder="Get conversation summary via email"
                    placeholder="Get actionable Medicaid eligibility tips via email"
                    className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none"
                  />
                <TooltipHelp className="font-normal" text="⚡Subscribe to Newsletter">
                  <button
                    type="submit"
                    disabled={isSending || !email.trim()}
                    className={`px-4 py-2 text-sm font-semibold rounded-lg transition-all flex items-center space-x-2 ${
                      emailSent
                        ? 'bg-green-500 text-white'
                        : email.trim()
                        ? 'bg-red-500 text-white hover:bg-red-600 shadow-md hover:shadow-lg'
                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    }`}
                  >
                    {emailSent ? (
                      <>
                        <CheckCircle2 className="w-4 h-4" />
                        <span>Subscribed!</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Subscribe</span>
                      </>
                    )}
                  </button>
                </TooltipHelp>
                </form>
                {emailSent && (
                  <p className="text-xs text-green-600 mt-2 flex items-center space-x-1">
                    <CheckCircle2 className="w-3 h-3" />
                    <span>Email sent to {email}</span>
                  </p>
                )}

                {error && (
                  <p className="text-xs text-red-600 mt-2 flex items-center space-x-1">
                    <X className="w-3 h-3" />
                    <span>{error}</span>
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EligibilityModal;
