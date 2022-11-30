import { useContext, useState } from 'react';
import { useMutation } from '@apollo/client';
import { CREATE_CAMPAIGN } from '../utils/mutations';
import UserContext from '../utils/UserContext';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { ADD_CAMPAIGN } from '../utils/action';

function Campaigns() {
    const { user, setUser } = useContext(UserContext);
    const [show, setShow] = useState(false);
    const [newCampaign, setNewCampaign] = useState({name: "", plot: ""})
    const [create, {error, data}] = useMutation(CREATE_CAMPAIGN);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleChange = (event => {
        const name = event.target.name;
        const value = event.target.value;
        setNewCampaign({
            ...newCampaign,
            [name]: value
        })
    })

    const createCampaign = async () => {
        try{
            if(newCampaign.name){
                console.log("Got a name");
                const { data } = await create({
                    variables: {...newCampaign}
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
    
                setNewCampaign({
                    name: "",
                    plot: ""
                })

                handleClose();
            }
        }catch (err){
            console.log(err);
        }        
    }

    return(
        <>
            <h2>Hello, {user.username}. Which campaign would you like to view?</h2>
            {user.campaigns.map(campaign => {
                return (
                    <div key={campaign._id}>
                        <h3>{campaign.name}</h3>
                        <section>{campaign.plot}</section>
                        <Link to={`/campaign/${campaign._id}`}>View Campaign</Link>
                    </div>
                )
            })}
            <Button onClick={handleShow}>New Campaign</Button>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>New Campaign</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form style={{ display: "flex", flexDirection: "column" }}>
                        <p >Campaign Name:</p>
                        <input
                            className="form-input"
                            placeholder="Campaign Name"
                            name="name"
                            type="text"
                            id='name-input'
                            value={newCampaign.name}
                            onChange={handleChange}
                        />
                        <br></br>

                        <p >Plot:</p>
                        <input
                            className="form-input"
                            placeholder="Campaign Plot"
                            name="plot"
                            type="plot"
                            value={newCampaign.plot}
                            onChange={handleChange}
                            />
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={handleClose}>Close</Button>
                    <Button onClick={createCampaign}>Save</Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default Campaigns