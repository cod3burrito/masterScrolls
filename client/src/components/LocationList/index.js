import React, { useState, useContext } from 'react'
import { Link } from 'react-router-dom'
import CharacterList from '../CharacterList'
import Collapsible from 'react-collapsible'
import Button from 'react-bootstrap/Button';
import { useMutation } from '@apollo/client';
import { EDIT_LOCATION, DELETE_LOCATION, DELETE_CHARACTER } from '../../utils/mutations';
import Modal from 'react-bootstrap/Modal';
import { useParams } from 'react-router-dom';
import UserContext from '../../utils/UserContext';

const LocationList = ({ allLocations, setAllLocations }) => {
    const [edit] = useMutation(EDIT_LOCATION)
    const [deleteState] = useMutation(DELETE_LOCATION);
    const [deleteChar] = useMutation(DELETE_CHARACTER)
    const [showModal, setShowModal] = useState(false);
    const [stateLocation, setStateLocation] = useState({ name: "", details: "", _id: "" })
    const { user } = useContext(UserContext)
    const globalCampaigns = user.campaigns
    const { campaignId: campaignParam } = useParams();
    const handleClose = () => setShowModal(false);
    const handleShow = () => setShowModal(true);

    const handleChange = (event => {
        const name = event.target.name;
        const value = event.target.value;
        setStateLocation({
            ...stateLocation,
            [name]: value
        })
    })


    const editLocation = async () => {
        try {
            if (stateLocation.name) {
                const { name, details } = stateLocation;
                const { data } = await edit({
                    variables: { name: name, details: details, locationId: stateLocation._id, campaignId: campaignParam }
                });
                const updatedLocations = await allLocations.map(location => {
                    if (location._id === data.editLocation._id) {
                        return data.editLocation
                    } else {
                        return location
                    }
                })
                setAllLocations(updatedLocations)
                handleClose();
            }
        } catch (err) {
            console.log(err);
        }
    }

    const deleteLocation = async (chars, id) => {
        try {

            chars.forEach(async (char) => {
                await deleteChar({
                    variables: { locationId: id, characterId: char._id }
                }
                )
            })
            const { data } = await deleteState({
                variables: { campaignId: campaignParam, locationId: id }
            })
            const updatedLocations = await allLocations.filter((location) => location._id !== id)

            setAllLocations(updatedLocations)

        } catch (err) {
            console.log(err);
        }
    }
    const setLabel = (event) => {
        if (event.target.textContent == "View Characters") {
            event.target.textContent = "Hide Characters"
        } else {
            event.target.textContent = "View Characters"
        }
    }
    if (!allLocations) {
        //this should be impossible since we have a default one made
        return (<h3>No Locations in this campaign yet!</h3>)
    }
    const styles = {
        button: {
            backgroundColor: "#C19AB9",
            padding: ".25%",
            margin: ".5%",
            width: "7.5rem",
            border: "0px",
            color: "#140600"
        },
        card: {
            backgroundColor: "#F2B644",
            width: "18rem"
        },
        modalBtn: {
            backgroundColor: "#A650D1",
            border: "0px"
        },

    }
    return (
        <>
            <div className='d-flex flex-wrap justify-content-center'>
                {allLocations.map((location) => {
                    return (
                        <>
                            <div className="card m-2 d-flex align-items-center border border-dark" style={styles.card}>
                                <h2>{location.name}</h2>
                                <p>{location.details}</p>
                                <div>
                                    {globalCampaigns.map(campaign => {
                                        if (campaign._id === campaignParam) {
                                            return (
                                                <>
                                                    <Button size="sm" className="mx-2 rounded-pill" style={styles.button} onClick={() => {
                                                        setStateLocation({ name: location.name, details: location.details, _id: location._id })
                                                        handleShow()
                                                    }}>Edit Location</Button>
                                                    <Button size="sm" className="mx-2 rounded-pill" style={styles.button} onClick={() => {
                                                        deleteLocation(location.characters, location._id);
                                                    }}>Delete Location</Button>
                                                </>
                                            )
                                        } else {
                                            return (<></>)
                                        }
                                    })}

                                </div>
                                <Modal style={{ "--bs-modal-bg": "#F2B644" }} show={showModal} onHide={handleClose}>
                                    <Modal.Header style={{ "--bs-modal-header-border-color": "#140600" }} closeButton>
                                        <Modal.Title>Edit Location</Modal.Title>
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
                                                value={stateLocation.name}
                                                onChange={handleChange}
                                            />
                                            <br></br>

                                            <p >Details:</p>
                                            <input
                                                className="form-input"
                                                placeholder="Location Details"
                                                name="details"
                                                type="test"
                                                value={stateLocation.details}
                                                onChange={handleChange}
                                            />
                                        </form>
                                    </Modal.Body>
                                    <Modal.Footer style={{ "--bs-modal-footer-border-color": "#140600" }} >

                                        <Button style={styles.modalBtn} onClick={handleClose}>Close</Button>
                                        <Button style={styles.modalBtn} onClick={editLocation}>Edit</Button>
                                    </Modal.Footer>
                                </Modal>
                                <div style={{ display: "flex", flexDirection: "column" }}>
                                    <Collapsible style={{ textAlign: "center" }} key={location._id} trigger={"View Characters"}>
                                        <ul className='list-group list-group-flush'>
                                            <CharacterList locationId={location._id} characters={location.characters} />
                                        </ul>
                                    </Collapsible>
                                </div>
                            </div>
                        </>
                    )
                })}
            </div>
        </>
    )
}

export default LocationList
