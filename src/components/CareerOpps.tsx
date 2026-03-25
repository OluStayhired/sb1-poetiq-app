import React from 'react';
import { X, Briefcase, TrendingUp, Sparkles } from 'lucide-react';

interface CareerOppsProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenCommunity: () => void;
}

export function CareerOpps({ isOpen, onClose, onOpenCommunity }: CareerOppsProps) {
  if (!isOpen) return null;

  const handleAccessCare = () => {
    onClose();
    onOpenCommunity();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl p-8 w-full max-w-lg relative shadow-2xl border-2 border-red-100">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-400 hover:text-red-500 transition-colors duration-300"
          aria-label="Close modal"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Icon Circle */}
        <div className="flex justify-center mb-6">
          <div className="relative">
            <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center border-2 border-red-200 group hover:border-red-400 hover:bg-red-100 transition-all duration-300">
              <Briefcase className="w-8 h-8 text-red-500 group-hover:scale-110 transition-transform duration-300" />
            </div>
            {/* Decorative sparkle */}
            <div className="absolute -top-1 -right-1">
              <Sparkles className="w-5 h-5 text-red-400 animate-pulse" />
            </div>
          </div>
        </div>

        {/* Header */}
        <div className="text-center mb-6">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">
            Be Present Where{' '}
            <span className="text-red-500">it Matters.</span>
          </h2>
        </div>

        {/* Body Content */}
        <div className="mb-8 space-y-4">
          <p className="text-gray-700 text-base leading-relaxed">
            Your career shouldn't stall because a caregiver didn't show up. Our platform finds <span className="font-semibold text-red-500">vetted, rated agencies and emergency sitters</span> ready to step in when opportunity calls.
          </p>

          {/* Alert box with pivot message */}
          <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-r-lg hover:bg-red-100 transition-colors duration-300">
            <div className="flex items-start">
              <TrendingUp className="w-5 h-5 text-red-500 mt-0.5 mr-3 flex-shrink-0" />
              <p className="text-gray-800 font-semibold text-sm">
                Stop declining the dinners and travel that open doors. Delegate the caregiving, not your career.
              </p>
            </div>
          </div>
        </div>

        {/* CTA Button */}
        <div className="flex justify-center">
          <button
            onClick={handleAccessCare}
            className="group w-full sm:w-auto px-8 py-3 bg-gradient-to-r from-red-500 to-red-600 text-white font-semibold rounded-lg hover:from-red-600 hover:to-red-700 transition-all duration-300 shadow-lg shadow-red-500/50 hover:shadow-xl hover:shadow-red-500/70 hover:-translate-y-0.5 flex items-center justify-center space-x-2"
          >
            <Briefcase className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
            <span>Access On-Demand Care</span>
          </button>
        </div>

        {/* Optional: Subtle footer text */}
        <p className="text-center text-xs text-gray-500 mt-6">
          Join our community to access vetted caregiving agencies and emergency support
        </p>
      </div>
    </div>
  );
}
