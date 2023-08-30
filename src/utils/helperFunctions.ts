import { ITenancy, IUnit } from "../../types/interfaces";
import { changeTenancyStatus } from "../services/tenancyService";

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

export function formatRentEffectiveDate(date: Date) {
  date.setMonth(date.getMonth() + 4);
  date.setDate(1);
  return date;
}

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
    if (unit.tenancies && unit.tenancies[0] && unit.tenancies[0].tenants) {
      unitTenantOne = `${unit.tenancies[0].tenants[0].firstName} ${unit.tenancies[0].tenants[0].lastName}`;
    }
    if (
      unit.tenancies &&
      unit.tenancies[0] &&
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
      unit.tenancies[0].tenancyVersions &&
      unit.tenancies[0].tenancyVersions[0] &&
      unit.tenancies[0].tenancyVersions[0].increaseDate
    ) {
      let month = Number(
        unit.tenancies[0].tenancyVersions[0].increaseDate.slice(5, 7)
      );
      let year = Number(
        unit.tenancies[0].tenancyVersions[0].increaseDate.slice(0, 4)
      );

      if (month === now.getMonth() + 4 && year === now.getFullYear()) {
        return unit;
      }
    }
  });

  return unitsToSendIncreases;
};

// export const addTenanciesToUnitArr = (
//   unitList: IUnit[],
//   tenancyArr: ITenancy[]
// ) => {
//   unitList.forEach((unit) => {
//     unit.tenancies = [];
//     // let activeTenancy = tenancyArr.find((one) => {
//     //   return (
//     //     one.unitId === unit.unitId &&
//     //     new Date(one.establishedDate).getTime() <= new Date().getTime() &&
//     //     one.activeStatus == true
//     //   );
//     // });
//     let establishedTenancies = tenancyArr
//       .map((tenancy) => {
//         if (
//           new Date(tenancy.establishedDate).getTime() <= new Date().getTime() &&
//           unit.id === tenancy.unitId
//         ) {
//           return tenancy;
//         }
//       })
//       .filter((x) => x);

//     if (establishedTenancies.length) {
//       let current = establishedTenancies.reduce((prev, curr) => {
//         return new Date(prev?.establishedDate as string).getTime() >
//           new Date(curr?.establishedDate as string).getTime()
//           ? prev
//           : curr;
//       });
//       if (current) unit.tenancies.push(current);
//     }

//     let nextTenancy = tenancyArr.find((one) => {
//       return (
//         one.unitId === unit.id &&
//         new Date(one.establishedDate).getTime() > new Date().getTime() &&
//         one.activeStatus === false
//       );
//     });
//     // if (activeTenancy) {
//     //   unit.tenancies.push(activeTenancy);
//     // } else
//     if (nextTenancy) {
//       unit.tenancies?.push(nextTenancy);
//     }
//   });
//   return unitList;
// };

export const getEstablishedTenancies = (tenancyArr: ITenancy[]) => {
  let establishedTenancies = tenancyArr
    .map((tenancy) => {
      if (new Date(tenancy.establishedDate).getTime() <= new Date().getTime()) {
        return tenancy;
      }
    })
    .filter((x) => x);
  return establishedTenancies;
};

export const getCurrentTenancy = (establishedTenancies: ITenancy[]) => {
  let currentTenancy: ITenancy | undefined;
  if (establishedTenancies.length) {
    currentTenancy = establishedTenancies.reduce((prev, curr) => {
      return new Date(prev?.establishedDate as string).getTime() >
        new Date(curr?.establishedDate as string).getTime()
        ? prev
        : curr;
    });
  } else {
    currentTenancy = undefined;
  }
  return currentTenancy;
};

export const getFutureTenancy = (tenancyArr: ITenancy[]) => {
  let futureTenancyAvailable = tenancyArr.find((tenancy) => {
    return (
      tenancy.establishedDate > formatDate(new Date(), "yyyy-mm-dd") &&
      tenancy.activeStatus === false
    );
  });
  return futureTenancyAvailable;
};

export async function changeStatus(currentTenancy: ITenancy, unit: IUnit) {
  if (
    currentTenancy?.previousTenancy !== null &&
    currentTenancy?.activeStatus === false
  ) {
    let prevTenancyId = currentTenancy?.previousTenancy;
    let currTenancyId = currentTenancy?.id;
    const statusOne = await changeTenancyStatus(
      unit.id as string,
      prevTenancyId,
      false
    );
    const statusTwo = await changeTenancyStatus(
      unit.id as string,
      currTenancyId,
      true
    );
    console.log(statusOne, statusTwo);
  } else if (
    currentTenancy?.previousTenancy === null &&
    currentTenancy?.activeStatus === false
  ) {
    let tenancyId = currentTenancy.id;
    const status = await changeTenancyStatus(
      unit.id as string,
      tenancyId,
      true
    );
    console.log(status, "THE STATUS");
  }
}
