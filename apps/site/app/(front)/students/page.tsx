'use client';
import Link from 'next/link';
import { Fragment } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { ProfileList } from './list';

export default function StudentsPage() {
  return (
    <Fragment>
      <div className="flex flex-col justify-center text-center items-center mx-auto sm:max-w-4xl mt-6 mb-6 sm:mt-6 sm:mb-14 sm:px-6 md:mt-8 md:mb-20 overflow-visible">
        <h1 className="text-5xl mb-3 tracking-tight text-transparent bg-gradient-header from-blue to-green bg-clip-text pr-2 font-header md:text-6xl lg:text-7xl">
          Portfolia studentů
        </h1>
        <p className=" text-lg lg:text-xl text-text leading-8 mx-auto mb-4">
          Na Scrapbooku naleznete příspěvky z těchto studentských portfolií
        </p>
        <Link
          className="bg-slate text-background hover:bg-purple rounded-full font-semibold px-4 pt-1 pb-0.5 uppercase relative md:flex justify-center text-base font"
          href="/add-portfolio"
        >
          Připojit portfolio
        </Link>
      </div>
      <div className="mx-auto sm:max-w-7xl mb-8 sm:mb-16 md:mt-8 md:mb-20">
        <ErrorBoundary fallback={<div>Portfolio se nepodařilo načíst.</div>}>
          <ProfileList />
        </ErrorBoundary>
      </div>
    </Fragment>
  );
}
