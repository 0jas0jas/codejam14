import React from 'react';
import BarcodeScanner from '../components/barcodeScanner';
import HelthBar from '../components/helthBar';
import { HealthPointsProvider } from '../contexts/HealthPointsContext';

const Page: React.FC = () => {
  return (
    <div className="p-3">
      <HealthPointsProvider>
        <HelthBar n={10} />
        <BarcodeScanner mode="american" />
      </HealthPointsProvider>
    </div>
  );
};

export default Page;