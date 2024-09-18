type CalorieDisplayProps = {
    calorie : number 
    text : string
    color : string
}

export default function CalorieDisplay({calorie, text, color} : CalorieDisplayProps) {
    return (
        <p className="text-white font-bold rounded-lg grid grid-cols-1 gap-3 text-center">
                <span className={`font-black text-6xl text-${color}-500 `}>{calorie}</span>
                {text}
        </p>
    )
}
