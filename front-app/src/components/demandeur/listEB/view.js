import React, { useState } from 'react';
import { Document, Page } from 'react-pdf';

const View = () => {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(10); // Set initial page number to 10

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  return (
    <div>
      <Document
        file="path dyalk ykopn f public"
        onLoadSuccess={onDocumentLoadSuccess}
      >
        {numPages && <Page pageNumber={pageNumber} />} {}
      </Document>
      {numPages && ( 
        <p>
          Page {pageNumber} of {numPages}
        </p>
      )}
      <button onClick={() => setPageNumber(pageNumber - 1)} disabled={pageNumber <= 1}>
        Previous
      </button>
      <button onClick={() => setPageNumber(pageNumber + 1)} disabled={pageNumber >= numPages}>
        Next
      </button>
    </div>
  );
};

export default View;
