'use client';
import Link from 'next/link';
import { Fragment } from 'react';

type Contributor = {
  name: string;
  url?: string;
};

const contributors: Contributor[] = [
  { name: 'Illyria Brejchová', url: 'https://illyriabrejcha.wordpress.com/' },
  { name: 'Jasmina Aldabaghová', url: 'https://jasminaldabagh.com/' },
  { name: 'Tomáš Marek', url: 'https://www.marektomas.cz/' },
  { name: 'Petr Škyřík', url: 'https://twitter.com/petrskyrik' },
  { name: 'Hana Bělochová' },
  { name: 'Simona Kramosilová', url: 'https://www.simonakramosilova.cz/' },
  { name: 'Martin Jůda', url: 'https://judaportfolio.wordpress.com/' },
  { name: 'Lea Belejová', url: 'https://leabelejova.wixsite.com/portfolio' },
  { name: 'Jan Valtr', url: 'https://jvaltr.cz/' },
  { name: 'Dalibor Cernocky', url: 'https://cernockyd.com' },
  { name: 'Adam Mělničák', url: 'https://twitter.com/adammelnicak' },
  { name: 'Veronika Batelková', url: 'https://veronikabatelkova.cz/' },
  { name: 'Jan Bendařík', url: 'https://honza-b1234.github.io/' },
  { name: 'Michal Půta', url: 'https://twitter.com/michalpta' },
];

function Paragraph({ children }) {
  return (
    <p className="mt-0 text-lg lg:text-xl text-text leading-8 mx-auto mb-4">
      {children}
    </p>
  );
}

function H2({ children }) {
  return (
    <h2 className="text-xl mt-6 mb-3 md:mt-8 md:mb-6 tracking-tight text-text md:text-2xl lg:text-3xl">
      {children}
    </h2>
  );
}

