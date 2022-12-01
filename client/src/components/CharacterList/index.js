import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Modal } from 'react-bootstrap'
import Character from '../Character'
import Button from 'react-bootstrap/Button';

const CharacterList = ({ locationId, characters }) => {
    const [showModal, setShowModal] = useState(false)
    const [currentCharacter, setCurrentCharacter] = useState('')
    const [allCharacters, setAllChars] = useState(characters)

    console.log(allCharacters)
    if (!characters) {
        return (<h3> No characters found in this location!</h3>)
    }

    const styles = {
        alive: {
            backgroundColor: "blue"
        },
        inactive: {
            backgroundColor: "red"
        }
    }
    return (
        <>
            {allCharacters.map((character) => {
                return (<>
                    {character.alive ? (
                        <button style={styles.alive} onClick={() => {
                            const data = { ...character }
                            setCurrentCharacter(data)
                            console.log(currentCharacter)
                            setShowModal(true)
                        }} key={character._id} to={`/characters/${character._id}`}>
                            <li style={styles.alive} className='list-group-item'>{character.name}</li>
                        </button>) : (
                        <button style={styles.inactive} onClick={() => {
                            const data = { ...character }
                            setCurrentCharacter(data)
                            console.log(currentCharacter)
                            setShowModal(true)
                        }} key={character._id} to={`/characters/${character._id}`}>
                            <li style={styles.inactive} className='list-group-item'>{character.name}</li>
                        </button>)}
                </>
                )
            })}
            <Button onClick={() => {
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

            < Modal
                size='lg'
                show={showModal}
                onHide={() => setShowModal(false)}
                aria-labelledby="character-modal" >
                <Character locationId={locationId} setShowModal={setShowModal} allCharacters={allCharacters} setAllChars={setAllChars} character={currentCharacter} />
            </Modal>
        </>
    )
}

export default CharacterList