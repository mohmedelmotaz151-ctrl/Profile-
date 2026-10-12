import React, { useState } from 'react';
import { 
  FileCheck, 
  ShieldAlert, 
  Clock, 
  CheckCircle, 
  Edit3, 
  ExternalLink, 
  Building, 
  HelpCircle,
  FileSpreadsheet,
  Save,
  X
} from 'lucide-react';
import { Language, CompanyCredential } from '../types';
import { INITIAL_CREDENTIALS } from '../data/companyData';

interface CredentialsSectionProps {
  lang: Language;
  onOpenSheets: () => void;
}

export const CredentialsSection: React.FC<CredentialsSectionProps> = ({ 
  lang,
  onOpenSheets 
}) => {
  const isAr = lang === 'ar';
  const [credentials, setCredentials] = useState<CompanyCredential[]>(INITIAL_CREDENTIALS);
  const [editingCred, setEditingCred] = useState<CompanyCredential | null>(null);
  const [tempValue, setTempValue] = useState<string>('');

  const handleStartEdit = (cred: CompanyCredential) => {
    setEditingCred(cred);
    setTempValue(cred.currentValue || '');
  };

  const handleSaveValue = () => {
    if (!editingCred) return;
    setCredentials(prev => prev.map(item => {
      if (item.id === editingCred.id) {
        return {
          ...item,
          currentValue: tempValue,
          statusAr: tempValue ? 'تم التحقق والتوثيق' : item.statusAr,
          statusEn: tempValue ? 'Verified & Documented' : item.statusEn,
          badgeType: tempValue ? 'verified' : item.badgeType,
        };
      }
      return item;
    }));
    setEditingCred(null);
  };

  return (
    <section id="credentials" className="py-20 bg-slate-50 text-slate-800 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-100 text-amber-800 text-xs font-bold uppercase tracking-wider mb-3">
            <Clock className="w-3.5 h-3.5" />
            <span>{isAr ? 'البيانات النظامية والتراخيص' : 'Regulatory Hub & Licensing'}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0B1E36] tracking-tight">
            {isAr 
              ? 'السجل التجاري، التراخيص والاعتمادات الرسمية' 
              : 'Commercial Registration & Regulatory Accreditations'}
          </h2>
          <div className="w-20 h-1 bg-red-600 mx-auto mt-4 rounded-full"></div>
          <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed">
            {isAr 
              ? 'خانات مخصصة ومعتمدة لتوثيق أرقام السجلات وتراخيص الدفاع المدني والاعتمادات النظامية، والمصنفة حالياً [قيد التحقق والمراجعة الفنية] لحين اكتمال التدقيق النظامي النهائي.' 
              : 'Dedicated slots for commercial registrations, Civil Defense licenses, and official compliance documents—currently designated as [Under Verification & Review] pending final regulatory validation.'}
          </p>
        </div>

        {/* Verification Notice Banner */}
        <div className="mb-12 bg-amber-50 border border-amber-200 rounded-2xl p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-sm">
          <div className="flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center shrink-0 mt-0.5">
              <ShieldAlert className="w-5 h-5 text-amber-700" />
            </div>
            <div>
              <h4 className="font-bold text-amber-900 text-base">
                {isAr ? 'إشعار الشفافية النظامية (قيد التدقيق والتحقق)' : 'Compliance Notice (Under Verification)'}
              </h4>
              <p className="text-xs sm:text-sm text-amber-800 mt-1">
                {isAr 
                  ? 'تم تخصيص هذه الخانات لتسجيل أرقام السجل التجاري ورخص مزاولة النشاط. يمكنك الضغط على أي خانة لإدخال الرقم المعتمد أو مزامنة التراخيص مباشرة مع جداول Google Sheets.'
                  : 'These slots are reserved for recording CR numbers and Civil Defense permits. You may click to register verified numbers or sync accreditations directly with Google Sheets.'}
              </p>
            </div>
          </div>

          <button
            onClick={onOpenSheets}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-800 hover:bg-emerald-700 text-white text-xs sm:text-sm font-bold shrink-0 transition shadow-sm cursor-pointer"
          >
            <FileSpreadsheet className="w-4 h-4" />
            <span>{isAr ? 'مزامنة مع Google Sheets' : 'Sync to Google Sheets'}</span>
          </button>
        </div>

        {/* Credentials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {credentials.map((cred) => {
            const isVerified = cred.badgeType === 'verified';
            const isStandard = cred.badgeType === 'standard';

            return (
              <div 
                key={cred.id}
                className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hover:shadow-lg hover:border-slate-400 transition-all flex flex-col justify-between relative group"
              >
                <div>
                  {/* Status Tag & Edit Button */}
                  <div className="flex items-center justify-between mb-4">
                    <span className={`text-xs px-2.5 py-1 rounded-full font-bold flex items-center gap-1.5 ${
                      isVerified
                        ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                        : isStandard
                        ? 'bg-blue-100 text-blue-800 border border-blue-300'
                        : 'bg-amber-100 text-amber-800 border border-amber-300'
                    }`}>
                      {isVerified ? (
                        <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                      ) : isStandard ? (
                        <CheckCircle className="w-3.5 h-3.5 text-blue-600" />
                      ) : (
                        <Clock className="w-3.5 h-3.5 text-amber-600 animate-pulse" />
                      )}
                      <span>{isAr ? cred.statusAr : cred.statusEn}</span>
                    </span>

                    <button
                      onClick={() => handleStartEdit(cred)}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition cursor-pointer"
                      title={isAr ? 'تحديث أو تسجيل الرقم' : 'Update or Input Number'}
                    >
                      <Edit3 className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Title */}
                  <h3 className="font-extrabold text-lg text-[#0B1E36] mb-1">
                    {isAr ? cred.titleAr : cred.titleEn}
                  </h3>

                  {/* Issuing Authority */}
                  <p className="text-xs text-slate-500 font-medium mb-4 flex items-center gap-1">
                    <Building className="w-3.5 h-3.5 text-slate-400" />
                    <span>{isAr ? cred.authorityAr : cred.authorityEn}</span>
                  </p>

                  {/* Slot / Number Display Box */}
                  <div className="bg-slate-50 border-2 border-dashed border-slate-300 rounded-xl p-3.5 mb-4 font-mono text-center">
                    <span className="text-xs text-slate-400 block mb-1">
                      {isAr ? 'الرقم المرجعي / التسجيل' : 'Reference / Registration ID'}
                    </span>
                    <span className={`text-sm sm:text-base font-bold ${
                      cred.currentValue ? 'text-emerald-700' : 'text-slate-600'
                    }`}>
                      {cred.currentValue || (isAr ? cred.numberPlaceholderAr : cred.numberPlaceholderEn)}
                    </span>
                  </div>

                  {/* Notes & Explanation */}
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {isAr ? cred.noteAr : cred.noteEn}
                  </p>
                </div>

                <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400">
                  <span className="font-mono text-[11px] uppercase">
                    ID: {cred.id}
                  </span>
                  <button
                    onClick={() => handleStartEdit(cred)}
                    className="text-red-600 hover:text-red-700 font-semibold cursor-pointer flex items-center gap-1"
                  >
                    <span>{cred.currentValue ? (isAr ? 'تعديل' : 'Edit') : (isAr ? 'إدخال الرقم' : 'Enter No.')}</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>

      </div>

      {/* Edit Credential Modal */}
      {editingCred && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="bg-[#0B1E36] text-white p-5 flex items-center justify-between">
              <h3 className="font-bold text-lg">
                {isAr ? 'تحديث بيانات الاعتماد' : 'Update Credential Data'}
              </h3>
              <button 
                onClick={() => setEditingCred(null)}
                className="text-slate-300 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  {isAr ? 'البند / الترخيص' : 'License Item'}
                </label>
                <p className="text-sm font-semibold text-[#0B1E36]">
                  {isAr ? editingCred.titleAr : editingCred.titleEn}
                </p>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  {isAr ? 'رقم السجل / الترخيص المعتمد' : 'Verified Number / Registration'}
                </label>
                <input
                  type="text"
                  value={tempValue}
                  onChange={(e) => setTempValue(e.target.value)}
                  placeholder={isAr ? editingCred.numberPlaceholderAr : editingCred.numberPlaceholderEn}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-red-500 font-mono text-sm"
                  dir="ltr"
                />
                <span className="text-[11px] text-slate-500 mt-1 block">
                  {isAr 
                    ? 'سيتم تحديث الخانة وإظهارها كـ "تم التحقق والتوثيق".' 
                    : 'The slot will be marked as "Verified & Documented".'}
                </span>
              </div>
            </div>

            <div className="bg-slate-50 p-4 border-t border-slate-200 flex items-center justify-end gap-2">
              <button
                onClick={() => setEditingCred(null)}
                className="px-4 py-2 rounded-lg text-slate-600 hover:bg-slate-200 text-xs font-bold transition"
              >
                {isAr ? 'إلغاء' : 'Cancel'}
              </button>
              <button
                onClick={handleSaveValue}
                className="px-5 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white text-xs font-bold shadow-md transition flex items-center gap-1.5"
              >
                <Save className="w-4 h-4" />
                <span>{isAr ? 'حفظ وتحديث' : 'Save & Update'}</span>
              </button>
            </div>
          </div>
        </div>
      )}

    </section>
  );
};
