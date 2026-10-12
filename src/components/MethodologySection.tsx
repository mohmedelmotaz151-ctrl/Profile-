import React, { useState } from 'react';
import { 
  ClipboardCheck, 
  PenTool, 
  Wrench, 
  Gauge, 
  CalendarCheck, 
  Award, 
  CheckCircle2, 
  Layers,
  Sparkles
} from 'lucide-react';
import { Language } from '../types';
import { METHODOLOGY_STEPS } from '../data/companyData';

interface MethodologySectionProps {
  lang: Language;
}

const iconMap: Record<string, React.ElementType> = {
  ClipboardCheck,
  PenTool,
  Wrench,
  Gauge,
  CalendarCheck,
  Award,
};

export const MethodologySection: React.FC<MethodologySectionProps> = ({ lang }) => {
  const isAr = lang === 'ar';
  const [activeStepIndex, setActiveStepIndex] = useState(0);

  const currentStep = METHODOLOGY_STEPS[activeStepIndex];
  const StepIcon = iconMap[currentStep.iconName] || ClipboardCheck;

  return (
    <section id="methodology" className="py-20 bg-white text-slate-800 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-bold uppercase tracking-wider mb-3">
            <Layers className="w-3.5 h-3.5" />
            <span>{isAr ? 'دورة العمل الهندسية' : 'Engineering Lifecycle'}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0B1E36] tracking-tight">
            {isAr 
              ? 'منهجية العمل والصيانة الدورية' 
              : 'Turnkey Methodology & Maintenance Protocols'}
          </h2>
          <div className="w-20 h-1 bg-red-600 mx-auto mt-4 rounded-full"></div>
          <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed">
            {isAr 
              ? 'نتبع في شركة أوريكيت مساراً تشغيلياً دقيقاً يرتكز على المعايير الهندسية الصارمة لكود البناء السعودي SBC ومتطلبات الدفاع المدني لضمان جاهزية المنشأة طوال العام.' 
              : 'At Orkeit, our workflow adheres to meticulous engineering milestones, ensuring full compliance with Saudi Building Codes and safeguarding facilities round-the-clock.'}
          </p>
        </div>

        {/* Step Navigation Bar / Stepper */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 mb-10">
          {METHODOLOGY_STEPS.map((step, idx) => {
            const Icon = iconMap[step.iconName] || ClipboardCheck;
            const isActive = idx === activeStepIndex;

            return (
              <button
                key={step.stepNumber}
                onClick={() => setActiveStepIndex(idx)}
                className={`p-4 rounded-xl text-right transition-all flex flex-col justify-between border cursor-pointer ${
                  isActive
                    ? 'bg-[#0B1E36] text-white border-[#0B1E36] shadow-lg ring-2 ring-red-500/50'
                    : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                }`}
              >
                <div className="flex items-center justify-between w-full mb-3">
                  <span className={`text-xs font-mono font-bold px-2 py-0.5 rounded ${
                    isActive ? 'bg-red-600 text-white' : 'bg-slate-200 text-slate-700'
                  }`}>
                    {step.stepNumber}
                  </span>
                  <Icon className={`w-5 h-5 ${isActive ? 'text-red-400' : 'text-slate-400'}`} />
                </div>
                <div className="w-full">
                  <p className="text-xs font-bold line-clamp-2">
                    {isAr ? step.titleAr : step.titleEn}
                  </p>
                </div>
              </button>
            );
          })}
        </div>

        {/* Active Step Detailed Card */}
        <div className="bg-gradient-to-br from-slate-900 to-[#0B1E36] rounded-2xl text-white p-8 sm:p-12 shadow-2xl border border-slate-800 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Step Left / Right Summary */}
            <div className="lg:col-span-8 space-y-6">
              <div className="flex items-center gap-3">
                <span className="text-3xl font-black text-red-500 font-mono">
                  {currentStep.stepNumber}
                </span>
                <span className="text-sm font-semibold text-slate-300 uppercase tracking-widest px-3 py-1 bg-white/10 rounded-full">
                  {isAr ? currentStep.subtitleAr : currentStep.subtitleEn}
                </span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
                {isAr ? currentStep.titleAr : currentStep.titleEn}
              </h3>

              <p className="text-slate-300 leading-relaxed text-base sm:text-lg">
                {isAr ? currentStep.descriptionAr : currentStep.descriptionEn}
              </p>

              {/* Deliverables Checklist */}
              <div className="pt-4 border-t border-slate-800">
                <h4 className="text-xs font-bold text-red-400 uppercase tracking-wider mb-4 flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4" />
                  <span>{isAr ? 'المخرجات الهندسية المعتمدة لهذه المرحلة' : 'Approved Engineering Deliverables'}</span>
                </h4>
                
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {(isAr ? currentStep.deliverablesAr : currentStep.deliverablesEn).map((deliv, i) => (
                    <div 
                      key={i} 
                      className="bg-white/5 border border-white/10 rounded-xl p-3.5 text-xs sm:text-sm text-slate-200 flex items-start gap-2.5"
                    >
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{deliv}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Step Badge Visual Column */}
            <div className="lg:col-span-4 flex flex-col items-center justify-center p-6 bg-white/5 rounded-2xl border border-white/10 text-center">
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-red-600 to-red-500 flex items-center justify-center text-white mb-4 shadow-xl shadow-red-950/60">
                <StepIcon className="w-10 h-10" />
              </div>

              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">
                {isAr ? 'المرحلة' : 'Phase'} {currentStep.stepNumber} / 06
              </span>
              
              <p className="text-sm font-semibold text-white">
                {isAr ? 'تنفيذ بإشراف هندسي معتمد' : 'Certified Engineering Oversight'}
              </p>

              <div className="mt-6 w-full flex items-center justify-between text-xs text-slate-400 pt-4 border-t border-white/10">
                <button
                  onClick={() => setActiveStepIndex((prev) => (prev > 0 ? prev - 1 : METHODOLOGY_STEPS.length - 1))}
                  className="hover:text-white px-2 py-1 rounded bg-white/5 hover:bg-white/10 cursor-pointer"
                >
                  {isAr ? 'السابق' : 'Previous'}
                </button>
                <span>{activeStepIndex + 1} / {METHODOLOGY_STEPS.length}</span>
                <button
                  onClick={() => setActiveStepIndex((prev) => (prev < METHODOLOGY_STEPS.length - 1 ? prev + 1 : 0))}
                  className="hover:text-white px-2 py-1 rounded bg-white/5 hover:bg-white/10 cursor-pointer"
                >
                  {isAr ? 'التالي' : 'Next'}
                </button>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
