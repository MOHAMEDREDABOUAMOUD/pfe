import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Document, Page } from 'react-pdf';
import { useParams } from 'react-router-dom';
import Sidebar from '../sidebar/sideBar';
import { Viewer } from 'react-doc-viewer';
import "./view.css";

const View = () => {
  const { id } = useParams();
  const [data, setData] = useState("");

  const getFile=async()=>{
    try {
      const response = await axios.post("/getFile", { id: id });
      //console.log(response.data);
      setData(response.data["base64"]);
      // const buffer = new Uint8Array(response.data["piece"].data);
      // const binaryString = buffer.reduce((str, byte) => str + String.fromCharCode(byte), '');
  
      // // Decode the binary data
      // const decodedData = atob(binaryString);
  
      // // Create a Uint8Array from the decoded data
      // const uint8Array = new Uint8Array(decodedData.length);
      // for (let i = 0; i < decodedData.length; i++) {
      //   uint8Array[i] = decodedData.charCodeAt(i);
      // }
  
      // // Create a Blob from the Uint8Array
      // const blob = new Blob([uint8Array], { type: 'application/octet-stream' });
      // const contentBlob = blob;
      // if (contentBlob) {
      //   const textContent = await contentBlob.text();
      //   console.log(textContent);
      //   //setData(contentBlob);
      //   setData(textContent);
      // }
    } catch (error) {
      console.error("Error fetching file content:", error);
      setData("");
    }
  }

  useEffect(() => {
    getFile();
  }, "");

  return (
    <div className='doc'>
      <Sidebar/>
      <pre>
        {data}
      </pre>
    </div>
  );
};

export default View;
