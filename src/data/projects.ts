import type { TProject } from "../components/types";
import {
  MyPorto,
  FoodPlanWeb,
  FoodPlanMobile,
  SenjaMobile,
  ihGamers,
  ChattbotJawa,
  Caffeku,
  SampleCompany,
  SampleSchool,
} from "../assets";

const projects: TProject[] = [
  {
    name: "Website Portofolio",
    descriptions:
      "Website portofolio pribadi yang menampilkan informasi, keterampilan, dan proyek-proyek yang telah saya kerjakan. Dibangun menggunakan HTML, CSS, dan JavaScript.",
    tipe: "Website",
    library: ["HTML", "CSS", "JavaScript"],
    image: MyPorto,
    link: "https://github.com/IlhamHattaManggala/portofolio-netlify",
  },
  {
    name: "Aplikasi Rekomendasi Resep Masakan Berbasis AI Berdasarkan Bahan Makanan",
    descriptions:
      "Aplikasi berbasis web untuk merencanakan menu makanan bergizi dengan dukungan AI menggunakan TensorFlow. Backend menggunakan Flask dan database MySQL.",
    tipe: "Website",
    library: ["Flask", "Python", "Tensorflow", "Bootstrap", "MySQL"],
    image: FoodPlanWeb,
    link: null,
  },
  {
    name: "Aplikasi Rekomendasi Resep Masakan Berbasis AI Berdasarkan Bahan Makanan",
    descriptions:
      "Versi mobile dari FoodPlan yang dibuat menggunakan Flutter dan terintegrasi dengan backend via API. Mendukung Firebase untuk autentikasi dan penyimpanan.",
    tipe: "Website",
    library: ["Flutter", "Dart", "Firebase", "API"],
    image: FoodPlanMobile,
    link: null,
  },
  {
    name: "Aplikasi Monitoring Belajar Tari",
    descriptions:
      "Aplikasi edukasi budaya Jawa yang dibangun menggunakan Flutter dan arsitektur GetX Pattern. Mendukung autentikasi Firebase dan pengelolaan data lokal.",
    tipe: "Website",
    library: ["Flutter", "Dart", "GetX Patern", "Get CLI", "Firebase"],
    image: SenjaMobile,
    link: null,
  },
  {
    name: "Sistem Rekomendasi Karakter Game Genshin Impact Metode TOPSIS dan SAW",
    descriptions:
      "Aplikasi web yang menggunakan metode TOPSIS dan SAW untuk memberikan rekomendasi karakter game terbaik berdasarkan preferensi pengguna. Dibuat dengan Laravel.",
    tipe: "Website",
    library: ["Laravel", "PHP", "Bootstrap", "TOPSIS", "SAW"],
    image: ihGamers,
    link: null,
  },
  {
    name: "Chatbot Obrolan Jawa",
    descriptions:
      "Sebuah chatbot edukatif tentang kebudayaan dan kesenian Jawa yang dibangun menggunakan TensorFlow dan Bootstrap. Memberikan informasi dan interaksi secara real-time.",
    tipe: "Website",
    library: ["HTML", "CSS", "Bootstrap", "Tensorflow"],
    image: ChattbotJawa,
    link: null,
  },
  {
    name: "Sistem Reservasi Café",
    descriptions:
      "Sistem reservasi café berbasis web interaktif menggunakan Laravel untuk backend dan React + Tailwind untuk frontend. Menyediakan pemetaan tempat duduk dan pemesanan real-time.",
    tipe: "Website",
    library: ["Laravel", "PHP", "React", "Tailwind"],
    image: Caffeku,
    link: null,
  },
  {
    name: "Sample Company",
    descriptions:
      "Sample Company adalah website yang menampilkan informasi perusahaan, layanan, dan kontak. Dibangun menggunakan React + Tailwind.",
    tipe: "Website",
    library: ["React", "Tailwind"],
    image: SampleCompany,
    link: "https://company-sample.vercel.app/",
  },
  {
    name: "Sample School Profile",
    descriptions:
      "Sample School Profile adalah website yang menampilkan informasi sekolah, layanan, dan kontak. Dibangun menggunakan React + Tailwind.",
    tipe: "Website",
    library: ["React", "Tailwind"],
    image: SampleSchool,
    link: "https://school-profile-delta.vercel.app/",
  },
];

export default projects;
