'use client';

import React, { useRef, useState } from 'react';
import Scanner from './Scanner';
import FetchHp from './fetchHp';
import { useHealthPoints } from '../contexts/HealthPointsContext';
import Link from 'next/link';
import { redirect } from 'next/navigation';

interface BarcodeScannerProps {
  mode: 'freestyle' | 'cornfusion'
}

const BarcodeScanner: React.FC<BarcodeScannerProps> = ({ mode }) => {
  const [scanning, setScanning] = useState(false);
  const [results, setResults] = useState<Array<{ codeResult: { code: string } }>>([]);
  const recentlyScanned = useRef<Set<string>>(new Set());
  const { healthPoints, setHealthPoints } = useHealthPoints();
  const [currentProductID, setCurrentProductID] = useState<number | null>(null);
  const [linkWhere, setLink] = useState('');

  const handleFetchComplete = (result: number): void => {
    setHealthPoints(result); // Update healthPoints context
    setCurrentProductID(null); // Clear currentProductID after fetch
  };

  const toggleScanning = () => {
    if (!scanning) {
      recentlyScanned.current.clear();
    }
    if (mode == 'freestyle') setLink('./freestyle/anal')
    setScanning((prev) => !prev);
  };

  const handleDetected = (result: { codeResult: { code: string } }) => {
    const newCode = result.codeResult.code;

    if (!recentlyScanned.current.has(newCode)) {
      setResults((prevResults) => [...prevResults, result]);
      recentlyScanned.current.add(newCode);

      // Set the current product ID to trigger FetchHp
      setCurrentProductID(Number(newCode));

      // Remove the code from recently scanned after 2 seconds
      setTimeout(() => {
        recentlyScanned.current.delete(newCode);
      }, 2500);
    }

    if(mode == 'cornfusion') {
      redirect('/cornfusion/recipes');
    }
  };

  return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      <h1>Barcode Scanner</h1>

      {/* Render Scanner while scanning is active */}
      {scanning && <Scanner onDetected={handleDetected} />}

      {/* Trigger FetchHp dynamically for the current productID */}
      {currentProductID !== null && (
        <FetchHp productID={currentProductID} onFetchComplete={handleFetchComplete} />
      )}
      {/* Button to toggle scanning */}
      <Link href={linkWhere}><button
        onClick={toggleScanning}
        className={`nes-btn !text-black ${scanning ? 'is-error' : 'is-success'}`}
        style={{ marginTop: '20px', padding: '10px 20px' }}
      >
        {scanning ? 'Checkout' : 'Start'}
      </button></Link>

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
