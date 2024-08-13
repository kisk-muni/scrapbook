import classNames from 'classnames';

export function IconMapTrifold({ ...props }: React.ComponentProps<'svg'>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      viewBox="0 0 256 256"
      {...props}
    >
      <path d="M231.38,46.54a12,12,0,0,0-10.29-2.18L161.4,59.28l-60-30a12,12,0,0,0-8.28-.91l-64,16A12,12,0,0,0,20,56V200a12,12,0,0,0,14.91,11.64L94.6,196.72l60,30a12,12,0,0,0,8.28.91l64-16A12,12,0,0,0,236,200V56A12,12,0,0,0,231.38,46.54ZM108,59.42l40,20V196.58l-40-20Zm-64,6,40-10V174.63l-40,10ZM212,190.63l-40,10V81.37l40-10Z"></path>
    </svg>
  );
}

export function IconCompas({ ...props }: React.ComponentProps<'svg'>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      viewBox="0 0 256 256"
      {...props}
    >
      <path d="M128,20A108,108,0,1,0,236,128,108.12,108.12,0,0,0,128,20Zm0,192a84,84,0,1,1,84-84A84.09,84.09,0,0,1,128,212ZM163.27,77l-56,24a12,12,0,0,0-6.3,6.3l-24,56A12,12,0,0,0,92.73,179l56-24a12,12,0,0,0,6.3-6.3l24-56A12,12,0,0,0,163.27,77Zm-28.41,57.89-24,10.29,10.29-24,24-10.29Z"></path>
    </svg>
  );
}

export function IconClose({
  className,
  ...props
}: React.ComponentProps<'svg'>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 256 256"
      fill="currentColor"
      className={classNames('size-4', className)}
      {...props}
    >
      <path d="M205.66 194.34a8 8 0 0 1-11.32 11.32L128 139.31l-66.34 66.35a8 8 0 0 1-11.32-11.32L116.69 128 50.34 61.66a8 8 0 0 1 11.32-11.32L128 116.69l66.34-66.35a8 8 0 0 1 11.32 11.32L139.31 128Z" />
    </svg>
  );
}

export function IconSealCheck({ ...props }: React.ComponentProps<'svg'>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      viewBox="0 0 256 256"
      {...props}
    >
      <path d="M128,20A108,108,0,1,0,236,128,108.12,108.12,0,0,0,128,20Zm0,192a84,84,0,1,1,84-84A84.09,84.09,0,0,1,128,212ZM163.27,77l-56,24a12,12,0,0,0-6.3,6.3l-24,56A12,12,0,0,0,92.73,179l56-24a12,12,0,0,0,6.3-6.3l24-56A12,12,0,0,0,163.27,77Zm-28.41,57.89-24,10.29,10.29-24,24-10.29Z"></path>
    </svg>
  );
}

export function IconChecks({ ...props }: React.ComponentProps<'svg'>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      viewBox="0 0 256 256"
      {...props}
    >
      <path d="M152.41,88.56l-89.6,88a12,12,0,0,1-16.82,0L7.59,138.85a12,12,0,0,1,16.82-17.13l30,29.46,81.19-79.74a12,12,0,0,1,16.82,17.12Zm96.15-17a12,12,0,0,0-17-.15L150.4,151.18l-7.88-7.74a12,12,0,0,0-16.82,17.12l16.29,16a12,12,0,0,0,16.82,0l89.6-88A12,12,0,0,0,248.56,71.59Z"></path>
    </svg>
  );
}

export function IconHouse({ ...props }: React.ComponentProps<'svg'>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      viewBox="0 0 256 256"
      {...props}
    >
      <path d="M221.56,100.85,141.61,25.38l-.16-.15a19.93,19.93,0,0,0-26.91,0l-.17.15L34.44,100.85A20.07,20.07,0,0,0,28,115.55V208a20,20,0,0,0,20,20H96a20,20,0,0,0,20-20V164h24v44a20,20,0,0,0,20,20h48a20,20,0,0,0,20-20V115.55A20.07,20.07,0,0,0,221.56,100.85ZM204,204H164V160a20,20,0,0,0-20-20H112a20,20,0,0,0-20,20v44H52V117.28l76-71.75,76,71.75Z"></path>
    </svg>
  );
}

