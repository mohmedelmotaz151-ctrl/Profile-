import React from 'react';
import { 
  Building2, 
  Target, 
  Eye, 
  Shield, 
  CheckCircle, 
  Zap, 
  Award, 
  Users 
} from 'lucide-react';
import { Language } from '../types';

interface AboutSectionProps {
  lang: Language;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ lang }) => {
  const isAr = lang === 'ar';

  const values = [
    {
      icon: Shield,
      titleAr: 'السلامة وحماية الأرواح أولاً',
      titleEn: 'Life Safety Paramount',
      descAr: 'الالتزام التام بتوفير بيئة عمل ومعيشة آمنة خالية من مخاطر الحريق.',
      descEn: 'Uncompromising dedication to securing hazard-free working and living environments.',
    },
    {
      icon: Award,
      titleAr: 'الجودة والامتثال القياسي',
      titleEn: 'Engineering Compliance',
      descAr: 'اعتماد منتجات ومعدات مطابقة لكود البناء السعودي SBC ومعايير NFPA وSASO.',
      descEn: 'Procurement and commissioning strictly adhering to SBC 801, NFPA and SASO standards.',
    },
    {
      icon: Zap,
      titleAr: 'السرعة والاستجابة الفورية',
      titleEn: '24/7 Rapid Readiness',
      descAr: 'فِرق صيانة وتدخل سريع مجهزة للاستجابة المباشرة لأي بلاغ طارئ على مدار الساعة.',
      descEn: 'Equipped emergency technical dispatch available 24/7 for swift trouble resolution.',
    },
    {
      icon: Users,
      titleAr: 'الشراكة والشفافية مع العميل',
      titleEn: 'Client Trust & Transparency',
      descAr: 'تقديم تقارير فنية دقيقة وتوصيات هندسية تسهم في ترشيد التكاليف وضمان الكفاءة.',
      descEn: 'Transparent technical reporting and actionable cost-effective recommendations.',
    },
  ];

  return (
    <section id="about" className="py-20 bg-white text-slate-800 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-red-100 text-red-700 text-xs font-bold uppercase tracking-wider mb-3">
            <Building2 className="w-3.5 h-3.5" />
            <span>{isAr ? 'الملخص التنفيذي وعن الشركة' : 'Executive Profile & About Orkeit'}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0B1E36] tracking-tight">
            {isAr 
              ? 'نبذة عن شركة أوريكيت للمقاولات العامة' 
              : 'About Orkeit General Contracting Co.'}
          </h2>
          <div className="w-20 h-1 bg-red-600 mx-auto mt-4 rounded-full"></div>
          <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed">
            {isAr 
              ? 'تأسست شركة أوريكيت للمقاولات العامة لتكون صرحاً هندسياً موثوقاً في قطاع مقاولات السلامة والوقاية ومكافحة الحريق في المملكة العربية السعودية.' 
              : 'Orkeit General Contracting was established as a premier specialized contractor delivering comprehensive fire safety, prevention, and building protection solutions in Saudi Arabia.'}
          </p>
        </div>

        {/* Narrative & Executive Summary Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-16">
          
          <div className="lg:col-span-7 space-y-6">
            <h3 className="text-2xl font-bold text-[#0B1E36]">
              {isAr ? 'ريادة هندسية في أنظمة الحماية المتكاملة' : 'Engineering Excellence in Turnkey Fire Protection'}
            </h3>
            
            <p className="text-slate-700 leading-relaxed text-justify">
              {isAr 
                ? 'تتميز شركة أوريكيت (Orkeit) بتقديم منظومة متكاملة من الخدمات المتخصصة في مجال السلامة الإنشائية ومكافحة الحرائق، بدءاً من دراسة المخططات وإجراء الحسابات الهيدروليكية، مروراً بالتوريد والتركيب والاختبار، ووصولاً إلى عقود الصيانة الدورية الشاملة وإصدار شهادات السلامة الفنية لمنصتي "سلامة" و"بلدي".'
                : 'Orkeit stands at the forefront of the safety and MEP contracting sector by providing a complete lifecycle: from architectural risk analysis and hydraulic sizing to equipment installation, commissioning, recurring preventive maintenance, and official licensing handovers on the Salamah portal.'}
            </p>

            <p className="text-slate-700 leading-relaxed text-justify">
              {isAr 
                ? 'نعمل وفق رؤية المملكة 2030 لتعزيز السلامة المهنية وتأمين المنشآت الحيوية والتجارية والصناعية والسكنية. يمتلك فريقنا من المهندسين والفنيين الخبرة العملية الواسعة في التعامل مع مختلف أنظمة الإطفاء المائي، الغازات النظيفة، أنظمة هود المطابخ، وشبكات الإنذار المعنونة المتطورة.'
                : 'In alignment with Saudi Vision 2030 to elevate infrastructure safety and commercial resilience, our multidisciplinary team of engineers and technicians brings proven expertise in managing complex water sprinkler networks, clean agent gaseous suppression, commercial kitchen hoods, and addressable alarm matrices.'}
            </p>

            <div className="grid grid-cols-2 gap-4 pt-2">
              <div className="flex items-start gap-2.5">
                <CheckCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
                <span className="text-sm font-semibold text-slate-800">
                  {isAr ? 'فريق هندسي متخصص ومعتمد' : 'Accredited Engineering Team'}
                </span>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
                <span className="text-sm font-semibold text-slate-800">
                  {isAr ? 'ورشة فحص وتعبئة طفايات متطورة' : 'State-of-the-art Refill Workshop'}
                </span>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
                <span className="text-sm font-semibold text-slate-800">
                  {isAr ? 'تأهيل سريع لرخص الدفاع المدني' : 'Swift Civil Defense Approvals'}
                </span>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
                <span className="text-sm font-semibold text-slate-800">
                  {isAr ? 'التزام صارم بمعايير SBC 801' : 'Rigid SBC 801 Compliance'}
                </span>
              </div>
            </div>
          </div>

          {/* Vision & Mission Cards */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Vision */}
            <div className="bg-gradient-to-br from-[#0B1E36] to-[#122b4d] rounded-2xl p-7 text-white shadow-xl border border-slate-700 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-red-600/10 rounded-full blur-2xl pointer-events-none" />
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-lg bg-red-600 flex items-center justify-center">
                  <Eye className="w-5 h-5 text-white" />
                </div>
                <h4 className="text-lg font-bold text-white">
                  {isAr ? 'رؤيتنا (Our Vision)' : 'Our Vision'}
                </h4>
              </div>
              <p className="text-sm text-slate-200 leading-relaxed">
                {isAr 
                  ? 'أن نكون الخيار الأول والأكثر موثوقية في المملكة لخدمات المقاولات العامة وأنظمة السلامة ومكافحة الحريق، من خلال ترسيخ أعلى معايير الجودة والاستدامة الهندسية وحماية الأرواح والممتلكات.'
                  : 'To be the most trusted and preferred partner across Saudi Arabia for general contracting and fire safety solutions, setting benchmarks in engineering quality, sustainability, and life protection.'}
              </p>
            </div>

            {/* Mission */}
            <div className="bg-slate-50 rounded-2xl p-7 text-slate-800 border-2 border-slate-200 shadow-md">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-lg bg-[#0B1E36] flex items-center justify-center">
                  <Target className="w-5 h-5 text-white" />
                </div>
                <h4 className="text-lg font-bold text-[#0B1E36]">
                  {isAr ? 'رسالتنا (Our Mission)' : 'Our Mission'}
                </h4>
              </div>
              <p className="text-sm text-slate-600 leading-relaxed">
                {isAr 
                  ? 'تقديم حلول هندسية وقائية متقدمة وخدمات صيانة استباقية وتوريد معدات معتمدة دولياً ومحلياً، تلبي احتياجات عملائنا وتضمن الامتثال الكامل لاشتراطات الدفاع المدني وكود البناء السعودي بأعلى كفاءة وأفضل تكلفة.'
                  : 'Delivering superior preventive engineering, predictive maintenance, and certified fire protection equipment that satisfy client requirements while guaranteeing total compliance with SBC and Civil Defense regulations.'}
              </p>
            </div>

          </div>

        </div>

        {/* Core Corporate Values */}
        <div className="pt-8">
          <div className="text-center mb-8">
            <h3 className="text-xl font-bold text-[#0B1E36]">
              {isAr ? 'قيمنا الجوهرية ومبادئ العمل' : 'Core Values & Operational Principles'}
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((val, idx) => {
              const IconComp = val.icon;
              return (
                <div 
                  key={idx}
                  className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm hover:shadow-md hover:border-red-400 transition-all group"
                >
                  <div className="w-12 h-12 rounded-xl bg-red-50 border border-red-200 flex items-center justify-center text-red-600 mb-4 group-hover:bg-red-600 group-hover:text-white transition duration-300">
                    <IconComp className="w-6 h-6" />
                  </div>
                  <h4 className="font-bold text-base text-[#0B1E36] mb-2">
                    {isAr ? val.titleAr : val.titleEn}
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {isAr ? val.descAr : val.descEn}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
};
