import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CalendarCheck, Calendar, PenSquare, Clock, Users, PenTool, Briefcase, Plus, Minus,Menu, MailCheck,
  Bot, CheckCircle,X, Send,Timer, Zap, ArrowRight, HeartPulse, Brain, MapPin, Target,
  Lightbulb, Sparkles, CircleDollarSign, Star, Search, Activity, FileText, Shield, ShieldCheck, TrendingUp, ShieldAlert, User, CheckCircle2, Headset, Dumbbell, UserSearch, DatabaseZap, Scale, Rocket } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { AuthModal } from '../components/AuthModal';
import BlueskyLogo from '../images/bluesky-logo.svg';
import BlueskyLogoWhite from '../images/bluesky-logo-white.svg';
import LinkedInLogo from '../images/linkedin-logo.svg';
import LinkedInSolidLogo from '../images/linkedin-solid-logo.svg';
import LinkedInSolidLogoWhite from '../images/linkedin-solid-logo-white.svg';
import XLogo from '../images/x-logo.svg';
import googleLogo from '../images/google-logo-48.svg';
import { TooltipExtended } from '/src/utils/TooltipExtended';
import { WaitlistModal } from '../components/WaitlistModal.tsx';
import { NewsletterModal } from '../components/NewsletterModal.tsx';
import { CommunityModal } from '../components/CommunityModal.tsx';
import { Link } from 'react-router-dom';
import { OurStoryTimeline } from '../components/OurStoryTimeline';
import { EligibilityModal } from '../components/EligibilityModal.tsx';
import { StressCoachModal } from '../components/StressCoachModal.tsx';
import { MentallyBroken } from '../components/MentallyBroken.tsx';
import { NavigateSystems } from '../components/NavigateSystems.tsx';
import { ConsumedByBills } from '../components/ConsumedByBills.tsx';
import { CareerOpps } from '../components/CareerOpps';
import { BrokenByFamily } from '../components/BrokenByFamily';
import { OnCallStress } from '../components/OnCallStress';
import { TooltipHelp } from '/src/utils/TooltipHelp';

// Add to imports at the top
import { OnboardingQuestionsModal } from '../components/OnboardingQuestionsModal';

import { EldercareGapDashboardModal } from '../components/EldercareGapDashboardModal';  // ADD THIS LINE
import { TypingEffect } from '../components/TypingEffect'

import { EldercareModalPopUp } from '../components/EldercareModalPopUp';
import { EldercareModalPopUpSmall } from '../components/EldercareModalPopUpSmall';
import { EligibilityPillModal } from '../components/EligibilityPillModal.tsx';

import { PageFooter } from '../components/PageFooter';
import { PageMenuNav } from '../components/PageMenuNav';






