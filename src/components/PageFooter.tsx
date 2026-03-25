//import React from 'react';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { HeartPulse, Target } from 'lucide-react';

interface PageFooterProps {
  onOpenOnboardingModal: () => void;
}

export function PageFooter({ onOpenOnboardingModal }: PageFooterProps) {
  return (
    <footer className="mt-24 border-t border-gray-300 text-left">
      <div className="max-w-7xl mx-auto px-4 py-12">
               <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2">
          {/* Company Info */}
        <Link to="/">
          <div className="space-y-4 space-x-1">
          
            <div className="inline-flex bg-red-100 rounded-full p-0.5">
              <Target className="h-5 w-5 fill-white stroke-red-500" />
            </div>
            <span className="text-xl font-bold text-gray-700 sm:text-xl">poetiq</span>
                           
            <p className="text-sm text-gray-600">
              
              The all-in-one platform for managing Mom and Dad's long-term care affairs!
            </p>
            {/* Social links */}
          </div>
           </Link> 

          {/* Product Links*/}
          <div className="col-span-1">
            <h3 className="font-semibold mb-4">About Poetiq</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>
                <Link
                    to="/#TheStruggle"
                    onClick={(e) => {
                    //setIsMobileMenuOpen(false);
              // If already on /dev page, manually scroll to element
              if (window.location.pathname === '/') {
                e.preventDefault();
                const element = document.getElementById('TheStruggle');
                if (element) {
                  element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
              }
            }}
            className="no-underline hover:text-red-400 transition-colors"
              >
                Long-term care struggle for senior leaders
            </Link>    
          </li>
               <li>
                <Link
                    to="/#HowItWorks"
                    onClick={(e) => {
                    //setIsMobileMenuOpen(false);
              // If already on / page, manually scroll to element
              if (window.location.pathname === '/') {
                e.preventDefault();
                const element = document.getElementById('HowItWorks');
                if (element) {
                  element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
              }
            }}
            className="no-underline hover:text-red-400 transition-colors"
              >
                How long-term care navigator helps leaders
            </Link>    
          </li>
               <li>
                <Link
                    to="/#TheReset"
                    onClick={(e) => {
                    //setIsMobileMenuOpen(false);
              // If already on /dev page, manually scroll to element
              if (window.location.pathname === '/') {
                e.preventDefault();
                const element = document.getElementById('TheReset');
                if (element) {
                  element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
              }
            }}
            className="no-underline hover:text-red-400 transition-colors"
              >
                   Testimonials from career professionals
            </Link>    
                  
              </li>
              
              <li>
                <Link
                    to="/#FAQ"
                    onClick={(e) => {
                    //setIsMobileMenuOpen(false);
              // If already on /dev page, manually scroll to element
              if (window.location.pathname === '/') {
                e.preventDefault();
                const element = document.getElementById('FAQ');
                if (element) {
                  element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
              }
            }}
            className="no-underline hover:text-red-400 transition-colors"
              >
                   Frequently Asked Questions
            </Link>    
                  
              </li>
              
              <li>
                <Link to="/eldercare-case-studies" className="no-underline hover:text-red-400 transition-colors">
                      Eldercare Case Studies
                </Link>
              </li>

              <li>
                <Link to="/partner-program" className="no-underline hover:text-red-400 transition-colors">
                  <h3 className="font-semibold text-gray-900 text-base mt-4 mb-2">
                      Become a Partner
                  </h3>
                </Link>
              </li>

              <li>
                <Link to="/senior-placement-agent-partner" className="no-underline hover:text-red-400 transition-colors">
                      For Senior Placement Agents
                </Link>
              </li>
              
            </ul>
          </div>

          {/* Combined 3-Column Grid Section */}
          <div className="col-span-1 sm:col-span-2 md:col-span-2">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
             

              {/* Free Care Resources */}
              <div>
                <h3 className="font-semibold mb-4">Free Care Resources</h3>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="mb-2">
                        <p className="text-gray-400 text-sm font-semibold">🏁 Start Here</p>
                  </li>
                  <li> 
                    <div
                      onClick={onOpenOnboardingModal}
                      className="no-underline hover:text-red-400 transition-colors cursor-pointer">
                      Eldercare Gap Finder
                    </div>
                  </li>
                  <li> 
                    <Link to="/dementia-assessment" className="no-underline hover:text-red-400 transition-colors">
                     Cognitive Screening Test
                    </Link>
                  </li>
                  
                  <li className="mb-2">
                        <p className="text-gray-400 text-sm font-semibold">👩‍⚕️ Care Help</p>
                  </li> 
                  
                  <li> 
                    <Link to="/medicaid-co-pilot" className="no-underline hover:text-red-400 transition-colors">
                      Long-Term Care Assistant
                    </Link>
                  </li>
                  <li> 
                    <Link to="/eldercare-stress-management" className="no-underline hover:text-red-400 transition-colors">
                      Family Conflict Advisor
                    </Link>
                  </li>
                  
                  <li className="mb-2">
                        <p className="text-gray-400 text-sm font-semibold">🕵️‍♀️ Due Diligence</p>
                  </li>                                
                  <li>
                    <Link to="/nursing-home" className="no-underline hover:text-red-400 transition-colors">
                      Nursing Home Auditor 
                    </Link>
                  </li>

                  <li>
                    <Link to="/home-health-care" onClick={() => false} className="no-underline hover:text-red-400 transition-colors">
                      Care Agency Inspector
                    </Link>
                  </li>
                  
                  <li className="mb-2">
                        <p className="text-gray-400 text-sm font-semibold">✍️ Care Blogs</p>
                  </li>
                  <li>
                    <a href="#" className="no-underline hover:text-red-400 transition-colors">
                      Blogs (coming soon)
                    </a>
                  </li>
                </ul>
              </div>

              {/* Premium Care Services */}
              <div>
                <h3 className="font-semibold mb-4">Premium Care Services</h3>
                <ul className="space-y-2 text-sm text-gray-600">
                <li className="mb-2">
                        <p className="text-gray-400 text-sm font-semibold">🆘 Crisis Readiness</p>
                  </li> 
                  <li>
                    <Link to="/eldercare-private-data-store" className="no-underline hover:text-red-400 transition-colors">
                      Eldercare Private Data Store
                    </Link>
                  </li>
                  <li>
                    <Link to="/healthcare-benefits-application-automation" onClick={() => false} className="no-underline hover:text-red-400 transition-colors">
                      Care Benefits Automator
                    </Link>
                  </li>

                  <li className="mb-2">
                        <p className="text-gray-400 text-sm font-semibold">💰 Financial Protection</p>
                  </li> 
                  <li> 
                    <Link to="/medicaid-spenddown-calculator" className="no-underline hover:text-red-400 transition-colors">
                      Spend-Down Calculator
                    </Link>
                  </li>
                  <li> 
                    <Link to="/healthcare-insurance-claims-recovery" className="no-underline hover:text-red-400 transition-colors">
                      Automated Insurance Appeals
                    </Link>
                  </li>

                  <li className="mb-2">
                        <p className="text-gray-400 text-sm font-semibold">🤝 Executive Assistance</p>
                  </li> 
                  <li> 
                    <Link to="/nursing-home-contract-analyzer" className="no-underline hover:text-red-400 transition-colors">
                      AI-Powered Contract Analyzer
                    </Link>
                  </li>
                  <li> 
                    <Link to="/virtual-healthcare-assistant" className="no-underline hover:text-red-400 transition-colors">
                      Virtual Healthcare Assistants
                    </Link>
                  </li>
                </ul>
              </div>
              
               {/* Legal */}
              <div>
                <h3 className="font-semibold mb-4">Legal</h3>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>
                    <a href="/privacy.html" className="flex items-center gap-3 hover:text-red-500 transition-colors">
                      Privacy Policy
                    </a>
                  </li>
                  <li>
                    <a href="/terms.html" className="flex items-center gap-3 hover:text-red-500 transition-colors">
                      Terms of Service
                    </a>
                  </li>
                  <li>
                    <a href="/cookie.html" className="flex items-center gap-3 hover:text-red-500 transition-colors">
                      Cookie Policy
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>


        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <div className="flex flex-col sm:flex-row items-center justify-between text-sm text-gray-600">
            <p className="order-2 sm:order-1">&copy; 2026 poetiq.io All rights reserved.</p>
            <div className="flex space-x-6 order-1 sm:order-2">
              <p className="text-sm text-gray-700 text-center leading-relaxed">
                We make it insanely easy for family caregivers to fix legal and financial gaps for Mom and Dad. 
                Connect with
                <a href="https://www.linkedin.com/in/oluadedeji" className="text-red-500 hover:text-red-600 font-medium transition-colors">
                  {' '}<u>Olu</u>{' '}
                </a>
                on LinkedIn.
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
