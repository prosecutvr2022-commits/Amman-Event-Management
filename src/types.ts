export type ServiceCategory = 
  | 'all'
  | 'weddings'
  | 'corporate'
  | 'creative'
  | 'complete';

export interface EventService {
  id: string;
  name: string;
  category: 'weddings' | 'corporate' | 'creative' | 'complete';
  shortDesc: string;
  fullDesc: string;
  highlight: string;
  iconName: string;
  bgGradient: string;
  features: string[];
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'weddings' | 'corporate' | 'birthday' | 'themes' | 'special';
  location: string;
  tag: string;
  description: string;
  accentColor: string;
}

export interface Testimonial {
  id: string;
  name: string;
  event: string;
  location: string;
  quote: string;
  rating: number;
  date: string;
}

export interface EnquiryFormData {
  name: string;
  phone: string;
  email: string;
  eventType: string;
  eventDate: string;
  eventLocation: string;
  guestCount: string;
  services: string[];
  message: string;
}
