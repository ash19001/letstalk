const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

/** A page torn off a wall calendar: the month on an orange strip, the day large, the year small. */
export function DateBlock({ iso, className = "" }: { iso: string; className?: string }) {
  const [y, m, d] = iso.split("-").map(Number);
  return (
    <span className={`date-block ${className}`} aria-hidden="true">
      <span className="date-block-month">{MONTHS[(m || 1) - 1]}</span>
      <b>{d}</b>
      <span className="date-block-year">{y}</span>
    </span>
  );
}
