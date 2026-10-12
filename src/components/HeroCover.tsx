import React from 'react';
import { 
  ShieldCheck, 
  Flame, 
  PhoneCall, 
  Building2, 
  CheckCircle2, 
  Printer, 
  Download,
  ArrowRight,
  ArrowLeft,
  Clock,
  MapPin,
  Globe,
  FileSpreadsheet
} from 'lucide-react';
import { Language } from '../types';
import { COMPANY_CONTACT } from '../data/companyData';

interface HeroCoverProps {
  lang: Language;
  onOpenQuote: () => void;
  onOpenSheets: () => void;
  onTriggerPrint: () => void;
}

export const HeroCover: React.FC<HeroCoverProps> = ({
  lang,
  onOpenQuote,
  onOpenSheets,
  onTriggerPrint,
}) => {
  const isAr = lang === 'ar';
  const ArrowIcon = isAr ? ArrowLeft : ArrowRight;

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#071324] via-[#0B1E36] to-[#0F284D] text-white pt-12 pb-24 border-b border-slate-800">
      {/* Decorative Blueprint & Geometric Grid Background */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-red-600/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Formal Header Crest / Official Cover Badge */}
        <div className="flex flex-col items-center text-center mb-8">
          <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-slate-900/80 border border-red-500/40 text-red-300 text-xs sm:text-sm font-semibold mb-6 shadow-inner">
            <span className="flex h-2 w-2 rounded-full bg-red-500 animate-pulse"></span>
            <span>
              {isAr 
                ? 'ملف تعريفي رسمي | شركة أوريكيت للمقاولات العامة' 
                : 'Official Company Profile | Orkeit General Contracting Co.'}
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight max-w-4xl">
            <span className="block text-white mb-2">
              {isAr ? 'شركة أوريكيت للمقاولات العامة' : 'Orkeit General Contracting Co.'}
            </span>
            <span className="bg-gradient-to-r from-red-400 via-red-500 to-amber-300 bg-clip-text text-transparent">
              {isAr 
                ? 'أنظمة السلامة والوقاية ومكافحة الحريق' 
                : 'Fire Protection & Life Safety Systems'}
            </span>
          </h1>

          <p className="mt-6 text-base sm:text-xl text-slate-300 max-w-3xl leading-relaxed">
            {isAr 
              ? 'شريككم الهندسي المعتمد لتأمين وحماية الأرواح والمنشآت. نقدم حلولاً متكاملة تشمل صيانة وتعبئة طفايات الحريق، شبكات الإنذار المبكر، أنظمة الإطفاء الآلي، ومضخات الحريق وفق أعلى معايير كود البناء السعودي واشتراطات الدفاع المدني.'
              : 'Your accredited engineering partner safeguarding lives and assets. Delivering turnkey solutions in fire extinguisher refilling, early alarm networks, automatic fire suppression, and pump stations in full compliance with Saudi Building Code & Civil Defense regulations.'}
          </p>

          {/* Core Action CTAs */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={onOpenQuote}
              className="flex items-center gap-3 px-6 py-3.5 rounded-xl bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white font-bold text-base shadow-xl shadow-red-900/40 transition-all transform hover:-translate-y-0.5 cursor-pointer border border-red-400/30"
            >
              <span>{isAr ? 'طلب عرض سعر / فحص فني' : 'Request Quotation / Inspection'}</span>
              <ArrowIcon className="w-5 h-5" />
            </button>

            <button
              onClick={onTriggerPrint}
              className="flex items-center gap-2.5 px-5 py-3.5 rounded-xl bg-slate-800/90 hover:bg-slate-700 border border-slate-600 text-white font-semibold text-sm transition-all cursor-pointer shadow-lg hover:border-red-500/50"
            >
              <Download className="w-4 h-4 text-red-400" />
              <span>{isAr ? 'تحميل البروفايل PDF' : 'Download Profile PDF'}</span>
            </button>

            <button
              onClick={onOpenSheets}
              className="flex items-center gap-2 px-4 py-3.5 rounded-xl bg-emerald-950/60 hover:bg-emerald-900/60 border border-emerald-600/40 text-emerald-300 font-semibold text-sm transition-all cursor-pointer shadow-md"
            >
              <FileSpreadsheet className="w-4 h-4 text-emerald-400" />
              <span>{isAr ? 'ربط جداول Google Sheets' : 'Google Sheets Sync'}</span>
            </button>
          </div>
        </div>

        {/* Official Quick Contact Strip */}
        <div className="mt-12 bg-white/5 backdrop-blur-md border border-slate-700/60 rounded-2xl p-6 shadow-2xl">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 divide-y sm:divide-y-0 lg:divide-x lg:divide-x-reverse divide-slate-800">
            
            {/* Phone 1 */}
            <div className="flex items-center gap-4 pt-4 sm:pt-0">
              <div className="w-12 h-12 rounded-xl bg-red-600/20 border border-red-500/30 flex items-center justify-center shrink-0">
                <PhoneCall className="w-6 h-6 text-red-400" />
              </div>
              <div>
                <span className="text-xs text-slate-400 block font-medium">
                  {isAr ? 'هاتف التواصل والمبيعات' : 'Sales & Inquiries Phone'}
                </span>
                <a 
                  href={`tel:${COMPANY_CONTACT.phone1}`} 
                  className="text-base sm:text-lg font-bold text-white hover:text-red-400 transition font-mono"
                  dir="ltr"
                >
                  {COMPANY_CONTACT.phone1Formatted}
                </a>
              </div>
            </div>

            {/* Phone 2 */}
            <div className="flex items-center gap-4 pt-4 sm:pt-0">
              <div className="w-12 h-12 rounded-xl bg-red-600/20 border border-red-500/30 flex items-center justify-center shrink-0">
                <Clock className="w-6 h-6 text-red-400" />
              </div>
              <div>
                <span className="text-xs text-slate-400 block font-medium">
                  {isAr ? 'طوارئ الصيانة والعمليات' : 'Maintenance & Operations'}
                </span>
                <a 
                  href={`tel:${COMPANY_CONTACT.phone2}`} 
                  className="text-base sm:text-lg font-bold text-white hover:text-red-400 transition font-mono"
                  dir="ltr"
                >
                  {COMPANY_CONTACT.phone2Formatted}
                </a>
              </div>
            </div>

            {/* Address */}
            <div className="flex items-center gap-4 pt-4 sm:pt-0">
              <div className="w-12 h-12 rounded-xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center shrink-0">
                <MapPin className="w-6 h-6 text-blue-400" />
              </div>
              <div>
                <span className="text-xs text-slate-400 block font-medium">
                  {isAr ? 'المقر والعنوان' : 'Office Location'}
                </span>
                <span className="text-sm sm:text-base font-semibold text-white block">
                  {isAr ? COMPANY_CONTACT.addressAr : COMPANY_CONTACT.addressEn}
                </span>
              </div>
            </div>

            {/* Official Website */}
            <div className="flex items-center gap-4 pt-4 sm:pt-0">
              <div className="w-12 h-12 rounded-xl bg-amber-600/20 border border-amber-500/30 flex items-center justify-center shrink-0">
                <Globe className="w-6 h-6 text-amber-400" />
              </div>
              <div>
                <span className="text-xs text-slate-400 block font-medium">
                  {isAr ? 'الموقع الإلكتروني الرسمي' : 'Official Web Portal'}
                </span>
                <a 
                  href={COMPANY_CONTACT.websiteUrl} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-base font-bold text-amber-300 hover:underline flex items-center gap-1 font-mono"
                >
                  {COMPANY_CONTACT.website}
                </a>
              </div>
            </div>

          </div>
        </div>

        {/* Feature Highlights Grid */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-5 hover:border-red-500/40 transition">
            <div className="flex items-center gap-3 mb-2">
              <ShieldCheck className="w-5 h-5 text-red-400" />
              <h3 className="font-bold text-white text-base">
                {isAr ? 'معايير كود البناء والدفاع المدني' : 'Civil Defense & SBC Compliant'}
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-slate-300">
              {isAr 
                ? 'التزام مطلق بالاشتراطات الفنية لكود البناء السعودي SBC 801 ومنصة سلامة لضمان سرعة إصدار وتجديد التراخيص.' 
                : 'Strict alignment with Saudi Building Code SBC 801 and Salamah portal for rapid inspection approval.'}
            </p>
          </div>

          <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-5 hover:border-red-500/40 transition">
            <div className="flex items-center gap-3 mb-2">
              <Flame className="w-5 h-5 text-amber-400" />
              <h3 className="font-bold text-white text-base">
                {isAr ? 'تعبئة وفحص هيدروستاتيكي معتمد' : 'Certified Hydrotest & Refilling'}
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-slate-300">
              {isAr 
                ? 'ورشة صيانة وتعبئة متقدمة لجميع أنواع طفايات الحريق مع فحص ضغط الأسطوانات وتحديث بطاقات التفتيش.' 
                : 'Advanced workshop for refilling and testing all extinguisher classes with calibrated pressure gauges.'}
            </p>
          </div>

          <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-5 hover:border-red-500/40 transition">
            <div className="flex items-center gap-3 mb-2">
              <Building2 className="w-5 h-5 text-blue-400" />
              <h3 className="font-bold text-white text-base">
                {isAr ? 'عقود صيانة دورية وجاهزية 24/7' : 'Annual Contracts & 24/7 Crew'}
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-slate-300">
              {isAr 
                ? 'عقود صيانة سنوية موثقة تغطي المستودعات، الأبراج، المجمعات التجارية والمطابخ بفريق تدخل سريع.' 
                : 'Periodic inspection contracts covering commercial towers, warehouses and restaurants with emergency response.'}
            </p>
          </div>
        </div>

      </div>
    </section>
  );
};
