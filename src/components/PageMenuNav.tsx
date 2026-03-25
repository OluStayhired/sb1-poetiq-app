import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Menu, 
  X, 
  ArrowRight, 
  HeartPulse, 
  MapPin, 
  Search, 
  CheckCircle, 
  FileText, 
  Shield, 
  Briefcase, 
  Users, 
  Activity, 
  Zap,
  CheckCircle2,
  User,
  ShieldAlert,
  ShieldCheck,
  Headset,
  Dumbbell,
  UserSearch,
  DatabaseZap,
  CircleDollarSign,
  Scale,
  Brain,
  Target,
  Workflow,
  Ambulance,
  Glasses,
  Microscope,
  TextSearch,
  Calculator,
  FileSearch,
  RotateCcw,
  FolderLock,
  BrainCircuit
} from 'lucide-react';


interface PageMenuNavProps {
  onOpenCommunityModal: () => void;
  onOpenOnboardingModal: () => void;
}

export function PageMenuNav({ onOpenCommunityModal, onOpenOnboardingModal }: PageMenuNavProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Mobile Accordion Component for nested menus
function MobileAccordion({ title, items }: { 
  title: string; 
  items: Array<{
    section: string;
    cards: Array<{
      title: string;
      icon: React.ReactNode;
      description: string;
      link?: string;
      onClick: () => void;
      badge?: boolean;
    }>;
  }>;
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden">
      {/* Accordion Header */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between px-4 py-3 text-gray-900 font-semibold bg-white hover:bg-gray-50 transition-all duration-500"
      >
        <span>{title}</span>
        <ArrowRight 
          className={`w-4 h-4 text-gray-600 transition-transform duration-500 ${
            isOpen ? 'rotate-90' : 'rotate-0'
          }`}
        />
      </button>

      {/* Accordion Content */}
      <div
        className={`overflow-hidden transition-all duration-500 ${
          isOpen ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="bg-gray-50 px-2 py-3 space-y-4">
          {items.map((section, sectionIdx) => (
            <div key={sectionIdx} className="space-y-2">
              {/* Section Header */}
              <div className="px-3 py-1">
                <h4 className="text-xs font-bold text-red-300 uppercase tracking-wider">
                  {section.section}
                </h4>
              </div>

              {/* Section Cards */}
              {section.cards.map((card, cardIdx) => (
                card.link ? (
                  <Link
                    key={cardIdx}
                    to={card.link}
                    onClick={card.onClick}
                    className="block bg-white rounded-lg p-3 hover:bg-red-50 border border-gray-200 hover:border-red-200 transition-all duration-500"
                  >
                    <div className="flex items-start space-x-3">
                      <div className="flex-shrink-0 mt-0.5">
                        {card.icon}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-2">
                          <h5 className="text-sm font-bold text-gray-700">
                            {card.title}
                          </h5>
                          {card.badge && (
                            <CheckCircle2 className="w-4 h-4 fill-teal-500 text-white flex-shrink-0" />
                          )}
                        </div>
                        <p className="text-xs text-gray-600 mt-1 leading-relaxed">
                          {card.description}
                        </p>
                      </div>
                    </div>
                  </Link>
                ) : (
                  <button
                    key={cardIdx}
                    onClick={card.onClick}
                    className="w-full bg-white rounded-lg p-3 hover:bg-red-50 border border-gray-200 hover:border-red-200 transition-all duration-500 text-left"
                  >
                    <div className="flex items-start space-x-3">
                      <div className="flex-shrink-0 mt-0.5">
                        {card.icon}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-2">
                          <h5 className="text-sm font-bold text-gray-700">
                            {card.title}
                          </h5>
                          {card.badge && (
                            <CheckCircle2 className="w-4 h-4 fill-teal-500 text-white flex-shrink-0" />
                          )}
                        </div>
                        <p className="text-xs text-gray-600 mt-1 leading-relaxed">
                          {card.description}
                        </p>
                      </div>
                    </div>
                  </button>
                )
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}


  return (
    <nav className="px-4 py-3 flex items-center justify-between sm:px-6 sm:py-4">
      {/*<nav className="sticky top-0 z-9999 bg-white px-4 py-3 flex items-center justify-between sm:px-6 sm:py-4">*/}

      <Link to="/">
        <div className="flex items-center space-x-2">
          <div className="bg-red-100 rounded-full p-1 sm:p-2">
            <Target className="h-7 w-7 fill-white stroke-red-500 sm:h-9 sm:w-9" />
          </div>
          {/*<span className="text-2xl font-bold text-red-500 sm:text-3xl">poetiq</span>*/}
          <span className="text-2xl font-bold text-gray-700 sm:text-3xl">poetiq</span>
        </div>
      </Link>

      
      {/* Desktop Navigation Buttons */}
      <div className="hidden sm:flex items-center space-x-4">
        <div className="items-center flex justify-center space-x-2">
          {/*
          <button
            onClick={() => {
              window.location.href = '/dev#HowItWorks';
              setIsMobileMenuOpen(false);
            }}
            className="max-w-sm px-4 py-3 text-gray-900 font-semibold rounded-lg hover:bg-gray-200 transition-colors"
          >
            How it Works ❤️
          </button>
        */}
          
          <Link
            to="/#HowItWorks"
            onClick={(e) => {
              setIsMobileMenuOpen(false);
              // If already on /dev page, manually scroll to element
              if (window.location.pathname === '/') {
                e.preventDefault();
                const element = document.getElementById('HowItWorks');
                if (element) {
                  element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
              }
            }}
            className="max-w-sm px-4 py-3 text-gray-900 font-semibold rounded-lg hover:bg-gray-200 transition-colors"
          >
            How it Works ❤️
          </Link>
      
          <Link
            to="/eldercare-case-studies"
            className="max-w-sm px-4 py-3 text-gray-900 font-semibold rounded-lg hover:bg-gray-200 transition-colors"
          >
            Case Studies 🩶
          </Link>
          

            <Link
            to="/partner-program"
              /*
            onClick={(e) => {
              setIsMobileMenuOpen(false);
              // If already on /dev page, manually scroll to element
              if (window.location.pathname === '/') {
                e.preventDefault();
                const element = document.getElementById('OperationalSupport');
                if (element) {
                  element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
              }
            }}*/
            className="max-w-sm px-4 py-3 text-gray-900 font-semibold rounded-lg hover:bg-gray-200 transition-colors"
          >
              Partnership 💛

            </Link>    
          
          {/* START: Care Tools Dropdown Menu */}
          <div className="relative group">
            
            {/* Menu Header - Care Tools */}
            <button className="px-4 py-2 text-gray-900 font-semibold rounded-lg hover:bg-gray-200 transition-colors">
              Free Care Tools 🧡
            </button>

                      {/* Mega Menu Dropdown - Full Width 3 Column */}
            <div className="absolute left-1/2 -translate-x-1/2 top-full mt-[-0.5] w-screen max-w-5xl rounded-2xl shadow-2xl bg-white ring-1 ring-black ring-opacity-5 hidden group-hover:block z-50 opacity-0 group-hover:opacity-100 transition-all duration-300 ease-out transform group-hover:translate-y-0 translate-y-2">
              {/* Grid Container */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-8">

                {/* ========== COLUMN 1: YOUR STARTING POINT ========== */}
                <div className="col-span-1 space-y-6 group/col1">
                  {/* Column 1 Header */}
                  <div className="border-b border-gray-200">
                    <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3 px-6 group-hover/col1:text-red-500 transition-colors duration-300">🏁 START HERE</h4>
                  </div>

                  {/* Card 1: Readiness Audit */}
                  <div
                    onClick={onOpenOnboardingModal}
                    className="group/card flex flex-col p-6 rounded-xl hover:bg-gradient-to-br hover:from-teal-50 hover:to-green-50 transition-all duration-300 hover:shadow-lg hover:scale-105 border-2 border-transparent cursor-pointer hover:border-teal-200"
                  >
                    {/* Icon Container */}
                    <div className="flex items-center justify-center w-14 h-14 bg-teal-100 rounded-full mb-4 group-hover/card:bg-teal-200 transition-colors duration-300">
                      <ShieldCheck className="w-7 h-7 text-teal-600 group-hover/card:scale-110 transition-transform duration-300" />
                    </div>

                    
                    
                    {/* Title */}
                    <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover/card:text-teal-600 transition-colors duration-300">
                      Eldercare Gap Finder
                      <CheckCircle2 className="w-5 h-5 fill-teal-500 justify-center align-top text-white ml-1 inline"/>
                    </h3>
                    {/* Description */}
                    <p className="text-sm text-gray-600 leading-relaxed">
                      Identify legal and financial gaps in your parents' healthcare before a crisis hits. 
                    </p>
                  </div>

                  {/* Card 4: Dementia Assessment Test */}
                  <Link
                    to="/dementia-assessment"
                    className="group/card flex flex-col p-6 rounded-xl hover:bg-gradient-to-br hover:from-red-50 hover:to-orange-50 transition-all duration-300 hover:shadow-lg hover:scale-105 border-2 border-transparent hover:border-red-200"
                  >
                    {/* Icon Container */}
                    <div className="flex items-center justify-center w-14 h-14 bg-red-100 rounded-full mb-4 group-hover/card:bg-red-200 transition-colors duration-300">
                      <TextSearch className="w-7 h-7 text-red-600 group-hover/card:scale-110 transition-transform duration-300" />
                    </div>
                    {/* Title */}
                    <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover/card:text-red-600 transition-colors duration-300">
                      Cognitive Baseline Test
                    </h3>
                    {/* Description */}
                    <p className="text-sm text-gray-600 leading-relaxed">
                      Identify early signs of cognitive decline using validated clinical screening tools.
                    </p>
                  </Link>
                </div>

                {/* ========== COLUMN 2: PROFESSIONAL SUPPORT ========== */}
                <div className="col-span-1 space-y-6 group/col2">
                  {/* Column 2 Header */}
                  <div className="border-b border-gray-200">
                    <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3 px-6 group-hover/col2:text-red-500 transition-colors duration-300">👩‍⚕️ PROFESSIONAL SUPPORT</h4>
                  </div>

                  {/* Card 2: Medicaid Co-Pilot */}
                  <Link
                    to="/medicaid-co-pilot"
                    className="group/card flex flex-col p-6 rounded-xl hover:bg-gradient-to-br hover:from-red-50 hover:to-orange-50 transition-all duration-300 hover:shadow-lg hover:scale-105 border-2 border-transparent hover:border-red-200"
                  >
                    {/* Icon Container */}
                    <div className="flex items-center justify-center w-14 h-14 bg-red-100 rounded-full mb-4 group-hover/card:bg-red-200 transition-colors duration-300">
                      <img
                        src="https://selrznkggmoxbpflzwjz.supabase.co/storage/v1/object/public/poetiq_homepage/ellie_ai_square.png"
                        alt="Image 1"
                        className="relative rounded-full w-full h-full border-4 border-red-100 aspect-square group-hover/card:scale-110 transition-transform duration-300" 
                      />
                    </div>
                    {/* Title */}
                    <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover/card:text-red-600 transition-colors duration-300">
                      Long-Term Care Assistant
                    </h3>
                    {/* Description */}
                    <p className="text-sm text-gray-600 leading-relaxed">
                      Get answers to complex Medicaid, VA & state-specific eligibility rules with <b>Ellie</b>.
                    </p>
                  </Link>

                  {/* Card 5: Conflict Coach */}
                  <Link
                    to="/eldercare-stress-management"
                    className="group/card flex flex-col p-6 rounded-xl hover:bg-gradient-to-br hover:from-red-50 hover:to-orange-50 transition-all duration-300 hover:shadow-lg hover:scale-105 border-2 border-transparent hover:border-red-200"
                  >
                    {/* Icon Container */}
                    <div className="flex items-center justify-center w-14 h-14 bg-red-100 rounded-full mb-4 group-hover/card:bg-red-200 transition-colors duration-300">
                      <img
                        src="https://selrznkggmoxbpflzwjz.supabase.co/storage/v1/object/public/poetiq_homepage/sophia_ai_coach.png"
                        alt="Image 1"
                        className="relative rounded-full w-full h-full border-4 border-red-100 aspect-square group-hover/card:scale-110 transition-transform duration-300" 
                      />
                    </div>
                    {/* Title */}
                    <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover/card:text-red-600 transition-colors duration-300">
                      Family Conflict Advisor
                    </h3>
                    {/* Description */}
                    <p className="text-sm text-gray-600 leading-relaxed">
                      Resolve sibling friction and caregiving disputes with advice from <b>Sophia</b>.
                    </p>
                  </Link>
                </div>

                {/* ========== COLUMN 3: INSTANT DUE DILIGENCE ========== */}
                <div className="col-span-1 space-y-6 group/col3">
                  {/* Column 3 Header */}
                  <div className="border-b border-gray-200">
                    <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3 px-6 group-hover/col3:text-red-500 transition-colors duration-300">🕵️‍♀️ INSTANT DUE DILIGENCE</h4>
                  </div>

                  {/* Card 3: Caregiver Agency Finder */}
                  <Link
                    to="/home-health-care"
                    className="group/card flex flex-col p-6 rounded-xl hover:bg-gradient-to-br hover:from-red-50 hover:to-orange-50 transition-all duration-300 hover:shadow-lg hover:scale-105 border-2 border-transparent hover:border-red-200"
                  >
                    {/* Icon Container */}
                    <div className="flex items-center justify-center w-14 h-14 bg-red-100 rounded-full mb-4 group-hover/card:bg-red-200 transition-colors duration-300">
                      <Microscope className="w-7 h-7 text-red-600 group-hover/card:scale-110 transition-transform duration-300" />
                    </div>
                    {/* Title */}
                    <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover/card:text-red-600 transition-colors duration-300">
                      Care Agency Inspector
                    </h3>
                    {/* Description */}
                    <p className="text-sm text-gray-600 leading-relaxed">
                      Inspect agencies by clinical outcomes in mobility, safety and patient dignity.
                    </p>
                  </Link>

                  {/* Card 6: Nursing Home Finder */}
                  <Link
                    to="/nursing-home"
                    className="group/card flex flex-col p-6 rounded-xl hover:bg-gradient-to-br hover:from-red-50 hover:to-orange-50 transition-all duration-300 hover:shadow-lg hover:scale-105 border-2 border-transparent hover:border-red-200"
                  >
                    {/* Icon Container */}
                    <div className="flex items-center justify-center w-14 h-14 bg-red-100 rounded-full mb-4 group-hover/card:bg-red-200 transition-colors duration-300">
                      <Ambulance className="w-7 h-7 text-red-600 group-hover/card:scale-110 transition-transform duration-300" />
                    </div>
                    {/* Title */}
                    <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover/card:text-red-600 transition-colors duration-300">
                      Nursing Home Auditor
                    </h3>
                    {/* Description */}
                    <p className="text-sm text-gray-600 leading-relaxed">
                      Audit facilities by staff attentiveness, health inspection ratings and more.
                    </p>
                  </Link>
                </div>

              </div>
            </div>

          </div>
          {/* END: Care Tools Dropdown Menu */}

        {/* ----------------------- START: Executive Services Dropdown Menu -----------------------*/}
<div className="relative group">
  {/* Menu Header - Executive Services */}
  <button className="px-4 py-2 text-gray-900 font-semibold rounded-lg hover:bg-gray-200 transition-colors">
  Premium Services 💚
  </button>

    {/* Mega Menu Dropdown - Full Width 3 Column Grid */}
  <div className="absolute right-0 top-full mt-[-0.5] w-screen max-w-6xl rounded-2xl shadow-2xl bg-white ring-1 ring-black ring-opacity-5 hidden group-hover:block z-50 opacity-0 group-hover:opacity-100 transition-all duration-300 ease-out transform group-hover:translate-y-0 translate-y-2">
       {/* Grid Container - 6 items in 2 rows */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-8">
      
      {/* ========== COLUMN 1: Crisis Readiness ========== */}
      <div className="col-span-1 space-y-6 group/col1">
        {/* Column 1 Header */}
        <div className="border-b border-gray-200">
          <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3 px-6 group-hover/col1:text-red-500 transition-colors duration-300">🆘 Crisis Readiness</h4>
        </div>

        {/* Card 1: Eldercare Data Vault */}
        <Link
          to="/eldercare-private-data-store"
          className="group/card flex flex-col p-6 rounded-xl hover:bg-gradient-to-br hover:from-red-50 hover:to-orange-50 transition-all duration-300 hover:shadow-lg hover:scale-105 border-2 border-transparent hover:border-red-200">
          <div className="flex items-center justify-center w-14 h-14 bg-red-100 rounded-full mb-4 group-hover/card:bg-red-200 transition-colors duration-300">
            <FolderLock className="w-7 h-7 text-red-600 group-hover/card:scale-110 transition-transform duration-300" />
          </div>
          <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover/card:text-red-600 transition-colors duration-300">
            Eldercare Data Vault
          </h3>
          <p className="text-sm text-gray-600 leading-relaxed">
            Replace fragmented unsecure personal data stores with structured searchable data vaults.
          </p>
        </Link>

        {/* Card 4: Care Benefits Automator */}
        <Link
          to="/healthcare-benefits-application-automation"
          className="group/card flex flex-col p-6 rounded-xl hover:bg-gradient-to-br hover:from-red-50 hover:to-orange-50 transition-all duration-300 hover:shadow-lg hover:scale-105 border-2 border-transparent hover:border-red-200">
          <div className="flex items-center justify-center w-14 h-14 bg-red-100 rounded-full mb-4 group-hover/card:bg-red-200 transition-colors duration-300">
            <BrainCircuit className="w-7 h-7 text-red-600 group-hover/card:scale-110 transition-transform duration-300" />
          </div>
          <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover/card:text-red-600 transition-colors duration-300">
            Care Benefits Automator
          </h3>
          <p className="text-sm text-gray-600 leading-relaxed">
            Avoid application denials. Pre-fill all required state and federal care benefits form with AI
          </p>
        </Link>
      </div>

      {/* ========== COLUMN 2: Financial Protection ========== */}
      <div className="col-span-1 space-y-6 group/col2">
        {/* Column 2 Header */}
        <div className="border-b border-gray-200">
          <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3 px-6 group-hover/col2:text-red-500 transition-colors duration-300">💰 Financial Protection</h4>
        </div>

        {/* Card 2: Spend-Down Calculator */}
        <Link
          to="/medicaid-spenddown-calculator"
          className="group/card flex flex-col p-6 rounded-xl hover:bg-gradient-to-br hover:from-red-50 hover:to-orange-50 transition-all duration-300 hover:shadow-lg hover:scale-105 border-2 border-transparent hover:border-red-200">
          <div className="flex items-center justify-center w-14 h-14 bg-red-100 rounded-full mb-4 group-hover/card:bg-red-200 transition-colors duration-300">
            <Calculator className="w-7 h-7 text-red-600 group-hover/card:scale-110 transition-transform duration-300" />
          </div>
          <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover/card:text-red-600 transition-colors duration-300">
            Spend-Down Calculator
          </h3>
          <p className="text-sm text-gray-600 leading-relaxed">
            Track asset and income thresholds to trigger financial support so you're never out-of-pocket.
          </p>
        </Link>

        {/* Card 5: Claims Recovery Engine */}
        <Link
          to="/healthcare-insurance-claims-recovery"
          className="group/card flex flex-col p-6 rounded-xl hover:bg-gradient-to-br hover:from-red-50 hover:to-orange-50 transition-all duration-300 hover:shadow-lg hover:scale-105 border-2 border-transparent hover:border-red-200">
          <div className="flex items-center justify-center w-14 h-14 bg-red-100 rounded-full mb-4 group-hover/card:bg-red-200 transition-colors duration-300">
            <RotateCcw className="w-7 h-7 text-red-600 group-hover/card:scale-110 transition-transform duration-300" />
          </div>
          <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover/card:text-red-600 transition-colors duration-300">
            Claims Recovery Engine
          </h3>
          <p className="text-sm text-gray-600 leading-relaxed">
            Scan denial letters, identify look-back and gifting errors, automate your insurance appeal.
          </p>
        </Link>
      </div>

      {/* ========== COLUMN 3: Operational Support ========== */}
      <div className="col-span-1 space-y-6 group/col3">
        {/* Column 3 Header */}
        <div className="border-b border-gray-200">
          <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3 px-6 group-hover/col3:text-red-500 transition-colors duration-300">🤝 Executive Assistance</h4>
        </div>

        {/* Card 3: Nursing Home Contract Analyzer */}
        <Link
          to="/nursing-home-contract-analyzer"
          className="group/card flex flex-col p-6 rounded-xl hover:bg-gradient-to-br hover:from-red-50 hover:to-orange-50 transition-all duration-300 hover:shadow-lg hover:scale-105 border-2 border-transparent hover:border-red-200">
          <div className="flex items-center justify-center w-14 h-14 bg-red-100 rounded-full mb-4 group-hover/card:bg-red-200 transition-colors duration-300">
            <FileSearch className="w-7 h-7 text-red-600 group-hover/card:scale-110 transition-transform duration-300" />
          </div>
          <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover/card:text-red-600 transition-colors duration-300">
            Nursing Home Contract Analyzer
          </h3>
          <p className="text-sm text-gray-600 leading-relaxed">
            Detect predatory contracts that inflate monthly care bills for Mom and Dad after admission.
          </p>
        </Link>

        {/* Card 6: Healthcare Virtual Assistants */}
        <Link
          to="/virtual-healthcare-assistant"
          className="group/card flex flex-col p-6 rounded-xl hover:bg-gradient-to-br hover:from-red-50 hover:to-orange-50 transition-all duration-300 hover:shadow-lg hover:scale-105 border-2 border-transparent hover:border-red-200">
          <div className="flex items-center justify-center w-14 h-14 bg-red-100 rounded-full mb-4 group-hover/card:bg-red-200 transition-colors duration-300">
            <Headset className="w-7 h-7 text-red-600 group-hover/card:scale-110 transition-transform duration-300" />
          </div>
          <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover/card:text-red-600 transition-colors duration-300">
            Healthcare Virtual Assistants
          </h3>
          <p className="text-sm text-gray-600 leading-relaxed">
            HIPAA-trained VAs who take over insurance calls, provider logistics, and email follow ups.
          </p>
        </Link>
      </div>
      
    </div>

  </div>
</div>
{/* ---------------------END Executive Services Dropdown Menu --------------------*/}

          <Link
            to="/#FAQ"
            onClick={(e) => {
              setIsMobileMenuOpen(false);
              // If already on /dev page, manually scroll to element
              if (window.location.pathname === '/') {
                e.preventDefault();
                const element = document.getElementById('FAQ');
                if (element) {
                  element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
              }
            }}
            className="max-w-sm px-4 py-2 text-gray-900 font-semibold rounded-lg hover:bg-gray-200 transition-colors"
          >
            FAQ ❓
          </Link>
        </div>

        <button
          onClick={onOpenCommunityModal}
          className="flex items-center justify-center space-x-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-500 transition-colors shadow-lg shadow-red-500/60 hover:shadow-xl hover:shadow-red-500/80 group"
        >
          <span>Join Waitlist</span>
          <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
        </button>

      </div>

      {/* Mobile Menu Button (Hamburger) */}
      <div className="sm:hidden">
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="p-2 text-gray-600 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-md"
          aria-label="Toggle navigation"
        >
          {isMobileMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
{isMobileMenuOpen && (
  <div className="sm:hidden fixed inset-0 bg-white z-40 overflow-y-auto">
    {/* Header with Close Button */}
    <div className="sticky top-0 bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between shadow-sm z-50">
      <Link to="/" onClick={() => setIsMobileMenuOpen(false)}>
        <div className="flex items-center space-x-2">
          <div className="bg-red-100 rounded-full p-1">
            <Target className="h-6 w-6 fill-white stroke-red-500" />
          </div>
          <span className="text-xl font-bold text-gray-700">poetiq</span>
        </div>
      </Link>
      <button
        onClick={() => setIsMobileMenuOpen(false)}
        className="p-2 text-gray-600 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-red-500 rounded-md"
        aria-label="Close navigation"
      >
        <X className="h-6 w-6" />
      </button>
    </div>

    {/* Menu Content */}
    <div className="px-4 py-6 space-y-2">
      
      {/* How it Works */}
      <Link
        to="/#HowItWorks"
        onClick={(e) => {
          setIsMobileMenuOpen(false);
          if (window.location.pathname === '/') {
            e.preventDefault();
            const element = document.getElementById('HowItWorks');
            if (element) {
              element.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
          }
        }}
        className="block w-full text-left px-4 py-3 text-gray-900 font-semibold rounded-lg hover:bg-gray-100 transition-all duration-500"
      >
        How it Works ❤️
      </Link>

      {/* Case Studies */}
      <Link
        to="/eldercare-case-studies"
        onClick={() => setIsMobileMenuOpen(false)}
        className="block w-full text-left px-4 py-3 text-gray-900 font-semibold rounded-lg hover:bg-gray-100 transition-all duration-500"
      >
        Case Studies 🩶
      </Link>

      {/* Quick Tools */}
      <Link
        //to="/#OperationalSupport"
        to="/partner-program"
        
        /*onClick={(e) => {
          setIsMobileMenuOpen(false);
          if (window.location.pathname === '/') {
            e.preventDefault();
            const element = document.getElementById('OperationalSupport');
            if (element) {
              element.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
          }
        }}
        */
        className="block w-full text-left px-4 py-3 text-gray-900 font-semibold rounded-lg hover:bg-gray-100 transition-all duration-500"
      >
        Partnership 💛
      </Link>

      {/* Free Care Tools Accordion */}
      <MobileAccordion
        title="Free Care Tools 🧡"
        items={[
          {
            section: "🏁 START HERE",
            cards: [
              {
                title: "Eldercare Gap Finder",
                icon: <ShieldCheck className="w-5 h-5 text-teal-600" />,
                description: "Close legal and financial gaps before a crisis",
                onClick: () => {
                  onOpenOnboardingModal();
                  setIsMobileMenuOpen(false);
                },
                badge: true
              },
              {
                title: "Cognitive Baseline Test",
                icon: <TextSearch className="w-5 h-5 text-red-600" />,
                description: "Identify early signs of cognitive decline",
                link: "/dementia-assessment",
                onClick: () => setIsMobileMenuOpen(false)
              }
            ]
          },
          {
            section: "👩‍⚕️ PROFESSIONAL SUPPORT",
            cards: [
              {
                title: "Long-Term Care Assistant",
                icon: <img src="https://selrznkggmoxbpflzwjz.supabase.co/storage/v1/object/public/poetiq_homepage/ellie_ai_square.png" alt="Ellie AI" className="w-5 h-5 rounded-full" />,
                description: "Ask Ellie about Medicaid, VA & eligibility rules",
                link: "/medicaid-co-pilot",
                onClick: () => setIsMobileMenuOpen(false)
              },
              {
                title: "Family Conflict Advisor",
                icon: <img src="https://selrznkggmoxbpflzwjz.supabase.co/storage/v1/object/public/poetiq_homepage/sophia_ai_coach.png" alt="Sophia AI" className="w-5 h-5 rounded-full" />,
                description: "Resolve sibling friction with advice from Sophia",
                link: "/eldercare-stress-management",
                onClick: () => setIsMobileMenuOpen(false)
              }
            ]
          },
          {
            section: "🕵️‍♀️ INSTANT DUE DILIGENCE",
            cards: [
              {
                title: "Care Agency Inspector",
                icon: <Microscope className="w-5 h-5 text-red-600" />,
                description: "Inspect agencies by clinical outcomes",
                link: "/home-health-care",
                onClick: () => setIsMobileMenuOpen(false)
              },
              {
                title: "Nursing Home Auditor",
                icon: <Ambulance className="w-5 h-5 text-red-600" />,
                description: "Audit facilities by staff attentiveness",
                link: "/nursing-home",
                onClick: () => setIsMobileMenuOpen(false)
              }
            ]
          }
        ]}
      />

      {/* Premium Services Accordion */}
      <MobileAccordion
        title="Premium Services 💚"
        items={[
          {
            section: "🆘 CRISIS READINESS",
            cards: [
              {
                title: "Eldercare Data Vault",
                icon: <FolderLock className="w-5 h-5 text-red-600" />,
                description: "Structured searchable data vaults",
                link: "/eldercare-private-data-store",
                onClick: () => setIsMobileMenuOpen(false)
              },
              {
                title: "Care Benefits Automator",
                icon: <BrainCircuit className="w-5 h-5 text-red-600" />,
                description: "Pre-fill all care benefits forms with AI",
                link: "/healthcare-benefits-application-automation",
                onClick: () => setIsMobileMenuOpen(false)
              }
            ]
          },
          {
            section: "💰 FINANCIAL PROTECTION",
            cards: [
              {
                title: "Spend-Down Calculator",
                icon: <Calculator className="w-5 h-5 text-red-600" />,
                description: "Track asset and income thresholds",
                link: "/medicaid-spenddown-calculator",
                onClick: () => setIsMobileMenuOpen(false)
              },
              {
                title: "Claims Recovery Engine",
                icon: <RotateCcw className="w-5 h-5 text-red-600" />,
                description: "Automate your insurance appeal",
                link: "/healthcare-insurance-claims-recovery",
                onClick: () => setIsMobileMenuOpen(false)
              }
            ]
          },
          {
            section: "🤝 EXECUTIVE ASSISTANCE",
            cards: [
              {
                title: "Nursing Home Contract Analyzer",
                icon: <FileSearch className="w-5 h-5 text-red-600" />,
                description: "Detect predatory contracts",
                link: "/nursing-home-contract-analyzer",
                onClick: () => setIsMobileMenuOpen(false)
              },
              {
                title: "Healthcare Virtual Assistants",
                icon: <Headset className="w-5 h-5 text-red-600" />,
                description: "HIPAA-trained VAs handle insurance calls",
                link: "/virtual-healthcare-assistant",
                onClick: () => setIsMobileMenuOpen(false)
              }
            ]
          }
        ]}
      />

      {/* FAQ */}
      <Link
        to="/#FAQ"
        onClick={(e) => {
          setIsMobileMenuOpen(false);
          if (window.location.pathname === '/') {
            e.preventDefault();
            const element = document.getElementById('FAQ');
            if (element) {
              element.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
          }
        }}
        className="block w-full text-left px-4 py-3 text-gray-900 font-semibold rounded-lg hover:bg-gray-100 transition-all duration-500"
      >
        Frequent Questions ❓
      </Link>

      {/* Join Waitlist CTA */}
      <div className="pt-4">
        <button
          onClick={() => {
            onOpenCommunityModal();
            setIsMobileMenuOpen(false);
          }}
          className="group flex items-center justify-center space-x-2 w-full px-6 py-4 bg-gradient-to-r from-red-500 to-red-600 text-white text-base font-semibold rounded-lg hover:from-red-600 hover:to-red-700 transition-all duration-500 shadow-lg shadow-red-500/60 hover:shadow-xl hover:shadow-red-500/80"
        >
          <span>Join Waitlist</span>
          <ArrowRight className="w-4 h-4 transition-transform duration-500 group-hover:translate-x-1" />
        </button>
      </div>
    </div>
  </div>
)}


    </nav>
  );
}
