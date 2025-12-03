import type { TTechnology, TProject, TSertifikat, TReadme } from "../types";
import {
  FaClipboardList,
  FaMedal,
  FaChartPie,
  FaGamepad,
  FaGlobe,
  FaCalendarDay,
  FaEye,
  FaImage,
  FaMusic,
} from "react-icons/fa";
import {
  FaPuzzlePiece,
  FaSignature,
} from "react-icons/fa6"; // Font Awesome 6
import {
  typescript,
  html,
  css,
  reactjs,
  tailwind,
  nodejs,
  mongodb,
  git,
  figma,
  Caffeku,
  ChattbotJawa,
  FoodPlanMobile,
  FoodPlanWeb,
  MyPorto,
  SenjaMobile,
  ihGamers,
  Dart,
  Flask,
  Flutter,
  Mysql,
  PHP,
  Python,
  Unity,
  Dicoding1,
  Dicoding2,
  Huawei1,
  Huawei2,
  Huawei3,
  Huawei4,
  Huawei5,
  Huawei6,
  Huawei7,
  Huawei8,
  Huawei9,
  POMN,
  Udemy1,
  Udemy2,
  Udemy3,
  Udemy4,
  Udemy5,
  Dicoding3,
  Dicoding4,
  Dicoding5,
  Dicoding6,
  Huawei10
} from "../../assets";

const card: TReadme[] = [
  {
    name: "Templates",
    icon: FaClipboardList,
  },
  {
    name: "Text",
    icon: FaSignature, // tanda tangan = teks personal
  },
  {
    name: "Skill",
    icon: FaMedal,
  },
  {
    name: "Stats",
    icon: FaChartPie,
  },
  {
    name: "Snake",
    icon: FaGamepad,
  },
  {
    name: "Sosial Media",
    icon: FaGlobe,
  },
  {
    name: "Packman",
    icon: FaPuzzlePiece, // ikon puzzle cocok untuk game
  },
  {
    name: "My Activities",
    icon: FaCalendarDay,
  },
  {
    name: "Profile View",
    icon: FaEye,
  },
  {
    name: "Image",
    icon: FaImage,
  },
  {
    name: "Musik",
    icon: FaMusic,
  },
];

const technologies: TTechnology[] = [
  {
    name: "HTML 5",
    icon: html,
  },
  {
    name: "CSS 3",
    icon: css,
  },
  {
    name: "TypeScript",
    icon: typescript,
  },
  {
    name: "React JS",
    icon: reactjs,
  },
  {
    name: "Tailwind CSS",
    icon: tailwind,
  },
  {
    name: "Node JS",
    icon: nodejs,
  },
  {
    name: "MongoDB",
    icon: mongodb,
  },
  {
    name: "git",
    icon: git,
  },
  {
    name: "figma",
    icon: figma,
  },
  {
    name: "flask",
    icon: Flask,
  },
  {
    name: "flutter",
    icon: Flutter,
  },
  {
    name: "mysql",
    icon: Mysql,
  },
  {
    name: "python",
    icon: Python,
  },
  {
    name: "PHP",
    icon: PHP,
  },
  {
    name: "Dart",
    icon: Dart,
  },
  {
    name: "Unity",
    icon: Unity,
  },
];

const projects: TProject[] = [
  {
    name: "Website Portofolio",
    descriptions:
      "Website portofolio pribadi yang menampilkan informasi, keterampilan, dan proyek-proyek yang telah saya kerjakan. Dibangun menggunakan HTML, CSS, dan JavaScript.",
    tipe: "Website",
    library: ["HTML", "CSS", "JavaScript"],
    image: MyPorto,
  },
  {
    name: "Aplikasi Rekomendasi Resep Masakan Berbasis AI Berdasarkan Bahan Makanan",
    descriptions:
      "Aplikasi berbasis web untuk merencanakan menu makanan bergizi dengan dukungan AI menggunakan TensorFlow. Backend menggunakan Flask dan database MySQL.",
    tipe: "Website",
    library: ["Flask", "Python", "Tensorflow", "Bootstrap", "MySQL"],
    image: FoodPlanWeb,
  },
  {
    name: "Aplikasi Rekomendasi Resep Masakan Berbasis AI Berdasarkan Bahan Makanan",
    descriptions:
      "Versi mobile dari FoodPlan yang dibuat menggunakan Flutter dan terintegrasi dengan backend via API. Mendukung Firebase untuk autentikasi dan penyimpanan.",
    tipe: "Website",
    library: ["Flutter", "Dart", "Firebase", "API"],
    image: FoodPlanMobile,
  },
  {
    name: "Aplikasi Monitoring Belajar Tari",
    descriptions:
      "Aplikasi edukasi budaya Jawa yang dibangun menggunakan Flutter dan arsitektur GetX Pattern. Mendukung autentikasi Firebase dan pengelolaan data lokal.",
    tipe: "Website",
    library: ["Flutter", "Dart", "GetX Patern", "Get CLI", "Firebase"],
    image: SenjaMobile,
  },
  {
    name: "Sistem Rekomendasi Karakter Game Genshin Impact Metode TOPSIS dan SAW",
    descriptions:
      "Aplikasi web yang menggunakan metode TOPSIS dan SAW untuk memberikan rekomendasi karakter game terbaik berdasarkan preferensi pengguna. Dibuat dengan Laravel.",
    tipe: "Website",
    library: ["Laravel", "PHP", "Bootstrap", "TOPSIS", "SAW"],
    image: ihGamers,
  },
  {
    name: "Chatbot Obrolan Jawa",
    descriptions:
      "Sebuah chatbot edukatif tentang kebudayaan dan kesenian Jawa yang dibangun menggunakan TensorFlow dan Bootstrap. Memberikan informasi dan interaksi secara real-time.",
    tipe: "Website",
    library: ["HTML", "CSS", "Bootstrap", "Tensorflow"],
    image: ChattbotJawa,
  },
  {
    name: "Sistem Reservasi Café",
    descriptions:
      "Sistem reservasi café berbasis web interaktif menggunakan Laravel untuk backend dan React + Tailwind untuk frontend. Menyediakan pemetaan tempat duduk dan pemesanan real-time.",
    tipe: "Website",
    library: ["Laravel", "PHP", "React", "Tailwind"],
    image: Caffeku,
  },
];