export function IconListDashes({ ...props }: React.ComponentProps<'svg'>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      viewBox="0 0 256 256"
      {...props}
    >
      <path d="M84,64A12,12,0,0,1,96,52H216a12,12,0,0,1,0,24H96A12,12,0,0,1,84,64Zm132,52H96a12,12,0,0,0,0,24H216a12,12,0,0,0,0-24Zm0,64H96a12,12,0,0,0,0,24H216a12,12,0,0,0,0-24ZM56,52H40a12,12,0,0,0,0,24H56a12,12,0,0,0,0-24Zm0,64H40a12,12,0,0,0,0,24H56a12,12,0,0,0,0-24Zm0,64H40a12,12,0,0,0,0,24H56a12,12,0,0,0,0-24Z"></path>
    </svg>
  );
}

export function IconList({ ...props }: React.ComponentProps<'svg'>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      viewBox="0 0 256 256"
      {...props}
    >
      <path d="M228,128a12,12,0,0,1-12,12H40a12,12,0,0,1,0-24H216A12,12,0,0,1,228,128ZM40,76H216a12,12,0,0,0,0-24H40a12,12,0,0,0,0,24ZM216,180H40a12,12,0,0,0,0,24H216a12,12,0,0,0,0-24Z"></path>
    </svg>
  );
}

export function IconColumns({ ...props }: React.ComponentProps<'svg'>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      viewBox="0 0 256 256"
      {...props}
    >
      <path d="M100,28H64A20,20,0,0,0,44,48V208a20,20,0,0,0,20,20h36a20,20,0,0,0,20-20V48A20,20,0,0,0,100,28ZM96,204H68V52H96ZM192,28H156a20,20,0,0,0-20,20V208a20,20,0,0,0,20,20h36a20,20,0,0,0,20-20V48A20,20,0,0,0,192,28Zm-4,176H160V52h28Z"></path>
    </svg>
  );
}

export function IconRows({ ...props }: React.ComponentProps<'svg'>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      viewBox="0 0 256 256"
      {...props}
    >
      <path d="M208,136H48a20,20,0,0,0-20,20v36a20,20,0,0,0,20,20H208a20,20,0,0,0,20-20V156A20,20,0,0,0,208,136Zm-4,52H52V160H204Zm4-144H48A20,20,0,0,0,28,64v36a20,20,0,0,0,20,20H208a20,20,0,0,0,20-20V64A20,20,0,0,0,208,44Zm-4,52H52V68H204Z"></path>
    </svg>
  );
}

export function IconDotsThree({ ...props }: React.ComponentProps<'svg'>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      viewBox="0 0 256 256"
      {...props}
    >
      <path d="M140,128a12,12,0,1,1-12-12A12,12,0,0,1,140,128Zm56-12a12,12,0,1,0,12,12A12,12,0,0,0,196,116ZM60,116a12,12,0,1,0,12,12A12,12,0,0,0,60,116Z"></path>
    </svg>
  );
}

export function IconPlayCircle({ ...props }: React.ComponentProps<'svg'>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      viewBox="0 0 256 256"
      {...props}
    >
      <path d="M128,20A108,108,0,1,0,236,128,108.12,108.12,0,0,0,128,20Zm0,192a84,84,0,1,1,84-84A84.09,84.09,0,0,1,128,212Zm40-84a12,12,0,0,1-5.12,9.83l-40,28A12,12,0,0,1,104,156V100a12,12,0,0,1,18.88-9.83l40,28A12,12,0,0,1,168,128Z"></path>
    </svg>
  );
}

export function IconChatCircle({ ...props }: React.ComponentProps<'svg'>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      viewBox="0 0 256 256"
      {...props}
    >
      <path d="M128,20A108,108,0,0,0,31.85,177.23L21,209.66A20,20,0,0,0,46.34,235l32.43-10.81A108,108,0,1,0,128,20Zm0,192a84,84,0,0,1-42.06-11.27,12,12,0,0,0-6-1.62,12.1,12.1,0,0,0-3.8.62l-29.79,9.93,9.93-29.79a12,12,0,0,0-1-9.81A84,84,0,1,1,128,212Z"></path>
    </svg>
  );
}

