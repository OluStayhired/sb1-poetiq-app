import React, { useState } from 'react';
import { X, CheckCircle, Info, MailCheck } from 'lucide-react';
import { z } from 'zod';
import { supabase } from '../lib/supabase';
import { TooltipExtended } from '/src/utils/TooltipExtended';

interface WaitlistModalProps {
  isOpen: boolean;
  onClose: () => void;
  //onSuccess: () => void;
}

const waitlistSchema = z.object({
  email: z.string().email('Invalid email address'),
  //name: z.string().min(2, 'Name must be at least 2 characters'),
  discount: z.enum(['10% off', '20% off', '30% off'], {
    errorMap: () => ({ message: 'Please select a discount option' }),
  }),
});

export function WaitlistModal({ isOpen, onClose, onSuccess }: WaitlistModalProps) {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [discount, setDiscount] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false); 
  const [showSuccessScreen, setShowSuccessScreen] = useState(false); // New state for success screen

  //const [isWaitlistSuccessModalOpen, setIsWaitlistSuccessModalOpen] = useState(false);

  if (!isOpen) return null;

  // New function to reset form and close modal
  const resetFormAndModal = () => {
    setEmail('');
    setName('');
    setDiscount('');
    setError('');
    setLoading(false);
    setShowSuccessScreen(false); // Reset success screen state
    onClose(); // Close the modal
  };

  
const handleJoinWaitlist = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Validate input using Zod
      waitlistSchema.parse({ email, name, discount });

      // Insert data into Supabase
      const { error: supabaseError } = await supabase.from('wait_list').insert({
        //first_name: name, // Map 'name' from form to 'first_name' column
        email: email,
        discount: discount,
      });

      //if (supabaseError) {
      //  throw new Error(supabaseError.message); // Throw Supabase error to be caught below
      //}

       // --- CRITICAL ERROR HANDLING SECTION ---
      if (supabaseError) {
        // Check for the specific PostgreSQL unique constraint violation error code
        if (supabaseError.code === '23505') {
          setError("You're already on our waitlist!"); // User-friendly message
        } else {
          // For other Supabase errors, log the technical error for debugging
          console.error("Supabase Error:", supabaseError);
          // And provide a more general user-friendly error message
          setError(`Failed to join waitlist: ${supabaseError.message || 'An unexpected database error occurred.'}`);
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
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Congratulations!</h2>
            <p className="text-lg text-gray-600 mb-8">
              You've successfully joined our waitlist. We'll notify you when we launch!🚀
            </p>
            <button
              onClick={resetFormAndModal} // Use new reset function for close button
              className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Close
            </button>
          </div>
        ) : (
          // Waitlist Form Content
          <>
      {/*
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          Join Our Waitlist
        </h2>
     */}

          {/* Header */}
        <div className="text-center mb-6">
          <div className="mx-auto w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center mb-4">
            <MailCheck className="w-8 h-8 text-blue-500" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Join Our Waitlist
          </h2>
          <p className="text-gray-600 text-sm">
            Let's create content that speaks to your tribe! 
          </p>
        </div>    

        <form onSubmit={handleJoinWaitlist} className="space-y-4 text-center">
          {/* 
          <div>
            <label htmlFor="name" className="text-left px-1 block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              disabled={loading}
              className="text-left mt-1 px-2 py-2 block w-full rounded-md border border-gray-200 outline-none focus:border-blue-500 focus:ring-0 focus:ring-blue-500"
              required
            />
          </div>
          */}

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
              placeholder="Your Email Address"
              className="text-left px-2 mt-1 py-2 block w-full rounded-md border border-blue-200 placeholder-text-sm outline-none focus:border-blue-500 focus:ring-0 focus:ring-blue-500"
              required
            />
          </div>

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

          {error && (
            <p className="text-red-600 text-sm">{error}</p>
          )}
        <div className="items-center justify-center">
          <button
            type="submit"
            disabled={loading}
            className="mt-8 w-full py-2 px-4 sm:w-1/2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
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
