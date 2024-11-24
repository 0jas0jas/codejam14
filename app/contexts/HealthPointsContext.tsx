'use client';

import React, { createContext, useState, useContext, ReactNode } from 'react';

// Define the shape of the context
interface HealthPointsContextType {
    healthPoints: number;
    setHealthPoints: React.Dispatch<React.SetStateAction<number>>;
}

// Create the context with a default value (null)
const HealthPointsContext = createContext<HealthPointsContextType | undefined>(undefined);

// Create a provider component
interface HealthPointsProviderProps {
    children: ReactNode;
}

export const HealthPointsProvider: React.FC<HealthPointsProviderProps> = ({ children }) => {
    const [healthPoints, setHealthPoints] = useState<number>(50); // Initial health points

    return (
        <HealthPointsContext.Provider value={{ healthPoints, setHealthPoints }}>
            {children}
        </HealthPointsContext.Provider>
    );
};

// Custom hook to use the context
export const useHealthPoints = (): HealthPointsContextType => {
    const context = useContext(HealthPointsContext);
    if (!context) {
        throw new Error('useHealthPoints must be used within a HealthPointsProvider');
    }
    return context;
};
