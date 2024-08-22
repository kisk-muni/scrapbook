'use client';
import { useRef, useState, useTransition } from 'react';
import { Button } from 'components/ui/button-radix';
import { Input } from 'components/ui/input-radix';
import toast from 'react-hot-toast';
import { ServerActionResult } from 'lib/types';
import { Portfolio } from 'db/schema';
import { IconSpinner } from 'components/ui/icons';

export default function AddBlog({
  defaultUrl,
  defaultFeedUrl,
  addBlog,
  onCancel,
}: {
  defaultUrl: string;
  defaultFeedUrl: string;
  addBlog: (args: {
    url: string;
    feedUrl: string;
  }) => ServerActionResult<Portfolio>;
  onCancel?: () => void;
}) {
  const maxLength = 200;
  const urlRef = useRef<HTMLInputElement>(null);
  const feedUrlRef = useRef<HTMLInputElement>(null);
  const [isSubmitPending, startSubmitTransition] = useTransition();
  const [url, setUrl] = useState(defaultUrl);
  const [feedUrl, setFeedUrl] = useState(defaultFeedUrl);
  const notValid = (url: string, feedUrl) =>
    !url.trim() ||
    url.trim().length > maxLength ||
    /*     !feedUrl.trim() ||
    feedUrl.trim().length > maxLength || */
    url === defaultUrl; /*  && feedUrl === defaultFeedUrl */

  return (
    <form
      className="flex space-x-2"
      onSubmit={(e) => {
        e.preventDefault();
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        startSubmitTransition(async () => {
          if (notValid(url, feedUrl)) return;
          const result = await addBlog({
            url: urlRef.current?.value,
            feedUrl: feedUrlRef.current?.value,
          });
          if (result && 'error' in result) {
            toast.error(result.error);
            return;
          }
          urlRef.current.value = defaultUrl;

          toast.success('Připojení bylo úspěšně uloženo');
        });
      }}
    >
      <Input
        ref={urlRef}
        type="text"
        className="bg-white placeholder:text-input"
        placeholder="URL adresa"
        onChange={(e) => {
          setUrl(e.target.value);
        }}
        defaultValue={defaultUrl}
      />
      <Button
        variant="secondary"
        size="default"
        disabled={notValid(url, feedUrl) || isSubmitPending}
        type="submit"
        className="h-full"
      >
        {isSubmitPending ? (
          <>
            <IconSpinner className="w-4 h-4 mr-2 animate-spin" />
            Ukládání...
          </>
        ) : (
          <>Přidat</>
        )}
      </Button>
    </form>
  );
}
