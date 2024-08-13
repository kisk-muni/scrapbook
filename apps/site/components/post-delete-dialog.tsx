'use client';

import { DialogTrigger, type DialogProps } from '@radix-ui/react-dialog';
import { toast } from 'react-hot-toast';
import { ServerActionResult } from 'lib/types';
import { Button } from 'components/ui/button-radix';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from 'components/ui/dialog';
import { IconSpinner } from 'components/ui/icons';
import { useState, useTransition } from 'react';
import { DropdownMenuItem } from 'components/ui/dropdown-menu';
import { useQueryClient } from '@tanstack/react-query';

interface PostDeleteDialogProps extends DialogProps {
  deletePost: (args: {
    postId: string;
  }) => ServerActionResult<{ deleted: boolean }>;
  onDelete?: () => void;
  postId: string;
}

export function PostDeleteDialog({
  deletePost,
  onDelete,
  postId,
  ...props
}: PostDeleteDialogProps) {
  const [isDeletePending, startDeleteTransition] = useTransition();
  const [isOpen, setIsOpen] = useState(false);
  const queryClient = useQueryClient();

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen} {...props}>
      <DialogTrigger asChild>
        <DropdownMenuItem
          asChild
          className="px-2 py-1.5 text-destructive  focus:text-destructive transition ease-in-out delay-5"
          onSelect={(e) => e.preventDefault()}
          onClick={() => setIsOpen(true)}
        >
          <span className="inline-flex items-center justify-between w-full text-sm">
            Odstranit příspěvek
          </span>
        </DropdownMenuItem>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Opravdu to chcete udělat?</DialogTitle>
          <DialogDescription>
            Odstranění příspěvku je nevratné
          </DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <Button
            variant="outline"
            className="w-full"
            onClick={() => setIsOpen(false)}
          >
            Zrušit
          </Button>
          <Button
            variant="destructive"
            className="w-full"
            onClick={() => {
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-ignore
              startDeleteTransition(async () => {
                const result = await deletePost({ postId });

                if (result && 'error' in result) {
                  toast.error(result.error);
                  return;
                }
                onDelete();
                toast.success('Příspěvek byl úspěšně odstraněn');
                queryClient.resetQueries();
              });
            }}
          >
            {isDeletePending ? (
              <>
                <IconSpinner className="h-4 w-4 mr-2 animate-spin" />
                Odstraňování...
              </>
            ) : (
              <>Odstranit příspěvek</>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
