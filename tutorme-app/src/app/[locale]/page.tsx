/**
 * Solocorn Landing Page - Coming Soon Mode with i18n
 * Landing page with early bird signup, special developer access, and language selector
 */

'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  UserPlus, 
  GraduationCap, 
  School, 
  Building2, 
  Mail, 
  ArrowRight,
  ChevronRight,
  X,
  Lock,
  CheckCircle,
  Sparkles,
  Globe,
  Atom,
  Hexagon,
  Triangle,
  Circle,
  Square
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

// --- Types ---
type ModalType = 'register' | 'tutor' | 'academy' | 'schools' | null;
type Language = 'en' | 'zh-CN' | 'zh-HK' | 'es' | 'fr' | 'de' | 'ja' | 'ko';

interface EarlyBirdForm {
  email: string;
  name: string;
}

interface Translations {
  [key: string]: {
    [lang in Language]: string;
  };
}

// --- Translations ---
const translations: Translations = {
  // Navbar
  brandName: {
    'en': 'SOLOCORN',
    'zh-CN': 'SOLOCORN',
    'zh-HK': 'SOLOCORN',
    'es': 'SOLOCORN',
    'fr': 'SOLOCORN',
    'de': 'SOLOCORN',
    'ja': 'SOLOCORN',
    'ko': 'SOLOCORN',
  },
  register: {
    'en': 'Register',
    'zh-CN': '注册',
    'zh-HK': '註冊',
    'es': 'Registrarse',
    'fr': 'S\'inscrire',
    'de': 'Registrieren',
    'ja': '登録',
    'ko': '등록',
  },
  
  // Hero Section
  comingSoon: {
    'en': 'Coming Soon',
    'zh-CN': '即将推出',
    'zh-HK': '即將推出',
    'es': 'Próximamente',
    'fr': 'Bientôt disponible',
    'de': 'Demnächst verfügbar',
    'ja': 'まもなく公開',
    'ko': '곧 출시',
  },
  launch: {
    'en': 'Launch',
    'zh-CN': '启动',
    'zh-HK': '啟動',
    'es': 'Lanzar',
    'fr': 'Lancer',
    'de': 'Starten',
    'ja': 'ローンチ',
    'ko': '출시',
  },
  getEarlyAccess: {
    'en': 'Get Early Access',
    'zh-CN': '获取抢先体验',
    'zh-HK': '獲取搶先體驗',
    'es': 'Obtener acceso anticipado',
    'fr': 'Obtenir un accès anticipé',
    'de': 'Frühen Zugang erhalten',
    'ja': '早期アクセスを取得',
    'ko': '얼리 액세스 받기',
  },
  
  // Tutor Section
  solocornTutors: {
    'en': 'Solocorn Tutors',
    'zh-CN': 'Solocorn 导师',
    'zh-HK': 'Solocorn 導師',
    'es': 'Tutores de Solocorn',
    'fr': 'Tuteurs Solocorn',
    'de': 'Solocorn-Tutoren',
    'ja': 'Solocorn チューター',
    'ko': 'Solocorn 튜터',
  },
  tutorCohortDescription: {
    'en': 'Our celebrity tutor cohort is ready to transform your learning.',
    'zh-CN': '我们的明星导师团队已准备好改变您的学习方式。',
    'zh-HK': '我哋嘅明星導師團隊已準備好改變你嘅學習方式。',
    'es': 'Nuestro grupo de tutores celebridades está listo para transformar su aprendizaje.',
    'fr': 'Notre cohorte de tuteurs célèbres est prête à transformer votre apprentissage.',
    'de': 'Unsere Star-Tutoren sind bereit, Ihr Lernen zu transformieren.',
    'ja': '有名人チューターコホートがあなたの学習を変革する準備ができています。',
    'ko': '저희의 유명인 튜터 코호트가 귀하의 학습을 혁신할 준비가 되었습니다.',
  },
  viewAll: {
    'en': 'View All',
    'zh-CN': '查看全部',
    'zh-HK': '查看全部',
    'es': 'Ver todo',
    'fr': 'Voir tout',
    'de': 'Alle ansehen',
    'ja': 'すべて表示',
    'ko': '모두 보기',
  },
  
  // Special Access
  specialAccess: {
    'en': 'I have special access',
    'zh-CN': '我有特殊访问权限',
    'zh-HK': '我有特殊訪問權限',
    'es': 'Tengo acceso especial',
    'fr': 'J\'ai un accès spécial',
    'de': 'Ich habe einen besonderen Zugang',
    'ja': '特別アクセス権を持っています',
    'ko': '특별 액세스 권한이 있습니다',
  },
  enterCode: {
    'en': 'Enter code',
    'zh-CN': '输入代码',
    'zh-HK': '輸入代碼',
    'es': 'Ingresar código',
    'fr': 'Entrer le code',
    'de': 'Code eingeben',
    'ja': 'コードを入力',
    'ko': '코드 입력',
  },
  access: {
    'en': 'Access',
    'zh-CN': '访问',
    'zh-HK': '訪問',
    'es': 'Acceder',
    'fr': 'Accéder',
    'de': 'Zugang',
    'ja': 'アクセス',
    'ko': '액세스',
  },
  invalidCode: {
    'en': 'Invalid access code',
    'zh-CN': '无效的访问代码',
    'zh-HK': '無效嘅訪問代碼',
    'es': 'Código de acceso inválido',
    'fr': 'Code d\'accès invalide',
    'de': 'Ungültiger Zugangscode',
    'ja': '無効なアクセスコード',
    'ko': '잘못된 액세스 코드',
  },
  
  // Action Cards
  becomeTutor: {
    'en': 'Become a Solocorn Tutor',
    'zh-CN': '成为 Solocorn 导师',
    'zh-HK': '成為 Solocorn 導師',
    'es': 'Conviértete en tutor de Solocorn',
    'fr': 'Devenez tuteur Solocorn',
    'de': 'Werden Sie Solocorn-Tutor',
    'ja': 'Solocorn チューターになる',
    'ko': 'Solocorn 튜터 되기',
  },
  becomeTutorDesc: {
    'en': 'Join our elite network of educators and reach students worldwide.',
    'zh-CN': '加入我们的精英教育者网络，触达全球学生。',
    'zh-HK': '加入我哋嘅精英教育者網絡，觸達全球學生。',
    'es': 'Únase a nuestra red de educadores de élite y llegue a estudiantes de todo el mundo.',
    'fr': 'Rejoignez notre réseau d\'éducateurs d\'élite et touchez des étudiants du monde entier.',
    'de': 'Treten Sie unserem Netzwerk von Elite-Bildungsexperten bei und erreichen Sie Studenten weltweit.',
    'ja': 'エリート教育者ネットワークに参加し、世界中の学生にリーチしましょう。',
    'ko': '엘리트 교육자 네트워크에 참여하여 전 세계 학생들에게 다가가세요.',
  },
  applyToTeach: {
    'en': 'Apply to Teach',
    'zh-CN': '申请教学',
    'zh-HK': '申請教學',
    'es': 'Aplicar para enseñar',
    'fr': 'Postuler pour enseigner',
    'de': 'Bewerben Sie sich zum Unterrichten',
    'ja': '教師として応募',
    'ko': '교사 지원',
  },
  startAcademy: {
    'en': 'Start a Solocorn Academy',
    'zh-CN': '开办 Solocorn 学院',
    'zh-HK': '開辦 Solocorn 學院',
    'es': 'Iniciar una academia Solocorn',
    'fr': 'Démarrer une académie Solocorn',
    'de': 'Gründen Sie eine Solocorn-Akademie',
    'ja': 'Solocorn アカデミーを始める',
    'ko': 'Solocorn 아카데미 시작',
  },
  startAcademyDesc: {
    'en': 'Build your own branded learning institution on our infrastructure.',
    'zh-CN': '在我们的基础设施上建立您自己的品牌学习机构。',
    'zh-HK': '在我哋嘅基礎設施上建立你自己嘅品牌學習機構。',
    'es': 'Construya su propia institución de aprendizaje de marca en nuestra infraestructura.',
    'fr': 'Construisez votre propre institution d\'apprentissage de marque sur notre infrastructure.',
    'de': 'Bauen Sie Ihre eigene Markenlerninstitution auf unserer Infrastruktur auf.',
    'ja': '私たちのインフラストラクチャ上に独自のブランド学習機関を構築してください。',
    'ko': '우리의 인프라에서 자신만의 브랜드 학습 기관을 구축하세요.',
  },
  launchAcademy: {
    'en': 'Launch Academy',
    'zh-CN': '启动学院',
    'zh-HK': '啟動學院',
    'es': 'Lanzar academia',
    'fr': 'Lancer l\'académie',
    'de': 'Akademie starten',
    'ja': 'アカデミーをローンチ',
    'ko': '아카데미 출시',
  },
  solocornSchools: {
    'en': 'Solocorn Schools',
    'zh-CN': 'Solocorn 学校',
    'zh-HK': 'Solocorn 學校',
    'es': 'Escuelas Solocorn',
    'fr': 'Écoles Solocorn',
    'de': 'Solocorn-Schulen',
    'ja': 'Solocorn スクール',
    'ko': 'Solocorn 스쿨',
  },
  schoolsDesc: {
    'en': 'Integrated solutions for K-12 and higher education institutions.',
    'zh-CN': '为K-12和高等教育机构提供集成解决方案。',
    'zh-HK': '為K-12同高等教育機構提供集成解決方案。',
    'es': 'Soluciones integradas para instituciones educativas K-12 y superiores.',
    'fr': 'Solutions intégrées pour les institutions d\'enseignement K-12 et supérieur.',
    'de': 'Integrierte Lösungen für K-12 und Hochschulen.',
    'ja': 'K-12および高等教育機関向けの統合ソリューション。',
    'ko': 'K-12 및 고등 교육 기관을 위한 통합 솔루션.',
  },
  partnerWithUs: {
    'en': 'Partner with Us',
    'zh-CN': '与我们合作',
    'zh-HK': '與我哋合作',
    'es': 'Asociarse con nosotros',
    'fr': 'Devenir partenaire',
    'de': 'Partner werden',
    'ja': 'パートナーになる',
    'ko': '파트너 되기',
  },
  
  // Business Section
  businessInquiries: {
    'en': 'Business and Licensing Inquiries',
    'zh-CN': '商业和许可咨询',
    'zh-HK': '商業同許可諮詢',
    'es': 'Consultas comerciales y de licencias',
    'fr': 'Demandes commerciales et de licence',
    'de': 'Geschäfts- und Lizenzanfragen',
    'ja': 'ビジネスおよびライセンスに関するお問い合わせ',
    'ko': '비즈니스 및 라이선스 문의',
  },
  businessDesc: {
    'en': 'Interested in bringing Solocorn to your organization? We offer enterprise-grade licensing and custom integration services.',
    'zh-CN': '有兴趣将 Solocorn 引入您的组织？我们提供企业级许可和定制集成服务。',
    'zh-HK': '有興趣將 Solocorn 引入你嘅組織？我哋提供企業級許可同定制集成服務。',
    'es': '¿Interesado en llevar Solocorn a su organización? Ofrecemos licencias de nivel empresarial y servicios de integración personalizados.',
    'fr': 'Intéressé à apporter Solocorn à votre organisation? Nous proposons des licences de niveau entreprise et des services d\'intégration personnalisés.',
    'de': 'Interessiert, Solocorn in Ihre Organisation zu bringen? Wir bieten Enterprise-Lizenzen und maßgeschneiderte Integrationsdienste an.',
    'ja': 'Solocorn を貴社に導入することにご興味がありますか？エンタープライズグレードのライセンスとカスタム統合サービスを提供しています。',
    'ko': 'Solocorn을 귀하의 조직에 도입하는 데 관심이 있으신가요? 엔터프라이즈급 라이선스 및 맞춤형 통합 서비스를 제공합니다.',
  },
  contact: {
    'en': 'Contact',
    'zh-CN': '联系',
    'zh-HK': '聯繫',
    'es': 'Contactar',
    'fr': 'Contacter',
    'de': 'Kontakt',
    'ja': 'お問い合わせ',
    'ko': '문의',
  },
  
  // Footer
  privacyPolicy: {
    'en': 'Privacy Policy',
    'zh-CN': '隐私政策',
    'zh-HK': '隱私政策',
    'es': 'Política de privacidad',
    'fr': 'Politique de confidentialité',
    'de': 'Datenschutzrichtlinie',
    'ja': 'プライバシーポリシー',
    'ko': '개인정보 처리방침',
  },
  termsOfService: {
    'en': 'Terms of Service',
    'zh-CN': '服务条款',
    'zh-HK': '服務條款',
    'es': 'Términos de servicio',
    'fr': 'Conditions d\'utilisation',
    'de': 'Nutzungsbedingungen',
    'ja': '利用規約',
    'ko': '서비스 약관',
  },
  allRightsReserved: {
    'en': '© 2026 Solocorn. All rights reserved.',
    'zh-CN': '© 2026 Solocorn。保留所有权利。',
    'zh-HK': '© 2026 Solocorn。保留所有權利。',
    'es': '© 2026 Solocorn. Todos los derechos reservados.',
    'fr': '© 2026 Solocorn. Tous droits réservés.',
    'de': '© 2026 Solocorn. Alle Rechte vorbehalten.',
    'ja': '© 2026 Solocorn. All rights reserved.',
    'ko': '© 2026 Solocorn. 모든 권리 보유.',
  },
  
  // Modal Content
  beFirst: {
    'en': 'Be the first to experience Solocorn',
    'zh-CN': '成为首批体验 Solocorn 的用户',
    'zh-HK': '成為首批體驗 Solocorn 嘅用戶',
    'es': 'Sé el primero en experimentar Solocorn',
    'fr': 'Soyez le premier à découvrir Solocorn',
    'de': 'Seien Sie der Erste, der Solocorn erlebt',
    'ja': 'Solocorn を最初に体験する',
    'ko': 'Solocorn을 가장 먼저 경험하세요',
  },
  modalDescRegister: {
    'en': 'We\'re putting the finishing touches on our platform. Leave your details and we\'ll notify you when we launch.',
    'zh-CN': '我们正在为平台做最后的润色。留下您的详细信息，我们将在启动时通知您。',
    'zh-HK': '我哋正喺為平台做最後嘅潤色。留下你嘅詳細資料，我哋將喺啟動時通知你。',
    'es': 'Estamos dando los toques finales a nuestra plataforma. Deje sus datos y le notificaremos cuando lancemos.',
    'fr': 'Nous apportons la touche finale à notre plateforme. Laissez vos coordonnées et nous vous notifierons au lancement.',
    'de': 'Wir geben unserer Plattform den letzten Schliff. Hinterlassen Sie Ihre Daten und wir benachrichtigen Sie beim Start.',
    'ja': 'プラットフォームに最後の仕上げをしています。詳細を残していただければ、ローンチ時にお知らせします。',
    'ko': '플랫폼에 마지막 터치를 하고 있습니다. 세부 정보를 남겨주시면 출시 시 알려드리겠습니다.',
  },
  notifyMe: {
    'en': 'Notify Me',
    'zh-CN': '通知我',
    'zh-HK': '通知我',
    'es': 'Notificarme',
    'fr': 'Me notifier',
    'de': 'Benachrichtige mich',
    'ja': '通知する',
    'ko': '알림 받기',
  },
  thankYou: {
    'en': 'Thank You!',
    'zh-CN': '谢谢您！',
    'zh-HK': '多謝你！',
    'es': '¡Gracias!',
    'fr': 'Merci !',
    'de': 'Danke!',
    'ja': 'ありがとうございます！',
    'ko': '감사합니다!',
  },
  successMessageRegister: {
    'en': 'You\'re on the list! We\'ll be in touch soon.',
    'zh-CN': '您已在名单中！我们很快会与您联系。',
    'zh-HK': '你已喺名單入面！我哋好快會同你聯繫。',
    'es': '¡Estás en la lista! Nos pondremos en contacto pronto.',
    'fr': 'Vous êtes sur la liste ! Nous vous contacterons bientôt.',
    'de': 'Sie sind auf der Liste! Wir werden uns bald melden.',
    'ja': 'リストに登録されました！まもなくご連絡いたします。',
    'ko': '명단에 올랐습니다! 곧 연락드리겠습니다.',
  },
  close: {
    'en': 'Close',
    'zh-CN': '关闭',
    'zh-HK': '閂閉',
    'es': 'Cerrar',
    'fr': 'Fermer',
    'de': 'Schließen',
    'ja': '閉じる',
    'ko': '닫기',
  },
  yourName: {
    'en': 'Your name',
    'zh-CN': '您的姓名',
    'zh-HK': '你嘅姓名',
    'es': 'Su nombre',
    'fr': 'Votre nom',
    'de': 'Ihr Name',
    'ja': 'お名前',
    'ko': '이름',
  },
  emailAddress: {
    'en': 'Email address',
    'zh-CN': '电子邮件地址',
    'zh-HK': '電郵地址',
    'es': 'Dirección de correo electrónico',
    'fr': 'Adresse e-mail',
    'de': 'E-Mail-Adresse',
    'ja': 'メールアドレス',
    'ko': '이메일 주소',
  },
  privacyNote: {
    'en': 'We respect your privacy. Unsubscribe anytime.',
    'zh-CN': '我们尊重您的隐私。随时可以取消订阅。',
    'zh-HK': '我哋尊重你嘅隱私。隨時可以取消訂閱。',
    'es': 'Respetamos su privacidad. Cancele la suscripción en cualquier momento.',
    'fr': 'Nous respectons votre vie privée. Désabonnez-vous à tout moment.',
    'de': 'Wir respektieren Ihre Privatsphäre. Jederzeit abbestellen.',
    'ja': 'プライバシーを尊重します。いつでも購読を解除できます。',
    'ko': '개인정보를 존중합니다. 언제든지 구독을 취소할 수 있습니다.',
  },
  joinWaitlist: {
    'en': 'Join Waitlist',
    'zh-CN': '加入等待列表',
    'zh-HK': '加入等待列表',
    'es': 'Unirse a la lista de espera',
    'fr': 'Rejoindre la liste d\'attente',
    'de': 'Warteliste beitreten',
    'ja': 'ウェイトリストに参加',
    'ko': '대기 목록 참여',
  },
  expressInterest: {
    'en': 'Express Interest',
    'zh-CN': '表达兴趣',
    'zh-HK': '表達興趣',
    'es': 'Expresar interés',
    'fr': 'Exprimer son intérêt',
    'de': 'Interesse bekunden',
    'ja': '興味を表明',
    'ko': '관심 표현',
  },
};

