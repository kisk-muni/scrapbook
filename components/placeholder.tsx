import { Fragment } from 'react';

type Props = {
  width: string;
  height?: string;
  error: any;
};

export default function Placeholder({ width, height, error = false }: Props) {
  return (
    <Fragment>
      <span
        className={`inline-block ${width} placeholder ${
          !error ? 'animate-pulse' : ''
        } rounded select-none align-top overflow-hidden relative`}
        style={{ height: height ? height : undefined }}
      >
        &nbsp;
      </span>
      <style jsx>{`
        .placeholder::before {
          content: ' ';
          position: absolute;
          top: 2px;
          bottom: 2px;
          right: 2px;
          left: 2px;
          border-radius: 0.2rem;
          background: ${!error ? '#e5e7eb' : '#fecaca'};
          animation-name: fadeInOpacity;
          animation-iteration-count: 1;
          animation-timing-function: ease-in;
          animation-duration: 0.2;
        }
        @keyframes fadeInOpacity {
          0% {
            opacity: 0;
          }
          100% {
            opacity: 1;
          }
        }
      `}</style>
    </Fragment>
  );
}
