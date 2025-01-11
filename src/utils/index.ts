// src/utils/formatters.ts
export const formatIndonesianDateTime = (dateTimeString: string): { date: string; time: string } => {
    const options: Intl.DateTimeFormatOptions = {
        year: "numeric",
        month: "long",
        day: "numeric",
    };

    const timeOptions: Intl.DateTimeFormatOptions = {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false, // Use 24-hour format
    };

    const dateTime = new Date(dateTimeString);
    const datePart = new Intl.DateTimeFormat("id-ID", options).format(dateTime);
    const timePart = new Intl.DateTimeFormat("id-ID", timeOptions).format(dateTime);

    return { date: datePart, time: timePart };
};
