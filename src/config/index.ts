
export const MENU_SELECTION = [
  {
    label: 'Actions Available',
    value: 'claim_kits',
    items: [ // Changed from 'featured' to 'items'
      {
        name: 'New',
        href: '/claims?category=ui_kits',
        imageSrc: '/nav/icons/icons8-new-30.png',
        action:"Start a new verification",
      },
      {
        name: 'Pending',
        href: '/claims?category=ui_kits&sort=desc',
        imageSrc: '/nav/icons/icons8-pending-50.png',
        action:"Review Pending Verifications",
      },
      {
        name: 'Complete',
        href: '/claims?category=ui_kits',
        imageSrc: '/nav/icons/icons8-complete-50.png',
        action:"Review Completed Verifications",
      },
    ],
  },
  {
    label: 'Coming Soon',
    value: 'icons',
    items: [ // Changed from 'featured' to 'items'
      {
        name: 'Pending',
        href: '/claims?category=icons',
        imageSrc: '/nav/icons/icons8-evidence-50.png',
        action:"XXX",
      },
      {
        name: 'Issued',
        href: '/claims?category=icons&sort=desc',
        imageSrc: '/nav/icons/icons8-publish-80.png',
        action:"XXX",
      },
      {
        name: 'Complete',
        href: '/claims?category=icons',
        imageSrc: '/nav/icons/icons8-complete-50.png',
        action:"XXX",
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
