import React, { useState } from 'react'
import { useQuery } from '@apollo/client'
import { QUERY_GETCAMPAIGN } from '../utils/queries'
import { useParams } from 'react-router-dom';
import LocationList from '../components/LocationList';
const SingleCampaign = () => {
    const { campaignId: campaignParam } = useParams();

    const { loading, data } = useQuery(
        QUERY_GETCAMPAIGN,
        {
            variables: { campaignId: campaignParam },
        });
    // const campaignObject = data?.getCampaign || [];
    const campaign = data?.getCampaign || [];
    console.log(campaign);
    if (loading) {
        return <div>Loading...</div>;
    }
    return (
        <div className="campaign">
            <h1>{campaign.name}</h1>
            <LocationList locations={campaign.locations} />
        </div>
    )
}

export default SingleCampaign