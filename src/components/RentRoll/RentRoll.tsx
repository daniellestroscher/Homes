/** @jsxImportSource theme-ui */
import { IUnit } from "../../../types/interfaces";
import React, { useState } from "react";
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
  aug: number;
  sept: number
  oct: number;
  nov: number;
  dec: number;
}

export default function RentRoll() {
  function rowKeyGetter(row: Row) {
    return row.unit;
  }
  const columns = [
    { key: "unit", name: "Unit" },
    { key: "tenant", name: "Tenant" },
    { key: "jan", name: "January" },
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
  ];
  const initialRows = [
    {
      unit: 100,
      tenant: "Example",
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
    },

  ];
  const [rows, setRows] = useState(initialRows);

  const gridElement = (
    <DataGrid columns={columns} rows={rows} onRowsChange={setRows} rowKeyGetter={rowKeyGetter} />
  );

  return (
    <div sx={{ position: "fixed" }}>
      {gridElement}
      <ExportButton onExport={() => exportToXlsx(gridElement, 'RentRoll.xlsx')}>
          Export to XSLX
      </ExportButton>
      <ExportButton onExport={() => exportToPdf(gridElement, 'RentRoll.pdf')}>
        Export to PDF
      </ExportButton>
    </div>
  );
}

function ExportButton({
  onExport,
  children
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
      {exporting ? 'Exporting' : children}
    </button>
  );
}
