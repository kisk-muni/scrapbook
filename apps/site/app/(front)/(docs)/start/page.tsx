'use client';
import Link from 'next/link';
import { Fragment } from 'react';
import { ArrowUpRightIcon } from '@heroicons/react/20/solid';

function Paragraph({ children }) {
  return (
    <p className="mt-0 text-lg lg:text-xl text-text leading-8 mx-auto mb-4">
      {children}
    </p>
  );
}

function H2({ children }) {
  return (
    <h2 className="text-xl mt-6 mb-3 md:mt-8 md:mb-6 tracking-tight text-text md:text-xl lg:text-2xl">
      {children}
    </h2>
  );
}

export default function AboutPage() {
  return (
    <div className="mx-auto sm:max-w-2xl mt-6 mb-8 sm:mt-6 sm:mb-16 sm:px-6 md:mt-6 md:mb-20">
      <div className="justify-center">
        <h1 className="text-4xl mb-6 tracking-tight text-text sm:text-4xl md:text-4xl">
          <span className="block xl:inline font-extrabold">
            Jak začít se Srapbookem
          </span>
        </h1>
        <Paragraph>
          Scrapbook nám pomáhá ve vzájemném sdílení studijní cesty. Díky
          vzájemnému sdílení víme, na čem pracují ostatní a můžeme se vzájemně
          podpořit.
        </Paragraph>
        <H2>
          <span className="block xl:inline font-extrabold">
            Vytvořte svůj profil na Scrapbooku
          </span>
        </H2>
        <Paragraph>
          Profil na Scrapbooku vám umožní vytvářet příspěvky a připojit své
          portfolio nebo blog.
        </Paragraph>
        <Paragraph>Pro vytvoření profilu:</Paragraph>
        <ol className="mt-0 list-outside [&>li]:pl-2 [&>li]:mb-2 list-decimal pl-8 mb-8 text-lg lg:text-xl text-text leading-8 mx-auto">
          <li>
            Klepněte na tlačítko{' '}
            <strong className="text-nowrap whitespace-nowrap">
              Přihlásit se / Registrace
            </strong>{' '}
            v navigaci. Budete přesměrování na přihlášení pomocí Google účtu.
          </li>
          <li>
            Po úspěšném přihlášení pomocí Google budete přesměrováni zpět na
            Scrapbook.
          </li>
          <li>
            Budete vyzváni ke zvolení vašeho jména a přezdívky na Scrapbooku.
          </li>
          <li>Po zadání potřebných údajů bude váš profil úspěšně vytvořen.</li>
        </ol>
        <H2>
          <span className="block xl:inline font-extrabold">
            Připojení portfolia nebo blogu
          </span>
        </H2>
        <Paragraph>
          Pokud máte svůj web, připojte jej ke svému profilu na Scrapbooku.
          Příspěvky z vašich připojených blogů se automaticky propíší na
          Scrapbook.
        </Paragraph>
        <Paragraph>Pro připojení vašeho porfolia:</Paragraph>
        <ol className="mt-0 list-outside [&>li]:pl-2 [&>li]:mb-2 list-decimal pl-8 mb-8 text-lg lg:text-xl text-text leading-8 mx-auto">
          <li>
            V nastavení profilu přejděte na záložku{' '}
            <Link
              target="_blank"
              className="text-orange hover:underline text-nowrap whitespace-nowrap"
              href="/settings/blogs"
            >
              Externí blog
              <ArrowUpRightIcon
                className="w-4 h-4 inline-block -ml-px -mt-px"
                strokeWidth={3}
              />
            </Link>
            .
          </li>
          <li>
            Zadejte URL vašeho porftolia a klikněte na tlačítko{' '}
            <strong>Připojit</strong>.
          </li>
        </ol>
        <H2>
          <span className="block xl:inline font-extrabold">
            Jak mohu na příspěvky reagovat?
          </span>
        </H2>
        <Paragraph>
          Abychom mohli nad příspěvky diskutovat, všechny příspěvky se
          automaticky sdílí do kanálu{' '}
          <Link
            className="text-orange hover:underline"
            href="https://discord.gg/HDacGhAhj8"
          >
            #scrapbook
          </Link>{' '}
          v KISKové komunitě na platformě Discord. Na Discordu najdeš také
          diskuze ohledně předmětů, jednotlivých profilací nebo trávení volného
          času. Discord lze stáhnout jako aplikace nebo používat v jakémkoli
          prohlížeči. Pokračuj na následující odkaz a zaregistruj se na
          Discordu.
        </Paragraph>
        <Paragraph>
          <Link
            className="text-orange hover:underline"
            href="https://discord.gg/HDacGhAhj8"
          >
            Získat pozvánku na KISKový Discord →
          </Link>
        </Paragraph>
      </div>
    </div>
  );
}
