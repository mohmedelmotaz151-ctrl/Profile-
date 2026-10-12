import React from 'react';
import { 
  ShieldCheck, 
  Flame, 
  PhoneCall, 
  MapPin, 
  Globe, 
  Mail, 
  Clock, 
  Award, 
  Printer, 
  X,
  FileCheck2,
  Building2,
  Check
} from 'lucide-react';
import { Language } from '../types';
import { COMPANY_CONTACT, SERVICES_LIST, METHODOLOGY_STEPS, INITIAL_CREDENTIALS } from '../data/companyData';

interface PrintProfileViewProps {
  lang: Language;
  onClose: () => void;
}

export const PrintProfileView: React.FC<PrintProfileViewProps> = ({ lang, onClose }) => {
  const isAr = lang === 'ar';

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="bg-slate-100 min-h-screen py-8 text-slate-900">
      
      {/* Top Floating Control Bar (Hidden on print) */}
      <div className="no-print sticky top-4 z-50 max-w-4xl mx-auto px-4 mb-6">
        <div className="bg-[#0B1E36] text-white p-4 rounded-2xl shadow-2xl flex items-center justify-between border border-slate-700">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-red-600 flex items-center justify-center text-white">
              <Printer className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-sm">
                {isAr ? 'عرض البروفايل الرسمي للطباعة / التصدير PDF' : 'Formal Profile Print / PDF Export'}
              </h3>
              <p className="text-xs text-slate-300">
                {isAr ? 'ملف منسق وجاهز للحفظ كـ PDF أو الطباعة المباشرة' : 'Pre-formatted corporate dossier ready for print/PDF'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs shadow-md transition flex items-center gap-2 cursor-pointer"
            >
              <Printer className="w-4 h-4" />
              <span>{isAr ? 'طباعة / حفظ PDF الآن' : 'Print / Save as PDF'}</span>
            </button>
            <button
              onClick={onClose}
              className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 transition cursor-pointer"
              title={isAr ? 'إغلاق والعودة للموقع' : 'Close and return'}
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Formal Document Container */}
      <div className="max-w-[850px] mx-auto bg-white shadow-2xl border border-slate-300 p-10 sm:p-14 space-y-14">
        
        {/* ================= PAGE 1: COVER PAGE ================= */}
        <div className="min-h-[1050px] flex flex-col justify-between border-8 border-double border-[#0B1E36] p-10 relative print-break-after">
          
          {/* Top Crest */}
          <div className="flex justify-between items-start border-b-2 border-red-600 pb-6">
            <div>
              <span className="text-xs font-bold text-slate-500 uppercase tracking-widest block mb-1">
                {isAr ? 'المملكة العربية السعودية' : 'Kingdom of Saudi Arabia'}
              </span>
              <h2 className="text-xl font-black text-[#0B1E36]">
                {isAr ? 'شركة أوريكيت للمقاولات العامة' : 'Orkeit General Contracting Co.'}
              </h2>
              <p className="text-xs text-red-600 font-bold">
                {isAr ? 'قطاع أنظمة السلامة ومكافحة الحريق' : 'Fire Protection & Safety Division'}
              </p>
            </div>

            <div className="w-16 h-16 rounded-2xl bg-[#0B1E36] border-2 border-red-600 flex items-center justify-center text-white">
              <ShieldCheck className="w-10 h-10 text-red-500" />
            </div>
          </div>

          {/* Center Title */}
          <div className="text-center my-auto py-12 space-y-6">
            <div className="inline-block px-4 py-1.5 rounded-full bg-red-50 border border-red-200 text-red-700 text-xs font-bold uppercase tracking-widest">
              {isAr ? 'الملف التعريفي الفني الرسمي' : 'Official Corporate & Technical Dossier'}
            </div>

            <h1 className="text-4xl sm:text-5xl font-black text-[#0B1E36] tracking-tight leading-tight">
              {isAr ? 'شركة أوريكيت للمقاولات العامة' : 'Orkeit General Contracting Co.'}
            </h1>

            <div className="w-32 h-1.5 bg-red-600 mx-auto rounded-full" />

            <h3 className="text-xl sm:text-2xl font-bold text-slate-700 max-w-xl mx-auto">
              {isAr 
                ? 'حلول هندسية متكاملة في أنظمة السلامة والوقاية، صيانة وتعبئة طفايات الحريق، شبكات الإنذار ومكافحة الحريق'
                : 'Turnkey Fire Protection Systems, Extinguisher Refilling, Early Detection & Hydraulic Fire Suppression Networks'}
            </h3>

            <p className="text-sm text-slate-500 max-w-md mx-auto pt-4 font-medium">
              {isAr 
                ? 'مُعَد طبقاً لكود البناء السعودي SBC 801 واشتراطات المديرية العامة للدفاع المدني'
                : 'Engineered in strict accordance with Saudi Building Code SBC 801 & Civil Defense Standards'}
            </p>
          </div>

          {/* Bottom Coordinates & Slots */}
          <div className="border-t-2 border-[#0B1E36] pt-6 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
            <div>
              <span className="text-slate-400 font-semibold block">{isAr ? 'الهاتف الأول:' : 'Phone 1:'}</span>
              <span className="font-bold text-[#0B1E36] font-mono" dir="ltr">{COMPANY_CONTACT.phone1Formatted}</span>
            </div>
            <div>
              <span className="text-slate-400 font-semibold block">{isAr ? 'الهاتف الثاني:' : 'Phone 2:'}</span>
              <span className="font-bold text-[#0B1E36] font-mono" dir="ltr">{COMPANY_CONTACT.phone2Formatted}</span>
            </div>
            <div>
              <span className="text-slate-400 font-semibold block">{isAr ? 'المقر والعنوان:' : 'Headquarters:'}</span>
              <span className="font-bold text-[#0B1E36]">{isAr ? 'حي الضيافة' : 'Al-Diyafa'}</span>
            </div>
            <div>
              <span className="text-slate-400 font-semibold block">{isAr ? 'الموقع الإلكتروني:' : 'Website:'}</span>
              <span className="font-bold text-red-600 font-mono">{COMPANY_CONTACT.website}</span>
            </div>
          </div>
        </div>

        {/* ================= PAGE 2: EXECUTIVE SUMMARY & CREDENTIALS ================= */}
        <div className="space-y-8 print-break-after">
          
          <div className="border-b-2 border-[#0B1E36] pb-3 flex justify-between items-center">
            <h2 className="text-2xl font-black text-[#0B1E36]">
              {isAr ? '1. نبذة عن الشركة والبيانات النظامية' : '1. Executive Profile & Regulatory Credentials'}
            </h2>
            <span className="text-xs font-mono font-bold text-red-600">ORKEIT PROFILE</span>
          </div>

          <div className="space-y-4 text-justify text-sm text-slate-700 leading-relaxed">
            <p>
              {isAr 
                ? 'تعتبر شركة أوريكيت للمقاولات العامة (Orkeit) إحدى الشركات الوطنية الرائدة المتخصصة في تقديم منظومة هندسية متكاملة لحلول السلامة والوقاية من الحريق. نحرص على تقديم خدماتنا بأعلى معايير الدقة والاحترافية لحماية الأرواح والممتلكات الخاصة والعامة، ودعم مسيرة التنمية والنهضة العمرانية في المملكة العربية السعودية.'
                : 'Orkeit General Contracting Co. is a specialized Saudi contractor dedicated to life safety and fire protection engineering. We deliver turn-key solutions protecting lives, infrastructure and commercial assets across the Kingdom of Saudi Arabia.'}
            </p>
            <p>
              {isAr 
                ? 'يشمل نطاق عملنا الهندسي: دراسة المخططات واعتمادها، توريد وتركيب وفحص شبكات الإنذار المبكر وشبكات الرشاشات المائية ومضخات الحريق، أنظمة الإطفاء بالغازات النظيفة لغرف الخوادم، أنظمة إطفاء هود المطابخ التجارية، وورشة متطورة لصيانة وإعادة تعبئة واختبار طفايات الحريق، بالإضافة إلى عقود الصيانة الدورية المعتمدة لمنصة سلامة.'
                : 'Our turnkey scope encompasses engineering design, supply, certified installation, testing & commissioning of addressable fire alarm systems, automatic sprinkler networks, UL/FM fire pumps, clean agent suppression, restaurant kitchen hood systems, certified fire extinguisher refilling, and annual maintenance agreements.'}
            </p>
          </div>

          {/* Credentials Slots Hub */}
          <div>
            <h3 className="text-lg font-bold text-[#0B1E36] mb-4 flex items-center gap-2">
              <Award className="w-5 h-5 text-red-600" />
              <span>{isAr ? 'خانات السجل التجاري والتراخيص والاعتمادات النظامية' : 'Commercial Registration & Accreditations (Under Verification)'}</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {INITIAL_CREDENTIALS.map((cred) => (
                <div key={cred.id} className="border-2 border-slate-200 rounded-xl p-4 bg-slate-50">
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-bold text-xs text-[#0B1E36]">
                      {isAr ? cred.titleAr : cred.titleEn}
                    </span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-100 text-amber-800 border border-amber-300">
                      {isAr ? cred.statusAr : cred.statusEn}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500 mb-2">
                    {isAr ? cred.authorityAr : cred.authorityEn}
                  </p>
                  <div className="bg-white border border-dashed border-slate-300 p-2 text-center rounded font-mono text-xs font-bold text-slate-700">
                    {isAr ? cred.numberPlaceholderAr : cred.numberPlaceholderEn}
                  </div>
                </div>
              ))}
            </div>
            <p className="text-[11px] text-slate-500 mt-2 italic">
              {isAr 
                ? '* تم تخصيص هذه الخانات لتدوين أرقام السجلات والتراخيص الرسمية وتعتبر قيد التحديث والتحقق النظامي.' 
                : '* These slots are officially dedicated for registration audit numbers and are classified under verification.'}
            </p>
          </div>

        </div>

        {/* ================= PAGE 3: SPECIALIZED SERVICES ================= */}
        <div className="space-y-8 print-break-after">
          
          <div className="border-b-2 border-[#0B1E36] pb-3 flex justify-between items-center">
            <h2 className="text-2xl font-black text-[#0B1E36]">
              {isAr ? '2. خدمات السلامة والوقاية ومكافحة الحريق' : '2. Fire Protection & Safety Services Scope'}
            </h2>
            <span className="text-xs font-mono font-bold text-red-600">ORKEIT PROFILE</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {SERVICES_LIST.map((srv) => (
              <div key={srv.id} className="border border-slate-300 rounded-xl p-5 bg-white space-y-3">
                <div className="flex items-center justify-between border-b pb-2">
                  <h4 className="font-bold text-sm text-[#0B1E36]">
                    {isAr ? srv.titleAr : srv.titleEn}
                  </h4>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-red-100 text-red-700">
                    {isAr ? srv.tagAr : srv.tagEn}
                  </span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {isAr ? srv.shortDescAr : srv.shortDescEn}
                </p>
                <div className="space-y-1">
                  {(isAr ? srv.featuresAr : srv.featuresEn).slice(0, 3).map((f, i) => (
                    <div key={i} className="flex items-center gap-1.5 text-[11px] text-slate-700">
                      <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>{f}</span>
                    </div>
                  ))}
                </div>
                <div className="pt-2 text-[10px] text-slate-500 font-mono">
                  {isAr ? 'المعايير:' : 'Codes:'} {(isAr ? srv.standardsAr : srv.standardsEn).join(' | ')}
                </div>
              </div>
            ))}
          </div>

        </div>

        {/* ================= PAGE 4: METHODOLOGY & CONTACT ================= */}
        <div className="space-y-8">
          
          <div className="border-b-2 border-[#0B1E36] pb-3 flex justify-between items-center">
            <h2 className="text-2xl font-black text-[#0B1E36]">
              {isAr ? '3. منهجية العمل والتواصل الرسمي' : '3. Methodology & Official Coordinates'}
            </h2>
            <span className="text-xs font-mono font-bold text-red-600">ORKEIT PROFILE</span>
          </div>

          {/* Workflow Steps */}
          <div className="space-y-3">
            <h3 className="text-base font-bold text-[#0B1E36]">
              {isAr ? 'مراحل تنفيذ وضمان جودة الأعمال الهندسية والصيانة' : 'Operational Lifecycle & Maintenance Quality Assurance'}
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {METHODOLOGY_STEPS.map((step) => (
                <div key={step.stepNumber} className="border border-slate-200 rounded-lg p-3 bg-slate-50 text-xs">
                  <div className="flex items-center gap-2 font-bold text-[#0B1E36] mb-1">
                    <span className="w-6 h-6 rounded bg-[#0B1E36] text-white flex items-center justify-center font-mono text-[10px]">
                      {step.stepNumber}
                    </span>
                    <span>{isAr ? step.titleAr : step.titleEn}</span>
                  </div>
                  <p className="text-slate-600 leading-normal text-[11px]">
                    {isAr ? step.descriptionAr : step.descriptionEn}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Formal Contact Endorsement Box */}
          <div className="border-2 border-[#0B1E36] bg-[#0B1E36] text-white p-6 rounded-2xl space-y-4">
            <div className="flex justify-between items-center border-b border-slate-700 pb-3">
              <div>
                <h4 className="text-lg font-bold">
                  {isAr ? 'شركة أوريكيت للمقاولات العامة' : 'Orkeit General Contracting Co.'}
                </h4>
                <p className="text-xs text-red-400 font-semibold">
                  {isAr ? 'حي الضيافة - المملكة العربية السعودية' : 'Al-Diyafa District - Kingdom of Saudi Arabia'}
                </p>
              </div>
              <div className="text-left font-mono text-xs">
                <p className="text-amber-400 font-bold">{COMPANY_CONTACT.website}</p>
                <p className="text-slate-300">24/7 Response</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <span className="text-slate-400 block">{isAr ? 'هاتف التواصل / المبيعات:' : 'Primary Inquiries:'}</span>
                <span className="text-sm font-bold font-mono text-white" dir="ltr">{COMPANY_CONTACT.phone1Formatted}</span>
              </div>
              <div>
                <span className="text-slate-400 block">{isAr ? 'طوارئ الصيانة والعمليات:' : 'Emergency Hotline:'}</span>
                <span className="text-sm font-bold font-mono text-white" dir="ltr">{COMPANY_CONTACT.phone2Formatted}</span>
              </div>
            </div>

            <div className="pt-2 text-[11px] text-slate-300 border-t border-slate-700 flex justify-between">
              <span>{isAr ? 'البريد: info@oriket.site' : 'Email: info@oriket.site'}</span>
              <span>{isAr ? 'الموقع: https://oriket.site' : 'Web: https://oriket.site'}</span>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
