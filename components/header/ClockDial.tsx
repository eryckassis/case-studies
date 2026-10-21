export function ClockDial() {
  return (
    <span
      aria-hidden="true"
      className="absolute right-0 top-0 size-13 rounded-full border border-current
        before:absolute before:left-1/2 before:top-2.5
        before:size-2.25 before:-translate-x-1/2 before:-translate-y-1/2
        before:rounded-full before:border before:border-current
        before:content-['']
        desktop:before:size-1.75"
    />
  );
}
