// import React, { useEffect, useRef } from "react";
// import Quagga from "quagga";

// interface ScannerProps {
//   onDetected: (result: { codeResult: { code: string } }) => void;
// }

// const Scanner: React.FC<ScannerProps> = ({ onDetected }) => {
//   const isProcessing = useRef<boolean>(false);

//   useEffect(() => {
//     // Initialize Quagga
//     Quagga.init(
//       {
//         inputStream: {
//           type: "LiveStream",
//           constraints: {
//             facingMode: "environment",
//           },
//           target: document.querySelector("#scanner-container"),
//         },
//         decoder: {
//           readers: ["code_128_reader", "ean_reader", "upc_reader"],
//         },
//       },
//       (err: any) => {
//         if (err) {
//           console.error("Quagga initialization failed:", err);
//           return;
//         }
//         Quagga.start();
//       }
//     );

//     Quagga.onDetected((data: { codeResult: { code: string } }) => {
//       if (isProcessing.current) return;

//       if (data && data.codeResult && data.codeResult.code) {
//         isProcessing.current = true;
//         onDetected(data);

//         setTimeout(() => {
//           isProcessing.current = false;
//         }, 1000);
//       }
//     });

//     return () => {
//       Quagga.stop();
//     };
//   }, [onDetected]);

//   return (
//     <div
//       id="scanner-container"
//       style={{ width: "100%", height: "300px", border: "1px solid black" }}
//     />
//   );
// };

// export default Scanner;

import React, { useEffect, useRef } from "react";
import Quagga from "quagga";

interface ScannerProps {
  onDetected: (result: { codeResult: { code: string } }) => void;
}

const Scanner: React.FC<ScannerProps> = ({ onDetected }) => {
  const isProcessing = useRef<boolean>(false);

  const playBeep = () => {
    const audio = new Audio('/sounds/beep.mp3');
    audio.play();
  }

  useEffect(() => {
    // Initialize Quagga
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

    Quagga.onDetected((data: { codeResult: { code: string } }) => {
      if (isProcessing.current) return;

      if (data && data.codeResult && data.codeResult.code) {
        isProcessing.current = true;
        onDetected(data);
        playBeep();

        setTimeout(() => {
          isProcessing.current = false;
        }, 1000);
      }
    });

    return () => {
      Quagga.stop();
    };
  }, [onDetected]);

  return (
    <div
      id="scanner-container"
      style={{ width: "100%", height: "300px", border: "1px solid black" }}
    />
  );
};

export default Scanner;