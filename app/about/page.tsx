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
          Scrapbook je místem, kde shromažďujeme střípky z našeho studia. Cílem
          scrapbooku je vytvořit místo, kam se jako studenti budeme rádi vracet
          abychom zjistili, na čem pracují ostatní a vzájemně se podpořili.
        </Paragraph>
        <Paragraph>
          Na stránce naleznete příspěvky z portfolií studentů ze seznamu
          zveřejněných portfolií na webu kisku. Příspěvky se pravidelně
          automaticky aktualizují. Pokud svůj příspěvek do hodiny po publikování
          neuvidíte, napište na{' '}
          <Link
            className="text-orange hover:underline"
            href="https://discord.gg/PGugj3BsE9"
          >
            KISKový Discord
          </Link>
          .
        </Paragraph>
        <H2>
          <span className="block xl:inline font-extrabold">
            Projekt je otevřený
          </span>
        </H2>
        <Paragraph>
          Napadá vás, jak scrapbook vylepšit? Scrapbook je zcela ve vaší moci.
          Navrhněte, co by mohlo být jinak nebo to rovnou udělejte sami.{' '}
        </Paragraph>
        <ul className="mt-0 pl-6 text-xl list-disc text-text mx-auto mb-4">
          <li>
            <Link
              className="text-orange hover:underline"
              href="https://github.com/orgs/kisk-muni/projects/1/views/1"
            >
              Roadmap projektu
            </Link>{' '}
            - co vás trápí, co chystáme a co je potřeba udělat?
          </li>
          <li>
            <Link
              className="text-orange hover:underline"
              href="https://plausible.io/kisk.vercel.app?period=all"
            >
              Plausible Analytics
            </Link>{' '}
            - anonymní statistka návštěvnosti projektu
          </li>
          <li>
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
          <span className="block xl:inline font-extrabold">
            Filosofie v.0.crap
          </span>
        </H2>
        <Paragraph>
          Scrapbook se snaží působit jako něco, co vzniká na koleni a
          neprofesionálně, jako pouhý draft, útržek či dokonce odpad. Cílem je
          se nebát experimentovat.
        </Paragraph>
        <Paragraph>
          <div className="ml-3 md:ml-6">
            <q>
              […] We started sharing drafts with each other earlier and more
              often, happily testing our ideas before we committed lots of time
              to them. […] v.0.crap works because it’s attuned to the psychology
              of the situation. It’s punching through our innate desire not to
              “look bad”, plus years of corporate conditioning that tells us not
              to share less-than-polished work. It’s easier for people used to
              delivering exceptional work to feel they’ve exceeded the goal of
              “crap”; they can sit comfortably in “good enough for the current
              purpose.” It also establishes an agreement, even trust, between
              the parties engaging with the work. A team member can use it to
              tell collaborators what kind of input they’re looking for, and
              people in positions of power can use it to clarify their
              expectations
            </q>{' '}
            (
            <Link
              className="text-orange hover:underline"
              href="https://blog.x.company/the-monkey-the-tiger-beetle-and-the-language-of-innovation-25d43a3c9632"
            >
              courtneyhohne, 2020
            </Link>
            )
          </div>
        </Paragraph>
        <H2>
          <span className="block xl:inline font-extrabold">
            Původ Scrapbooku
          </span>
        </H2>
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
