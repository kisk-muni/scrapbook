/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import { useEffect, useState, useTransition, useMemo } from 'react';
import { Button } from 'components/ui/button-radix';
import { IconImage, IconSpinner } from './ui/icons';
import { ServerActionResult } from 'lib/types';
import { BlockNoteView } from '@blocknote/mantine';
import toast from 'react-hot-toast';
import {
  defaultInlineContentSpecs,
  PartialBlock,
  Block,
  BlockNoteSchema,
  defaultBlockSpecs,
  defaultStyleSpecs,
  BlockNoteEditor,
} from '@blocknote/core';
import { cs } from 'components/editor/cs-locale';
import {
  createNewPost,
  createPresignedUrlGET,
  createPresignedUrlPUT,
} from 'app/(front)/new/actions';
import { useQueryClient } from '@tanstack/react-query';

type Post = {
  post: string;
};

async function saveToStorage(jsonBlocks: Block[]) {
  // Save contents to local storage. You might want to debounce this or replace
  // with a call to your API / database.
  localStorage.setItem('editorContent', JSON.stringify(jsonBlocks));
}

async function removeStorage() {
  localStorage.removeItem('editorContent');
}

async function loadFromStorage() {
  // Gets the previously stored editor contents.
  const storageString = localStorage.getItem('editorContent');
  return storageString
    ? (JSON.parse(storageString) as PartialBlock[])
    : undefined;
}

export default function NewPostCard({
  post,
}: {
  defaultPost: string;
  post: (args: { post: string }) => ServerActionResult<Post>;
}) {
  const [isSubmitPending, startSubmitTransition] = useTransition();
  const queryClient = useQueryClient();

  const [blocks, setBlocks] = useState<Block[]>([]);
  const [initialContent, setInitialContent] = useState<
    PartialBlock[] | undefined | 'loading'
  >('loading');

  useEffect(() => {
    loadFromStorage().then((content) => {
      setInitialContent(content);
    });
  }, []);

  const schema = BlockNoteSchema.create({
    styleSpecs: {
      ...defaultStyleSpecs,
      textColor: undefined as any,
      backgroundColor: undefined as any,
    },
    inlineContentSpecs: {
      ...defaultInlineContentSpecs,
    },
    blockSpecs: {
      //first pass all the blockspecs from the built in, default block schema
      ...defaultBlockSpecs,

      // disable blocks you don't want
      table: undefined as any,
      file: undefined as any,
      emoji: undefined as any,
    },
  });

  const editor = useMemo(() => {
    const config = {
      schema,
      dictionary: cs,
      trailingBlock: false,
      uploadFile: async (file) => {
        /**
         * This function is called by BlockNote whenever it wants to upload a
         * file. In this implementation, we are uploading the file to an S3 bucket
         * by first requesting an upload URL from the server.
         */
        const bucket = 'scrapbook-so';
        const key = file.name;

        // Get a URL to upload to from the server.
        const signedUrl = await createPresignedUrlPUT({
          bucket,
          key,
        });

        if (signedUrl?.error) {
          throw new Error('Failed to get signed URL');
        }

        const headers: any = {};
        if (file?.type) {
          // S3 requires setting the correct content type.
          headers['Content-Type'] = file!.type || 'application/octet-stream';
        }

        // Actually upload the file.
        const uploaded = await fetch(signedUrl.url, {
          method: 'PUT',
          body: file,
          headers,
        });

        if (!uploaded.ok) {
          throw new Error('Failed to upload file');
        }

        // We store the URL in a custom format, in this case s3://bucket/key.
        // We'll subsequently parse this URL in the resolveFileUrl function.
        return `s3://${bucket}/${key}`;
      },
      resolveFileUrl: async (url: string) => {
        if (url.startsWith('s3:')) {
          // it's our custom format, request a signed url from the backend
          const [, , bucket, key] = url.split('/', 4);
          const presignedUrl = await createPresignedUrlGET({
            bucket,
            key,
          });
          if (presignedUrl?.error) {
            throw new Error('Failed to get signed URL');
          }
          return presignedUrl.url;
        }

        return url;
      },
    };
    if (initialContent === 'loading') {
      return undefined;
    }
    return BlockNoteEditor.create({ ...config, initialContent });
  }, [initialContent, schema]);

  if (editor === undefined) {
    return <></>;
  }

  return (
    <div className="flex-1">
      <BlockNoteView
        sideMenu={false}
        className="mt-3"
        editor={editor}
        onChange={() => {
          saveToStorage(editor.document);
        }}
        data-theming-css-variables-demo
      />
      <div className="pr-4 pl-1 mt-4 pt-4 pb-2 flex space-x-6 items-center rounded-b-xl border-t border-dashed border-border justify-between">
        <div>
          {/* <Button variant="ghost" className="text-muted">
            <IconImage className="w-5 h-5 mr-1 -mt-0.5" /> Přidat obrázek
          </Button> */}
        </div>
        <Button
          variant="secondary"
          disabled={isSubmitPending}
          onClick={(e) => {
            e.preventDefault();
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            startSubmitTransition(async () => {
              const result = await createNewPost({
                blocks: editor.document,
                html: await editor.blocksToHTMLLossy(),
              });
              if (result && 'error' in result) {
                toast.error(result.error);
                return;
              }
              await removeStorage();
              toast.success('Příspěvek byl úspěšně publikován');
              queryClient.resetQueries();
            });
          }}
        >
          {isSubmitPending ? (
            <>
              <IconSpinner className="mr-2 animate-spin" />
              Publikování...
            </>
          ) : (
            <>Publikovat</>
          )}
        </Button>
      </div>
    </div>
  );
}