// --- Mock Data ---
const CELEBRITY_TUTORS = [
  { name: "Dr. Aris", subject: "Quantum Physics", image: "https://picsum.photos/seed/tutor1/400/400" },
  { name: "Sarah Jenkins", subject: "Creative Writing", image: "https://picsum.photos/seed/tutor2/400/400" },
  { name: "Chef Marco", subject: "Culinary Arts", image: "https://picsum.photos/seed/tutor3/400/400" },
  { name: "Elena Rossi", subject: "Digital Marketing", image: "https://picsum.photos/seed/tutor4/400/400" },
  { name: "Prof. Zhang", subject: "Mandarin", image: "https://picsum.photos/seed/tutor5/400/400" },
  { name: "David Miller", subject: "Financial Literacy", image: "https://picsum.photos/seed/tutor6/400/400" },
];

const SPECIAL_CODES = ['kim.kon#26', 'stephen#26'];

const LANGUAGES: { code: Language; name: string; flag: string }[] = [
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'zh-CN', name: '简体中文 (Mandarin)', flag: '🇨🇳' },
  { code: 'zh-HK', name: '繁體中文 (Cantonese)', flag: '🇭🇰' },
  { code: 'es', name: 'Español', flag: '🇪🇸' },
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
  { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
  { code: 'ja', name: '日本語', flag: '🇯🇵' },
  { code: 'ko', name: '한국어', flag: '🇰🇷' },
];

