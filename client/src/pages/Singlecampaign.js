import React, { useState } from 'react'
import { useQuery } from '@apollo/client'
import { QUERY_GETCAMPAIGN } from '../utils/queries'
import { useParams } from 'react-router-dom';

const SingleCampaign = () => {
    const { campaignId } = useParams();
    console.log(campaignId)
    const { loading, data } = useQuery(
        QUERY_GETCAMPAIGN,
        {
            variables: { id: campaignId },
        });

    console.log(data)
    const campaignObj = data?.GetCampaign || [];
    // const campaign = data?.campaign || [];
    console.log(campaignObj);
    if (loading) {
        return <div>Loading...</div>;
    }
    return (
        <div className="campaign">
            <h1> Hello</h1>
            <h1>{campaignObj.name}</h1>
            {/* <LocationList {...campaign}/> */}
        </div>
    )
}

export default SingleCampaign