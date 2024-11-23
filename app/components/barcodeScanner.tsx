'use client';

import React, { useState } from 'react';
import Scanner from './Scanner';

interface BarcodeScannerProps {}

const BarcodeScanner: React.FC<BarcodeScannerProps> = () => {
  const [scanning, setScanning] = useState(false);
  const [results, setResults] = useState<Array<{ codeResult: { code: string } }>>([]);

  const toggleScanning = () => {
    setScanning((prev) => !prev);
  };

  const handleDetected = (result: { codeResult: { code: string } }) => {
    setResults((prevResults) => [...prevResults, result]);
  };

  return (
    <div>
      <h1>Barcode Scanner</h1>
      {/* Button to toggle scanning */}
      <button onClick={toggleScanning}>
        {scanning ? 'Stop' : 'Start'}
      </button>

      {/* Show Scanner while scanning is active */}
      {scanning && <Scanner onDetected={handleDetected} />}

      {/* Show results only when scanning stops */}
      {!scanning && (
        <div>
          <h2>Scanned Barcodes</h2>
          <ul>
            {results.map((result, index) => (
              <li key={`${result.codeResult.code}-${index}`}>
                Barcode {index + 1}: <strong>{result.codeResult.code}</strong>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default BarcodeScanner;
