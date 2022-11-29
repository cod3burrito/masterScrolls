import { SAVE_USER, ADD_CAMPAIGN, UPDATE_CAMPAIGN, REMOVE_CAMPAIGN } from './action';
import { useMutation } from '@apollo/client';
import { CREATE_CAMPAIGN } from '../utils/mutations'

export const reducer = (state, action) => {
    switch(action.type){
        case SAVE_USER: {
            return{
                ...state,
                ...action.payload
            }
        }
        case ADD_CAMPAIGN: {
            const [createCampaign, { error } ] = useMutation(CREATE_CAMPAIGN);

            try{
                const { data } = createCampaign({
                    variables: {...action.payload}
                });

                return{
                    ...state,
                    campaigns: [data, ...state.campaigns]
                }

            }catch (err) {
                console.log(err);
            }
        }            
    }
}