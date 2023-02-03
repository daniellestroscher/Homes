import { IUnit } from "../../types/interfaces";

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

export const filterUnits = (unitList: IUnit[], query: string) => {
  if (!query) {
    return unitList;
  }

  return unitList.filter((unit) => {
    const unitNumber = unit.number?.toString();
    let unitTenantOne;
    let unitTenantTwo;
    if (unit.tenancies && unit.tenancies[0].tenants) {
      unitTenantOne = `${unit.tenancies[0].tenants[0].firstName} ${unit.tenancies[0].tenants[0].lastName}`;
    }
    if (
      unit.tenancies &&
      unit.tenancies[0].tenants &&
      unit.tenancies[0].tenants[1]
    ) {
      unitTenantTwo = `${unit.tenancies[0].tenants[1].firstName} ${unit.tenancies[0].tenants[1].lastName}`;
    }

    return (
      unitNumber?.includes(query) ||
      unitTenantOne?.includes(query) ||
      unitTenantTwo?.includes(query)
    );
  });
};

export const increasesToSend = (unitList: IUnit[]) => {
  //tenants get 3 month notice.
  let now = new Date(Date.now());

  let unitsToSendIncreases = unitList.filter((unit) => {
    if (
      unit.tenancies &&
      unit.tenancies[0] &&
      unit.tenancies[0].tenancy_versions &&
      unit.tenancies[0].tenancy_versions[0].increaseDate
    ) {
      let month = Number(unit.tenancies[0].tenancy_versions[0].increaseDate.slice(5, 7));
      if (month === (now.getMonth() + 1)) {
        //change to plus 4 for 3 month notice
        return unit;
      }
    }
  });
  return unitsToSendIncreases;
};
