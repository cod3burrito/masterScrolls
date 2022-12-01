import { useContext, useState } from 'react';
import { useMutation } from '@apollo/client';
import { CREATE_CAMPAIGN, EDIT_CAMPAIGN, DELETE_CAMPAIGN } from '../utils/mutations';
import UserContext from '../utils/UserContext';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { ADD_CAMPAIGN, UPDATE_CAMPAIGN, REMOVE_CAMPAIGN } from '../utils/action'

function Campaigns() {
    const { user, setUser } = useContext(UserContext);
    const [show, setShow] = useState(false);
    const [stateCampaign, setStateCampaign] = useState({ name: "", plot: "", _id: "" })
    const [edit, setEdit] = useState(false);
    const [create, { createError, createdata }] = useMutation(CREATE_CAMPAIGN);
    const [editState, { editError, editData }] = useMutation(EDIT_CAMPAIGN);
    const [deleteState, { deleteError, deleteData }] = useMutation(DELETE_CAMPAIGN);

    // Handles the closing of the modal
    const handleClose = () => {
        setShow(false);
        setEdit(false);
        setStateCampaign({
            name: "",
            plot: "",
            _id: ""
        });
    }

    // Handles the displaying of the modal
    const handleShow = () => setShow(true);

    // Handles if the user is creating new campaign or editing a campaign
    const handleEdit = () => setEdit(true);

    // Handles form input changes
    const handleChange = (event => {
        const name = event.target.name;
        const value = event.target.value;
        setStateCampaign({
            ...stateCampaign,
            [name]: value
        })
    })

    // Handles the mutations for creating a campaign and updates Global State
    const createCampaign = async () => {
        try {
            if (stateCampaign.name) {
                const { data } = await create({
                    variables: { ...stateCampaign }
                });

                const payload = {
                    name: data.createCampaign.name,
                    plot: data.createCampaign.plot,
                    _id: data.createCampaign._id,
                };

                setUser({
                    type: ADD_CAMPAIGN,
                    payload: payload
                });

                setStateCampaign({
                    name: "",
                    plot: "",
                    _id: ""
                });

                handleClose();
            }
        } catch (err) {
            console.log(err);
        }
    }

    // Handles the mutations for editing a campaign and updates Global State
    const editCampaign = async () => {
        try {
            const { data } = await editState({
                variables: { campaignId: stateCampaign._id, ...stateCampaign }
            })

            const payload = {
                name: data.editCampaign.name,
                plot: data.editCampaign.plot,
                _id: data.editCampaign._id,
            };

            setUser({
                type: UPDATE_CAMPAIGN,
                payload: payload
            });

            handleClose();
        } catch (err) {
            console.log(err);
        }
    }

    // Handles the mutations for deleting a campaign and updates Global State
    const deleteCampaign = async (id) => {
        try {
            const { data } = await deleteState({
                variables: { campaignId: id }
            })

            const payload = {
                _id: data.deleteCampaign._id
            }

            setUser({
                type: REMOVE_CAMPAIGN,
                payload: payload
            });

        } catch (err) {
            console.log(err);
        }
    }
    const styles = {
        button: {
            backgroundColor: "#C19AB9",
            padding: ".25%",
            margin: ".5%",
            width: "8rem",
            border: "0px",
            color: "#140600"
        },
        createBtn: {
            backgroundColor: "#C19AB9",
            padding: ".25%",
            margin: ".5%",
            width: "10rem",
            border: "0px",
            color: "#140600"
        },
        background: {
            backgroundColor: "#F2B644"
        },
        modalBtn: {
            backgroundColor: "#A650D1",
            border: "0px"
        }
    }
    return (
        <>
            <div className="d-flex flex-column align-items-center justify-content-center h-75">
                <h2>Hello, {user.username}! What would you like to do today?</h2>
                {user.campaigns.map(campaign => {
                    return (
                        <div className="d-flex flex-column align-items-center border border-dark rounded-pill w-50 my-2" style={styles.background} key={campaign._id}>
                            <h3>{campaign.name}</h3>
                            <section className="text-wrap fs-5 mx-5">{campaign.plot}</section>
                            <div className="m-3 w-100 d-flex justify-content-center ">
                                <Button className="mx-2 rounded-pill" style={styles.button} onClick={() => {
                                    setStateCampaign({ name: campaign.name, plot: campaign.plot, _id: campaign._id });
                                    handleEdit();
                                    handleShow();
                                }}>Edit Campaign</Button>
                                <Button className="mx-2 rounded-pill" style={styles.button} onClick={() => {
                                    deleteCampaign(campaign._id);
                                }}>Delete Campaign</Button>
                                <Link to={`/campaign/${campaign._id}`}><Button className="mx-2 rounded-pill" style={styles.button}>View Campaign</Button></Link>
                            </div>
                        </div>
                    )
                })}
                <Button size="lg" className="mx-2 rounded-pill" style={styles.createBtn} onClick={handleShow}>New Campaign</Button>
            </div>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    {edit ? (<Modal.Title>Edit Campaign</Modal.Title>) :
                        (<Modal.Title>New Campaign</Modal.Title>)}
                </Modal.Header>
                <Modal.Body>
                    <form style={{ display: "flex", flexDirection: "column" }}>
                        <p >Campaign Name:</p>
                        <input
                            className="form-input"
                            placeholder="Campaign Name Required"
                            name="name"
                            type="text"
                            id='name-input'
                            value={stateCampaign.name}
                            onChange={handleChange}
                        />
                        <br></br>

                        <p >Plot:</p>
                        <input
                            className="form-input"
                            placeholder="Campaign Plot Required"
                            name="plot"
                            type="plot"
                            value={stateCampaign.plot}
                            onChange={handleChange}
                        />
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button style={styles.modalBtn} onClick={handleClose}>Close</Button>
                    {edit ? (<Button style={styles.modalBtn} onClick={editCampaign}>Edit</Button>) :
                        (<Button style={styles.modalBtn} onClick={createCampaign}>Save</Button>)}
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default Campaigns