// cornfusion/recipes.tsx

'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/router';
import FetchRecipes from '@/app/components/fetchRecipes'; // Ensure correct path

const RecipesPage = () => {
  const router = useRouter();
  const { productID } = router.query; // Read productID from URL query parameter

  const [names, setNames] = useState<string[]>([]); // For recipe names
  const [ingredients, setIngredients] = useState<string[][]>([]); // For recipe ingredients

  const handleFetchComplete = (fetchedNames: string[], fetchedIngredients: string[][]) => {
    setNames(fetchedNames); // Set the recipe names
    setIngredients(fetchedIngredients); // Set the ingredients
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <h1>Recipes for Product {productID}</h1>

      {productID && (
        <FetchRecipes productID={Number(productID)} onFetchComplete={handleFetchComplete} />
      )}

      {/* Display the fetched recipes if available */}
      <div style={{ marginTop: '20px' }}>
        <h2>Recipe Names and Ingredients</h2>
        {names.length > 0 ? (
          <div>
            {names.map((name, index) => (
              <div key={index} style={{ marginBottom: '20px' }}>
                <h3>{name}</h3>
                <ul>
                  {ingredients[index]?.map((ingredient, idx) => (
                    <li key={idx}>{ingredient}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        ) : (
          <p>No recipes found for this product.</p>
        )}
      </div>
    </div>
  );
};

export default RecipesPage;
