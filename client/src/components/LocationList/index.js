import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import CharacterList from '../CharacterList'
import Collapsible from 'react-collapsible'
const LocationList = ({ locations }) => {
    if (!locations) {
        //this should be impossible since we have a default one made
        return (<h3>No Locations in this campaign yet!</h3>)
    }
    console.log(locations)
    return (
        <>
            <div>
                {locations.map((location) => {
                    return (
                        <>
                            <Collapsible key={location._id} trigger={location.name}>
                                <ul className='list-group list-group-flush'>
                                    <CharacterList characters={location.characters} />
                                </ul>
                            </Collapsible>
                        </>
                    )
                })}
            </div>
        </>
    )
}

export default LocationList