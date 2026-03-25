// src/components/OnboardingQuestionsModal.tsx
import React, { useState, useEffect } from 'react';
import { 
  X, 
  ArrowRight, 
  ArrowLeft, 
  User, 
  Heart, 
  Globe, 
  CheckCircle2,
  Home,
  Stethoscope,
  DollarSign,
  FileText,
  Users,
  Clock,
  Building2,
  Shield,
  Sparkles, 
  HeartPulse,
  HandHeart,
  MapPin,
  ShieldCheck,
  Target
} from 'lucide-react';
import { supabase } from '../lib/supabase';
import { z } from 'zod';

interface OnboardingQuestionsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDashboardOpen?: () => void; 
}

interface Question {
  id: number;
  question_id: number;
  onboard_question: string;
  question_type: string;
}

interface Choice {
  eldercare_question: string;
  question_choices: string;
}

interface PhaseContext {
  phase_name: string;
  journey_name: string;
  current_location: string;
  likely_next_stage: string;
  docs_needed: string;
  cost_funding: string;
}

interface CognitiveDragData {
  base_cognitive_drag: number;
  time_friction_drag: number;
  legal_exposure_drag: number;
  conflict_drag: number;
  total_drag: number;
}

const onboardingSchema = z.object({
  email: z.string().email('Invalid email address'),
});



