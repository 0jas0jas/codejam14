'use client';

import React from 'react';
import RecipeCard from '../components/recipeCard';
import IndianCard from '../components/indianCard';

const Page: React.FC = () => {
  return (
    <div className="p-3 plex text-center text-5xl line justify-around">
      <IndianCard isIndian={false}/>
    </div>
  );
};

export default Page;
