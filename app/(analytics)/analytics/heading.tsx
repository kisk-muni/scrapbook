import cn from 'classnames';

export default function Heading({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <h2
      className={cn(
        'text-xl tracking-tight text-text font-extrabold',
        className
      )}
    >
      {children}
    </h2>
  );
}
