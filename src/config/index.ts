export const PRODUCT_CATEGORIES = [
  {
    label: 'UI Kits',
    value: 'ui_kits' as const,
    featured: [
      {
        name: 'Editor picks',
        href: `/products?category=ui_kits`,
        imageSrc: '/nav/ui-kits/mixed.jpg',
      },
      {
        name: 'New Arrivals',
        href: '/products?category=ui_kits&sort=desc',
        imageSrc: '/nav/ui-kits/blue.jpg',
      },
      {
        name: 'Bestsellers',
        href: '/products?category=ui_kits',
        imageSrc: '/nav/ui-kits/purple.jpg',
      },
    ],
  },
  {
    label: 'Icons',
    value: 'icons' as const,
    featured: [
      {
        name: 'Favorite Icon Picks',
        href: `/products?category=icons`,
        imageSrc: '/nav/icons/picks.jpg',
      },
      {
        name: 'New Arrivals',
        href: '/products?category=icons&sort=desc',
        imageSrc: '/nav/icons/new.jpg',
      },
      {
        name: 'Bestselling Icons',
        href: '/products?category=icons',
        imageSrc: '/nav/icons/bestsellers.jpg',
      },
    ],
  },
]
export const MENU_SELECTION = [
  {
    label: 'Claims',
    value: 'claim_kits',
    items: [ // Changed from 'featured' to 'items'
      {
        name: 'New',
        href: '/claims?category=ui_kits',
        imageSrc: '/nav/ui-kits/mixed.jpg',
      },
      {
        name: 'Pending',
        href: '/claims?category=ui_kits&sort=desc',
        imageSrc: '/nav/ui-kits/blue.jpg',
      },
      {
        name: 'Complete',
        href: '/claims?category=ui_kits',
        imageSrc: '/nav/ui-kits/purple.jpg',
      },
    ],
  },
  {
    label: 'Verifications',
    value: 'icons',
    items: [ // Changed from 'featured' to 'items'
      {
        name: 'Pending',
        href: '/claims?category=icons',
        imageSrc: '/nav/icons/picks.jpg',
      },
      {
        name: 'Issued',
        href: '/claims?category=icons&sort=desc',
        imageSrc: '/nav/icons/new.jpg',
      },
      {
        name: 'Complete',
        href: '/claims?category=icons',
        imageSrc: '/nav/icons/bestsellers.jpg',
      },
    ],
  },
];
