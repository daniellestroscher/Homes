/** @jsxImportSource theme-ui */
import { ITenancyVersions, IUnit } from "../../../types/interfaces";
import React, { useMemo, useState } from "react";
import "react-data-grid/lib/styles.css";
import DataGrid from "react-data-grid";
import { exportToPdf, exportToXlsx } from "../../utils/exportUtils";
import { findRent, rentsType } from "../../utils/helperFunctions";
import { css } from 'linaria';

// const toolbarClassname = css`
//   display: flex;
//   justify-content: flex-end;
//   gap: 8px;
//   margin-block-end: 8px;
// `;

// const dialogContainerClassname = css`
//   position: absolute;
//   inset: 0;
//   display: flex;
//   place-items: center;
//   background: rgba(0, 0, 0, 0.1);
// `;

interface Row {
  unit: number;
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
        name: "Sept",
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
        let tenant = `${unit.tenancies[0].tenants[0].lastName}`;
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
          unit: unit.number as number,
          tenant: tenant,
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
      // id: "total_0",
      jan: january,
      feb: february,
      march: march,
      april: april,
      may: may,
      june: june,
      july: july,
      aug: august,
      sept: september,
      oct: october,
      nov: november,
      dec: december,
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
      className={colorMode === 'default' ? 'rdg-light' : 'rdg-dark'}
    />

  );

  return (
    <div>
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
