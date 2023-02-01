/** @jsxImportSource theme-ui */
import { IUnit } from "../../../types/interfaces";
import React, { useMemo, useState } from "react";
import "react-data-grid/lib/styles.css";
import DataGrid from "react-data-grid";
import { exportToPdf, exportToXlsx } from "../../utils/exportUtils";

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
};
export default function RentRoll({ unitArr }: Props) {
  console.log(unitArr);

  function rowKeyGetter(row: Row) {
    return row.unit;
  }

  function getColumns() {
    return [
      {
        key: "unit",
        name: "Unit",
        width: 60,
        frozen: true,
        resizable: false,
      },
      {
        key: "tenant",
        name: "Tenant",
        summaryFormatter() {
          return <strong>Total</strong>;
        },
      },
      {
        key: "jan",
        name: "January",
        summaryFormatter({ row }: any) {
          return <>{row.totalCount} records</>;
        },
      },
      { key: "feb", name: "February" },
      { key: "march", name: "March" },
      { key: "april", name: "April" },
      { key: "may", name: "May" },
      { key: "june", name: "June" },
      { key: "july", name: "July" },
      { key: "aug", name: "August" },
      { key: "sept", name: "Sept" },
      { key: "oct", name: "October" },
      { key: "nov", name: "November" },
      { key: "dec", name: "December" },

    ]
  }
  // const columns = [
  //   {
  //     key: "unit",
  //     name: "Unit",
  //   },
  //   {
  //     key: "tenant",
  //     name: "Tenant",
  //   },
  //   {
  //     key: "jan",
  //     name: "January",
  //   },
  //   { key: "feb", name: "February" },
  //   { key: "march", name: "March" },
  //   { key: "april", name: "April" },
  //   { key: "may", name: "May" },
  //   { key: "june", name: "June" },
  //   { key: "july", name: "July" },
  //   { key: "aug", name: "August" },
  //   { key: "sept", name: "Sept" },
  //   { key: "oct", name: "October" },
  //   { key: "nov", name: "November" },
  //   { key: "dec", name: "December" },
  // ];

  function createRows(): readonly Row[] {
    const rows: Row[] = [];
    unitArr.forEach((unit) => {
      if (unit.tenancies && unit.tenancies[0] && unit.tenancies[0].tenants) {
        let tenant = `${unit.tenancies[0].tenants[0].lastName} ${unit.tenancies[0].tenants[0].firstName}`;
        rows.push({
          unit: unit.number as number,
          tenant: tenant,
          jan: 44,
          feb: 55,
          march: 3,
          april: 4,
          may: 5,
          june: 6,
          july: 7,
          aug: 8,
          sept: 9,
          oct: 1,
          nov: 2,
          dec: 33,
        });
      }
    });
    return rows;
  }
  const [currentRows, setCurrentRows] = useState(createRows());
  const columns = useMemo(() => getColumns(), []);

  const gridElement = (
    <DataGrid
      columns={columns}
      rows={currentRows}
      onRowsChange={setCurrentRows}
      rowKeyGetter={rowKeyGetter}
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
    >
      {exporting ? "Exporting" : children}
    </button>
  );
}
