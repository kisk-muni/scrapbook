import classNames from 'classnames';
import { SidebarSettings } from 'components/sidebar-settings';

interface SettingsLayoutProps {
  children: React.ReactNode;
}

export default async function DocsLayout({ children }: SettingsLayoutProps) {
  return (
    <div className="relative max-w-screen-lg mx-auto px-6">
      <h1 className="mt-12 mb-2 text-3xl font-medium">Nastavení</h1>
      <div className="flex gap-x-8">
        <SidebarSettings />
        <div className="pl-0 animate-in">
          <div className={classNames('pb-[100px] pt-4 md:pt-10')}>
            <div className="">
              <div className="space-y-6">{children}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
