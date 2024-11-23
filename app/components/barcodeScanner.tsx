'use client';

import React, { useRef, useState } from 'react';
import Scanner from './Scanner';

const BarcodeScanner: React.FC = () => {
  const [scanning, setScanning] = useState(false);
  const [results, setResults] = useState<Array<{ codeResult: { code: string } }>>([]);
  const recentlyScanned = useRef<Set<String>>((new Set));


  const toggleScanning = () => {
    if (!scanning) {
      recentlyScanned.current.clear(); 
    }
    setScanning((prev) => !prev);
  };
  

  const handleDetected = (result: { codeResult: { code: string } }) => {
    const newCode = result.codeResult.code;
  
    if (!recentlyScanned.current.has(newCode)) {      
      setResults((prevResults) => [...prevResults, result]);
      recentlyScanned.current.add(newCode);
  
      setTimeout(() => {
        recentlyScanned.current.delete(newCode);
      }, 2000);
    }
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
        {scanning ? 'Checkout' : 'Start'}
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

