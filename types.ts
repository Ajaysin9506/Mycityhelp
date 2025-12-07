export interface Service {
  id: string;
  name: string;
  category: string;
  icon: string;
  description: string;
  priceStart: string;
}

export interface Skill {
  id: string;
  user: string;
  skill: string;
  type: 'OFFER' | 'REQUEST';
  description: string;
  tags: string[];
}

export interface LostItem {
  id: string;
  type: 'LOST' | 'FOUND';
  category: string;
  title: string;
  description: string;
  date: string;
  location: string;
  imagePlaceholder: string;
}

export interface Complaint {
  id: string;
  title: string;
  description: string;
  status: 'Pending' | 'In Progress' | 'Resolved';
  category: string;
  upvotes: number;
}

export interface Shop {
  id: string;
  name: string;
  category: string;
  location: string;
  rating: number;
  deliveryTime: string;
}

export type ViewState = 'HOME' | 'SERVICES' | 'SKILLS' | 'LOSTFOUND' | 'COMPLAINTS' | 'DELIVERY';

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}