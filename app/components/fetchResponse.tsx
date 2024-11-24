import React, { useEffect } from 'react';

interface APIComponentProps {
    onFetchComplete: (isIndian: string) => void;
}

const FetchResponse: React.FC<APIComponentProps> = ({ onFetchComplete }) => {
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/indian/');
        if (!response.ok) throw new Error('Failed to fetch data');
        const data = await response.json();
        const isIndian = data;
        console.log(isIndian['is_indian']);
        onFetchComplete(isIndian['is_indian']);
      } catch (error) {
        console.error('Error fetching data:', error); 
      }
    };

    fetchData();
  }, []);

  return null; 
};

export default FetchResponse;