/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { HeroCover } from './components/HeroCover';
import { AboutSection } from './components/AboutSection';
import { ServicesSection } from './components/ServicesSection';
import { MethodologySection } from './components/MethodologySection';
import { CredentialsSection } from './components/CredentialsSection';
import { ContactSection } from './components/ContactSection';
import { QuoteCalculatorModal } from './components/QuoteCalculatorModal';
import { GoogleSheetsDrawer } from './components/GoogleSheetsDrawer';
import { PrintProfileView } from './components/PrintProfileView';
import { Language } from './types';
import { initAuth, googleSignIn, logout } from './services/firebaseAuth';
import { ServiceInquiry, appendInquiryToSheet } from './services/googleSheets';
import type { User } from 'firebase/auth';

export default function App() {
  const [lang, setLang] = useState<Language>('ar');
  const [isQuoteOpen, setIsQuoteOpen] = useState(false);
  const [quoteInitialService, setQuoteInitialService] = useState('');
  const [isSheetsOpen, setIsSheetsOpen] = useState(false);
  const [isPrintMode, setIsPrintMode] = useState(false);

  // Auth & Sheets State
  const [user, setUser] = useState<User | null>(null);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [spreadsheetId, setSpreadsheetId] = useState<string | null>(null);
  const [spreadsheetUrl, setSpreadsheetUrl] = useState<string | null>(null);
  const [inquiries, setInquiries] = useState<ServiceInquiry[]>([
    {
      id: 'ORK-981024',
      timestamp: '2026-10-10 11:30',
      clientName: 'مؤسسة الرياض للتجارة',
      phone: '0551234567',
      companyName: 'مؤسسة الرياض',
      serviceType: 'صيانة وتعبئة طفايات الحريق',
      facilityType: 'مستودع تجاري',
      equipmentCount: '25 طفاية',
      cityDistrict: 'حي الضيافة',
      notes: 'طلب فحص هيدروستاتيكي وتحديث ملصقات التفتيش',
      status: 'new',
    },
    {
      id: 'ORK-981025',
      timestamp: '2026-10-11 14:15',
      clientName: 'شركة الأفق للاستثمار',
      phone: '0509876543',
      companyName: 'الأفق للاستثمار',
      serviceType: 'أنظمة الإنذار المبكر والكشف عن الحريق',
      facilityType: 'مبنى إداري',
      equipmentCount: 'لوحة معنونة + 40 كاشف',
      cityDistrict: 'حي الضيافة',
      notes: 'فحص دوري ربع سنوي وإصدار شهادة جاهزية',
      status: 'in_progress',
    },
  ]);

  // Sync HTML lang and dir attribute
  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
  }, [lang]);

  // Initialize Firebase Auth listener
  useEffect(() => {
    const unsubscribe = initAuth(
      (currentUser) => {
        setUser(currentUser);
      },
      () => {
        setUser(null);
      }
    );
    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, []);

  const handleToggleLang = () => {
    setLang((prev) => (prev === 'ar' ? 'en' : 'ar'));
  };

  const handleGoogleLogin = async () => {
    setIsLoggingIn(true);
    try {
      const res = await googleSignIn();
      if (res?.user) {
        setUser(res.user);
      }
    } catch (err: unknown) {
      console.error('Google Sign in failed:', err);
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleGoogleLogout = async () => {
    try {
      await logout();
      setUser(null);
    } catch (err: unknown) {
      console.error('Logout error:', err);
    }
  };

  const handleSetSpreadsheet = (id: string, url: string) => {
    setSpreadsheetId(id);
    setSpreadsheetUrl(url);
  };

  const handleSaveInquiry = async (newInquiry: ServiceInquiry): Promise<boolean> => {
    // Add to state
    setInquiries((prev) => [newInquiry, ...prev]);

    // If connected to Google Sheets, append row
    if (user && spreadsheetId) {
      try {
        await appendInquiryToSheet(spreadsheetId, newInquiry);
      } catch (err: unknown) {
        console.warn('Could not auto-append to sheet:', err);
      }
    }
    return true;
  };

  const handleOpenQuoteWithService = (serviceName: string) => {
    setQuoteInitialService(serviceName);
    setIsQuoteOpen(true);
  };

  // If in formal print mode
  if (isPrintMode) {
    return (
      <PrintProfileView 
        lang={lang} 
        onClose={() => setIsPrintMode(false)} 
      />
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col font-sans selection:bg-red-600 selection:text-white">
      {/* Navigation Header */}
      <Navbar
        lang={lang}
        onToggleLang={handleToggleLang}
        onOpenQuote={() => {
          setQuoteInitialService('');
          setIsQuoteOpen(true);
        }}
        onOpenSheets={() => setIsSheetsOpen(true)}
        onTriggerPrint={() => setIsPrintMode(true)}
      />

      {/* Hero & Formal Cover Section */}
      <HeroCover
        lang={lang}
        onOpenQuote={() => {
          setQuoteInitialService('');
          setIsQuoteOpen(true);
        }}
        onOpenSheets={() => setIsSheetsOpen(true)}
        onTriggerPrint={() => setIsPrintMode(true)}
      />

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* Executive Profile & About */}
        <AboutSection lang={lang} />

        {/* Core Services (Extinguishers, Alarms, Suppression, Hoods, Contracts) */}
        <ServicesSection
          lang={lang}
          onOpenQuoteWithService={handleOpenQuoteWithService}
        />

        {/* Turnkey Methodology & Maintenance Protocols */}
        <MethodologySection lang={lang} />

        {/* Regulatory Hub: CR & Civil Defense Licensing Slots */}
        <CredentialsSection
          lang={lang}
          onOpenSheets={() => setIsSheetsOpen(true)}
        />

        {/* Contact Channels, Al-Diyafa, 0555334577, 0500052629, oriket.site */}
        <ContactSection
          lang={lang}
          onOpenQuote={() => {
            setQuoteInitialService('');
            setIsQuoteOpen(true);
          }}
        />
      </main>

      {/* Quote & Inspection Modal */}
      <QuoteCalculatorModal
        isOpen={isQuoteOpen}
        onClose={() => setIsQuoteOpen(false)}
        lang={lang}
        initialService={quoteInitialService}
        onSaveInquiry={handleSaveInquiry}
        isSheetsConnected={Boolean(user && spreadsheetId)}
      />

      {/* Google Sheets Management Drawer */}
      <GoogleSheetsDrawer
        isOpen={isSheetsOpen}
        onClose={() => setIsSheetsOpen(false)}
        lang={lang}
        user={user}
        isLoggingIn={isLoggingIn}
        onLogin={handleGoogleLogin}
        onLogout={handleGoogleLogout}
        spreadsheetId={spreadsheetId}
        spreadsheetUrl={spreadsheetUrl}
        onSetSpreadsheet={handleSetSpreadsheet}
        inquiries={inquiries}
      />
    </div>
  );
}
