/**
 * Solocorn Landing Page - Coming Soon Mode with i18n and Themes
 * Landing page with early bird signup, special developer access, language selector, and theme system
 */

'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  UserPlus, 
  GraduationCap, 
  School, 
  Building2, 
  Mail, 
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
  Square,
  Sun,
  Moon,
  Palette,
  Send,
  MessageCircle,
  BookOpen,
  Calculator,
  FlaskConical,
  Languages,
  History,
  Map,
  Music,
  Palette as ArtIcon,
  Code,
  Trophy
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

// --- Types ---
type ModalType = 'register' | 'tutor' | 'academy' | 'schools' | null;
type Language = 'en' | 'zh-CN' | 'zh-HK' | 'es' | 'fr' | 'de' | 'ja' | 'ko' | 'pt' | 'hi';
type ThemeMode = 'light' | 'dark';
type ColorTheme = 'emerald' | 'ocean' | 'sunset' | 'galaxy';

interface EarlyBirdForm {
  email: string;
  name: string;
}

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  source?: string;
}

interface Translations {
  [key: string]: {
    [lang in Language]: string;
  };
}

// --- Theme Configurations ---
const THEMES: Record<ColorTheme, { name: string; icon: string; colors: { primary: string; secondary: string; accent: string; bg: string; surface: string; text: string; muted: string } }> = {
  emerald: {
    name: 'Emerald Dreams',
    icon: '🌿',
    colors: {
      primary: '#10b981',
      secondary: '#06b6d4',
      accent: '#8b5cf6',
      bg: 'from-slate-950 via-zinc-950 to-slate-900',
      surface: 'bg-zinc-900/60',
      text: 'text-zinc-100',
      muted: 'text-zinc-500',
    }
  },
  ocean: {
    name: 'Deep Ocean',
    icon: '🌊',
    colors: {
      primary: '#0ea5e9',
      secondary: '#6366f1',
      accent: '#ec4899',
      bg: 'from-slate-950 via-blue-950 to-slate-900',
      surface: 'bg-blue-950/60',
      text: 'text-blue-50',
      muted: 'text-blue-400/70',
    }
  },
  sunset: {
    name: 'Golden Sunset',
    icon: '🌅',
    colors: {
      primary: '#f59e0b',
      secondary: '#ef4444',
      accent: '#ec4899',
      bg: 'from-orange-950 via-red-950 to-slate-900',
      surface: 'bg-orange-950/60',
      text: 'text-orange-50',
      muted: 'text-orange-400/70',
    }
  },
  galaxy: {
    name: 'Cosmic Galaxy',
    icon: '🌌',
    colors: {
      primary: '#a855f7',
      secondary: '#ec4899',
      accent: '#3b82f6',
      bg: 'from-purple-950 via-fuchsia-950 to-slate-900',
      surface: 'bg-purple-950/60',
      text: 'text-purple-50',
      muted: 'text-purple-400/70',
    }
  },
};

// --- Categories Data ---
const CATEGORIES = [
  // Curriculums
  { id: 'ap', name: 'AP', icon: BookOpen, description: 'Advanced Placement', color: 'bg-red-500', category: 'Curriculums' },
  { id: 'ib', name: 'IB', icon: Trophy, description: 'International Baccalaureate', color: 'bg-emerald-500', category: 'Curriculums' },
  // Standardized Tests
  { id: 'ielts', name: 'IELTS', icon: Languages, description: 'International English Language Testing System', color: 'bg-blue-500', category: 'Standardized Tests' },
  { id: 'toefl', name: 'TOEFL', icon: Languages, description: 'Test of English as a Foreign Language', color: 'bg-indigo-500', category: 'Standardized Tests' },
  { id: 'sat', name: 'SAT', icon: Calculator, description: 'Scholastic Assessment Test', color: 'bg-orange-500', category: 'Standardized Tests' },
  // College Admission Exams
  { id: 'gre', name: 'GRE', icon: Calculator, description: 'Graduate Record Examination', color: 'bg-purple-500', category: 'College Admission Exams' },
  { id: 'gmat', name: 'GMAT', icon: Calculator, description: 'Graduate Management Admission Test', color: 'bg-cyan-500', category: 'College Admission Exams' },
];