export function IconCheckCircle({ ...props }: React.ComponentProps<'svg'>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      viewBox="0 0 256 256"
      {...props}
    >
      <path d="M176.49,95.51a12,12,0,0,1,0,17l-56,56a12,12,0,0,1-17,0l-24-24a12,12,0,1,1,17-17L112,143l47.51-47.52A12,12,0,0,1,176.49,95.51ZM236,128A108,108,0,1,1,128,20,108.12,108.12,0,0,1,236,128Zm-24,0a84,84,0,1,0-84,84A84.09,84.09,0,0,0,212,128Z"></path>
    </svg>
  );
}

export function IconLink({ ...props }: React.ComponentProps<'svg'>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      viewBox="0 0 256 256"
      {...props}
    >
      <path d="M117.18,188.74a12,12,0,0,1,0,17l-5.12,5.12A58.26,58.26,0,0,1,70.6,228h0A58.62,58.62,0,0,1,29.14,127.92L63.89,93.17a58.64,58.64,0,0,1,98.56,28.11,12,12,0,1,1-23.37,5.44,34.65,34.65,0,0,0-58.22-16.58L46.11,144.89A34.62,34.62,0,0,0,70.57,204h0a34.41,34.41,0,0,0,24.49-10.14l5.11-5.12A12,12,0,0,1,117.18,188.74ZM226.83,45.17a58.65,58.65,0,0,0-82.93,0l-5.11,5.11a12,12,0,0,0,17,17l5.12-5.12a34.63,34.63,0,1,1,49,49L175.1,145.86A34.39,34.39,0,0,1,150.61,156h0a34.63,34.63,0,0,1-33.69-26.72,12,12,0,0,0-23.38,5.44A58.64,58.64,0,0,0,150.56,180h.05a58.28,58.28,0,0,0,41.47-17.17l34.75-34.75a58.62,58.62,0,0,0,0-82.91Z"></path>
    </svg>
  );
}

export function IconUsersThree({ ...props }: React.ComponentProps<'svg'>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      viewBox="0 0 256 256"
      {...props}
    >
      <path d="M164.38,181.1a52,52,0,1,0-72.76,0,75.89,75.89,0,0,0-30,28.89,12,12,0,0,0,20.78,12,53,53,0,0,1,91.22,0,12,12,0,1,0,20.78-12A75.89,75.89,0,0,0,164.38,181.1ZM100,144a28,28,0,1,1,28,28A28,28,0,0,1,100,144Zm147.21,9.59a12,12,0,0,1-16.81-2.39c-8.33-11.09-19.85-19.59-29.33-21.64a12,12,0,0,1-1.82-22.91,20,20,0,1,0-24.78-28.3,12,12,0,1,1-21-11.6,44,44,0,1,1,73.28,48.35,92.18,92.18,0,0,1,22.85,21.69A12,12,0,0,1,247.21,153.59Zm-192.28-24c-9.48,2.05-21,10.55-29.33,21.65A12,12,0,0,1,6.41,136.79,92.37,92.37,0,0,1,29.26,115.1a44,44,0,1,1,73.28-48.35,12,12,0,1,1-21,11.6,20,20,0,1,0-24.78,28.3,12,12,0,0,1-1.82,22.91Z"></path>
    </svg>
  );
}

