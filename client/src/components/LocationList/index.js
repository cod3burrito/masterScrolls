import React from 'react'
import { Link } from 'react-router-dom'
import CharacterList from '../CharacterList'
const LocationList = ({ locations }) => {
    if (!locations) {
        //this should be impossible since we have a default one made
        return (<h3>No Locations in this campaign yet!</h3>)
    }
    console.log(locations)
    const collapsibleList = () => {
        var coll = document.getElementsByClassName("collapsible");
        for (let i = 0; i < coll.length; i++) {
            coll[i].addEventListener("click", function () {
                this.classList.toggle("active");
                var content = this.nextElementSibling;
                if (content.style.display === "block") {
                    content.style.display = "none"
                } else {
                    content.style.display = "block"
                }
            })
        }
    }
    return (
        <>
            <div>
                {locations.map((location) => {
                    return (
                        <div className='card mb-3 ' style={{ width: "18rem" }}>
                            <button type='button' className='collapsible'><h3>{location.name}</h3><br /><span>{location.details}</span></button>
                            <CharacterList className="content" characters={location.characters} />
                        </div>)
                })}
            </div>
        </>
    )
}

export default LocationList