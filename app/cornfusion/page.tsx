'use client';

import React from 'react';
import BarcodeScanner from '../components/barcodeScanner';
import { HealthPointsProvider } from '../contexts/HealthPointsContext';

const Cornfusion: React.FC = () => {
  return (
    <div className="p-3">
      <HealthPointsProvider>
        <BarcodeScanner mode="cornfusion" />
      </HealthPointsProvider>
    </div>
  );
};

export default Cornfusion;

