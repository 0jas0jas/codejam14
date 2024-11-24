interface CardProps {
    isIndian: string
}

const IndianCard: React.FC<CardProps> = ({ isIndian }) => {
    let winText = <h3> Eh </h3>
    if(isIndian == 'Yes') winText = <h3> ✅ You're all good! </h3>
    else if (isIndian == 'No') winText = <h3> ❌ Congrautlations, you drink black tea </h3>
    else winText = <></>
    return (
        <div className="">
            {winText}
        </div>
    );
};

export default IndianCard;