// --- Translations ---
const translations: Translations = {
  // Navbar
  brandName: {
    'en': 'Solocorn.co', 'zh-CN': 'Solocorn.co', 'zh-HK': 'Solocorn.co', 'es': 'Solocorn.co', 'fr': 'Solocorn.co',
    'de': 'Solocorn.co', 'ja': 'Solocorn.co', 'ko': 'Solocorn.co', 'pt': 'Solocorn.co', 'hi': 'Solocorn.co',
  },
  register: {
    'en': 'Register', 'zh-CN': '注册', 'zh-HK': '註冊', 'es': 'Registrarse', 'fr': 'S\'inscrire',
    'de': 'Registrieren', 'ja': '登録', 'ko': '등록', 'pt': 'Registrar', 'hi': 'पंजीकरण',
  },
  
  // Hero Section
  comingSoon: {
    'en': 'Coming Soon', 'zh-CN': '即将推出', 'zh-HK': '即將推出', 'es': 'Próximamente', 'fr': 'Bientôt disponible',
    'de': 'Demnächst verfügbar', 'ja': 'まもなく公開', 'ko': '곧 출시', 'pt': 'Em breve', 'hi': 'जल्द आ रहा है',
  },
  launch: {
    'en': 'Launch', 'zh-CN': '启动', 'zh-HK': '啟動', 'es': 'Lanzar', 'fr': 'Lancer',
    'de': 'Starten', 'ja': 'ローンチ', 'ko': '출시', 'pt': 'Lançar', 'hi': 'लॉन्च',
  },
  
  // Tutor Section
  solocornTutors: {
    'en': 'Solocorn Tutors', 'zh-CN': 'Solocorn 导师', 'zh-HK': 'Solocorn 導師', 'es': 'Tutores de Solocorn', 'fr': 'Tuteurs Solocorn',
    'de': 'Solocorn-Tutoren', 'ja': 'Solocorn チューター', 'ko': 'Solocorn 튜터', 'pt': 'Tutores Solocorn', 'hi': 'Solocorn शिक्षक',
  },
  viewAllCategories: {
    'en': 'View all Categories', 'zh-CN': '查看所有类别', 'zh-HK': '查看所有類別', 'es': 'Ver todas las categorías', 'fr': 'Voir toutes les catégories',
    'de': 'Alle Kategorien anzeigen', 'ja': 'すべてのカテゴリを表示', 'ko': '모든 카테고리 보기', 'pt': 'Ver todas as categorias', 'hi': 'सभी श्रेणियाँ देखें',
  },
  
  // Special Access
  accessWithCode: {
    'en': 'Access with code', 'zh-CN': '使用代码访问', 'zh-HK': '使用代碼訪問', 'es': 'Acceso con código', 'fr': 'Accès avec code',
    'de': 'Zugang mit Code', 'ja': 'コードでアクセス', 'ko': '코드로 접근', 'pt': 'Acesso com código', 'hi': 'कोड के साथ पहुंच',
  },
  enterCode: {
    'en': 'Enter code', 'zh-CN': '输入代码', 'zh-HK': '輸入代碼', 'es': 'Ingresar código', 'fr': 'Entrer le code',
    'de': 'Code eingeben', 'ja': 'コードを入力', 'ko': '코드 입력', 'pt': 'Digite o código', 'hi': 'कोड दर्ज करें',
  },
  access: {
    'en': 'Access', 'zh-CN': '访问', 'zh-HK': '訪問', 'es': 'Acceder', 'fr': 'Accéder',
    'de': 'Zugang', 'ja': 'アクセス', 'ko': '액세스', 'pt': 'Acessar', 'hi': 'पहुंच',
  },
  invalidCode: {
    'en': 'Invalid access code', 'zh-CN': '无效的访问代码', 'zh-HK': '無效嘅訪問代碼', 'es': 'Código de acceso inválido', 'fr': 'Code d\'accès invalide',
    'de': 'Ungültiger Zugangscode', 'ja': '無効なアクセスコード', 'ko': '잘못된 액세스 코드', 'pt': 'Código de acesso inválido', 'hi': 'अमान्य पहुंच कोड',
  },
  
  // Action Cards
  becomeTutor: {
    'en': 'Pre-register to become a Solocorn Tutor', 'zh-CN': '预注册成为 Solocorn 导师', 'zh-HK': '預註冊成為 Solocorn 導師', 'es': 'Pre-regístrate para ser tutor de Solocorn', 'fr': 'Pré-inscrivez-vous pour devenir tuteur Solocorn',
    'de': 'Registrieren Sie sich vor, um Solocorn-Tutor zu werden', 'ja': 'Solocorn チューターになるための事前登録', 'ko': 'Solocorn 튜터 되기 사전 등록', 'pt': 'Pré-registre-se para ser Tutor Solocorn', 'hi': 'Solocorn शिक्षक बनने के लिए पूर्व-पंजीकरण',
  },
  becomeTutorDesc: {
    'en': 'Join our network of tutors and educators.',
    'zh-CN': '加入我们的精英教育者网络，触达全球学生。',
    'zh-HK': '加入我哋嘅精英教育者網絡，觸達全球學生。',
    'es': 'Únase a nuestra red de educadores de élite y llegue a estudiantes de todo el mundo.',
    'fr': 'Rejoignez notre réseau d\'éducateurs d\'élite et touchez des étudiants du monde entier.',
    'de': 'Treten Sie unserem Netzwerk von Elite-Bildungsexperten bei und erreichen Sie Studenten weltweit.',
    'ja': 'エリート教育者ネットワークに参加し、世界中の学生にリーチしましょう。',
    'ko': '엘리트 교육자 네트워크에 참여하여 전 세계 학생들에게 다가가세요.',
    'pt': 'Junte-se à nossa rede de educadores de elite e alcance estudantes em todo o mundo.',
    'hi': 'हमारे精英 शिक्षक नेटवर्क में शामिल हों और दुनियाभर के छात्रों तक पहुंचें।',
  },
  applyToTeach: {
    'en': 'Apply', 'zh-CN': '申请', 'zh-HK': '申請', 'es': 'Aplicar', 'fr': 'Postuler',
    'de': 'Bewerben', 'ja': '応募', 'ko': '지원', 'pt': 'Aplicar', 'hi': 'आवेदन',
  },
  startAcademy: {
    'en': 'Solocorn Academy', 'zh-CN': 'Solocorn 学院', 'zh-HK': 'Solocorn 學院', 'es': 'Academia Solocorn', 'fr': 'Académie Solocorn',
    'de': 'Solocorn-Akademie', 'ja': 'Solocorn アカデミー', 'ko': 'Solocorn 아카데미 시작', 'pt': 'Academia Solocorn', 'hi': 'Solocorn अकादमी',
  },
  startAcademyDesc: {
    'en': 'Host your tutors on our platform. Start a new academy.',
    'zh-CN': '在我们的基础设施上建立您自己的品牌学习机构。',
    'zh-HK': '在我哋嘅基礎設施上建立你自己嘅品牌學習機構。',
    'es': 'Construya su propia institución de aprendizaje de marca en nuestra infraestructura.',
    'fr': 'Construisez votre propre institution d\'apprentissage de marque sur notre infrastructure.',
    'de': 'Bauen Sie Ihre eigene Markenlerninstitution auf unserer Infrastruktur auf.',
    'ja': '私たちのインフラストラクチャ上に独自のブランド学習機関を構築してください。',
    'ko': '우리의 인프라에서 자신만의 브랜드 학습 기관을 구축하세요.',
    'pt': 'Construa sua própria instituição de aprendizagem de marca em nossa infraestrutura.',
    'hi': 'हमारे इंफ्रास्ट्रक्चर पर अपना खुद का ब्रांडेड लर्निंग संस्थान बनाएं।',
  },
  launchAcademy: {
    'en': 'Launch Academy', 'zh-CN': '启动学院', 'zh-HK': '啟動學院', 'es': 'Lanzar academia', 'fr': 'Lancer l\'académie',
    'de': 'Akademie starten', 'ja': 'アカデミーをローンチ', 'ko': '아카데미 출시', 'pt': 'Lançar Academia', 'hi': 'अकादमी लॉन्च करें',
  },
  solocornSchools: {
    'en': 'Solocorn Schools', 'zh-CN': 'Solocorn 学校', 'zh-HK': 'Solocorn 學校', 'es': 'Escuelas Solocorn', 'fr': 'Écoles Solocorn',
    'de': 'Solocorn-Schulen', 'ja': 'Solocorn スクール', 'ko': 'Solocorn 스쿨', 'pt': 'Escolas Solocorn', 'hi': 'Solocorn स्कूल',
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
    'pt': 'Soluções integradas para instituições educacionais K-12 e superior.',
    'hi': 'K-12 और उच्च शिक्षा संस्थानों के लिए एकीकृत समाधान।',
  },
  partnerWithUs: {
    'en': 'Inquire', 'zh-CN': '咨询', 'zh-HK': '諮詢', 'es': 'Consultar', 'fr': 'Renseignements',
    'de': 'Anfragen', 'ja': 'お問い合わせ', 'ko': '문의', 'pt': 'Consultar', 'hi': 'पूछताछ',
  },
  
  // Business Section
  businessInquiries: {
    'en': 'Business and Licensing Inquiries', 'zh-CN': '商业和许可咨询', 'zh-HK': '商業同許可諮詢', 'es': 'Consultas comerciales y de licencias', 'fr': 'Demandes commerciales et de licence',
    'de': 'Geschäfts- und Lizenzanfragen', 'ja': 'ビジネスおよびライセンスに関するお問い合わせ', 'ko': '비즈니스 및 라이선스 문의', 'pt': 'Consultas Comerciais e de Licenciamento', 'hi': 'व्यवसाय और लाइसेंसिंग पूछताछ',
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
    'pt': 'Interessado em trazer o Solocorn para sua organização? Oferecemos licenciamento corporativo e serviços de integração personalizados.',
    'hi': 'अपने संगठन में Solocorn लाने में रुचि रखते हैं? हम एंटरप्राइज-ग्रेड लाइसेंसिंग और कस्टम एकीकरण सेवाएं प्रदान करते हैं।',
  },
  contact: {
    'en': 'Contact', 'zh-CN': '联系', 'zh-HK': '聯繫', 'es': 'Contactar', 'fr': 'Contacter',
    'de': 'Kontakt', 'ja': 'お問い合わせ', 'ko': '문의', 'pt': 'Contato', 'hi': 'संपर्क',
  },
  
  // Footer
  footerBrand: {
    'en': 'Solocorn LLC', 'zh-CN': 'Solocorn LLC', 'zh-HK': 'Solocorn LLC', 'es': 'Solocorn LLC', 'fr': 'Solocorn LLC',
    'de': 'Solocorn LLC', 'ja': 'Solocorn LLC', 'ko': 'Solocorn LLC', 'pt': 'Solocorn LLC', 'hi': 'Solocorn LLC',
  },
  privacyPolicy: {
    'en': 'Privacy Policy', 'zh-CN': '隐私政策', 'zh-HK': '隱私政策', 'es': 'Política de privacidad', 'fr': 'Politique de confidentialité',
    'de': 'Datenschutzrichtlinie', 'ja': 'プライバシーポリシー', 'ko': '개인정보 처리방침', 'pt': 'Política de Privacidade', 'hi': 'गोपनीयता नीति',
  },
  termsOfService: {
    'en': 'Terms of Service', 'zh-CN': '服务条款', 'zh-HK': '服務條款', 'es': 'Términos de servicio', 'fr': 'Conditions d\'utilisation',
    'de': 'Nutzungsbedingungen', 'ja': '利用規約', 'ko': '서비스 약관', 'pt': 'Termos de Serviço', 'hi': 'सेवा की शर्तें',
  },
  allRightsReserved: {
    'en': '© 2026 Solocorn LLC. All rights reserved.', 'zh-CN': '© 2026 Solocorn LLC。保留所有权利。', 'zh-HK': '© 2026 Solocorn LLC。保留所有權利。',
    'es': '© 2026 Solocorn LLC. Todos los derechos reservados.', 'fr': '© 2026 Solocorn LLC. Tous droits réservés.',
    'de': '© 2026 Solocorn LLC. Alle Rechte vorbehalten.', 'ja': '© 2026 Solocorn LLC. All rights reserved.', 'ko': '© 2026 Solocorn LLC. 모든 권리 보유.',
    'pt': '© 2026 Solocorn LLC. Todos os direitos reservados.', 'hi': '© 2026 Solocorn LLC। सर्वाधिकार सुरक्षित।',
  },
  
  // Modal Content
  beFirst: {
    'en': 'Be the first to experience Solocorn', 'zh-CN': '成为首批体验 Solocorn 的用户', 'zh-HK': '成為首批體驗 Solocorn 嘅用戶',
    'es': 'Sé el primero en experimentar Solocorn', 'fr': 'Soyez le premier à découvrir Solocorn',
    'de': 'Seien Sie der Erste, der Solocorn erlebt', 'ja': 'Solocorn を最初に体験する', 'ko': 'Solocorn을 가장 먼저 경험하세요',
    'pt': 'Seja o primeiro a experimentar o Solocorn', 'hi': 'Solocorn का अनुभव करने वाले पहले व्यक्ति बनें',
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
    'pt': 'Estamos dando os toques finais em nossa plataforma. Deixe seus dados e notificaremos você quando lançarmos.',
    'hi': 'हम अपने प्लेटफॉर्म पर अंतिम रूप दे रहे हैं। अपनी जानकारी छोड़ें और हम लॉन्च होने पर आपको सूचित करेंगे।',
  },
  notifyMe: {
    'en': 'Notify Me', 'zh-CN': '通知我', 'zh-HK': '通知我', 'es': 'Notificarme', 'fr': 'Me notifier',
    'de': 'Benachrichtige mich', 'ja': '通知する', 'ko': '알림 받기', 'pt': 'Notifique-me', 'hi': 'मुझे सूचित करें',
  },
  thankYou: {
    'en': 'Thank You!', 'zh-CN': '谢谢您！', 'zh-HK': '多謝你！', 'es': '¡Gracias!', 'fr': 'Merci !',
    'de': 'Danke!', 'ja': 'ありがとうございます！', 'ko': '감사합니다!', 'pt': 'Obrigado!', 'hi': 'धन्यवाद!',
  },
  successMessageRegister: {
    'en': 'You\'re on the list! We\'ll be in touch soon.', 'zh-CN': '您已在名单中！我们很快会与您联系。',
    'zh-HK': '你已喺名單入面！我哋好快會同你聯繫。', 'es': '¡Estás en la lista! Nos pondremos en contacto pronto.',
    'fr': 'Vous êtes sur la liste ! Nous vous contacterons bientôt.', 'de': 'Sie sind auf der Liste! Wir werden uns bald melden.',
    'ja': 'リストに登録されました！まもなくご連絡いたします。', 'ko': '명단에 올랐습니다! 곧 연락드리겠습니다.',
    'pt': 'Você está na lista! Entraremos em contato em breve.', 'hi': 'आप सूची में हैं! हम जल्द ही संपर्क करेंगे।',
  },
  close: {
    'en': 'Close', 'zh-CN': '关闭', 'zh-HK': '閂閉', 'es': 'Cerrar', 'fr': 'Fermer',
    'de': 'Schließen', 'ja': '閉じる', 'ko': '닫기', 'pt': 'Fechar', 'hi': 'बंद करें',
  },
  yourName: {
    'en': 'Your name', 'zh-CN': '您的姓名', 'zh-HK': '你嘅姓名', 'es': 'Su nombre', 'fr': 'Votre nom',
    'de': 'Ihr Name', 'ja': 'お名前', 'ko': '이름', 'pt': 'Seu nome', 'hi': 'आपका नाम',
  },
  emailAddress: {
    'en': 'Email address', 'zh-CN': '电子邮件地址', 'zh-HK': '電郵地址', 'es': 'Dirección de correo electrónico', 'fr': 'Adresse e-mail',
    'de': 'E-Mail-Adresse', 'ja': 'メールアドレス', 'ko': '이메일 주소', 'pt': 'Endereço de e-mail', 'hi': 'ईमेल पता',
  },
  privacyNote: {
    'en': 'We respect your privacy. Unsubscribe anytime.', 'zh-CN': '我们尊重您的隐私。随时可以取消订阅。',
    'zh-HK': '我哋尊重你嘅隱私。隨時可以取消訂閱。', 'es': 'Respetamos su privacidad. Cancele la suscripción en cualquier momento.',
    'fr': 'Nous respectons votre vie privée. Désabonnez-vous à tout moment.', 'de': 'Wir respektieren Ihre Privatsphäre. Jederzeit abbestellen.',
    'ja': 'プライバシーを尊重します。いつでも購読を解除できます。', 'ko': '개인정보를 존중합니다. 언제든지 구독을 취소할 수 있습니다.',
    'pt': 'Respeitamos sua privacidade. Cancele a inscrição a qualquer momento.', 'hi': 'हम आपकी गोपनीयता का सम्मान करते हैं। कभी भी अनसब्सक्राइब करें।',
  },
  joinWaitlist: {
    'en': 'Join Waitlist', 'zh-CN': '加入等待列表', 'zh-HK': '加入等待列表', 'es': 'Unirse a la lista de espera', 'fr': 'Rejoindre la liste d\'attente',
    'de': 'Warteliste beitreten', 'ja': 'ウェイトリストに参加', 'ko': '대기 목록 참여', 'pt': 'Entrar na Lista de Espera', 'hi': 'प्रतीक्षा सूची में शामिल हों',
  },
  expressInterest: {
    'en': 'Express Interest', 'zh-CN': '表达兴趣', 'zh-HK': '表達興趣', 'es': 'Expresar interés', 'fr': 'Exprimer son intérêt',
    'de': 'Interesse bekunden', 'ja': '興味を表明', 'ko': '관심 표현', 'pt': 'Expressar Interesse', 'hi': 'रुचि व्यक्त करें',
  },
  // Theme related
  selectTheme: {
    'en': 'Select Theme', 'zh-CN': '选择主题', 'zh-HK': '選擇主題', 'es': 'Seleccionar tema', 'fr': 'Choisir le thème',
    'de': 'Thema auswählen', 'ja': 'テーマを選択', 'ko': '테마 선택', 'pt': 'Selecionar Tema', 'hi': 'थीम चुनें',
  },
  lightMode: {
    'en': 'Light', 'zh-CN': '浅色', 'zh-HK': '淺色', 'es': 'Claro', 'fr': 'Clair',
    'de': 'Hell', 'ja': 'ライト', 'ko': '라이트', 'pt': 'Claro', 'hi': 'लाइट',
  },
  darkMode: {
    'en': 'Dark', 'zh-CN': '深色', 'zh-HK': '深色', 'es': 'Oscuro', 'fr': 'Sombre',
    'de': 'Dunkel', 'ja': 'ダーク', 'ko': '다크', 'pt': 'Escuro', 'hi': 'डार्क',
  },
  // Investor Chat
  askSolocorn: {
    'en': 'Ask Solocorn', 'zh-CN': '询问 Solocorn', 'zh-HK': '詢問 Solocorn', 'es': 'Preguntar a Solocorn', 'fr': 'Demander à Solocorn',
    'de': 'Solocorn fragen', 'ja': 'Solocorn に質問', 'ko': 'Solocorn에게 물어보기', 'pt': 'Perguntar ao Solocorn', 'hi': 'Solocorn से पूछें',
  },
  investorChatPlaceholder: {
    'en': 'Ask about our company, technology, or investment opportunities...',
    'zh-CN': '询问有关我们公司、技术或投资机会的问题...',
    'zh-HK': '詢問有關我哋公司、技術或投資機會嘅問題...',
    'es': 'Pregunte sobre nuestra empresa, tecnología u oportunidades de inversión...',
    'fr': 'Demandez notre entreprise, notre technologie ou nos opportunités d\'investissement...',
    'de': 'Fragen Sie zu unserem Unternehmen, unserer Technologie oder Investitionsmöglichkeiten...',
    'ja': '当社、テクノロジー、または投資機会についてお尋ねください...',
    'ko': '당사, 기술 또는 투자 기회에 대해 문의하세요...',
    'pt': 'Pergunte sobre nossa empresa, tecnologia ou oportunidades de investimento...',
    'hi': 'हमारी कंपनी, तकनीक या निवेश अवसरों के बारे में पूछें...',
  },
  poweredBy: {
    'en': 'Powered by Solocorn AI', 'zh-CN': '由 Solocorn AI 驱动', 'zh-HK': '由 Solocorn AI 驅動', 'es': 'Impulsado por Solocorn AI', 'fr': 'Propulsé par Solocorn AI',
    'de': 'Powered by Solocorn AI', 'ja': 'Solocorn AI 搭載', 'ko': 'Solocorn AI 제공', 'pt': 'Powered by Solocorn AI', 'hi': 'Solocorn AI द्वारा संचालित',
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
  { code: 'pt', name: 'Português', flag: '🇵🇹' },
  { code: 'hi', name: 'हिन्दी', flag: '🇮🇳' },
];

// --- Investor Chat System Prompt ---
const INVESTOR_CHAT_PROMPT = `You are the Solocorn AI Assistant, an intelligent representative of Solocorn, a live AI-assisted tutoring platform. Use the following knowledge base to answer questions accurately.

## WHAT SOLOCORN IS
Solocorn is a live AI-assisted tutoring platform designed to allow a single tutor to teach large groups of students simultaneously while still delivering individualized feedback.

Traditional tutoring platforms scale poorly because tutors must manually grade student work and provide feedback. Solocorn solves this by using AI to automatically analyze student submissions and generate structured feedback immediately after each task.

This allows tutors to focus on teaching while the system handles grading, analysis, and feedback.

## THE CORE CONCEPT: LIVE TEACHING + AI EVALUATION
Solocorn is based on a simple division of labor.

Tutor responsibilities:
• Teach the lesson
• Decide what students should learn
• Create tasks or questions
• Guide the class discussion

AI responsibilities:
• Evaluate student answers
• Score responses instantly
• Identify mistakes and patterns
• Generate feedback for each student

This separation makes the system easier to use than fully automated AI learning platforms. Tutors remain in control of the learning process.

## HOW A SOLOCORN CLASS WORKS
A Solocorn class follows a repeating cycle:

Step 1 — Tutor Instruction: The tutor explains a concept just like in a normal class.
Step 2 — Tutor Assigns a Task: The tutor asks students to complete a short task or answer a question.
Step 3 — Students Submit Work: Students submit their answers through the platform.
Step 4 — AI Evaluation: The AI analyzes each student's response.
Step 5 — Immediate Feedback: Students receive personalized feedback within seconds.
Step 6 — Tutor Adjusts Teaching: The tutor can view class performance and adjust instruction accordingly.

This system is called PCI — Post-Completion Instruction.

## WHAT PCI (POST-COMPLETION INSTRUCTION) MEANS
PCI stands for Post-Completion Instruction. It refers to the process of giving students feedback immediately after they complete a learning task. Traditional classrooms often delay feedback until homework is graded later. Solocorn provides feedback instantly.

## KEY PLATFORM FEATURES
• Live Interactive Classrooms: Tutors can teach live classes with many students simultaneously
• AI-Assisted Evaluation: AI analyzes student responses in real time
• Micro-Task Learning Structure: Lessons are broken into short tasks
• Immediate Feedback: Students receive feedback within seconds
• Tutor Control: Tutors design lessons and tasks

## WHO SOLOCORN IS FOR
• Tutors: Can teach many students at once instead of one-to-one sessions
• Academies: Can use Solocorn to deliver classes to large groups of students
• Schools: Can use Solocorn as a digital classroom system with AI-assisted grading
• Students: Receive immediate feedback and more practice opportunities
• Investors: Solocorn addresses a key inefficiency in tutoring

## BUSINESS MODEL
Revenue sources include:
• Platform Commission: Solocorn takes a percentage of tutoring revenue
• Tutor Subscription: Tutors may pay a monthly fee to access platform tools
• Institutional Licensing: Schools and academies can license the platform

## COMPETITIVE POSITION
Traditional tutoring platform: 1 tutor → 1 student, manual grading, limited scalability
Solocorn: 1 tutor → many students, AI grading and feedback, scalable instruction

Unlike AI learning apps that replace teachers, Solocorn keeps tutors in control of instruction while AI handles grading and feedback.

## SUBJECTS SUPPORTED
IELTS, TOEFL, SAT, AP courses, A-Level, mathematics, science subjects, English language learning, university entrance exams.

## STRATEGIC ADVANTAGE
The tutoring industry historically scales in only two ways: hire more tutors or raise prices. Solocorn proposes a third possibility: increase tutor capacity through AI-assisted evaluation.

## RESPONSE GUIDELINES
- Be professional, knowledgeable, and helpful
- Answer based on the knowledge base provided
- If asked about specific investment details, direct to the contact form
- Keep responses concise but informative
- If unsure, say "Let me connect you with our team for detailed information"
- Never make up specific financial data or projections`;

// --- Background Animation Components ---

const GridFloor = ({ theme }: { theme: ColorTheme }) => {
  const gridColors = {
    emerald: 'rgba(16, 185, 129, 0.2)',
    ocean: 'rgba(14, 165, 233, 0.2)',
    sunset: 'rgba(245, 158, 11, 0.2)',
    galaxy: 'rgba(168, 85, 247, 0.2)',
  };
  
  return (
    <div className="absolute inset-0 overflow-hidden">
      <div className="absolute bottom-0 left-0 right-0 h-2/3 origin-bottom" style={{ transform: 'perspective(500px) rotateX(60deg)' }}>
        <motion.div 
          className="w-full h-[200%]" 
          style={{ 
            backgroundImage: `linear-gradient(to right, ${gridColors[theme]} 1px, transparent 1px), linear-gradient(to bottom, ${gridColors[theme]} 1px, transparent 1px)`, 
            backgroundSize: '60px 60px' 
          }} 
          animate={{ y: ['0%', '60px'] }} 
          transition={{ duration: 2, repeat: Infinity, ease: 'linear' }} 
        />
      </div>
    </div>
  );
};

const FloatingSymbol = ({ symbol, x, y, delay, theme }: { symbol: string; x: string; y: string; delay: number; theme: ColorTheme }) => {
  const colors = {
    emerald: 'text-emerald-400/30',
    ocean: 'text-sky-400/30',
    sunset: 'text-amber-400/30',
    galaxy: 'text-purple-400/30',
  };
  
  return (
    <motion.div 
      className={`absolute font-bold ${colors[theme]} select-none pointer-events-none`} 
      style={{ left: x, top: y, fontSize: '3rem', textShadow: '0 0 20px currentColor' }} 
      animate={{ y: [-15, 15, -15], opacity: [0.3, 0.6, 0.3], rotate: [0, 5, -5, 0] }} 
      transition={{ duration: 4, delay, repeat: Infinity, ease: 'easeInOut' }}
    >
      {symbol}
    </motion.div>
  );
};

const FloatingText = ({ text, x, y, delay, theme }: { text: string; x: string; y: string; delay: number; theme: ColorTheme }) => {
  const colors = {
    emerald: 'text-emerald-400/20',
    ocean: 'text-sky-400/20',
    sunset: 'text-amber-400/20',
    galaxy: 'text-purple-400/20',
  };
  
  return (
    <motion.div 
      className={`absolute font-bold tracking-wider ${colors[theme]} select-none pointer-events-none uppercase`} 
      style={{ left: x, top: y, fontSize: '1.5rem', textShadow: '0 0 10px currentColor' }} 
      animate={{ y: [-10, 10, -10], opacity: [0.15, 0.35, 0.15] }} 
      transition={{ duration: 5, delay, repeat: Infinity, ease: 'easeInOut' }}
    >
      {text}
    </motion.div>
  );
};

const FloatingShape = ({ Icon, x, y, delay, theme }: { Icon: any; x: string; y: string; delay: number; theme: ColorTheme }) => {
  const colors = {
    emerald: { border: 'border-emerald-500/30', bg: 'bg-emerald-500/10', text: 'text-emerald-400/50', shadow: 'shadow-emerald-500/20' },
    ocean: { border: 'border-sky-500/30', bg: 'bg-sky-500/10', text: 'text-sky-400/50', shadow: 'shadow-sky-500/20' },
    sunset: { border: 'border-amber-500/30', bg: 'bg-amber-500/10', text: 'text-amber-400/50', shadow: 'shadow-amber-500/20' },
    galaxy: { border: 'border-purple-500/30', bg: 'bg-purple-500/10', text: 'text-purple-400/50', shadow: 'shadow-purple-500/20' },
  };
  
  return (
    <motion.div className="absolute pointer-events-none" style={{ left: x, top: y }} animate={{ y: [-20, 20, -20], rotate: [0, 360] }} transition={{ duration: 12, delay, repeat: Infinity, ease: 'linear' }}>
      <div className={`w-12 h-12 border-2 ${colors[theme].border} ${colors[theme].bg} rounded-lg backdrop-blur-sm shadow-lg ${colors[theme].shadow} flex items-center justify-center`}>
        <Icon className={`w-6 h-6 ${colors[theme].text}`} />
      </div>
    </motion.div>
  );
};

const AtomOrbit = ({ x, y, size, duration, theme }: { x: string; y: string; size: number; duration: number; theme: ColorTheme }) => {
  const colors = {
    emerald: { nucleus: 'bg-emerald-400', shadow: 'shadow-emerald-500/50', ring: 'border-emerald-500/20', electron: 'bg-cyan-400', electronShadow: 'shadow-cyan-500/50' },
    ocean: { nucleus: 'bg-sky-400', shadow: 'shadow-sky-500/50', ring: 'border-sky-500/20', electron: 'bg-indigo-400', electronShadow: 'shadow-indigo-500/50' },
    sunset: { nucleus: 'bg-amber-400', shadow: 'shadow-amber-500/50', ring: 'border-amber-500/20', electron: 'bg-rose-400', electronShadow: 'shadow-rose-500/50' },
    galaxy: { nucleus: 'bg-purple-400', shadow: 'shadow-purple-500/50', ring: 'border-purple-500/20', electron: 'bg-pink-400', electronShadow: 'shadow-pink-500/50' },
  };
  
  return (
    <div className="absolute pointer-events-none" style={{ left: x, top: y, transform: 'translate(-50%, -50%)' }}>
      <div className={`absolute w-2 h-2 ${colors[theme].nucleus} rounded-full shadow-lg ${colors[theme].shadow} left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10`} />
      <motion.div className={`absolute border ${colors[theme].ring} rounded-full`} style={{ width: size, height: size, left: -size / 2, top: -size / 2 }} animate={{ rotate: 360 }} transition={{ duration, repeat: Infinity, ease: 'linear' }}>
        <div className={`absolute w-1.5 h-1.5 ${colors[theme].electron} rounded-full shadow-lg ${colors[theme].electronShadow} -top-0.5 left-1/2 -translate-x-1/2`} />
      </motion.div>
    </div>
  );
};

const GlowingOrb = ({ x, y, color, size, delay }: { x: string; y: string; color: string; size: string; delay: number }) => (
  <motion.div className={`absolute rounded-full blur-3xl pointer-events-none ${color}`} style={{ left: x, top: y, width: size, height: size }} animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }} transition={{ duration: 4, delay, repeat: Infinity, ease: 'easeInOut' }} />
);

