import React from 'react';

interface NavItem {
  id: number;
  title: string;
  url: string;
}

const navItems: NavItem[] = [
  { id: 1, title: 'Home', url: '/' },
  { id: 2, title: 'About', url: '/about' },
  { id: 3, title: 'Services', url: '/services' },
  // Add more navigation items as needed
];

interface DashboardNavProps {
  items: NavItem[];
}

function DashboardNav({ items }: DashboardNavProps): JSX.Element {
  return (
    <ul className="space-y-2">
      {items.map(item => (
        <li key={item.id}>
          <a href={item.url} className="block px-4 py-2 text-gray-800 hover:bg-gray-200">{item.title}</a>
        </li>
      ))}
    </ul>
  );
}

interface SidebarProps {
  // Add any additional props needed for Sidebar
}

const Sidebar: React.FC<SidebarProps> = () => {
  return (
    <nav className="relative hidden h-screen border-r pt-5 lg:block w-72">
      <div className="space-y-4 py-4">
        <div className="px-3 py-2">
          <div className="space-y-1">
            <h2 className="mb-2 px-4 text-xl font-semibold tracking-tight">Overview</h2>
            <DashboardNav items={navItems} />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Sidebar;