const sertifikat: TSertifikat[] = [
    {
        id: 1,
        platform: "Dicoding",
        category: "Dicoding",
        title: "Belajar Dasar Pemograman Web",
        image: Dicoding1,
    },
    {
        id: 2,
        platform: "Dicoding",
        category: "Dicoding",
        title: "Belajar Pemograman Dart",
        image: Dicoding2,
    },
    {
        id: 3,
        platform: "Dicoding",
        category: "Dicoding",
        title: "Belajar Dasar Manajement Proyek",
        image: Dicoding3,
    },
    {
        id: 4,
        platform: "Dicoding",
        category: "Dicoding",
        title: "Belajar Prinsip Pemograman SOLID",
        image: Dicoding4,
    },
    {
        id: 5,
        platform: "Dicoding",
        category: "Dicoding",
        title: "Memulai Pemograman Dengan C",
        image: Dicoding5,
    },
    {
        id: 6,
        platform: "Dicoding",
        category: "Dicoding",
        title: "Memulai Pemograman Dengan Java",
        image: Dicoding6,
    },
    {
        id: 7,
        platform: "Kemendikbud",
        category: "Kemendikbud",
        title: "Program Ormawa Membangun Negeri",
        image: POMN,
    },
    {
        id: 8,
        platform: "Huawei",
        category: "Huawei",
        title: "AI Basics",
        image: Huawei1,
    },
    {
        id: 9,
        platform: "Huawei",
        category: "Huawei",
        title: "Computer Network (CRA Training Program)",
        image: Huawei2,
    },
    {
        id: 10,
        platform: "Huawei",
        category: "Huawei",
        title: "Computer Network",
        image: Huawei3,
    },
    {
        id: 11,
        platform: "Huawei",
        category: "Huawei",
        title: "AI Basics: Overview of AI (CRA Training Program)",
        image: Huawei4,
    },
    {
        id: 12,
        platform: "Huawei",
        category: "Huawei",
        title: "HCIA Datacom V1.0 Course",
        image: Huawei5,
    },
    {
        id: 13,
        platform: "Huawei",
        category: "Huawei",
        title: "Python Programming Basics",
        image: Huawei6,
    },
    {
        id: 14,
        platform: "Huawei",
        category: "Huawei",
        title: "Search and AI",
        image: Huawei7,
    },
    {
        id: 15,
        platform: "Huawei",
        category: "Huawei",
        title: "Search and AI (French)",
        image: Huawei8,
    },
    {
        id: 16,
        platform: "Huawei",
        category: "Huawei",
        title: "HCIA Security V4.0 Course",
        image: Huawei9,
    },
    {
        id: 17,
        platform: "Huawei",
        category: "Huawei",
        title: "The Basics of NoSQL and NewSQL Big Data Management Mechanism",
        image: Huawei10,
    },
    {
        id: 18,
        platform: "Udemy",
        category: "Udemy",
        title: "Full PHP CRASH Course",
        image: Udemy1,
    },
    {
        id: 19,
        platform: "Udemy",
        category: "Udemy",
        title: "Full Stack Web Development Bootcamp",
        image: Udemy2,
    },
    {
        id: 20,
        platform: "Udemy",
        category: "Udemy",
        title: "Master Web Mobile Design Figma UI UX Essentials",
        image: Udemy3,
    },
    {
        id: 21,
        platform: "Udemy",
        category: "Udemy",
        title: "Selenium Web Driver Java Basic",
        image: Udemy4,
    },
    {
        id: 22,
        platform: "Udemy",
        category: "Udemy",
        title: "Selenium Python (Basic + Advance + Framework)",
        image: Udemy5,
    },
]

export { technologies, projects, sertifikat, card };
