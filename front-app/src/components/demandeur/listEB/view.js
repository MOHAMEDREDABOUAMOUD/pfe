import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { Link } from 'react-router-dom';
import { Document, Page } from 'react-pdf';

function View() {
  return (
    <>
      <div style={{ width: '100%', height: '650px' }}>
        <Document file="./TP_CoucheOSI-Wireshark.pdf">
          <Page pageNumber={10} width={window.innerWidth} />
        </Document>
      </div>
    </>
  );
}

export default View;
