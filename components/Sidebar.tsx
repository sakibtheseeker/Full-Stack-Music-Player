'use client';

import { usePathname } from 'next/navigation';
import { useMemo } from 'react';
import { twMerge } from 'tailwind-merge';

// Icons
import { HiHome } from 'react-icons/hi';
import { BiSearch } from 'react-icons/bi';
import { AiOutlineInfoCircle, AiOutlineMail } from 'react-icons/ai';

// Components
import Box from './Box';
import SidebarItem from './SidebarItem';
import Library from './Library';
import { Song } from '@/types';
import usePlayer from '@/hooks/usePlayer';

interface SidebarProps {
  children: React.ReactNode;
  songs: Song[]; 
}

const Sidebar: React.FC<SidebarProps> = ({ children, songs }) => {
  const pathname = usePathname();
  const player = usePlayer();

  const routes = useMemo(
    () => [
      {
        label: 'Home',
        active: pathname === '/',
        href: '/',
        icon: HiHome,
      },
      {
        label: 'About',
        active: pathname === '/about',
        href: '/about',
        icon: AiOutlineInfoCircle,
      },
      {
        label: 'Contact Us',
        active: pathname === '/contact',
        href: '/contact',
        icon: AiOutlineMail,
      },
      {
        label: 'Search',
        active: pathname === '/search',
        href: '/search',
        icon: BiSearch,
      },
    ],
    [pathname]
  );

  return (
    <div
      className={twMerge(
        `flex h-full`,
        player.activeId && 'h-[calc(100%-80px)]'
      )}
    >
      <div className="hidden md:flex flex-col bg-black gap-y-2 h-full w-[300px] p-2">
        <Box>
          <div className="flex flex-col gap-y-4 px-5 py-4">
            {routes.map((item) => (
              <SidebarItem key={item.label} {...item} />
            ))}
          </div>
        </Box>
        <Box className="overflow-y-auto h-full">
          <Library songs={songs} />
        </Box>
      </div>
      <main className="h-full flex-1 overflow-y-auto py-2">{children}</main>
    </div>
  );
};

export default Sidebar;
