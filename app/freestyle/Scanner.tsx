import React, { useEffect } from "react";
import Quagga from "quagga";

interface ScannerProps {
  onDetected: (result: { codeResult: { code: string } }) => void;
}

const Scanner: React.FC<ScannerProps> = ({ onDetected }) => {
  useEffect(() => {
    Quagga.init(
      {
        inputStream: {
          type: "LiveStream",
          constraints: {
            facingMode: "environment",
          },
          target: document.querySelector("#scanner-container"),
        },
        decoder: {
          readers: ["code_128_reader", "ean_reader", "upc_reader"], 
        },
      },
      (err: any) => {
        if (err) {
          console.error("Quagga initialization failed:", err);
          return;
        }
        Quagga.start();
      }
    );

    Quagga.onDetected((data: { codeResult: any; }) => {
        if (data && data.codeResult && data.codeResult.code) {
            onDetected(data); 
            Quagga.stop(); 
        }
    });

    return () => {
      Quagga.stop();
    };
  }, [onDetected]);

  return <div id="scanner-container" style={{ width: "100%", height: "300px", border: "1px solid black" }} />;
};

export default Scanner;
