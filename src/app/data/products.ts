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
    name: 'Not so Longsword',
    category: 'sword',
    description: "A legendary blade that's not as long as it seems.",
    price: 450,
     image: `${import.meta.env.BASE_URL}images/longsword.jpg`,
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
    name: 'Suspicious Battle Axe',
    category: 'axe',
    description: 'A fearsome weapon wielded by Viking warriors. Double-bladed design with a soft foamed handle for maximum comfort.',
    price: 320,
    image: `${import.meta.env.BASE_URL}images/suspiciousaxe.jpg`,
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
    name: 'Dull Spear',
    category: 'spear',
    description: "A noble weapon that could've staked countless warrriors, had it been sharpened.",
    price: 280,
    image: `${import.meta.env.BASE_URL}images/dullspear.webp`,
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
    description: "A massive wooden shield with heraldic designs. It's so big you can use it to glide.",
    price: 380,
    image: `${import.meta.env.BASE_URL}images/kiteshield.avif`,
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
    description: 'This greatsword is taller than you.',
    price: 580,
    image: `${import.meta.env.BASE_URL}images/greatsword.jpg`,
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
    name: 'Cool Axe',
    category: 'axe',
    description: "Don't throw it, it won't return.",
    price: 195,
    image: `${import.meta.env.BASE_URL}images/throwingaxe.webp`,
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
    name: 'Olimpian God Spear',
    category: 'spear',
    description: 'A legendary wooden relic that picked in a spot most difficult to get.',
    price: 340,
    image: `${import.meta.env.BASE_URL}images/spearofgod.jpg`,
    inStock: true,
    specifications: [
      'Total Length: 96 inches',
      'Weight: 6.8 lbs',
      'Material: Spare wood',
      'Style: Phalanx Pike'
    ]
  },
  {
    id: '8',
    name: 'Round Shield',
    category: 'shield',
    description: "it's round.",
    price: 265,
    image: `${import.meta.env.BASE_URL}images/roundshield.jpg`,
    inStock: true,
    specifications: [
      'Diameter: 30 inches',
      'Weight: 7.0 lbs',
      'Material: Linden Wood',
      'Boss: Steel reinforced'
    ]
  }
];
