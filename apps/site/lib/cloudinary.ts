export const CloudinaryURL = `https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}`;

export function cloudinaryImageFetch(src: string, params?: string) {
  return `${CloudinaryURL}/image/fetch${params ? '/' + params : ''}/${src}`;
}
