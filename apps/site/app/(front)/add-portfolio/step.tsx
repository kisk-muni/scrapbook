import { ReactNode } from 'react';

interface StepProps {
  number: number;
  children: ReactNode;
}

export function Step(props: StepProps) {
  return (
    <div className="flex mb-6">
      <div className="mr-2 sm:mr-4 h-6 w-6 sm:h-8 sm:w-8 shrink-0 text-sm sm:text-base flex items-center bg-orange justify-center text-background rounded-full font-semibold">
        {props.number}
      </div>
      <div className="flex-1">{props.children}</div>
    </div>
  );
}
