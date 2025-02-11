export default function formatDateTime(input: string): string {
  const [date, time] = input.split(' ');
  const [day, month, year] = date.split('.');
  return `${year}-${month}-${day} ${time}`;
}