import React, { useState } from 'react';
import { 
  X, 
  Send, 
  CheckCircle, 
  PhoneCall, 
  Building2, 
  FileSpreadsheet, 
  MessageSquare,
  Sparkles,
  AlertCircle
} from 'lucide-react';
import { Language } from '../types';
import { COMPANY_CONTACT } from '../data/companyData';
import { ServiceInquiry } from '../services/googleSheets';

interface QuoteCalculatorModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
  initialService?: string;
  onSaveInquiry: (inquiry: ServiceInquiry) => Promise<boolean>;
  isSheetsConnected: boolean;
}

export const QuoteCalculatorModal: React.FC<QuoteCalculatorModalProps> = ({
  isOpen,
  onClose,
  lang,
  initialService = '',
  onSaveInquiry,
  isSheetsConnected,
}) => {
  const isAr = lang === 'ar';

  const [serviceType, setServiceType] = useState(initialService || (isAr ? 'صيانة وتعبئة طفايات الحريق' : 'Fire Extinguisher Maintenance & Refilling'));
  const [clientName, setClientName] = useState('');
  const [phone, setPhone] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [facilityType, setFacilityType] = useState(isAr ? 'منشأة تجارية / معرض' : 'Commercial Facility / Showroom');
  const [equipmentCount, setEquipmentCount] = useState('10');
  const [cityDistrict, setCityDistrict] = useState(isAr ? 'حي الضيافة' : 'Al-Diyafa District');
  const [notes, setNotes] = useState('');

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [submittedInquiry, setSubmittedInquiry] = useState<ServiceInquiry | null>(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  if (!isOpen) return null;

  const handlePreSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientName.trim() || !phone.trim()) {
      alert(isAr ? 'يرجى إدخال اسم العميل ورقم الجوال' : 'Please provide client name and phone number');
      return;
    }
    // Show explicit confirmation dialog before processing
    setShowConfirmModal(true);
  };

  const handleExecuteSubmit = async () => {
    setShowConfirmModal(false);
    setIsSubmitting(true);

    const newInquiry: ServiceInquiry = {
      id: `ORK-${Date.now().toString().slice(-6)}`,
      timestamp: new Date().toLocaleString(isAr ? 'ar-SA' : 'en-US'),
      clientName: clientName.trim(),
      phone: phone.trim(),
      companyName: companyName.trim() || undefined,
      serviceType,
      facilityType,
      equipmentCount,
      cityDistrict: cityDistrict.trim() || (isAr ? 'حي الضيافة' : 'Al-Diyafa'),
      notes: notes.trim() || undefined,
      status: 'new',
    };

    try {
      await onSaveInquiry(newInquiry);
      setSubmittedInquiry(newInquiry);
      setIsSuccess(true);
    } catch (err: unknown) {
      console.error(err);
      alert(isAr ? 'حدث خطأ أثناء معالجة الطلب' : 'An error occurred while submitting');
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setIsSuccess(false);
    setSubmittedInquiry(null);
    setClientName('');
    setPhone('');
    setCompanyName('');
    setNotes('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/65 backdrop-blur-sm p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-2xl w-full shadow-2xl border border-slate-200 overflow-hidden my-6 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-[#0B1E36] via-[#102A4C] to-[#0B1E36] text-white p-6 relative">
          <button
            onClick={resetForm}
            className="absolute top-5 left-5 text-slate-300 hover:text-white p-1 rounded-lg bg-white/10"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="inline-flex items-center gap-2 px-3 py-0.5 rounded-full bg-red-600/30 text-red-300 text-xs font-semibold mb-2 border border-red-500/30">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{isAr ? 'نموذج فحص وطلب عرض سعر' : 'Quotation & Inspection Request'}</span>
          </div>

          <h3 className="text-2xl font-black">
            {isAr ? 'طلب عرض سعر / معاينة فنية ميدانية' : 'Request Inspection & Price Quotation'}
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 mt-1">
            {isAr 
              ? 'فريق شركة أوريكيت للمقاولات العامة جاهز لمعاينة منشأتكم وتوفير الحل الهندسي الأمثل.' 
              : 'Our engineering team is ready to inspect your site and provide competitive compliance pricing.'}
          </p>
        </div>

        {/* Content */}
        {isSuccess && submittedInquiry ? (
          <div className="p-8 text-center space-y-6">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-md">
              <CheckCircle className="w-10 h-10" />
            </div>

            <div>
              <h4 className="text-2xl font-black text-[#0B1E36]">
                {isAr ? 'تم استلام وتوثيق طلبك بنجاح!' : 'Your Request Has Been Recorded!'}
              </h4>
              <p className="text-sm text-slate-600 mt-2">
                {isAr 
                  ? `رقم المرجع: #${submittedInquiry.id} - سيتواصل معكم مهندس المبيعات في أقرب وقت.`
                  : `Reference ID: #${submittedInquiry.id} - Our technical representative will contact you shortly.`}
              </p>
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 text-right space-y-2 text-xs sm:text-sm text-slate-700">
              <div className="flex justify-between border-b pb-2">
                <span className="font-semibold text-slate-500">{isAr ? 'الخدمة المطلوبة:' : 'Requested Service:'}</span>
                <span className="font-bold text-[#0B1E36]">{submittedInquiry.serviceType}</span>
              </div>
              <div className="flex justify-between border-b pb-2">
                <span className="font-semibold text-slate-500">{isAr ? 'العميل:' : 'Client:'}</span>
                <span className="font-bold text-[#0B1E36]">{submittedInquiry.clientName} ({submittedInquiry.phone})</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold text-slate-500">{isAr ? 'الموقع المقترح:' : 'Location:'}</span>
                <span className="font-bold text-[#0B1E36]">{submittedInquiry.cityDistrict}</span>
              </div>
            </div>

            {/* Quick Contact Buttons */}
            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              <a
                href={`https://wa.me/966555334577?text=${encodeURIComponent(
                  `السلام عليكم، أود متابعة طلب فحص وعرض سعر برقم مرجعي #${submittedInquiry.id} لخدمة ${submittedInquiry.serviceType}`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm transition flex items-center gap-2 shadow-md"
              >
                <MessageSquare className="w-4 h-4" />
                <span>{isAr ? 'متابعة مباشرة عبر واتساب' : 'Continue on WhatsApp'}</span>
              </a>

              <a
                href={`tel:${COMPANY_CONTACT.phone1}`}
                className="px-5 py-3 rounded-xl bg-[#0B1E36] hover:bg-[#102A4C] text-white font-bold text-xs sm:text-sm transition flex items-center gap-2 shadow-md"
              >
                <PhoneCall className="w-4 h-4 text-red-400" />
                <span>{isAr ? 'اتصال بالرقم 0555334577' : 'Call 0555334577'}</span>
              </a>
            </div>

            <button
              onClick={resetForm}
              className="px-6 py-2 rounded-lg text-slate-500 hover:text-slate-800 text-xs font-semibold"
            >
              {isAr ? 'إغلاق النافذة' : 'Close Modal'}
            </button>
          </div>
        ) : (
          <form onSubmit={handlePreSubmit} className="p-6 sm:p-8 space-y-5">
            
            {/* Service & Facility Pickers */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  {isAr ? 'نوع الخدمة المطلوبة *' : 'Selected Service *'}
                </label>
                <select
                  value={serviceType}
                  onChange={(e) => setServiceType(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-red-500 text-xs sm:text-sm font-medium bg-white"
                >
                  <option value={isAr ? 'صيانة وتعبئة طفايات الحريق' : 'Fire Extinguisher Maintenance & Refilling'}>
                    {isAr ? 'صيانة وتعبئة طفايات الحريق' : 'Fire Extinguisher Maintenance & Refilling'}
                  </option>
                  <option value={isAr ? 'أنظمة الإنذار المبكر والكشف عن الحريق' : 'Fire Alarm & Detection Systems'}>
                    {isAr ? 'أنظمة الإنذار المبكر والكشف عن الحريق' : 'Fire Alarm & Detection Systems'}
                  </option>
                  <option value={isAr ? 'شبكات الإطفاء المائي ومضخات الحريق' : 'Water Suppression & Fire Pumps'}>
                    {isAr ? 'شبكات الإطفاء المائي ومضخات الحريق' : 'Water Suppression & Fire Pumps'}
                  </option>
                  <option value={isAr ? 'أنظمة الغازات النظيفة (FM200 / NOVEC / CO2)' : 'Clean Agent Systems (FM200 / CO2)'}>
                    {isAr ? 'أنظمة الغازات النظيفة (FM200 / NOVEC / CO2)' : 'Clean Agent Systems (FM200 / CO2)'}
                  </option>
                  <option value={isAr ? 'أنظمة إطفاء هود المطابخ التجارية' : 'Commercial Kitchen Hood Systems'}>
                    {isAr ? 'أنظمة إطفاء هود المطابخ التجارية' : 'Commercial Kitchen Hood Systems'}
                  </option>
                  <option value={isAr ? 'عقود الصيانة الدورية وشهادات الدفاع المدني' : 'Maintenance Contracts & Salamah Certs'}>
                    {isAr ? 'عقود الصيانة الدورية وشهادات الدفاع المدني' : 'Maintenance Contracts & Salamah Certs'}
                  </option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  {isAr ? 'نوع المنشأة / النشاط' : 'Facility Classification'}
                </label>
                <select
                  value={facilityType}
                  onChange={(e) => setFacilityType(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-red-500 text-xs sm:text-sm font-medium bg-white"
                >
                  <option value={isAr ? 'منشأة تجارية / معرض / متجر' : 'Commercial Facility / Showroom'}>
                    {isAr ? 'منشأة تجارية / معرض / متجر' : 'Commercial Facility / Showroom'}
                  </option>
                  <option value={isAr ? 'مستودع / هنجر تخزين' : 'Warehouse / Logistics Hub'}>
                    {isAr ? 'مستودع / هنجر تخزين' : 'Warehouse / Logistics Hub'}
                  </option>
                  <option value={isAr ? 'مطعم / كافيه / مطبخ مركزي' : 'Restaurant / Commercial Kitchen'}>
                    {isAr ? 'مطعم / كافيه / مطبخ مركزي' : 'Restaurant / Commercial Kitchen'}
                  </option>
                  <option value={isAr ? 'مبنى إداري / مكاتب شركات' : 'Office Building / Corporate HQ'}>
                    {isAr ? 'مبنى إداري / مكاتب شركات' : 'Office Building / Corporate HQ'}
                  </option>
                  <option value={isAr ? 'مجمع سكني / فندق / شقق مفروشة' : 'Residential Compound / Hotel'}>
                    {isAr ? 'مجمع سكني / فندق / شقق مفروشة' : 'Residential Compound / Hotel'}
                  </option>
                  <option value={isAr ? 'مصنع / ورشة صناعية' : 'Factory / Industrial Workshop'}>
                    {isAr ? 'مصنع / ورشة صناعية' : 'Factory / Industrial Workshop'}
                  </option>
                </select>
              </div>
            </div>

            {/* Client Info */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  {isAr ? 'اسم العميل / المسؤول *' : 'Client / Contact Name *'}
                </label>
                <input
                  type="text"
                  required
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  placeholder={isAr ? 'مثال: م. فهد الأحمد' : 'e.g. Eng. Fahad'}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-red-500 text-xs sm:text-sm font-medium"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  {isAr ? 'رقم الجوال للتواصل *' : 'Phone Number *'}
                </label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="05XXXXXXXX"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-red-500 text-xs sm:text-sm font-mono"
                  dir="ltr"
                />
              </div>
            </div>

            {/* Company & Quantity */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="sm:col-span-1">
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  {isAr ? 'الشركة / المنشأة (اختياري)' : 'Company Name (Optional)'}
                </label>
                <input
                  type="text"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  placeholder={isAr ? 'اسم المؤسسة' : 'Company LLC'}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-red-500 text-xs sm:text-sm"
                />
              </div>

              <div className="sm:col-span-1">
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  {isAr ? 'العدد التقديري للأجهزة' : 'Est. Units Count'}
                </label>
                <input
                  type="text"
                  value={equipmentCount}
                  onChange={(e) => setEquipmentCount(e.target.value)}
                  placeholder="10"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-red-500 text-xs sm:text-sm font-mono"
                  dir="ltr"
                />
              </div>

              <div className="sm:col-span-1">
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  {isAr ? 'المدينة / الحي' : 'Location / District'}
                </label>
                <input
                  type="text"
                  value={cityDistrict}
                  onChange={(e) => setCityDistrict(e.target.value)}
                  placeholder={isAr ? 'حي الضيافة' : 'Al-Diyafa'}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-red-500 text-xs sm:text-sm"
                />
              </div>
            </div>

            {/* Notes */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                {isAr ? 'ملاحظات وتفاصيل إضافية' : 'Additional Specifications & Notes'}
              </label>
              <textarea
                rows={3}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder={isAr ? 'تفاصيل عن مساحة الموقع، حالة الأجهزة الراهنة، موعد الزيارة المفضل...' : 'Details on floor area, existing equipment condition, preferred visit timing...'}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-red-500 text-xs sm:text-sm"
              />
            </div>

            {/* Sheets Notice */}
            {isSheetsConnected && (
              <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center gap-2 text-xs text-emerald-800">
                <FileSpreadsheet className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>
                  {isAr 
                    ? 'سيتم تدوين هذا الطلب تلقائياً في سجل Google Sheets المتصل بشركة أوريكيت.'
                    : 'This inquiry will be synchronized into the connected Orkeit Google Sheet.'}
                </span>
              </div>
            )}

            {/* Modal Actions */}
            <div className="pt-3 border-t border-slate-200 flex items-center justify-between gap-3">
              <button
                type="button"
                onClick={resetForm}
                className="px-4 py-2.5 rounded-xl text-slate-600 hover:bg-slate-100 text-xs sm:text-sm font-semibold transition cursor-pointer"
              >
                {isAr ? 'إلغاء' : 'Cancel'}
              </button>

              <button
                type="submit"
                disabled={isSubmitting}
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white font-bold text-xs sm:text-sm shadow-md transition flex items-center gap-2 cursor-pointer disabled:opacity-50"
              >
                <Send className="w-4 h-4" />
                <span>{isSubmitting ? (isAr ? 'جاري الإرسال...' : 'Submitting...') : (isAr ? 'تأكيد وإرسال الطلب' : 'Confirm & Submit')}</span>
              </button>
            </div>

          </form>
        )}

      </div>

      {/* Confirmation Dialog before mutation (Mandatory for Workspace & Data Mutations) */}
      {showConfirmModal && (
        <div className="fixed inset-0 z-60 flex items-center justify-center bg-black/75 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200 animate-in zoom-in-95">
            <div className="flex items-start gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-red-100 text-red-600 flex items-center justify-center shrink-0">
                <AlertCircle className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-black text-lg text-[#0B1E36]">
                  {isAr ? 'تأكيد إرسال وتوثيق الطلب' : 'Confirm Inquiry Submission'}
                </h4>
                <p className="text-xs text-slate-600 mt-1">
                  {isAr 
                    ? `هل ترغب في اعتماد وتوثيق طلب "${serviceType}" باسم "${clientName}" ورقم "${phone}"؟`
                    : `Do you confirm saving the inquiry for "${serviceType}" for client "${clientName}"?`}
                </p>
              </div>
            </div>

            <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 text-xs text-slate-600 space-y-1 mb-5">
              <p><strong>{isAr ? 'الموقع:' : 'Location:'}</strong> {cityDistrict}</p>
              <p><strong>{isAr ? 'الكمية التقديرية:' : 'Est. Units:'}</strong> {equipmentCount}</p>
              {isSheetsConnected && (
                <p className="text-emerald-700 font-semibold">
                  ✓ {isAr ? 'مزامنة مع Google Sheets معتمدة' : 'Sync to Google Sheets authorized'}
                </p>
              )}
            </div>

            <div className="flex items-center justify-end gap-2.5">
              <button
                onClick={() => setShowConfirmModal(false)}
                className="px-4 py-2 rounded-xl text-slate-600 hover:bg-slate-100 text-xs font-bold transition"
              >
                {isAr ? 'تراجع وتعديل' : 'Cancel'}
              </button>
              <button
                onClick={handleExecuteSubmit}
                className="px-5 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold shadow-md transition flex items-center gap-1.5"
              >
                <CheckCircle className="w-4 h-4" />
                <span>{isAr ? 'تأكيد الحفظ والإرسال' : 'Confirm & Proceed'}</span>
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
