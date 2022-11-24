import { cloudinaryImageFetch } from 'lib/cloudinary';
import Image from 'next/image';

interface PostImageProps {
  alt?: string;
  src: string;
}

export function PostThumbnail({ alt, src }: PostImageProps) {
  return (
    <div className="relative overflow-hidden mt-4 rounded-md w-full bg-background aspect-w-4 aspect-h-3">
      <Image
        alt={alt}
        fill
        sizes="(max-width: 768px) 600px,
              (max-width: 1200px) 500px,
              500px"
        className="object-contain"
        src={cloudinaryImageFetch(src, 'ar_1.333,b_auto,c_pad,w_800')}
      />
    </div>
  );
}