export function IconCheckCircleFilled({
  ...props
}: React.ComponentProps<'svg'>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      viewBox="0 0 32 32"
      {...props}
    >
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M8.77759 5.1909C10.9154 3.76244 13.4288 3 16 3C19.4467 3.00364 22.7512 4.37445 25.1884 6.81163C27.6256 9.24882 28.9964 12.5533 29 16C29 18.5712 28.2376 21.0846 26.8091 23.2224C25.3806 25.3603 23.3503 27.0265 20.9749 28.0104C18.5994 28.9944 15.9856 29.2518 13.4638 28.7502C10.9421 28.2486 8.62569 27.0105 6.80761 25.1924C4.98953 23.3743 3.7514 21.0579 3.24979 18.5362C2.74818 16.0144 3.00563 13.4006 3.98957 11.0251C4.97351 8.64968 6.63975 6.61935 8.77759 5.1909ZM22.0613 11.9388C22.2011 12.0781 22.312 12.2437 22.3878 12.426C22.4635 12.6084 22.5024 12.8038 22.5024 13.0013C22.5024 13.1987 22.4635 13.3942 22.3878 13.5765C22.312 13.7588 22.2011 13.9244 22.0613 14.0638L15.0613 21.0637C14.9219 21.2036 14.7563 21.3145 14.574 21.3903C14.3917 21.466 14.1962 21.5049 13.9988 21.5049C13.8013 21.5049 13.6059 21.466 13.4235 21.3903C13.2412 21.3145 13.0756 21.2036 12.9363 21.0637L9.93625 18.0637C9.79672 17.9242 9.68604 17.7586 9.61053 17.5763C9.53502 17.394 9.49615 17.1986 9.49615 17.0012C9.49615 16.8039 9.53502 16.6085 9.61053 16.4262C9.68604 16.2439 9.79672 16.0783 9.93625 15.9388C10.0758 15.7992 10.2414 15.6885 10.4237 15.613C10.606 15.5375 10.8014 15.4986 10.9988 15.4986C11.1961 15.4986 11.3915 15.5375 11.5738 15.613C11.7561 15.6885 11.9217 15.7992 12.0613 15.9388L14 17.875L19.9387 11.935C20.0783 11.7958 20.2439 11.6854 20.4262 11.6103C20.6084 11.5351 20.8037 11.4966 21.0008 11.4969C21.1979 11.4973 21.393 11.5365 21.575 11.6123C21.7569 11.6881 21.9222 11.799 22.0613 11.9388Z"
      />
    </svg>
  );
}

export function IconArrowRight({ ...props }: React.ComponentProps<'svg'>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      viewBox="0 0 256 256"
      {...props}
    >
      <path d="M224.49,136.49l-72,72a12,12,0,0,1-17-17L187,140H40a12,12,0,0,1,0-24H187L135.51,64.48a12,12,0,0,1,17-17l72,72A12,12,0,0,1,224.49,136.49Z"></path>
    </svg>
  );
}

export function IconCircle({ ...props }: React.ComponentProps<'svg'>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      viewBox="0 0 256 256"
      {...props}
    >
      <path d="M128,20A108,108,0,1,0,236,128,108.12,108.12,0,0,0,128,20Zm0,192a84,84,0,1,1,84-84A84.09,84.09,0,0,1,128,212Z"></path>
    </svg>
  );
}

export function IconCircleDot({ ...props }: React.ComponentProps<'svg'>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      viewBox="0 0 256 256"
      {...props}
    >
      <path d="M128,20A108,108,0,1,0,236,128,108.12,108.12,0,0,0,128,20Zm0,192a84,84,0,1,1,84-84A84.09,84.09,0,0,1,128,212Z"></path>
      <path d="M144,128a16,16,0,1,1-16-16A16,16,0,0,1,144,128Z"></path>
    </svg>
  );
}

export function IconMinusCircle({ ...props }: React.ComponentProps<'svg'>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      viewBox="0 0 256 256"
      {...props}
    >
      <path d="M180,128a12,12,0,0,1-12,12H88a12,12,0,0,1,0-24h80A12,12,0,0,1,180,128Zm56,0A108,108,0,1,1,128,20,108.12,108.12,0,0,1,236,128Zm-24,0a84,84,0,1,0-84,84A84.09,84.09,0,0,0,212,128Z"></path>
    </svg>
  );
}

export function IconCircleHalf({ ...props }: React.ComponentProps<'svg'>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      viewBox="0 0 256 256"
      {...props}
    >
      <path d="M128,20A108,108,0,1,0,236,128,108.12,108.12,0,0,0,128,20Zm12,24.87a83.53,83.53,0,0,1,24,7.25V203.88a83.53,83.53,0,0,1-24,7.25ZM44,128a84.12,84.12,0,0,1,72-83.13V211.13A84.12,84.12,0,0,1,44,128Zm144,58.71V69.29a83.81,83.81,0,0,1,0,117.42Z"></path>
    </svg>
  );
}

