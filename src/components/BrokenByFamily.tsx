import React from 'react';
import { X, Users, MessageCircle, Sparkles } from 'lucide-react';

interface BrokenByFamilyProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenCommunity: () => void;
}

export function BrokenByFamily({ isOpen, onClose, onOpenCommunity }: BrokenByFamilyProps) {
  if (!isOpen) return null;

  const handleJoinCircle = () => {
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
              <Users className="w-8 h-8 text-red-500 group-hover:scale-110 transition-transform duration-300" />
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
            A Safe Space{' '}
            <span className="text-red-500">to Vent.</span>
          </h2>
        </div>

        {/* Body Content */}
        <div className="mb-8 space-y-4">
          <p className="text-gray-700 text-base leading-relaxed">
            Being the "responsible one" is an exhausting, unpaid second job. When sibling friction and family politics collide with your career, you shouldn't have to carry the weight alone. You need a <span className="font-semibold text-red-500">confidential environment to speak freely</span> among peers who understand the high-stakes pressure of your life.
          </p>

          {/* Alert box with pivot message */}
          <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-r-lg hover:bg-red-100 transition-colors duration-300">
            <div className="flex items-start">
              <MessageCircle className="w-5 h-5 text-red-500 mt-0.5 mr-3 flex-shrink-0" />
              <p className="text-gray-800 font-semibold text-sm">
                Access 1:1 peer sessions and monthly clinical coaching to normalize the struggle, resolve family conflict, and share the mental load.
              </p>
            </div>
          </div>
        </div>

        {/* CTA Button */}
        <div className="flex justify-center">
          <button
            onClick={handleJoinCircle}
            className="group w-full sm:w-auto px-8 py-3 bg-gradient-to-r from-red-500 to-red-600 text-white font-semibold rounded-lg hover:from-red-600 hover:to-red-700 transition-all duration-300 shadow-lg shadow-red-500/50 hover:shadow-xl hover:shadow-red-500/70 hover:-translate-y-0.5 flex items-center justify-center space-x-2"
          >
            <Users className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
            <span>Join the Executive Circle</span>
          </button>
        </div>

        {/* Optional: Subtle footer text */}
        <p className="text-center text-xs text-gray-500 mt-6">
          Join our community for peer support and clinical coaching
        </p>
      </div>
    </div>
  );
}
