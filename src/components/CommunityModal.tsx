import React, { useState } from 'react';
import { X, CheckCircle, Info, MailCheck, Users, UserPlus, ShieldCheck, Target } from 'lucide-react';
import { z } from 'zod';
import { supabase } from '../lib/supabase';
import { TooltipExtended } from '/src/utils/TooltipExtended';
import LinkedInSolidLogo from '../images/linkedin-solid-logo.svg';

interface CommunityModalProps {
  isOpen: boolean;
  onClose: () => void;
  //onSuccess: () => void;
}


const communitySchema = z.object({
  email: z.string().email('Invalid email address'),
  firstName: z.string().min(2, 'Name must be at least 2 characters'),
  linkedinProfile: z.string()
    .url('LinkedIn URL must be a valid URL') // Ensures the input is a syntactically valid URL
    .refine(
      (val) => val.includes('linkedin.com/in/'), // Checks if the URL contains 'linkedin.com/in/'
      'LinkedIn URL must be a profile link (e.g., https://www.linkedin.com/in/yourprofile)' // Custom error message
    ),
  //discount: z.enum(['10% off', '20% off', '30% off'], {
    //errorMap: () => ({ message: 'Please select a discount option' }),
  //}),
});


export function CommunityModal({ isOpen, onClose, onSuccess }: NewsletterModalProps) {
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [emailSent, setEmailSent] = useState(false);
  const [linkedinProfile, setLinkedinProfile] = useState('');
  const [launchUrl, setLaunchUrl] = useState('');

  
  //const [discount, setDiscount] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false); 
  const [showSuccessScreen, setShowSuccessScreen] = useState(false); // New state for success screen

  //const [isWaitlistSuccessModalOpen, setIsWaitlistSuccessModalOpen] = useState(false);

  React.useEffect(() => {
  if (isOpen) {
    // Capture the full URL when modal opens
    setLaunchUrl(window.location.href);
  }
}, [isOpen]);


  if (!isOpen) return null;

  // New function to reset form and close modal
  const resetFormAndModal = () => {
    setEmail('');
    setFirstName('');
    setEmailSent(false);
    setLinkedinProfile('');
    setLaunchUrl('');
    setError('');
    setLoading(false);
    setShowSuccessScreen(false); // Reset success screen state
    onClose(); // Close the modal
  };

  
const handleJoinCommunity = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Validate input using Zod
      communitySchema.parse({ email, firstName, linkedinProfile });

      // Insert data into Supabase
      const { error: supabaseError } = await supabase.from('community_list').insert({
        //first_name: name, // Map 'name' from form to 'first_name' column
        email: email,
        first_name: firstName,
        project_name: 'poetiq community',
        email_sent: emailSent,
        linkedin_profile: linkedinProfile,
        join_waitlist_url: launchUrl 
        //discount: discount,
      });

      //if (supabaseError) {
      //  throw new Error(supabaseError.message); // Throw Supabase error to be caught below
      //}

       // --- CRITICAL ERROR HANDLING SECTION ---
      if (supabaseError) {
        // Check for the specific PostgreSQL unique constraint violation error code
        if (supabaseError.code === '23505') {
          setError("You're registered to join the community!"); // User-friendly message
        } else {
          // For other Supabase errors, log the technical error for debugging
          console.error("Supabase Error:", supabaseError);
          // And provide a more general user-friendly error message
          setError(`Failed to register: ${supabaseError.message || 'An unexpected database error occurred.'}`);
        }
        // IMPORTANT: Exit the function here after handling a Supabase error
        return;
      }
      // --- END CRITICAL ERROR HANDLING SECTION ---

      // On successful insertion, show the success screen
      setShowSuccessScreen(true);
      // Remove the old onClose() and setTimeout logic here
      // console.log('Successfully joined waitlist:', { email, name, discount });

    } catch (err) {
      if (err instanceof z.ZodError) {
        setError(err.errors[0].message);
      } else if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unexpected error occurred');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md relative">
        <button
          //onClick={onClose}
          onClick={resetFormAndModal}
          className="absolute right-4 top-4 text-gray-500 hover:text-gray-700"
        >
          <X className="w-5 h-5" />
        </button>

         {showSuccessScreen ? (
          // Success Screen Content
          <div className="text-center mb-6">
            <div className="mx-auto w-12 h-12 bg-green-50 rounded-full flex items-center justify-center mb-4">
            <CheckCircle className="w-8 h-8 text-green-500 mx-auto" />
            </div>
            <h2 className="text-3xl font-bold text-green-600 mb-4">Congratulations!</h2>
            <p className="text-base text-gray-600 mb-8">
              {/*You've successfully registered to join our Slack Community. Expect an email Soon!🚀*/}
              You've successfully registered to join Poetiq.<br/> Expect an email Soon!🚀
            </p>
            <button
              onClick={resetFormAndModal} // Use new reset function for close button
              className="w-1/2 py-2 px-4 border border-transparent rounded-md shadow-lg shadow-green-500/40 hover:shadow-green-500 hover:shadow-2xl text-sm font-medium text-white bg-green-500 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors group"
            >
              Close
            </button>
          </div>
        ) : (
          // Waitlist Form Content
          <>
          

          {/* Header */}
        <div className="text-center mb-6">
          <div className="mx-auto w-12 h-12 bg-red-50 rounded-full flex items-center justify-center mb-4">
            <Target className="w-8 h-8 text-red-500" />
          </div>
          <h2 className="text-3xl font-bold text-gray-700 mb-2">
            Welcome to <span className="text-red-500">Poetiq</span>
          </h2>
          <p className="hidden sm:inline text-gray-600 text-base text-gray-500">
            Fix long-term care issues for Mom and Dad <br/> without drowning in endless paperwork!
          </p>
          <p className="sm:hidden text-gray-600 text-sm text-gray-500">    
            Fix long-term care gaps for Mom and Dad!  
          </p>
        </div>    

        <form onSubmit={handleJoinCommunity} className="space-y-4 text-center">

          <div>
            <label htmlFor="email" className="block text-left px-1 text-sm font-medium text-gray-700">
              Email Address
            </label>
            <input
              type="email"
              id="email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={loading}
              placeholder="yourname@example.com"
              className="text-left text-xs px-2 mt-1 py-2 block w-full rounded-md border-2 border-red-100 hover:border-red-200 placeholder-text-sm outline-none focus:border-red-500 focus:ring-0 focus:ring-red-500"
              //required
            />
          </div>

           <div>
            <label  className="block text-left px-1 text-sm font-medium text-gray-700">
              First Name
            </label>
            <input
              type="text"
              id="firstName"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              disabled={loading}
              placeholder="John"
              className="text-left text-xs px-2 mt-1 py-2 block w-full rounded-md border-2 border-red-100 hover:border-red-200 placeholder-text-sm outline-none focus:border-red-500 focus:ring-0 focus:ring-red-500"
              required
            />
          </div>

          <div>
            <label htmlFor="url" className="block text-left px-1 text-sm font-medium text-gray-700">
              LinkedIn Profile <img src={LinkedInSolidLogo} alt="LinkedIn" className="inline-block rounded-sm w-3 h-3 align-middle" />
            </label>
            <input
              type="url"
              id="linkedinProfile"
              value={linkedinProfile}
              onChange={(e) => setLinkedinProfile(e.target.value)}
              disabled={loading}
              placeholder="https://www.linkedin.com/in/yourprofile"
              className="text-left text-xs px-2 mt-1 py-2 block w-full rounded-md border-2 border-red-100 hover:border-red-200 placeholder-text-sm outline-none focus:border-red-500 focus:ring-0 focus:ring-red-500"
              required
            />
          </div>
          
          {error && (
            <p className="text-red-600 text-sm">{error}</p>
          )}
        <div className="items-center justify-center">
          <button
            type="submit"
            disabled={loading}
            className="group mt-8 w-full py-3 px-4 sm:w-1/2 border border-transparent rounded-md text-base font-semibold text-white bg-gradient-to-r from-red-500 to-red-600 text-white hover:bg-red-700 transition-colors shadow-lg shadow-red-500/60 hover:shadow-xl hover:shadow-red-500/80 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50"
          >
            {loading ? 'Joining...' : 'Join Waitlist'}
          </button>

          </div>
          
        </form>
          </>
      )}
      </div> 
    </div>
  );
}