export function IconCircleDashed({ ...props }: React.ComponentProps<'svg'>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      viewBox="0 0 256 256"
      {...props}
    >
      <path d="M92.38,38.05A12,12,0,0,1,101,23.42a108,108,0,0,1,54,0,12,12,0,1,1-6,23.23,84.11,84.11,0,0,0-42,0A12,12,0,0,1,92.38,38.05ZM50.94,52.34a108.1,108.1,0,0,0-27,46.76,12,12,0,0,0,8.37,14.77,12.2,12.2,0,0,0,3.2.43,12,12,0,0,0,11.56-8.8,84,84,0,0,1,21-36.35A12,12,0,1,0,50.94,52.34Zm-3.88,98.14a12,12,0,0,0-23.12,6.42,108,108,0,0,0,27,46.78A12,12,0,0,0,68,186.85,84,84,0,0,1,47.06,150.48ZM149,209.35a84,84,0,0,1-42,0,12,12,0,1,0-6,23.23,108,108,0,0,0,54,0,12,12,0,1,0-6-23.23Zm74.72-67.22A12,12,0,0,0,209,150.5a84,84,0,0,1-21,36.35,12,12,0,0,0,17.12,16.82,108.19,108.19,0,0,0,27-46.77A12,12,0,0,0,223.71,142.13Zm-14.77-36.61a12,12,0,0,0,23.12-6.42,108,108,0,0,0-27-46.78A12,12,0,1,0,188,69.15,84,84,0,0,1,208.94,105.52Z"></path>
    </svg>
  );
}

export function IconCheckSquare({ ...props }: React.ComponentProps<'svg'>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      viewBox="0 0 256 256"
      {...props}
    >
      <path d="M79.51,144.49a12,12,0,1,1,17-17L112,143l47.51-47.52a12,12,0,0,1,17,17l-56,56a12,12,0,0,1-17,0ZM228,48V208a20,20,0,0,1-20,20H48a20,20,0,0,1-20-20V48A20,20,0,0,1,48,28H208A20,20,0,0,1,228,48Zm-24,4H52V204H204Z"></path>
    </svg>
  );
}

export function IconUsers({ ...props }: React.ComponentProps<'svg'>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      viewBox="0 0 256 256"
      {...props}
    >
      <path d="M125.18,156.94a64,64,0,1,0-82.36,0,100.23,100.23,0,0,0-39.49,32,12,12,0,0,0,19.35,14.2,76,76,0,0,1,122.64,0,12,12,0,0,0,19.36-14.2A100.33,100.33,0,0,0,125.18,156.94ZM44,108a40,40,0,1,1,40,40A40,40,0,0,1,44,108Zm206.1,97.67a12,12,0,0,1-16.78-2.57A76.31,76.31,0,0,0,172,172a12,12,0,0,1,0-24,40,40,0,1,0-14.85-77.16,12,12,0,1,1-8.92-22.28,64,64,0,0,1,65,108.38,100.23,100.23,0,0,1,39.49,32A12,12,0,0,1,250.1,205.67Z"></path>
    </svg>
  );
}

export function IconSquare({ ...props }: React.ComponentProps<'svg'>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      viewBox="0 0 256 256"
      {...props}
    >
      <path d="M208,28H48A20,20,0,0,0,28,48V208a20,20,0,0,0,20,20H208a20,20,0,0,0,20-20V48A20,20,0,0,0,208,28Zm-4,176H52V52H204Z"></path>
      <path d="M144,128a16,16,0,1,1-16-16A16,16,0,0,1,144,128Z"></path>
    </svg>
  );
}

export function IconSquaresFour({ ...props }: React.ComponentProps<'svg'>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      viewBox="0 0 256 256"
      {...props}
    >
      <path d="M100,36H56A20,20,0,0,0,36,56v44a20,20,0,0,0,20,20h44a20,20,0,0,0,20-20V56A20,20,0,0,0,100,36ZM96,96H60V60H96ZM200,36H156a20,20,0,0,0-20,20v44a20,20,0,0,0,20,20h44a20,20,0,0,0,20-20V56A20,20,0,0,0,200,36Zm-4,60H160V60h36Zm-96,40H56a20,20,0,0,0-20,20v44a20,20,0,0,0,20,20h44a20,20,0,0,0,20-20V156A20,20,0,0,0,100,136Zm-4,60H60V160H96Zm104-60H156a20,20,0,0,0-20,20v44a20,20,0,0,0,20,20h44a20,20,0,0,0,20-20V156A20,20,0,0,0,200,136Zm-4,60H160V160h36Z"></path>
    </svg>
  );
}