// --- Background Animation Components ---

const GridFloor = () => (
  <div className="absolute inset-0 overflow-hidden">
    <div className="absolute bottom-0 left-0 right-0 h-2/3 origin-bottom" style={{ transform: 'perspective(500px) rotateX(60deg)' }}>
      <motion.div className="w-full h-[200%]" style={{ backgroundImage: 'linear-gradient(to right, rgba(16, 185, 129, 0.2) 1px, transparent 1px), linear-gradient(to bottom, rgba(16, 185, 129, 0.2) 1px, transparent 1px)', backgroundSize: '60px 60px' }} animate={{ y: ['0%', '60px'] }} transition={{ duration: 2, repeat: Infinity, ease: 'linear' }} />
    </div>
  </div>
);

const FloatingSymbol = ({ symbol, x, y, delay }: { symbol: string; x: string; y: string; delay: number }) => (
  <motion.div className="absolute text-emerald-400/30 font-bold select-none pointer-events-none" style={{ left: x, top: y, fontSize: '3rem', textShadow: '0 0 20px rgba(16, 185, 129, 0.5)' }} animate={{ y: [-15, 15, -15], opacity: [0.3, 0.6, 0.3], rotate: [0, 5, -5, 0] }} transition={{ duration: 4, delay, repeat: Infinity, ease: 'easeInOut' }}>
    {symbol}
  </motion.div>
);

