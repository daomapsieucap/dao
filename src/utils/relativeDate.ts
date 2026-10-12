/* Returns whole days between a date and today (UTC), plus a short relative label for it. */
export function relativeDate(date: Date, today: Date = new Date()) {
    const day = 86400000;
    const startOf = (d: Date) => Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate());
    const days = Math.max(0, Math.round((startOf(today) - startOf(date)) / day));
    let label: string;
    if (days === 0) label = "today";
    else if (days === 1) label = "yesterday";
    else if (days < 31) label = `${days} days ago`;
    else {
        const months = Math.floor(days / 30.4375);
        label = `${months} ${months === 1 ? "month" : "months"} ago`;
    }
    return { days, label };
}
