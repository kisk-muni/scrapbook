'use client';

import { EllipsisHorizontalIcon } from '@heroicons/react/20/solid';
import { Button } from 'components/ui/button-radix';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from 'components/ui/dropdown-menu';
import { PostDeleteDialog } from './post-delete-dialog';
import { deletePost } from 'app/actions';
import { UniversalPost } from 'lib/actions/get-posts';
import { useState } from 'react';

export function PostMenu({ post }: { post: UniversalPost }) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  return (
    <>
      <DropdownMenu open={isDropdownOpen} onOpenChange={setIsDropdownOpen}>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="pl-2 pr-2 hover:bg-sheet border border-transparent hover:border-muted/20"
            rounded="default"
          >
            <EllipsisHorizontalIcon className="h-5 w-5 text-muted" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          sideOffset={8}
          align="start"
          className="border-0 w-70 overflow-hidden rounded-xl bg-white text-base shadow-xl ring-2 ring-black ring-opacity-5 focus:outline-none sm:text-sm transition ease-in-out delay-50"
        >
          <PostDeleteDialog
            deletePost={deletePost}
            postId={post.id}
            onDelete={() => setIsDropdownOpen(false)}
          />
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
