export const getDate = (): string => {
  const date = new Date();

  const formatter = new Intl.DateTimeFormat('en-GB', {
    timeZone: 'Asia/Bangkok',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true
  });

  const parts = formatter.formatToParts(date);

  const [year, month, day, hour, minute, second, ampm] = parts
    .filter(({ type }) => type !== 'literal')
    .map(({ value }) => value);

  const formattedDate = `${year}/${month}/${day} ${hour}:${minute}:${second} ${ampm}`;

  return formattedDate;
}
