'use client'
import React, { useState } from 'react';
import HelthBar from '../components/helthBar';
import FetchHp from '../components/fetchHp';

const Page: React.FC = () => {
    const [healthPoints, setHealthPoints] = useState<number>(21212); // State to store HP value
    
    const handleFetchComplete = (result: number): void => {
        setHealthPoints(result); 
    };
    return (
        <div>
            <HelthBar n={10} />
            <FetchHp productID={3017620422003} onFetchComplete={handleFetchComplete} />
            <h1>{healthPoints}</h1>
        </div>

    );
};

export default Page;
