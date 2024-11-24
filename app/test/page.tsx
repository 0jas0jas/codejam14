'use client';

import React from 'react';
import RecipeCard from '../components/recipeCard';

const Page: React.FC = () => {
  return (
    <div className="p-3">
      <RecipeCard 
        titles={["Paneer Biryani", "Dosa", "Soya Chaap"]} 
        recipes={[
          ["Aloo", "Haldiram Aloo Bhujiya", "Anda", "Dosa"], 
          ["asuohsad", "idasud", "asoidhad", "asdohduo", "asdohad"], 
          ["audhiaudh", "Audohdu", "asioidhduohd", "hduhd"]
        ]}
      />
    </div>
  );
};

export default Page;
