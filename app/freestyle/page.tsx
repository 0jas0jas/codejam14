import React from 'react';
import BarcodeScanner from '../components/barcodeScanner';
import HealthBar from '../components/helthBar';

const Page: React.FC = () => {
    return (
        <div className="p-4">
            <HealthBar n={5} />
            <BarcodeScanner />
        </div>
    );
};

export default Page;
