import { Dayjs } from "dayjs";
export interface Tasks {
  id?: string;
  title: string;
  description: string;
  dateHour: Dayjs | null;
  duration: Dayjs | null;
  tags?: Tag[];
}

export interface Tag {
  id: string;
  title: string;
}

export interface Holidays {
  date: string;
  localName: string;
  name: string;
  countryCode: string;
  fixed: boolean;
  global: boolean;
  counties?: string[];
  launchYear: any;
  types: string[];
}
