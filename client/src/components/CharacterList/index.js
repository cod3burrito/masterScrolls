import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Modal } from 'react-bootstrap'
import Character from '../Character'
const CharacterList = ({ characters }) => {
    const [showModal, setShowModal] = useState(false)
    const [currentCharacter, setCurrentCharacter] = useState('')
    //state for all characters
    //map the characterState
    // const [allCharacter, setAllChars] = useState(characters)
    //in the modal pass it down
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
            {characters.map((character) => {
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
            < Modal
                size='lg'
                show={showModal}
                onHide={() => setShowModal(false)}
                aria-labelledby="character-modal" >
                <Character character={currentCharacter} />
            </Modal>
        </>
    )
}

export default CharacterList