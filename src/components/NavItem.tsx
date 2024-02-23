"use client";
/**
 * NavItem Component
 *
 * This component renders a navigation item with a dropdown menu for displaying a list of items.
 * It's designed for client-side rendering and supports dynamic interaction, such as opening
 * and closing the dropdown menu. The component is versatile and can be used for various types
 * of content beyond product categories, making it suitable for any list of items that require
 * a dropdown menu in a navigation bar or similar UI elements.
 *
 * Props:
 * - items: Array of item objects to display in the dropdown. Each item should have an `imageSrc`
 *   for the image URL, a `href` for the link target, and a `name` for the display text.
 * - handleOpen: Function to be called when the dropdown is opened.
 * - close: Function to be called to close the dropdown.
 * - isOpen: Boolean indicating whether the dropdown is currently open.
 * - isAnyOpen: Boolean indicating whether any dropdown in the navigation is open. This can be
 *   used to control animations or behaviors based on the state of other navigation items.
 * - label: String that specifies the label of the navigation item's button.
 *
 * Usage:
 * The component can be used within a navigation bar or menu where each item requires a dropdown.
 * Ensure to provide all the required props for proper functionality. The `items` prop allows for
 * flexible use of the component with various content types, while the `isOpen` and `close` props
 * enable dynamic interaction with the dropdown.
 *
 * Example:
 * ```
 * <NavItem
 *   items={[{ imageSrc: '/path/to/image.jpg', href: '/link-to-item', name: 'Item Name' }]}
 *   handleOpen={() => console.log('Dropdown opened')}
 *   close={() => console.log('Dropdown closed')}
 *   isOpen={true}
 *   isAnyOpen={false}
 *   label="Menu Label"
 * />
 * ```
 *
 * Note: This component uses the `use client` directive for client-side rendering and leverages
 * Next.js's Image and Link components for optimized image loading and client-side routing.
 */

import { Button } from "./ui/button";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

// Define the type for featured items, assuming they have the same structure
interface FeaturedItem {
  imageSrc: string;
  href: string;
  name: string;
  action: string;
}

interface NavItemProps {
  items: FeaturedItem[]; // Change from items to featured
  handleOpen: () => void;
  close: () => void;
  isOpen: boolean;
  isAnyOpen: boolean;
  label: string;
}

const NavItem = ({
  isAnyOpen,
  items, // Use featured instead of items
  handleOpen,
  close,
  isOpen,
  label,
}: NavItemProps) => {
  return (
    <div className="flex">
      <div className="relative flex items-center">
        <Button
          className="gap-1.5"
          onClick={handleOpen}
          variant={isOpen ? "secondary" : "ghost"}
        >
          {label}
          <ChevronDown
            className={cn("h-4 w-4 transition-all text-muted-foreground", {
              "-rotate-180": isOpen,
            })}
          />
        </Button>
      </div>

      {isOpen ? (
        <div
          onClick={() => close()}
          className={cn(
            "absolute inset-x-0 top-full text-sm text-muted-foreground",
            {
              "animate-in fade-in-10 slide-in-from-top-5": !isAnyOpen,
            }
          )}
        >
          <div
            className="absolute inset-0 top-1/2 bg-white shadow"
            aria-hidden="true"
          />
          <div className="relative bg-white">
            <div className="mx-auto max-w-7xl px-8">
              <div className="grid grid-cols-4 gap-x-8 gap-y-10 py-16">
                <div className="col-span-4 col-start-1 grid grid-cols-3 gap-x-8">
                  {items.map((item) => (
                    <div
                      onClick={() => close}
                      key={item.name}
                      className="group relative text-base sm:text-sm"
                    >
                      <div className="relative aspect-video overflow-hidden rounded-lg bg-gray-100 group-hover:opacity-75">
                        <Image
                          src={item.imageSrc}
                          alt={item.name}
                          fill
                          className="object-cover object-center"
                        />
                      </div>
                      <Link
                        href={item.href}
                        className="mt-6 block font-medium text-gray-900"
                      >
                        {item.name}
                      </Link>
                      <p className="mt-1" aria-hidden="true">
                        {item.action}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default NavItem;
