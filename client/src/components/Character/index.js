import React, { useState } from 'react'
import { useMutation } from '@apollo/client'
import { EDIT_CHARACTER } from '../../utils/mutations'
import { Navigate } from 'react-router-dom'
const Character = ({ character, allCharacters, setAllChars, setShowModal }) => {
    // console.log(allCharacters)
    const initialState = { ...character }
    console.log(initialState)
    const [formState, setFormState] = useState(initialState)
    const [isActive, setActive] = useState(true)
    const [AllyField, setAllyField] = useState("none")
    const [NoteField, setNoteField] = useState('none')
    const [editCharacter, { error, data }] = useMutation(EDIT_CHARACTER)

    const handleChange = (event) => {
        // console.log(event.target)
        const { name, value } = event.target;
        console.log(name, value)
        console.log(typeof value)
        setFormState({
            ...formState,
            [name]: value,
        })
        // console.log(formState)



    };
    const toggleEdit = () => {
        setActive(false)
    }
    const handleStatus = (event) => {
        event.preventDefault();
        const charStatus = document.getElementById("alive").value
        console.log(charStatus)
        setFormState({ ...formState, alive: charStatus })
        // console.log(formState)
    }
    const saveAlly = (event) => {
        event.preventDefault()
        const newAllyField = document.getElementById("newAllyInput").value
        const newAlly = newAllyField.split(',')
        const newAllyArray = [...formState.allies, ...newAlly]
        setFormState({ ...formState, allies: newAllyArray })
    }
    const saveNote = (event) => {
        event.preventDefault()
        const newNoteField = document.getElementById("newNoteInput").value
        const newNote = newNoteField.split(',')
        const newNoteArray = [...formState.notes, ...newNote]
        setFormState({ ...formState, notes: newNoteArray })
    }
    // note to self the modal updates, but the list outside of this does not, how traverse files?
    const saveCharacter = async (event) => {
        event.preventDefault()
        console.log(formState)

        const { data } = await editCharacter({
            variables: { characterId: formState._id, ...formState }
        })
        console.log(data)
        // setFormState(data.editCharacter)
        setActive(true)
        setAllyField("none")
        setNoteField("none")
        const updatedCharacters = await allCharacters.map(char => {
            if (char._id === formState._id) {
                console.log("gottem")
                return formState
            }
            return char
        })

        setAllChars(updatedCharacters)
        setShowModal(false)
    }
    const addAlly = () => {
        setAllyField("block")
    }
    const addNote = () => {
        setNoteField("block")

    }
    const styles = {
        padding: {
            padding: "1%"
        }
    }
    return (
        <>
            <div className='card'>
                <h2 className='card-header'> <input name="name" type="text" value={formState.name} disabled={isActive} onChange={handleChange} /></h2>
                <div className='card-body' >
                    <div style={styles.padding}>
                        <label for="class">Class:</label>
                        <input name="class" value={formState.class} disabled={isActive} onChange={handleChange} />
                    </div>
                    <div style={styles.padding}>
                        <label for="level">Level:</label>
                        <input id="level" name="level" type="text" value={formState.level} disabled={isActive} onChange={handleChange} />
                    </div>
                    {/* make below the boolean not input */}
                    <div style={styles.padding}>
                        <label for="alive">Status</label>
                        <input id="alive" name="alive" type="checkbox" value={formState.alive} disabled={isActive} onChange={handleStatus} />
                    </div>
                    <div style={styles.padding}>
                        <label for="goals"> Goals:</label>
                        <input name="goals" value={formState.goals} disabled={isActive} onChange={handleChange} />
                    </div>
                    <br></br>
                    <p> Allies:</p>
                    <ul>
                        {formState.allies.map((ally) => {
                            return (
                                <li><input value={ally} disabled={isActive} onChange={handleChange} /></li>
                            )
                        })}
                    </ul>
                    {/* idea 1 give instructions to seperate by commas, then split */}
                    <button onClick={addAlly} id='allyBtn'>Add Ally</button>
                    <div id="newAllyField" style={{ display: AllyField }}>
                        <label for="newAlly">If more than one Ally, please seperate with a comma</label>
                        <input id="newAllyInput" name="newAlly" ></input>
                        <button onClick={saveAlly}> Save new Ally</button>
                    </div>
                    <p> Notes:</p>
                    <ul>
                        {formState.notes.map((note) => {
                            return (
                                <li> <input value={note} disabled={isActive} onChange={handleChange} /></li>
                            )
                        })}
                    </ul>
                    <button id="noteBtn" onClick={addNote}>Add more notes</button>
                    <div id="newNoteField" style={{ display: NoteField }}>
                        <label for="newNote">Please seperate each notw with a comma</label>
                        <input id="newNoteInput" name="newNote" ></input>
                        <button onClick={saveNote}> Save Notes</button>
                    </div>
                </div>

            </div>
            <button onClick={saveCharacter}>Save</button>
            <button onClick={toggleEdit} id='editBtn'>Edit</button>
        </>
    )
}

export default Character