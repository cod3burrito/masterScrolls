import React from 'react'
const Character = ({ character }) => {
    return (
        <div className='card'>
            <h2 className='card-header'> {character.name}</h2>
            <div className='card-body'>
                <p>{character.class}</p>
                <p>{character.level}</p>
                <p>{character.alive}</p>
                <p>{character.goals}</p>
                <p> Allies:</p>
                <ul>
                    {character.allies.map((ally) => {
                        return (
                            <li>{ally}</li>
                        )
                    })}
                </ul>
                <p> Notes:</p>
                <ul>
                    {character.notes.map((note) => {
                        return (
                            <li>{note}</li>
                        )
                    })}
                </ul>
                <p></p>
            </div>

        </div>
    )
}

export default Character