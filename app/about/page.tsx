'use client';
import Link from 'next/link';

function Paragraph({ children }) {
  return (
    <p className="mt-0 text-lg lg:text-xl text-text leading-8 mx-auto mb-4">
      {children}
    </p>
  );
}

function H2({ children }) {
  return (
    <h2 className="text-xl mt-6 mb-2 md:mt-8 md:mb-4 tracking-tight font-extrabold text-text md:text-2xl lg:text-3xl">
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
        <H2>Jak mohu na příspěvky reagovat?</H2>
        <Paragraph>
          Abychom mohli nad příspěvky diskutovat, všechny příspěvky se
          automaticky sdílí do kanálu{' '}
          <Link
            className="text-orange hover:underline"
            href="https://discord.gg/HDacGhAhj8"
          >
            #scrapbook na KISKovém Discordu
          </Link>
          .
        </Paragraph>
        <H2>Projekt je otevřený</H2>
        <Paragraph>
          Napadá vás, jak scrapbook vylepšit? Scrapbook je zcela ve vaší moci.
          Navrhněte, co by mohlo být jinak nebo to rovnou udělejte sami.{' '}
        </Paragraph>
        <ul className="mt-0 pl-6 text-xl list-disc text-text mx-auto mb-4">
          <li className="text-lg lg:text-xl text-text">
            <Link
              className="text-orange hover:underline"
              href="https://github.com/orgs/kisk-muni/projects/1/views/1"
            >
              Roadmap Scrapbooku
            </Link>{' '}
            - na čem pracujeme a jak se můžete zapojit?
          </li>
          <li className="text-lg lg:text-xl text-text">
            <Link
              className="text-orange hover:underline"
              href="https://plausible.io/kisk.vercel.app?period=all"
            >
              Plausible Analytics
            </Link>{' '}
            - anonymní statistka návštěvnosti Scrapbooku
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
        <H2>Původ Scrapbooku</H2>
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
