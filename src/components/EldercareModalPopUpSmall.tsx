// src/components/EldercareModalPopUp.tsx
import React, { useState, useEffect } from 'react';
import { X, AlertTriangle, TrendingUp, Shield, ShieldCheck } from 'lucide-react';

interface EldercareModalPopUpSmallProps {
  isOpen: boolean;
  onClose: () => void;
  onStartOnboarding: () => void;  // Changed from onDashboardOpen
}

export function EldercareModalPopUpSmall({ isOpen, onClose, onStartOnboarding }: EldercareModalPopUpProps) {
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (isOpen) {
      // Trigger animation after component mounts
      setTimeout(() => setIsAnimating(true), 100);
    } else {
      setIsAnimating(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleOpenOnboarding = () => {
    onClose(); // Close the popup modal
    onStartOnboarding(); // Open the onboarding modal (managed by parent)
  };

  return (
    <div 
      className={`fixed bottom-6 right-6 z-50 transition-all duration-500 ease-out ${
        isAnimating 
          ? 'translate-y-0 opacity-100' 
          : 'translate-y-8 opacity-0'
      }`}
    >
      {/*<div className="bg-gray-900 rounded-2xl shadow-2xl w-[320px] relative overflow-hidden border border-gray-800 animate-bounce-subtle">*/}

      <div className="bg-gray-900 rounded-2xl shadow-2xl mx-auto relative overflow-hidden border border-gray-800 animate-bounce-subtle">
        {/* Decorative gradient accent */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-red-500 via-red-400 to-red-500"></div>
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-3 top-3 text-gray-400 hover:text-white transition-colors z-10 hover:bg-gray-800 rounded-lg p-1.5"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Content Container */}
        <div className="p-6">
          {/* Icon Section */}
          <div className="hidden sm:flex justify-center mb-4">
            <div className="relative">
              <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-red-600 rounded-xl flex items-center justify-center shadow-lg shadow-red-500/30 rotate-3 transition-transform hover:rotate-6">
                <ShieldCheck className="w-8 h-8 text-white" />
              </div>
              <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-400 rounded-full animate-ping opacity-20"></div>
              <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-400 rounded-full flex items-center justify-center">
                <AlertTriangle className="w-3 h-3 text-white" />
              </div>
            </div>
          </div>

          {/* Title Section */}
          <div className="text-center mb-4">
            <h2 className="text-2xl font-bold text-white mb-3 tracking-tight">
              Care Gap Finder 👇
            </h2>
            
            {/* Headline - Prominent */}
            <div className="mb-4 pb-4 border-b border-gray-800">
              <p className="hidden sm:inline text-lg font-bold text-red-400 leading-tight">
                {/*Avoid huge monthly care bills*/}
                Fix eldercare gaps for Mom
              </p>

              <p className="sm:hidden text-lg font-bold text-red-400 leading-tight">
                {/*Avoid $10,000/month care bills*/}
                {/*Avoid huge monthly care bills*/}
                {/*Discover hidden care gaps*/}
                Fix eldercare gaps for Mom
              </p>
            </div>

            {/* Body Message - Clear and Readable */}
            {/*
            <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700">
              <p className="text-sm text-gray-200 leading-relaxed">
                A single document error could invalidate your parents' insurance. Find the gaps in their financial estate before the "Look-Back" period kicks in.
              </p>
            </div>
            */}
          </div>

          {/* Visual Trust Elements */}
          {/*
          <div className="grid grid-cols-3 gap-3 mb-4">
            <div className="text-center">
              <div className="w-10 h-10 mx-auto mb-1.5 bg-red-500/10 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-red-400" />
              </div>
              <p className="text-xs text-gray-400 font-medium">2-Min Check</p>
            </div>
            <div className="text-center">
              <div className="w-10 h-10 mx-auto mb-1.5 bg-red-500/10 rounded-lg flex items-center justify-center">
                <Shield className="w-5 h-5 text-red-400" />
              </div>
              <p className="text-xs text-gray-400 font-medium">Secure</p>
            </div>
            <div className="text-center">
              <div className="w-10 h-10 mx-auto mb-1.5 bg-red-500/10 rounded-lg flex items-center justify-center">
                <AlertTriangle className="w-5 h-5 text-red-400" />
              </div>
              <p className="text-xs text-gray-400 font-medium">Find Gaps</p>
            </div>
          </div>
          */}

          {/* CTA Button */}
          <div className="flex flex-col items-center space-y-3">
            <button
              onClick={handleOpenOnboarding}
              className="w-auto px-6 py-3 bg-gradient-to-r from-red-500 to-red-600 text-white text-base font-semibold rounded-xl hover:from-red-600 hover:to-red-700 transition-all duration-300 shadow-xl shadow-red-500/30 hover:shadow-2xl hover:shadow-red-500/50 hover:scale-105 active:scale-95 transform"
            >
              Start Fixing Care Gaps
            </button>
            
            <p className="text-xs text-gray-500">
              {/*No credit card required*/}
              Free . Secure . Fast 
            </p>
          </div>
        </div>

        {/* Bottom accent border */}
        <div className="h-1.5 bg-gradient-to-r from-gray-800 via-red-500/20 to-gray-800"></div>
      </div>
    </div>
  );
}

export default EldercareModalPopUpSmall;
