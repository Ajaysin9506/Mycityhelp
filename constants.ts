import { Service, Skill, LostItem, Complaint, Shop } from './types';

export const SERVICES: Service[] = [
  { id: '1', name: 'CoolBreeze AC Repair', category: 'Appliance', icon: 'snowflake', description: 'Expert AC servicing and gas refilling.', priceStart: '$20' },
  { id: '2', name: 'Sparky Electrician', category: 'Home', icon: 'zap', description: 'Fixing wiring, fuses, and fan installation.', priceStart: '$15' },
  { id: '3', name: 'AquaFlow Plumbers', category: 'Home', icon: 'droplet', description: 'Leak repairs, tap installation, and tank cleaning.', priceStart: '$18' },
  { id: '4', name: 'Spotless Home Cleaning', category: 'Cleaning', icon: 'sparkles', description: 'Deep cleaning for apartments and villas.', priceStart: '$40' },
  { id: '5', name: 'TechFix Mobile', category: 'Repair', icon: 'smartphone', description: 'Screen replacement and battery issues.', priceStart: '$25' },
  { id: '6', name: 'Hammer & Nail Carpentry', category: 'Home', icon: 'hammer', description: 'Furniture repair and custom woodwork.', priceStart: '$30' },
];

export const SKILLS: Skill[] = [
  { id: '1', user: 'Alice Chen', skill: 'React Development', type: 'OFFER', description: 'I can build websites for small businesses.', tags: ['coding', 'web'] },
  { id: '2', user: 'Bob Smith', skill: 'Guitar Lessons', type: 'REQUEST', description: 'Looking for a beginner guitar tutor on weekends.', tags: ['music', 'learning'] },
  { id: '3', user: 'Carol Davis', skill: 'French Cooking', type: 'OFFER', description: 'Teaching authentic French culinary basics.', tags: ['cooking', 'lifestyle'] },
  { id: '4', user: 'David Kim', skill: 'Math Tutoring', type: 'OFFER', description: 'High school algebra and calculus tutoring.', tags: ['education', 'math'] },
];

export const LOST_ITEMS: LostItem[] = [
  { id: '1', type: 'LOST', category: 'Pet', title: 'Golden Retriever - "Buddy"', description: 'Lost near Central Park. Wearing a red collar.', date: '2023-10-25', location: 'Downtown', imagePlaceholder: 'https://picsum.photos/400/300?random=1' },
  { id: '2', type: 'FOUND', category: 'Wallet', title: 'Black Leather Wallet', description: 'Found on the bus line 42. Contains ID.', date: '2023-10-26', location: 'Bus Station', imagePlaceholder: 'https://picsum.photos/400/300?random=2' },
];

export const COMPLAINTS: Complaint[] = [
  { id: '1', title: 'Street Light Broken on 5th Ave', description: 'The light has been flickering and is now completely off, creating a safety hazard.', status: 'Pending', category: 'Infrastructure', upvotes: 12 },
  { id: '2', title: 'Garbage Pileup in Sector 4', description: 'Trash has not been collected for 3 days. Foul smell spreading.', status: 'In Progress', category: 'Sanitation', upvotes: 45 },
  { id: '3', title: 'Pothole on Main St', description: 'Large pothole damaging vehicles near the bakery.', status: 'Resolved', category: 'Roads', upvotes: 8 },
];

export const SHOPS: Shop[] = [
  { id: '1', name: 'Green Valley Grocers', category: 'Grocery', location: 'Block A', rating: 4.8, deliveryTime: '30 mins' },
  { id: '2', name: 'City Pharmacy', category: 'Pharmacy', location: 'Market Square', rating: 4.5, deliveryTime: '15 mins' },
  { id: '3', name: 'Paper & Pen Stationers', category: 'Stationery', location: 'Near School', rating: 4.2, deliveryTime: '45 mins' },
  { id: '4', name: 'Fresh Dairy Farm', category: 'Dairy', location: 'Block C', rating: 4.9, deliveryTime: '20 mins' },
];