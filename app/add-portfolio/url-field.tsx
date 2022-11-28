import { Fragment, useState } from 'react';
import TextField from './text-field';
import Image from 'next/image';
import Link from 'next/link';
import ButtonHelp from './button-help';
import Button from 'components/button';
import { usePlausible } from 'next-plausible';

interface AddPortfolioProps {
  platform: string;
}

function Paragraph({ children }) {
  return (
    <p className="mt-0 text-lg lg:text-xl text-text leading-8 mx-auto mb-4">
      {children}
    </p>
  );
}

async function addPortfolio(url: string, platform: string) {
  return fetch('/api/add-portfolio', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ url, platform }),
  }).then((response) => response.json());
}

export default function URLField({ platform }: AddPortfolioProps) {
  const [url, setUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [showHelp, setShowHelp] = useState(false);
  const [message, setMesage] = useState('');
  const [feedUrl, setFeedUrl] = useState('');
  const plausible = usePlausible();

  const handleContinue = async () => {
    plausible('Add Portfolio: Continue Click');
    if (url == '') {
      setMesage('Zadejte URL.');
      setIsError(true);
      return;
    }
    setIsLoading(true);
    const postedPortfolio = await addPortfolio(url, platform);
    setMesage(postedPortfolio.message);
    if (postedPortfolio.isError) {
      plausible('Add Portfolio: Unsuccessful');
      setIsError(true);
    } else if (postedPortfolio.feedUrl) {
      setIsError(false);
      setFeedUrl(postedPortfolio.feedUrl);
      plausible('Add Portfolio: Success');
    }
    setIsLoading(false);
  };

  return (
    <Fragment>
      <div className="flex w-full flex-col md:flex-row">
        <div className="flex-1 mb-1 md:mb-0 md:mr-2">
          <TextField
            errorMessage={isError ? message : ''}
            defaultValue=""
            placeholder={
              platform == 'wordpress'
                ? 'https://keep-learning.wordpress.com'
                : platform == 'wix'
                ? 'https://keep-learning.wixsite.com/portfolio/blog'
                : platform == 'other'
                ? 'https://keep-learning.someplaform.com'
                : 'https://keep-learning.fun'
            }
            onChange={setUrl}
          />
        </div>
        <div className="w-full sm:w-auto">
          <Button className="w-full md:w-40" onPress={handleContinue}>
            {isLoading ? (
              <span className="flex ">
                <svg
                  className="animate-spin w-5 h-5 mr-3"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    stroke-width="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>{' '}
                Zpracování…
              </span>
            ) : (
              'Pokračovat'
            )}
          </Button>
        </div>
      </div>
      {isError && (
        <div className="mt-4">
          <ButtonHelp onPress={() => setShowHelp(!showHelp)}>
            {!showHelp ? 'Potřebuji pomoc' : 'Skrýt pomoc'}
          </ButtonHelp>
          {showHelp && (
            <div className="mt-4">
              <Paragraph>
                Pokud se ti nepodaří přidat portfolio pomocí tohoto formuláře,
                neboj se nám napsat do kanálu #scrapbook na{' '}
                <Link
                  className="text-orange hover:underline"
                  href="https://discord.gg/PGugj3BsE9"
                >
                  KISKovém Discordu
                </Link>
                .
              </Paragraph>
              <Paragraph>Šablona zprávy:</Paragraph>
              <div className="px-6 py-4 bg-white rounded-lg">
                <p className="mt-0 text-lg text-text leading-6 mx-auto mb-0">
                  Ahoj, chtěl/a bych přidat své portfolio:
                  <br />
                  <br />
                  Jméno nebo přezdívka: Eliška Krásnohorská <br />
                  Portfolio: https://3liska-krasnoh0rska.wordpress.com
                  <br />
                  Platforma: wordpress
                </p>
              </div>
            </div>
          )}
        </div>
      )}
      {!isError && feedUrl != '' && (
        <div className="fixed inset-0 flex justify-center z-100 bg-background">
          <div className="flex flex-col items-center sm:max-w-4xl p-8 rounded-lg z-1 top-[10%] h-fit max-h-[80vh] relative focus:outline-none">
            <Image
              className="mb-6"
              src={'/nyan-cat.gif'}
              width={200}
              height={200}
              alt={'Nyan Cat!'}
            />
            <p className="text-2xl font-bold mb-4">
              Portfolio bylo úspěšně připojeno!
            </p>
            <Link
              href={'/portfolio?feed=' + feedUrl}
              className="flex items-center text-lg bg-blue hover:opacity-90 text-background rounded-full px-4 py-1"
            >
              Pokračovat
            </Link>
          </div>
        </div>
      )}
    </Fragment>
  );
}
