import React, { useState } from 'react'
import { useQuery } from '@apollo/client'
import { QUERY_GETCAMPAIGN } from '../utils/queries'
import { useParams } from 'react-router-dom';

const SingleCampaign = () => {
    const { campaignId } = useParams();
    const { loading, data } = useQuery(QUERY_GETCAMPAIGN, {variables: {_id: campaignId}});
    console.log(data)
    const campaign = data?.campaign || [];
// console.log(campaign);
    if(loading){
        return <div>Loading...</div>;
    }
    return(
        <div className="campaign">
            <h1>{campaign.name}</h1>
            {/* <LocationList {...campaign}/> */}
        </div>
    )
}

export default SingleCampaign