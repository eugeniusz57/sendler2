export default function formatTableDate(inputDate: Date): string {
  const date = new Date(inputDate);

  const day = String(date.getUTCDate()).padStart(2, '0'); 
  const month = String(date.getUTCMonth() + 1).padStart(2, '0'); 
  const year = date.getUTCFullYear(); 

  return `${day}.${month}.${year}`;

  // return new Intl.DateTimeFormat().format(date);
}