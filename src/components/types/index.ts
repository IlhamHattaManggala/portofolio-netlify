import type { IconType } from "react-icons";

export type TReadme = {
  name?: string;
  icon?: IconType;
};

export type TCommonProps = {
  title?: string;
  name?: string;
  icon?: string;
};
export type TProject = {
  descriptions: string;
  tipe: string;
  library: string[];
  image: string;
  link?: string | null;
} & Required<Pick<TCommonProps, "name">>;

export type TTechnology = Required<Omit<TCommonProps, "title">>;

export type CircularProgressProps = {
  percentage: number;
  label: string;
  size?: number;
  strokeWidth?: number;
};
export type TSertifikat = {
  id: number;
  title: string;
  platform: string;
  category?: string | null;
  image?: string;
};
export type TTemplates = {
  id: number;
  content?: string;
};

export type TArticle = {
  id: number;
  title: string;
  slug: string;
  excerpt?: string;
  content: string;
  featured_image?: string;
  meta_title?: string;
  meta_description?: string;
  meta_keywords?: string;
  is_published: boolean;
  published_at?: string;
  views: number;
  created_at?: string;
  updated_at?: string;
};

export type TTestimonial = {
  id: number;
  name: string;
  position?: string;
  company?: string;
  content: string;
  image?: string;
  rating?: number;
};

export type TExperience = {
  id: number;
  company: string;
  position: string;
  description?: string;
  start_date: string;
  end_date?: string | null;
  is_current: boolean;
  location?: string;
};
