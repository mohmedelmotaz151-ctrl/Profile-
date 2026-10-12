import React, { useState } from 'react';
import { 
  Flame, 
  BellRing, 
  ShieldAlert, 
  Server, 
  UtensilsCrossed, 
  FileCheck2, 
  Check, 
  ArrowRight, 
  ArrowLeft,
  X,
  ShieldCheck,
  Send
} from 'lucide-react';
import { Language, ServiceItem } from '../types';
import { SERVICES_LIST } from '../data/companyData';

interface ServicesSectionProps {
  lang: Language;
  onOpenQuoteWithService: (serviceName: string) => void;
}

const iconMap: Record<string, React.ElementType> = {
  Flame,
  BellRing,
  ShieldAlert,
  Server,
  UtensilsCrossed,
  FileCheck2,
};

export const ServicesSection: React.FC<ServicesSectionProps> = ({ 
  lang, 
  onOpenQuoteWithService 
}) => {
  const isAr = lang === 'ar';
  const ArrowIcon = isAr ? ArrowLeft : ArrowRight;
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const filteredServices = activeCategory === 'all' 
    ? SERVICES_LIST 
    : SERVICES_LIST.filter(s => s.id === activeCategory);

  return (
    <section id="services" className="py-20 bg-slate-50 text-slate-800 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-red-100 text-red-700 text-xs font-bold uppercase tracking-wider mb-3">
            <Flame className="w-3.5 h-3.5" />
            <span>{isAr ? 'مجالات الاختصاص والخدمات' : 'Specialized Safety Services'}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0B1E36] tracking-tight">
            {isAr 
              ? 'خدمات السلامة والوقاية وأنظمة مكافحة الحريق' 
              : 'Fire Protection, Safety & Maintenance Services'}
          </h2>
          <div className="w-20 h-1 bg-red-600 mx-auto mt-4 rounded-full"></div>
          <p className="mt-4 text-base sm:text-lg text-slate-600">
            {isAr 
              ? 'حلول هندسية متكاملة لصيانة وتعبئة طفايات الحريق، وتركيب وتشغيل شبكات الإنذار والإطفاء وفق متطلبات الدفاع المدني وكود البناء السعودي.' 
              : 'Comprehensive turnkey solutions for fire extinguisher servicing, alarm detection, and automatic suppression installations aligned with Civil Defense standards.'}
          </p>
        </div>

        {/* Quick Category Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          <button
            onClick={() => setActiveCategory('all')}
            className={`px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition cursor-pointer ${
              activeCategory === 'all'
                ? 'bg-[#0B1E36] text-white shadow-md'
                : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
            }`}
          >
            {isAr ? 'جميع الخدمات (6)' : 'All Services (6)'}
          </button>
          {SERVICES_LIST.map((srv) => (
            <button
              key={srv.id}
              onClick={() => setActiveCategory(srv.id)}
              className={`px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition cursor-pointer ${
                activeCategory === srv.id
                  ? 'bg-red-600 text-white shadow-md'
                  : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
              }`}
            >
              {isAr ? srv.titleAr : srv.titleEn}
            </button>
          ))}
        </div>

        {/* Services Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredServices.map((service) => {
            const IconComponent = iconMap[service.iconName] || Flame;

            return (
              <div
                key={service.id}
                className="bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-xl hover:border-red-400 transition-all duration-300 flex flex-col overflow-hidden group"
              >
                {/* Card Top Accent Banner */}
                <div className="h-2 bg-gradient-to-r from-red-600 via-red-500 to-[#0B1E36] group-hover:h-3 transition-all" />

                <div className="p-7 flex-1 flex flex-col">
                  
                  {/* Icon & Category Tag */}
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-14 h-14 rounded-xl bg-red-50 border border-red-200 flex items-center justify-center text-red-600 group-hover:bg-[#0B1E36] group-hover:text-white transition duration-300 shadow-sm">
                      <IconComponent className="w-7 h-7" />
                    </div>
                    <span className="text-xs px-2.5 py-1 rounded-md bg-slate-100 text-slate-700 font-semibold border border-slate-200">
                      {isAr ? service.tagAr : service.tagEn}
                    </span>
                  </div>

                  {/* Title & Short Description */}
                  <h3 className="text-xl font-bold text-[#0B1E36] mb-3 group-hover:text-red-600 transition">
                    {isAr ? service.titleAr : service.titleEn}
                  </h3>
                  
                  <p className="text-sm text-slate-600 mb-6 leading-relaxed flex-1">
                    {isAr ? service.shortDescAr : service.shortDescEn}
                  </p>

                  {/* Features Bullet List */}
                  <div className="space-y-2 mb-6 pt-4 border-t border-slate-100">
                    {(isAr ? service.featuresAr : service.featuresEn).slice(0, 3).map((feat, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-slate-700">
                        <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>

                  {/* Standards Badges */}
                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {(isAr ? service.standardsAr : service.standardsEn).map((std, idx) => (
                      <span 
                        key={idx} 
                        className="text-[11px] font-mono px-2 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-200"
                      >
                        {std}
                      </span>
                    ))}
                  </div>

                  {/* Buttons */}
                  <div className="grid grid-cols-2 gap-2 pt-2">
                    <button
                      onClick={() => setSelectedService(service)}
                      className="px-3 py-2.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-[#0B1E36] font-bold text-xs transition cursor-pointer flex items-center justify-center gap-1"
                    >
                      <span>{isAr ? 'التفاصيل الفنية' : 'Technical Details'}</span>
                    </button>

                    <button
                      onClick={() => onOpenQuoteWithService(isAr ? service.titleAr : service.titleEn)}
                      className="px-3 py-2.5 rounded-lg bg-red-600 hover:bg-red-700 text-white font-bold text-xs transition cursor-pointer flex items-center justify-center gap-1 shadow-sm"
                    >
                      <span>{isAr ? 'طلب الخدمة' : 'Request Service'}</span>
                      <ArrowIcon className="w-3.5 h-3.5" />
                    </button>
                  </div>

                </div>
              </div>
            );
          })}
        </div>

      </div>

      {/* Service Details Modal */}
      {selectedService && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-2xl w-full shadow-2xl border border-slate-200 overflow-hidden my-8 animate-in fade-in zoom-in-95 duration-200">
            
            {/* Modal Header */}
            <div className="bg-[#0B1E36] text-white p-6 relative">
              <button
                onClick={() => setSelectedService(null)}
                className="absolute top-5 left-5 text-slate-300 hover:text-white p-1 rounded-lg bg-white/10"
              >
                <X className="w-5 h-5" />
              </button>
              
              <div className="flex items-center gap-3 mb-2">
                <span className="text-xs px-2.5 py-0.5 rounded bg-red-600 text-white font-semibold">
                  {isAr ? selectedService.tagAr : selectedService.tagEn}
                </span>
                <span className="text-xs text-slate-300">
                  {isAr ? 'مواصفات ومعايير معتمدة' : 'Accredited Specifications'}
                </span>
              </div>

              <h3 className="text-2xl font-black text-white">
                {isAr ? selectedService.titleAr : selectedService.titleEn}
              </h3>
            </div>

            {/* Modal Body */}
            <div className="p-6 sm:p-8 space-y-6 max-h-[70vh] overflow-y-auto">
              
              <div>
                <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                  {isAr ? 'الوصف الهندسي الشامل' : 'Comprehensive Engineering Overview'}
                </h4>
                <p className="text-slate-700 leading-relaxed text-sm sm:text-base">
                  {isAr ? selectedService.fullDescAr : selectedService.fullDescEn}
                </p>
              </div>

              <div>
                <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">
                  {isAr ? 'نطاق العمل ومميزات الخدمة' : 'Scope of Work & Key Features'}
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {(isAr ? selectedService.featuresAr : selectedService.featuresEn).map((feat, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-slate-800 bg-slate-50 p-2.5 rounded-lg border border-slate-200">
                      <ShieldCheck className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                  {isAr ? 'الأكواد والمعايير الهندسية المعمول بها' : 'Applicable Codes & Compliance'}
                </h4>
                <div className="flex flex-wrap gap-2">
                  {(isAr ? selectedService.standardsAr : selectedService.standardsEn).map((std, idx) => (
                    <span key={idx} className="px-3 py-1 bg-red-50 text-red-700 rounded-md text-xs font-mono font-bold border border-red-200">
                      {std}
                    </span>
                  ))}
                </div>
              </div>

            </div>

            {/* Modal Footer */}
            <div className="bg-slate-50 border-t border-slate-200 p-4 sm:p-6 flex flex-wrap items-center justify-between gap-3">
              <button
                onClick={() => setSelectedService(null)}
                className="px-4 py-2.5 rounded-lg text-slate-600 hover:bg-slate-200 text-sm font-semibold transition cursor-pointer"
              >
                {isAr ? 'إغلاق' : 'Close'}
              </button>

              <button
                onClick={() => {
                  const srvTitle = isAr ? selectedService.titleAr : selectedService.titleEn;
                  setSelectedService(null);
                  onOpenQuoteWithService(srvTitle);
                }}
                className="px-6 py-2.5 rounded-lg bg-red-600 hover:bg-red-700 text-white font-bold text-sm shadow-md transition flex items-center gap-2 cursor-pointer"
              >
                <Send className="w-4 h-4" />
                <span>{isAr ? 'طلب عرض سعر لهذه الخدمة' : 'Request Quote for this Service'}</span>
              </button>
            </div>

          </div>
        </div>
      )}

    </section>
  );
};
