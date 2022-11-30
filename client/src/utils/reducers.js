import { 
    SAVE_USER,
    ADD_CAMPAIGN,
    UPDATE_CAMPAIGN,
    REMOVE_CAMPAIGN
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
        case UPDATE_CAMPAIGN: {
            const currentCampaigns = [...state.campaigns];
            const updatedCampaigns = currentCampaigns.map((campaign) => {
                if(campaign._id === action.payload._id){
                    return action.payload;
                }

                return campaign;
            })

            return{
                ...state,
                campaigns: updatedCampaigns
            }
        }
        case REMOVE_CAMPAIGN: {
            const currentCampaigns = [...state.campaigns];
            const updatedCampaigns = currentCampaigns.filter((campaign) => campaign._id !== action.payload._id)

            return{
                ...state,
                campaigns: updatedCampaigns
            }
        }      
    }
}