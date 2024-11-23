'use client';

import React, { useState } from 'react';
import Scanner from './Scanner';

const BarcodeScanner: React.FC = () => {
  const [scanning, setScanning] = useState(false);
  const [results, setResults] = useState<Array<{ codeResult: { code: string } }>>([]);
  // const [results, setResults] = useState([]);

  const toggleScanning = () => {
    setScanning((prev) => !prev);
  };

  const handleDetected = (result: { codeResult: { code: string } }) => {
    const newCode = result.codeResult.code;
    setResults((prevResults) => {
      const alreadyExists = prevResults.some(
        (r) => r.codeResult.code === newCode
      );
      if (!alreadyExists) {
        return [...prevResults, result];
      }
      return prevResults;
    });
  };

  return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      <h1>Barcode Scanner</h1>
      
      {/* Show Scanner while scanning is active */}
      {scanning && <Scanner onDetected={handleDetected} />}

      {/* Button to toggle scanning */}
      <button
        onClick={toggleScanning}
        className={`nes-btn ${scanning ? 'is-error' : 'is-success'}`}
        style={{ marginTop: '20px', padding: '10px 20px' }}
      >
        {scanning ? 'Stop' : 'Start'}
      </button>

      {/* Show results only when scanning stops */}
      {!scanning && (
        <div style={{ marginTop: '20px' }}>
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

