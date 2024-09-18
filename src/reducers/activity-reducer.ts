import { Activities } from './../types/index';

export type ActivityActions = 
    { type : 'save-activity', payload : { newactivity : Activities } } | 
    { type : 'set-activeId', payload : { id : Activities['id'] } }  |
    { type : 'delete-activity', payload : { id : Activities['id'] } }  

export type ActivityState = {
    activities : Activities[],
    activeId: Activities['id']
}

const localStorageActivities = () : Activities[] => {
    const activi = localStorage.getItem('activi')
    return activi? JSON.parse(activi) : []
}

export const initialState : ActivityState = {
    activities : localStorageActivities(),
    activeId : ''
}

export const ActivityReducer = (
    state : ActivityState = initialState,
    action: ActivityActions
) => {
    if (action.type === 'save-activity') {
        //Este codigo maneja la logica para actualizar el state

        let updateActivity : Activities[] = []
        if(state.activeId){
            updateActivity = state.activities.map((activi) => activi.id === state.activeId ? action.payload.newactivity : activi)
        }else {
            updateActivity = [...state.activities, action.payload.newactivity]
        }

        return {
            ...state, 
            activities : updateActivity,
            activeId : ''
        }
    }

    if (action.type === 'set-activeId'){
        return {
            ...state,
            activeId : action.payload.id
        }
    }

    if(action.type === 'delete-activity') {
        return {
            ...state, 
            activities : state.activities.filter((activity) => activity.id !== action.payload.id)
        }
    }

    return state
}