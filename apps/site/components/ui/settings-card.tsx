'use client';
import classNames from 'classnames';

export function SettingHeadline({ children }: { children: React.ReactNode }) {
  return <h2 className="mb-4 text-lg font-semibold">{children}</h2>;
}

export function SettingDescription({
  children,
}: {
  children: React.ReactNode;
}) {
  return <p className="leading-normal text-muted-foreground">{children}</p>;
}

export function SettingFooter({
  children,
  destructive = false,
}: {
  // children can be multiple react nodes or a single react node
  children: React.ReactNode | React.ReactNode[];
  destructive?: boolean;
}) {
  return (
    <div
      className={classNames(
        'px-8 py-4 flex space-x-6 items-center rounded-b-xl border-t border-dashed border-border',
        {
          'border-destructive/40 bg-destructive/10': destructive,
          'bg-sheet': !destructive,
          'justify-between': Array.isArray(children),
          'justify-end': !Array.isArray(children) || children.length === 1,
        }
      )}
    >
      {children}
    </div>
  );
}

export function SettingHeader({
  children,
  destructive = false,
}: {
  children: React.ReactNode;
  destructive?: boolean;
}) {
  return (
    <div
      className={classNames('p-8 rounded-t-xl bg-sheet ', {
        'border-destructive/40': destructive,
      })}
    >
      {children}
    </div>
  );
}

export function SettingCardContent({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="mt-4">{children}</div>;
}

export function SettingCard({ children }: { children: React.ReactNode }) {
  return <div className={classNames('', {})}>{children}</div>;
}

export function SettingFooterDescription({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <p className="text-sm leading-normal text-muted-foreground">{children}</p>
  );
}
