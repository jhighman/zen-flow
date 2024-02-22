import { Access, CollectionConfig } from 'payload/types'

const yourOwn: Access = ({ req: { user } }) => {
  if (user.role === 'admin') return true

  return {
    user: {
      equals: user?.id,
    },
  }
}

export const Queues: CollectionConfig = {
  slug: 'queues',
  admin: {
    useAsTitle: 'Your Work',
    description:
      'A summary of all your work in process.',
  },
  access: {
    read: yourOwn,
    update: ({ req }) => req.user.role === 'admin',
    delete: ({ req }) => req.user.role === 'admin',
    create: ({ req }) => req.user.role === 'admin',
  },
  fields: [
    {
      name: '_isPaid',
      type: 'checkbox',
      access: {
        read: ({ req }) => req.user.role === 'admin',
        create: () => false,
        update: () => false,
      },
      admin: {
        hidden: false,
      },
      required: true,
    },
    {
      name: 'user',
      type: 'relationship',
      admin: {
        hidden: false,
      },
      relationTo: 'users',
      required: true,
    },
    {
      name: 'tasks',
      type: 'relationship',
      relationTo: 'tasks',
      required: true,
      hasMany: true,
    },
  ],
}