IconSquaresFour.filled = function ({ ...props }: React.ComponentProps<'svg'>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      viewBox="0 0 256 256"
      {...props}
    >
      <path d="M120,56v48a16,16,0,0,1-16,16H56a16,16,0,0,1-16-16V56A16,16,0,0,1,56,40h48A16,16,0,0,1,120,56Zm80-16H152a16,16,0,0,0-16,16v48a16,16,0,0,0,16,16h48a16,16,0,0,0,16-16V56A16,16,0,0,0,200,40Zm-96,96H56a16,16,0,0,0-16,16v48a16,16,0,0,0,16,16h48a16,16,0,0,0,16-16V152A16,16,0,0,0,104,136Zm96,0H152a16,16,0,0,0-16,16v48a16,16,0,0,0,16,16h48a16,16,0,0,0,16-16V152A16,16,0,0,0,200,136Z"></path>
    </svg>
  );
};

export function IconCheck({ ...props }: React.ComponentProps<'svg'>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      viewBox="0 0 256 256"
      {...props}
    >
      <path d="M232.49,80.49l-128,128a12,12,0,0,1-17,0l-56-56a12,12,0,1,1,17-17L96,183,215.51,63.51a12,12,0,0,1,17,17Z"></path>
    </svg>
  );
}

export function IconChartPie({ ...props }: React.ComponentProps<'svg'>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      viewBox="0 0 256 256"
      {...props}
    >
      <path d="M128,20A108,108,0,1,0,236,128,108.12,108.12,0,0,0,128,20Zm12,24.87A84,84,0,0,1,194,76.07L140,107.22ZM50,159.17a83.94,83.94,0,0,1,66-114.3v76.2ZM128,212a83.88,83.88,0,0,1-65.95-32.07L206,96.83A84,84,0,0,1,128,212Z"></path>
    </svg>
  );
}

export function IconX({ ...props }: React.ComponentProps<'svg'>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      viewBox="0 0 256 256"
      {...props}
    >
      <path d="M208.49,191.51a12,12,0,0,1-17,17L128,145,64.49,208.49a12,12,0,0,1-17-17L111,128,47.51,64.49a12,12,0,0,1,17-17L128,111l63.51-63.52a12,12,0,0,1,17,17L145,128Z"></path>
    </svg>
  );
}

export function IconQuestionMark({ ...props }: React.ComponentProps<'svg'>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      viewBox="0 0 256 256"
      {...props}
    >
      <path d="M196,96c0,29.47-24.21,54.05-56,59.06V156a12,12,0,0,1-24,0V144a12,12,0,0,1,12-12c24.26,0,44-16.15,44-36s-19.74-36-44-36S84,76.15,84,96a12,12,0,0,1-24,0c0-33.08,30.5-60,68-60S196,62.92,196,96Zm-68,92a20,20,0,1,0,20,20A20,20,0,0,0,128,188Z"></path>
    </svg>
  );
}

export function IconQuestion({ ...props }: React.ComponentProps<'svg'>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      viewBox="0 0 256 256"
      {...props}
    >
      <path d="M144,180a16,16,0,1,1-16-16A16,16,0,0,1,144,180Zm92-52A108,108,0,1,1,128,20,108.12,108.12,0,0,1,236,128Zm-24,0a84,84,0,1,0-84,84A84.09,84.09,0,0,0,212,128ZM128,64c-24.26,0-44,17.94-44,40v4a12,12,0,0,0,24,0v-4c0-8.82,9-16,20-16s20,7.18,20,16-9,16-20,16a12,12,0,0,0-12,12v8a12,12,0,0,0,23.73,2.56C158.31,137.88,172,122.37,172,104,172,81.94,152.26,64,128,64Z"></path>
    </svg>
  );
}

export function IconImage({ ...props }: React.ComponentProps<'svg'>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      viewBox="0 0 256 256"
      {...props}
    >
      <path d="M144,96a16,16,0,1,1,16,16A16,16,0,0,1,144,96Zm92-40V200a20,20,0,0,1-20,20H40a20,20,0,0,1-20-20V56A20,20,0,0,1,40,36H216A20,20,0,0,1,236,56ZM44,60v79.72l33.86-33.86a20,20,0,0,1,28.28,0L147.31,147l17.18-17.17a20,20,0,0,1,28.28,0L212,149.09V60Zm0,136H162.34L92,125.66l-48,48Zm168,0V183l-33.37-33.37L164.28,164l32,32Z"></path>
    </svg>
  );
}

