'use client';
import { ErrorBoundary } from 'react-error-boundary';
import { Posts } from './posts';
import Link from 'next/link';

function Alert() {
  return (
    <div className="text-center lg:px-4 sm:-mb-2 lg:-mt-3">
      <Link target="_blank" href="https://discord.gg/HDacGhAhj8">
        <div
          className="py-1.5 sm:my-3 xl:mb-3 px-1.5 bg-green cursor-pointer duration-500 hover:scale-105 items-center text-black leading-none rounded-full flex sm:inline-flex"
          role="alert"
        >
          <span className="font-semibold mr-1.5 ml-1.5 text-left flex-auto">
            Diskuze nad články probíhá na KISK Discordu
          </span>
          <span className="bg-black relative rounded-full -rotate-1 uppercase px-2 py-1 text-xs font-bold text-green text-center flex justify-between items-center">
            získat pozvánku<span className="ml-1.5">&gt;</span>
          </span>
        </div>
      </Link>
    </div>
  );
}

function Hero() {
  return (
    <div className="mx-auto mt-6 mb-12 px-4 sm:mt-6 sm:mb-16 sm:px-6 md:mt-8 md:mb-24">
      <div className="text-center justify-center">
        <h1 className="text-5xl mb-3 tracking-tight text-transparent bg-gradient-header from-yellow to-orange bg-clip-text font-header md:text-6xl lg:text-6xl">
          <span className="block xl:inline">KISKový Scrapbook</span>
        </h1>
        <p className="mt-0 text-lg md:text-xl lg:text-2xl text-text mx-auto">
          Co se právě učíme a na čem každý den pracujeme.
        </p>
      </div>
    </div>
  );
}

export default function HomePage() {
  return (
    <div>
      <Alert />
      <Hero />
      <ErrorBoundary fallback={<div>Příspěvky se nepodařilo načíst.</div>}>
        <Posts />
      </ErrorBoundary>
    </div>
  );
}
