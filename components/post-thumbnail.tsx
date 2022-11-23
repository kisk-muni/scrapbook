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
        sizes="(max-width: 768px) 100vw,
              (max-width: 1200px) 50vw,
              33vw"
        className="object-contain"
        src={'https://res.cloudinary.com/demo/image/fetch/' + src}
      />
    </div>
  );
}
