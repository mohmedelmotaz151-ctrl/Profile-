import React, { useState, useRef } from 'react';
import { 
  ShieldCheck, 
  PhoneCall, 
  MapPin, 
  Globe, 
  Award, 
  Printer, 
  X,
  FileCheck2,
  Building2,
  Check,
  Download,
  Loader2,
  CheckCircle,
  FileText
} from 'lucide-react';
import { Language } from '../types';
import { COMPANY_CONTACT, SERVICES_LIST, METHODOLOGY_STEPS, INITIAL_CREDENTIALS } from '../data/companyData';
import { generateProfilePdf } from '../services/pdfGenerator';

interface PrintProfileViewProps {
  lang: Language;
  onClose: () => void;
}

export const PrintProfileView: React.FC<PrintProfileViewProps> = ({ lang, onClose }) => {
  const isAr = lang === 'ar';
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);
  const [progressStatus, setProgressStatus] = useState<string | null>(null);
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  const page1Ref = useRef<HTMLDivElement>(null);
  const page2Ref = useRef<HTMLDivElement>(null);
  const page3Ref = useRef<HTMLDivElement>(null);
  const page4Ref = useRef<HTMLDivElement>(null);

  const handleDownloadPdf = async () => {
    const pages = [page1Ref.current, page2Ref.current, page3Ref.current, page4Ref.current].filter(
      (el): el is HTMLDivElement => el !== null
    );

    if (pages.length === 0) return;

    setIsGeneratingPdf(true);
    setDownloadSuccess(false);
    setProgressStatus(isAr ? 'بدء إعداد ملف الـ PDF...' : 'Initializing PDF generation...');

    try {
      await generateProfilePdf(pages, {
        fileName: isAr ? 'بروفايل_شركة_أوريكيت_للمقاولات_العامة.pdf' : 'Orkeit_General_Contracting_Profile.pdf',
        onProgress: (status) => setProgressStatus(status),
      });
      setDownloadSuccess(true);
      setTimeout(() => setDownloadSuccess(false), 5000);
    } catch (error) {
      console.error('PDF Generation Error:', error);
      alert(isAr ? 'حدث خطأ أثناء تنزيل ملف PDF. يمكنك استخدام زر الطباعة والحفظ كـ PDF.' : 'Error generating PDF. You can use the Print button to Save as PDF.');
    } finally {
      setIsGeneratingPdf(false);
      setProgressStatus(null);
    }
  };

  const handleNativePrint = () => {
    window.print();
  };

  return (
    <div className="bg-slate-200 min-h-screen py-8 text-slate-900">
      
      {/* Top Floating Action Bar (Hidden during native print) */}
      <div className="no-print sticky top-4 z-50 max-w-4xl mx-auto px-4 mb-8">
        <div className="bg-[#0B1E36] text-white p-4 sm:p-5 rounded-2xl shadow-2xl flex flex-wrap items-center justify-between gap-4 border border-slate-700">
          
          <div className="flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-red-600 to-red-700 flex items-center justify-center text-white shadow-md">
              <FileText className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-base text-white">
                  {isAr ? 'تحميل البروفايل الرسمي بصيغة PDF' : 'Download Official PDF Profile'}
                </h3>
                <span className="text-[11px] px-2 py-0.5 rounded bg-red-600/30 border border-red-500/40 text-red-300 font-bold uppercase">
                  A4 Print Ready
                </span>
              </div>
              <p className="text-xs text-slate-300">
                {isAr ? 'ملف متكامل عالي الدقة (4 صفحات A4) معتمد للجهات الحكومية والخاصة' : 'High-resolution 4-page formal corporate dossier'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            {/* Direct PDF Download Action Button */}
            <button
              onClick={handleDownloadPdf}
              disabled={isGeneratingPdf}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white font-bold text-xs sm:text-sm shadow-lg shadow-red-950/40 transition flex items-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {isGeneratingPdf ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>{progressStatus || (isAr ? 'جاري التجهيز...' : 'Generating...')}</span>
                </>
              ) : (
                <>
                  <Download className="w-4 h-4" />
                  <span>{isAr ? 'تحميل ملف PDF مباشر' : 'Download PDF Now'}</span>
                </>
              )}
            </button>

            {/* Native Browser Print Button */}
            <button
              onClick={handleNativePrint}
              disabled={isGeneratingPdf}
              className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-600 text-slate-200 font-semibold text-xs sm:text-sm transition flex items-center gap-2 cursor-pointer"
              title={isAr ? 'طباعة عبر نافذة المتصفح' : 'Print via browser'}
            >
              <Printer className="w-4 h-4 text-slate-300" />
              <span className="hidden sm:inline">{isAr ? 'طباعة' : 'Print'}</span>
            </button>

            {/* Close Button */}
            <button
              onClick={onClose}
              className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition cursor-pointer"
              title={isAr ? 'الرجوع للموقع' : 'Close and return'}
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Download Success Banner */}
        {downloadSuccess && (
          <div className="mt-3 bg-emerald-700 text-white p-3 rounded-xl shadow-lg flex items-center gap-2 text-xs sm:text-sm animate-in fade-in">
            <CheckCircle className="w-5 h-5 text-emerald-300 shrink-0" />
            <span>
              {isAr 
                ? 'تم تجهيز وتنزيل بروفايل شركة أوريكيت للمقاولات العامة بنجاح!' 
                : 'Orkeit General Contracting Profile PDF downloaded successfully!'}
            </span>
          </div>
        )}
      </div>

      {/* Pages Container: 4 Distinct A4 Standard Pages (210mm x 297mm) */}
      <div className="max-w-[794px] mx-auto space-y-10 print:space-y-0">
        
        {/* ================= PAGE 1: COVER PAGE ================= */}
        <div 
          ref={page1Ref}
          className="w-full bg-white shadow-2xl p-12 sm:p-14 flex flex-col justify-between border-8 border-double border-[#0B1E36] relative print-break-after print:shadow-none min-h-[1123px]"
          style={{ minHeight: '1120px' }}
        >
          {/* Top Header Crest */}
          <div className="flex justify-between items-start border-b-2 border-red-600 pb-6">
            <div>
              <span className="text-xs font-bold text-slate-500 uppercase block mb-1" style={{ letterSpacing: '0px' }}>
                {isAr ? 'المملكة العربية السعودية' : 'Kingdom of Saudi Arabia'}
              </span>
              <h2 className="text-2xl font-black text-[#0B1E36]" style={{ letterSpacing: '0px', lineHeight: 1.4 }}>
                {isAr ? 'شركة أوريكيت للمقاولات العامة' : 'Orkeit General Contracting Co.'}
              </h2>
              <p className="text-xs text-red-600 font-bold mt-1" style={{ letterSpacing: '0px' }}>
                {isAr ? 'قطاع أنظمة السلامة ومكافحة الحريق' : 'Fire Protection & Safety Systems Division'}
              </p>
            </div>

            <div className="w-16 h-16 rounded-2xl bg-[#0B1E36] border-2 border-red-600 flex items-center justify-center text-white shadow-md">
              <ShieldCheck className="w-10 h-10 text-red-500" />
            </div>
          </div>

          {/* Center Title & Cover Emblem */}
          <div className="text-center my-auto py-12 space-y-6">
            <div className="inline-block px-5 py-2 rounded-full bg-red-50 border border-red-200 text-red-700 text-xs font-bold" style={{ letterSpacing: '0px' }}>
              {isAr ? 'الملف التعريفي الفني الرسمي | ملف المنشأة' : 'Official Corporate & Technical Dossier'}
            </div>

            <h1 
              className="text-4xl sm:text-5xl font-black text-[#0B1E36]"
              style={{ letterSpacing: '0px', lineHeight: 1.35 }}
            >
              {isAr ? 'شركة أوريكيت للمقاولات العامة' : 'Orkeit General Contracting Co.'}
            </h1>

            <div className="w-32 h-1.5 bg-red-600 mx-auto rounded-full" />

            <h3 
              className="text-xl sm:text-2xl font-bold text-slate-700 max-w-xl mx-auto"
              style={{ letterSpacing: '0px', lineHeight: 1.6 }}
            >
              {isAr 
                ? 'أنظمة السلامة والوقاية، صيانة وتعبئة طفايات الحريق، شبكات الإنذار المبكر ومكافحة الحريق'
                : 'Turnkey Fire Protection Systems, Extinguisher Refilling, Early Detection & Hydraulic Fire Suppression Networks'}
            </h3>

            <div className="pt-6 flex justify-center gap-3">
              <span className="px-3 py-1.5 bg-slate-100 rounded text-xs font-bold text-slate-700 border border-slate-200" style={{ letterSpacing: '0px' }}>
                {isAr ? 'كود البناء السعودي SBC 801' : 'Saudi Building Code SBC 801'}
              </span>
              <span className="px-3 py-1.5 bg-red-50 rounded text-xs font-bold text-red-700 border border-red-200" style={{ letterSpacing: '0px' }}>
                {isAr ? 'اشتراطات الدفاع المدني' : 'Civil Defense Compliant'}
              </span>
              <span className="px-3 py-1.5 bg-slate-100 rounded text-xs font-bold text-slate-700 border border-slate-200" style={{ letterSpacing: '0px' }}>
                {isAr ? 'طوارئ 24/7' : '24/7 Readiness'}
              </span>
            </div>
          </div>

          {/* Bottom Official Coordinates */}
          <div className="border-t-2 border-[#0B1E36] pt-6 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
            <div>
              <span className="text-slate-400 font-semibold block">{isAr ? 'الهاتف الأول:' : 'Phone 1:'}</span>
              <span className="font-bold text-[#0B1E36] font-mono" dir="ltr">{COMPANY_CONTACT.phone1Formatted}</span>
            </div>
            <div>
              <span className="text-slate-400 font-semibold block">{isAr ? 'طوارئ الصيانة:' : 'Emergency Hotline:'}</span>
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

        {/* ================= PAGE 2: ABOUT & CREDENTIALS ================= */}
        <div 
          ref={page2Ref}
          className="w-full bg-white shadow-2xl p-12 sm:p-14 flex flex-col justify-between border border-slate-300 print-break-after print:shadow-none min-h-[1123px]"
          style={{ minHeight: '1120px' }}
        >
          <div className="space-y-7">
            {/* Page Header */}
            <div className="border-b-2 border-[#0B1E36] pb-3 flex justify-between items-center">
              <h2 className="text-2xl font-black text-[#0B1E36]" style={{ letterSpacing: '0px', lineHeight: 1.4 }}>
                {isAr ? '1. نبذة عن الشركة والبيانات النظامية' : '1. Executive Profile & Regulatory Credentials'}
              </h2>
              <span className="text-xs font-mono font-bold text-red-600">PAGE 02</span>
            </div>

            {/* Narrative Summary */}
            <div className="space-y-4 text-justify text-xs sm:text-sm text-slate-700 leading-relaxed" style={{ letterSpacing: '0px' }}>
              <p>
                {isAr 
                  ? 'تعتبر شركة أوريكيت للمقاولات العامة (Orkeit) إحدى الشركات الوطنية الرائدة والمتخصصة في تقديم منظومة هندسية متكاملة لحلول السلامة والوقاية من الحريق. نحرص على تقديم خدماتنا بأعلى معايير الدقة والاحترافية لحماية الأرواح والممتلكات الخاصة والعامة، تماشياً مع أهداف رؤية المملكة 2030.'
                  : 'Orkeit General Contracting Co. is a premier Saudi contractor delivering specialized turnkey solutions in fire engineering, building protection, and life safety in full adherence to the highest international quality benchmarks.'}
              </p>
              <p>
                {isAr 
                  ? 'تغطي خبراتنا دراسة المخططات وإجراء الحسابات الهيدروليكية، توريد وتركيب وفحص شبكات الإنذار المبكر وشبكات الرشاشات المائية، مضخات الحريق المعتمدة، أنظمة الإطفاء بالغازات النظيفة لغرف الخوادم، أنظمة إطفاء هود المطابخ التجارية، وورشة متطورة لصيانة وإعادة تعبئة واختبار طفايات الحريق، بالإضافة إلى عقود الصيانة الدورية المعتمدة لمنصة سلامة ورخص بلدي.'
                  : 'Our certified engineering capabilities encompass shop drawing compliance, hydraulic modeling, addressable alarm integration, automatic sprinkler skids, UL/FM pumps, clean agent suppression for data centers, commercial kitchen hoods, extinguisher refilling workshops, and annual maintenance agreements.'}
              </p>
            </div>

            {/* Credentials Slots Hub */}
            <div className="pt-2">
              <h3 className="text-base font-bold text-[#0B1E36] mb-4 flex items-center gap-2" style={{ letterSpacing: '0px', lineHeight: 1.4 }}>
                <Award className="w-5 h-5 text-red-600" />
                <span>{isAr ? 'خانات السجل التجاري والتراخيص والاعتمادات (قيد التحقق والتوثيق)' : 'Commercial Registration & Accreditations (Under Verification)'}</span>
              </h3>

              <div className="grid grid-cols-2 gap-4">
                {INITIAL_CREDENTIALS.map((cred) => (
                  <div key={cred.id} className="border-2 border-slate-200 rounded-xl p-3.5 bg-slate-50">
                    <div className="flex justify-between items-center mb-1">
                      <span className="font-bold text-xs text-[#0B1E36]">
                        {isAr ? cred.titleAr : cred.titleEn}
                      </span>
                      <span className="text-[9px] font-bold px-2 py-0.5 rounded bg-amber-100 text-amber-800 border border-amber-300">
                        {isAr ? cred.statusAr : cred.statusEn}
                      </span>
                    </div>
                    <p className="text-[10px] text-slate-500 mb-2">
                      {isAr ? cred.authorityAr : cred.authorityEn}
                    </p>
                    <div className="bg-white border border-dashed border-slate-300 p-2 text-center rounded font-mono text-xs font-bold text-slate-700">
                      {isAr ? cred.numberPlaceholderAr : cred.numberPlaceholderEn}
                    </div>
                  </div>
                ))}
              </div>
              <p className="text-[10px] text-slate-500 mt-2 italic">
                {isAr 
                  ? '* تم تخصيص هذه الخانات لتدوين أرقام السجلات والتراخيص الرسمية وتعتبر قيد التحديث والتحقق الفني لحين اكتمال التدقيق النهائي.' 
                  : '* These slots are officially dedicated for registration audit numbers and are classified under verification.'}
              </p>
            </div>
          </div>

          <div className="border-t border-slate-200 pt-3 text-[10px] text-slate-400 flex justify-between font-mono">
            <span>شركة أوريكيت للمقاولات العامة | حي الضيافة</span>
            <span>0555334577 | 0500052629 | oriket.site</span>
          </div>
        </div>

        {/* ================= PAGE 3: SERVICES CATALOG ================= */}
        <div 
          ref={page3Ref}
          className="w-full bg-white shadow-2xl p-12 sm:p-14 flex flex-col justify-between border border-slate-300 print-break-after print:shadow-none min-h-[1123px]"
          style={{ minHeight: '1120px' }}
        >
          <div className="space-y-6">
            <div className="border-b-2 border-[#0B1E36] pb-3 flex justify-between items-center">
              <h2 className="text-2xl font-black text-[#0B1E36]" style={{ letterSpacing: '0px', lineHeight: 1.4 }}>
                {isAr ? '2. خدمات السلامة والوقاية ومكافحة الحريق' : '2. Fire Protection & Safety Services Scope'}
              </h2>
              <span className="text-xs font-mono font-bold text-red-600">PAGE 03</span>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {SERVICES_LIST.map((srv) => (
                <div key={srv.id} className="border border-slate-300 rounded-xl p-4 bg-white space-y-2.5">
                  <div className="flex items-center justify-between border-b pb-2">
                    <h4 className="font-bold text-xs sm:text-sm text-[#0B1E36]" style={{ letterSpacing: '0px', lineHeight: 1.4 }}>
                      {isAr ? srv.titleAr : srv.titleEn}
                    </h4>
                    <span className="text-[9px] font-bold px-2 py-0.5 rounded bg-red-100 text-red-700" style={{ letterSpacing: '0px' }}>
                      {isAr ? srv.tagAr : srv.tagEn}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-600 leading-normal">
                    {isAr ? srv.shortDescAr : srv.shortDescEn}
                  </p>
                  <div className="space-y-1">
                    {(isAr ? srv.featuresAr : srv.featuresEn).slice(0, 3).map((f, i) => (
                      <div key={i} className="flex items-center gap-1.5 text-[10px] text-slate-700">
                        <Check className="w-3 h-3 text-emerald-600 shrink-0" />
                        <span>{f}</span>
                      </div>
                    ))}
                  </div>
                  <div className="pt-1.5 text-[9px] text-slate-500 font-mono">
                    {isAr ? 'المعايير:' : 'Codes:'} {(isAr ? srv.standardsAr : srv.standardsEn).join(' | ')}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="border-t border-slate-200 pt-3 text-[10px] text-slate-400 flex justify-between font-mono">
            <span>شركة أوريكيت للمقاولات العامة | أنظمة السلامة ومكافحة الحريق</span>
            <span>0555334577 | 0500052629 | oriket.site</span>
          </div>
        </div>

        {/* ================= PAGE 4: METHODOLOGY & OFFICIAL CONTACT ================= */}
        <div 
          ref={page4Ref}
          className="w-full bg-white shadow-2xl p-12 sm:p-14 flex flex-col justify-between border border-slate-300 print:shadow-none min-h-[1123px]"
          style={{ minHeight: '1120px' }}
        >
          <div className="space-y-6">
            <div className="border-b-2 border-[#0B1E36] pb-3 flex justify-between items-center">
              <h2 className="text-2xl font-black text-[#0B1E36]" style={{ letterSpacing: '0px', lineHeight: 1.4 }}>
                {isAr ? '3. منهجية العمل والصيانة والتواصل' : '3. Methodology, Maintenance & Contact'}
              </h2>
              <span className="text-xs font-mono font-bold text-red-600">PAGE 04</span>
            </div>

            {/* Workflow Steps */}
            <div>
              <h3 className="text-sm font-bold text-[#0B1E36] mb-3" style={{ letterSpacing: '0px', lineHeight: 1.4 }}>
                {isAr ? 'مراحل تنفيذ وضمان جودة الأعمال الهندسية والصيانة' : 'Operational Lifecycle & Maintenance Quality Assurance'}
              </h3>

              <div className="grid grid-cols-2 gap-3">
                {METHODOLOGY_STEPS.map((step) => (
                  <div key={step.stepNumber} className="border border-slate-200 rounded-lg p-3 bg-slate-50 text-xs">
                    <div className="flex items-center gap-2 font-bold text-[#0B1E36] mb-1">
                      <span className="w-5 h-5 rounded bg-[#0B1E36] text-white flex items-center justify-center font-mono text-[9px]">
                        {step.stepNumber}
                      </span>
                      <span className="text-xs" style={{ letterSpacing: '0px' }}>{isAr ? step.titleAr : step.titleEn}</span>
                    </div>
                    <p className="text-slate-600 leading-normal text-[10px]" style={{ letterSpacing: '0px' }}>
                      {isAr ? step.descriptionAr : step.descriptionEn}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Official Contact Box */}
            <div className="border-2 border-[#0B1E36] bg-[#0B1E36] text-white p-6 rounded-2xl space-y-4">
              <div className="flex justify-between items-center border-b border-slate-700 pb-3">
                <div>
                  <h4 className="text-lg font-bold" style={{ letterSpacing: '0px', lineHeight: 1.4 }}>
                    {isAr ? 'شركة أوريكيت للمقاولات العامة' : 'Orkeit General Contracting Co.'}
                  </h4>
                  <p className="text-xs text-red-400 font-semibold" style={{ letterSpacing: '0px' }}>
                    {isAr ? 'حي الضيافة - المملكة العربية السعودية' : 'Al-Diyafa District - Kingdom of Saudi Arabia'}
                  </p>
                </div>
                <div className="text-left font-mono text-xs">
                  <p className="text-amber-400 font-bold">{COMPANY_CONTACT.website}</p>
                  <p className="text-slate-300">24/7 Response</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 text-xs">
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

          <div className="border-t border-slate-200 pt-3 text-[10px] text-slate-400 flex justify-between font-mono">
            <span>&copy; {new Date().getFullYear()} شركة أوريكيت للمقاولات العامة - بروفايل رسمي معتمد</span>
            <span>حي الضيافة | 0555334577 | 0500052629</span>
          </div>
        </div>

      </div>

    </div>
  );
};
