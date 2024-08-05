export const IconCheckbox = ({ checked }) => {
  return (
    <svg
      className="icon"
      viewBox="0 0 21 21"
      xmlns="http://www.w3.org/2000/svg"
    >
      {checked ? (
        <g
          fill="none"
          fillRule="evenodd"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          transform="translate(3 3)"
        >
          <path d="m2.5.5h10c1.1045695 0 2 .8954305 2 2v10c0 1.1045695-.8954305 2-2 2h-10c-1.1045695 0-2-.8954305-2-2v-10c0-1.1045695.8954305-2 2-2z" />
          <path d="m4.5 7.5 2 2 4-4" />
        </g>
      ) : (
        <path
          d="m2.5.5h10c1.1045695 0 2 .8954305 2 2v10c0 1.1045695-.8954305 2-2 2h-10c-1.1045695 0-2-.8954305-2-2v-10c0-1.1045695.8954305-2 2-2z"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          transform="translate(3 3)"
        />
      )}
    </svg>
  );
};
