export interface Product {
  id: string;
  name: string;
  category: 'sword' | 'axe' | 'spear' | 'shield';
  description: string;
  price: number;
  image: string;
  inStock: boolean;
  specifications: string[];
}

export const products: Product[] = [
  {
    id: '1',
    name: 'Excalibur Longsword',
    category: 'sword',
    description: 'A legendary blade forged in the fires of ancient smiths. This longsword features a perfectly balanced steel blade with intricate engravings along the fuller.',
    price: 450,
    image: 'https://images.unsplash.com/photo-1757083840090-17a7bfca08c0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWRpZXZhbCUyMHN3b3JkJTIwd2VhcG9ufGVufDF8fHx8MTc3MzQ5NTUyN3ww&ixlib=rb-4.1.0&q=80&w=1080',
    inStock: true,
    specifications: [
      'Blade Length: 36 inches',
      'Weight: 3.5 lbs',
      'Material: High Carbon Steel',
      'Handle: Leather-wrapped grip'
    ]
  },
  {
    id: '2',
    name: 'Nordic Battle Axe',
    category: 'axe',
    description: 'A fearsome weapon wielded by Viking warriors. Double-bladed design with a reinforced hickory shaft for maximum impact.',
    price: 320,
    image: 'https://images.unsplash.com/photo-1770820986351-fe8c9ae24a19?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWRpZXZhbCUyMGJhdHRsZSUyMGF4ZXxlbnwxfHx8fDE3NzM1MTM1NjF8MA&ixlib=rb-4.1.0&q=80&w=1080',
    inStock: true,
    specifications: [
      'Axe Head: 10 inches',
      'Shaft Length: 32 inches',
      'Weight: 4.2 lbs',
      'Material: Forged Steel Head'
    ]
  },
  {
    id: '3',
    name: 'Knights Templar Spear',
    category: 'spear',
    description: 'A noble weapon carried by crusaders. Features a leaf-shaped blade with a sturdy ash wood pole.',
    price: 280,
    image: 'https://images.unsplash.com/photo-1600081521520-3ad74ab4c753?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWRpZXZhbCUyMHNwZWFyJTIwd2VhcG9ufGVufDF8fHx8MTc3MzUxMzU2Mnww&ixlib=rb-4.1.0&q=80&w=1080',
    inStock: true,
    specifications: [
      'Spearhead: 14 inches',
      'Total Length: 72 inches',
      'Weight: 5.0 lbs',
      'Pole: Hardened Ash Wood'
    ]
  },
  {
    id: '4',
    name: 'Kite Shield of Valor',
    category: 'shield',
    description: 'A defensive masterpiece emblazoned with heraldic designs. Constructed from laminated wood with reinforced steel rim.',
    price: 380,
    image: 'https://images.unsplash.com/photo-1596716148130-f95f2b735a92?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWRpZXZhbCUyMHNoaWVsZCUyMGFybW9yfGVufDF8fHx8MTc3MzQ5Njk5OHww&ixlib=rb-4.1.0&q=80&w=1080',
    inStock: true,
    specifications: [
      'Height: 42 inches',
      'Width: 24 inches',
      'Weight: 8.5 lbs',
      'Material: Laminated Wood & Steel'
    ]
  },
  {
    id: '5',
    name: 'Claymore Greatsword',
    category: 'sword',
    description: 'A Scottish Highland weapon of immense power. This two-handed sword features a distinctive cross-guard and powerful cutting edge.',
    price: 580,
    image: 'https://images.unsplash.com/photo-1757083840090-17a7bfca08c0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWRpZXZhbCUyMHN3b3JkJTIwd2VhcG9ufGVufDF8fHx8MTc3MzQ5NTUyN3ww&ixlib=rb-4.1.0&q=80&w=1080',
    inStock: true,
    specifications: [
      'Blade Length: 48 inches',
      'Weight: 6.5 lbs',
      'Material: Damascus Steel',
      'Handle: Two-handed grip'
    ]
  },
  {
    id: '6',
    name: 'Throwing Axe Set',
    category: 'axe',
    description: 'A set of three perfectly balanced throwing axes. Ideal for both combat and competition.',
    price: 195,
    image: 'https://images.unsplash.com/photo-1770820986351-fe8c9ae24a19?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWRpZXZhbCUyMGJhdHRsZSUyMGF4ZXxlbnwxfHx8fDE3NzM1MTM1NjF8MA&ixlib=rb-4.1.0&q=80&w=1080',
    inStock: false,
    specifications: [
      'Set of 3 axes',
      'Each: 12 inches length',
      'Weight: 1.5 lbs each',
      'Material: Forged Steel'
    ]
  },
  {
    id: '7',
    name: 'Macedonian Sarissa',
    category: 'spear',
    description: 'An extra-long pike used by ancient phalanx formations. Perfect for keeping enemies at bay.',
    price: 340,
    image: 'https://images.unsplash.com/photo-1600081521520-3ad74ab4c753?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWRpZXZhbCUyMHNwZWFyJTIwd2VhcG9ufGVufDF8fHx8MTc3MzUxMzU2Mnww&ixlib=rb-4.1.0&q=80&w=1080',
    inStock: true,
    specifications: [
      'Total Length: 96 inches',
      'Weight: 6.8 lbs',
      'Material: Steel tip & Ash pole',
      'Style: Phalanx Pike'
    ]
  },
  {
    id: '8',
    name: 'Round Shield of the North',
    category: 'shield',
    description: 'A Viking-style round shield with boss center. Hand-painted with traditional Nordic patterns.',
    price: 265,
    image: 'https://images.unsplash.com/photo-1596716148130-f95f2b735a92?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWRpZXZhbCUyMHNoaWVsZCUyMGFybW9yfGVufDF8fHx8MTc3MzQ5Njk5OHww&ixlib=rb-4.1.0&q=80&w=1080',
    inStock: true,
    specifications: [
      'Diameter: 30 inches',
      'Weight: 7.0 lbs',
      'Material: Linden Wood',
      'Boss: Steel reinforced'
    ]
  }
];
