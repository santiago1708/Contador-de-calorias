import { createContext, Dispatch, ReactNode, useMemo, useReducer} from 'react'
import { ActivityActions, ActivityReducer , ActivityState, initialState } from '../reducers/activity-reducer'
import { categories } from '../data/category'
import { Activities } from '../types'

type ActivityProviderProps = {
    children: ReactNode
}

type ActivityContextProps = {
    state : ActivityState
    dispatch : Dispatch<ActivityActions>
    caloriasConsumed: number
    caloriasBurned: number
    netCalories: number
    categoryName: (category: Activities["category"]) => string[]
    isEmptyActivities: boolean
}

export const ActivityContext = createContext<ActivityContextProps>(null!)

export const ActivityProvider = ({children} : ActivityProviderProps) =>  {
    
    const [state, dispatch] = useReducer(ActivityReducer, initialState) 
    
    const caloriasConsumed = useMemo(() => state.activities.reduce((total, activi) => activi.category === 1 ? total + activi.calories : total, 0), [state.activities])
    const caloriasBurned = useMemo(() => state.activities.reduce((total, activi) => activi.category === 2 ? total + activi.calories : total, 0), [state.activities])
    const netCalories = useMemo(() => caloriasConsumed-caloriasBurned,[state.activities])

    const categoryName = useMemo(() => 
        (category : Activities['category']) =>  categories.map( cat => cat.id === category ? cat.name : ''), 
    [state.activities])

    const isEmptyActivities = useMemo(() => state.activities.length === 0 ,[state.activities])


    return (
        <ActivityContext.Provider 
        value={{state, dispatch, caloriasConsumed, caloriasBurned , netCalories, categoryName, isEmptyActivities}}
        >
            {children}
        </ActivityContext.Provider>
    )
}