'use client';
import { usePlausible } from 'next-plausible';
import { CardGroup, Card } from './card-group';
import { Fragment, useState } from 'react';
import Link from 'next/link';
import URLField from './url-field';
import { Step } from './step';

function Paragraph(props) {
  return <p className="text-lg mb-2">{props.children}</p>;
}

const secondStep = {
  wordpress: <Wordpress />,
  wix: <Wix />,
  'other-platform': <OtherPlatform />,
  custom: <CustomPlatform />,
  'no-portfolio': <NoPortfolio />,
};

export default function AddPortfolioPage() {
  const [platform, setPlatform] = useState('');
  const plausible = usePlausible();
  const handlePlatformSelect = (val) => {
    plausible('Add Portfolio: Platform selected');
    setPlatform(val);
  };
  return (
    <div className="mx-auto sm:max-w-2xl bg-background rounded-lg mt-6 mb-8 sm:mt-6 sm:mb-16 sm:px-8 md:mt-8 md:mb-20">
      <div className="justify-center">
        <h1 className="text-4xl mb-6 tracking-tight text-text sm:text-5xl md:text-5xl tracking-tight bg-clip-text">
          <span className="block xl:inline font-extrabold">
            Připojení portfolia
          </span>
        </h1>
        <p>
          Pro připojení tvého portfolia prosím napiš na KISKový Discord nebo na
          cernockyd@mail.muni.cz. Ve zprávě uveď své jméno, příjmení, ročník
          nastoupení do studia a URL.
        </p>
        <p>
          Příklad: Dalibor Černocký, 2023 jaro, https://cernockyd.wordpress.com
        </p>
      </div>
    </div>
  );
}

function Wordpress() {
  return (
    <Fragment>
      <Step number={2}>
        <Paragraph>Zadej URL adresu portfolia</Paragraph>
        <URLField platform="wordpress" />
      </Step>
    </Fragment>
  );
}

function Wix() {
  return (
    <Fragment>
      <Step number={2}>
        <Paragraph>Zadej URL adresu výpisu příspěvků.</Paragraph>
        <Paragraph>
          <span className="text-base">
            Stránka, na které se nachází výpis příspěvků se může lišit od hlavní
            stránky portfolia.
          </span>
        </Paragraph>
        <Paragraph>
          <span className="text-base">Příklad:</span>
        </Paragraph>
        <ul className="text-base list-disc pl-6 mb-4">
          <li className="mb-0.5">
            Adresa portfolia :{' '}
            <Link
              className="bg-smoke inline-block px-1.5 rounded-sm"
              href="https://leabelejova.wixsite.com/portfolio"
            >
              https://leabelejova.wixsite.com/portfolio
            </Link>
          </li>
          <li className="mb-0.5">
            Adresa stránky s výpisem příspěvků:{' '}
            <Link
              className="bg-smoke inline-block px-1.5 rounded-sm"
              href="https://leabelejova.wixsite.com/portfolio/blog"
            >
              https://leabelejova.wixsite.com/portfolio/blog
            </Link>
          </li>
        </ul>
        <Paragraph>URL výpisu příspěvků</Paragraph>
        <URLField platform="wix" />
      </Step>
    </Fragment>
  );
}

function OtherPlatform() {
  return (
    <Fragment>
      <Step number={2}>
        <Paragraph>Zadej URL adresu portfolia</Paragraph>
        <Paragraph>
          <span className="text-base">
            Pokud své portfolio provozuješ na jiné platformě, neboj se pokusit o
            jeho připojení. Připojení se však nemusí vydařit, protože je tato
            funkce pouze experimentální.
          </span>
        </Paragraph>
        <URLField platform="other" />
      </Step>
    </Fragment>
  );
}

function CustomPlatform() {
  return (
    <Fragment>
      <Step number={2}>
        <Paragraph>Zadej URL RSS/Atom feedu</Paragraph>
        <Paragraph>
          <span className="text-base">
            Předpokládáme, že máš znalosti základů webu. Momentálně podporujeme
            připojení potfolia pomocí poskytnutí{' '}
            <Link
              target="_blank"
              className="underline text-orange"
              href="https://cs.wikipedia.org/wiki/Atom_(standard)"
            >
              Atom feedu
            </Link>
            .
          </span>
        </Paragraph>
        <Paragraph>URL RSS/Atom feedu</Paragraph>
        <URLField platform="custom" />
      </Step>
    </Fragment>
  );
}

function NoPortfolio() {
  return (
    <Fragment>
      <Step number={2}>
        <Paragraph>
          Pokud nemáš portfolio, doporučujeme vytvořit ho pomocí{' '}
          <Link
            target="_blank"
            className="underline text-orange"
            href="https://kisk.phil.muni.cz/studenti/digitalni-portfolio"
          >
            návodu na webu KISKu
          </Link>{' '}
          v sekci „Jak na to?“.{' '}
        </Paragraph>
      </Step>
      <Step number={3}>
        <Paragraph>
          Nezapomeňte se sem vrátit a své portfolio přidat vybráním zvolené
          platformy.
        </Paragraph>
      </Step>
    </Fragment>
  );
}
