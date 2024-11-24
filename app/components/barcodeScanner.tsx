'use client';

import React, { useRef, useState } from 'react';
import Scanner from './Scanner';
import FetchHp from './fetchHp';
import FetchRecipes from './fetchRecipes';
import { useHealthPoints } from '../contexts/HealthPointsContext';
import { redirect } from 'next/navigation';

interface BarcodeScannerProps {
  mode: 'freestyle' | 'cornfusion';
}

const BarcodeScanner: React.FC<BarcodeScannerProps> = ({ mode }) => {
  const [scanning, setScanning] = useState(false);
  const [results, setResults] = useState<Array<{ codeResult: { code: string } }>>([]);
  const recentlyScanned = useRef<Set<string>>(new Set());
  const { healthPoints, setHealthPoints } = useHealthPoints();
  const [currentProductID, setCurrentProductID] = useState<number | null>(null);

  // States for recipes in cornfusion mode
  const [names, setNames] = useState<string[]>([]);
  const [ingredients, setIngredients] = useState<string[][]>([]);
  const [showRecipes, setShowRecipes] = useState(false); // Controls recipe display in cornfusion mode

  

  const handleHpFetchComplete = (result: number): void => {
    setHealthPoints(result); // Update healthPoints context
    setCurrentProductID(null); // Clear currentProductID after fetch
  };

  const handleRecipeFetchComplete = (fetchedNames: string[], fetchedIngredients: string[][]) => {
    setNames(fetchedNames);
    setIngredients(fetchedIngredients);
    setShowRecipes(true); // Show recipes after fetching is complete
  };

  const toggleScanning = () => {
    if (scanning) {
      // Handle stopping the scanner
      setScanning(false);
      if (mode === 'freestyle') {
        redirect('/freestyle/anal'); // Navigate to /freestyle/anal when stopping in freestyle mode
      }
    } else {
      // Handle starting the scanner
      recentlyScanned.current.clear();
      setScanning(true);
    }
  };

  const handleDetected = (result: { codeResult: { code: string } }) => {
    const newCode = result.codeResult.code;

    if (!recentlyScanned.current.has(newCode)) {
      setResults((prevResults) => [...prevResults, result]);
      recentlyScanned.current.add(newCode);
      setCurrentProductID(Number(newCode));

      if (mode === 'cornfusion') {
        setScanning(false); // Stop scanning immediately for cornfusion mode
      }

      setTimeout(() => {
        recentlyScanned.current.delete(newCode);
      }, 2500);
    }
  };

  return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      <h1>Barcode Scanner</h1>

      {/* Render Scanner while scanning is active */}
      {scanning && mode === 'freestyle' && <Scanner onDetected={handleDetected} />}
      {scanning && mode === 'cornfusion' && !showRecipes && <Scanner onDetected={handleDetected} />}

      {/* Trigger FetchHp dynamically for freestyle mode */}
      {currentProductID !== null && mode === 'freestyle' && (
        <FetchHp productID={currentProductID} onFetchComplete={handleHpFetchComplete} />
      )}

      {/* Trigger FetchRecipes dynamically for cornfusion mode */}
      {currentProductID !== null && mode === 'cornfusion' && !showRecipes && (
        <FetchRecipes productID={currentProductID} onFetchComplete={handleRecipeFetchComplete} />
      )}

      <button
        onClick={toggleScanning}
        className={`nes-btn !text-black ${scanning ? 'is-error' : 'is-success'}`}
        style={{ marginTop: '20px', padding: '10px 20px' }}
        disabled={mode === 'cornfusion' && showRecipes} // Disable scanning button when recipes are shown
      >
        {scanning ? 'Checkout' : 'Start ►'}
      </button>

      {/* Show scanned barcodes for freestyle mode */}
      {!scanning && mode === 'freestyle' && (
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

      {/* Display recipes for cornfusion mode */}
      {!scanning && mode === 'cornfusion' && showRecipes && (
        <div style={{ marginTop: '20px' }}>
          <h2>Recipes</h2>
          {names.length > 0 ? (
            names.map((name, index) => (
              <div key={index} style={{ marginBottom: '20px' }}>
                <h3>{name}</h3>
                <ul>
                  {ingredients[index]?.map((ingredient, idx) => (
                    <li key={idx}>{ingredient}</li>
                  ))}
                </ul>
              </div>
            ))
          ) : (
            <p>No recipes found for this product.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default BarcodeScanner;
