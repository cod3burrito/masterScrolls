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
                const { data } = await create({
                    variables: { campaignId: campaignParam, ...newLocation }
                });

                setAllLocations([...allLocations, { ...data.createLocation }])
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
    const styles = {
        button: {
            backgroundColor: "#C19AB9",
            padding: ".25%",
            margin: ".5%",
            marginTop: "5%",
            width: "18rem",
            border: "0px",
            color: "#140600"
        },
        modalBtn: {
            backgroundColor: "#A650D1",
            border: "0px"
        }
    }
    return (
        <div className="newLocation d-flex flex-column justify-content-center">
            <h1 className="text-center">{campaign.name}</h1>
            <LocationList allLocations={allLocations} setAllLocations={setAllLocations} />
            {globalCampaigns.map(campaign => {
                if (campaign._id === campaignParam) {
                    return (
                        <Button className="mx-2 rounded-pill align-self-center" style={styles.button} onClick={handleShow}>New Location</Button>
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
                            placeholder="Location Name Required"
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
                            placeholder="Location Details Required"
                            name="details"
                            type="text"
                            value={newLocation.details}
                            onChange={handleChange}
                        />
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button style={styles.modalBtn} onClick={handleClose}>Close</Button>
                    <Button style={styles.modalBtn} onClick={createLocation}>Save</Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default SingleCampaign