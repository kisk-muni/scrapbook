import classNames from 'classnames';
import { SidebarDocs } from 'components/sidebar-docs';

interface DocsLayoutProps {
  children: React.ReactNode;
}

export default async function DocsLayout({ children }: DocsLayoutProps) {
  return (
    <div className="relative max-w-screen-lg mx-auto px-6">
      <h1 className="mt-12 mb-2 text-3xl font-medium">Dokumenty</h1>
      <div className="flex gap-x-8 mx-auto">
        <SidebarDocs />
        <div className="pl-0 animate-in">
          <div className={classNames('pb-[100px] pt-4 md:pt-10')}>
            <div className="">
              <div className="rounded-xl bg-sheet p-8">{children}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
