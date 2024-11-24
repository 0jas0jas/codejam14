import React, { useEffect } from 'react';

interface APIComponentProps {
  productID: number; // The API URL
  onFetchComplete: (result: number) => void;
}

const FetchHp: React.FC<APIComponentProps> = ({ productID, onFetchComplete }) => {
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/freestyle/' + productID.toString());
        if (!response.ok) throw new Error('Failed to fetch data');
        const data = await response.json();
        const n = Math.floor(data['Progress Value']);
        console.log(n);
        onFetchComplete(n); // Call the parent function with `n`
      } catch (error) {
        console.error('Error fetching data:', error);
        onFetchComplete(50); 
      }
    };

    fetchData();
  }, []);

  return null; 
};

export default FetchHp;
