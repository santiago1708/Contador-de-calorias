import { useMemo } from "react"
import { Activities } from "../types"
import CalorieDisplay from "./CalorieDisplay"

type CalorieTrackerProps = {
    activities : Activities[]
}


export default function CalorieTracker({activities} : CalorieTrackerProps) {
    
    //Contadores 
    const caloriasConsumed = useMemo(() => activities.reduce((total, activi) => activi.category === 1 ? total + activi.calories : total, 0), [activities])
    const caloriasBurned = useMemo(() => activities.reduce((total, activi) => activi.category === 2 ? total + activi.calories : total, 0), [activities])
    const netCalories = useMemo(() => caloriasConsumed-caloriasBurned,[activities])
    return (
        <>
            <h2 className="text-4xl font-black text-white text-center">Resumen de Calorias</h2>

            <div className="flex flex-col items-center md:flex-row md:justify-between gap-5 mt-10">
                <CalorieDisplay
                    calorie = {caloriasConsumed}
                    text= 'Consumidas'
                    color='orange'
                />
                <CalorieDisplay
                    calorie = {caloriasBurned}
                    text= 'Ejercicio'
                    color='lime'
                />
                <CalorieDisplay
                    calorie={netCalories}
                    text= 'Diferencia'
                    color = 'white'
                />
            </div>
        </>
    )
}