export default function AboutPage() {
  return (
    <div className="mx-auto sm:max-w-2xl mt-6 mb-8 sm:mt-6 sm:mb-16 sm:px-6 md:mt-8 md:mb-20">
      <div className="justify-center">
        <h1 className="text-4xl mb-6 tracking-tight text-text sm:text-5xl md:text-5xl">
          <span className="block xl:inline font-extrabold">O Scrapbooku</span>
        </h1>
        <Paragraph>
          Na Scrapbooku shromažďujeme střípky z našeho studia. Cílem Scrapbooku
          je nebát se sdílet na čem zrovna pracujeme, i když daný výstup zrovna
          není podle našich představ. Díky vzájemnému sdílení víme, na čem
          pracují ostatní a můžeme se vzájemně podpořit.
        </Paragraph>
        <p className="text-xl mt-3 mb-3 md:mt-4 md:mx-3 md:mb-4 text-slate tracking-tight text-2xl md:text-3xl font-extrabold">
          <span className="leading-9 md:leading-10 text-transparent bg-gradient-header overflow-visible block from-blue to-purple italic bg-clip-text">
            Pravidelné sdílení výstupů je důležitější než snaha o&nbsp;dokonalý
            výsledek.
          </span>
        </p>
        <Paragraph>
          Na stránce naleznete příspěvky z portfolií studentů KISKu. Studenstká
          portfolia jsou neustále v procesu vylepšování a experimentování.
          Většina příspěvků je a zůstane ve fázi rozpracování.
        </Paragraph>
        <Paragraph>
          Příspěvky pochází z portfolií studentů, kteří souhlasili se
          zveřejněním svého portfolia nebo své portfolio přidali na stránce{' '}
          <Link className="text-orange hover:underline" href="/add-portfolio">
            Připojení portfolia
          </Link>
          .
        </Paragraph>
        <Paragraph>
          K aktualizaci příspěvků dochází každou hodinu. Pokud svůj příspěvek do
          hodiny po publikování neuvidíte, ozvěte se na{' '}
          <Link
            className="text-orange hover:underline"
            href="https://discord.gg/PGugj3BsE9"
          >
            Discordu
          </Link>
          .
        </Paragraph>
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
        <H2>
          <span className="block xl:inline font-extrabold">
            Projekt je otevřený
          </span>
        </H2>
        <Paragraph>
          Napadá tě, jak scrapbook vylepšit? Scrapbook je zcela ve tvé moci.
          Navrhni, co by mohlo být jinak nebo to rovnou realizuj.
        </Paragraph>
        <Paragraph>
          Na následujících odkazech se dozvíš, jak vzniká Scrapbook:{' '}
        </Paragraph>
        <ul className="mt-0 pl-6 text-xl list-disc text-text mx-auto mb-4">
          <li className="text-lg lg:text-xl text-text">
            <Link
              className="text-orange hover:underline"
              href="https://docs.google.com/document/d/1-qO6R2XxHrgFYbNnXtQLum2_6ZdIHSs0BaTcIn8Gals/edit?usp=sharing"
            >
              High-level Roadmap Scrapbooku
            </Link>{' '}
            - kam směřujeme
          </li>
          <li className="text-lg lg:text-xl text-text">
            <Link
              className="text-orange hover:underline"
              href="https://deepnote.com/@scrapbook/KISK-studentska-portfolia-f18e70c4-21da-47a9-ba0e-05b358b2678f"
            >
              Datová analýza
            </Link>{' '}
            - vyhodnocení stavu a obsahu Scrapbooku
          </li>
          <li className="text-lg lg:text-xl text-text">
            <Link
              className="text-orange hover:underline"
              href="https://plausible.io/kisk.vercel.app?period=all"
            >
              Plausible Analytics
            </Link>{' '}
            - anonymní statistka návštěvnosti
          </li>
          <li className="text-lg lg:text-xl text-text">
            <Link
              className="text-orange hover:underline"
              href="https://github.com/orgs/kisk-muni/projects/1/views/1"
            >
              Todo Roadmap
            </Link>{' '}
            - jaké problémy aktuálně řešíme
          </li>
          <li className="text-lg lg:text-xl text-text">
            <Link
              className="text-orange hover:underline"
              href="https://www.figma.com/team_invite/redeem/KOwRVSe3NVRiwwBGmU7XYC"
            >
              Figma
            </Link>{' '}
            - vizuální návrhy a prototypy
          </li>
          <li className="text-lg lg:text-xl text-text">
            <Link
              className="text-orange hover:underline"
              href="https://medium.com/design-kisk/redesign-scrapbooku-a-podpora-sd%C3%ADlen%C3%AD-portfoli%C3%AD-na-kisku-1be36100930d"
            >
              Článek o redesignu Scrapbooku
            </Link>
          </li>
          <li className="text-lg lg:text-xl text-text">
            <Link
              className="text-orange hover:underline"
              href="https://github.com/kisk-muni/scrapbook"
            >
              GitHub repozitář
            </Link>{' '}
            - zdrojový kód a jiné materiály
          </li>
        </ul>
        <H2>
          <span className="block xl:inline font-extrabold">Přispěvatelé</span>
        </H2>
        <Paragraph>Osoby, které pomohly s rozvojem Scrapbooku.</Paragraph>
        <Paragraph>
          {contributors.map((c, i) => {
            const delimeter = i + 1 != contributors.length ? ', ' : '';
            if (c.url)
              return (
                <Fragment key={i}>
                  <Link
                    className="text-orange whitespace-nowrap hover:underline"
                    href={c.url}
                  >
                    {c.name}
                  </Link>
                  {delimeter}
                </Fragment>
              );
            return (
              <Fragment key={i}>
                <span className="whitespace-nowrap">{c.name}</span>
                {delimeter}
              </Fragment>
            );
          })}
          {'.'}
          <H2>
            <span className="block xl:inline font-extrabold">
              Původ Scrapbooku
            </span>
          </H2>
        </Paragraph>
        <Paragraph>
          Cílem projektu je řešit potřeby studentů KISKu ve vzájemném sdílení
          studijní cesty a sebeprezentaci. Scrapbook vychází ze stejnojmenného{' '}
          <Link
            className="text-orange hover:underline"
            href="https://scrapbook.hackclub.com/"
          >
            open source projektu
          </Link>{' '}
          organizace{' '}
          <Link
            className="text-orange hover:underline"
            href="https://hackclub.com/"
          >
            Hack Club
          </Link>
          , přebírá jeho základní myšlenku a pro začátek také vizuální identitu.
        </Paragraph>
      </div>
    </div>
  );
}
