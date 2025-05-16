import { Category } from '../types';

export const categories: Category[] = [
  {
    id: 'building-materials',
    name: 'Building Materials',
    imageUrl: 'https://images.pexels.com/photos/5582837/pexels-photo-5582837.jpeg',
    subcategories: [
      { id: 'cement', name: 'Cement', imageUrl: 'https://images.pexels.com/photos/5691544/pexels-photo-5691544.jpeg' },
      { id: 'sand', name: 'Sand', imageUrl: 'https://images.pexels.com/photos/3334360/pexels-photo-3334360.jpeg' },
      { id: 'bricks', name: 'Bricks', imageUrl: 'https://images.pexels.com/photos/2092078/pexels-photo-2092078.jpeg' },
      { id: 'steel', name: 'Steel', imageUrl: 'https://images.pexels.com/photos/4513940/pexels-photo-4513940.jpeg' },
    ],
  },
  {
    id: 'electrical',
    name: 'Electrical',
    imageUrl: 'https://images.pexels.com/photos/257736/pexels-photo-257736.jpeg',
    subcategories: [
      { id: 'lighting', name: 'Lighting', imageUrl: 'https://images.pexels.com/photos/577514/pexels-photo-577514.jpeg' },
      { id: 'wiring', name: 'Wiring', imageUrl: 'https://images.pexels.com/photos/1109541/pexels-photo-1109541.jpeg' },
      { id: 'switches', name: 'Switches & Sockets', imageUrl: 'https://images.pexels.com/photos/6444366/pexels-photo-6444366.jpeg' },
    ],
  },
  {
    id: 'plumbing',
    name: 'Plumbing',
    imageUrl: 'https://images.pexels.com/photos/1078990/pexels-photo-1078990.jpeg',
    subcategories: [
      { id: 'pipes', name: 'Pipes & Fittings', imageUrl: 'https://images.pexels.com/photos/4491014/pexels-photo-4491014.jpeg' },
      { id: 'pumps', name: 'Pumps', imageUrl: 'https://images.pexels.com/photos/4491881/pexels-photo-4491881.jpeg' },
      { id: 'faucets', name: 'Faucets & Fixtures', imageUrl: 'https://images.pexels.com/photos/369598/pexels-photo-369598.jpeg' },
    ],
  },
  {
    id: 'finishing',
    name: 'Finishing Materials',
    imageUrl: 'https://images.pexels.com/photos/7031406/pexels-photo-7031406.jpeg',
    subcategories: [
      { id: 'paint', name: 'Paint', imageUrl: 'https://images.pexels.com/photos/5582597/pexels-photo-5582597.jpeg' },
      { id: 'tiles', name: 'Tiles', imageUrl: 'https://images.pexels.com/photos/5260554/pexels-photo-5260554.jpeg' },
      { id: 'flooring', name: 'Flooring', imageUrl: 'https://images.pexels.com/photos/1603884/pexels-photo-1603884.jpeg' },
    ],
  },
];

export const getCategory = (id: string): Category | undefined => {
  return categories.find(category => category.id === id);
};