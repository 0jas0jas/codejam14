import React, { useEffect, useState } from 'react';

interface APIComponentProps {
  onFetchComplete: (good: number, bad: number, neutral: number, prodArr: string[], scoreArr: string[]) => void;
}

const FetchStats: React.FC<APIComponentProps> = ({ onFetchComplete }) => {
  // State for prodArr and scoreArr
  const [prodArr, setProdArr] = useState<string[]>([]);
  const [scoreArr, setScoreArr] = useState<string[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/freestyle/stats');
        if (!response.ok) throw new Error('Failed to fetch data');
        const data = await response.json();
        
        // Extracting good, bad, and neutral scores
        const good = Math.floor(data['good']);
        const bad = Math.floor(data['bad']);
        const neutral = Math.floor(data['neutral']);
        
        // Assuming product names and scores are part of the response data
        const products = data['products'] || []; // Adjust based on actual response structure
        const scores = data['individual scores'] || []; // Adjust based on actual response structure

        // Set prodArr and scoreArr from the fetched data
        setProdArr(products);
        setScoreArr(scores);

        // Log the data
        console.log(good, bad, neutral, products, scores);

        // Pass all necessary data to the parent component
        onFetchComplete(good, bad, neutral, products, scores);
      } catch (error) {
        console.error('Error fetching data:', error);
        onFetchComplete(0, 0, 0, [], []); // Provide default values on error
      }
    };

    fetchData();
  }, [onFetchComplete]);

  return null; // No UI needed for this component
};

export default FetchStats;
