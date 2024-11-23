interface BarProps {
    n: number;
}

const HealthBar: React.FC<BarProps> = ({ n }) => {
    return (
        <div>
        <p>Your helth</p>
        <div className="w-[335px] bg-white bg-opacity-50 border-dashed border-2 p-1 rounded-xl">

            {/* Render 'n' number of heart icons */}
            {Array.from({ length: n }).map((_, index) => (
                    <i key={index} className="nes-icon is-small heart"></i>
            ))}
                        {Array.from({ length: 20-n }).map((_, index) => (
                    <i key={index} className="nes-icon is-small is-empty heart"></i>
            ))}
        </div>
        </div>
    );
};

export default HealthBar;
