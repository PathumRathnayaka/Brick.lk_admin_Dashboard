import { Service } from '../types';

export const services: Service[] = [
  {
    id: 'building-construction',
    name: 'Building Construction',
    category: 'General Construction Services',
    subcategory: 'Building Constructions',
    description: 'Complete building construction services from foundation to finishing for residential, commercial, and industrial buildings.',
    imageUrl: 'https://images.pexels.com/photos/157294/construction-worker-concrete-hummer-vibrator-159294.jpeg',
    providerCount: 52,
  },
  {
    id: 'civil-construction',
    name: 'Civil Construction',
    category: 'General Construction Services',
    subcategory: 'Civil Construction',
    description: 'Specialized civil engineering construction services for highways, water supply, drainage, airports, irrigation, bridges, and buildings.',
    imageUrl: 'https://images.pexels.com/photos/544966/pexels-photo-544966.jpeg',
    providerCount: 34,
  },
  {
    id: 'roads-highways',
    name: 'Roads & Highways',
    category: 'General Construction Services',
    subcategory: 'Roads & Highways',
    description: 'Construction and maintenance of roads, highways, and related infrastructure such as culverts and drainage systems.',
    imageUrl: 'https://images.pexels.com/photos/1797348/pexels-photo-1797348.jpeg',
    providerCount: 28,
  },
  {
    id: 'water-projects',
    name: 'Water & Wastewater Projects',
    category: 'Specialized Construction Services',
    subcategory: 'Water & Wastewater Projects',
    description: 'Design and construction of water supply systems, wastewater treatment plants, and related infrastructure for communities and industries.',
    imageUrl: 'https://images.pexels.com/photos/416405/pexels-photo-416405.jpeg',
    providerCount: 20,
  },
  {
    id: 'swimming-pools',
    name: 'Swimming Pool Construction',
    category: 'Specialized Construction Services',
    subcategory: 'Swimming Pool Constructions',
    description: 'Design and construction of swimming pools for residential, commercial, and recreational facilities with various finishing options.',
    imageUrl: 'https://images.pexels.com/photos/261101/pexels-photo-261101.jpeg',
    providerCount: 15,
  },
  {
    id: 'architectural-services',
    name: 'Architectural Services',
    category: 'Architectural and Engineering Services',
    subcategory: 'Architectural Services',
    description: 'Comprehensive architectural design services for residential, commercial, and institutional buildings with attention to aesthetics and functionality.',
    imageUrl: 'https://images.pexels.com/photos/6444354/pexels-photo-6444354.jpeg',
    providerCount: 48,
  },
  {
    id: 'mep-services',
    name: 'MEP Services',
    category: 'Specialized Construction Services',
    subcategory: 'MEP Services',
    description: 'Mechanical, electrical, and plumbing services for buildings and infrastructure projects, ensuring efficient and compliant systems.',
    imageUrl: 'https://images.pexels.com/photos/1078990/pexels-photo-1078990.jpeg',
    providerCount: 32,
  },
  {
    id: 'quantity-surveying',
    name: 'Quantity Surveying',
    category: 'Architectural and Engineering Services',
    subcategory: 'Quantity Surveying Services',
    description: 'Professional quantity surveying services including cost estimation, bill of quantities preparation, and contract administration.',
    imageUrl: 'https://images.pexels.com/photos/159306/construction-site-build-construction-work-159306.jpeg',
    providerCount: 25,
  },
];

export const getServiceById = (id: string): Service | undefined => {
  return services.find(service => service.id === id);
};