function LandingPage() {
  const navigate = useNavigate();
  //const { isAuthenticated } = useAuth();
  const { signIn } = useAuth();
  const { signInWithGoogle } = useAuth();
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isWaitlistModalOpen, setIsWaitlistModalOpen] = useState(false);
  const [isWaitlistSuccessModalOpen, setIsWaitlistSuccessModalOpen] = useState(false);
  const [isNewsletterModalOpen, setIsNewsletterModalOpen] = useState(false);
  const [isNewsletterSuccessModalOpen, setIsNewsletterSuccessModalOpen] = useState(false);
  const [isCommunityModalOpen, setIsCommunityModalOpen] = useState(false);
  const [isCommunitySuccessModalOpen, setIsCommunitySuccessModalOpen] = useState(false);

  // Constants for the AI Assistants
  const [isEligibilityModalOpen, setIsEligibilityModalOpen] = useState(false);
  const [isStressCoachModalOpen, setIsStressCoachModalOpen] = useState(false);
 
  // Add state near line 28 with other modal states
  const [isOnboardingModalOpen, setIsOnboardingModalOpen] = useState(false);
  const [isDashboardModalOpen, setIsDashboardModalOpen] = useState(false);  // ADD THIS LINE


  //constants for the grid buttons
  const [isMentallyBrokenModalOpen, setIsMentallyBrokenModalOpen] = useState(false);
  const [isNavigateSystemsModalOpen, setIsNavigateSystemsModalOpen] = useState(false);
  const [isConsumedByBillsModalOpen, setIsConsumedByBillsModalOpen] = useState(false);
  const [isCareerOppsModalOpen, setIsCareerOppsModalOpen] = useState(false);
  const [isBrokenByFamilyModalOpen, setIsBrokenByFamilyModalOpen] = useState(false);
  const [isOnCallStressModalOpen, setIsOnCallStressModalOpen] = useState(false);

  const [isEldercareModalOpen, setIsEldercareModalOpen] = useState(true);

  const [isEldercareSmallModalOpen, setIsEldercareSmallModalOpen] = useState(false);

    useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

 useEffect(() => {
    const timer = setTimeout(() => {
      setIsEldercareSmallModalOpen(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  // Add this useEffect to handle hash scrolling when navigating from other pages
useEffect(() => {
  // Check if there's a hash in the URL
  if (window.location.hash) {
    // Small delay to ensure DOM is fully rendered
    const timeoutId = setTimeout(() => {
      const id = window.location.hash.substring(1); // Remove the '#'
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);
    
    return () => clearTimeout(timeoutId);
  }
}, []);


const handleLoginClick = () => {
    // This navigates to an external URL, not an internal route
    window.location.href = 'https://app.sosavvy.so/login';
  };

  const handleBlogClick = () => {
    // This navigates to an external URL, not an internal route
    window.location.href = '/blog';
  };

   const openWaitlistModal = () => {
    setIsWaitlistModalOpen(true);
  };

  const closeWaitlistModal = () => {
    setIsWaitlistModalOpen(false);
  };

  const openNewsletterModal = () => {
    setIsNewsletterModalOpen(true);
  };

    const closeNewsletterModal = () => {
    setIsNewsletterModalOpen(false);
  };

    const openCommunityModal = () => {
    setIsCommunityModalOpen(true);
  };


    const closeCommunityModal = () => {
    setIsCommunityModalOpen(false);
  };

  // Open and Close constants for AI Modals
    const openEligibilityModal = () => {
  setIsEligibilityModalOpen(true);
};

    const closeEligibilityModal = () => {
  setIsEligibilityModalOpen(false);
};

   const openStressCoachModal = () => {
  setIsStressCoachModalOpen(true);
};

    const closeStressCoachModal = () => {
  setIsStressCoachModalOpen(false);
};

  //Open and Close const for 6 Scenarios Modal
  const openMentallyBrokenModal = () => {
  setIsMentallyBrokenModalOpen(true);
};

const closeMentallyBrokenModal = () => {
  setIsMentallyBrokenModalOpen(false);
};

const handleMentallyBrokenToCommunity = () => {
  setIsMentallyBrokenModalOpen(false);
  setIsCommunityModalOpen(true);
};
  
const openNavigateSystemsModal = () => {
  setIsNavigateSystemsModalOpen(true);
};

const closeNavigateSystemsModal = () => {
  setIsNavigateSystemsModalOpen(false);
};

const handleNavigateSystemsToCommunity = () => {
  setIsNavigateSystemsModalOpen(false);
  setIsCommunityModalOpen(true);
};

const openConsumedByBillsModal = () => {
  setIsConsumedByBillsModalOpen(true);
};

const closeConsumedByBillsModal = () => {
  setIsConsumedByBillsModalOpen(false);
};

const handleConsumedByBillsToCommunity = () => {
  setIsConsumedByBillsModalOpen(false);
  setIsCommunityModalOpen(true);
};
  
const openCareerOppsModal = () => {
  setIsCareerOppsModalOpen(true);
};

const closeCareerOppsModal = () => {
  setIsCareerOppsModalOpen(false);
};

const handleCareerOppsToCommunity = () => {
  setIsCareerOppsModalOpen(false);
  setIsCommunityModalOpen(true);
};

  const openBrokenByFamilyModal = () => {
  setIsBrokenByFamilyModalOpen(true);
};

const closeBrokenByFamilyModal = () => {
  setIsBrokenByFamilyModalOpen(false);
};

const handleBrokenByFamilyToCommunity = () => {
  setIsBrokenByFamilyModalOpen(false);
  setIsCommunityModalOpen(true);
};

const openOnCallStressModal = () => {
  setIsOnCallStressModalOpen(true);
};

const closeOnCallStressModal = () => {
  setIsOnCallStressModalOpen(false);
};

const handleOnCallStressToCommunity = () => {
  setIsOnCallStressModalOpen(false);
  setIsCommunityModalOpen(true);
};

// Add modal open/close functions near line 54
const openOnboardingModal = () => {
  setIsOnboardingModalOpen(true);
};

const closeOnboardingModal = () => {
  setIsOnboardingModalOpen(false);
};  

const openDashboardModal = () => {
  setIsDashboardModalOpen(true);
};

const closeDashboardModal = () => {
  setIsDashboardModalOpen(false);
};  

  // GET SESSION ID FROM SESSION STORAGE
const getSessionId = (): string => {
  return sessionStorage.getItem('eldercare_session_id') || '';
};
  
  const handleGoogleLogin = async () => {
  try {
    await signInWithGoogle(); // This would be the new function from AuthContext
  } catch (error) {
    console.error('Error signing in with Google:', error);
  }
};

  const handleEmailLogin = () => {
    setIsAuthModalOpen(true);
  };

  const handleCloseAuthModal = () => {
  setIsAuthModalOpen(false);
  // Consider resetting any modal-related state here if needed
};

  
  return (
      <>

      <div id="top_page" className="min-h-screen 
        bg-gradient-to-bl from-red-50 via-bg-red-50 via-white via-white to-white -inset-4">
        
       <div className="hidden sm:block sticky top-0 z-50 bg-red-50/50 backdrop-blur-sm shadow-sm">
          <PageMenuNav 
            onOpenCommunityModal={openCommunityModal} 
            onOpenOnboardingModal={openOnboardingModal}
          />
        </div>

        <div className="sm:hidden">
          <PageMenuNav 
            onOpenCommunityModal={openCommunityModal} 
            onOpenOnboardingModal={openOnboardingModal}
          />
        </div>


      <main className="max-w-7xl mx-auto px-6 pt-10 pb-32 
         ">
        
        <div className="text-center 
        
        px-4 sm:px-6 md:px-8 lg:px-12 py-12 sm:py-16 md:py-20 lg:py-24 rounded-lg">


          
        <span className="sm:hidden text-xs sm:text-lg p-3 font-semibold bg-gray-300 rounded-full text-gray-500 border-8 border-gray-200">    
          Serving Busy Career Professionals
        </span>

      <span className="hidden sm:inline text-xs sm:text-lg p-3 font-semibold bg-gray-300 hover:bg-gray-200 hover:text-gray-500 rounded-full text-gray-600 border-8 border-gray-200 hover:border-gray-100 duration-500">Serving Busy Career Professionals</span>

               
          
           {/*start alternative header */}
    

           {/*start alternative header */}
           <h1 className="text-4xl mt-6 sm:text-6xl md:text-7xl lg:text-7xl leading-tight font-bold mb-2 sm:mb-3"> 
            <p>
            
              <span className="inline-block sm:text-7xl bg-gradient-to-r from-gray-400 via-gray-500 to-gray-600 text-transparent bg-clip-text mt-6 duration-300">
                {/* This is the key change! */}

                {/*The*/} <span className="bg-gradient-to-l from-red-400 via-red-500 to-red-600 text-transparent bg-clip-text">long-term care</span> <br className="sm:hidden" /> navigator<br className="hidden sm:block"/>
                
       <p className="block text-sm font-normal sm:text-xl sm:font-normal text-gray-600 leading-tight mt-1 sm:mt-6">
         
             <span className="sm:hidden text-xl font-normal">
               {/*Manage legal, financial & care logistics <br/>for Mom and Dad in one place. */}
               AI to manage legal, financial and <br/>care logistics for Mom & Dad.
             </span> 

          <span className="hidden space-y-2 text-3xl sm:inline font-normal">
            {/*Manage legal, financial, and care logistics for Mom & Dad in one place.*/}
            AI that helps you navigate legal, financial and care logistics 
          </span>

         <p className="hidden sm:block mt-2 space-y-2 text-3xl font-normal">
         {/*We take over the admin and help you reclaim your focus at work.*/}
           for Mom & Dad on Autopilot.
           <span><Rocket className="w-8 h-8 align-middle ml-1 fill-red-400 justify-center text-red-100 inline"/></span>
           </p>
         
         </p>
                
              </span>
            </p>

            <p className="flex hidden text-gray-600 sm:inline mt-4 sm:text-2xl md:text-2xl sm:font-normal mb-8 sm:mb-10">            
            
            </p>
          </h1>
          {/*end alternative header*/}


{/*------------------- Start Images Added for Effect -----------------------------*/}

 {/* Background Images - Absolutely positioned for "scattered" effect with animations */}
      {/* IMPORTANT: These images now have a higher z-index (z-30) to appear on top of the content div (z-20) */}
      {/* Replace placeholder URLs with your actual image URLs (e.g., from Supabase)  */}

      {/* Image 1: Top-left, floating circle */}
      <img
        src="https://selrznkggmoxbpflzwjz.supabase.co/storage/v1/object/public/poetiq_homepage/sign_lpa_v2.png"
        //alt="Abstract blue shape"
        className="absolute top-16 sm:top-16 left-1/4 animate-float opacity-90 w-20 h-20 sm:w-40 sm:h-40 rounded-md  z-30"
        style={{ animationDelay: '0s', animationDuration: '6s' }}
        onError={(e) => { e.target.onerror = null; e.target.src = "https://selrznkggmoxbpflzwjz.supabase.co/storage/v1/object/public/poetiq_homepage/sign_lpa_v2.png"; }}
      />
      
      {/* Image 3: Mid-right, smaller floating circle */}
      <img
        src="https://selrznkggmoxbpflzwjz.supabase.co/storage/v1/object/public/poetiq_homepage/funding_status.png"
        alt="Abstract green shape"
        className="absolute top-1/4 right-1 sm:top-1/3 sm:right-10 animate-float opacity-90 w-20 h-20 sm:w-40 sm:h-40 rounded-md z-30"
        style={{ animationDelay: '4s', animationDuration: '5s' }}
        onError={(e) => { e.target.onerror = null; e.target.src = "https://selrznkggmoxbpflzwjz.supabase.co/storage/v1/object/public/poetiq_homepage/funding_status.png"; }}
      />
        
      {/* Image 5: Mid-left, medium floating circle */}
      <img
        
        src="https://selrznkggmoxbpflzwjz.supabase.co/storage/v1/object/public/poetiq_homepage/proof_of_id_v2.png"
        alt="Abstract red shape"
        className="absolute top-1/4 sm:top-1/2 left-4 sm:left-10 transform -translate-y-1/2 animate-float opacity-90 w-20 h-20 sm:w-40 sm:h-40 rounded-full z-30"
        style={{ animationDelay: '3s', animationDuration: '6.5s' }}
        onError={(e) => { e.target.onerror = null; e.target.src = "https://selrznkggmoxbpflzwjz.supabase.co/storage/v1/object/public/poetiq_homepage/proof_of_id_v2.png"; }}
      />
      {/* Image 6: Top-right, smaller floating shape (rounded-lg rotated 45deg for a diamond look) */}
      <img
        src="https://selrznkggmoxbpflzwjz.supabase.co/storage/v1/object/public/poetiq_homepage/capital_at_risk.png"
        alt="Abstract purple shape"
        className="hidden sm:block absolute top-16 right-1/4 animate-float opacity-90 w-46 h-46 sm:w-40 sm:h-40 rounded-lg transform rotate-15 z-30"
        style={{ animationDelay: '5s', animationDuration: '5.5s' }}
        onError={(e) => { e.target.onerror = null; e.target.src = "https://selrznkggmoxbpflzwjz.supabase.co/storage/v1/object/public/poetiq_homepage/capital_at_risk.png"; }}
      />

      {/* Custom CSS for float animation */}
      <style>{`
        @keyframes float {
          0% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-15px) rotate(5deg); /* Move up and slightly rotate */
          }
          100% {
            transform: translateY(0px) rotate(0deg);
          }
        }
        .animate-float {
          animation-name: float;
          animation-iteration-count: infinite; /* Keeps repeating indefinitely */
          animation-timing-function: ease-in-out; /* Smooth start and end */
          animation-direction: alternate; /* Plays forward then backward for a smooth loop */
        }
      `}</style>



        
{/*-------------------- End images Added for effect -----------------------------*/}          

{/*---------------- Start Adding the main hero image ------------------*/}    

<div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 items-center mx-auto w-fit"> 
    {/* Adjusted button layout for mobile */}          
<div className="mt-12 mb-6 flex flex-col sm:flex-row items-center justify-center gap-4">
  <button
    onClick={openCommunityModal}
    type="submit"
    className="flex items-center space-x-2 w-full sm:w-auto bg-gradient-to-r from-red-500 to-red-600 text-white px-8 py-4 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-10 shadow-red-500/60 hover:shadow-red-500/80  group"
  >    
    {/*<span className="hidden sm:inline"> Get Started for Free </span>*/}
    <span className="hidden sm:inline"> Join Waitlist </span>
    {/*<span className="sm:hidden items-center"> Get Started for Free </span>*/}
    <span className="sm:hidden items-center"> Join Waitlist </span>
    <span><ArrowRight className="w-4 h-4 sm:w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" /></span>  
  </button>
</div> 
</div>  

{/*------------ start poetiq image design image ----------------------*/}          
<div className="hidden sm:inline mt-12 mb-8 w-full max-w-6xl mx-auto px-4">

<div className="relative h-full overflow-hidden rounded-2xl shadow-xl transform transition-all duration-300 hover:scale-105 shadow-red-300/60 hover:shadow-3xl border-4 border-red-200 hover:p-2 hover:border-red-500 hover:shadow-red-500/60 group">
  
  <img   
    src="https://selrznkggmoxbpflzwjz.supabase.co/storage/v1/object/public/poetiq_homepage/poetiq_hero_v2.png"
    alt="Poetiq Community"
    className="w-full h-auto rounded-2xl object-cover"
  />

  {/*----------- start the styling for the image here --------------------*/}

 <div className="absolute bg-gray-900 inset-0 opacity-0 duration-500 transition-colors transition-opacity group-hover:opacity-45 pointer-events-none"></div>
    <div className="absolute top-60 left-0 right-0 p-4 text-white text-center transition-opacity duration-500 opacity-0 group-hover:opacity-100">
        <TooltipHelp className="text-lg" text="🧡 Fix Eldercare Gaps for Mom!">
          <button
            onClick={openOnboardingModal}
            className="group items-center flex items-center mx-auto space-x-2 sm:w-auto p-1 bg-red-500 text-white text-base font-semibold rounded-lg hover:bg-red-600 opacity-0 group-hover:opacity-100 transition-colors shadow-md shadow-red-500/60 hover:shadow-xl hover:shadow-red-500/80 sm:px-8 sm:py-2 sm:text-lg justify-center mb-6">
           
           <span className="text-2xl font-bold">Try Gap Finder</span>
           <ArrowRight className="w-4 h-4 transition-transform duration-500 group-hover:translate-x-1" />
          </button>
        </TooltipHelp>
                <h3 className="text-3xl font-semibold drop-shadow-lg whitespace-pre-line">
                  Identify legal & financial gaps<br/> you need to fix now 
                  {/*<ShieldCheck className="w-8 h-8 fill-red-500 justify-center align-middle text-white ml-1 inline"/>*/}
                </h3>

      <ShieldCheck className="w-32 h-32 mt-4 fill-red-500/80 transition-colors hover:fill-red-500 hover:text-white duration-500 justify-center align-middle text-red-50/95 ml-1 inline"/>
            </div>



  {/*------------- end the styling for the image here ---------------------*/}
  
  
</div>   

</div> 

{/*---------- end poetiq main image design image ----------------------------*/}        


{/*----------- starting adding main hero image (mobile)-----------*/}          

{/*hide Image for Mobile Devices*/}
<div className="hidden w-full p-4 mt-2">
  <div className="grid grid-cols-1 h-[450px]">
     {/* Column 4: One image, spanning two rows */}
        <div className="col-span-1">
          <div className="relative overflow-hidden bg-red-50/90 rounded-xl shadow-2xl shadow-red-500/60 transform transition-all duration-300 hover:scale-105 h-full group">
            <img
              src = "https://selrznkggmoxbpflzwjz.supabase.co/storage/v1/object/public/poetiq_homepage/poetiq_mobile_image_v1.png"
              alt="Caregivers"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
    </div>
  </div>

{/*------------ end adding main hero image (mobile) --------------*/}             

          
          
          <p className="hidden sm:block text-center text-gray-700 font-semibold text-xl sm:text-2xl text-gray-600 mx-auto">  
             Trusted by <b className="text-red-400 font-bold">120+ Career Professionals</b> actively supporting elderly parents
          </p>  

          <p className="sm:hidden text-xs text-center text-gray-700 font-semibold text-xl sm:text-2xl text-gray-600 mx-auto">  
            Trusted by <b className="text-red-400">120+ Family Members</b> <br/> Supporting Elderly Parents
          </p> 

          {/*--------------- start Social Proof Section ---------------- */}
          <div className="justify-center relative flex items-center sm:gap-6 gap-2 mt-4">
            {/* Overlapping Avatars */}
            <div className="flex -space-x-3">
              <img
                  src="https://i.pravatar.cc/150?img=1"
                  alt="User 1"
                  className="hidden sm:block w-10 h-10 rounded-full border-2 border-white object-cover"
                />
              <img
                  src="https://i.pravatar.cc/150?img=2"
                  alt="User 2"
                  className="w-10 h-10 rounded-full border-2 border-white object-cover"
              />
              <img
                  src="https://i.pravatar.cc/150?img=3"
                  alt="User 3"
                  className="w-10 h-10 rounded-full border-2 border-white object-cover"
              />
              <img
                  src="https://i.pravatar.cc/150?img=4"
                  alt="User 4"
                  className="w-10 h-10 rounded-full border-2 border-white object-cover"
              />
              <img
                  src="https://i.pravatar.cc/150?img=5"
                  alt="User 5"
                  className="w-10 h-10 rounded-full border-2 border-white object-cover"
              />
              <img
                  src="https://i.pravatar.cc/150?img=6"
                  alt="User 6"
                  className="w-10 h-10 rounded-full border-2 border-white object-cover"
              />
          </div>

            {/* Stars and Text */}
                <div className="hidden sm:flex flex-col gap-1">
                  <div className="flex gap-0.5">
                    <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                    <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                    <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                    <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                    <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  </div>
                    <p className="text-sm font-medium text-gray-700">1,200 hrs saved</p>
                </div>            
            </div>

          <div className="sm:hidden items-center flex flex-col gap-1">
                  <div className="flex gap-0.5">
                    <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                    <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                    <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                    <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                    <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  </div>
                    <p className="text-sm font-medium text-gray-700">1,200 hrs saved</p>
                </div>  


          {/*----- end social proof section here -------------*/}          

          
          
{/*------------ end new poetiq dashboard image --------------------------*/}

{/*          
<div className="hidden sm:inline mt-12 mb-8 w-full max-w-6xl mx-auto px-4">

<div className="relative h-full overflow-hidden rounded-xl shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-xl border hover:p-2 hover:border-red-500 group">
  
  <img   
    src="https://selrznkggmoxbpflzwjz.supabase.co/storage/v1/object/public/poetiq_homepage/poetiq_hero_v1.png"
    alt="Poetiq Community"
    className="w-full h-auto rounded-2xl object-cover"
  />
  
  <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent pointer-events-none"></div>
  
</div> 

  {/* Video Template  
<div style={{ padding: '56.25% 0 0 0', position: 'relative' }}>
   <video
              //src="https://selrznkggmoxbpflzwjz.supabase.co/storage/v1/object/public/user-post-videos/sosavvy_video_no_intro.mp4"
              src="https://selrznkggmoxbpflzwjz.supabase.co/storage/v1/object/public/poetiq_homepage/readiness_dashboard.mp4"
              poster="https://selrznkggmoxbpflzwjz.supabase.co/storage/v1/object/public/user-post-videos/sosavvy_video_cover_image.png"
              className="absolute top-0 left-0 w-full h-full object-cover"
              controls           // Shows playback controls (play/pause, volume, fullscreen)
              //autoPlay           // Starts playing automatically (often requires 'muted')
              loop               // Loops the video automatically
              muted              // Essential for autoplay to work in most browsers
              playsInline        // Recommended for mobile browsers to play video inline
      >
    
             
             </video>   
</div>
// end of video commented out
  
</div>

end of old hero image */}

{/*---------------- End Adding the main hero image ----------------*/}          

{/*---------------- Start Newsletter Section ----------------*/}            

{/*
      <p className="mt-16 mb-1 text-sm sm:text-sm md:text-lg text-red-400 font-normal">
            <span> Get the latest Eldercare Guide 💌</span>
        </p>

<div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 items-center mx-auto w-fit"> 
    // Adjusted button layout for mobile 

<div className="mt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
  <button
    onClick={openNewsletterModal}
    type="submit"
    className="flex items-center space-x-2 w-full sm:w-auto bg-gradient-to-r from-red-500 to-red-400 text-white px-8 py-3 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
  >
    
    <span className="hidden sm:inline"> Join Our Newsletter </span>
    <span className="sm:hidden"> Join Newsletter </span>
    <span> <MailCheck className="w-4 h-4 sm:w-5 h-5"/> </span>
    
  </button>
</div>
    
</div>

{/*----------------------- End Newsletter Section ----------------------*/}
        
</div>
        

{/*----------------- Start The Struggle Support ----------------------- */}
<section id="TheStruggle" className="text-center scroll-mt-24">
  
 <h2 className="hidden sm:block text-2xl text-red-400 sm:text-4xl md:text-5xl font-bold leading-tight mt-4 mb-4">
   Struggling with long-term care for mom?
  </h2>

  <h2 className="sm:hidden text-2xl text-red-400 sm:text-4xl md:text-5xl font-bold leading-tight mt-8 mb-4">
    Struggling with <br/> long-term care for mom?
  </h2>
  
  <p className="hidden sm:inline text-xl sm:text-2xl text-gray-600 mb-8 mx-auto hover:text-red-500">  
      If you recognize yourself in any of the scenarios below, you need a reset.
  </p>  

  <p className="sm:hidden text-lg sm:text-2xl text-gray-600 mb-8 mx-auto hover:text-red-500">  
      If any of the scenarios below sound familiar, then you need a reset.
  </p> 

  {/* 3x2 Grid of Cards */}
  <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
    
    {/* Card 1: Feeling Mentally Broken */}
    <div className="group bg-white border-2 border-red-100 hover:border-red-400 rounded-xl p-6 shadow-lg hover:shadow-2xl hover:shadow-red-500/30 transition-all duration-300 hover:-translate-y-2">
      <div className="flex items-center justify-center w-14 h-14 bg-red-50 rounded-full mb-4 group-hover:bg-red-100 transition-colors">
        <Brain className="w-7 h-7 text-red-500 group-hover:scale-110 transition-transform" />
      </div>
      <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-red-500 transition-colors">
        Fighting Mental Fatigue
      </h3>
      <p className="text-gray-600 text-sm leading-relaxed mb-6">
        You appear super focused at work but you're silently breaking. You context switch between work related tasks and eldercare firefighting, pushing your mental capacity to breaking point.
      </p>
      <button
        onClick={openMentallyBrokenModal}
        //className="w-full py-3 px-4 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600 transition-all duration-300 shadow-md hover:shadow-lg hover:shadow-red-500/50 flex items-center justify-center space-x-2 group/btn"
        className="w-full py-3 px-4 bg-red-50 border-2 border-red-200 text-red-500 font-semibold rounded-lg hover:bg-red-100/30 transition-all duration-300 shadow-md hover:text-red-600 hover:shadow-lg hover:shadow-red-500/50 flex items-center justify-center space-x-2 group/btn"
      >
        <span>Restore your Focus</span>
        <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
      </button>
    </div>

    {/* Card 2: Managing Inefficient Systems */}
    <div className="group bg-white border-2 border-red-100 hover:border-red-400 rounded-xl p-6 shadow-lg hover:shadow-2xl hover:shadow-red-500/30 transition-all duration-300 hover:-translate-y-2">
      <div className="flex items-center justify-center w-14 h-14 bg-red-50 rounded-full mb-4 group-hover:bg-red-100 transition-colors">
        <Target className="w-7 h-7 text-red-500 group-hover:scale-110 transition-transform" />
      </div>
      <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-red-500 transition-colors">
        {/*Navigating Inefficient Systems*/}
        Frustrated with <br className="sm:hidden"/> Inefficient Systems
      </h3>
      <p className="text-gray-600 text-sm leading-relaxed mb-6">
        {/*At work, you optimize and delegate. In caregiving, you're trapped in a maze of broken bureaucracy, chasing insurance claims and care agencies that don't share your sense of urgency or standards.*/}

        At work, you optimize and delegate. When you take care of mom, you're trapped in a maze of broken bureaucracy. You chase insurance claims and care agencies that don't share your urgency. 
      </p>
      <button
        //onClick={openCommunityModal}
        onClick={openNavigateSystemsModal}
        //className="w-full py-3 px-4 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600 transition-all duration-300 shadow-md hover:shadow-lg hover:shadow-red-500/50 flex items-center justify-center space-x-2 group/btn"
        className="w-full py-3 px-4 bg-red-50 border-2 border-red-200 text-red-500 font-semibold rounded-lg hover:bg-red-100/30 transition-all duration-300 shadow-md hover:text-red-600 hover:shadow-lg hover:shadow-red-500/50 flex items-center justify-center space-x-2 group/btn"
      >
        <span>Fix the Logistics</span>
        <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
      </button>
    </div>

    {/* Card 3: Consumed by $10k/mo Bills */}
    <div className="group bg-white border-2 border-red-100 hover:border-red-400 rounded-xl p-6 shadow-lg hover:shadow-2xl hover:shadow-red-500/30 transition-all duration-300 hover:-translate-y-2">
      <div className="flex items-center justify-center w-14 h-14 bg-red-50 rounded-full mb-4 group-hover:bg-red-100 transition-colors">
        <CircleDollarSign className="w-7 h-7 text-red-500 group-hover:scale-110 transition-transform" />
      </div>
      <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-red-500 transition-colors">
        Consumed by <br className="sm:hidden"/>Monthly Care Bills
      </h3>
      <p className="text-gray-600 text-sm leading-relaxed mb-6">
        You watch your mom's entire life savings and your own financial reserves evaporate into $10,000 a month care costs. Every agency invoice feels like a countdown you simply can't stop. 
      </p>
      <button
        onClick={openConsumedByBillsModal}
        //className="w-full py-3 px-4 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600 transition-all duration-300 shadow-md hover:shadow-lg hover:shadow-red-500/50 flex items-center justify-center space-x-2 group/btn"
        className="w-full py-3 px-4 bg-red-50 border-2 border-red-200 text-red-500 font-semibold rounded-lg hover:bg-red-100/30 transition-all duration-300 shadow-md hover:text-red-600 hover:shadow-lg hover:shadow-red-500/50 flex items-center justify-center space-x-2 group/btn"
      >
        <span>Protect your Legacy</span>
        <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
      </button>
    </div>

    {/* Card 4: Skipping Career Opportunities */}
    <div className="hidden sm:block group bg-white border-2 border-red-100 hover:border-red-400 rounded-xl p-6 shadow-lg hover:shadow-2xl hover:shadow-red-500/30 transition-all duration-300 hover:-translate-y-2">
      <div className="flex items-center justify-center w-14 h-14 bg-red-50 rounded-full mb-4 group-hover:bg-red-100 transition-colors">
        <Briefcase className="w-7 h-7 text-red-500 group-hover:scale-110 transition-transform" />
      </div>
      <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-red-500 transition-colors">
        {/*Skipping Career Opportunities*/}
        Missed Career Opportunities
      </h3>
      <p className="text-gray-600 text-sm leading-relaxed mb-6">
        You've started saying "no" to the travel, the dinners, and the golf days that would have opened doors for you. Your career is stalling because you simply can't be in two places at once.
      </p>
      <button
        //onClick={openCommunityModal}
        onClick={openCareerOppsModal}
        //className="w-full py-3 px-4 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600 transition-all duration-300 shadow-md hover:shadow-lg hover:shadow-red-500/50 flex items-center justify-center space-x-2 group/btn"

        className="w-full py-3 px-4 bg-red-50 border-2 border-red-200 text-red-500 font-semibold rounded-lg hover:bg-red-100/30 transition-all duration-300 shadow-md hover:text-red-600 hover:shadow-lg hover:shadow-red-500/50 flex items-center justify-center space-x-2 group/btn"
      >
        <span>Reclaim your Career</span>
        <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
      </button>
    </div>

    {/* Card 5: Broken by Family Responsibilities */}
    <div className="hidden sm:block group bg-white border-2 border-red-100 hover:border-red-400 rounded-xl p-6 shadow-lg hover:shadow-2xl hover:shadow-red-500/30 transition-all duration-300 hover:-translate-y-2">
      <div className="flex items-center justify-center w-14 h-14 bg-red-50 rounded-full mb-4 group-hover:bg-red-100 transition-colors">
        <Users className="w-7 h-7 text-red-500 group-hover:scale-110 transition-transform" />
      </div>
      <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-red-500 transition-colors">
        Tired of Family Responsibilities
      </h3>
      <p className="text-gray-600 text-sm leading-relaxed mb-6">
        It's not just the parent, it's the sibling infighting, the lack of support, and the weight of being the "responsible one." You're the pillar everyone leans on, but you have no one to lean on yourself.
      </p>
      <button
        //onClick={openCommunityModal}
        onClick={openBrokenByFamilyModal}
        //className="w-full py-3 px-4 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600 transition-all duration-300 shadow-md hover:shadow-lg hover:shadow-red-500/50 flex items-center justify-center space-x-2 group/btn"
        className="w-full py-3 px-4 bg-red-50 border-2 border-red-200 text-red-500 font-semibold rounded-lg hover:bg-red-100/30 transition-all duration-300 shadow-md hover:text-red-600 hover:shadow-lg hover:shadow-red-500/50 flex items-center justify-center space-x-2 group/btn"
      >
        <span>Share the Burden</span>
        <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
      </button>
    </div>

    {/* Card 6: Being Permanently On-Call */}
    <div className="hidden sm:block group bg-white border-2 border-red-100 hover:border-red-400 rounded-xl p-6 shadow-lg hover:shadow-2xl hover:shadow-red-500/30 transition-all duration-300 hover:-translate-y-2">
      <div className="flex items-center justify-center w-14 h-14 bg-red-50 rounded-full mb-4 group-hover:bg-red-100 transition-colors">
        <Timer className="w-7 h-7 text-red-500 group-hover:scale-110 transition-transform" />
      </div>
      <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-red-500 transition-colors">
        Being Permanently On-Call
      </h3>
      <p className="text-gray-600 text-sm leading-relaxed mb-6">
        You live in a constant state of high-alert. Every late-night call or unexpected text is a potential day-off at work, leaving you in a cycle of chronic stress that means you now wake up at 3 a.m. every day.
      </p>
      <button
        //onClick={openCommunityModal}
         onClick={openOnCallStressModal}
        //className="w-full py-3 px-4 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600 transition-all duration-300 shadow-md hover:shadow-lg hover:shadow-red-500/50 flex items-center justify-center space-x-2 group/btn"
        className="w-full py-3 px-4 bg-red-50 border-2 border-red-200 text-red-500 font-semibold rounded-lg hover:bg-red-100/30 transition-all duration-300 shadow-md hover:text-red-600 hover:shadow-lg hover:shadow-red-500/50 flex items-center justify-center space-x-2 group/btn"
      >
        <span>Find your Peace</span>
        <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
      </button>
    </div>

  </div>
</section>
{/*------------------- End the Struggle ---------------------*/}  




{/*----------------- Start The Reset Support ----------------------- */}
<section id="TheReset" className="mt-32 text-center scroll-mt-24">
  
 <h2 className="hidden sm:block text-2xl text-red-400 sm:text-4xl md:text-5xl font-bold leading-tight mt-4 mb-4">
   {/*What a Strategic Reset looks like*/}
   These amazing people found a way!
  </h2>

  <h2 className="sm:hidden text-2xl text-red-400 sm:text-4xl md:text-5xl font-bold leading-tight mt-4 mb-4">
    {/*What a Strategic Reset <br/> looks like*/}
    These amazing people <br/> found a way!
  </h2>
  
  <p className="text-lg sm:text-2xl text-gray-600 mb-8 mx-auto hover:text-red-500">  
  Real results from senior leaders who reclaimed their careers.
  </p>  

   {/* Testimonials Grid - 3 Columns */}
  <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
    
    {/* Testimonial Card 1: David Simmons */}
    <div className="group bg-white border-2 border-red-100 hover:border-red-400 rounded-xl p-6 shadow-lg hover:shadow-2xl hover:shadow-red-500/30 transition-all duration-300 hover:-translate-y-2 text-left">
      {/* Avatar and Identity Section */}
      <div className="flex items-center mb-6">
        <img
          src="https://i.pravatar.cc/150?img=12"
          alt="David Simmons"
          className="w-14 h-14 rounded-full border-2 border-red-200 group-hover:border-red-400 transition-colors object-cover"
        />
        <div className="ml-4">
          <h3 className="text-lg font-bold text-gray-800 group-hover:text-red-500 transition-colors">
            David Simmons
          </h3>
          <p className="text-sm text-gray-600 font-medium">
            Managing Director, Global FinTech
          </p>
        </div>
      </div>
      
      {/* Testimonial Quote */}
      <div className="relative">
        <svg className="absolute -top-2 -left-1 w-8 h-8 text-red-200 opacity-50" fill="currentColor" viewBox="0 0 32 32">
          <path d="M10 8c-3.3 0-6 2.7-6 6v10h10V14H8c0-1.1.9-2 2-2h2V8h-2zm14 0c-3.3 0-6 2.7-6 6v10h10V14h-6c0-1.1.9-2 2-2h2V8h-2z"/>
        </svg>
        <p className="text-gray-700 text-sm leading-relaxed pl-6 italic">
          "I was essentially running two full-time companies my actual firm and my parents' care team. The context switching was eroding my performance and my health. This service didn't just 'help' with the logistics; it gave me back my executive bandwidth. I'm back to leading my team with 100% focus, knowing the 'home front' is handled by experts who move at my speed."
        </p>
      </div>
    </div>

    {/* Testimonial Card 2: Judy Walters */}
    <div className="group bg-white border-2 border-red-100 hover:border-red-400 rounded-xl p-6 shadow-lg hover:shadow-2xl hover:shadow-red-500/30 transition-all duration-300 hover:-translate-y-2 text-left">
      {/* Avatar and Identity Section */}
      <div className="flex items-center mb-6">
        <img
          src="https://i.pravatar.cc/150?img=47"
          alt="Judy Walters"
          className="w-14 h-14 rounded-full border-2 border-red-200 group-hover:border-red-400 transition-colors object-cover"
        />
        <div className="ml-4">
          <h3 className="text-lg font-bold text-gray-800 group-hover:text-red-500 transition-colors">
            Judy Walters
          </h3>
          <p className="text-sm text-gray-600 font-medium">
            EVP of Operations
          </p>
        </div>
      </div>
      
      {/* Testimonial Quote */}
      <div className="relative">
        <svg className="absolute -top-2 -left-1 w-8 h-8 text-red-200 opacity-50" fill="currentColor" viewBox="0 0 32 32">
          <path d="M10 8c-3.3 0-6 2.7-6 6v10h10V14H8c0-1.1.9-2 2-2h2V8h-2zm14 0c-3.3 0-6 2.7-6 6v10h10V14h-6c0-1.1.9-2 2-2h2V8h-2z"/>
        </svg>
        <p className="text-gray-700 text-sm leading-relaxed pl-6 italic">
          "Before I found this 'reset,' I was one phone call away from a burnout-induced leave of absence. I was managing $12k monthly care invoices and navigating insurance red tape at 11 PM. Now, I have a strategic partner who manages the friction. For the first time in three years, I can actually take a business trip without the constant dread of an emergency I can't handle from 3,000 miles away."
        </p>
      </div>
    </div>

    {/* Testimonial Card 3: Debbie Richardson */}
    <div className="group bg-white border-2 border-red-100 hover:border-red-400 rounded-xl p-6 shadow-lg hover:shadow-2xl hover:shadow-red-500/30 transition-all duration-300 hover:-translate-y-2 text-left">
      {/* Avatar and Identity Section */}
      <div className="flex items-center mb-6">
        <img
          src="https://i.pravatar.cc/150?img=45"
          alt="Debbie Richardson"
          className="w-14 h-14 rounded-full border-2 border-red-200 group-hover:border-red-400 transition-colors object-cover"
        />
        <div className="ml-4">
          <h3 className="text-lg font-bold text-gray-800 group-hover:text-red-500 transition-colors">
            Debbie Richardson
          </h3>
          <p className="text-sm text-gray-600 font-medium">
            Chief Marketing Officer
          </p>
        </div>
      </div>
      
      {/* Testimonial Quote */}
      <div className="relative">
        <svg className="absolute -top-2 -left-1 w-8 h-8 text-red-200 opacity-50" fill="currentColor" viewBox="0 0 32 32">
          <path d="M10 8c-3.3 0-6 2.7-6 6v10h10V14H8c0-1.1.9-2 2-2h2V8h-2zm14 0c-3.3 0-6 2.7-6 6v10h10V14h-6c0-1.1.9-2 2-2h2V8h-2z"/>
        </svg>
        <p className="text-gray-700 text-sm leading-relaxed pl-6 italic">
          "The hardest part wasn't the money; it was the fact that I had stopped being a daughter and had become a full-time project manager. My relationship with my siblings was strained and my career was sidelined. This service acted as the 'COO' of my parents' care, allowing me to step back into my role as an executive and more importantly, as a daughter. It saved my career and my family dynamic."
        </p>
      </div>
    </div>
  </div>

  <button
    onClick={openCommunityModal}
    className="mt-8 items-center group flex items-center justify-center space-x-2 w-full sm:w-auto px-6 py-3 bg-red-500 text-white text-base font-semibold rounded-lg hover:bg-red-600 transition-colors shadow-lg shadow-red-500/60 hover:shadow-xl hover:shadow-red-500/80 sm:px-8 sm:py-4 sm:text-lg mx-auto">
    <span>Join Waitlist</span>
      <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
   </button> 
</section>

{/*----------------- End The Reset Support ----------------------- */}    


{/* -------------------- Start How It Works Section -------------------- */}

<section id="HowItWorks" className="mt-32 text-center scroll-mt-24">
  <h2 className="hidden sm:block text-2xl text-red-400 sm:text-4xl md:text-5xl font-bold leading-tight mt-4 mb-4">
    {/*How we make it stress-free for you*/}
    How we handle the logistics
  </h2>

  <h2 className="sm:hidden text-2xl text-red-400 sm:text-4xl md:text-5xl font-bold leading-tight mt-4 mb-4">
    How we handle the logistics
  </h2>
  <p className="text-lg sm:text-2xl text-gray-600 mb-16 mx-auto max-w-3xl hover:text-red-500">  
    {/*We fix the gaps in mom and dad's eldercare plans so you don't have to.*/}
    We find the hidden gaps, build a plan and take over all the admin.
  </p>  

  {/* Process Flow Container */}
  <div className="max-w-6xl mx-auto">
    
    {/* Step 1: Identify Hidden Gaps */}
    <div className="relative mb-20">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        
        {/* Left: Visual/Icon */}
        <div className="hidden sm:flex order-2 lg:order-1 flex justify-center lg:justify-end">
          <div className="relative">
            <div className="absolute -inset-4 bg-gradient-to-br from-red-100 to-red-50 rounded-3xl blur-xl opacity-60"></div>
            <div className="relative bg-white border-4 border-red-100 rounded-3xl p-12 shadow-2xl shadow-red-500/20">
              <div className="flex items-center justify-center w-24 h-24 bg-red-50 rounded-full mb-4 mx-auto">
                <Search className="w-12 h-12 text-red-500" />
              </div>
              <div className="flex items-center justify-center w-16 h-16 bg-red-500 text-white rounded-full text-3xl font-bold mx-auto -mt-2">
                1
              </div>
            </div>
          </div>
        </div>

        {/* Right: Content */}
        <div className="order-1 lg:order-2 text-left lg:pl-8">
          <div className="inline-block px-4 py-2 bg-red-50 border border-red-200 rounded-full text-red-600 font-semibold text-sm mb-4">
            STEP 1
          </div>
          <h3 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Identify Hidden Gaps
          </h3>
          <p className="text-md sm:text-lg text-gray-600 leading-relaxed mb-6">
            {/*Use our Gap Finder to instantly reveal the critical vulnerabilities in your eldercare plan. Most families miss an average of 14 essential protections that leave them exposed to financial and legal risks.*/}
            Use our Gap Finder to instantly reveal the critical blind spots in your parent's long-term care setup. Most families miss at least 14 essential protections, leaving them exposed to massive out-of-pocket legal and financial liabilities.
          </p>
          <div className="flex flex-wrap gap-3">
            <span className="inline-flex items-center px-4 py-2 bg-white border-2 border-red-100 rounded-lg text-sm font-medium text-gray-700 shadow-sm">
              <ShieldAlert className="w-4 h-4 text-red-500 mr-2" />
              Legal Gaps
            </span>
            <span className="inline-flex items-center px-4 py-2 bg-white border-2 border-red-100 rounded-lg text-sm font-medium text-gray-700 shadow-sm">
              <CircleDollarSign className="w-4 h-4 text-red-500 mr-2" />
              Financial Risks
            </span>
            <span className="inline-flex items-center px-4 py-2 bg-white border-2 border-red-100 rounded-lg text-sm font-medium text-gray-700 shadow-sm">
              <HeartPulse className="w-4 h-4 text-red-500 mr-2" />
              Care Quality
            </span>
          </div>
        </div>
      </div>

      {/* Connection Line */}
      <div className="hidden lg:block absolute left-1/2 -bottom-10 w-1 h-20 bg-gradient-to-b from-red-300 to-red-100 transform -translate-x-1/2"></div>
    </div>

    {/* Step 2: Close the Gaps */}
    <div className="relative mb-20 bg-red-50 rounded-3xl p-8 lg:p-12 border-2 border-red-100 shadow-xl shadow-red-500/10">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        
        {/* Left: Content */}
        <div className="order-1 text-left lg:pr-8">
          <div className="inline-block px-4 py-2 bg-white border border-red-300 rounded-full text-red-600 font-semibold text-sm mb-4">
            STEP 2
          </div>
          <h3 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Build your Strategy
          </h3>
          <p className="text-md sm:text-lg text-gray-600 leading-relaxed mb-6">
            Use our suite of specialized tools and services to repair the gaps in your parent’s setup. From nursing home contract analysis to spend-down calculations and expert legal referrals, we handle the complexity while you stay in control.
          </p>
          
          {/* Tool Grid */}
          <div className="grid grid-cols-2 gap-3">
            <div className="flex items-center space-x-2 bg-white rounded-lg p-3 border border-red-100 shadow-sm">
              <FileText className="w-5 h-5 text-red-500 flex-shrink-0" />
              <span className="text-sm font-medium text-gray-700">Contract Analyzer</span>
            </div>
            <div className="flex items-center space-x-2 bg-white rounded-lg p-3 border border-red-100 shadow-sm">
              <Shield className="w-5 h-5 text-red-500 flex-shrink-0" />
              <span className="text-sm font-medium text-gray-700">Elder Attorneys</span>
            </div>
            <div className="flex items-center space-x-2 bg-white rounded-lg p-3 border border-red-100 shadow-sm">
              <Headset className="w-5 h-5 text-red-500 flex-shrink-0" />
              <span className="text-sm font-medium text-gray-700">Virtual Assistants</span>
            </div>
            <div className="flex items-center space-x-2 bg-white rounded-lg p-3 border border-red-100 shadow-sm">
              <TrendingUp className="w-5 h-5 text-red-500 flex-shrink-0" />
              <span className="text-sm font-medium text-gray-700">Spend-Down Plans</span>
            </div>
          </div>
        </div>

        {/* Right: Visual/Icon */}
        <div className="hidden sm:flex order-2 flex justify-center lg:justify-start">
          <div className="relative">
            <div className="absolute -inset-4 bg-gradient-to-br from-red-200 to-red-100 rounded-3xl blur-xl opacity-60"></div>
            <div className="relative bg-white border-4 border-red-200 rounded-3xl p-12 shadow-2xl shadow-red-500/30">
              <div className="flex items-center justify-center w-24 h-24 bg-red-50 rounded-full mb-4 mx-auto">
                <Zap className="w-12 h-12 text-red-500" />
              </div>
              <div className="flex items-center justify-center w-16 h-16 bg-red-500 text-white rounded-full text-3xl font-bold mx-auto -mt-2">
                2
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Connection Line */}
      <div className="hidden lg:block absolute left-1/2 -bottom-10 w-1 h-20 bg-gradient-to-b from-red-300 to-red-100 transform -translate-x-1/2 z-10"></div>
    </div>

    {/* Step 3: Stay Organized */}
    <div className="relative mb-20">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        
        {/* Left: Visual/Icon */}
        <div className="hidden sm:flex order-2 lg:order-1 flex justify-center lg:justify-end">
          <div className="relative">
            <div className="absolute -inset-4 bg-gradient-to-br from-red-100 to-red-50 rounded-3xl blur-xl opacity-60"></div>
            <div className="relative bg-white border-4 border-red-100 rounded-3xl p-12 shadow-2xl shadow-red-500/20">
              <div className="flex items-center justify-center w-24 h-24 bg-red-50 rounded-full mb-4 mx-auto">
                <DatabaseZap className="w-12 h-12 text-red-500" />
              </div>
              <div className="flex items-center justify-center w-16 h-16 bg-red-500 text-white rounded-full text-3xl font-bold mx-auto -mt-2">
                3
              </div>
            </div>
          </div>
        </div>

        {/* Right: Content */}
        <div className="order-1 lg:order-2 text-left lg:pl-8">
          <div className="inline-block px-4 py-2 bg-red-50 border border-red-200 rounded-full text-red-600 font-semibold text-sm mb-4">
            STEP 3
          </div>
          <h3 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Centralize your Assets
          </h3>
          <p className="text-md sm:text-lg text-gray-600 leading-relaxed mb-6">
            Your Eldercare Data Vault keeps all critical documents, medical records, and legal paperwork in one secure place. Share updates with family members instantly and eliminate the chaos of scattered information.
          </p>
          <div className="space-y-3">
            <div className="flex items-start space-x-3 bg-white rounded-lg p-4 border-2 border-red-100 shadow-sm">
              <CheckCircle2 className="w-6 h-6 text-red-500 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-gray-800 text-sm">Secure Document Storage</p>
                <p className="text-gray-600 text-xs mt-1">Encrypted storage for all sensitive family assets.</p>
              </div>
            </div>
            <div className="flex items-start space-x-3 bg-white rounded-lg p-4 border-2 border-red-100 shadow-sm">
              <CheckCircle2 className="w-6 h-6 text-red-500 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-gray-800 text-sm">Family Collaboration</p>
                <p className="text-gray-600 text-xs mt-1">Keep family members informed with real-time updates</p>
              </div>
            </div>
            <div className="flex items-start space-x-3 bg-white rounded-lg p-4 border-2 border-red-100 shadow-sm">
              <CheckCircle2 className="w-6 h-6 text-red-500 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-gray-800 text-sm">24/7 Access</p>
                <p className="text-gray-600 text-xs mt-1">Access critical information whenever you need it</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Connection Line from Step 3 to Step 4 */}
      <div className="hidden lg:block absolute left-1/2 -bottom-10 w-1 h-20 bg-gradient-to-b from-red-300 to-red-100 transform -translate-x-1/2"></div>
    </div>

    {/* Step 4: Save Money & Protect Your Career */}
    <div className="relative mt-20 bg-gradient-to-br from-red-50 via-red-50 to-white rounded-3xl p-8 lg:p-12 border-4 border-red-200 shadow-2xl shadow-red-500/20">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        
        {/* Left: Content */}
        <div className="order-1 text-left lg:pr-8">
          <div className="inline-block px-4 py-2 bg-white border-2 border-red-400 rounded-full text-red-600 font-semibold text-sm mb-4">
            STEP 4
          </div>
          <h3 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Maximize your Savings
          </h3>
          <p className="text-md sm:text-lg text-gray-600 leading-relaxed mb-6">
            Stop losing $10,000/month to long-term care bills. Our team fights to win insurance appeals and unlock hidden coverage so you can protect your family's assets and your own professional bandwidth.
          </p>
          
          {/* Financial Impact Grid */}
          <div className="space-y-4">
            <div className="flex items-start space-x-4 bg-white rounded-xl p-5 border-2 border-red-200 shadow-md hover:shadow-lg hover:border-red-300 transition-all duration-300">
              <div className="flex items-center justify-center w-12 h-12 bg-red-100 rounded-full flex-shrink-0">
                <CircleDollarSign className="w-6 h-6 text-red-600" />
              </div>
              <div>
                <p className="font-bold text-gray-900 text-base">Slash Monthly Costs</p>
                <p className="text-gray-600 text-sm mt-1">
                  {/*Average savings of $10,000+ per month through strategic spend-down and coverage optimization*/}
                  Save $10,000+ per month through strategic coverage optimization and spend-down planning.</p>
              </div>
            </div>

            <div className="flex items-start space-x-4 bg-white rounded-xl p-5 border-2 border-red-200 shadow-md hover:shadow-lg hover:border-red-300 transition-all duration-300">
              <div className="flex items-center justify-center w-12 h-12 bg-red-100 rounded-full flex-shrink-0">
                <ShieldCheck className="w-6 h-6 text-red-600" />
              </div>
              <div>
                <p className="font-bold text-gray-900 text-base">Win Insurance Appeals</p>
                <p className="text-gray-600 text-sm mt-1">
                  {/*87% success rate on long-term care insurance appeals with our specialized legal team*/}
                  Overturn denied claims with our legal partners, and secure the benefits your parents are owed.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4 bg-white rounded-xl p-5 border-2 border-red-200 shadow-md hover:shadow-lg hover:border-red-300 transition-all duration-300">
              <div className="flex items-center justify-center w-12 h-12 bg-red-100 rounded-full flex-shrink-0">
                <Briefcase className="w-6 h-6 text-red-600" />
              </div>
              <div>
                <p className="font-bold text-gray-900 text-base">Protect Your Career</p>
                <p className="text-gray-600 text-sm mt-1">Focus on your professional responsibilities while we handle the back-and-forth with insurance claims and paperwork.</p>
              </div>
            </div>

            <div className="flex items-start space-x-4 bg-white rounded-xl p-5 border-2 border-red-200 shadow-md hover:shadow-lg hover:border-red-300 transition-all duration-300">
              <div className="flex items-center justify-center w-12 h-12 bg-red-100 rounded-full flex-shrink-0">
                <Target className="w-6 h-6 text-red-600" />
              </div>
              <div>
                <p className="font-bold text-gray-900 text-base">Unlock Hidden Funding</p>
                <p className="text-gray-600 text-sm mt-1">Identify Medicaid, VA benefits, and state-specific programs to protect your parent's estate from unnecessary depletion.</p>
              </div>
            </div>
          </div>

          {/* Financial Impact Stat */}
          <div className="mt-6 bg-gradient-to-r from-red-600 to-red-500 rounded-xl p-6 text-white shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-red-100 text-sm font-medium mb-1">Average Annual Savings</p>
                <p className="text-2xl sm:text-4xl font-bold">$120,000+</p>
              </div>
              <div className="flex items-center justify-center w-16 h-16 bg-white/20 rounded-full backdrop-blur-sm">
                <TrendingUp className="w-8 h-8 text-white" />
              </div>
            </div>
            <p className="text-red-50 text-xs mt-3 italic">*Based on average client outcomes across 500+ families in 2024</p>
          </div>
        </div>

        {/* Right: Visual/Icon */}
        <div className="hidden sm:flex order-2 flex justify-center lg:justify-start">
          <div className="relative">
            <div className="absolute -inset-6 bg-gradient-to-br from-red-300 via-red-200 to-red-100 rounded-3xl blur-2xl opacity-70 animate-pulse"></div>
            <div className="relative bg-white border-4 border-red-300 rounded-3xl p-12 shadow-2xl shadow-red-500/40">
              <div className="flex items-center justify-center w-28 h-28 bg-gradient-to-br from-red-100 to-red-50 rounded-full mb-4 mx-auto border-4 border-red-200">
                <CircleDollarSign className="w-14 h-14 text-red-600" />
              </div>
              <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-red-600 to-red-500 text-white rounded-full text-3xl font-bold mx-auto -mt-2 shadow-lg shadow-red-500/50">
                4
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

  </div>

  {/* Enhanced Call to Action with Value Proposition */}
  <div className="mt-16 text-center">
    <p className="text-2xl font-bold text-gray-900 mb-4">
      Ready to save $120,000/year without the chasing and follow-ups?
    </p>
    <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
      Join 120+ professionals reclaiming their time and protecting their financial future.
    </p>
    <button
      onClick={openCommunityModal}
      className="group flex items-center justify-center space-x-2 w-full sm:w-auto px-8 py-4 bg-red-500 text-white text-lg font-semibold rounded-lg hover:bg-red-600 transition-all duration-300 shadow-lg shadow-red-500/60 hover:shadow-xl hover:shadow-red-500/80 mx-auto">
      {/*<span>Start Saving Today</span>*/}
      <span>Join Our Waitlist Today</span>
      <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
    </button>
    
    {/* Trust Indicators */}
    <div className="hidden sm:flex flex-wrap items-center justify-center gap-6 mt-8 text-sm text-gray-600">
      
      <div className="flex items-center space-x-2">
        <CheckCircle2 className="w-5 h-5 text-red-500" />
        <span>No Upfront Costs</span>
      </div>
      <div className="flex items-center space-x-2">
        <CheckCircle2 className="w-5 h-5 text-red-500" />
        <span>87% Appeal Success Rate</span>
      </div>
      <div className="flex items-center space-x-2">
        <CheckCircle2 className="w-5 h-5 text-red-500" />
        <span>120+ Families Helped</span>
      </div>
    </div>
    
  </div>

  <div className="sm:hidden space-y-3 mt-8 items-start">
            <div className="flex items-start space-x-3 bg-white rounded-lg p-4 border border-red-400">
              <CheckCircle2 className="w-6 h-6 text-red-500 flex-shrink-0 mt-0.5" />
              <div className="text-left">
                <p className="text-gray-600 text-sm mt-1">No Upfront Costs</p>
              </div>
            </div>
            <div className="flex items-start space-x-3 bg-white rounded-lg p-4 border border-red-400">
              <CheckCircle2 className="w-6 h-6 text-red-500 flex-shrink-0 mt-0.5" />
              <div className="text-left">
                <p className="text-gray-600 text-sm mt-1">87% Appeal Success Rate</p>
              </div>
            </div>
            <div className="flex items-start space-x-3 bg-white rounded-lg p-4 border border-red-400">
              <CheckCircle2 className="w-6 h-6 text-red-500 flex-shrink-0 mt-0.5" />
              <div className="text-left">
                <p className="text-gray-600 text-sm mt-1">120+ Families Helped</p>
              </div>
            </div>
          </div>

  {/*--------------- End the Trusted Indicators Section ---------------*/}

</section>

{/* -------------------- End How It Works Section -------------------- */}        


{/*----------------- Start Caregiving Support ----------------------- */}
<section id="OperationalSupport" className="text-center mt-32 scroll-mt-24">
  
  <h2 className="hidden sm:block text-2xl text-red-400 sm:text-4xl md:text-5xl font-bold leading-tight mt-4 mb-4">
    Let's move you from chaos to systems
  </h2>

  <h2 className="sm:hidden text-2xl text-red-400 sm:text-4xl md:text-5xl font-bold leading-tight mt-4 mb-4">
    Let's move you from <br/> chaos to systems
  </h2>
  <p className="sm:hidden text-lg sm:text-2xl text-gray-600 mb-8 mx-auto hover:text-red-500">  
  Unlock our care services & tools to fix the gaps and avoid unexpected hospital bills!
  </p>          

  <p className="hidden sm:inline text-xl sm:text-2xl text-gray-600 mb-8 mx-auto hover:text-red-500">  
    Unlock our care services & tools to fix the gaps and avoid unexpected hospital bills!
  </p>   


  {/*Image for Mobile Devices - UX Optimized*/}
<div className="sm:hidden w-full px-4 mt-8">
  <div className="relative h-[500px] overflow-hidden border-2 border-red-200 rounded-2xl shadow-2xl">
    
    {/* Background Image */}
    <img
      src="https://selrznkggmoxbpflzwjz.supabase.co/storage/v1/object/public/poetiq_homepage/mother_patient.png"
      alt="Caregivers"
      className="absolute inset-0 w-full h-full object-cover object-[30%_50%]"
    />
    
    {/* Improved Gradient Overlay - Better readability */}
    <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/90"></div>
    
    {/* Hero Section - Ellie Avatar Centered */}
    <div className="absolute inset-0 flex flex-col items-center justify-center pt-12">
      <div className="relative">
        {/* Pulse Animation Ring */}
        <div className="absolute inset-0 rounded-full bg-red-400 opacity-20 animate-ping"></div>
        
        {/* Ellie Avatar - Hero Element */}
        <div className="relative w-32 h-32 rounded-full bg-white p-1.5 shadow-2xl transform transition-transform duration-500 hover:scale-110">
          <img
            src="https://selrznkggmoxbpflzwjz.supabase.co/storage/v1/object/public/poetiq_homepage/ellie_ai_square.png"
            alt="Ellie AI Assistant"
            className="w-full h-full rounded-full object-cover border-4 border-red-100" 
          />
        </div>
        
        {/* Active Indicator Badge */}
        <div className="absolute bottom-2 right-2 w-6 h-6 bg-green-500 border-4 border-white rounded-full shadow-lg">
          <span className="absolute inset-0 rounded-full bg-green-400 animate-ping opacity-75"></span>
        </div>
      </div>
      
      {/* Spacing for visual breathing room */}
      <div className="h-8"></div>
      
      {/* Text Content with Better Hierarchy */}
      <div className="text-center px-6 space-y-2 pb-6">
        <h2 className="text-3xl font-bold text-white drop-shadow-2xl tracking-tight">
          Meet Ellie
        </h2>
        <p className="text-normal text-white/95 font-medium drop-shadow-lg">
          Your Long-Term Care Assistant
        </p>
        <p className="text-sm text-white/80 drop-shadow-md pt-1 max-w-xs mx-auto pb-2">
          {/* Get instant answers about care options, costs, and planning*/}
        </p>
      </div>
    </div>
    
    {/* Call-to-Action Section - Bottom */}
    <div className="absolute bottom-0 left-0 right-0 p-6 pb-8">
      <TooltipHelp text="Start a conversation with Ellie">
        <button
          onClick={openEligibilityModal}
          className="group w-full flex items-center justify-center space-x-3 bg-red-500 text-white font-semibold rounded-xl hover:bg-red-600 active:bg-red-700 transition-all duration-300 shadow-xl shadow-red-500/50 hover:shadow-2xl hover:shadow-red-500/60 p-4 transform hover:-translate-y-0.5">
          
          <span className="text-lg">Ask Ellie a Question</span>
          <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-2" />
        </button>
      </TooltipHelp>
      
      {/* Trust Indicator */}
      <p className="text-center text-white/70 text-xs mt-3 drop-shadow">
        Free • Instant • Confidential
      </p>
    </div>
  </div>
</div>

  {/* ------------------------------------- End the Mobile devices section ------------------------------- */}
          
<div className="hidden sm:block w-full p-4 mt-8">

  {/* Main grid container with 5 columns */}
  {/*simple and easy way to reduce the entire grid by 20%*/}
  <div className="grid grid-cols-5 gap-3 h-[520px] grid-rows-2">
          
        {/*---- Column 1: Two stacked images---*/}
        <div className="col-span-1 flex flex-col gap-4 h-[520px]">
          {/*------ start first top left image -------*/}
          <div className="relative h-full border hover:p-2 hover:border-red-500 overflow-hidden rounded-xl shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-xl group">
            
            <img
              src="https://selrznkggmoxbpflzwjz.supabase.co/storage/v1/object/public/poetiq_homepage/ltci-checker.png"
              alt="Creative workspace"
              className="w-full h-full rounded-xl object-cover aspect-square"
            />
      
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/60 to-transparent pointer-events-none"></div>


{/*----------------------- Show Pulsing Ellie Image Here ----------------------*/}

  {/* Improved Gradient Overlay - Better readability */}

    {/* Hero Section - Ellie Avatar Centered */}
      <div className="absolute inset-0 flex flex-col align-top items-center justify-center pt-22 transition-all duration-500 group-hover:justify-start group-hover:pt-2">

      <div className="relative transition-all duration-500 group-hover:scale-75">
            {/* Pulse Animation Ring */}
            <div className="absolute inset-0 rounded-full bg-red-400 opacity-20 animate-ping group-hover:opacity-0 transition-opacity duration-500"></div>
        
            {/* Ellie Avatar - Hero Element */}
            <div className="relative w-24 h-24 rounded-full bg-white p-1.5 shadow-2xl transform transition-all duration-500 hover:scale-110">
              <img
            src="https://selrznkggmoxbpflzwjz.supabase.co/storage/v1/object/public/poetiq_homepage/ellie_ai_square.png"
            alt="Ellie AI Assistant"
            className="w-full h-full rounded-full object-cover border-4 border-red-100" 
              />
            </div>
        
            {/* Active Indicator Badge */}
            <div className="absolute right-2 bottom-2 w-4 h-4 bg-green-500 border-2 border-white rounded-full shadow-lg">
              <span className="absolute inset-0 rounded-full bg-green-400 animate-ping opacity-75"></span>
            </div>
      </div>
    </div>  
            
  {/*----------------------- End Show Pulsing Ellie Image Here -----------------------*/}
    
  <div className="absolute bottom-0 left-0 right-0 p-4 text-white text-center transition-opacity duration-300 opacity-60 group-hover:opacity-100">

    <TooltipHelp text="👋 Start a conversation with Ellie">
          <button
            onClick={openEligibilityModal}
            className="group flex items-center mx-auto space-x-2 sm:w-auto p-1 bg-red-500 text-white text-base font-semibold rounded-lg hover:bg-red-600 opacity-0 group-hover:opacity-100 transition-colors shadow-md shadow-red-500/60 hover:shadow-xl hover:shadow-red-500/80 sm:px-8 sm:py-2 sm:text-lg justify-center mb-6">
           
           <span className="text-sm font-normal">Ask a Question</span>
           <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
          </button>
    </TooltipHelp>       
        <h3 className="text-xl font-bold drop-shadow-lg">Meet Ellie 👋</h3>
        <p className="text-xs drop-shadow-lg">Your long-term care assistant</p>
            </div>
          </div>
          

          {/*
          <div className="relative h-full overflow-hidden rounded-xl">
            <img
              //keeping for future use
            />
          </div>
          */}

          
          {/*------ end first left image -------*/}
          <div className="relative h-full overflow-hidden rounded-xl shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-xl border hover:p-2 hover:border-red-500 group">
            <img
              src="https://selrznkggmoxbpflzwjz.supabase.co/storage/v1/object/public/poetiq_homepage/mother_son.png"
              alt="Person working"
              className="w-full h-full rounded-xl object-cover aspect-square" // Square aspect ratio for stacked images
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 right-0 p-4 text-white text-center transition-opacity duration-300 opacity-20 group-hover:opacity-100">

          <TooltipHelp text="💰 Track Asset Thresholds">
              <Link
                to="/medicaid-spenddown-calculator"
            //onClick={openCommunityModal}
            className="group items-center flex items-center mx-auto space-x-2 sm:w-auto p-1 bg-red-500 text-white text-base font-semibold rounded-lg hover:bg-red-600 opacity-0 group-hover:opacity-100 transition-colors shadow-md shadow-red-500/60 hover:shadow-xl hover:shadow-red-500/80 sm:px-8 sm:py-2 sm:text-lg justify-center mb-6">
           
           <span className="text-sm font-normal">Learn More</span>
           <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
      </TooltipHelp>   
                <h3 className="text-xl font-bold drop-shadow-lg">Spend-Down Calculator</h3>
            </div>
          </div>
        </div>
        
        {/* Column 2: One image, spanning two rows */}
        <div className="col-span-1 row-span-2 h-full"> {/* 'row-span-2' makes this grid item span two rows */}
          <div className="relative overflow-hidden rounded-xl shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-xl h-full border hover:p-2 hover:border-red-500 group">
            <img
              src="https://selrznkggmoxbpflzwjz.supabase.co/storage/v1/object/public/poetiq_homepage/daughter_father.png"
              alt="Meeting in progress"
              className="w-full h-full rounded-xl object-cover object-[40%_70%]" // 'h-full' ensures the image fills the row-span-2 container
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 right-0 p-4 text-white text-center transition-opacity duration-300 opacity-20 group-hover:opacity-100">
          <TooltipHelp text="👋 Try it Now!">
          <Link 
            to="/home-health-care"
             onClick={() => window.scrollTo({ top: 0, behavior: 'instant' })}
            className="group items-center flex items-center mx-auto space-x-2 sm:w-auto p-1 bg-red-500 text-white text-base font-semibold rounded-lg hover:bg-red-600 opacity-0 group-hover:opacity-100 transition-colors shadow-md shadow-red-500/60 hover:shadow-xl hover:shadow-red-500/80 sm:px-8 sm:py-2 sm:text-lg justify-center mb-6">
           
           <span className="text-sm font-normal">Get Started</span>
           <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
          </TooltipHelp>   
                <h3 className="text-xl font-bold drop-shadow-lg">Care Agency Inspector</h3>
            </div>
          </div>
           
        </div>

        {/* Column 3: Two stacked images */}
        <div className="col-span-1 flex flex-col gap-3 h-[520px]">
          <div className="relative h-full border hover:p-2 hover:border-red-500 overflow-hidden rounded-xl shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-xl group">
            
            <img
              src="https://selrznkggmoxbpflzwjz.supabase.co/storage/v1/object/public/poetiq_homepage/mother_daughter.png"
              alt="Creative workspace"
              className="w-full h-full rounded-xl object-cover aspect-square"
            />
        
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/60 to-transparent pointer-events-none"></div>

{/*----------------------- Show Pulsing Sophia Image Here ----------------------*/}

  {/* Improved Gradient Overlay - Better readability */}

     {/* Hero Section - Ellie Avatar Centered */}
      <div className="absolute inset-0 flex flex-col align-top items-center justify-center pt-22 transition-all duration-500 group-hover:justify-start group-hover:pt-2">

      <div className="relative transition-all duration-500 group-hover:scale-75">
            {/* Pulse Animation Ring */}
            <div className="absolute inset-0 rounded-full bg-red-400 opacity-20 animate-ping group-hover:opacity-0 transition-opacity duration-500"></div>
        
            {/* Ellie Avatar - Hero Element */}
            <div className="relative w-24 h-24 rounded-full bg-white p-1.5 shadow-2xl transform transition-all duration-500 hover:scale-110">
              <img
            src="https://selrznkggmoxbpflzwjz.supabase.co/storage/v1/object/public/poetiq_homepage/sophia_ai_coach.png"
            alt="Ellie AI Assistant"
            className="w-full h-full rounded-full object-cover border-4 border-red-100" 
              />
            </div>
        
            {/* Active Indicator Badge */}
            <div className="absolute right-2 bottom-2 w-4 h-4 bg-green-500 border-2 border-white rounded-full shadow-lg">
              <span className="absolute inset-0 rounded-full bg-green-400 animate-ping opacity-75"></span>
            </div>
      </div>
    </div>              

  {/*----------------------- End Show Pulsing Sophia Image Here -----------------------*/}


            
          <div className="absolute bottom-0 left-0 right-0 p-4 text-white text-center transition-opacity duration-300 opacity-60 group-hover:opacity-100">
            <TooltipHelp  text="👋 Start a conversation with Sophia">
              <button
            onClick={openStressCoachModal}
            className="group items-center flex mx-auto space-x-2 sm:w-auto p-1 bg-red-500 text-white text-base font-semibold rounded-lg hover:bg-red-600 opacity-0 group-hover:opacity-100 transition-colors shadow-md shadow-red-500/60 hover:shadow-xl hover:shadow-red-500/80 sm:px-8 sm:py-2 sm:text-lg justify-center mb-6">
           
           <span className="text-sm font-normal">Ask a Question</span>
           <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
          </button>
        </TooltipHelp>    
                <h3 className="text-xl font-bold drop-shadow-lg">Meet Sophia 👋</h3>
                <p className="text-xs drop-shadow-lg">Your Family Conflict Advisor</p>
            </div>
          </div>
          {/*------------------------ End The Column Stack Information Here ------------------------------- */}
          
          <div className="relative h-full border hover:p-2 hover:border-red-500 overflow-hidden rounded-xl shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-xl group">
            <img
              src="https://selrznkggmoxbpflzwjz.supabase.co/storage/v1/object/public/poetiq_homepage/magnifying-glass.png"
              alt="Brainstorming session"
              className="w-full h-full rounded-xl object-cover aspect-square"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none"></div>
              <div className="absolute bottom-0 left-0 right-0 p-4 text-white text-center transition-opacity duration-300 opacity-20 group-hover:opacity-100">
        <TooltipHelp text="👋 Try it Now!">
           <Link 
            to="/dementia-assessment"
             onClick={() => window.scrollTo({ top: 0, behavior: 'instant' })}
            //onClick={openCommunityModal}
            className="group items-center flex items-center mx-auto space-x-2 sm:w-auto p-1 bg-red-500 text-white text-base font-semibold rounded-lg hover:bg-red-600 opacity-0 group-hover:opacity-100 transition-colors shadow-md shadow-red-500/60 hover:shadow-xl hover:shadow-red-500/80 sm:px-8 sm:py-2 sm:text-lg justify-center mb-6">
           
           <span className="text-sm font-normal">Get Started</span>
           <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </TooltipHelp>
                <h3 className="text-xl font-bold drop-shadow-lg">Cognitive <br/>Baseline Test</h3>
            </div>
          </div>
        </div>

        {/* Column 4: One image, spanning two rows */}
        <div className="col-span-1 row-span-2">
          <div className="relative border hover:p-2 hover:border-red-500 overflow-hidden rounded-xl shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-xl h-full group">
            <img
              src="https://selrznkggmoxbpflzwjz.supabase.co/storage/v1/object/public/poetiq_homepage/mother_patient.png"
              alt="Laptop on desk"
              className="w-full h-full rounded-xl object-cover object-[30%_50%]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 right-0 p-4 text-white text-center transition-opacity duration-300 opacity-20 group-hover:opacity-100">
            <TooltipHelp text="🔒 Secure Searchable Data">
              <Link
                  //onClick={openCommunityModal}
                  to="/eldercare-private-data-store"
                  className="group items-center flex items-center mx-auto space-x-2 sm:w-auto p-1 bg-red-500 text-white text-base font-semibold rounded-lg hover:bg-red-600 opacity-0 group-hover:opacity-100 transition-colors shadow-md shadow-red-500/60 hover:shadow-xl hover:shadow-red-500/80 sm:px-8 sm:py-2 sm:text-lg justify-center mb-6">
           
           <span className="text-sm font-normal">Learn More</span>
           <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>

              
        </TooltipHelp>
                <h3 className="text-xl font-bold drop-shadow-lg">Eldercare <br/>Data Manager</h3>
            </div>
          </div>
        </div>

        {/* Column 5: Two stacked images */}
        <div className="col-span-1 flex flex-col gap-4 h-[520px]">
          <div className="relative h-full border hover:p-2 hover:border-red-500 overflow-hidden rounded-xl shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-xl group">
            <img
              src="https://selrznkggmoxbpflzwjz.supabase.co/storage/v1/object/public/poetiq_homepage/black_mother_daughter.png"
              alt="People discussing"
              className="w-full h-full rounded-xl object-cover aspect-square"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 right-0 p-4 text-white text-center transition-opacity duration-300 opacity-20 group-hover:opacity-100">
        <TooltipHelp text="📳 Delegate Claims Disputes">
          <Link
            //onClick={openCommunityModal}
            to="/virtual-healthcare-assistant"
            className="group items-center flex items-center mx-auto space-x-2 sm:w-auto p-1 bg-red-500 text-white text-base font-semibold rounded-lg hover:bg-red-600 opacity-0 group-hover:opacity-100 transition-colors shadow-md shadow-red-500/60 hover:shadow-xl hover:shadow-red-500/80 sm:px-8 sm:py-2 sm:text-lg justify-center mb-6">
           
           <span className="text-sm font-normal">Learn More</span>
           <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </TooltipHelp>
                <h3 className="text-xl font-bold drop-shadow-lg">Healthcare Virtual Assistants</h3>
            </div>
          </div>
          
     {/*------ start last bottom top right image -------*/}
          <div className="relative h-full border hover:p-2 hover:border-red-500 overflow-hidden rounded-xl shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-xl group">
            
            <img
              src="https://selrznkggmoxbpflzwjz.supabase.co/storage/v1/object/public/poetiq_homepage/push-wheelchair.png"
              alt="Creative workspace"
              className="w-full h-full rounded-xl object-cover aspect-square"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 right-0 p-4 text-white text-center transition-opacity duration-300 opacity-20 group-hover:opacity-100">
          <TooltipHelp text="👋 Try it Now!">
              <Link 
                to="/nursing-home"
                 onClick={() => window.scrollTo({ top: 0, behavior: 'instant' })}
                //onClick={openCommunityModal}
                className="group items-center flex items-center mx-auto space-x-2 sm:w-auto p-1 bg-red-500 text-white text-base font-semibold rounded-lg hover:bg-red-600 opacity-0 group-hover:opacity-100 transition-colors shadow-md shadow-red-500/60 hover:shadow-xl hover:shadow-red-500/80 sm:px-8 sm:py-2 sm:text-lg justify-center mb-6">
           
           <span className="text-sm font-normal">Get Started</span>
           <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
          </TooltipHelp>
              <h3 className="text-xl font-bold drop-shadow-lg">Nursing Home Auditor</h3>
            </div>
          </div>

          {/*
          <div className="relative h-full overflow-hidden rounded-xl">
            <img
              //keeping for future use
            />
          </div>
          */}

          
          {/*------ end last bottom right image -------*/}
        </div>
      </div>
    </div>  

              <button
                onClick={openCommunityModal}
                className="hidden sm:flex mt-8 items-center justify-center space-x-2 w-full sm:w-auto px-6 py-3 border border-red-500 bg-white text-red-500 text-base font-semibold rounded-lg hover:bg-red-500 hover:text-white transition-colors shadow-lg shadow-red-500/60 hover:shadow-xl hover:shadow-red-500/80 sm:px-8 sm:py-4 sm:text-lg group mx-auto">
                <span>Join Waitlist</span>
                {/* Placeholder for ArrowRight icon or similar */}
               <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
            </button> 

</section>      
{/*----------------- End Caregiving Support ----------------------- */}           
          

      {/* Custom CSS for float animation */}
      <style>{`
        @keyframes float {
          0% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-15px) rotate(5deg); /* Move up and slightly rotate */
          }
          100% {
            transform: translateY(0px) rotate(0deg);
          }
        }
        .animate-float {
          animation-name: float;
          animation-iteration-count: infinite; /* Keeps repeating indefinitely */
          animation-timing-function: ease-in-out; /* Smooth start and end */
          animation-direction: alternate; /* Plays forward then backward for a smooth loop */
        }
      `}</style>
 
{/*-------------------- End images Added for effect -----------------------------*/}
        
        
 {/*------------------------------start of the FAQ Section -------------------------------------*/}    

<section id="FAQ" className="mt-32 scroll-mt-24 text-center">
  <div className="inline-flex items-center border-8 border-red-200 space-x-2 px-3 py-2 bg-gradient-to-r from-red-500 via-red-400 to-red-300 text-white rounded-full text-lg mb-6 cursor-pointer"
         
            onClick={() => {
              window.location.href = '#top_page';
              setIsMobileMenuOpen(false);           
              }}
    >
    <Sparkles className="w-4 h-4" />
    <span>Frequently Asked Questions</span>
  </div>
  <h2 className="text-2xl text-red-400 sm:text-4xl md:text-5xl font-bold leading-tight mb-4">
    Have Questions? 🤔
  </h2>
  <p className="text-lg sm:text-2xl text-gray-600 mb-12 max-w-3xl mx-auto hover:text-red-500">
   Find out how Poetiq's services support you with eldercare. 
  </p>

  <div className="max-w-3xl mx-auto space-y-4 text-left">
    {/* FAQ Item 0.1 */}
<details className="group bg-white rounded-lg shadow-sm border border-gray-200 hover:border hover:border-red-500 overflow-hidden">
  <summary className="flex items-center justify-between p-5 cursor-pointer font-semibold text-lg text-gray-800  hover:bg-gray-50 transition-colors hover:text-red-500">
    How much time will this actually save me? 
    <div className="relative w-6 h-6 rounded-full items-center p-2 justify-center"> 
      <svg className="absolute inset-0 w-6 h-6 text-red-500 group-open:hidden transition-opacity duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
      </svg>
      <svg className="absolute inset-0 w-6 h-6 text-red-500 hidden group-open:block transition-opacity duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 12h16"></path>
      </svg>
    </div>
  </summary>
  <div className="px-5 pb-5 text-gray-700">
    <p>
      Our goal is to <b>reclaim 10–15 hours</b> of your week by offloading insurance phone marathons, document chasing, and administrative follow-ups.
    </p>
  </div>
</details>


    {/* FAQ Item 1 */}
  <details className="group bg-white rounded-lg shadow-sm border border-gray-200 hover:border hover:border-red-500 overflow-hidden">
  <summary className="flex items-center justify-between p-5 cursor-pointer font-semibold text-lg text-gray-800  hover:bg-gray-50 transition-colors hover:text-red-500">
    What exactly is a Gap Finder audit? 
    <div className="relative w-6 h-6 rounded-full items-center p-2 justify-center"> 
      <svg className="absolute inset-0 w-6 h-6 text-red-500 group-open:hidden transition-opacity duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
      </svg>
      <svg className="absolute inset-0 w-6 h-6 text-red-500 hidden group-open:block transition-opacity duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 12h16"></path>
      </svg>
    </div>
  </summary>
  <div className="px-5 pb-5 text-gray-700">
    <p>It’s a <b>14-point diagnostic</b> of your parent’s current legal, financial, and medical setup to identify hidden liabilities before they become expensive crises
    </p>
  </div>
</details>


    {/* FAQ Item 2 */}
    <details className="group bg-white rounded-lg shadow-sm border border-gray-200 hover:border hover:border-red-500 overflow-hidden">
 <summary className="flex items-center justify-between p-5 cursor-pointer font-semibold text-lg text-gray-800  hover:bg-gray-50 transition-colors hover:text-red-500">
   Can you help if my parents already have an attorney? 
    <div className="relative w-6 h-6 rounded-full items-center p-2 justify-center"> 
      <svg className="absolute inset-0 w-6 h-6 text-red-500 group-open:hidden transition-opacity duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
      </svg>
      <svg className="absolute inset-0 w-6 h-6 text-red-500 hidden group-open:block transition-opacity duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 12h16"></path>
      </svg>
    </div>
  </summary>
  <div className="px-5 pb-5 text-gray-700">
    <p>Yes. We don’t replace your advisors, we act as the <b>project manager</b> who ensures their legal and financial plans are actually executed and optimized for long-term care.
    </p>
  </div>
</details>

    {/* FAQ Item 3 */}
     <details className="group bg-white rounded-lg shadow-sm border border-gray-200 hover:border hover:border-red-500 overflow-hidden">
  <summary className="flex items-center justify-between p-5 cursor-pointer font-semibold text-lg text-gray-800  hover:bg-gray-50 transition-colors hover:text-red-500">
   Do you provide the actual care (nursing, etc.)?
    <div className="relative w-6 h-6 rounded-full items-center p-2 justify-center"> 
      <svg className="absolute inset-0 w-6 h-6 text-red-500 group-open:hidden transition-opacity duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
      </svg>
      <svg className="absolute inset-0 w-6 h-6 text-red-500 hidden group-open:block transition-opacity duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 12h16"></path>
      </svg>
    </div>
  </summary>
  <div className="px-5 pb-5 text-gray-700">
    <p>No. We are the <b>Logistics</b> & <b>Strategy</b> layer. We manage the business of their care contracts, appeals, and spend-downs so you can focus on the quality of their life.</p>
  </div>
</details>

     {/* FAQ Item 4 */}
    <details className="group bg-white rounded-lg shadow-sm border border-gray-200 hover:border hover:border-red-500 overflow-hidden">
 <summary className="flex items-center justify-between p-5 cursor-pointer font-semibold text-lg text-gray-800  hover:bg-gray-50 transition-colors hover:text-red-500">
   How does Poetiq save money on care bills?
    <div className="relative w-6 h-6 rounded-full items-center p-2 justify-center"> 
      <svg className="absolute inset-0 w-6 h-6 text-red-500 group-open:hidden transition-opacity duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
      </svg>
      <svg className="absolute inset-0 w-6 h-6 text-red-500 hidden group-open:block transition-opacity duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 12h16"></path>
      </svg>
    </div>
  </summary>
  <div className="px-5 pb-5 text-gray-700">
    <p>We audit nursing home contracts, optimize insurance coverage, and win long-term care appeals. Most clients see an average reduction in out-of-pocket costs of <b>$10,000+ per month</b>.
</p>
  </div>
</details>

     {/* FAQ Item 5 */}
     <details className="group bg-white rounded-lg shadow-sm border border-gray-200 hover:border hover:border-red-500 overflow-hidden">
 <summary className="flex items-center justify-between p-5 cursor-pointer font-semibold text-lg text-gray-800  hover:bg-gray-50 transition-colors hover:text-red-500">
    Is my family’s data secure?
    <div className="relative w-6 h-6 rounded-full items-center p-2 justify-center"> 
      <svg className="absolute inset-0 w-6 h-6 text-red-500 group-open:hidden transition-opacity duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
      </svg>
      <svg className="absolute inset-0 w-6 h-6 text-red-500 hidden group-open:block transition-opacity duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 12h16"></path>
      </svg>
    </div>
  </summary>
  <div className="px-5 pb-5 text-gray-700">
    <p>Absolutely. We use <b>end-to-end encryption</b> for our Data Vault, ensuring your parent’s sensitive financial and medical records are accessible only to authorized family members.
    </p>
  </div>
</details>

     {/* FAQ Item 6 */}
     <details className="group bg-white rounded-lg shadow-sm border border-gray-200 hover:border hover:border-red-500 overflow-hidden">
  <summary className="flex items-center justify-between p-5 cursor-pointer font-semibold text-lg text-gray-800  hover:bg-gray-50 transition-colors hover:text-red-500">
   Can my siblings use the platform too?
    <div className="relative w-6 h-6 rounded-full items-center p-2 justify-center"> 
      <svg className="absolute inset-0 w-6 h-6 text-red-500 group-open:hidden transition-opacity duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
      </svg>
      <svg className="absolute inset-0 w-6 h-6 text-red-500 hidden group-open:block transition-opacity duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 12h16"></path>
      </svg>
    </div>
  </summary>
  <div className="px-5 pb-5 text-gray-700">
    <p>Yes. Poetiq is built for <b>Family Collaboration</b>. You can grant access to siblings or stakeholders to keep everyone aligned on one "single source of truth."
    </p>
  </div>
</details>

     {/* FAQ Item 7 */}
    <details className="group bg-white rounded-lg shadow-sm border border-gray-200 hover:border hover:border-red-500 overflow-hidden">
  <summary className="flex items-center justify-between p-5 cursor-pointer font-semibold text-lg text-gray-800  hover:bg-gray-50 transition-colors hover:text-red-500">
    How do I get started while you're in the waitlist phase? 
    <div className="relative w-6 h-6 rounded-full items-center p-2 justify-center"> 
      <svg className="absolute inset-0 w-6 h-6 text-red-500 group-open:hidden transition-opacity duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
      </svg>
      <svg className="absolute inset-0 w-6 h-6 text-red-500 hidden group-open:block transition-opacity duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 12h16"></path>
      </svg>
    </div>
  </summary>
  <div className="px-5 pb-5 text-gray-700">
    <p>Join the waitlist to <b>secure your spot</b> in our Founding Cohort. You'll be the first to receive our "Quick Win" guides and priority access to the Gap Finder tool.
    </p>
  </div>
</details>
  </div>
</section>


  {/*------------------------------- end of the FAQ Section --------------------------------------*/}       


  {/* ------------------------------ Start Final Call to Action Section --------------------------*/}    

<section className="mt-24 py-16 bg-gradient-to-t from-red-500 via-red-100 to-white text-gray-900 text-center rounded-xl">
  <div className="max-w-4xl mx-auto px-6">
    <h2 className="text-2xl text-red-400 sm:text-4xl md:text-6xl font-bold leading-tight mb-8">
      Professional oversight<br/> for every detail
    </h2>
    <p className="text-gray-700 font-semibold text-md sm:text-2xl md:text-3xl font-light text-gray-700 mb-12 max-w-3xl mx-auto leading-relaxed">
      Protect your parent's assets without <br/> 
      sacrificing their long-term care
      <ShieldCheck className="w-8 h-8 fill-red-500 justify-center align-middle text-white ml-1 inline"/>
    </p>

          {/*--------------- start Social Proof Section ---------------- */}
          <div className="mb-4 justify-center relative flex items-center sm:gap-6 gap-2 mt-4">
            {/* Overlapping Avatars */}
            <div className="flex -space-x-3">
              <img
                  src="https://i.pravatar.cc/150?img=1"
                  alt="User 1"
                  className="hidden sm:block w-10 h-10 rounded-full border-2 border-white object-cover"
                />
              <img
                  src="https://i.pravatar.cc/150?img=2"
                  alt="User 2"
                  className="w-10 h-10 rounded-full border-2 border-white object-cover"
              />
              <img
                  src="https://i.pravatar.cc/150?img=3"
                  alt="User 3"
                  className="w-10 h-10 rounded-full border-2 border-white object-cover"
              />
              <img
                  src="https://i.pravatar.cc/150?img=4"
                  alt="User 4"
                  className="w-10 h-10 rounded-full border-2 border-white object-cover"
              />
              <img
                  src="https://i.pravatar.cc/150?img=5"
                  alt="User 5"
                  className="w-10 h-10 rounded-full border-2 border-white object-cover"
              />
              <img
                  src="https://i.pravatar.cc/150?img=6"
                  alt="User 6"
                  className="w-10 h-10 rounded-full border-2 border-white object-cover"
              />
          </div>

            {/* Stars and Text */}
                <div className="hidden sm:flex flex-col gap-1">
                  <div className="flex gap-0.5">
                    <Star className="w-5 h-5 stroke-white fill-yellow-500" />
                    <Star className="w-5 h-5 stroke-white fill-yellow-500" />
                    <Star className="w-5 h-5 stroke-white fill-yellow-500" />
                    <Star className="w-5 h-5 stroke-white fill-yellow-500" />
                    <Star className="w-5 h-5 stroke-white fill-yellow-500" />
                  </div>
                    <p className="text-sm font-medium text-white">1,200 hrs saved</p>
                </div>
            </div>

            <div className="sm:hidden items-center flex flex-col gap-1">
                  <div className="flex gap-0.5">
                    <Star className="w-5 h-5 stroke-white fill-yellow-400 text-yellow-400" />
                    <Star className="w-5 h-5 stroke-white fill-yellow-400 text-yellow-400" />
                    <Star className="w-5 h-5 stroke-white fill-yellow-400 text-yellow-400" />
                    <Star className="w-5 h-5 stroke-white fill-yellow-400 text-yellow-400" />
                    <Star className="w-5 h-5 stroke-white fill-yellow-400 text-yellow-400" />
                  </div>
                    <p className="text-sm font-medium text-gray-700 mb-4">1,200 hrs saved</p>
                </div>  

          {/*----- end social proof section here -------------*/}   

        {/* Buttons */}
      <div className="flex flex-col sm:mr-10  sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4 mb-16"> 
          <button
            onClick={openCommunityModal}
            className="flex items-center justify-center space-x-2 w-full sm:w-auto px-6 py-4 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors text-base font-semibold sm:px-4 sm:py-3 sm:text-base
                         shadow-lg shadow-red-500/60       
             hover:shadow-xl hover:shadow-red-500/80 group" // Adjusted mobile button size/text for consistency
          >
            {/*<Send className="w-3.5 h-3.5"/>*/}
           <span>Join Waitlist</span>
           <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
          </button>


        </div>
   
  </div>
</section>

  {/*---------------------------------End Final Call to Action Section-----------------------------*/}      

{/*----------------------Start Footer - New Full Foot Breakdown ------------------------------ */}
    {/*<PageFooter />   */}
   <PageFooter 
      onOpenOnboardingModal={openOnboardingModal}
    />        
{/*--------------------- End Footer - New Full Foot Breakdown*/}        
</main>

      
        
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={handleCloseAuthModal}
      />

      <WaitlistModal
        isOpen={isWaitlistModalOpen}
        onClose={closeWaitlistModal}
      />

    <NewsletterModal
        isOpen={isNewsletterModalOpen}
        onClose={closeNewsletterModal}
      />

    <CommunityModal
        isOpen={isCommunityModalOpen}
        onClose={closeCommunityModal}
      />
     


    <EldercareGapDashboardModal
  isOpen={isDashboardModalOpen}
  onClose={closeDashboardModal}
  sessionId={getSessionId()}
/>        
                
    <EligibilityModal
        isOpen={isEligibilityModalOpen}
        onClose={closeEligibilityModal}
      />

      <StressCoachModal
        isOpen={isStressCoachModalOpen}
        onClose={closeStressCoachModal}
      />      

    <MentallyBroken
        isOpen={isMentallyBrokenModalOpen}
        onClose={closeMentallyBrokenModal}
        onOpenCommunity={handleMentallyBrokenToCommunity}
      />

      <NavigateSystems
  isOpen={isNavigateSystemsModalOpen}
  onClose={closeNavigateSystemsModal}
  onOpenCommunity={handleNavigateSystemsToCommunity}
/>

    <ConsumedByBills
  isOpen={isConsumedByBillsModalOpen}
  onClose={closeConsumedByBillsModal}
  onOpenCommunity={handleConsumedByBillsToCommunity}
/>

<CareerOpps
  isOpen={isCareerOppsModalOpen}
  onClose={closeCareerOppsModal}
  onOpenCommunity={handleCareerOppsToCommunity}
/>
        
<BrokenByFamily
  isOpen={isBrokenByFamilyModalOpen}
  onClose={closeBrokenByFamilyModal}
  onOpenCommunity={handleBrokenByFamilyToCommunity}
/>

<OnCallStress
  isOpen={isOnCallStressModalOpen}
  onClose={closeOnCallStressModal}
  onOpenCommunity={handleOnCallStressToCommunity}
/>

{/*
<EldercareModalPopUp 
  isOpen={isEldercareModalOpen}
  onClose={() => setIsEldercareModalOpen(false)}
  onStartOnboarding={() => {
    setIsEldercareModalOpen(false);
    setIsOnboardingModalOpen(true);
  }}
/>   
*/}

<EldercareModalPopUpSmall 
  isOpen={isEldercareSmallModalOpen}
  onClose={() => setIsEldercareSmallModalOpen(false)}
  onStartOnboarding={() => {
    setIsEldercareSmallModalOpen(false);
    setIsOnboardingModalOpen(true);
  }}
/>  

{/* Ellie Pill Chatbot - Always Available */}
<EligibilityPillModal />

    <OnboardingQuestionsModal 
      isOpen={isOnboardingModalOpen}
      onClose={closeOnboardingModal}
      onDashboardOpen={openDashboardModal} 
    />                

    <OnboardingQuestionsModal 
      isOpen={isOnboardingModalOpen}
      onClose={closeOnboardingModal}
      onDashboardOpen={openDashboardModal} 
    />        


{isWaitlistSuccessModalOpen ? (
  <div className="fixed top-4 right-4 bg-white rounded-lg shadow-lg border border-green-100 p-4 flex items-center space-x-3 animate-fade-in z-[9999]">
    <div className="bg-green-100 rounded-full p-2">
      <Check className="w-5 h-5 text-green-500" />
    </div>
    <div>
      <p className="font-medium text-gray-900">Congratulations! 🎉 </p>
      <p className="text-sm text-gray-500">
        You've joined our waitlist. Expect an email in a few days!
      </p>
    </div>
  </div>
) : null} 

{isNewsletterSuccessModalOpen ? (
  <div className="fixed top-4 right-4 bg-white rounded-lg shadow-lg border border-green-100 p-4 flex items-center space-x-3 animate-fade-in z-[9999]">
    <div className="bg-green-100 rounded-full p-2">
      <Check className="w-5 h-5 text-green-500" />
    </div>
    <div>
      <p className="font-medium text-gray-900">Congratulations! 🎉 </p>
      <p className="text-sm text-gray-500">
        You've joined our Newsletter. Expect an email Soon!
      </p>
    </div>
  </div>
) : null}         
        
    </div>
  
  </>
  
  );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className="p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow">
      <div className="mb-4">{icon}</div>
      <h3 className="text-xl font-semibold text-blue-900 mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}

export default LandingPage;