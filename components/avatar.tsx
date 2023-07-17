import classNames from 'classnames';
import { cloudinaryImageFetch } from 'lib/cloudinary';
import Image from 'next/image';

type AvatarProps = {
  imageUrl?: string | null;
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
          .map((i) => i[0]?.toUpperCase())
          .join('');

  return (
    <div
      className={classNames(
        className,
        'flex items-center justify-center rounded-full bg-sunken text-white'
      )}
    >
      {acronym.length > 3 ? acronym.slice(0, 3) : acronym}
    </div>
  );
}
