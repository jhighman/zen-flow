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

export const TASK_CATEGORIES = [
  {
    label: 'License Verification',
    value: 'license_verification',
    featured: [
      {
        name: 'Professional Licenses',
        ref: `/tasks?category=license_verification&type=professional`,
        imageSrc: '/nav/tasks/professional-licenses.jpg',
      },
      {
        name: 'Business Licenses',
        ref: '/tasks?category=license_verification&type=business',
        imageSrc: '/nav/tasks/business-licenses.jpg',
      },
    ],
  },
  {
    label: 'Education Verification',
    value: 'education_verification',
    featured: [
      {
        name: 'Degree Confirmation',
        ref: `/tasks?category=education_verification&type=degree`,
        imageSrc: '/nav/tasks/degree-confirmation.jpg',
      },
      {
        name: 'Institution Accreditation',
        ref: '/tasks?category=education_verification&type=accreditation',
        imageSrc: '/nav/tasks/institution-accreditation.jpg',
      },
    ],
  },
  {
    label: 'Certification Verification',
    value: 'certification_verification',
    featured: [
      {
        name: 'Professional Certifications',
        ref: `/tasks?category=certification_verification&type=professional`,
        imageSrc: '/nav/tasks/professional-certifications.jpg',
      },
      {
        name: 'Technical Certifications',
        ref: '/tasks?category=certification_verification&type=technical',
        imageSrc: '/nav/tasks/technical-certifications.jpg',
      },
    ],
  },
  {
    label: 'Asset Verification',
    value: 'asset_verification',
    featured: [
      {
        name: 'Real Estate',
        ref: `/tasks?category=asset_verification&type=real_estate`,
        imageSrc: '/nav/tasks/real-estate.jpg',
      },
      {
        name: 'Vehicle Ownership',
        ref: '/tasks?category=asset_verification&type=vehicle',
        imageSrc: '/nav/tasks/vehicle-ownership.jpg',
      },
    ],
  },
]