export function IconArrowArcRight({ ...props }: React.ComponentProps<'svg'>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      viewBox="0 0 256 256"
      {...props}
    >
      <path d="M244,88v64a12,12,0,0,1-12,12H168a12,12,0,0,1,0-24h34.9l-15.48-15.37A84,84,0,0,0,44,184a12,12,0,0,1-24,0,108,108,0,0,1,184.37-76.37L220,123.16V88a12,12,0,0,1,24,0Z"></path>
    </svg>
  );
}

export function IconCaretRight({ ...props }: React.ComponentProps<'svg'>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      viewBox="0 0 256 256"
      {...props}
    >
      <path d="M184.49,136.49l-80,80a12,12,0,0,1-17-17L159,128,87.51,56.49a12,12,0,1,1,17-17l80,80A12,12,0,0,1,184.49,136.49Z"></path>
    </svg>
  );
}

export function IconEye({ ...props }: React.ComponentProps<'svg'>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      viewBox="0 0 256 256"
      {...props}
    >
      <path d="M251,123.13c-.37-.81-9.13-20.26-28.48-39.61C196.63,57.67,164,44,128,44S59.37,57.67,33.51,83.52C14.16,102.87,5.4,122.32,5,123.13a12.08,12.08,0,0,0,0,9.75c.37.82,9.13,20.26,28.49,39.61C59.37,198.34,92,212,128,212s68.63-13.66,94.48-39.51c19.36-19.35,28.12-38.79,28.49-39.61A12.08,12.08,0,0,0,251,123.13Zm-46.06,33C183.47,177.27,157.59,188,128,188s-55.47-10.73-76.91-31.88A130.36,130.36,0,0,1,29.52,128,130.45,130.45,0,0,1,51.09,99.89C72.54,78.73,98.41,68,128,68s55.46,10.73,76.91,31.89A130.36,130.36,0,0,1,226.48,128,130.45,130.45,0,0,1,204.91,156.12ZM128,84a44,44,0,1,0,44,44A44.05,44.05,0,0,0,128,84Zm0,64a20,20,0,1,1,20-20A20,20,0,0,1,128,148Z"></path>
    </svg>
  );
}

export function IconPencil({ ...props }: React.ComponentProps<'svg'>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      viewBox="0 0 256 256"
      {...props}
    >
      <path d="M230.14,70.54,185.46,25.85a20,20,0,0,0-28.29,0L33.86,149.17A19.85,19.85,0,0,0,28,163.31V208a20,20,0,0,0,20,20H92.69a19.86,19.86,0,0,0,14.14-5.86L230.14,98.82a20,20,0,0,0,0-28.28ZM91,204H52V165l84-84,39,39ZM192,103,153,64l18.34-18.34,39,39Z"></path>
    </svg>
  );
}

export function IconLight({ ...props }: React.ComponentProps<'svg'>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      viewBox="0 0 256 256"
      {...props}
    >
      <path d="M180,232a12,12,0,0,1-12,12H88a12,12,0,0,1,0-24h80A12,12,0,0,1,180,232Zm40-128a91.51,91.51,0,0,1-35.17,72.35A12.26,12.26,0,0,0,180,186v2a20,20,0,0,1-20,20H96a20,20,0,0,1-20-20v-2a12,12,0,0,0-4.7-9.51A91.57,91.57,0,0,1,36,104.52C35.73,54.69,76,13.2,125.79,12A92,92,0,0,1,220,104Zm-24,0a68,68,0,0,0-69.65-68C89.56,36.88,59.8,67.55,60,104.38a67.71,67.71,0,0,0,26.1,53.19A35.87,35.87,0,0,1,100,184h56.1A36.13,36.13,0,0,1,170,157.49,67.68,67.68,0,0,0,196,104Zm-20.07-5.32a48.5,48.5,0,0,0-31.91-40,12,12,0,0,0-8,22.62,24.31,24.31,0,0,1,16.09,20,12,12,0,0,0,23.86-2.64Z"></path>
    </svg>
  );
}

