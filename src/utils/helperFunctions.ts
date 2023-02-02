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
  let dateFormatted = format.replace(
    /mm|dd|yyyy|yy/gi,
    (matched) => map[matched]
  );
  dateFormatted = dateFormatted
    .split("-")
    .map((dateFrag) => {
      if (dateFrag.length < 2) {
        return (dateFrag = "0" + dateFrag);
      } else {
        return dateFrag;
      }
    })
    .join("-");
  return dateFormatted;
}

export type rentsType = {
  rent: number;
  recordEffectiveDate: string;
};

export function findRent(month: number, day: number, rents: rentsType[]) {
  if (rents.length) {
    if (month && day) {
      let rent;
      let dateEnd = new Date(
        new Date().getFullYear(),
        month - 1,
        day
      ).getTime();
      let dateStart = new Date(
        new Date().getFullYear(),
        month - 1,
        day - (day - 1)
      ).getTime();
      let allRentsForMonth = rents.filter(
        (obj) =>
          new Date(obj.recordEffectiveDate.replace(/-/g, " ")).getTime() <=
            dateEnd &&
          new Date(obj.recordEffectiveDate.replace(/-/g, " ")).getTime() >=
            dateStart
      );
      if (allRentsForMonth.length) {
        rent = allRentsForMonth[0].rent;
      } else {
        rent = [];
      }
      if (allRentsForMonth.length > 1) {
        allRentsForMonth.sort(
          (a, b) =>
            Number(
              a.recordEffectiveDate.slice(a.recordEffectiveDate.length - 2)
            ) -
            Number(
              b.recordEffectiveDate.slice(b.recordEffectiveDate.length - 2)
            )
        );
        let latestRent = allRentsForMonth.pop();
        rent = latestRent?.rent;
      }
      return rent;
    }
  }
}
