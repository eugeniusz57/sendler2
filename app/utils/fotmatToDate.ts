export default function formatToDate(dateString: string): Date {
  const [datePart, timePart] = dateString.split(' ');
  const [day, month, year] = datePart.split('.');
  const [hours, minutes, seconds] = timePart.split(':');

  const dateObject = new Date(Number(year), Number(month) - 1, Number(day), Number(hours), Number(minutes), Number(seconds));

  return dateObject;
}