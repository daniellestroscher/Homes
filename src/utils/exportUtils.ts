import { ReactElement, cloneElement } from 'react';
import { DataGridProps } from 'react-data-grid';

export async function exportToXlsx<R, SR>(
  gridElement: ReactElement<DataGridProps<R, SR>>,
  fileName: string
) {
  const [{ utils, writeFile }, { head, body, foot }] = await Promise.all([
    import('xlsx'),
    getGridContent(gridElement)
  ]);
  const wb = utils.book_new();
  const ws = utils.aoa_to_sheet([...head, ...body, ...foot]);
  utils.book_append_sheet(wb, ws, 'Sheet 1');
  writeFile(wb, fileName);
}

export async function exportToPdf<R, SR>(
  gridElement: ReactElement<DataGridProps<R, SR>>,
  fileName: string
) {
const [{ jsPDF }, autoTable, { head, body, foot }] = await Promise.all([
  import('jspdf'),
  (await import('jspdf-autotable')).default,
  await getGridContent(gridElement)
  ]);
  const doc = new jsPDF({
    orientation: 'l',
    unit: 'px'
  });
  autoTable(doc, {
    head,
    body,
    foot,
    horizontalPageBreak: true,
    styles: { cellPadding: 1.5, fontSize: 8, cellWidth: 'wrap' },
    tableWidth: 'wrap'
  });
  doc.save(fileName);
}

async function getGridContent<R, SR>(gridElement: ReactElement<DataGridProps<R, SR>>) {
  const { renderToStaticMarkup } = await import('react-dom/server');
  const grid = document.createElement('div');
  grid.innerHTML = renderToStaticMarkup(
  cloneElement(gridElement, {
    enableVirtualization: false
  })
);

return {
  head: getRows('.rdg-header-row'),
  body: getRows('.rdg-row:not(.rdg-summary-row)'),
  foot: getRows('.rdg-summary-row')
};

function getRows(selector: string) {
  return Array.from(grid.querySelectorAll<HTMLDivElement>(selector)).map((gridRow) => {
    return Array.from(gridRow.querySelectorAll<HTMLDivElement>('.rdg-cell')).map(
      (gridCell) => gridCell.innerText
    );
  });
}
}