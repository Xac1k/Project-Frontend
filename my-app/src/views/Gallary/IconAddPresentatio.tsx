type AddPresetationProps = {
  onClick?: () => void;
};

function AddPresetation({ onClick }: AddPresetationProps) {
  return (
    <svg onClick={onClick} width="356" height="212" viewBox="0 0 356 212" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="0.5" y="0.5" width="354.937" height="211" rx="24.5" fill="white" stroke="black" />
      <path d="M178 81V131" stroke="black" strokeWidth="10" strokeLinecap="round" />
      <path d="M153 106H203" stroke="black" strokeWidth="10" strokeLinecap="round" />
    </svg>
  );
}

export { AddPresetation };
