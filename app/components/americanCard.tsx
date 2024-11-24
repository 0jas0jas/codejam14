interface CardProps {
    cals: number
}

const AmericanCard: React.FC<CardProps> = ({ cals }) => {
    console.log(cals);
    let winText = <h3> Eh </h3>
    if(cals > 6000) winText = <h3> ✅ Freedom! Yayyyy </h3>
    else winText = <h3> ❌ Stay in Canada </h3>
    console.log(winText)
    return (
        <div className="">
            {winText}
        </div>
    );
};

export default AmericanCard;