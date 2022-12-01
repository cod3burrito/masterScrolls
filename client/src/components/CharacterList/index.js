import React, { useContext, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Modal } from 'react-bootstrap'
import Character from '../Character'
import Button from 'react-bootstrap/Button';
import UserContext from '../../utils/UserContext';

const CharacterList = ({ locationId, characters }) => {
    const [showModal, setShowModal] = useState(false)
    const [currentCharacter, setCurrentCharacter] = useState('')
    const [allCharacters, setAllChars] = useState(characters)
    const currentCampaign = useParams()
    const { user } = useContext(UserContext)
    const globalCampaigns = user.campaigns
    if (!characters) {
        return (<h3> No characters found in this location!</h3>)
    }

    const styles = {
        alive: {
            backgroundColor: "#736ba5",
            margin: ".25%"
        },
        inactive: {
            backgroundColor: "gray",
            textDecoration: "line-through",
            margin: ".25%"
        },
        button: {
            backgroundColor: "#C19AB9",
            padding: ".25%",
            margin: ".5%",
            marginTop: "5%",
            width: "7.5rem",
            border: "0px",
            color: "#140600"
        },
    }
    return (
        <>
            {allCharacters.map((character) => {
                return (<>
                    {character.alive ? (
                        <button className='list-group-item mx-2 rounded-pill' style={styles.alive} onClick={() => {
                            const data = { ...character }
                            setCurrentCharacter(data)
                            setShowModal(true)
                        }} key={character._id} >
                            {character.name}
                        </button>) : (
                        <button className='list-group-item mx-2 rounded-pill' style={styles.inactive} onClick={() => {
                            const data = { ...character }
                            setCurrentCharacter(data)
                            setShowModal(true)
                        }} key={character._id} >
                            {character.name}
                        </button>)}
                </>
                )
            })}
            {globalCampaigns.map(campaign => {
                if (campaign._id === currentCampaign.campaignId) {
                    return (
                        <Button className="mx-2 rounded-pill" style={styles.button} onClick={() => {
                            setCurrentCharacter({
                                name: null,
                                alive: true,
                                class: null,
                                level: null,
                                goals: null,
                                personality: null,
                                allies: [],
                                notes: []
                            })
                            setShowModal(true)
                        }}> Add a new Charcater</Button>
                    )
                }
            })}


            <Modal
                size='lg'
                show={showModal}
                onHide={() => setShowModal(false)}
                aria-labelledby="character-modal" >
                < Character locationId={locationId} setShowModal={setShowModal} allCharacters={allCharacters} setAllChars={setAllChars} character={currentCharacter} />
            </Modal>
        </>
    )
}

export default CharacterList