const FloatingShape = ({ Icon, x, y, delay }: { Icon: any; x: string; y: string; delay: number }) => (
  <motion.div className="absolute pointer-events-none" style={{ left: x, top: y }} animate={{ y: [-20, 20, -20], rotate: [0, 360] }} transition={{ duration: 12, delay, repeat: Infinity, ease: 'linear' }}>
    <div className="w-12 h-12 border-2 border-emerald-500/30 bg-emerald-500/10 rounded-lg backdrop-blur-sm shadow-lg shadow-emerald-500/20 flex items-center justify-center">
      <Icon className="w-6 h-6 text-emerald-400/50" />
    </div>
  </motion.div>
);

const AtomOrbit = ({ x, y, size, duration }: { x: string; y: string; size: number; duration: number }) => (
  <div className="absolute pointer-events-none" style={{ left: x, top: y, transform: 'translate(-50%, -50%)' }}>
    <div className="absolute w-2 h-2 bg-emerald-400 rounded-full shadow-lg shadow-emerald-500/50 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10" />
    <motion.div className="absolute border border-emerald-500/20 rounded-full" style={{ width: size, height: size, left: -size / 2, top: -size / 2 }} animate={{ rotate: 360 }} transition={{ duration, repeat: Infinity, ease: 'linear' }}>
      <div className="absolute w-1.5 h-1.5 bg-cyan-400 rounded-full shadow-lg shadow-cyan-500/50 -top-0.5 left-1/2 -translate-x-1/2" />
    </motion.div>
  </div>
);

