import { 
    SAVE_USER,
    ADD_CAMPAIGN
 } from './action';

export const reducer = (state, action) => {
    switch(action.type){
        case SAVE_USER: {
            return{
                ...state,
                ...action.payload
            }
        } 
        case ADD_CAMPAIGN: {
            return{
                ...state,
                campaigns: [action.payload, ...state.campaigns]
            }
        }        
    }
}