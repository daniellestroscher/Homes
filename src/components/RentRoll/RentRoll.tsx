/** @jsxImportSource theme-ui */
import { ITenancy, ITenancyVersions, IUnit } from "../../../types/interfaces";
import React, { useMemo, useState } from "react";
import "react-data-grid/lib/styles.css";
import DataGrid, { FormatterProps } from "react-data-grid";
import { exportToPdf, exportToXlsx } from "../../utils/exportUtils";
import { findRent, rentsType } from "../../utils/helperFunctions";

interface Row {
  unit: string;
  tenant: string;
  jan: number;
  feb: number;
  march: number;
  april: number;
  may: number;
  june: number;
  july: number;
  aug: number;
  sept: number;
  oct: number;
  nov: number;
  dec: number;
}
type Props = {
  unitArr: IUnit[];
  allVersions: ITenancyVersions[];
  colorMode: string;
};
export default function RentRoll({ unitArr, allVersions, colorMode }: Props) {
  function rowKeyGetter(row: Row) {
    return row.unit;
  }
  console.log(unitArr, 'units',)

  function getColumns() {
    return [
      {
        key: "unit",
        name: "Unit",
        width: 40,
        resizable: false,
      },
      {
        key: "tenant",
        name: "Tenant",
        width: 60,
        summaryFormatter() {
          return <strong>Total</strong>;
        },
      },
      {
        key: "jan",
        name: "January",
        summaryFormatter({ row }: any) {
          return <>${row.jan}</>;
        },
      },
      {
        key: "feb",
        name: "February",
        summaryFormatter({ row }: any) {
          return <>${row.feb}</>;
        },
      },
      {
        key: "march",
        name: "March",
        summaryFormatter({ row }: any) {
          return <>${row.march}</>;
        },
      },
      {
        key: "april",
        name: "April",
        summaryFormatter({ row }: any) {
          return <>${row.april}</>;
        },
      },
      {
        key: "may",
        name: "May",
        summaryFormatter({ row }: any) {
          return <>${row.may}</>;
        },
      },
      {
        key: "june",
        name: "June",
        summaryFormatter({ row }: any) {
          return <>${row.june}</>;
        },
      },
      {
        key: "july",
        name: "July",
        summaryFormatter({ row }: any) {
          return <>${row.july}</>;
        },
      },
      {
        key: "aug",
        name: "August",
        summaryFormatter({ row }: any) {
          return <>${row.aug}</>;
        },
      },
      {
        key: "sept",
        name: "September",
        summaryFormatter({ row }: any) {
          return <>${row.sept}</>;
        },
      },
      {
        key: "oct",
        name: "October",
        summaryFormatter({ row }: any) {
          return <>${row.oct}</>;
        },
      },
      {
        key: "nov",
        name: "November",
        summaryFormatter({ row }: any) {
          return <>${row.nov}</>;
        },
      },
      {
        key: "dec",
        name: "December",
        summaryFormatter({ row }: any) {
          return <>${row.dec}</>;
        },
      },
    ];
  }

  function createRows(): readonly Row[] {
    const rows: Row[] = [];
    unitArr.forEach((unit) => {
      if (unit.tenancies && unit.tenancies[0] && unit.tenancies[0].tenants) {
        let unitNumber = `${unit.number}`
        let currentTenancy = unit.tenancies.find((one)=> one.activeStatus === true);
        let tenant = `${currentTenancy && currentTenancy.tenants && currentTenancy.tenants[0].lastName}`;
        let rents: rentsType[] = [];
        unit.tenancies.forEach((tenancy) => {
          //find versions
          let tenancyRents = allVersions.filter(
            (version) => tenancy.tenancyId === version.tenancyId
          );
          tenancyRents?.forEach((rent) => {
            rents.push({
              rent: rent.rent as number,
              recordEffectiveDate: rent.recordEffectiveDate as string,
            });
          });
        });
        rows.push({
          unit: unitNumber,
          tenant: tenant ? tenant : 'TBD',
          jan: findRent(1, 31, rents as rentsType[]) as number,
          feb: findRent(2, 28, rents as rentsType[]) as number,
          march: findRent(3, 31, rents as rentsType[]) as number,
          april: findRent(4, 30, rents as rentsType[]) as number,
          may: findRent(5, 31, rents as rentsType[]) as number,
          june: findRent(6, 30, rents as rentsType[]) as number,
          july: findRent(7, 31, rents as rentsType[]) as number,
          aug: findRent(8, 31, rents as rentsType[]) as number,
          sept: findRent(9, 30, rents as rentsType[]) as number,
          oct: findRent(10, 31, rents as rentsType[]) as number,
          nov: findRent(11, 30, rents as rentsType[]) as number,
          dec: findRent(12, 31, rents as rentsType[]) as number,
        });
      }
    });
    return rows;
  }
  const [currentRows, setCurrentRows] = useState(createRows());
  const columns = useMemo(() => getColumns(), []);

  const summaryRows = useMemo(() => {
    let january = 0;
    let february = 0;
    let march = 0;
    let april = 0;
    let may = 0;
    let june = 0;
    let july = 0;
    let august = 0;
    let september = 0;
    let october = 0;
    let november = 0;
    let december = 0;
    currentRows.forEach((row) => {
      january += Number(row.jan.toString().slice(1));
      february += Number(row.feb.toString().slice(1));
      march += Number(row.march.toString().slice(1));
      april += Number(row.april.toString().slice(1));
      may += Number(row.may.toString().slice(1));
      june += Number(row.june.toString().slice(1));
      july += Number(row.july.toString().slice(1));
      august += Number(row.aug.toString().slice(1));
      september += Number(row.sept.toString().slice(1));
      october += Number(row.oct.toString().slice(1));
      november += Number(row.nov.toString().slice(1));
      december += Number(row.dec.toString().slice(1));
    });
    const summaryRow: any = {
      jan: january.toFixed(2),
      feb: february.toFixed(2),
      march: march.toFixed(2),
      april: april.toFixed(2),
      may: may.toFixed(2),
      june: june.toFixed(2),
      july: july.toFixed(2),
      aug: august.toFixed(2),
      sept: september.toFixed(2),
      oct: october.toFixed(2),
      nov: november.toFixed(2),
      dec: december.toFixed(2),
    };
    return [summaryRow];
  }, [currentRows]);

  const gridElement = (

    <DataGrid
      columns={columns}
      rows={currentRows}
      onRowsChange={setCurrentRows}
      rowKeyGetter={rowKeyGetter}

      defaultColumnOptions={{
        sortable: true,
        resizable: true,
      }}
      bottomSummaryRows={summaryRows}
      className={colorMode === 'default' ? 'rdg-light fill-grid' : 'rdg-dark fill-grid'}
      style={{ resize: 'both', height: '80vh', width: '85vw' }}
    />

  );

  return (
    <div sx={{position:'fixed'}}>
      {gridElement}
      <ExportButton onExport={() => exportToXlsx(gridElement, "RentRoll.xlsx")}>
        Export to XSLX
      </ExportButton>
      <ExportButton onExport={() => exportToPdf(gridElement, "RentRoll.pdf")}>
        Export to PDF
      </ExportButton>
    </div>
  );
}

function ExportButton({
  onExport,
  children,
}: {
  onExport: () => Promise<unknown>;
  children: React.ReactNode;
}) {
  const [exporting, setExporting] = useState(false);
  return (
    <button
      disabled={exporting}
      onClick={async () => {
        setExporting(true);
        await onExport();
        setExporting(false);
      }}
      sx={{ variant: "buttons.secondary" }}
    >
      {exporting ? "Exporting" : children}
    </button>
  );
}
