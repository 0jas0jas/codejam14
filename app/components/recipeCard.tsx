'use client'

interface CardProps {
    titles: string[]; // Array of recipe titles
    recipes: string[][]; // 2D array of ingredients
}

const RecipeCard: React.FC<CardProps> = ({ titles, recipes }) => {
    return (
        <div>
            {titles.map((title, index) => (
                <div key={index}>
                    <h2 className="p-2 justify-center">{title}</h2>
                    <div
                        className={`nes-balloon nes-pointer ${
                            index % 2 === 0 ? "from-left" : "from-right"
                        } !text-black p-4`}
                    >
                        <ul>
                            {recipes[index]?.map((ingredient, idx) => (
                                <li key={idx}>{ingredient}</li>
                            ))}
                        </ul>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default RecipeCard;
