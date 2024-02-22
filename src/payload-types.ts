/* tslint:disable */
/* eslint-disable */
/**
 * This file was automatically generated by Payload.
 * DO NOT MODIFY IT BY HAND. Instead, modify your source Payload config,
 * and re-run `payload generate:types` to regenerate this file.
 */

export interface Config {
  collections: {
    users: User;
    products: Product;
    media: Media;
    product_files: ProductFile;
    orders: Order;
    tasks: Task;
    queues: Queue;
    'payload-preferences': PayloadPreference;
    'payload-migrations': PayloadMigration;
  };
  globals: {};
}
export interface User {
  id: string;
  tasks?: (string | Task)[] | null;
  products?: (string | Product)[] | null;
  product_files?: (string | ProductFile)[] | null;
  role: 'admin' | 'user';
  updatedAt: string;
  createdAt: string;
  email: string;
  resetPasswordToken?: string | null;
  resetPasswordExpiration?: string | null;
  salt?: string | null;
  hash?: string | null;
  _verified?: boolean | null;
  _verificationToken?: string | null;
  loginAttempts?: number | null;
  lockUntil?: string | null;
  password: string | null;
}
export interface Task {
  id: string;
  user?: (string | null) | User; // The user assigned to the task
  name: string; // The name of the task
  description?: string | null; // Details about the task
  category: 'license_verification' | 'education_verification' | 'certification_verification' | 'asset_verification'; // Task categories based on your model
  status: 'pending' | 'in_progress' | 'completed' | 'on_hold'; // The current status of the task
  updatedAt: string; // Last update timestamp
  createdAt: string; // Creation timestamp
  workflowId: string; // Identifier for the workflow this task is part of
  priority: 'high' | 'medium' | 'low' | 'critical'; // Priority level of the task
  label: 'problem' | 'issue' | 'ticket' | 'blocked' | 'development' | 'security' | 'research' | 'personal'; // Label categorizing the task
  isStarted: boolean; // Flag indicating if the task has been started
  isComplete: boolean; // Flag indicating if the task has been completed
  isPending: boolean; // Flag indicating if the task is pending action
  isArchived: boolean; // Flag indicating if the task has been archived
  image?: Media;
}
export interface Product {
  id: string;
  user?: (string | null) | User;
  name: string;
  description?: string | null;
  price: number;
  category: 'ui_kits' | 'icons';
  product_files: string | ProductFile;
  approvedForSale?: ('pending' | 'approved' | 'denied') | null;
  priceId?: string | null;
  stripeId?: string | null;
  images: {
    image: string | Media;
    id?: string | null;
  }[];
  updatedAt: string;
  createdAt: string;
}
export interface ProductFile {
  id: string;
  user?: (string | null) | User;
  updatedAt: string;
  createdAt: string;
  url?: string | null;
  filename?: string | null;
  mimeType?: string | null;
  filesize?: number | null;
  width?: number | null;
  height?: number | null;
}
export interface Media {
  id: string;
  user?: (string | null) | User;
  updatedAt: string;
  createdAt: string;
  url?: string | null;
  filename?: string | null;
  mimeType?: string | null;
  filesize?: number | null;
  width?: number | null;
  height?: number | null;
  sizes?: {
    thumbnail?: {
      url?: string | null;
      width?: number | null;
      height?: number | null;
      mimeType?: string | null;
      filesize?: number | null;
      filename?: string | null;
    };
    card?: {
      url?: string | null;
      width?: number | null;
      height?: number | null;
      mimeType?: string | null;
      filesize?: number | null;
      filename?: string | null;
    };
    tablet?: {
      url?: string | null;
      width?: number | null;
      height?: number | null;
      mimeType?: string | null;
      filesize?: number | null;
      filename?: string | null;
    };
  };
}
export interface Order {
  id: string;
  _isPaid: boolean;
  user: string | User;
  products: (string | Product)[];
  updatedAt: string;
  createdAt: string;
}
export interface Queue {
  id: string;
  _isPaid: boolean;
  user: string | User;
  tasks: (string | Task)[];
  updatedAt: string;
  createdAt: string;
}
export interface PayloadPreference {
  id: string;
  user: {
    relationTo: 'users';
    value: string | User;
  };
  key?: string | null;
  value?:
    | {
        [k: string]: unknown;
      }
    | unknown[]
    | string
    | number
    | boolean
    | null;
  updatedAt: string;
  createdAt: string;
}
export interface PayloadMigration {
  id: string;
  name?: string | null;
  batch?: number | null;
  updatedAt: string;
  createdAt: string;
}


declare module 'payload' {
  export interface GeneratedTypes extends Config {}
}