const ShootingStar = ({ delay, top, theme }: { delay: number; top: string; theme: ColorTheme }) => {
  const colors = {
    emerald: 'via-emerald-400',
    ocean: 'via-sky-400',
    sunset: 'via-amber-400',
    galaxy: 'via-purple-400',
  };
  
  return (
    <motion.div className={`absolute h-px bg-gradient-to-r from-transparent ${colors[theme]} to-transparent pointer-events-none`} style={{ width: '100px', top, left: '-100px' }} animate={{ left: ['-10%', '110%'], opacity: [0, 1, 0] }} transition={{ duration: 1.5, delay, repeat: Infinity, repeatDelay: 5, ease: 'easeOut' }} />
  );
};

const FuturisticBackground = ({ theme, mode }: { theme: ColorTheme; mode: ThemeMode }) => {
  const bgColors = {
    emerald: mode === 'dark' ? 'from-slate-950 via-zinc-950 to-slate-900' : 'from-emerald-50 via-white to-emerald-100',
    ocean: mode === 'dark' ? 'from-slate-950 via-blue-950 to-slate-900' : 'from-sky-50 via-white to-blue-100',
    sunset: mode === 'dark' ? 'from-orange-950 via-red-950 to-slate-900' : 'from-orange-50 via-white to-amber-100',
    galaxy: mode === 'dark' ? 'from-purple-950 via-fuchsia-950 to-slate-900' : 'from-purple-50 via-white to-fuchsia-100',
  };
  
  const orbColors = {
    emerald: mode === 'dark' ? ['bg-emerald-500/20', 'bg-cyan-500/20', 'bg-purple-500/10'] : ['bg-emerald-400/30', 'bg-cyan-400/30', 'bg-purple-400/20'],
    ocean: mode === 'dark' ? ['bg-sky-500/20', 'bg-indigo-500/20', 'bg-blue-500/10'] : ['bg-sky-400/30', 'bg-indigo-400/30', 'bg-blue-400/20'],
    sunset: mode === 'dark' ? ['bg-amber-500/20', 'bg-rose-500/20', 'bg-orange-500/10'] : ['bg-amber-400/30', 'bg-rose-400/30', 'bg-orange-400/20'],
    galaxy: mode === 'dark' ? ['bg-purple-500/20', 'bg-pink-500/20', 'bg-fuchsia-500/10'] : ['bg-purple-400/30', 'bg-pink-400/30', 'bg-fuchsia-400/20'],
  };

  return (
    <div className={`fixed inset-0 -z-10 overflow-hidden bg-gradient-to-br ${bgColors[theme]}`}>
      <GridFloor theme={theme} />
      <FloatingSymbol symbol="∑" x="10%" y="20%" delay={0} theme={theme} />
      <FloatingSymbol symbol="π" x="85%" y="15%" delay={1} theme={theme} />
      <FloatingSymbol symbol="∫" x="75%" y="70%" delay={2} theme={theme} />
      <FloatingSymbol symbol="√" x="15%" y="75%" delay={0.5} theme={theme} />
      <FloatingSymbol symbol="∞" x="50%" y="10%" delay={1.5} theme={theme} />
      <FloatingSymbol symbol="∆" x="90%" y="50%" delay={2.5} theme={theme} />
      <FloatingSymbol symbol="Ω" x="5%" y="50%" delay={3} theme={theme} />
      <FloatingSymbol symbol="λ" x="60%" y="80%" delay={0.8} theme={theme} />
      {/* Exam names floating in background */}
      <FloatingText text="IELTS" x="12%" y="35%" delay={0} theme={theme} />
      <FloatingText text="TOEFL" x="88%" y="25%" delay={0.5} theme={theme} />
      <FloatingText text="AP" x="25%" y="15%" delay={1} theme={theme} />
      <FloatingText text="IB" x="72%" y="85%" delay={1.5} theme={theme} />
      <FloatingText text="SAT" x="8%" y="65%" delay={2} theme={theme} />
      <FloatingText text="LSAT" x="82%" y="45%" delay={2.5} theme={theme} />
      <FloatingText text="A LEVEL" x="35%" y="90%" delay={3} theme={theme} />
      <FloatingText text="GRE" x="65%" y="5%" delay={3.5} theme={theme} />
      <FloatingText text="GMAT" x="45%" y="55%" delay={4} theme={theme} />
      <FloatingText text="ACT" x="18%" y="50%" delay={4.5} theme={theme} />
      <FloatingText text="MCAT" x="78%" y="75%" delay={0.3} theme={theme} />
      <FloatingText text="GCSE" x="5%" y="85%" delay={0.8} theme={theme} />
      <FloatingShape Icon={Square} x="20%" y="30%" delay={0} theme={theme} />
      <FloatingShape Icon={Circle} x="70%" y="25%" delay={2} theme={theme} />
      <FloatingShape Icon={Triangle} x="80%" y="60%" delay={4} theme={theme} />
      <FloatingShape Icon={Hexagon} x="25%" y="65%" delay={1} theme={theme} />
      <FloatingShape Icon={Atom} x="50%" y="40%" delay={3} theme={theme} />
      <AtomOrbit x="30%" y="35%" size={120} duration={10} theme={theme} />
      <AtomOrbit x="70%" y="55%" size={150} duration={14} theme={theme} />
      <AtomOrbit x="45%" y="75%" size={100} duration={8} theme={theme} />
      <GlowingOrb x="20%" y="20%" color={orbColors[theme][0]} size="300px" delay={0} />
      <GlowingOrb x="70%" y="60%" color={orbColors[theme][1]} size="250px" delay={1} />
      <GlowingOrb x="40%" y="40%" color={orbColors[theme][2]} size="400px" delay={2} />
      <ShootingStar delay={0} top="15%" theme={theme} />
      <ShootingStar delay={3} top="35%" theme={theme} />
      <ShootingStar delay={6} top="55%" theme={theme} />
    </div>
  );
};

