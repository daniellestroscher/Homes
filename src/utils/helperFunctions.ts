type map = {
  [mm:string]: string;
  dd: string;
  yy: string;
  yyyy: string;
}
export function formatDate(date: Date, format: string) {
  const map = {
      mm: (date.getMonth() + 1).toString(),
      dd: date.getDate().toString(),
      yy: date.getFullYear().toString().slice(-2),
      yyyy: date.getFullYear().toString()
  } as map

  return format.replace(/mm|dd|yyyy|yy/gi, matched => map[matched])
} //TODO FIX: output is 2323 not 2023