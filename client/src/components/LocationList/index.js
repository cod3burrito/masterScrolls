import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import CharacterList from '../CharacterList'
import Collapsible from 'react-collapsible'
import Button from 'react-bootstrap/Button';
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
                        <div>
                            <h2>{location.name}</h2>
                        <Button>Edit Location</Button>
                            <Collapsible key={location._id} trigger={"View Characters"}>
                                <ul className='list-group list-group-flush'>
                                    <CharacterList characters={location.characters} />
                                </ul>
                            </Collapsible>
                        </div>   
                        </>
                    )
                })}
            </div>
        </>
    )
}

export default LocationList