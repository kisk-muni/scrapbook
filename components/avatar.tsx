import { cloudinaryImageFetch } from 'lib/cloudinary';
import Image from 'next/image';

type AvatarProps = {
  imageUrl: string;
  name: string | null;
  size: number;
  className: string;
};

export function Avatar({ size, imageUrl, name, className }: AvatarProps) {
  const alt = `Profilový obrázek uživatele ${name}`;
  if (imageUrl)
    return (
      <Image
        className={className}
        alt={alt}
        width={size}
        height={size}
        src={cloudinaryImageFetch(imageUrl)}
      />
    );
  const acronym =
    !name || imageUrl
      ? ''
      : name
          .split(' ')
          .map((i) => i[0].toUpperCase())
          .join('');
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      className={className}
      alt={alt}
      width={size}
      height={size}
      src={`/avatar/${name}.svg${acronym != '' && `?text=${acronym}`}`}
    />
  );
}
