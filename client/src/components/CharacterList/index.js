import React from 'react'
import { Link } from 'react-router-dom'
const CharacterList = ({ characters }) => {
    if (!characters) {
        return (<h3> No characters found in this location!</h3>)
    }
    return (
        <>
            <ul className='list-group list-group-flush'>
                {characters.map((character) => {
                    return (
                        <Link key={character._id} to={`/characters/${character._id}`}>
                            <li className='list-group-item'>{character.name}</li>
                        </Link>

                    )
                })}
            </ul>
        </>
    )
}

export default CharacterList