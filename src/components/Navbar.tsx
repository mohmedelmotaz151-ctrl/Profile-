import React from 'react';
import { 
  PhoneCall, 
  Globe, 
  Printer, 
  FileSpreadsheet, 
  Menu, 
  X, 
  ShieldCheck,
  Send
} from 'lucide-react';
import { Language } from '../types';
import { COMPANY_CONTACT } from '../data/companyData';

interface NavbarProps {
  lang: Language;
  onToggleLang: () => void;
  onOpenQuote: () => void;
  onOpenSheets: () => void;
  onTriggerPrint: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  lang,
  onToggleLang,
  onOpenQuote,
  onOpenSheets,
  onTriggerPrint,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const isAr = lang === 'ar';

  const navLinks = [
    { href: '#about', labelAr: 'عن الشركة', labelEn: 'About Us' },
    { href: '#services', labelAr: 'خدمات السلامة', labelEn: 'Safety Services' },
    { href: '#methodology', labelAr: 'منهجية العمل', labelEn: 'Methodology' },
    { href: '#credentials', labelAr: 'التراخيص والاعتمادات', labelEn: 'Credentials & CR' },
    { href: '#contact', labelAr: 'تواصل معنا', labelEn: 'Contact' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-[#0B1E36]/95 backdrop-blur-md border-b border-slate-800 text-white shadow-xl no-print">
      {/* Top Utility Bar */}
      <div className="bg-[#071324] text-xs border-b border-slate-800/80 px-4 py-1.5">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-4 text-slate-300">
            <span className="flex items-center gap-1.5 text-red-400 font-semibold">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
              </span>
              {isAr ? 'جاهزية طوارئ 24/7' : '24/7 Emergency Dispatch'}
            </span>
            <span className="hidden sm:inline text-slate-400">|</span>
            <a 
              href={`tel:${COMPANY_CONTACT.phone1}`} 
              className="hover:text-white transition flex items-center gap-1 font-mono"
              dir="ltr"
            >
              <PhoneCall className="w-3 h-3 text-red-500" />
              {COMPANY_CONTACT.phone1Formatted}
            </a>
            <a 
              href={`tel:${COMPANY_CONTACT.phone2}`} 
              className="hover:text-white transition hidden md:flex items-center gap-1 font-mono"
              dir="ltr"
            >
              <PhoneCall className="w-3 h-3 text-red-500" />
              {COMPANY_CONTACT.phone2Formatted}
            </a>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-slate-400 text-xs hidden lg:inline">
              {isAr ? COMPANY_CONTACT.addressAr : COMPANY_CONTACT.addressEn}
            </span>
            <a 
              href={COMPANY_CONTACT.websiteUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-red-400 hover:text-red-300 transition font-medium flex items-center gap-1 text-xs"
            >
              <Globe className="w-3 h-3" />
              {COMPANY_CONTACT.website}
            </a>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo & Brand Identity */}
          <a href="#" className="flex items-center gap-3 group">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-red-600 via-red-700 to-[#0B1E36] flex items-center justify-center p-2.5 shadow-lg shadow-red-950/40 border border-red-500/30 group-hover:scale-105 transition duration-300">
              <ShieldCheck className="w-7 h-7 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl sm:text-2xl font-black tracking-tight text-white font-serif">
                  {isAr ? 'أوريكيت' : 'ORKEIT'}
                </span>
                <span className="text-xs px-2 py-0.5 rounded bg-red-600/30 border border-red-500/40 text-red-300 font-bold uppercase tracking-wider">
                  {isAr ? 'مقاولات عامة' : 'Contracting'}
                </span>
              </div>
              <p className="text-xs text-slate-300 tracking-wide">
                {isAr ? 'أنظمة السلامة ومكافحة الحريق' : 'Fire Safety & Protection Systems'}
              </p>
            </div>
          </a>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-6 text-sm font-medium">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-slate-200 hover:text-red-400 transition-colors py-2 relative hover:after:w-full after:w-0 after:h-0.5 after:bg-red-500 after:absolute after:bottom-0 after:left-0 after:transition-all"
              >
                {isAr ? link.labelAr : link.labelEn}
              </a>
            ))}
          </nav>

          {/* Action CTAs */}
          <div className="hidden sm:flex items-center gap-2.5">
            {/* Google Sheets Sync Button */}
            <button
              onClick={onOpenSheets}
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-emerald-950/50 hover:bg-emerald-900/60 border border-emerald-600/40 text-emerald-300 text-xs font-medium transition cursor-pointer shadow-sm"
              title={isAr ? 'إدارة وتزامن جداول Google Sheets' : 'Manage & Sync Google Sheets'}
            >
              <FileSpreadsheet className="w-4 h-4 text-emerald-400" />
              <span className="hidden xl:inline">{isAr ? 'سجل Google Sheets' : 'Google Sheets'}</span>
            </button>

            {/* Download Profile PDF Button */}
            <button
              onClick={onTriggerPrint}
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-red-950/40 hover:bg-red-900/60 border border-red-500/40 text-red-300 text-xs font-semibold transition cursor-pointer shadow-sm"
              title={isAr ? 'تحميل البروفايل كملف PDF رسمي' : 'Download Formal Profile PDF'}
            >
              <Printer className="w-4 h-4 text-red-400" />
              <span>{isAr ? 'تحميل البروفايل PDF' : 'Download Profile PDF'}</span>
            </button>

            {/* Language Switch */}
            <button
              onClick={onToggleLang}
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 text-xs font-semibold transition cursor-pointer"
            >
              <Globe className="w-3.5 h-3.5 text-red-400" />
              <span>{isAr ? 'English' : 'العربية'}</span>
            </button>

            {/* Request Quote Primary Button */}
            <button
              onClick={onOpenQuote}
              className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white text-xs sm:text-sm font-bold shadow-lg shadow-red-900/30 transition-all cursor-pointer transform hover:-translate-y-0.5"
            >
              <Send className="w-4 h-4" />
              <span>{isAr ? 'طلب عرض سعر / فحص' : 'Request Inspection Quote'}</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex sm:hidden items-center gap-2">
            <button
              onClick={onToggleLang}
              className="p-2 rounded-lg bg-slate-800 text-xs font-bold text-red-400"
            >
              {isAr ? 'EN' : 'عربي'}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg bg-slate-800 text-slate-200 hover:text-white"
              aria-label="Toggle Navigation"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="sm:hidden bg-[#071324] border-b border-slate-800 px-4 pt-3 pb-6 space-y-3">
          <nav className="flex flex-col space-y-2">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded-md text-slate-200 hover:bg-slate-800 hover:text-red-400 transition"
              >
                {isAr ? link.labelAr : link.labelEn}
              </a>
            ))}
          </nav>

          <div className="pt-3 border-t border-slate-800 grid grid-cols-2 gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenSheets();
              }}
              className="flex items-center justify-center gap-1.5 p-2 rounded-lg bg-emerald-950/60 text-emerald-300 text-xs border border-emerald-700/50"
            >
              <FileSpreadsheet className="w-4 h-4" />
              <span>{isAr ? 'جداول Google' : 'Google Sheets'}</span>
            </button>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onTriggerPrint();
              }}
              className="flex items-center justify-center gap-1.5 p-2 rounded-lg bg-red-950/40 text-red-300 text-xs border border-red-500/40 font-bold"
            >
              <Printer className="w-4 h-4" />
              <span>{isAr ? 'تحميل البروفايل PDF' : 'Download Profile PDF'}</span>
            </button>
          </div>

          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenQuote();
            }}
            className="w-full flex items-center justify-center gap-2 py-3 rounded-lg bg-red-600 text-white font-bold text-sm shadow-md"
          >
            <Send className="w-4 h-4" />
            <span>{isAr ? 'طلب عرض سعر / فحص ميداني' : 'Request Quote'}</span>
          </button>
        </div>
      )}
    </header>
  );
};
