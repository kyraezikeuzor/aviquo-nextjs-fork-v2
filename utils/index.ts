export const getCurrentDateTimeString = (): string => {
    const now: Date = new Date();
    const dateTimeString: string = now.toISOString().replace('T', ' ').slice(0, 19);

    return dateTimeString;
};
