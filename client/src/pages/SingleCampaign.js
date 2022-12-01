import React, { useState, useContext, useEffect } from 'react'
import { useQuery } from '@apollo/client'
import { useMutation } from '@apollo/client';
import { QUERY_GETCAMPAIGN } from '../utils/queries'
import { CREATE_LOCATION } from '../utils/mutations';
import { useParams } from 'react-router-dom';
import LocationList from '../components/LocationList';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import UserContext from '../utils/UserContext';
import { ADD_CAMPAIGN } from '../utils/action';

const SingleCampaign = () => {
    const { user, setUser } = useContext(UserContext);
    const [showModal, setShowModal] = useState(false);
    const { campaignId: campaignParam } = useParams();
    const [create] = useMutation(CREATE_LOCATION);
    const globalCampaigns = user.campaigns

    const handleClose = () => setShowModal(false);
    const handleShow = () => setShowModal(true);

    const [newLocation, setNewLocation] = useState({ name: "", details: "" })
    const { loading, data } = useQuery(
        QUERY_GETCAMPAIGN,
        {
            variables: { campaignId: campaignParam },
        });
    const campaign = data?.getCampaign || [];

    const [allLocations, setAllLocations] = useState([]);

    useEffect(() => {
        console.log("do I come in here?")
        setAllLocations(campaign.locations)
    }, [loading]);

    const handleChange = (event => {
        const name = event.target.name;
        const value = event.target.value;
        setNewLocation({
            ...newLocation,
            [name]: value
        })
    })

    const createLocation = async () => {
        try {
            if (newLocation.name) {
                console.log("Got a name");
                const { data } = await create({
                    variables: { campaignId: campaignParam, ...newLocation }
                });

                setAllLocations([...allLocations, { ...data.createLocation }])
                console.log(allLocations)
                setNewLocation({
                    name: "",
                    details: ""
                })

                handleClose();
            }
        } catch (err) {
            console.log(err);
        }
    }

    if (loading) {
        return <div>Loading...</div>;
    }
    return (
        <div className="newLocation">
            <h1>{campaign.name}</h1>
            <LocationList allLocations={allLocations} setAllLocations={setAllLocations} />
            {globalCampaigns.map(campaign => {
                if (campaign._id === campaignParam) {
                    return (
                        <Button onClick={handleShow}>New Location</Button>
                    )
                } else {
                    return (<></>)
                }
            })}
            <Modal show={showModal} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>New Location</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form style={{ display: "flex", flexDirection: "column" }}>
                        <p >Location Name:</p>
                        <input
                            className="form-input"
                            placeholder="Location Name"
                            name="name"
                            type="text"
                            id='name-input'
                            value={newLocation.name}
                            onChange={handleChange}
                        />
                        <br></br>

                        <p >Details:</p>
                        <input
                            className="form-input"
                            placeholder="Location Details"
                            name="details"
                            type="text"
                            value={newLocation.details}
                            onChange={handleChange}
                        />
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={handleClose}>Close</Button>
                    <Button onClick={createLocation}>Save</Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default SingleCampaign