export type Bootcamp = {
  _id: string;
  name: string;
  description: string;
};

export type SafeBootcamp = {
  _id?: string;
  name: string;
  slug?: string;
  description: string;
  website?: string;
  phone?: string;
  email?: string;
  address: string;
  location?: {
    type?: string;
    coordinates?: [number, number];
    formattedAddress?: string;
    street?: string;
    city?: string;
    state?: string;
    zipcode?: string;
    country?: string;
  };
  careers: string[];
  averageRating?: number;
  averageCost?: number;
  photo?: string;
  housing?: boolean;
  jobAssistance?: boolean;
  jobGuarantee?: boolean;
  acceptGi?: boolean;
  createdAt?: Date;
  user?: string;
  courses?: string[] | SafeCourse[];
};

export type SafeCourse = {
  _id: string;
  title: string;
  description: string;
  image: String;
  weeks: number;
  tuition: number;
  scholarshipAvailable?: boolean;
  createdAt?: Date;
  bootcamp: SafeBootcamp;
  user: SafeUser;
  minimumSkill?: string;
};

export type SafeUser = {
  _id: string;
  name: string;
  email: string;
  role: "user" | "publisher" | "admin";
  image: string;
  createdAt?: Date;
  status?: string;
};

export type SafeReview = {
  _id: string;
  title: string;
  text: string;
  rating: number;
  createdAt?: Date;
  bootcamp: string;
  user: SafeUser;
};

export type SafeUpgradeRequest = {
  _id: string;
  user: string;
  role: string;
  status: string;
  createdAt?: Date;
  users: SafeUser;
};

export interface ApiResponse {
  offset: number;
  limit: number;
  total: number;
  count: number;
  data: SafeUpgradeRequest[];
}
