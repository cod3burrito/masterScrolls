import { SAVE_USER } from './action';

export const reducer = (state, action) => {
    switch(action.type){
        case SAVE_USER: {
            return{
                ...state,
                ...action.payload
            }
        }          
    }
}