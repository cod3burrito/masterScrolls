import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Modal } from 'react-bootstrap'
import Character from '../Character'
import { useMutation } from '@apollo/client'
import { EDIT_CHARACTER } from '../../utils/mutations'
const CharacterList = ({ characters }) => {
    const [showModal, setShowModal] = useState(false)
    const [currentCharacter, setCurrentCharacter] = useState('')
    const [allCharacters, setAllChars] = useState(characters)

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
            < Modal
                size='lg'
                show={showModal}
                onHide={() => setShowModal(false)}
                aria-labelledby="character-modal" >
                <Character setShowModal={setShowModal} allCharacters={allCharacters} setAllChars={setAllChars} character={currentCharacter} />
            </Modal>
        </>
    )
}

export default CharacterList