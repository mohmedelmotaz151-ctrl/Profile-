import React, { useState } from 'react';
import { 
  PhoneCall, 
  MapPin, 
  Globe, 
  Mail, 
  Clock, 
  MessageSquare, 
  Send, 
  ShieldCheck, 
  CheckCircle,
  Building2,
  ExternalLink
} from 'lucide-react';
import { Language } from '../types';
import { COMPANY_CONTACT } from '../data/companyData';

interface ContactSectionProps {
  lang: Language;
  onOpenQuote: () => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ lang, onOpenQuote }) => {
  const isAr = lang === 'ar';
  const [quickName, setQuickName] = useState('');
  const [quickPhone, setQuickPhone] = useState('');
  const [quickMsg, setQuickMsg] = useState('');
  const [sentSuccess, setSentSuccess] = useState(false);

  const handleSubmitQuick = (e: React.FormEvent) => {
    e.preventDefault();
    if (!quickName || !quickPhone) return;
    setSentSuccess(true);
    setTimeout(() => {
      setSentSuccess(false);
      setQuickName('');
      setQuickPhone('');
      setQuickMsg('');
    }, 4000);
  };

  return (
    <section id="contact" className="py-20 bg-[#071324] text-white relative overflow-hidden">
      {/* Background accents */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-red-600/20 text-red-400 border border-red-500/30 text-xs font-bold uppercase tracking-wider mb-3">
            <PhoneCall className="w-3.5 h-3.5" />
            <span>{isAr ? 'قنوات الاتصال المباشر' : 'Official Contact Channels'}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            {isAr 
              ? 'تواصل مع شركة أوريكيت للمقاولات العامة' 
              : 'Connect with Orkeit General Contracting Co.'}
          </h2>
          <div className="w-20 h-1 bg-red-600 mx-auto mt-4 rounded-full"></div>
          <p className="mt-4 text-base sm:text-lg text-slate-300 leading-relaxed">
            {isAr 
              ? 'نحن هنا لخدمتكم على مدار الساعة. اتصل بنا مباشرة لحجز معاينة فنية ميدانية أو طلب صيانة طارئة وفحص أنظمة السلامة.' 
              : 'Our team is at your disposal 24/7. Call our certified consultants or schedule an emergency maintenance dispatch.'}
          </p>
        </div>

        {/* Contact Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          
          {/* Phone 1 */}
          <div className="bg-[#0B1E36]/80 border border-slate-800 rounded-2xl p-6 hover:border-red-500/50 transition-all duration-300 flex flex-col justify-between group">
            <div>
              <div className="w-12 h-12 rounded-xl bg-red-600/20 border border-red-500/30 flex items-center justify-center text-red-400 mb-4 group-hover:bg-red-600 group-hover:text-white transition">
                <PhoneCall className="w-6 h-6" />
              </div>
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">
                {isAr ? 'الهاتف الرئيسي والمبيعات' : 'Primary Phone & Sales'}
              </span>
              <a 
                href={`tel:${COMPANY_CONTACT.phone1}`} 
                className="text-xl font-black text-white hover:text-red-400 transition font-mono block mb-2"
                dir="ltr"
              >
                {COMPANY_CONTACT.phone1Formatted}
              </a>
              <p className="text-xs text-slate-400">
                {isAr ? 'متاح للمكالمات والاستفسارات الفنية وعروض الأسعار' : 'Direct line for quotations and technical advice'}
              </p>
            </div>
            
            <div className="pt-4 mt-4 border-t border-slate-800 flex items-center gap-2">
              <a
                href={`https://wa.me/966555334577`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2 px-3 rounded-lg bg-emerald-700/30 hover:bg-emerald-600/50 border border-emerald-500/40 text-emerald-300 text-xs font-bold flex items-center justify-center gap-1.5 transition"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>{isAr ? 'محادثة واتساب' : 'WhatsApp Chat'}</span>
              </a>
            </div>
          </div>

          {/* Phone 2 */}
          <div className="bg-[#0B1E36]/80 border border-slate-800 rounded-2xl p-6 hover:border-red-500/50 transition-all duration-300 flex flex-col justify-between group">
            <div>
              <div className="w-12 h-12 rounded-xl bg-red-600/20 border border-red-500/30 flex items-center justify-center text-red-400 mb-4 group-hover:bg-red-600 group-hover:text-white transition">
                <PhoneCall className="w-6 h-6" />
              </div>
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">
                {isAr ? 'طوارئ الصيانة والعمليات' : 'Emergency & Operations'}
              </span>
              <a 
                href={`tel:${COMPANY_CONTACT.phone2}`} 
                className="text-xl font-black text-white hover:text-red-400 transition font-mono block mb-2"
                dir="ltr"
              >
                {COMPANY_CONTACT.phone2Formatted}
              </a>
              <p className="text-xs text-slate-400">
                {isAr ? 'خط طوارئ مخصص لاستقبال بلاغات السلامة على مدار 24 ساعة' : 'Dedicated emergency hotline running 24/7'}
              </p>
            </div>

            <div className="pt-4 mt-4 border-t border-slate-800 flex items-center gap-2">
              <a
                href={`https://wa.me/966500052629`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2 px-3 rounded-lg bg-emerald-700/30 hover:bg-emerald-600/50 border border-emerald-500/40 text-emerald-300 text-xs font-bold flex items-center justify-center gap-1.5 transition"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>{isAr ? 'محادثة واتساب' : 'WhatsApp Chat'}</span>
              </a>
            </div>
          </div>

          {/* Address */}
          <div className="bg-[#0B1E36]/80 border border-slate-800 rounded-2xl p-6 hover:border-blue-500/50 transition-all duration-300 flex flex-col justify-between group">
            <div>
              <div className="w-12 h-12 rounded-xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-blue-400 mb-4 group-hover:bg-blue-600 group-hover:text-white transition">
                <MapPin className="w-6 h-6" />
              </div>
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">
                {isAr ? 'الموقع والعنوان' : 'Office Headquarters'}
              </span>
              <h3 className="text-lg font-black text-white mb-2">
                {isAr ? COMPANY_CONTACT.addressAr : COMPANY_CONTACT.addressEn}
              </h3>
              <p className="text-xs text-slate-400">
                {isAr ? 'المملكة العربية السعودية - حي الضيافة' : 'Saudi Arabia - Al-Diyafa District'}
              </p>
            </div>

            <div className="pt-4 mt-4 border-t border-slate-800">
              <div className="flex items-center gap-1.5 text-xs text-slate-400">
                <Clock className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span>{isAr ? 'السبت - الخميس: 8ص - 6م' : 'Sat - Thu: 8am - 6pm'}</span>
              </div>
            </div>
          </div>

          {/* Website Portal */}
          <div className="bg-[#0B1E36]/80 border border-slate-800 rounded-2xl p-6 hover:border-amber-500/50 transition-all duration-300 flex flex-col justify-between group">
            <div>
              <div className="w-12 h-12 rounded-xl bg-amber-600/20 border border-amber-500/30 flex items-center justify-center text-amber-400 mb-4 group-hover:bg-amber-600 group-hover:text-white transition">
                <Globe className="w-6 h-6" />
              </div>
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">
                {isAr ? 'الموقع الإلكتروني الرسمي' : 'Official Web Portal'}
              </span>
              <a 
                href={COMPANY_CONTACT.websiteUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-xl font-black text-amber-400 hover:underline font-mono block mb-2"
              >
                {COMPANY_CONTACT.website}
              </a>
              <p className="text-xs text-slate-400">
                {isAr ? 'البوابة الرسمية للمعلومات وتحديثات السلامة' : 'Official portal for information & updates'}
              </p>
            </div>

            <div className="pt-4 mt-4 border-t border-slate-800">
              <a
                href={COMPANY_CONTACT.websiteUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2 px-3 rounded-lg bg-amber-600/20 hover:bg-amber-600/30 border border-amber-500/30 text-amber-300 text-xs font-bold flex items-center justify-center gap-1.5 transition"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>{isAr ? 'زيارة الموقع الإلكتروني' : 'Visit Website'}</span>
              </a>
            </div>
          </div>

        </div>

        {/* Lower Banner & Quick Contact Dispatch */}
        <div className="bg-gradient-to-r from-[#0B1E36] via-[#122c4f] to-[#0B1E36] rounded-3xl p-8 sm:p-12 border border-slate-800 shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-7 space-y-4">
              <span className="px-3 py-1 rounded-full bg-red-600/20 border border-red-500/30 text-red-400 text-xs font-bold uppercase tracking-wider">
                {isAr ? 'جاهزية هندسية دائمة' : 'Immediate Readiness'}
              </span>
              <h3 className="text-2xl sm:text-3xl font-black text-white">
                {isAr ? 'هل تحتاج إلى تقرير سلامة أو صيانة طارئة لمنشأتك؟' : 'Need an Immediate Safety Audit or Maintenance Dispatch?'}
              </h3>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                {isAr 
                  ? 'يتواجد مهندسونا في حي الضيافة والمناطق المجاورة لتقديم المسح الميداني السريع، وتحديث وتجديد عقود الصيانة لمنصتي سلامة وبلدي بأعلى درجات الكفاءة.'
                  : 'Our certified engineers are available in Al-Diyafa and surrounding areas to conduct rapid site audits and issue verified maintenance certificates.'}
              </p>
              
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <button
                  onClick={onOpenQuote}
                  className="px-6 py-3 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-sm shadow-lg shadow-red-950/50 transition cursor-pointer flex items-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  <span>{isAr ? 'طلب معاينة ميدانية فورية' : 'Request On-Site Inspection'}</span>
                </button>

                <a
                  href={`tel:${COMPANY_CONTACT.phone1}`}
                  className="px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-sm border border-white/20 transition flex items-center gap-2 font-mono"
                  dir="ltr"
                >
                  <PhoneCall className="w-4 h-4 text-red-400" />
                  <span>{COMPANY_CONTACT.phone1Formatted}</span>
                </a>
              </div>
            </div>

            {/* Quick Inquiry Box */}
            <div className="lg:col-span-5 bg-[#071324] border border-slate-800 rounded-2xl p-6">
              <h4 className="font-bold text-base text-white mb-1">
                {isAr ? 'إرسال استفسار سريع' : 'Quick Callback Request'}
              </h4>
              <p className="text-xs text-slate-400 mb-4">
                {isAr ? 'أدخل اسمك ورقمك وسيعاود مهندسنا الاتصال بك فوراً.' : 'Enter your name & phone and our engineer will call you back.'}
              </p>

              {sentSuccess ? (
                <div className="p-4 bg-emerald-950/60 border border-emerald-600/40 rounded-xl text-center text-xs text-emerald-300 space-y-2">
                  <CheckCircle className="w-8 h-8 text-emerald-400 mx-auto" />
                  <p className="font-bold">{isAr ? 'تم استلام طلبك بنجاح!' : 'Request received!'}</p>
                  <p>{isAr ? 'سيتم التواصل معك خلال دقائق.' : 'We will reach out to you shortly.'}</p>
                </div>
              ) : (
                <form onSubmit={handleSubmitQuick} className="space-y-3">
                  <input
                    type="text"
                    required
                    placeholder={isAr ? 'الاسم الكريم' : 'Your Name'}
                    value={quickName}
                    onChange={(e) => setQuickName(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs placeholder:text-slate-500 focus:outline-none focus:border-red-500"
                  />
                  <input
                    type="tel"
                    required
                    placeholder={isAr ? 'رقم الجوال (05XXXXXXXX)' : 'Phone Number'}
                    value={quickPhone}
                    onChange={(e) => setQuickPhone(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs font-mono placeholder:text-slate-500 focus:outline-none focus:border-red-500"
                    dir="ltr"
                  />
                  <textarea
                    rows={2}
                    placeholder={isAr ? 'الخدمة المطلوبة أو الموقع...' : 'Service or location details...'}
                    value={quickMsg}
                    onChange={(e) => setQuickMsg(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs placeholder:text-slate-500 focus:outline-none focus:border-red-500"
                  />
                  <button
                    type="submit"
                    className="w-full py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs shadow-md transition cursor-pointer"
                  >
                    {isAr ? 'إرسال طلب الاتصال' : 'Submit Callback Request'}
                  </button>
                </form>
              )}
            </div>

          </div>
        </div>

      </div>

      {/* Official Footer */}
      <div className="mt-20 pt-8 border-t border-slate-800 text-xs text-slate-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-red-500" />
            <span className="font-bold text-slate-300">
              {isAr ? 'شركة أوريكيت للمقاولات العامة (Orkeit)' : 'Orkeit General Contracting Co.'}
            </span>
            <span>&copy; {new Date().getFullYear()}</span>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <span className="text-slate-500 font-mono">حي الضيافة | Al-Diyafa</span>
            <span>|</span>
            <span className="text-slate-500 font-mono">0555334577 / 0500052629</span>
            <span>|</span>
            <a href={COMPANY_CONTACT.websiteUrl} className="text-red-400 hover:underline font-mono">
              oriket.site
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
