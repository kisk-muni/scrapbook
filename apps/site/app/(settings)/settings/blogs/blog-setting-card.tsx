'use client';
import { useRef, useState, useTransition } from 'react';
import { Button } from 'components/ui/button-radix';
import { Input } from 'components/ui/input-radix';
import {
  SettingCard,
  SettingFooter,
  SettingHeader,
} from 'components/ui/settings-card';
import toast from 'react-hot-toast';
import { ServerActionResult } from 'lib/types';
import { Portfolio } from 'db/schema';
import { IconSpinner } from 'components/ui/icons';

export default function BlogSettingCard({
  id,
  defaultUrl,
  defaultFeedUrl,
  onClose,
  deleteBlog,
  updateBlog,
}: {
  id: string;
  defaultUrl: string;
  defaultFeedUrl: string;
  deleteBlog: (args: { id: string }) => ServerActionResult<Portfolio>;
  updateBlog: (args: {
    id: string;
    url: string;
    feedUrl: string;
  }) => ServerActionResult<Portfolio>;
  onClose: () => void;
}) {
  const maxLength = 200;
  const urlRef = useRef<HTMLInputElement>(null);
  const feedUrlRef = useRef<HTMLInputElement>(null);
  const [isSubmitPending, startSubmitTransition] = useTransition();
  const [url, setUrl] = useState(defaultUrl);
  const [feedUrl, setFeedUrl] = useState(defaultFeedUrl);
  const notValid = (url: string, feedUrl) =>
    feedUrl &&
    (!url.trim() ||
      url.trim().length > maxLength ||
      !feedUrl.trim() ||
      feedUrl.trim().length > maxLength ||
      (url === defaultUrl && feedUrl === defaultFeedUrl));
  return (
    <SettingCard>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          startSubmitTransition(async () => {
            if (notValid(url, feedUrl)) return;
            const result = await updateBlog({
              id: id,
              url: urlRef.current?.value,
              feedUrl: feedUrlRef.current?.value,
            });
            if (result && 'error' in result) {
              toast.error(result.error);
              return;
            }
            toast.success('Připojení bylo úspěšně uloženo');
          });
        }}
      >
        <SettingHeader>
          <div className="space-y-2">
            <div className="flex items-center">
              <div className="w-40">URL Adresa</div>
              <Input
                ref={urlRef}
                type="text"
                onChange={(e) => {
                  setUrl(e.target.value);
                }}
                defaultValue={defaultUrl}
              />
            </div>
            <div className="flex items-center">
              <div className="w-40">RSS Feed</div>
              <Input
                ref={feedUrlRef}
                type="text"
                onChange={(e) => {
                  setFeedUrl(e.target.value);
                }}
                defaultValue={defaultFeedUrl}
              />
            </div>
          </div>
        </SettingHeader>
        <SettingFooter>
          <div>
            <Button
              variant="destructive"
              onClick={(e) => {
                e.preventDefault();
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                startSubmitTransition(async () => {
                  const result = await deleteBlog({
                    id: id,
                  });
                  if (result && 'error' in result) {
                    toast.error(result.error);
                    return;
                  }
                  toast.success('Připojení bylo úspěšně odstraněno');
                });
              }}
            >
              Odstranit
            </Button>
          </div>
          <div className="flex space-x-2">
            <Button variant="outline" onClick={onClose}>
              Zrušit
            </Button>
            <Button
              variant="secondary"
              disabled={notValid(url, feedUrl) || isSubmitPending}
              type="submit"
            >
              {isSubmitPending ? (
                <>
                  <IconSpinner className="w-4 h-4 mr-2 animate-spin" />
                  Ukládání...
                </>
              ) : (
                <>Uložit</>
              )}
            </Button>
          </div>
        </SettingFooter>
      </form>
    </SettingCard>
  );
}
