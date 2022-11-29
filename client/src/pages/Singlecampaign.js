import React, { useState } from 'react'
import { useQuery } from '@apollo/client'
import { QUERY_GETCAMPAIGN } from '../utils/queries'
import { useParams } from 'react-router-dom';

const SingleCampaign = () => {
    const { campaignId: campaignParam } = useParams();

    const { loading, data } = useQuery(
        QUERY_GETCAMPAIGN,
        {
            variables: { campaignId: campaignParam },
        });
    console.log(loading)
    console.log(data)
    // const campaignObject = data?.getCampaign || [];
    const campaign = data?.getCampaign || [];
    console.log(campaign);
    if (loading) {
        return <div>Loading...</div>;
    }
    return (
        <div className="campaign">
            <h1> Hello</h1>
            <h1>{campaign.name}</h1>
            {/* <LocationList {...campaign}/> */}
        </div>
    )
}

export default SingleCampaign