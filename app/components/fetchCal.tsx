import React, { useEffect } from 'react';

interface APIComponentProps {
    onFetchComplete: (calories : number) => void;
}

const FetchCal: React.FC<APIComponentProps> = ({ onFetchComplete }) => {
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/american/');
        if (!response.ok) throw new Error('Failed to fetch data');
        const data = await response.json();
        const calories = data;
        console.log(calories);
        onFetchComplete(calories);
      } catch (error) {
        console.error('Error fetching data:', error); 
      }
    };

    fetchData();
  }, []);

  return null; 
};

export default FetchCal;