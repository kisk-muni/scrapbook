import { cloudinaryImageFetch, cloudinaryImageLoader } from 'lib/cloudinary';
import Image from 'next/image';
import classNames from 'classnames';

interface PostImageProps {
  alt?: string | null;
  src: string;
  isThumbnail?: boolean;
}

export function PostImage({ alt, src, isThumbnail = false }: PostImageProps) {
  return (
    <div
      className={classNames(
        'relative overflow-hidden rounded-md w-full bg-background aspect-w-4 aspect-h-3',
        { 'mt-4': isThumbnail, 'mb-2': !isThumbnail }
      )}
    >
      <Image
        alt={alt}
        fill
        sizes="(max-width: 768px) 600px,
              (max-width: 1200px) 500px,
              500px"
        className="object-contain"
        loader={({ src }) =>
          cloudinaryImageLoader({
            src: src,
            params: 'ar_1.333,b_auto,c_pad,w_800',
          })
        }
        src={src}
      />
    </div>
  );
}
