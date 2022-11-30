import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Modal } from 'react-bootstrap'
import Character from '../Character'
const CharacterList = ({ characters }) => {
    const [showModal, setShowModal] = useState(false)
    const [currentCharacter, setCurrentCharacter] = useState('')

    if (!characters) {
        return (<h3> No characters found in this location!</h3>)
    }
    return (
        <>
            {characters.map((character) => {
                return (
                    <button onClick={() => {
                        const data = { ...character }
                        setCurrentCharacter(data)
                        console.log(currentCharacter)
                        setShowModal(true)
                    }} key={character._id} to={`/characters/${character._id}`}>
                        <li className='list-group-item'>{character.name}</li>
                    </button>

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