// --- Investor Chat Component ---

const InvestorChat = ({ lang, theme, mode, isOpen, onClose }: { lang: Language; theme: ColorTheme; mode: ThemeMode; isOpen: boolean; onClose: () => void }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const t = (key: string) => translations[key]?.[lang] || translations[key]?.['en'] || key;

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Initialize message when opened
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([
        { 
          role: 'assistant', 
          content: "Hello! I'm Solocorn AI. I can answer questions about our company, technology, investment opportunities, and more. What would you like to know?",
          timestamp: new Date()
        }
      ]);
    }
  }, [isOpen, messages.length]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: ChatMessage = {
      role: 'user',
      content: input.trim(),
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      // Call the investor chat API with Kimi AI
      const response = await fetch('/api/public/investor-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: userMessage.content,
          conversationHistory: messages.map(m => ({ role: m.role, content: m.content })),
          language: lang
        })
      });

      console.log('Chat API response status:', response.status);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log('Chat API response data:', data);
      
      // Debug: log if using fallback
      if (data.source?.includes('fallback')) {
        console.log('Using fallback response, source:', data.source);
      }
      
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: data.response || generateInvestorResponse(userMessage.content),
        timestamp: new Date(),
        source: data.source || 'unknown'
      }]);
    } catch (error) {
      console.error('Chat error:', error);
      // Fallback to local response on error
      const fallbackResponse = generateInvestorResponse(userMessage.content);
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: fallbackResponse,
        timestamp: new Date()
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  // Reset messages when opening
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([
        { 
          role: 'assistant', 
          content: "Hello! I'm Solocorn AI. I can answer questions about our company, technology, investment opportunities, and more. What would you like to know?",
          timestamp: new Date()
        }
      ]);
    }
  }, [isOpen]);

  const themeColors = {
    emerald: 'bg-emerald-500 hover:bg-emerald-400',
    ocean: 'bg-sky-500 hover:bg-sky-400',
    sunset: 'bg-amber-500 hover:bg-amber-400',
    galaxy: 'bg-purple-500 hover:bg-purple-400',
  };

  return (
    <>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
              onClick={onClose}
            />
            <motion.div
              initial={{ opacity: 0, y: 50, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 50, scale: 0.95 }}
              className={`fixed bottom-24 right-6 z-50 w-96 rounded-2xl shadow-2xl overflow-hidden border flex flex-col ${mode === 'dark' ? 'bg-zinc-900/95 border-white/10' : 'bg-white/95 border-black/10'}`}
              style={{ height: '500px' }}
            >
              {/* Header */}
              <div className={`p-4 border-b flex items-center justify-between ${mode === 'dark' ? 'border-white/10 bg-gradient-to-r from-emerald-500/20 to-cyan-500/20' : 'border-black/10 bg-gradient-to-r from-emerald-100 to-cyan-100'}`}>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-400 to-cyan-400 flex items-center justify-center">
                    <Sparkles className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className={`font-bold ${mode === 'dark' ? 'text-white' : 'text-zinc-900'}`}>{t('askSolocorn')}</h3>
                    <p className={`text-xs ${mode === 'dark' ? 'text-zinc-400' : 'text-zinc-600'}`}>{t('poweredBy')}</p>
                  </div>
                </div>
                <button onClick={onClose} className={`p-2 rounded-lg hover:bg-white/10 ${mode === 'dark' ? 'text-zinc-400' : 'text-zinc-600'}`}>
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Messages */}
              <div className={`flex-1 overflow-y-auto p-4 space-y-4 min-h-0 ${mode === 'dark' ? 'bg-zinc-900/50' : 'bg-gray-50'}`}>
                {messages.map((msg, idx) => (
                  <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[80%] p-3 rounded-2xl ${
                      msg.role === 'user' 
                        ? `${themeColors[theme]} text-white rounded-br-md` 
                        : mode === 'dark' ? 'bg-white/10 text-zinc-100 rounded-bl-md' : 'bg-white text-zinc-900 rounded-bl-md shadow-sm'
                    }`}>
                      <p className="text-sm">{msg.content}</p>
                      <span className={`text-xs mt-1 block ${msg.role === 'user' ? 'text-white/70' : mode === 'dark' ? 'text-zinc-500' : 'text-zinc-400'}`}>
                        {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                  </div>
                ))}
                {isLoading && (
                  <div className="flex justify-start">
                    <div className={`p-3 rounded-2xl rounded-bl-md ${mode === 'dark' ? 'bg-white/10' : 'bg-white shadow-sm'}`}>
                      <div className="flex gap-1">
                        <motion.div className="w-2 h-2 rounded-full bg-emerald-400" animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 0.5 }} />
                        <motion.div className="w-2 h-2 rounded-full bg-emerald-400" animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 0.5, delay: 0.1 }} />
                        <motion.div className="w-2 h-2 rounded-full bg-emerald-400" animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 0.5, delay: 0.2 }} />
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Input */}
              <div className={`p-4 border-t flex-shrink-0 ${mode === 'dark' ? 'border-white/10 bg-zinc-900' : 'border-black/10 bg-white'}`}>
                <div className="flex gap-2">
                  <Input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                    placeholder={t('investorChatPlaceholder')}
                    className={`flex-1 ${mode === 'dark' ? 'bg-white/5 border-white/10 text-white placeholder:text-zinc-500' : 'bg-gray-100 border-transparent text-zinc-900'}`}
                  />
                  <Button onClick={handleSend} disabled={isLoading || !input.trim()} className={`${themeColors[theme]} text-white px-3`}>
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

// Response generator using the knowledge base
function generateInvestorResponse(question: string): string {
  const lower = question.toLowerCase();
  
  // Use knowledge base content for responses
  if (lower.includes('what is') || lower.includes('what does') || lower.includes('who are')) {
    return "Solocorn is a live AI-assisted tutoring platform where AI evaluates student work and provides feedback so tutors can teach large classes efficiently. Instead of traditional one-to-one tutoring, Solocorn enables one tutor to teach many students simultaneously while each student still receives individualized feedback.";
  }
  
  if (lower.includes('how') && (lower.includes('work') || lower.includes('class'))) {
    return "A Solocorn class follows a simple cycle: (1) Tutor explains a concept, (2) Students complete a task, (3) Students submit answers, (4) AI evaluates responses instantly, (5) Students receive personalized feedback within seconds, (6) Tutor reviews results and adjusts teaching. This is called PCI — Post-Completion Instruction.";
  }
  
  if (lower.includes('pci') || lower.includes('post-completion')) {
    return "PCI stands for Post-Completion Instruction. It means students receive feedback immediately after completing a task, rather than waiting for homework to be graded later. This allows immediate correction of mistakes and reinforcement of correct reasoning, even in large classes.";
  }
  
  if (lower.includes('tutor') && (lower.includes('benefit') || lower.includes('why'))) {
    return "Tutors benefit from Solocorn by being able to teach many students at once instead of one-to-one sessions. This means higher earning potential, reduced grading workload (AI handles evaluation), and scalable classes. Tutors focus on teaching while the system handles feedback.";
  }
  
  if (lower.includes('student') && (lower.includes('benefit') || lower.includes('why'))) {
    return "Students receive immediate personalized feedback within seconds of submitting work, get more practice opportunities through micro-tasks, and gain clearer understanding of mistakes. Group tutoring is also more affordable than traditional one-to-one sessions.";
  }
  
  if (lower.includes('school') || lower.includes('academy')) {
    return "Schools and academies can use Solocorn as a digital classroom system with AI-assisted grading. Benefits include reduced grading workload for teachers, digital assignments instead of paper, immediate feedback for students, and lower administrative costs.";
  }
  
  if (lower.includes('different') || lower.includes('compare') || lower.includes('vs')) {
    return "Traditional tutoring platforms support one-to-one lessons (1 tutor → 1 student) with manual grading. Solocorn supports one-to-many classes (1 tutor → many students) with AI grading and feedback. Unlike AI learning apps that try to replace teachers, Solocorn keeps tutors in control of instruction.";
  }
  
  if (lower.includes('subject') || lower.includes('course')) {
    return "Solocorn supports IELTS, TOEFL, SAT, AP courses, A-Level tutoring, mathematics, science subjects, English language learning, and university entrance exams. The system works best with subjects where students submit structured answers.";
  }
  
  if (lower.includes('revenue') || lower.includes('business model') || lower.includes('make money')) {
    return "Solocorn generates revenue through platform commission on tutoring classes, tutor subscription fees for accessing tools, and institutional licensing for schools and academies. This creates multiple revenue streams from both individual tutors and institutions.";
  }
  
  if (lower.includes('invest') || lower.includes('funding') || lower.includes('valuation')) {
    return "For detailed investment discussions, I'd recommend reaching out to our team through the contact form. Solocorn's key value proposition is transforming tutoring from a labor-limited service into a scalable digital education platform.";
  }
  
  if (lower.includes('ai') || lower.includes('technology') || lower.includes('automatic')) {
    return "Solocorn uses AI language models to analyze student responses and generate feedback in real-time. The AI evaluates answers for correctness, reasoning, and common error patterns. This happens instantly—students receive feedback within seconds of submitting work.";
  }
  
  if (lower.includes('scale') || lower.includes('many student') || lower.includes('capacity')) {
    return "The traditional tutoring industry scales in only two ways: hire more tutors or raise prices. Solocorn enables a third possibility: increase tutor capacity through AI-assisted evaluation. One tutor can teach many students simultaneously while each student still receives individualized feedback.";
  }
  
  if (lower.includes('replace teacher') || lower.includes('replace tutor')) {
    return "No, Solocorn does not replace teachers. Tutors remain responsible for teaching, designing lessons, and guiding class discussions. AI handles evaluation and feedback so tutors can focus on instruction. The platform is designed to amplify teacher effectiveness, not replace them.";
  }
  
  return "That's a great question! Solocorn combines live teaching with AI evaluation to make tutoring scalable. Is there a specific aspect—how classes work, who it's for, or the business model—you'd like to know more about?";
}

// --- Other Components ---

const LanguageSelector = ({ currentLang, onChange, theme }: { currentLang: Language; onChange: (lang: Language) => void; theme: ColorTheme }) => {
  const [isOpen, setIsOpen] = useState(false);
  const currentLangData = LANGUAGES.find(l => l.code === currentLang);
  
  const themeColors = {
    emerald: 'hover:bg-emerald-500/10 text-emerald-400',
    ocean: 'hover:bg-sky-500/10 text-sky-400',
    sunset: 'hover:bg-amber-500/10 text-amber-400',
    galaxy: 'hover:bg-purple-500/10 text-purple-400',
  };

  return (
    <div className="relative">
      <button onClick={() => setIsOpen(!isOpen)} className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 transition-colors text-sm">
        <Globe className="w-4 h-4" />
        <span>{currentLangData?.flag}</span>
        <span className="hidden sm:inline">{currentLangData?.name}</span>
        <ChevronRight className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-90' : ''}`} />
      </button>
      <AnimatePresence>
        {isOpen && (
          <>
            <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="absolute right-0 top-full mt-2 w-56 bg-zinc-900/95 backdrop-blur-xl border border-white/10 rounded-xl shadow-2xl z-50 overflow-hidden">
              {LANGUAGES.map((lang) => (
                <button key={lang.code} onClick={() => { onChange(lang.code); setIsOpen(false); }} className={`w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-white/5 transition-colors ${currentLang === lang.code ? `${themeColors[theme]} bg-opacity-10` : 'text-white'}`}>
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

const ThemeSelector = ({ currentTheme, currentMode, onThemeChange, onModeChange, lang }: { currentTheme: ColorTheme; currentMode: ThemeMode; onThemeChange: (theme: ColorTheme) => void; onModeChange: (mode: ThemeMode) => void; lang: Language }) => {
  const [isOpen, setIsOpen] = useState(false);
  const t = (key: string) => translations[key]?.[lang] || translations[key]?.['en'] || key;

  return (
    <div className="relative">
      <button onClick={() => setIsOpen(!isOpen)} className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 transition-colors text-sm">
        <Palette className="w-4 h-4" />
        <span className="hidden sm:inline">{THEMES[currentTheme].icon} {THEMES[currentTheme].name}</span>
        <ChevronRight className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-90' : ''}`} />
      </button>
      <AnimatePresence>
        {isOpen && (
          <>
            <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="absolute right-0 top-full mt-2 w-64 bg-zinc-900/95 backdrop-blur-xl border border-white/10 rounded-xl shadow-2xl z-50 overflow-hidden">
              <div className="p-3 border-b border-white/10">
                <p className="text-xs text-zinc-500 mb-2">{currentMode === 'dark' ? t('darkMode') : t('lightMode')}</p>
                <div className="flex gap-2">
                  <button onClick={() => onModeChange('light')} className={`flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-lg transition-colors ${currentMode === 'light' ? 'bg-amber-500/20 text-amber-400' : 'hover:bg-white/5 text-zinc-400'}`}>
                    <Sun className="w-4 h-4" />
                    <span className="text-sm">{t('lightMode')}</span>
                  </button>
                  <button onClick={() => onModeChange('dark')} className={`flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-lg transition-colors ${currentMode === 'dark' ? 'bg-indigo-500/20 text-indigo-400' : 'hover:bg-white/5 text-zinc-400'}`}>
                    <Moon className="w-4 h-4" />
                    <span className="text-sm">{t('darkMode')}</span>
                  </button>
                </div>
              </div>
              <div className="p-2">
                <p className="text-xs text-zinc-500 px-2 py-1">{t('selectTheme')}</p>
                {(Object.keys(THEMES) as ColorTheme[]).map((themeKey) => (
                  <button key={themeKey} onClick={() => { onThemeChange(themeKey); setIsOpen(false); }} className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left hover:bg-white/5 transition-colors ${currentTheme === themeKey ? 'bg-white/10' : ''}`}>
                    <span className="text-xl">{THEMES[themeKey].icon}</span>
                    <div>
                      <p className="text-sm font-medium text-white">{THEMES[themeKey].name}</p>
                      <div className="flex gap-1 mt-1">
                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: THEMES[themeKey].colors.primary }} />
                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: THEMES[themeKey].colors.secondary }} />
                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: THEMES[themeKey].colors.accent }} />
                      </div>
                    </div>
                    {currentTheme === themeKey && <CheckCircle className="w-4 h-4 ml-auto text-emerald-400" />}
                  </button>
                ))}
              </div>
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
          <div className="text-4xl md:text-6xl font-bold tabular-nums drop-shadow-lg">{value.toString().padStart(2, '0')}</div>
          <div className="text-xs uppercase tracking-widest opacity-70 mt-2">{unit}</div>
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
            <div className="text-lg font-bold">{tutor.name}</div>
            <div className="text-sm opacity-70">{tutor.subject}</div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

const ComingSoonModal = ({ isOpen, onClose, type, lang, theme, mode }: { isOpen: boolean; onClose: () => void; type: ModalType; lang: Language; theme: ColorTheme; mode: ThemeMode }) => {
  const [formData, setFormData] = useState({ 
    email: '', 
    name: '',
    about: '',
    socialMedia: '',
    school: '',
    website: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const t = (key: string) => translations[key]?.[lang] || translations[key]?.['en'] || key;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Early bird signup:', { type, ...formData });
    setSubmitted(true);
  };

  const themeColors = {
    emerald: { primary: 'bg-emerald-500 hover:bg-emerald-400', light: 'bg-emerald-100 text-emerald-700' },
    ocean: { primary: 'bg-sky-500 hover:bg-sky-400', light: 'bg-sky-100 text-sky-700' },
    sunset: { primary: 'bg-amber-500 hover:bg-amber-400', light: 'bg-amber-100 text-amber-700' },
    galaxy: { primary: 'bg-purple-500 hover:bg-purple-400', light: 'bg-purple-100 text-purple-700' },
  };

  if (!isOpen) return null;

  // Tutor form content
  const renderTutorForm = () => (
    <>
      <Input type="text" placeholder="Name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} required className={`w-full border ${mode === 'dark' ? 'bg-white/5 border-white/10 text-white placeholder:text-zinc-500' : 'bg-black/5 border-black/10 text-zinc-900 placeholder:text-zinc-500'}`} />
      <Input type="email" placeholder="Email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} required className={`w-full border ${mode === 'dark' ? 'bg-white/5 border-white/10 text-white placeholder:text-zinc-500' : 'bg-black/5 border-black/10 text-zinc-900 placeholder:text-zinc-500'}`} />
      <textarea 
        placeholder="Tell us about your tutoring (500 characters max)" 
        value={formData.about}
        onChange={(e) => setFormData({ ...formData, about: e.target.value.slice(0, 500) })}
        required
        rows={3}
        className={`w-full border rounded-lg px-3 py-2 resize-none text-sm ${mode === 'dark' ? 'bg-white/5 border-white/10 text-white placeholder:text-zinc-500' : 'bg-black/5 border-black/10 text-zinc-900 placeholder:text-zinc-500'}`}
      />
      <Input type="text" placeholder="Social media (optional)" value={formData.socialMedia} onChange={(e) => setFormData({ ...formData, socialMedia: e.target.value })} className={`w-full border ${mode === 'dark' ? 'bg-white/5 border-white/10 text-white placeholder:text-zinc-500' : 'bg-black/5 border-black/10 text-zinc-900 placeholder:text-zinc-500'}`} />
      <Button type="submit" className={`w-full py-3 text-white font-semibold rounded-xl ${themeColors[theme].primary}`}>Confirm</Button>
    </>
  );

  // Academy form content
  const renderAcademyForm = () => (
    <>
      <h3 className={`text-xl font-bold mb-4 ${mode === 'dark' ? 'text-white' : 'text-zinc-900'}`}>Solocorn Academy</h3>
      <Input type="text" placeholder="Name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} required className={`w-full border ${mode === 'dark' ? 'bg-white/5 border-white/10 text-white placeholder:text-zinc-500' : 'bg-black/5 border-black/10 text-zinc-900 placeholder:text-zinc-500'}`} />
      <Input type="email" placeholder="Email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} required className={`w-full border ${mode === 'dark' ? 'bg-white/5 border-white/10 text-white placeholder:text-zinc-500' : 'bg-black/5 border-black/10 text-zinc-900 placeholder:text-zinc-500'}`} />
      <textarea 
        placeholder="Tell us about your academy" 
        value={formData.about}
        onChange={(e) => setFormData({ ...formData, about: e.target.value })}
        required
        rows={3}
        className={`w-full border rounded-lg px-3 py-2 resize-none text-sm ${mode === 'dark' ? 'bg-white/5 border-white/10 text-white placeholder:text-zinc-500' : 'bg-black/5 border-black/10 text-zinc-900 placeholder:text-zinc-500'}`}
      />
      <Input type="text" placeholder="Social media (optional)" value={formData.socialMedia} onChange={(e) => setFormData({ ...formData, socialMedia: e.target.value })} className={`w-full border ${mode === 'dark' ? 'bg-white/5 border-white/10 text-white placeholder:text-zinc-500' : 'bg-black/5 border-black/10 text-zinc-900 placeholder:text-zinc-500'}`} />
      <p className={`text-xs ${mode === 'dark' ? 'text-zinc-500' : 'text-zinc-500'}`}>Unsubscribe at anytime</p>
      <Button type="submit" className={`w-full py-3 text-white font-semibold rounded-xl ${themeColors[theme].primary}`}>Confirm</Button>
    </>
  );

  // Schools form content
  const renderSchoolsForm = () => (
    <>
      <Input type="text" placeholder="Name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} required className={`w-full border ${mode === 'dark' ? 'bg-white/5 border-white/10 text-white placeholder:text-zinc-500' : 'bg-black/5 border-black/10 text-zinc-900 placeholder:text-zinc-500'}`} />
      <Input type="text" placeholder="School" value={formData.school} onChange={(e) => setFormData({ ...formData, school: e.target.value })} required className={`w-full border ${mode === 'dark' ? 'bg-white/5 border-white/10 text-white placeholder:text-zinc-500' : 'bg-black/5 border-black/10 text-zinc-900 placeholder:text-zinc-500'}`} />
      <Input type="email" placeholder="Email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} required className={`w-full border ${mode === 'dark' ? 'bg-white/5 border-white/10 text-white placeholder:text-zinc-500' : 'bg-black/5 border-black/10 text-zinc-900 placeholder:text-zinc-500'}`} />
      <Input type="text" placeholder="Website" value={formData.website} onChange={(e) => setFormData({ ...formData, website: e.target.value })} className={`w-full border ${mode === 'dark' ? 'bg-white/5 border-white/10 text-white placeholder:text-zinc-500' : 'bg-black/5 border-black/10 text-zinc-900 placeholder:text-zinc-500'}`} />
      <textarea 
        placeholder="Message (500 characters max)" 
        value={formData.message}
        onChange={(e) => setFormData({ ...formData, message: e.target.value.slice(0, 500) })}
        required
        rows={3}
        className={`w-full border rounded-lg px-3 py-2 resize-none text-sm ${mode === 'dark' ? 'bg-white/5 border-white/10 text-white placeholder:text-zinc-500' : 'bg-black/5 border-black/10 text-zinc-900 placeholder:text-zinc-500'}`}
      />
      <Button type="submit" className={`w-full py-3 text-white font-semibold rounded-xl ${themeColors[theme].primary}`}>Confirm</Button>
    </>
  );

  // Default form
  const renderDefaultForm = () => (
    <>
      <Input type="text" placeholder={t('yourName')} value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} required className={`w-full border ${mode === 'dark' ? 'bg-white/5 border-white/10 text-white placeholder:text-zinc-500' : 'bg-black/5 border-black/10 text-zinc-900 placeholder:text-zinc-500'}`} />
      <Input type="email" placeholder={t('emailAddress')} value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} required className={`w-full border ${mode === 'dark' ? 'bg-white/5 border-white/10 text-white placeholder:text-zinc-500' : 'bg-black/5 border-black/10 text-zinc-900 placeholder:text-zinc-500'}`} />
      <Button type="submit" className={`w-full py-3 text-white font-semibold rounded-xl ${themeColors[theme].primary}`}>{t('notifyMe')}</Button>
    </>
  );

  return (
    <AnimatePresence>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[100] flex items-center justify-center p-4">
        <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose} />
        <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }} className={`relative w-full max-w-md backdrop-blur-xl border rounded-2xl p-8 shadow-2xl ${mode === 'dark' ? 'bg-zinc-900/90 border-white/10' : 'bg-white/90 border-black/10'}`}>
          <button onClick={onClose} className={`absolute top-4 right-4 p-2 transition-colors ${mode === 'dark' ? 'text-zinc-400 hover:text-white' : 'text-zinc-600 hover:text-black'}`}><X className="w-5 h-5" /></button>
          {!submitted ? (
            <>
              {type !== 'schools' && (
                <div className="text-center mb-6">
                  <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border text-xs font-medium mb-4 ${mode === 'dark' ? `bg-${theme}-500/10 border-${theme}-500/20 text-${theme}-400` : themeColors[theme].light}`}>
                    <Sparkles className="w-3 h-3" />{t('comingSoon')}
                  </div>
                </div>
              )}
              <form onSubmit={handleSubmit} className="space-y-4">
                {type === 'tutor' && renderTutorForm()}
                {type === 'academy' && renderAcademyForm()}
                {type === 'schools' && renderSchoolsForm()}
                {!type && renderDefaultForm()}
              </form>
            </>
          ) : (
            <div className="text-center py-8">
              <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ${mode === 'dark' ? `bg-${theme}-500/20` : themeColors[theme].light}`}><CheckCircle className={`w-8 h-8 ${mode === 'dark' ? `text-${theme}-400` : `text-${theme}-600`}`} /></div>
              <h3 className={`text-xl font-bold mb-2 ${mode === 'dark' ? 'text-white' : 'text-zinc-900'}`}>{t('thankYou')}</h3>
              <p className={mode === 'dark' ? 'text-zinc-400' : 'text-zinc-600'}>{t('successMessageRegister')}</p>
              <Button onClick={onClose} className={`mt-6 ${mode === 'dark' ? 'bg-white/10 hover:bg-white/20 text-white' : 'bg-black/10 hover:bg-black/20 text-zinc-900'}`}>{t('close')}</Button>
            </div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

const SpecialAccessSection = ({ lang, theme, mode }: { lang: Language; theme: ColorTheme; mode: ThemeMode }) => {
  const [code, setCode] = useState('');
  const [error, setError] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const router = useRouter();
  const t = (key: string) => translations[key]?.[lang] || translations[key]?.['en'] || key;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (SPECIAL_CODES.includes(code.trim())) {
      router.push('/login');
    } else {
      setError(true);
      setTimeout(() => setError(false), 2000);
    }
  };

  const themeColors = {
    emerald: { border: 'border-emerald-500/20', bg: 'from-emerald-900/30 to-zinc-900/50', accent: 'bg-emerald-500 hover:bg-emerald-400' },
    ocean: { border: 'border-sky-500/20', bg: 'from-sky-900/30 to-zinc-900/50', accent: 'bg-sky-500 hover:bg-sky-400' },
    sunset: { border: 'border-amber-500/20', bg: 'from-amber-900/30 to-zinc-900/50', accent: 'bg-amber-500 hover:bg-amber-400' },
    galaxy: { border: 'border-purple-500/20', bg: 'from-purple-900/30 to-zinc-900/50', accent: 'bg-purple-500 hover:bg-purple-400' },
  };

  return (
    <div className="max-w-7xl mx-auto px-6 mb-16">
      <div className={`bg-gradient-to-r ${themeColors[theme].bg} ${themeColors[theme].border} border rounded-2xl p-6 backdrop-blur-sm`}>
        <button onClick={() => setExpanded(!expanded)} className="w-full flex items-center justify-between text-left">
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${mode === 'dark' ? 'bg-white/10' : 'bg-black/10'}`}><Lock className={`w-5 h-5 ${mode === 'dark' ? `text-${theme}-400` : `text-${theme}-600`}`} /></div>
            <h3 className={`font-semibold ${mode === 'dark' ? 'text-white' : 'text-zinc-900'}`}>{t('accessWithCode')}</h3>
          </div>
          <ChevronRight className={`w-5 h-5 ${mode === 'dark' ? 'text-zinc-400' : 'text-zinc-600'} transition-transform ${expanded ? 'rotate-90' : ''}`} />
        </button>
        <AnimatePresence>
          {expanded && (
            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
              <div className={`pt-6 border-t border-white/10 mt-6`}>
                <p className={`text-sm mb-4 ${mode === 'dark' ? 'text-zinc-400' : 'text-zinc-600'}`}>{t('enterCode')}</p>
                <form onSubmit={handleSubmit} className="flex gap-3">
                  <Input type="password" placeholder={t('enterCode')} value={code} onChange={(e) => setCode(e.target.value)} className={`flex-1 border ${mode === 'dark' ? 'bg-white/5 border-white/10 text-white placeholder:text-zinc-500' : 'bg-black/5 border-black/10 text-zinc-900 placeholder:text-zinc-500'} ${error ? 'border-red-500' : ''}`} />
                  <Button type="submit" className={`text-white px-6 ${themeColors[theme].accent}`}>{t('access')}</Button>
                </form>
                {error && <p className="text-red-400 text-sm mt-2">{t('invalidCode')}</p>}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

const ActionCard = ({ title, copy, buttonText, icon: Icon, onClick, theme, mode }: { title: string; copy: string; buttonText: string; icon: any; onClick: () => void; theme: ColorTheme; mode: ThemeMode }) => {
  const themeColors = {
    emerald: { border: 'border-emerald-500/30', hover: 'hover:border-emerald-500/50', icon: 'text-emerald-400', bg: 'bg-emerald-500/10', button: 'bg-white text-black hover:bg-emerald-400' },
    ocean: { border: 'border-sky-500/30', hover: 'hover:border-sky-500/50', icon: 'text-sky-400', bg: 'bg-sky-500/10', button: 'bg-white text-black hover:bg-sky-400' },
    sunset: { border: 'border-amber-500/30', hover: 'hover:border-amber-500/50', icon: 'text-amber-400', bg: 'bg-amber-500/10', button: 'bg-white text-black hover:bg-amber-400' },
    galaxy: { border: 'border-purple-500/30', hover: 'hover:border-purple-500/50', icon: 'text-purple-400', bg: 'bg-purple-500/10', button: 'bg-white text-black hover:bg-purple-400' },
  };

  return (
    <motion.div whileHover={{ y: -5 }} className={`backdrop-blur-md border ${themeColors[theme].border} ${themeColors[theme].hover} p-8 rounded-2xl flex flex-col items-start justify-between h-full group hover:border-emerald-500/30 transition-colors ${mode === 'dark' ? 'bg-zinc-900/60' : 'bg-white/60'}`}>
      <div className="mb-6">
        <div className={`w-12 h-12 rounded-xl ${themeColors[theme].bg} flex items-center justify-center mb-6 group-hover:bg-opacity-20 transition-colors`}><Icon className={`w-6 h-6 ${themeColors[theme].icon}`} /></div>
        <h3 className={`text-2xl font-bold mb-3 ${mode === 'dark' ? 'text-white' : 'text-zinc-900'}`}>{title}</h3>
        {copy && <p className={`leading-relaxed ${mode === 'dark' ? 'text-zinc-400' : 'text-zinc-600'}`}>{copy}</p>}
      </div>
      <Button onClick={onClick} className={`w-full py-3 px-6 rounded-xl font-semibold transition-colors ${themeColors[theme].button}`}>{buttonText}</Button>
    </motion.div>
  );
};

const Navbar = ({ onRegister, lang, onLanguageChange, theme, mode, onThemeChange, onModeChange }: { onRegister: () => void; lang: Language; onLanguageChange: (lang: Language) => void; theme: ColorTheme; mode: ThemeMode; onThemeChange: (theme: ColorTheme) => void; onModeChange: (mode: ThemeMode) => void }) => {
  const t = (key: string) => translations[key]?.[lang] || translations[key]?.['en'] || key;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-4">
      <div className={`max-w-7xl mx-auto flex justify-between items-center backdrop-blur-md border rounded-2xl px-6 py-3 ${mode === 'dark' ? 'bg-zinc-900/60 border-white/10' : 'bg-white/60 border-black/10'}`}>
        <Link href="/" className="flex items-center gap-3">
          <img 
            src="/images/logo.png" 
            alt="Solocorn" 
            className="h-8 w-auto bg-transparent" 
            style={{ backgroundColor: 'transparent' }}
            onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} 
          />
          <span className={`text-2xl font-bold tracking-tighter ${mode === 'dark' ? 'text-white' : 'text-zinc-900'}`}>{t('brandName')}</span>
        </Link>
        <div className="flex items-center gap-3">
          <ThemeSelector currentTheme={theme} currentMode={mode} onThemeChange={onThemeChange} onModeChange={onModeChange} lang={lang} />
          <LanguageSelector currentLang={lang} onChange={onLanguageChange} theme={theme} />
          <Button onClick={onRegister} variant="outline" className={`px-5 py-2 rounded-lg text-sm font-bold transition-colors border-0 ${mode === 'dark' ? 'bg-white text-black hover:bg-emerald-400' : 'bg-zinc-900 text-white hover:bg-emerald-500'}`}>{t('register')}</Button>
        </div>
      </div>
    </nav>
  );
};

// --- Contact Modal Component ---

const ContactModal = ({ isOpen, onClose, lang, mode }: { isOpen: boolean; onClose: () => void; lang: Language; mode: ThemeMode }) => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const t = (key: string) => translations[key]?.[lang] || translations[key]?.['en'] || key;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Contact form submitted:', formData);
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', email: '', message: '' });
      onClose();
    }, 2000);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      >
        <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose} />
        <motion.div 
          initial={{ scale: 0.95, opacity: 0 }} 
          animate={{ scale: 1, opacity: 1 }} 
          exit={{ scale: 0.95, opacity: 0 }}
          className={`relative w-full max-w-md backdrop-blur-xl border rounded-2xl p-8 shadow-2xl ${mode === 'dark' ? 'bg-zinc-900/90 border-white/10' : 'bg-white/90 border-black/10'}`}
        >
          <button 
            onClick={onClose} 
            className={`absolute top-4 right-4 p-2 transition-colors ${mode === 'dark' ? 'text-zinc-400 hover:text-white' : 'text-zinc-600 hover:text-black'}`}
          >
            <X className="w-5 h-5" />
          </button>
          
          {!submitted ? (
            <>
              <div className="text-center mb-6">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 ${mode === 'dark' ? 'bg-emerald-500/20' : 'bg-emerald-100'}`}>
                  <Mail className={`w-6 h-6 ${mode === 'dark' ? 'text-emerald-400' : 'text-emerald-600'}`} />
                </div>
                <h3 className={`text-2xl font-bold mb-2 ${mode === 'dark' ? 'text-white' : 'text-zinc-900'}`}>Contact Us</h3>
                <p className={`text-sm ${mode === 'dark' ? 'text-zinc-400' : 'text-zinc-600'}`}>Send us a message and we'll get back to you soon.</p>
              </div>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className={`block text-sm font-medium mb-1 ${mode === 'dark' ? 'text-zinc-300' : 'text-zinc-700'}`}>Name</label>
                  <Input 
                    type="text" 
                    placeholder="Your name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    className={`w-full border ${mode === 'dark' ? 'bg-white/5 border-white/10 text-white placeholder:text-zinc-500' : 'bg-black/5 border-black/10 text-zinc-900 placeholder:text-zinc-500'}`}
                  />
                </div>
                <div>
                  <label className={`block text-sm font-medium mb-1 ${mode === 'dark' ? 'text-zinc-300' : 'text-zinc-700'}`}>Email</label>
                  <Input 
                    type="email" 
                    placeholder="your@email.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                    className={`w-full border ${mode === 'dark' ? 'bg-white/5 border-white/10 text-white placeholder:text-zinc-500' : 'bg-black/5 border-black/10 text-zinc-900 placeholder:text-zinc-500'}`}
                  />
                </div>
                <div>
                  <label className={`block text-sm font-medium mb-1 ${mode === 'dark' ? 'text-zinc-300' : 'text-zinc-700'}`}>Message</label>
                  <textarea 
                    placeholder="How can we help you?"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    required
                    rows={4}
                    className={`w-full border rounded-lg px-3 py-2 resize-none ${mode === 'dark' ? 'bg-white/5 border-white/10 text-white placeholder:text-zinc-500' : 'bg-black/5 border-black/10 text-zinc-900 placeholder:text-zinc-500'}`}
                  />
                </div>
                <Button type="submit" className="w-full py-3 bg-emerald-500 hover:bg-emerald-400 text-white font-semibold rounded-xl">
                  Send Message
                </Button>
              </form>
              
              <p className={`text-xs text-center mt-4 ${mode === 'dark' ? 'text-zinc-500' : 'text-zinc-500'}`}>
                You can also email us directly at support@solocorn.co
              </p>
            </>
          ) : (
            <div className="text-center py-8">
              <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ${mode === 'dark' ? 'bg-emerald-500/20' : 'bg-emerald-100'}`}>
                <CheckCircle className={`w-8 h-8 ${mode === 'dark' ? 'text-emerald-400' : 'text-emerald-600'}`} />
              </div>
              <h3 className={`text-xl font-bold mb-2 ${mode === 'dark' ? 'text-white' : 'text-zinc-900'}`}>Message Sent!</h3>
              <p className={mode === 'dark' ? 'text-zinc-400' : 'text-zinc-600'}>Thank you for reaching out. We'll be in touch soon.</p>
            </div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

// --- Legal Modals ---

const PrivacyPolicyModal = ({ isOpen, onClose, mode }: { isOpen: boolean; onClose: () => void; mode: ThemeMode }) => {
  if (!isOpen) return null;
  
  return (
    <AnimatePresence>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[100] flex items-center justify-center p-4">
        <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose} />
        <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }} className={`relative w-full max-w-2xl max-h-[80vh] overflow-y-auto backdrop-blur-xl border rounded-2xl p-8 shadow-2xl ${mode === 'dark' ? 'bg-zinc-900/95 border-white/10' : 'bg-white/95 border-black/10'}`}>
          <button onClick={onClose} className={`absolute top-4 right-4 p-2 transition-colors ${mode === 'dark' ? 'text-zinc-400 hover:text-white' : 'text-zinc-600 hover:text-black'}`}><X className="w-5 h-5" /></button>
          <h2 className={`text-2xl font-bold mb-6 ${mode === 'dark' ? 'text-white' : 'text-zinc-900'}`}>Privacy Policy</h2>
          <div className={`space-y-4 text-sm ${mode === 'dark' ? 'text-zinc-300' : 'text-zinc-700'}`}>
            <p>Last updated: March 2025</p>
            <h3 className="font-semibold mt-4">1. Information We Collect</h3>
            <p>We collect information you provide directly to us, including name, email address, and any other information you choose to provide when using our platform.</p>
            <h3 className="font-semibold mt-4">2. How We Use Your Information</h3>
            <p>We use the information we collect to provide, maintain, and improve our services, communicate with you, and develop new features.</p>
            <h3 className="font-semibold mt-4">3. Information Sharing</h3>
            <p>We do not sell, trade, or otherwise transfer your personally identifiable information to outside parties except as described in this policy.</p>
            <h3 className="font-semibold mt-4">4. Data Security</h3>
            <p>We implement appropriate technical and organizational measures to protect your personal data against unauthorized access, alteration, or destruction.</p>
            <h3 className="font-semibold mt-4">5. Your Rights</h3>
            <p>You have the right to access, correct, or delete your personal information. Contact us at support@solocorn.co for any privacy-related requests.</p>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

const TermsOfServiceModal = ({ isOpen, onClose, mode }: { isOpen: boolean; onClose: () => void; mode: ThemeMode }) => {
  if (!isOpen) return null;
  
  return (
    <AnimatePresence>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[100] flex items-center justify-center p-4">
        <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose} />
        <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }} className={`relative w-full max-w-2xl max-h-[80vh] overflow-y-auto backdrop-blur-xl border rounded-2xl p-8 shadow-2xl ${mode === 'dark' ? 'bg-zinc-900/95 border-white/10' : 'bg-white/95 border-black/10'}`}>
          <button onClick={onClose} className={`absolute top-4 right-4 p-2 transition-colors ${mode === 'dark' ? 'text-zinc-400 hover:text-white' : 'text-zinc-600 hover:text-black'}`}><X className="w-5 h-5" /></button>
          <h2 className={`text-2xl font-bold mb-6 ${mode === 'dark' ? 'text-white' : 'text-zinc-900'}`}>Terms of Service</h2>
          <div className={`space-y-4 text-sm ${mode === 'dark' ? 'text-zinc-300' : 'text-zinc-700'}`}>
            <p>Last updated: March 2025</p>
            <h3 className="font-semibold mt-4">1. Acceptance of Terms</h3>
            <p>By accessing or using Solocorn's services, you agree to be bound by these Terms of Service and all applicable laws and regulations.</p>
            <h3 className="font-semibold mt-4">2. Use of Service</h3>
            <p>You agree to use the service only for lawful purposes and in accordance with these Terms. You are responsible for all content you provide.</p>
            <h3 className="font-semibold mt-4">3. User Accounts</h3>
            <p>You are responsible for safeguarding your account credentials and for any activities under your account. Notify us immediately of any unauthorized use.</p>
            <h3 className="font-semibold mt-4">4. Intellectual Property</h3>
            <p>All content and materials available on Solocorn are the property of Solocorn LLC and are protected by applicable intellectual property laws.</p>
            <h3 className="font-semibold mt-4">5. Limitation of Liability</h3>
            <p>Solocorn shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of the service.</p>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

// --- Categories Page Component ---

const CategoriesModal = ({ isOpen, onClose, lang, mode }: { isOpen: boolean; onClose: () => void; lang: Language; mode: ThemeMode }) => {
  const t = (key: string) => translations[key]?.[lang] || translations[key]?.['en'] || key;
  
  if (!isOpen) return null;

  // Group categories by their category type
  const groupedCategories = CATEGORIES.reduce((acc, cat) => {
    if (!acc[cat.category]) acc[cat.category] = [];
    acc[cat.category].push(cat);
    return acc;
  }, {} as Record<string, typeof CATEGORIES>);

  const categoryOrder = ['Curriculums', 'Standardized Tests', 'College Admission Exams'];

  return (
    <AnimatePresence>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[100] flex items-center justify-center p-4">
        <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose} />
        <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }} className={`relative w-full max-w-4xl max-h-[80vh] overflow-y-auto backdrop-blur-xl border rounded-2xl p-8 shadow-2xl ${mode === 'dark' ? 'bg-zinc-900/95 border-white/10' : 'bg-white/95 border-black/10'}`}>
          <button onClick={onClose} className={`absolute top-4 right-4 p-2 transition-colors ${mode === 'dark' ? 'text-zinc-400 hover:text-white' : 'text-zinc-600 hover:text-black'}`}><X className="w-5 h-5" /></button>
          <h2 className={`text-3xl font-bold mb-2 ${mode === 'dark' ? 'text-white' : 'text-zinc-900'}`}>{t('viewAllCategories')}</h2>
          <p className={`mb-8 ${mode === 'dark' ? 'text-zinc-400' : 'text-zinc-600'}`}>Explore all curriculums, standardized tests, and college admission exams available on Solocorn</p>
          
          <div className="space-y-8">
            {categoryOrder.map((categoryName) => (
              groupedCategories[categoryName] && (
                <div key={categoryName}>
                  <h3 className={`text-lg font-semibold mb-4 ${mode === 'dark' ? 'text-emerald-400' : 'text-emerald-600'}`}>{categoryName}</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {groupedCategories[categoryName].map((cat) => (
                      <div key={cat.id} className={`p-4 rounded-xl border transition-all hover:scale-105 cursor-pointer ${mode === 'dark' ? 'bg-white/5 border-white/10 hover:border-emerald-500/50' : 'bg-gray-50 border-black/10 hover:border-emerald-500/50'}`}>
                        <div className={`w-12 h-12 rounded-lg ${cat.color} flex items-center justify-center mb-3`}>
                          <cat.icon className="w-6 h-6 text-white" />
                        </div>
                        <h3 className={`font-bold ${mode === 'dark' ? 'text-white' : 'text-zinc-900'}`}>{cat.name}</h3>
                        <p className={`text-sm mt-1 ${mode === 'dark' ? 'text-zinc-400' : 'text-zinc-600'}`}>{cat.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )
            ))}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

// --- Main Page Component ---

export default function LandingPage() {
  const [modalType, setModalType] = useState<ModalType>(null);
  const [showCategories, setShowCategories] = useState(false);
  const [language, setLanguage] = useState<Language>('en');
  const [theme, setTheme] = useState<ColorTheme>('emerald');
  const [mode, setMode] = useState<ThemeMode>('dark');
  const [chatOpen, setChatOpen] = useState(false);
  const [contactModalOpen, setContactModalOpen] = useState(false);
  const [privacyOpen, setPrivacyOpen] = useState(false);
  const [termsOpen, setTermsOpen] = useState(false);

  const t = (key: string) => translations[key]?.[language] || translations[key]?.['en'] || key;

  return (
    <div className={`min-h-screen relative ${mode === 'dark' ? 'text-zinc-100' : 'text-zinc-900'}`}>
      <FuturisticBackground theme={theme} mode={mode} />
      <Navbar onRegister={() => setModalType('register')} lang={language} onLanguageChange={setLanguage} theme={theme} mode={mode} onThemeChange={setTheme} onModeChange={setMode} />
      <ComingSoonModal isOpen={modalType !== null} onClose={() => setModalType(null)} type={modalType} lang={language} theme={theme} mode={mode} />
      <CategoriesModal isOpen={showCategories} onClose={() => setShowCategories(false)} lang={language} mode={mode} />
      <ContactModal isOpen={contactModalOpen} onClose={() => setContactModalOpen(false)} lang={language} mode={mode} />
      <PrivacyPolicyModal isOpen={privacyOpen} onClose={() => setPrivacyOpen(false)} mode={mode} />
      <TermsOfServiceModal isOpen={termsOpen} onClose={() => setTermsOpen(false)} mode={mode} />
      
      {/* Investor Chat */}
      <InvestorChat lang={language} theme={theme} mode={mode} isOpen={chatOpen} onClose={() => setChatOpen(false)} />

      <motion.main initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="pt-24 relative">
        {/* Hero Section */}
        <section className="px-6 py-20 md:py-32 text-center relative overflow-hidden">
          <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }}>
            <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border text-sm font-medium mb-8 backdrop-blur-sm ${mode === 'dark' ? `bg-${theme}-500/10 border-${theme}-500/20 text-${theme}-400` : `bg-${theme}-100 border-${theme}-300 text-${theme}-700`}`}>
              <span className="relative flex h-2 w-2"><span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75`} style={{ backgroundColor: THEMES[theme].colors.primary }}></span><span className="relative inline-flex rounded-full h-2 w-2 bg-current"></span></span>
              {t('comingSoon')}
            </div>
            <h1 className={`text-6xl md:text-8xl font-bold tracking-tighter mb-4 drop-shadow-2xl ${mode === 'dark' ? '' : ''}`}>{t('launch')} <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">Solocorn</span></h1>
            <p className={`text-xl md:text-2xl font-medium mb-8 ${mode === 'dark' ? 'text-zinc-300' : 'text-zinc-700'}`}>Live AI-Augmented Instruction Platform</p>
            
            {/* Tooltip above the button */}
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className={`text-sm mb-3 ${mode === 'dark' ? 'text-zinc-400' : 'text-zinc-600'}`}
            >
              Learn about Solocorn
            </motion.p>
            
            {/* Ask Solocorn Button - glowing and active */}
            <motion.button
              onClick={() => setChatOpen(true)}
              className={`relative inline-flex items-center gap-2 px-6 py-3 rounded-full text-lg font-semibold mb-12 transition-all ${mode === 'dark' ? 'bg-white/10 hover:bg-white/20 text-white border border-white/20' : 'bg-black/10 hover:bg-black/20 text-zinc-900 border border-black/20'}`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              animate={{
                boxShadow: [
                  '0 0 20px rgba(16, 185, 129, 0.3)',
                  '0 0 40px rgba(16, 185, 129, 0.5)',
                  '0 0 20px rgba(16, 185, 129, 0.3)',
                ]
              }}
              transition={{
                boxShadow: {
                  duration: 2,
                  repeat: Infinity,
                  ease: 'easeInOut'
                }
              }}
            >
              <Sparkles className="w-5 h-5" />
              {t('askSolocorn')}
            </motion.button>
            <div className="mb-16"><CountdownTimer /></div>
            {/* Get Early Access button removed as requested */}
          </motion.div>
        </section>

        {/* Tutor Strip */}
        <section className="mb-32">
          <div className="max-w-7xl mx-auto px-6 mb-8 flex justify-between items-end">
            <div>
              <h2 className={`text-3xl font-bold drop-shadow-lg ${mode === 'dark' ? 'text-white' : 'text-zinc-900'}`}>{t('solocornTutors')}</h2>
              {/* Description removed as requested */}
            </div>
            <button onClick={() => setShowCategories(true)} className={`text-sm font-bold flex items-center gap-1 hover:underline ${mode === 'dark' ? `text-${theme}-400` : `text-${theme}-600`}`}>{t('viewAllCategories')} <ChevronRight className="w-4 h-4" /></button>
          </div>
          <TutorStrip />
        </section>

        {/* Special Access */}
        <SpecialAccessSection lang={language} theme={theme} mode={mode} />

        {/* Action Grid */}
        <section className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-32">
          <ActionCard title={t('becomeTutor')} copy={t('becomeTutorDesc')} buttonText={t('applyToTeach')} icon={UserPlus} onClick={() => setModalType('tutor')} theme={theme} mode={mode} />
          <ActionCard title={t('startAcademy')} copy={t('startAcademyDesc')} buttonText={t('launchAcademy')} icon={GraduationCap} onClick={() => setModalType('academy')} theme={theme} mode={mode} />
          <ActionCard title={t('solocornSchools')} copy={t('schoolsDesc')} buttonText={t('partnerWithUs')} icon={School} onClick={() => setModalType('schools')} theme={theme} mode={mode} />
        </section>

        {/* Business Section */}
        <section className="max-w-7xl mx-auto px-6 mb-32">
          <div className={`backdrop-blur-md border p-12 rounded-[40px] flex flex-col md:flex-row items-center justify-between gap-12 ${mode === 'dark' ? 'bg-zinc-900/60 border-emerald-500/10' : 'bg-white/60 border-emerald-500/20'}`}>
            <div className="max-w-xl">
              <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-8 ${mode === 'dark' ? 'bg-white/5' : 'bg-black/5'}`}><Building2 className={`w-8 h-8 ${mode === 'dark' ? 'text-white' : 'text-zinc-900'}`} /></div>
              <h2 className={`text-4xl font-bold mb-6 ${mode === 'dark' ? 'text-white' : 'text-zinc-900'}`}>{t('businessInquiries')}</h2>
              <p className={`text-lg leading-relaxed mb-8 ${mode === 'dark' ? 'text-zinc-400' : 'text-zinc-600'}`}>{t('businessDesc')}</p>
              <button 
                onClick={() => setContactModalOpen(true)}
                className={`inline-flex items-center gap-3 px-8 py-4 rounded-2xl font-bold transition-colors ${mode === 'dark' ? 'bg-white/5 hover:bg-white/10' : 'bg-black/5 hover:bg-black/10'}`}
              >
                <Mail className="w-5 h-5" />{t('contact')}
              </button>
            </div>
            <div className={`w-full md:w-1/3 aspect-square rounded-3xl flex items-center justify-center relative overflow-hidden border ${mode === 'dark' ? 'bg-white/5 border-white/10' : 'bg-black/5 border-black/10'}`}>
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/20 to-transparent" />
              <Building2 className={`w-32 h-32 ${mode === 'dark' ? 'text-white/10' : 'text-black/10'}`} />
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className={`border-t py-20 px-6 ${mode === 'dark' ? 'border-white/5' : 'border-black/5'}`}>
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
            <div className={`text-2xl font-bold tracking-tighter ${mode === 'dark' ? '' : 'text-zinc-900'}`}>{t('footerBrand')}</div>
            <div className={`flex gap-8 text-sm ${mode === 'dark' ? 'text-zinc-500' : 'text-zinc-600'}`}>
              <button 
                onClick={() => setPrivacyOpen(true)}
                className={`hover:text-${theme}-400 transition-colors cursor-pointer bg-transparent border-0`}
              >
                {t('privacyPolicy')}
              </button>
              <button 
                onClick={() => setTermsOpen(true)}
                className={`hover:text-${theme}-400 transition-colors cursor-pointer bg-transparent border-0`}
              >
                {t('termsOfService')}
              </button>
              <button 
                onClick={() => setContactModalOpen(true)}
                className={`hover:text-${theme}-400 transition-colors cursor-pointer bg-transparent border-0`}
              >
                {t('contact')}
              </button>
            </div>
            <div className={`text-sm ${mode === 'dark' ? 'text-zinc-600' : 'text-zinc-500'}`}>{t('allRightsReserved')}</div>
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
