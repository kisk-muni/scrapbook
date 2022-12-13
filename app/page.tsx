'use client';
import { ErrorBoundary } from 'react-error-boundary';
import { Posts } from './posts';
import Link from 'next/link';

function Alert() {
  return (
    <div className="text-center lg:px-4 sm:-mb-4 2xl:-mt-12">
      <Link target="_blank" href="https://discord.gg/HDacGhAhj8">
        <div
          className="py-1.5 sm:my-3 xl:mb-2 px-1.5 bg-sunken cursor-pointer duration-500 hover:scale-105 items-center text-black leading-none rounded-full flex sm:inline-flex"
          role="alert"
        >
          <span className="font-semibold mr-1.5 ml-1.5 text-sm text-left flex-auto">
            Diskuze nad články probíhá na KISK Discordu
          </span>
          <span className="bg-red relative rounded-full -rotate-1 uppercase px-2 pt-1 pb-0.5 text-xs font-bold text-white text-center flex justify-between items-center">
            získat pozvánku<span className="ml-1.5">&gt;</span>
          </span>
        </div>
      </Link>
    </div>
  );
}

function SiteDescription() {
  return <>Co se právě učíme a na čem každý den pracujeme.</>;
}

function Hero() {
  return (
    <div className="mx-auto mt-6 mb-12 px-4 sm:mt-6 sm:mb-20 sm:px-6 md:mt-8 md:mb-24">
      <div className="text-center justify-center">
        <div className="flex items-center text-left justify-center mb-3 -ml-3">
          <svg
            className="w-14 h-14 md:w-20 md:h-20 lg:w-24 lg:h-24 mr-4"
            viewBox="0 0 160 161"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M59.8102 80.0222C70.821 80.0222 79.7469 71.0654 79.7469 60.0167C79.7469 48.9679 70.821 40.0111 59.8102 40.0111C48.7995 40.0111 39.8735 48.9679 39.8735 60.0167C39.8735 71.0654 48.7995 80.0222 59.8102 80.0222Z"
              fill="#5FBFDE"
            />
            <path
              d="M19.9367 80.0222C30.9475 80.0222 39.8735 71.0654 39.8735 60.0167C39.8735 48.9679 30.9475 40.0111 19.9367 40.0111C8.92598 40.0111 0 48.9679 0 60.0167C0 71.0654 8.92598 80.0222 19.9367 80.0222Z"
              fill="#5FBFDE"
            />
            <path
              d="M19.9367 40.0111C30.9475 40.0111 39.8735 31.0543 39.8735 20.0056C39.8735 8.95679 30.9475 0 19.9367 0C8.92598 0 0 8.95679 0 20.0056C0 31.0543 8.92598 40.0111 19.9367 40.0111Z"
              fill="#5FBFDE"
            />
            <path
              d="M59.8102 40.0111C70.821 40.0111 79.7469 31.0543 79.7469 20.0056C79.7469 8.95679 70.821 0 59.8102 0C48.7995 0 39.8735 8.95679 39.8735 20.0056C39.8735 31.0543 48.7995 40.0111 59.8102 40.0111Z"
              fill="#5FBFDE"
            />
            <path
              d="M119.628 80.0222C97.603 80.0222 79.7545 97.9399 79.7545 120.033C79.7545 142.127 97.6105 160.044 119.628 160.044C141.645 160.044 159.501 142.127 159.501 120.033C159.501 97.9399 141.645 80.0222 119.628 80.0222ZM119.628 145.042C105.865 145.042 94.7051 133.844 94.7051 120.033C94.7051 106.223 105.865 95.0245 119.628 95.0245C133.391 95.0245 144.551 106.223 144.551 120.033C144.551 133.844 133.391 145.042 119.628 145.042Z"
              fill="#985DA5"
            />
            <path
              d="M26.5798 110.034V140.046H53.1671V160.052H79.7469V80.0222H53.1671H26.5798H0V110.034H26.5798Z"
              fill="#55B855"
            />
            <path
              d="M159.501 36.7692V80.0222H79.7469V0H120.233C127.693 0 134.669 1.95121 140.616 5.33734C148.122 9.61178 153.978 16.1867 157.065 24.0067C158.238 26.96 159.01 30.088 159.327 33.3451C159.441 34.4688 159.501 35.6152 159.501 36.7692Z"
              fill="#EEC21A"
            />
            <path
              d="M157.073 24.0067H79.7469V5.3374H140.616C148.122 9.61183 153.978 16.1867 157.065 24.0067H157.073Z"
              fill="#F37A27"
            />
            <path
              d="M159.494 33.3452H79.7469V52.0145H159.494V33.3452Z"
              fill="#F37A27"
            />
            <path
              d="M159.494 61.3529H79.7469V80.0222H159.494V61.3529Z"
              fill="#F37A27"
            />
            <path
              d="M8.39082 15.4882C8.46648 15.2605 8.54214 15.0251 8.63294 14.7973C8.67077 14.7062 8.76156 14.562 8.76913 14.4633C8.65564 14.729 8.6405 14.7746 8.72373 14.5847C8.74643 14.5316 8.76913 14.4785 8.79939 14.4253C8.99611 14.0001 9.21553 13.5826 9.46521 13.1802C9.59384 12.9676 9.73003 12.755 9.87378 12.55C9.94188 12.4589 10.01 12.3602 10.0705 12.2691C10.2748 11.973 9.80569 12.588 10.0478 12.2919C10.3353 11.9426 10.6228 11.6086 10.9406 11.2897C11.0995 11.1379 11.2584 10.986 11.4173 10.8418C11.5459 10.7279 12.1209 10.3179 11.6216 10.6596C11.9696 10.4166 12.3101 10.1737 12.6808 9.96107C12.8624 9.86237 13.044 9.76367 13.2331 9.67257C13.3239 9.62701 13.4223 9.58905 13.5131 9.5435C13.0137 9.80164 13.3012 9.63461 13.4374 9.58146C13.846 9.42962 14.2697 9.30814 14.701 9.22463C15.677 9.03482 16.3201 7.81247 16.025 6.88622C15.6921 5.84608 14.7388 5.35258 13.6947 5.55757C9.28363 6.42309 6.08316 10.3559 4.74395 14.4633C4.43374 15.4047 5.09956 16.5815 6.06802 16.8017C7.10458 17.037 8.06548 16.4904 8.39839 15.473L8.39082 15.4882Z"
              fill="white"
            />
          </svg>
          <div className="-mb-2 md:-mb-4 lg:-mb-8">
            <h1 className="tracking-tight text-4xl md:text-5xl lg:text-6xl text-slate">
              <span className="font-normal">KISKový</span>{' '}
              <span className="font-extrabold">Scrapbook</span>
            </h1>
            <p className="mt-0 hidden sm:block md:text-xl text-text mx-auto font-semibold">
              <SiteDescription />
            </p>
          </div>
        </div>
        <p className="mt-0 sm:hidden md:text-xl text-text mx-auto font-semibold">
          <SiteDescription />
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
