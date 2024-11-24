'use client'
import Chart from 'chart.js/auto';
import { useRef, useEffect, useState } from 'react';
import styles from './freestyle.module.css';
import FetchStats from '@/app/components/fetchStats';

export default function Page() {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const [prodArr, setProdArr] = useState<string[]>([]);
    const [scoreArr, setScoreArr] = useState<string[]>([]);
    const [goodCount, setGoodCount] = useState<number>(0);
    const [badCount, setBadCount] = useState<number>(0);
    const [neutralCount, setNeutralCount] = useState<number>(0);
    const [isFetched, setIsFetched] = useState<boolean>(false); // To check if data is already fetched

    useEffect(() => {
        // Add products and scores only once when the component mounts
        setProdArr(["Maggi", "Dant Kanti", "Kesh Kanti"]);
        setScoreArr(["+5", "-5", "0"]);
    }, []);

    // Function to handle the fetched stats and update the state
    const handleFetchComplete = (good: number, bad: number, neutral: number, products: string[], scores: string[]) => {
        setGoodCount(good);
        setBadCount(bad);
        setNeutralCount(neutral);
        setProdArr(products);
        setScoreArr(scores);
        setIsFetched(true); // Mark as fetched
    };

    // Fetch data only once on mount
    useEffect(() => {
        if (!isFetched) {
            <FetchStats onFetchComplete={handleFetchComplete} />;
        }
    }, [isFetched]); // Ensure this effect runs only once

    useEffect(() => {
        if (!canvasRef.current || !isFetched) {
            return;
        }

        const ctx = canvasRef.current;

        // Destroy existing chart if any
        let chartStatus = Chart.getChart(ctx);
        if (chartStatus) {
            chartStatus.destroy();
        }

        // Create a new chart
        new Chart(ctx, {
            type: 'doughnut',
            data: {
                datasets: [
                    {
                        label: '# of Items',
                        data: [goodCount, neutralCount, badCount ], // Use the updated stats
                        backgroundColor: [
                            'rgba(6, 255, 0, 0.5)',
                            'rgba(255, 228, 0, 0.5)',
                            'rgba(255, 23, 0, 0.5)',
                        ],
                        borderWidth: 1,
                    },
                ],
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: 'top',
                    },
                },
            },
        });
    }, [goodCount, badCount, neutralCount, isFetched]); // Re-run the chart only when stats or fetch state changes

    return (
        <div className={styles.container}>
            <h3>Your score breakdown</h3>
            <br />
            <canvas id="myChart" ref={canvasRef}></canvas>
            <br />
            <div>
                <ul>
                    {prodArr.map((product, index) => (
                        <li key={index}>
                            {product}......{scoreArr[index]}
                        </li>
                    ))}
                </ul>
            </div>
            {/* Call the FetchStats component with the onFetchComplete callback */}
            <FetchStats onFetchComplete={handleFetchComplete} />
        </div>
    );
}
