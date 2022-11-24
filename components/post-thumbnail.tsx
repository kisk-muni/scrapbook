import { cloudinaryImageFetch } from 'lib/cloudinary';
import Image from 'next/image';

interface PostImageProps {
  alt?: string;
  src: string;
}

export function PostThumbnail({ alt, src }: PostImageProps) {
  return (
    <div className="relative overflow-hidden mt-4 rounded-md w-full bg-background aspect-w-8 aspect-h-5">
      <Image
        alt={alt}
        fill
        sizes="(max-width: 768px) 600px,
              (max-width: 1200px) 500px,
              500px"
        className="object-contain"
        src={cloudinaryImageFetch(src, 'c_scale,q_auto:best,w_800')}
      />
    </div>
  );
}
