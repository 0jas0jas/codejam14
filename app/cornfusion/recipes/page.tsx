'use client'
import Chart from 'chart.js/auto';
import { useRef, useEffect, useState } from 'react';
import styles from './freestyle.module.css';
import FetchStats from '@/app/components/fetchStats';

export default function Page() {
    
    const [names, setNames] = useState<string[]>([]); // Array for recipe names
    const [ingredients, setIngredients] = useState<string[][]>([]); // 2D array for ingredients

    useEffect(() => {
        // Add products and scores only once when the component mounts
        
    }, []);

    // Function to handle the fetched stats and update the state
    const handleFetchComplete = (good: number, bad: number, neutral: number, products: string[], scores: string[]) => {
        
    };
}