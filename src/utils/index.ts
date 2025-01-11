/**
 * Format a given date-time string into a human-readable
 * date and time, both in Indonesian locale.
 *
 * @param dateTimeString - The date-time string to be formatted.
 *                         It should be in ISO 8601 format.
 * @returns An object containing two properties: `date` and `time`.
 *          `date` is the formatted date string (e.g. "5 Januari 2022"),
 *          and `time` is the formatted time string (e.g. "14:30").
 */
export const formatIndonesianDateTime = (dateTimeString: string): { date: string; time: string } => {
    const options: Intl.DateTimeFormatOptions = {
        year: "numeric",
        month: "long",
        day: "numeric",
    };

    const timeOptions: Intl.DateTimeFormatOptions = {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
    };

    const dateTime = new Date(dateTimeString);
    const datePart = new Intl.DateTimeFormat("id-ID", options).format(dateTime);
    const timePart = new Intl.DateTimeFormat("id-ID", timeOptions).format(dateTime);

    return { date: datePart, time: timePart };
};
