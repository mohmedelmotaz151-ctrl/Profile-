import React, { useState } from 'react';
import { 
  X, 
  FileSpreadsheet, 
  CheckCircle, 
  ExternalLink, 
  LogOut, 
  Plus, 
  AlertCircle, 
  RefreshCw, 
  Database,
  ArrowRight,
  ArrowLeft
} from 'lucide-react';
import { Language } from '../types';
import { ServiceInquiry, createInquiriesSpreadsheet, appendInquiryToSheet } from '../services/googleSheets';
import type { User } from 'firebase/auth';

interface GoogleSheetsDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
  user: User | null;
  isLoggingIn: boolean;
  onLogin: () => Promise<void>;
  onLogout: () => Promise<void>;
  spreadsheetId: string | null;
  spreadsheetUrl: string | null;
  onSetSpreadsheet: (id: string, url: string) => void;
  inquiries: ServiceInquiry[];
}

export const GoogleSheetsDrawer: React.FC<GoogleSheetsDrawerProps> = ({
  isOpen,
  onClose,
  lang,
  user,
  isLoggingIn,
  onLogin,
  onLogout,
  spreadsheetId,
  spreadsheetUrl,
  onSetSpreadsheet,
  inquiries,
}) => {
  const isAr = lang === 'ar';
  const ArrowIcon = isAr ? ArrowLeft : ArrowRight;

  const [customSheetId, setCustomSheetId] = useState('');
  const [isCreatingSheet, setIsCreatingSheet] = useState(false);
  const [isSyncingRows, setIsSyncingRows] = useState(false);
  const [syncMessage, setSyncMessage] = useState<string | null>(null);

  // Destructive/Mutation Confirmation Modals
  const [confirmCreateSheet, setConfirmCreateSheet] = useState(false);
  const [confirmSyncInquiries, setConfirmSyncInquiries] = useState(false);

  if (!isOpen) return null;

  const handleExecuteCreateSheet = async () => {
    setConfirmCreateSheet(false);
    setIsCreatingSheet(true);
    setSyncMessage(null);
    try {
      const res = await createInquiriesSpreadsheet(
        isAr 
          ? 'سجل طلبات واستفسارات أوريكيت للمقاولات | Orkeit Inquiries Log'
          : 'Orkeit Contracting Inquiries Log'
      );
      onSetSpreadsheet(res.spreadsheetId, res.spreadsheetUrl);
      setSyncMessage(isAr ? 'تم إنشاء جدول بيانات جديد بنجاح في Google Drive!' : 'New Google Spreadsheet created successfully!');
    } catch (err: unknown) {
      console.error(err);
      setSyncMessage(isAr ? 'تعذر إنشاء الجدول: يرجى التحقق من تسجيل الدخول والموافقة' : 'Failed to create sheet: Please check credentials');
    } finally {
      setIsCreatingSheet(false);
    }
  };

  const handleExecuteSyncAll = async () => {
    if (!spreadsheetId) return;
    setConfirmSyncInquiries(false);
    setIsSyncingRows(true);
    setSyncMessage(null);

    let count = 0;
    try {
      for (const item of inquiries) {
        await appendInquiryToSheet(spreadsheetId, item);
        count++;
      }
      setSyncMessage(
        isAr 
          ? `تمت مزامنة وترحيل ${count} طلب/استفسار إلى Google Sheets بنجاح!` 
          : `Successfully exported ${count} inquiries to Google Sheets!`
      );
    } catch (err: unknown) {
      console.error(err);
      setSyncMessage(
        isAr 
          ? `حدث خطأ أثناء مزامنة السجلات بعد ${count} عملية` 
          : `Sync interrupted after ${count} rows`
      );
    } finally {
      setIsSyncingRows(false);
    }
  };

  const handleConnectCustomId = () => {
    if (!customSheetId.trim()) return;
    const cleanId = customSheetId.trim();
    const url = `https://docs.google.com/spreadsheets/d/${cleanId}/edit`;
    onSetSpreadsheet(cleanId, url);
    setCustomSheetId('');
    setSyncMessage(isAr ? 'تم ربط معرّف الجدول بنجاح!' : 'Spreadsheet ID linked successfully!');
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-lg h-full shadow-2xl flex flex-col overflow-hidden text-slate-800">
        
        {/* Drawer Header */}
        <div className="bg-[#0B1E36] text-white p-6 flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-600/30 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
              <FileSpreadsheet className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-lg">
                {isAr ? 'ربط وتكامل Google Sheets' : 'Google Sheets Integration'}
              </h3>
              <p className="text-xs text-slate-300">
                {isAr ? 'حفظ وتصدير طلبات عروض الأسعار واستفسارات الصيانة' : 'Export & Sync quotation leads directly'}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Drawer Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          
          {/* Auth State Card */}
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                {isAr ? 'حالة الحساب والتوثيق' : 'Authentication Status'}
              </span>
              <span className={`text-xs px-2.5 py-0.5 rounded-full font-bold flex items-center gap-1 ${
                user ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-200 text-slate-600'
              }`}>
                <span className={`w-2 h-2 rounded-full ${user ? 'bg-emerald-500' : 'bg-slate-400'}`}></span>
                {user ? (isAr ? 'متصل ومصرح' : 'Connected') : (isAr ? 'غير متصل' : 'Not Signed In')}
              </span>
            </div>

            {user ? (
              <div className="space-y-3">
                <div className="flex items-center gap-3 bg-white p-3 rounded-xl border border-slate-200">
                  {user.photoURL ? (
                    <img src={user.photoURL} alt="Avatar" className="w-10 h-10 rounded-full" />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-700 font-bold flex items-center justify-center">
                      {user.displayName?.[0] || 'U'}
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-bold text-[#0B1E36] truncate">{user.displayName || 'Google User'}</p>
                    <p className="text-[11px] text-slate-500 truncate font-mono">{user.email}</p>
                  </div>
                  <button
                    onClick={onLogout}
                    className="p-2 text-slate-400 hover:text-red-600 rounded-lg hover:bg-red-50 transition"
                    title={isAr ? 'تسجيل الخروج' : 'Sign Out'}
                  >
                    <LogOut className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ) : (
              <div className="text-center py-2 space-y-3">
                <p className="text-xs text-slate-600">
                  {isAr 
                    ? 'سجّل الدخول بحساب Google لتمكين التطبيق من إنشاء وتحديث جداول البيانات بموافقتك.'
                    : 'Sign in with Google to enable creating and syncing spreadsheets with your permission.'}
                </p>

                {/* Material Google Sign-in button */}
                <div className="flex justify-center">
                  <button
                    onClick={onLogin}
                    disabled={isLoggingIn}
                    className="gsi-material-button"
                  >
                    <div className="gsi-material-button-state"></div>
                    <div className="gsi-material-button-content-wrapper flex items-center gap-2">
                      <div className="gsi-material-button-icon">
                        <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" style={{ width: 18, height: 18, display: 'block' }}>
                          <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"></path>
                          <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"></path>
                          <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"></path>
                          <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"></path>
                        </svg>
                      </div>
                      <span className="gsi-material-button-contents font-medium text-xs text-slate-700">
                        {isLoggingIn ? (isAr ? 'جاري الاتصال...' : 'Signing in...') : (isAr ? 'تسجيل الدخول بحساب Google' : 'Sign in with Google')}
                      </span>
                    </div>
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Connected Sheet Status & Actions */}
          {user && (
            <div className="space-y-4">
              <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                {isAr ? 'جدول البيانات النشط' : 'Active Spreadsheet'}
              </h4>

              {spreadsheetId ? (
                <div className="bg-emerald-50/60 border border-emerald-300 rounded-2xl p-4 space-y-3">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <span className="text-xs font-bold text-emerald-900 block">
                        {isAr ? 'سجل طلبات واستفسارات أوريكيت' : 'Orkeit Inquiries Log'}
                      </span>
                      <span className="text-[11px] text-slate-500 font-mono block truncate max-w-[260px]">
                        ID: {spreadsheetId}
                      </span>
                    </div>
                    {spreadsheetUrl && (
                      <a
                        href={spreadsheetUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold flex items-center gap-1 shadow-sm shrink-0"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                        <span>{isAr ? 'فتح في Google' : 'Open Sheet'}</span>
                      </a>
                    )}
                  </div>

                  <div className="pt-2 border-t border-emerald-200/60 flex items-center justify-between gap-2">
                    <button
                      onClick={() => setConfirmSyncInquiries(true)}
                      disabled={isSyncingRows || inquiries.length === 0}
                      className="w-full py-2.5 px-3 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-bold transition flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                    >
                      <RefreshCw className={`w-3.5 h-3.5 ${isSyncingRows ? 'animate-spin' : ''}`} />
                      <span>
                        {isSyncingRows 
                          ? (isAr ? 'جاري الترحيل...' : 'Exporting...') 
                          : (isAr ? `تصدير كل الطلبات (${inquiries.length}) إلى الجدول` : `Export All Inquiries (${inquiries.length})`)}
                      </span>
                    </button>
                  </div>
                </div>
              ) : (
                <div className="bg-slate-50 border border-dashed border-slate-300 rounded-2xl p-6 text-center space-y-3">
                  <Database className="w-8 h-8 text-slate-400 mx-auto" />
                  <p className="text-xs text-slate-600">
                    {isAr 
                      ? 'لم يتم تحديد جدول بيانات حالياً. يمكنك إنشاء جدول جديد بنقرة واحدة أو ربط جدول قائم.'
                      : 'No active sheet linked. You can create a new sheet or connect an existing ID.'}
                  </p>
                  
                  <button
                    onClick={() => setConfirmCreateSheet(true)}
                    disabled={isCreatingSheet}
                    className="w-full py-3 px-4 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-bold transition flex items-center justify-center gap-2 shadow-sm cursor-pointer disabled:opacity-50"
                  >
                    <Plus className="w-4 h-4" />
                    <span>
                      {isCreatingSheet 
                        ? (isAr ? 'جاري إنشاء الجدول في Google Drive...' : 'Creating Spreadsheet...') 
                        : (isAr ? 'إنشاء جدول جديد رسمي لأوريكيت' : 'Create New Orkeit Inquiries Sheet')}
                    </span>
                  </button>

                  <div className="pt-3 border-t border-slate-200">
                    <span className="text-[11px] text-slate-400 block mb-2">
                      {isAr ? 'أو أدخل معرّف جدول موجود مسبقاً (Spreadsheet ID):' : 'Or enter an existing Spreadsheet ID:'}
                    </span>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={customSheetId}
                        onChange={(e) => setCustomSheetId(e.target.value)}
                        placeholder="1BxiMVs0XRA5nFMd..."
                        className="flex-1 px-3 py-2 rounded-lg border border-slate-300 text-xs font-mono"
                        dir="ltr"
                      />
                      <button
                        onClick={handleConnectCustomId}
                        className="px-3 py-2 bg-slate-800 text-white rounded-lg text-xs font-bold hover:bg-slate-900"
                      >
                        {isAr ? 'ربط' : 'Link'}
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Feedback Message */}
          {syncMessage && (
            <div className="p-3 bg-blue-50 border border-blue-200 rounded-xl text-xs text-blue-900 flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-blue-600 shrink-0" />
              <span>{syncMessage}</span>
            </div>
          )}

          {/* Recent Inquiries In-Memory Log */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                {isAr ? 'الطلبات المسجلة محلياً في هذه الجلسة' : 'Current Session Inquiries'}
              </h4>
              <span className="text-xs px-2 py-0.5 rounded-full bg-slate-100 font-mono font-bold">
                {inquiries.length}
              </span>
            </div>

            {inquiries.length === 0 ? (
              <p className="text-xs text-slate-400 text-center py-6 bg-slate-50 rounded-xl border border-slate-100">
                {isAr ? 'لا توجد طلبات مسجلة بعد. عند تعبئة نموذج عرض السعر ستظهر هنا.' : 'No recorded inquiries yet.'}
              </p>
            ) : (
              <div className="space-y-2.5 max-h-56 overflow-y-auto">
                {inquiries.map((inq) => (
                  <div key={inq.id} className="bg-slate-50 border border-slate-200 p-3 rounded-xl text-xs space-y-1">
                    <div className="flex items-center justify-between font-bold text-[#0B1E36]">
                      <span>{inq.clientName}</span>
                      <span className="font-mono text-[11px] text-slate-500">#{inq.id}</span>
                    </div>
                    <p className="text-red-700 font-medium">{inq.serviceType}</p>
                    <div className="flex items-center justify-between text-slate-500 text-[11px]">
                      <span>{inq.phone}</span>
                      <span>{inq.cityDistrict}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>

        {/* Drawer Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
          <span>{isAr ? 'تكامل معتمد عبر Google Workspace API' : 'Google Workspace API Certified'}</span>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-slate-200 hover:bg-slate-300 text-slate-700 font-bold transition cursor-pointer"
          >
            {isAr ? 'إغلاق' : 'Close'}
          </button>
        </div>

      </div>

      {/* Confirmation Modal for Creating New Sheet */}
      {confirmCreateSheet && (
        <div className="fixed inset-0 z-60 flex items-center justify-center bg-black/75 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200 animate-in zoom-in-95">
            <div className="flex items-start gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
                <FileSpreadsheet className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold text-lg text-[#0B1E36]">
                  {isAr ? 'تأكيد إنشاء جدول بيانات في حسابك' : 'Confirm Creating Spreadsheet'}
                </h4>
                <p className="text-xs text-slate-600 mt-1">
                  {isAr 
                    ? 'هل توافق على إنشاء ملف جدول بيانات جديد بعنوان "سجل طلبات واستفسارات أوريكيت للمقاولات" في حساب Google Drive الخاص بك لحفظ طلبات العملاء؟'
                    : 'Do you confirm creating a new spreadsheet "Orkeit Inquiries Log" in your Google Drive account?'}
                </p>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2.5 pt-2">
              <button
                onClick={() => setConfirmCreateSheet(false)}
                className="px-4 py-2 rounded-xl text-slate-600 hover:bg-slate-100 text-xs font-bold transition"
              >
                {isAr ? 'إلغاء' : 'Cancel'}
              </button>
              <button
                onClick={handleExecuteCreateSheet}
                className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-md transition"
              >
                {isAr ? 'موافق، إنشاء الجدول' : 'Confirm & Create'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Confirmation Modal for Syncing/Appending Inquiries */}
      {confirmSyncInquiries && (
        <div className="fixed inset-0 z-60 flex items-center justify-center bg-black/75 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200 animate-in zoom-in-95">
            <div className="flex items-start gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center shrink-0">
                <AlertCircle className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold text-lg text-[#0B1E36]">
                  {isAr ? 'تأكيد ترحيل الطلبات إلى Google Sheets' : 'Confirm Exporting to Sheets'}
                </h4>
                <p className="text-xs text-slate-600 mt-1">
                  {isAr 
                    ? `هل تؤكد كتابة وإضافة ${inquiries.length} صفوف من بيانات الطلبات إلى جدول البيانات النشط؟`
                    : `Do you confirm appending ${inquiries.length} inquiry row(s) into the active Google Sheet?`}
                </p>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2.5 pt-2">
              <button
                onClick={() => setConfirmSyncInquiries(false)}
                className="px-4 py-2 rounded-xl text-slate-600 hover:bg-slate-100 text-xs font-bold transition"
              >
                {isAr ? 'إلغاء' : 'Cancel'}
              </button>
              <button
                onClick={handleExecuteSyncAll}
                className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-md transition"
              >
                {isAr ? 'تأكيد الترحيل' : 'Confirm Export'}
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
