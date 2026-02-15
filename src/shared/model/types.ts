export interface Complex {
  id: string;
  address: string;
  image: string;
  metro?: string;
  name: string;
  priceStart?: string;
  subtitle?: string;
}

export interface NewsItem {
  date: string;
  description: string;
  id: string;
  image: string;
  title: string;
}

export interface TeamMember {
  name: string;
  photo: string;
  role: string;
}

export interface VideoItem {
  id: string;
  thumbnailUrl: string;
  title: string;
}
