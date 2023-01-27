type map = {
  [mm: string]: string;
  dd: string;
  yy: string;
  yyyy: string;
};
export function formatDate(date: Date, format: string) {
  const map = {
    mm: (date.getMonth() + 1).toString(),
    dd: date.getDate().toString(),
    yy: date.getFullYear().toString().slice(-2),
    yyyy: date.getFullYear().toString(),
  } as map;
  let dateFormatted = format.replace(/mm|dd|yyyy|yy/gi, (matched) => map[matched]);
  dateFormatted = dateFormatted.split("-").map((dateFrag) => {
    if (dateFrag.length < 2) {
      return (dateFrag = "0" + dateFrag);
    } else {
      return dateFrag
    }
  }).join('-');
  return dateFormatted;
}