export function IconExternalLink({
  className,
  ...props
}: React.ComponentProps<'svg'>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      strokeWidth={1}
      viewBox="0 0 256 256"
      className={classNames('size-4', className)}
      {...props}
    >
      <path d="M228,104a12,12,0,0,1-24,0V69l-59.51,59.51a12,12,0,0,1-17-17L187,52H152a12,12,0,0,1,0-24h64a12,12,0,0,1,12,12Zm-44,24a12,12,0,0,0-12,12v64H52V84h64a12,12,0,0,0,0-24H48A20,20,0,0,0,28,80V208a20,20,0,0,0,20,20H176a20,20,0,0,0,20-20V140A12,12,0,0,0,184,128Z"></path>
    </svg>
  );
}

export function IconSparkle({
  className,
  ...props
}: React.ComponentProps<'svg'>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      strokeWidth={1}
      viewBox="0 0 256 256"
      className={classNames('size-4', className)}
      {...props}
    >
      <path d="M208,144a15.78,15.78,0,0,1-10.42,14.94L146,178l-19,51.62a15.92,15.92,0,0,1-29.88,0L78,178l-51.62-19a15.92,15.92,0,0,1,0-29.88L78,110l19-51.62a15.92,15.92,0,0,1,29.88,0L146,110l51.62,19A15.78,15.78,0,0,1,208,144ZM152,48h16V64a8,8,0,0,0,16,0V48h16a8,8,0,0,0,0-16H184V16a8,8,0,0,0-16,0V32H152a8,8,0,0,0,0,16Zm88,32h-8V72a8,8,0,0,0-16,0v8h-8a8,8,0,0,0,0,16h8v8a8,8,0,0,0,16,0V96h8a8,8,0,0,0,0-16Z"></path>
    </svg>
  );
}

export function IconWarningOctagon({ ...props }: React.ComponentProps<'svg'>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      strokeWidth={1}
      viewBox="0 0 256 256"
      {...props}
    >
      <path d="M227.31,80.23,175.77,28.69A16.13,16.13,0,0,0,164.45,24H91.55a16.13,16.13,0,0,0-11.32,4.69L28.69,80.23A16.13,16.13,0,0,0,24,91.55v72.9a16.13,16.13,0,0,0,4.69,11.32l51.54,51.54A16.13,16.13,0,0,0,91.55,232h72.9a16.13,16.13,0,0,0,11.32-4.69l51.54-51.54A16.13,16.13,0,0,0,232,164.45V91.55A16.13,16.13,0,0,0,227.31,80.23ZM120,80a8,8,0,0,1,16,0v56a8,8,0,0,1-16,0Zm8,104a12,12,0,1,1,12-12A12,12,0,0,1,128,184Z"></path>
    </svg>
  );
}

export function IconSeparator({
  className,
  ...props
}: React.ComponentProps<'svg'>) {
  return (
    <svg
      fill="none"
      shapeRendering="geometricPrecision"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1"
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={classNames('size-4', className)}
      {...props}
    >
      <path d="M16.88 3.549L7.12 20.451"></path>
    </svg>
  );
}

export function IconSpinner({
  className,
  ...props
}: React.ComponentProps<'svg'>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 256 256"
      fill="currentColor"
      className={classNames('size-4 animate-spin', className)}
      {...props}
    >
      <path d="M232 128a104 104 0 0 1-208 0c0-41 23.81-78.36 60.66-95.27a8 8 0 0 1 6.68 14.54C60.15 61.59 40 93.27 40 128a88 88 0 0 0 176 0c0-34.73-20.15-66.41-51.34-80.73a8 8 0 0 1 6.68-14.54C208.19 49.64 232 87 232 128Z" />
    </svg>
  );
}

export function IconFramework({ ...props }: React.ComponentProps<'svg'>) {
  const center = 16;
  const strokeWidth = 3.5;
  const r = 16 - strokeWidth;
  const c = 2 * r * Math.PI;
  const percentage = 75;

  return (
    <svg
      aria-hidden
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="transparent"
      strokeWidth={strokeWidth}
    >
      <circle
        role="presentation"
        cx={center}
        cy={center}
        r={r}
        strokeDasharray={`${c} ${c}`}
        className="stroke-neutral-300/50"
      />
      <circle
        role="presentation"
        cx={center}
        cy={center}
        r={r}
        strokeDasharray={`${c} ${c}`}
        strokeDashoffset={c - ((percentage || 0) / 100) * c}
        strokeLinecap="round"
        transform="rotate(-90 16 16)"
        className="stroke-white"
      />
    </svg>
  );
}