const GlowingOrb = ({ x, y, color, size, delay }: { x: string; y: string; color: string; size: string; delay: number }) => (
  <motion.div className={`absolute rounded-full blur-3xl pointer-events-none ${color}`} style={{ left: x, top: y, width: size, height: size }} animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }} transition={{ duration: 4, delay, repeat: Infinity, ease: 'easeInOut' }} />
);

const ShootingStar = ({ delay, top }: { delay: number; top: string }) => (
  <motion.div className="absolute h-px bg-gradient-to-r from-transparent via-emerald-400 to-transparent pointer-events-none" style={{ width: '100px', top, left: '-100px' }} animate={{ left: ['-10%', '110%'], opacity: [0, 1, 0] }} transition={{ duration: 1.5, delay, repeat: Infinity, repeatDelay: 5, ease: 'easeOut' }} />
);

const FuturisticBackground = () => (
  <div className="fixed inset-0 -z-10 overflow-hidden bg-gradient-to-br from-slate-950 via-zinc-950 to-slate-900">
    <GridFloor />
    <FloatingSymbol symbol="∑" x="10%" y="20%" delay={0} />
    <FloatingSymbol symbol="π" x="85%" y="15%" delay={1} />
    <FloatingSymbol symbol="∫" x="75%" y="70%" delay={2} />
    <FloatingSymbol symbol="√" x="15%" y="75%" delay={0.5} />
    <FloatingSymbol symbol="∞" x="50%" y="10%" delay={1.5} />
    <FloatingSymbol symbol="∆" x="90%" y="50%" delay={2.5} />
    <FloatingSymbol symbol="Ω" x="5%" y="50%" delay={3} />
    <FloatingSymbol symbol="λ" x="60%" y="80%" delay={0.8} />
    <FloatingShape Icon={Square} x="20%" y="30%" delay={0} />
    <FloatingShape Icon={Circle} x="70%" y="25%" delay={2} />
    <FloatingShape Icon={Triangle} x="80%" y="60%" delay={4} />
    <FloatingShape Icon={Hexagon} x="25%" y="65%" delay={1} />
    <FloatingShape Icon={Atom} x="50%" y="40%" delay={3} />
    <AtomOrbit x="30%" y="35%" size={120} duration={10} />
    <AtomOrbit x="70%" y="55%" size={150} duration={14} />
    <AtomOrbit x="45%" y="75%" size={100} duration={8} />
    <GlowingOrb x="20%" y="20%" color="bg-emerald-500/20" size="300px" delay={0} />
    <GlowingOrb x="70%" y="60%" color="bg-cyan-500/20" size="250px" delay={1} />
    <GlowingOrb x="40%" y="40%" color="bg-purple-500/10" size="400px" delay={2} />
    <ShootingStar delay={0} top="15%" />
    <ShootingStar delay={3} top="35%" />
    <ShootingStar delay={6} top="55%" />
  </div>
);

