interface CardProps {
    isIndian: boolean
}

const IndianCard: React.FC<CardProps> = ({ isIndian }) => {
    let winText = <h3> Eh </h3>
    if(isIndian) winText = <h3> ✅ You're all good! </h3>
    else winText = <h3> ❌ Congrautlations, you drink black tea </h3>
    return (
        <div className="">
            {winText}
        </div>
    );
};

export default IndianCard;
