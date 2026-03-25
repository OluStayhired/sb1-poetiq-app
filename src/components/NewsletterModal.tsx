import React, { useState } from 'react';
import { X, CheckCircle, Info, MailCheck } from 'lucide-react';
import { z } from 'zod';
import { supabase } from '../lib/supabase';
import { TooltipExtended } from '/src/utils/TooltipExtended';

interface NewsletterModalProps {
  isOpen: boolean;
  onClose: () => void;
  //onSuccess: () => void;
}


const newsletterSchema = z.object({
  email: z.string().email('Invalid email address'),
});


export function NewsletterModal({ isOpen, onClose, onSuccess }: NewsletterModalProps) {
  const [email, setEmail] = useState('');
  //const [name, setName] = useState('');
  //const [discount, setDiscount] = useState('');
  const [welcomeMail, setWelcomeMail] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false); 
  const [showSuccessScreen, setShowSuccessScreen] = useState(false); // New state for success screen

  //const [isWaitlistSuccessModalOpen, setIsWaitlistSuccessModalOpen] = useState(false);

  if (!isOpen) return null;

  // New function to reset form and close modal
  const resetFormAndModal = () => {
    setEmail('');
    //setName('');
    //setDiscount('');
    setWelcomeMail(false);
    setError('');
    setLoading(false);
    setShowSuccessScreen(false); // Reset success screen state
    onClose(); // Close the modal
  };

  
const handleJoinNewsletter = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Validate input using Zod
      newsletterSchema.parse({ email });

      // Insert data into Supabase
      const { error: supabaseError } = await supabase.from('newsletter_list').insert({
        //first_name: name, // Map 'name' from form to 'first_name' column
        email: email,
        welcome_email: welcomeMail,
        project_name: 'poetiq community',
        //discount: discount,
      });

      //if (supabaseError) {
      //  throw new Error(supabaseError.message); // Throw Supabase error to be caught below
      //}

       // --- CRITICAL ERROR HANDLING SECTION ---
      if (supabaseError) {
        // Check for the specific PostgreSQL unique constraint violation error code
        if (supabaseError.code === '23505') {
          setError("You're subscribed to our newsletter!"); // User-friendly message
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
              You've successfully subscribed to our newsletter. We'll notify you once it's live!🚀
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
            <MailCheck className="w-8 h-8 text-red-500" />
          </div>
          <h2 className="text-2xl font-bold text-gray-700 mb-2">
            Join Our Newsletter🔥
          </h2>
          <p className="text-gray-600 text-sm text-red-500">
            {/*Get weekly tips and real stories about eldercare*/} 
            Get real stories & eldercare support every week!
           
          </p>
        </div>    

        <form onSubmit={handleJoinNewsletter} className="space-y-4 text-center">

          <div>
            <label htmlFor="email" className="block text-left px-1 text-sm font-medium text-gray-700">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={loading}
              placeholder="Type Email Address"
              className="text-left text-sm px-2 mt-1 py-2 block w-full rounded-md border border-red-100 placeholder-text-sm outline-none focus:border-red-500 focus:ring-0 focus:ring-red-500"
              required
            />
          </div>

          {/*       
          <div>
            <label className="items-center flex space-x-2 text-left px-1 block text-sm font-medium text-gray-700 mb-2">
              Pick Your Discount
              <TooltipExtended text="⚡30% off 1yr Plan
                ⚡20% off 6mth Plan
                ⚡10% off 2mth Plan"  className="whitespace-pre-line">
             <Info className="w-3.5 h-3.5 text-gray-400 ml-2"/> 
              </TooltipExtended>
            </label>
            <div className="flex gap-4 px-1">
              {['10% off', '20% off', '30% off'].map((option) => (
                <div key={option} className="flex items-center">
                  <input
                    type="radio"
                    id={option}
                    name="discount"
                    value={option}
                    checked={discount === option}
                    onChange={(e) => setDiscount(e.target.value)}
                    disabled={loading}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                  />
                  <label htmlFor={option} className="ml-2 text-sm text-gray-700">
                    {option}
                  </label>
                </div>
              ))}
            </div>
          </div>
*/}
          
          {error && (
            <p className="text-red-600 text-sm">{error}</p>
          )}
        <div className="items-center justify-center">
          <button
            type="submit"
            disabled={loading}
            className="group mt-8 w-full py-2 px-4 sm:w-1/2 border border-transparent rounded-md text-sm font-medium text-white bg-gradient-to-r from-red-500 to-red-400 text-white hover:bg-red-600 transition-colors shadow-lg shadow-red-500/60 hover:shadow-xl hover:shadow-red-500/80 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50"
          >
            {loading ? 'Joining...' : 'Subscribe'}
          </button>

          </div>
          
        </form>
          </>
      )}
      </div> 
    </div>
  );
}
