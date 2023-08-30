/** @jsxImportSource theme-ui */

import { CloudinaryImage } from "@cloudinary/url-gen";
import { scale } from "@cloudinary/url-gen/actions/resize";
import { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
//@ts-ignore
import pdfjsWorker from "react-pdf/node_modules/pdfjs-dist/build/pdf.worker.entry";
pdfjs.GlobalWorkerOptions.workerSrc = pdfjsWorker;

type Props = {
  documents: string[];
};
export default function DocumentViewer({ documents }: Props) {
  const [numPages, setNumPages] = useState<number | null>(null);
  const [pageNumber, setPageNumber] = useState(1);

  function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
    setNumPages(numPages);
  }

  return (
    <>
      <section
        sx={{height: '300px', width: "90%", padding: "20px 30px",}}
      >

        {documents.map((doc, i) => {
          let PDF = new CloudinaryImage(doc as unknown as string).resize(
            scale().width(100)
          );
          console.log(PDF);
          return (
            <div key={i}>
              <object data={doc}></object>
              <Document
                file={{ url: doc }}
                onLoadSuccess={onDocumentLoadSuccess}
                onLoadError={(error: ErrorEvent) => console.log("Inside Error", error)}
                noData={"no PDF's for this tenancy"}
              >
                <Page pageNumber={pageNumber} width={300} />
              </Document>
            </div>
          );
        })}
      </section>
    </>
  );
}
