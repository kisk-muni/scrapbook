'use client';
import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="mx-auto sm:max-w-2xl mt-6 mb-8 px-4 sm:mt-6 sm:mb-16 sm:px-6 md:mt-8 md:mb-20">
      <div className="justify-center">
        <h1 className="text-4xl mb-4 tracking-tight text-gray-900 sm:text-5xl md:text-5xl">
          <span className="block xl:inline font-extrabold">O Scrapbooku</span>
        </h1>
        <p className="mt-0 text-xl text-gray-900 mx-auto mb-4">
          Scrapbook je místem, kde hromažďujeme střípky z našeho studia. Cílem
          scrapbooku je vytvořit místo, kam se jako studenti budeme rádi vracet
          abychom zjistili, na čem pracují ostatní a vyzájemně se podpořili.
        </p>
        <p className="mt-0 text-xl text-gray-900 mx-auto mb-4">
          V tuto chvíli na stránce naleznete příspěvky studentů ze seznamu
          zveřejněných portfolií na webu kisku. Příspěvky se aktualizují
          pravidelně každou hodinu.
        </p>
        <h2 className="text-3xl mt-8 mb-4 tracking-tight text-gray-900 sm:text-4xl md:text-4xl">
          <span className="block xl:inline font-extrabold">
            Jak připojit své portfolio?
          </span>
        </h2>
        <p className="mt-0 text-xl text-gray-900 mx-auto mb-4">
          Prozatím není možné přidat své portfolio na kliknutí. Nejjednodušší
          způsob jak své portfolio přidat je napsat na{' '}
          <Link className="text-orange-600" href="mailto:kramosilova@kisk.cz">
            kramosilova@kisk.cz
          </Link>
          .
        </p>
        <h2 className="text-3xl mt-8 mb-4 tracking-tight text-gray-900 sm:text-4xl md:text-4xl">
          <span className="block xl:inline font-extrabold">
            Projekt je otevřený
          </span>
        </h2>
        <ul className="mt-0 pl-6 text-xl list-disc text-gray-900 mx-auto mb-4">
          <li>
            <Link
              className="text-orange-600"
              href="https://plausible.io/kisk.vercel.app/"
            >
              Anonymní statistka návštěvnosti
            </Link>
          </li>
          <li>
            <Link
              className="text-orange-600"
              href="https://github.com/kisk-muni/scrapbook"
            >
              Zdrojový kód projektu na GitHubu
            </Link>
          </li>
        </ul>
        <h2 className="text-3xl mt-8 mb-4 tracking-tight text-gray-900 sm:text-4xl md:text-4xl">
          <span className="block xl:inline font-extrabold">
            Filosofie v.0.crap
          </span>
        </h2>
        <p className="mt-0 text-xl text-gray-900 mx-auto mb-4">
          Scrapbook vychází ze stejnojmenného{' '}
          <Link
            className="text-orange-600"
            href="https://scrapbook.hackclub.com/"
          >
            open source projektu
          </Link>{' '}
          organizace{' '}
          <Link className="text-orange-600" href="https://hackclub.com/">
            Hack Club
          </Link>
          . Snaží se působit jako něco, co vzniká na koleni a neprofesionálně,
          jako pouhý draft, útržek či dokonce odpad. Cílem je se nebát
          experimentovat.
        </p>
        <q className="mt-0 ml-6 text-xl text-gray-900 mx-auto mb-4">
          […] She’s telling us to produce “crap!” That got their attention;
          language is often powerful because it calls attention to itself. And
          it was effective: we started sharing drafts with each other earlier
          and more often, happily testing our ideas before we committed lots of
          time to them. […] v.0.crap works because it’s attuned to the
          psychology of the situation. It’s punching through our innate desire
          not to “look bad”, plus years of corporate conditioning that tells us
          not to share less-than-polished work. It’s easier for people used to
          delivering exceptional work to feel they’ve exceeded the goal of
          “crap”; they can sit comfortably in “good enough for the current
          purpose.” It also establishes an agreement, even trust, between the
          parties engaging with the work. A team member can use it to tell
          collaborators what kind of input they’re looking for, and people in
          positions of power can use it to clarify their expectations (
          <Link
            className="text-orange-600"
            href="https://blog.x.company/the-monkey-the-tiger-beetle-and-the-language-of-innovation-25d43a3c9632"
          >
            The monkey, the tiger beetle and the language of innovation
          </Link>
          )
        </q>
      </div>
    </div>
  );
}
