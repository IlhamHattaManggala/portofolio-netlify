import type { IconType } from "react-icons";

export type TReadme = {
  name?: string;
  icon?: IconType;
}

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
  image?: string;
};
export type TTemplates = {
  id: number;
  content?: string;
};