export function OnboardingQuestionsModal({ isOpen, onClose, onDashboardOpen }: OnboardingQuestionsModalProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [firstName, setFirstName] = useState('');
  const [email, setEmail] = useState('');
  const [elderRelation, setElderRelation] = useState('');
  const [country, setCountry] = useState('US');
  const [questions, setQuestions] = useState<Question[]>([]);
  const [choices, setChoices] = useState<{ [key: string]: string[] }>({});
  const [answers, setAnswers] = useState<{ [key: number]: string }>({});
  const [phaseContexts, setPhaseContexts] = useState<PhaseContext[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  


  // Generate or retrieve session ID from browser
const getOrCreateSessionId = (): string => {
  let sessionId = sessionStorage.getItem('eldercare_session_id');
  
  if (!sessionId) {
    // Create a unique session ID using timestamp and random string
    sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    sessionStorage.setItem('eldercare_session_id', sessionId);
  }
  
  return sessionId;
};

// Calculate eldercare phase based on location (Q2) and dependency (Q3)
const calculatePhase = (location: string, dependency: string): number => {
  // Priority 1: End of Life
  if (location.toLowerCase().includes('hospice')) {
    return 5;
  }
  
  // Priority 2: Institutional Management
  if (location.toLowerCase().includes('nursing') || 
      location.toLowerCase().includes('memory care')) {
    return 4;
  }
  
  // Priority 3: Acute Crisis
  if (location.toLowerCase().includes('hospital') || 
      location.toLowerCase().includes('rehab')) {
    return 2;
  }
  
  // Priority 4: Home-Based Intensity
  if (location.toLowerCase().includes('home')) {
    // Check dependency level for home-based care
    const dependencyLower = dependency.toLowerCase();
    
    if (dependencyLower.includes('1-person') || 
        dependencyLower.includes('2-person') ||
        dependencyLower.includes('complete')) {
      return 3; // Intensive Home Care
    } else {
      return 1; // Early Planning
    }
  }
  
  // Default fallback to Early Planning
  return 1;
};

// Calculate cognitive drag based on phase and Q4, Q5, Q6 answers
const calculateCognitiveDrag = async (
  calculatedPhase: number,
  q4Answer: string,  // Question 4: Time/Schedule question
  q5Answer: string,  // Question 5: Legal/Documents question
  q6Answer: string,   // Question 6: Family/Conflict question
  q8Answer: string,  // Question 8: Doctor visit frequency
  q9Answer: string   // Question 9: Medication list status
): Promise<CognitiveDragData | null> => {
  try {
    // Step 1: Get base_cognitive_drag from eldercare_phase table based on phase
    const { data: phaseData, error: phaseError } = await supabase
      .from('eldercare_phase')
      .select('base_cognitive_drag')
      .eq('id', calculatedPhase)
      .single();

    if (phaseError || !phaseData) {
      console.error('Error fetching phase data:', phaseError);
      return null;
    }

    const base_cognitive_drag = phaseData.base_cognitive_drag || 0;

    // Step 2: Get cognitive drag values for each answer from eldercare_onboard_choices
    // Fetch all choices with their cognitive drag values
    const { data: choicesData, error: choicesError } = await supabase
      .from('eldercare_onboard_choices')
      .select('eldercare_question, question_choices, choice_cognitive_drag');

    if (choicesError || !choicesData) {
      console.error('Error fetching choices data:', choicesError);
      return null;
    }

    // Step 3: Find the cognitive drag values for each answer
    let time_friction_drag = 0;
    let legal_exposure_drag = 0;
    let conflict_drag = 0;

    // Get question texts for Q4, Q5, Q6, Q8, Q9
    const { data: questionsData } = await supabase
      .from('eldercare_onboard_questions')
      .select('question_id, onboard_question')
      .in('question_id', [4, 5, 6, 8, 9]);

    if (questionsData) {
      const q4Text = questionsData.find(q => q.question_id === 4)?.onboard_question;
      const q5Text = questionsData.find(q => q.question_id === 5)?.onboard_question;
      const q6Text = questionsData.find(q => q.question_id === 6)?.onboard_question;

      // Find drag values for Q4 answer (time friction)
      if (q4Text && q4Answer) {
        const q4Choice = choicesData.find(
          c => c.eldercare_question === q4Text && c.question_choices === q4Answer
        );
        time_friction_drag = q4Choice?.choice_cognitive_drag || 0;
      }

      // Find drag values for Q5 answer (legal exposure)
      if (q5Text && q5Answer) {
        const q5Choice = choicesData.find(
          c => c.eldercare_question === q5Text && c.question_choices === q5Answer
        );
        legal_exposure_drag = q5Choice?.choice_cognitive_drag || 0;
      }

      // Find drag values for Q6 answer (family conflict)
      if (q6Text && q6Answer) {
        const q6Choice = choicesData.find(
          c => c.eldercare_question === q6Text && c.question_choices === q6Answer
        );
        conflict_drag = q6Choice?.choice_cognitive_drag || 0;
      }
    }
//================== Start New Section Just Added for Q8 and Q9 ==========
let health_monitoring_drag = 0;
let medication_management_drag = 0;

const q8Text = questionsData.find(q => q.question_id === 8)?.onboard_question;
const q9Text = questionsData.find(q => q.question_id === 9)?.onboard_question;

// Find drag values for Q8 answer (health monitoring)
if (q8Text && q8Answer) {
  const q8Choice = choicesData.find(
    c => c.eldercare_question === q8Text && c.question_choices === q8Answer
  );
  health_monitoring_drag = q8Choice?.choice_cognitive_drag || 0;
}

// Find drag values for Q9 answer (medication management)
if (q9Text && q9Answer) {
  const q9Choice = choicesData.find(
    c => c.eldercare_question === q9Text && c.question_choices === q9Answer
  );
  medication_management_drag = q9Choice?.choice_cognitive_drag || 0;
}

//================== End New Section Just Added for Q8 and Q9 ==========    
    

    // Step 4: Calculate total drag using the formula
    //const total_drag = base_cognitive_drag + time_friction_drag + legal_exposure_drag + conflict_drag;
    const total_drag = base_cognitive_drag + time_friction_drag + legal_exposure_drag + conflict_drag + health_monitoring_drag + medication_management_drag;


    console.log('Cognitive Drag Calculation:', {
      base_cognitive_drag,
      time_friction_drag,
      legal_exposure_drag,
      conflict_drag,
      health_monitoring_drag,
      medication_management_drag,
      total_drag
    });

    return {
      base_cognitive_drag,
      time_friction_drag,
      legal_exposure_drag,
      conflict_drag,
      total_drag
    };

  } catch (err) {
    console.error('Error calculating cognitive drag:', err);
    return null;
  }
};
  
  

  const [sessionId] = useState<string>(getOrCreateSessionId());


  // Fetch onboarding data from supabase
  useEffect(() => {
    if (isOpen) {
      fetchOnboardingData();
    }
  }, [isOpen]);

  const fetchOnboardingData = async () => {
    try {
      setLoading(true);
      
      // Fetch questions (question_id 2 to 9)
      const { data: questionsData, error: questionsError } = await supabase
        .from('eldercare_onboard_questions')
        .select('*')
        .gte('question_id', 2)
        .lte('question_id', 9)
        .order('question_id', { ascending: true });

      if (questionsError) throw questionsError;
      
      // Fetch choices
      const { data: choicesData, error: choicesError } = await supabase
        .from('eldercare_onboard_choices')
        .select('eldercare_question, question_choices')
        .order('id', { ascending: true });

      if (choicesError) throw choicesError;

      // Fetch phase contexts for contextual information
      const { data: phaseData, error: phaseError } = await supabase
        .from('eldercare_phase')
        .select('*');

      if (phaseError) throw phaseError;

      // Organize choices by question
      const choicesMap: { [key: string]: string[] } = {};
      choicesData?.forEach((choice: Choice) => {
        if (!choicesMap[choice.eldercare_question]) {
          choicesMap[choice.eldercare_question] = [];
        }
        if (choice.question_choices) {
          choicesMap[choice.eldercare_question].push(choice.question_choices);
        }
      });

      setQuestions(questionsData || []);
      setChoices(choicesMap);
      setPhaseContexts(phaseData || []);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching onboarding data:', err);
      setError('Failed to load onboarding questions. Please try again.');
      setLoading(false);
    }
  };

  const totalSteps = 3 + questions.length + 1; // firstName + relation + country + questions + final
  const progressPercentage = ((currentStep + 1) / totalSteps) * 100;

  const relationOptions = [
    { value: 'mom', label: 'Mom', icon: Heart },
    { value: 'dad', label: 'Dad', icon: Heart },
    { value: 'spouse', label: 'Spouse', icon: Users },
    { value: 'other', label: 'Other', icon: User }
  ];

  const countryOptions = [
    { value: 'US', label: 'United States', icon: Globe },
    { value: 'UK', label: 'United Kingdom', icon: Globe }
  ];

  // Get contextual information based on current question
  const getContextualInfo = (questionIndex: number): PhaseContext | null => {
    if (phaseContexts.length > questionIndex) {
      return phaseContexts[questionIndex];
    }
    return null;
  };


   /* ---- Start HandleNext Function that Calculates Phase and Cognitive Drag -----*/
  const handleSaveNext = async () => {
  // Validation for each step
  if (currentStep === 0 && !firstName.trim()) {
    setError('Please enter your first name');
    return;
  }
  if (currentStep === 1 && !elderRelation) {
    setError('Please select your relationship');
    return;
  }
  if (currentStep === 2 && !country) {
    setError('Please select your country');
    return;
  }
  
  // Validate question answers
  if (currentStep >= 3 && currentStep < 3 + questions.length) {
    const questionIndex = currentStep - 3;
    const question = questions[questionIndex];
    if (!answers[question.question_id]) {
      setError('Please select an answer');
      return;
    }
  }

  // Save data to supabase
  try {
    // Step 1: Calculate phase if both Q2 and Q3 are answered
    let calculatedPhase: number | null = null;
    
    const locationAnswer = answers[2]; // Question ID 2 - Location
    const dependencyAnswer = answers[3]; // Question ID 3 - Dependency/ADL
    
    if (locationAnswer && dependencyAnswer) {
      calculatedPhase = calculatePhase(locationAnswer, dependencyAnswer);
      console.log('Phase calculated:', {
        location: locationAnswer,
        dependency: dependencyAnswer,
        phase: calculatedPhase
      });
    }

    // Step 2: Calculate cognitive drag if phase is calculated and Q4, Q5, Q6 are answered
    let dragScore: number | null = null;
    
    const q4Answer = answers[4]; // Question ID 4 - Time/Schedule
    const q5Answer = answers[5]; // Question ID 5 - Legal/Documents
    const q6Answer = answers[6]; // Question ID 6 - Family/Conflict
    const q7Answer = answers[7]; // Question ID 7 - (existing question)
    const q8Answer = answers[8]; // Question ID 8 - Doctor visit
    const q9Answer = answers[9]; // Question ID 9 - Medication list

    
    if (calculatedPhase !== null && q4Answer && q5Answer && q6Answer && q8Answer && q9Answer) {
        const dragData = await calculateCognitiveDrag(
            calculatedPhase,
            q4Answer,
            q5Answer,
            q6Answer,
            q8Answer,
            q9Answer
          );
      
      if (dragData) {
        dragScore = dragData.total_drag;
        console.log('Drag score calculated:', {
          phase: calculatedPhase,
          q4Answer,
          q5Answer,
          q6Answer,
          dragScore
        });
      }
    }

    // Step 3: Prepare data to save
    const dataToSave = {
      session_id: sessionId,
      user_email: email,
      firstname: firstName || null,
      relation: elderRelation || null,
      country: country || null,
      raw_answers: answers,
      calculated_phase: calculatedPhase,
      drag_score: dragScore,
      created_at: new Date().toISOString()
    };

    // Step 4: Upsert data to database
    const { data, error: saveError } = await supabase
      .from('eldercare_onboard_responses')
      .upsert(dataToSave, { 
        onConflict: 'session_id',
        ignoreDuplicates: false 
      })
      .select();

    if (saveError) {
      console.error('Error saving onboarding data:', saveError);
      setError('Failed to save your progress. Please try again.');
      return;
    }

    console.log('Data saved successfully:', data);
    
  } catch (err) {
    console.error('Unexpected error saving data:', err);
    setError('An unexpected error occurred. Please try again.');
    return;
  }

  // Proceed to next step after successful save
  setError('');
  if (currentStep < totalSteps - 1) {
    setCurrentStep(currentStep + 1);
  }
};



  /*------- End HandleSaveNext Function that Calculates Phase and Cognitive Drag ---- */

  const handleBack = () => {
    setError('');
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleAnswerSelect = (questionId: number, answer: string) => {
    setAnswers({ ...answers, [questionId]: answer });
    setError('');
  };

  if (!isOpen) return null;

  if (loading) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-lg p-8 w-full max-w-2xl">
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-500"></div>
          </div>
          <p className="text-center mt-4 text-gray-600">Loading your personalized journey...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg w-full max-w-2xl relative shadow-2xl max-h-[90vh] overflow-hidden flex flex-col">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-400 hover:text-gray-600 transition-colors z-10"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Progress Bar */}
        <div className="w-full h-2 bg-gray-100">
          <div 
            className="h-full bg-gradient-to-r from-red-400 to-red-600 transition-all duration-500 ease-out"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>

        {/* Progress Indicator */}
        <div className="px-8 pt-6 pb-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-500">Step {currentStep + 1} of {totalSteps}</span>
            <span className="text-red-500 font-semibold">{Math.round(progressPercentage)}% Complete</span>
          </div>
        </div>

        {/* Content Area - Scrollable */}
        <div className="flex-1 overflow-y-auto px-8 py-6">
          {/* Step 0: First Name */}
          {currentStep === 0 && (
            <div className="space-y-6 animate-fadeIn">
              <div className="text-center mb-8">
                <div className="mx-auto w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
                  
                  <Target className="w-10 h-10 fill-red-500 justify-center align-top text-red-50"/>
                </div> 
                <h2 className="text-3xl font-bold text-gray-700 mb-3">
                  <span className="text-gray-700 text-3xl">Care </span>
                  <span className="text-red-400">Gap Finder</span>
                </h2>
                <p className="text-gray-600 text-lg">
                             
                  Discover hidden gaps in your parents' long-term care setup
                </p>
              </div>

              <div>
                <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">
                  What's your first name?
                </label>
                <input
                  type="text"
                  id="firstName"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder="Enter your first name"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none text-lg transition-all"
                  autoFocus
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Tell us where to send the report.
                </label>
                <input
                  type="text"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your Email"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none text-lg transition-all"
                  
                />
              </div>
              
            </div>
          )}


          {currentStep === 1 && (
            <div className="space-y-6 animate-fadeIn">
              <div className="text-center mb-8">
                <div className="mx-auto w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mb-4">
                  <HeartPulse className="w-8 h-8 text-red-500" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900 mb-3">
                  Hi {firstName}!
                </h2>
                <p className="text-gray-600 text-lg">
                  Who are you caring for?
                </p>
              </div>

              <div className="items-start grid grid-cols-2 gap-4">
  {relationOptions.map((option) => {
    const Icon = option.icon;
    return (
      <button
        key={option.value}
        onClick={() => setElderRelation(option.value)}
        className={`group rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 border-2 cursor-pointer ${
          elderRelation === option.value
            ? 'border-red-500 bg-red-50'
            : 'border-gray-100 hover:border-red-200'
        }`}
      >
        <div className="flex flex-col items-center text-center">
          <div className={`p-3 rounded-lg mb-3 transition-all duration-300 ${
            elderRelation === option.value
              ? 'bg-red-100'
              : 'bg-red-50 group-hover:bg-red-100'
          }`}>
            <Icon className={`w-8 h-8 transition-all duration-300 ${
              elderRelation === option.value
                ? 'text-red-600'
                : 'text-red-500 group-hover:scale-110'
            }`} />
          </div>
          <p className={`text-lg font-semibold transition-colors duration-300 ${
            elderRelation === option.value
              ? 'text-red-600'
              : 'text-gray-900 group-hover:text-red-600'
          }`}>
            {option.label}
          </p>
        </div>
      </button>
    );
  })}
</div>

            </div>
          )}

          {/* Step 2: Country */}
          {currentStep === 2 && (
            <div className="space-y-6 animate-fadeIn">
              <div className="text-center mb-8">
                <div className="mx-auto w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mb-4">
                  <MapPin className="w-8 h-8 text-red-500" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900 mb-3">
                  Which country are they in?
                </h2>
                <p className="text-gray-600 text-lg">
                  This helps us provide region-specific guidance
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {countryOptions.map((option) => {
                  const Icon = option.icon;
                  return (
                    <button
                      key={option.value}
                      onClick={() => setCountry(option.value)}
                      className={`p-6 rounded-lg border-2 transition-all duration-200 hover:shadow-lg ${
                        country === option.value
                          ? 'border-red-500 bg-red-50 shadow-md'
                          : 'border-gray-200 hover:border-red-300'
                      }`}
                    >
                      <Icon className={`w-8 h-8 mx-auto mb-3 ${
                        country === option.value ? 'text-red-500' : 'text-gray-400'
                      }`} />
                      <p className="text-lg font-semibold text-gray-900">{option.label}</p>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Steps 3+: Dynamic Questions */}
          {currentStep >= 3 && currentStep < 3 + questions.length && (
            <div className="space-y-6 animate-fadeIn">
              {(() => {
                const questionIndex = currentStep - 3;
                const question = questions[questionIndex];
                const questionChoices = choices[question.onboard_question] || [];
                const context = getContextualInfo(questionIndex);
                
                // Map icons to different question types
                const iconMap: { [key: string]: any } = {
                  'location': Home,
                  'health': Stethoscope,
                  'financial': DollarSign,
                  'documents': FileText,
                  'support': Users,
                  'timeline': Clock,
                  'facility': Building2,
                  'care': HandHeart,
                  'default': Shield
                };

                const QuestionIcon = iconMap[question.question_type] || iconMap['default'];

                return (
                  <>
                    <div className="text-center mb-8">
                      <div className="mx-auto w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mb-4">
                        <QuestionIcon className="w-8 h-8 text-red-500" />
                      </div>
                      <h2 className="text-2xl font-bold text-gray-900 mb-3">
                        {question.onboard_question}
                      </h2>
                      {/*
                      {context && (
                        <div className="mt-4 p-4 bg-red-50 rounded-lg border border-red-100">
                          <p className="text-sm text-gray-700 mb-2">
                            <span className="font-semibold text-red-600">Journey Phase:</span> {context.phase_name}
                          </p>
                          <p className="text-sm text-gray-600">
                            {context.journey_name}
                          </p>
                        </div>
                      )}
                      */}
                    </div>

                    <div className="space-y-3">
                      {questionChoices.map((choice, idx) => (
                        <button
                          key={idx}
                          onClick={() => handleAnswerSelect(question.question_id, choice)}
                          className={`w-full p-4 rounded-lg border-2 text-left transition-all duration-200 hover:shadow-md ${
                            answers[question.question_id] === choice
                              ? 'border-red-500 bg-red-50 shadow-md'
                              : 'border-gray-200 hover:border-red-300'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-gray-900 font-medium">{choice}</span>
                            {answers[question.question_id] === choice && (
                              <CheckCircle2 className="w-5 h-5 text-red-500" />
                            )}
                          </div>
                        </button>
                      ))}
                    </div>
                  </>
                );
              })()}
            </div>
          )}

          {/* Final Step: Summary */}
          {currentStep === totalSteps - 1 && (
            <div className="space-y-6 animate-fadeIn">
              <div className="text-center mb-8">
                <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                  <CheckCircle2 className="w-12 h-12 fill-green-500 text-white" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900 mb-3">
                  You're All Set, {firstName}!
                </h2>
                <p className="text-gray-600 text-lg">
                  {/*Your personalized eldercare dashboard is ready to be built*/}
                  Let's build your personalized eldercare dashboard
                </p>
              </div>

              <div className="bg-gray-50 rounded-lg p-6 space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Your Eldercare Overview</h3>
                
                   <div className="space-y-3">
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-red-50 rounded-full flex items-center justify-center mr-3">
                        <User className="w-5 h-5 text-red-500" />
                      </div>
                    <div>
                      <p className="text-sm text-gray-500">Your Name</p>
                      <p className="text-gray-900 font-medium">{firstName}</p>
                  </div>
                </div>

                  
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-red-50 rounded-full flex items-center justify-center mr-3">
                      <Heart className="w-5 h-5 text-red-500" />
                  </div>
                <div>
                    <p className="text-sm text-gray-500">Caring For</p>
                    <p className="text-gray-900 font-medium capitalize">{elderRelation}</p>
                </div>
              </div>

                  <div className="flex items-start">
                    <div className="w-8 h-8 bg-red-50 rounded-full flex items-center justify-center mr-3">
                      <Globe className="w-5 h-5 text-red-500" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Location</p>
                      <p className="text-gray-900 font-medium">{country === 'US' ? 'United States' : 'United Kingdom'}</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="w-8 h-8 bg-red-50 rounded-full flex items-center justify-center mr-3">
                        <CheckCircle2 className="w-5 h-5 text-red-500" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Questions Completed</p>
                      <p className="text-gray-900 font-medium">{questions.length} of {questions.length}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-red-50 border border-red-100 rounded-lg p-4">
                <p className="text-sm text-gray-700">
                  <span className="font-semibold text-red-600">Next Step:</span> We'll create a personalized dashboard that identifies the gaps and shares resources, guidance, and support to help you close the gaps.
                </p>
              </div>
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-600 text-sm">{error}</p>
            </div>
          )}
        </div>

        {/* Footer Navigation */}
        <div className="border-t border-gray-200 px-8 py-6 bg-gray-50">
          <div className="flex justify-between items-center">
            <button
              onClick={handleBack}
              disabled={currentStep === 0}
              className={`flex items-center px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
                currentStep === 0
                  ? 'text-gray-400 cursor-not-allowed'
                  : 'text-gray-700 hover:bg-gray-200'
              }`}
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back
            </button>

            {currentStep === totalSteps - 1 ? (
              <button
                  onClick={async () => {
                  await handleSaveNext();
                  // Add any final completion logic here
                  onClose();
                     // Open the dashboard modal if callback provided
                  if (onDashboardOpen) {
                        onDashboardOpen();
                    }
                  }}
                className="flex items-center px-8 py-3 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg font-semibold hover:from-red-600 hover:to-red-700 transition-all duration-200 shadow-md hover:shadow-lg"
              >
                View Gaps
                <ArrowRight className="w-5 h-5 ml-2" />
              </button>
            ) : (
              <button
                //onClick={handleNext}
                onClick={handleSaveNext}
                className="flex items-center px-8 py-3 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg font-semibold hover:from-red-600 hover:to-red-700 transition-all duration-200 shadow-md hover:shadow-lg"
              >
                Next
                <ArrowRight className="w-5 h-5 ml-2" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