// --- Components ---

const LanguageSelector = ({ currentLang, onChange }: { currentLang: Language; onChange: (lang: Language) => void }) => {
  const [isOpen, setIsOpen] = useState(false);
  const currentLangData = LANGUAGES.find(l => l.code === currentLang);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 transition-colors text-sm"
      >
        <Globe className="w-4 h-4" />
        <span>{currentLangData?.flag}</span>
        <span className="hidden sm:inline">{currentLangData?.name}</span>
        <ChevronRight className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-90' : ''}`} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute right-0 top-full mt-2 w-56 bg-zinc-900/95 backdrop-blur-xl border border-white/10 rounded-xl shadow-2xl z-50 overflow-hidden"
            >
              {LANGUAGES.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => {
                    onChange(lang.code);
                    setIsOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-white/5 transition-colors ${currentLang === lang.code ? 'bg-emerald-500/10 text-emerald-400' : 'text-white'}`}
                >
                  <span className="text-lg">{lang.flag}</span>
                  <span className="text-sm">{lang.name}</span>
                  {currentLang === lang.code && <CheckCircle className="w-4 h-4 ml-auto" />}
                </button>
              ))}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

const CountdownTimer = () => {
  const [timeLeft, setTimeLeft] = useState({ days: 12, hours: 5, minutes: 45, seconds: 30 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, seconds: 59, minutes: prev.minutes - 1 };
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex gap-4 md:gap-8 justify-center items-center font-mono">
      {Object.entries(timeLeft).map(([unit, value]) => (
        <div key={unit} className="flex flex-col items-center">
          <div className="text-4xl md:text-6xl font-bold text-white tabular-nums drop-shadow-lg">{value.toString().padStart(2, '0')}</div>
          <div className="text-xs uppercase tracking-widest text-zinc-500 mt-2">{unit}</div>
        </div>
      ))}
    </div>
  );
};

const TutorStrip = () => (
  <div className="relative overflow-hidden py-12 border-y border-white/5 bg-white/[0.02]">
    <div className="flex animate-marquee whitespace-nowrap">
      {[...CELEBRITY_TUTORS, ...CELEBRITY_TUTORS].map((tutor, i) => (
        <div key={i} className="inline-flex items-center mx-8 group">
          <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-emerald-500/30 mr-4 group-hover:border-emerald-400 transition-colors">
            <img src={tutor.image} alt={tutor.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
          </div>
          <div>
            <div className="text-lg font-bold text-white">{tutor.name}</div>
            <div className="text-sm text-zinc-500">{tutor.subject}</div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

const ComingSoonModal = ({ isOpen, onClose, type, lang }: { isOpen: boolean; onClose: () => void; type: ModalType; lang: Language }) => {
  const [formData, setFormData] = useState<EarlyBirdForm>({ email: '', name: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Early bird signup:', { type, ...formData });
    setSubmitted(true);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[100] flex items-center justify-center p-4">
        <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose} />
        <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }} className="relative w-full max-w-md bg-zinc-900/90 backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-2xl">
          <button onClick={onClose} className="absolute top-4 right-4 p-2 text-zinc-400 hover:text-white transition-colors"><X className="w-5 h-5" /></button>

          {!submitted ? (
            <>
              <div className="text-center mb-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium mb-4">
                  <Sparkles className="w-3 h-3" />
                  {translations.comingSoon[lang]}
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">{type === 'tutor' ? translations.becomeTutor[lang] : type === 'academy' ? translations.startAcademy[lang] : type === 'schools' ? translations.solocornSchools[lang] : translations.comingSoon[lang]}</h3>
                <p className="text-emerald-400 text-sm">{translations.beFirst[lang]}</p>
              </div>
              <p className="text-zinc-400 text-sm text-center mb-6">{translations.modalDescRegister[lang]}</p>
              <form onSubmit={handleSubmit} className="space-y-4">
                <Input type="text" placeholder={translations.yourName[lang]} value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} required className="w-full bg-white/5 border-white/10 text-white placeholder:text-zinc-500" />
                <Input type="email" placeholder={translations.emailAddress[lang]} value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} required className="w-full bg-white/5 border-white/10 text-white placeholder:text-zinc-500" />
                <Button type="submit" className="w-full py-3 bg-emerald-500 hover:bg-emerald-400 text-white font-semibold rounded-xl">{type === 'tutor' ? translations.applyToTeach[lang] : type === 'academy' ? translations.launchAcademy[lang] : type === 'schools' ? translations.partnerWithUs[lang] : translations.notifyMe[lang]}</Button>
              </form>
              <p className="text-xs text-zinc-500 text-center mt-4">{translations.privacyNote[lang]}</p>
            </>
          ) : (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-4"><CheckCircle className="w-8 h-8 text-emerald-400" /></div>
              <h3 className="text-xl font-bold text-white mb-2">{translations.thankYou[lang]}</h3>
              <p className="text-zinc-400">{translations.successMessageRegister[lang]}</p>
              <Button onClick={onClose} className="mt-6 bg-white/10 hover:bg-white/20 text-white">{translations.close[lang]}</Button>
            </div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

const SpecialAccessSection = ({ lang }: { lang: Language }) => {
  const [code, setCode] = useState('');
  const [error, setError] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (SPECIAL_CODES.includes(code.trim())) {
      router.push('/login');
    } else {
      setError(true);
      setTimeout(() => setError(false), 2000);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-6 mb-16">
      <div className="bg-gradient-to-r from-emerald-900/30 to-zinc-900/50 border border-emerald-500/20 rounded-2xl p-6 backdrop-blur-sm">
        <button onClick={() => setExpanded(!expanded)} className="w-full flex items-center justify-between text-left">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-emerald-500/20 rounded-xl flex items-center justify-center"><Lock className="w-5 h-5 text-emerald-400" /></div>
            <h3 className="font-semibold text-white">{translations.specialAccess[lang]}</h3>
          </div>
          <ChevronRight className={`w-5 h-5 text-zinc-400 transition-transform ${expanded ? 'rotate-90' : ''}`} />
        </button>
        <AnimatePresence>
          {expanded && (
            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
              <div className="pt-6 border-t border-white/10 mt-6">
                <p className="text-sm text-zinc-400 mb-4">{translations.enterCode[lang]}</p>
                <form onSubmit={handleSubmit} className="flex gap-3">
                  <Input type="password" placeholder={translations.enterCode[lang]} value={code} onChange={(e) => setCode(e.target.value)} className={`flex-1 bg-white/5 border-white/10 text-white placeholder:text-zinc-500 ${error ? 'border-red-500' : ''}`} />
                  <Button type="submit" className="bg-emerald-500 hover:bg-emerald-400 text-white px-6">{translations.access[lang]}</Button>
                </form>
                {error && <p className="text-red-400 text-sm mt-2">{translations.invalidCode[lang]}</p>}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

const ActionCard = ({ title, copy, buttonText, icon: Icon, onClick }: { title: string; copy: string; buttonText: string; icon: any; onClick: () => void }) => (
  <motion.div whileHover={{ y: -5 }} className="bg-zinc-900/60 backdrop-blur-md border border-white/10 p-8 rounded-2xl flex flex-col items-start justify-between h-full group hover:border-emerald-500/30 transition-colors">
    <div className="mb-6">
      <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center mb-6 group-hover:bg-emerald-500/20 transition-colors"><Icon className="w-6 h-6 text-emerald-400" /></div>
      <h3 className="text-2xl font-bold mb-3">{title}</h3>
      {copy && <p className="text-zinc-400 leading-relaxed">{copy}</p>}
    </div>
    <Button onClick={onClick} className="w-full py-3 px-6 rounded-xl bg-white text-black font-semibold hover:bg-emerald-400 transition-colors">{buttonText}</Button>
  </motion.div>
);

const Navbar = ({ onRegister, lang, onLanguageChange }: { onRegister: () => void; lang: Language; onLanguageChange: (lang: Language) => void }) => (
  <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-4">
    <div className="max-w-7xl mx-auto flex justify-between items-center bg-zinc-900/60 backdrop-blur-md border border-white/10 rounded-2xl px-6 py-3">
      <Link href="/" className="flex items-center gap-3">
        <img src="/images/logo.png" alt="Solocorn" className="h-8 w-auto" onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />
        <span className="text-2xl font-bold tracking-tighter">{translations.brandName[lang]}</span>
      </Link>
      <div className="flex items-center gap-3">
        <LanguageSelector currentLang={lang} onChange={onLanguageChange} />
        <Button onClick={onRegister} variant="outline" className="px-5 py-2 bg-white text-black rounded-lg text-sm font-bold hover:bg-emerald-400 transition-colors border-0">{translations.register[lang]}</Button>
      </div>
    </div>
  </nav>
);

// --- Main Page Component ---

export default function LandingPage() {
  const [modalType, setModalType] = useState<ModalType>(null);
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: string) => translations[key]?.[language] || translations[key]?.['en'] || key;

  return (
    <div className="min-h-screen text-zinc-100 relative">
      <FuturisticBackground />
      <Navbar onRegister={() => setModalType('register')} lang={language} onLanguageChange={setLanguage} />
      <ComingSoonModal isOpen={modalType !== null} onClose={() => setModalType(null)} type={modalType} lang={language} />

      <motion.main initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="pt-24 relative">
        {/* Hero Section */}
        <section className="px-6 py-20 md:py-32 text-center relative overflow-hidden">
          <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }}>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm font-medium mb-8 backdrop-blur-sm">
              <span className="relative flex h-2 w-2"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span><span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span></span>
              {t('comingSoon')}
            </div>
            <h1 className="text-6xl md:text-8xl font-bold tracking-tighter mb-12 drop-shadow-2xl">{t('launch')} <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">Solocorn</span></h1>
            <div className="mb-16"><CountdownTimer /></div>
            <Button onClick={() => setModalType('register')} className="group relative px-8 py-6 bg-white text-black rounded-2xl font-bold text-lg hover:bg-emerald-400 transition-all flex items-center gap-2 mx-auto shadow-lg shadow-emerald-500/20">
              {t('getEarlyAccess')}
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </motion.div>
        </section>

        {/* Tutor Strip */}
        <section className="mb-32">
          <div className="max-w-7xl mx-auto px-6 mb-8 flex justify-between items-end">
            <div>
              <h2 className="text-3xl font-bold drop-shadow-lg">{t('solocornTutors')}</h2>
              <p className="text-zinc-500">{t('tutorCohortDescription')}</p>
            </div>
            <button className="text-sm font-bold text-emerald-400 flex items-center gap-1 hover:underline">{t('viewAll')} <ChevronRight className="w-4 h-4" /></button>
          </div>
          <TutorStrip />
        </section>

        {/* Special Access */}
        <SpecialAccessSection lang={language} />

        {/* Action Grid */}
        <section className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-32">
          <ActionCard title={t('becomeTutor')} copy={t('becomeTutorDesc')} buttonText={t('applyToTeach')} icon={UserPlus} onClick={() => setModalType('tutor')} />
          <ActionCard title={t('startAcademy')} copy={t('startAcademyDesc')} buttonText={t('launchAcademy')} icon={GraduationCap} onClick={() => setModalType('academy')} />
          <ActionCard title={t('solocornSchools')} copy={t('schoolsDesc')} buttonText={t('partnerWithUs')} icon={School} onClick={() => setModalType('schools')} />
        </section>

        {/* Business Section */}
        <section className="max-w-7xl mx-auto px-6 mb-32">
          <div className="bg-zinc-900/60 backdrop-blur-md border border-emerald-500/10 p-12 rounded-[40px] flex flex-col md:flex-row items-center justify-between gap-12">
            <div className="max-w-xl">
              <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center mb-8"><Building2 className="w-8 h-8 text-white" /></div>
              <h2 className="text-4xl font-bold mb-6">{t('businessInquiries')}</h2>
              <p className="text-zinc-400 text-lg leading-relaxed mb-8">{t('businessDesc')}</p>
              <a href="mailto:support@solocorn.co" className="inline-flex items-center gap-3 px-8 py-4 bg-white/5 hover:bg-white/10 rounded-2xl font-bold transition-colors">
                <Mail className="w-5 h-5" />
                {t('contact')} support@solocorn.co
              </a>
            </div>
            <div className="w-full md:w-1/3 aspect-square bg-white/5 rounded-3xl flex items-center justify-center relative overflow-hidden border border-white/10">
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/20 to-transparent" />
              <Building2 className="w-32 h-32 text-white/10" />
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-white/5 py-20 px-6">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="text-2xl font-bold tracking-tighter">{t('brandName')}</div>
            <div className="flex gap-8 text-sm text-zinc-500">
              <Link href="/legal/privacy" className="hover:text-white transition-colors">{t('privacyPolicy')}</Link>
              <Link href="/legal/terms" className="hover:text-white transition-colors">{t('termsOfService')}</Link>
              <a href="mailto:support@solocorn.co" className="hover:text-white transition-colors">{t('contact')}</a>
            </div>
            <div className="text-sm text-zinc-600">{t('allRightsReserved')}</div>
          </div>
        </footer>
      </motion.main>

      <style jsx global>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 30s linear infinite;
        }
      `}</style>
    </div>
  );
}
