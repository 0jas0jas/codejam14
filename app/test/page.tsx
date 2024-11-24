'use client'
import React, { useState } from 'react';
import HelthBar from '../components/helthBar';
import FetchHp from '../components/fetchHp';
import BarcodeScanner from '../components/barcodeScanner';

const Page: React.FC = () => {
    const [healthPoints, setHealthPoints] = useState<number>(50); // State to store HP value
    
    const handleFetchComplete = (result: number): void => {
        setHealthPoints(result); 
    };
    return (
        <div>
            <HelthBar n={10} />
            <FetchHp productID={65633091283} onFetchComplete={handleFetchComplete} />
            <HelthBar n={healthPoints/5} />
            <h1>{healthPoints}</h1>
        </div>

    );
};

export default Page;
