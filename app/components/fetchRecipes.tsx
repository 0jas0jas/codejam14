// import React, { useEffect, useState } from 'react';

// // one array for names and a 2d array for ingredients
// interface FetchRecipeProps {
//     productID: number;
//     onFetchComplete: (names: string[], ingredients: string[][]) => void;
// }

// const FetchRecipes: React.FC<FetchRecipeProps> = ({ productID, onFetchComplete  }) => {
//     const [names, setNames] = useState<Array<{ name: string }>>([]);
//     const [ingredients, setIngredients] = useState<Array<{ ingredients: string }>>([]);

//     useEffect(() => {
//         const fetchData = async () => {
//             try{
//                 const response = await fetch('http://127.0.0.1:8000/cornfusion/' + productID.toString());
//                 if (!response.ok) throw new Error('Failed to fetch recipe data');
//                 const data = await response.json();
//                 const recipe = data['recipe']; 
//                 console.log(recipe);
//                 onFetchComplete(recipe);
//             } 
//             catch (error) {
//                 console.error('Error fetching recipe data:', error);
//                 onFetchComplete('No recipe available');
//             }
//         };
//         fetchData();
//     }, [productID]);
//     return null;
// };

// export default FetchRecipes

import React, { useEffect, useState } from 'react';

interface FetchRecipeProps {
  productID: number;
  onFetchComplete: (names: string[], ingredients: string[][]) => void; // Updated callback type
}

const FetchRecipes: React.FC<FetchRecipeProps> = ({ productID, onFetchComplete }) => {
  const [names, setNames] = useState<string[]>([]); // Array for recipe names
  const [ingredients, setIngredients] = useState<string[][]>([]); // 2D array for ingredients

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/cornfusion/' + productID.toString());
        if (!response.ok) throw new Error('Failed to fetch recipe data');
        const data = await response.json();

        const fetchedNames: string[] = [];
        const fetchedIngredients: string[][] = [];

        // Iterate over the recipe keys and store names and ingredients
        Object.keys(data).forEach((key) => {
          const recipe = data[key];
          fetchedNames.push(recipe.name); // Add the name to the names array
          fetchedIngredients.push(recipe.ingredients); // Add the ingredients to the ingredients array
        });

        setNames(fetchedNames); // Update state with names
        setIngredients(fetchedIngredients); // Update state with ingredients

        onFetchComplete(fetchedNames, fetchedIngredients); // Pass the data to the parent
      } catch (error) {
        console.error('Error fetching recipe data:', error);
        onFetchComplete([], []); // Return empty arrays on error
      }
    };

    fetchData();
  }, [productID, onFetchComplete]);

  return null; // This component does not render any UI
};

export default FetchRecipes;
