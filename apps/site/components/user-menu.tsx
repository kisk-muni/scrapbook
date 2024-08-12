'use client';

import Image from 'next/image';
import { type Session } from 'next-auth';
import { signOut } from 'next-auth/react';
import { EllipsisHorizontalIcon } from '@heroicons/react/20/solid';

import { Button } from 'components/ui/button-radix';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from 'components/ui/dropdown-menu';
import Link from 'next/link';
import { Avatar } from './avatar';

export interface UserMenuProps {
  user: Session['user'];
}

function getUserInitials(name: string) {
  const [firstName, lastName] = name.split(' ');
  return lastName ? `${firstName[0]}${lastName[0]}` : firstName.slice(0, 2);
}

export function UserMenu({ user }: UserMenuProps) {
  return (
    <div className="flex items-center justify-between space-x-1">
      <Button asChild variant="ghost" className="pl-0 pr-0">
        <Link href={'/' + user?.username} passHref>
          <Avatar
            imageUrl={user.image || ''}
            className="size-6 transition-opacity duration-300 rounded-full select-none ring-1 ring-muted/40 hover:opacity-80"
            size={32}
            name={user.fullName || user.username}
          />
        </Link>
      </Button>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="pl-2 pr-2 hover:bg-sheet border border-transparent hover:border-muted/20"
            rounded="full"
          >
            <EllipsisHorizontalIcon className="h-5 w-5 text-muted" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent sideOffset={8} align="start" className="w-[180px]">
          <DropdownMenuItem asChild>
            <Link
              href="/settings/profile"
              className="inline-flex items-center justify-between w-full text-sm"
            >
              Nastavení
            </Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem asChild>
            <Link
              href="/analytics/posts"
              className="inline-flex items-center justify-between w-full text-sm"
            >
              Analytika
            </Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem asChild>
            <Link
              href="/privacy"
              className="inline-flex items-center justify-between w-full text-sm"
            >
              Soukromí a podmínky
            </Link>
          </DropdownMenuItem>
          {/* <DropdownMenuItem asChild>
            <a
              href="https://knihovna.ai"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-between w-full text-sm"
            >
              Stránka Knihovna.ai
              <IconExternalLink className="size-3 ml-auto" />
            </a>
          </DropdownMenuItem> */}
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={() =>
              signOut({
                callbackUrl: '/',
              })
            }
            className="text-sm"
          >
            Odhlásit se
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
