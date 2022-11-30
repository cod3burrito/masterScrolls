import React, { useEffect, useState } from 'react'
import { useMutation } from '@apollo/client'
import { EDIT_CHARACTER, CREATE_CHARACTER, DELETE_CHARACTER } from '../../utils/mutations'
import { Navigate } from 'react-router-dom'
const Character = ({ character, allCharacters, setAllChars, setShowModal, locationId }) => {
    // console.log(allCharacters)
    const initialState = { ...character }
    console.log(initialState)
    const [formState, setFormState] = useState(initialState)
    const [isActive, setActive] = useState(true)
    const [AllyField, setAllyField] = useState("none")
    const [NoteField, setNoteField] = useState('none')
    const [createCharacter, { createError, createData }] = useMutation(CREATE_CHARACTER)
    const [editCharacter, { editError, editData }] = useMutation(EDIT_CHARACTER)
    const [deleteCharacter, { deleteError, deleteData }] = useMutation(DELETE_CHARACTER)
    console.log(locationId)
    useEffect(() => {
        setActive(false)
    }, initialState.name == null
    )
    const handleChange = (event) => {
        // console.log(event.target)
        const { name, value } = event.target;
        setFormState({
            ...formState,
            [name]: value,
        })
        console.log(formState)
    };
    const toggleEdit = () => {
        setActive(false)
    }
    const handleStatus = () => {
        const charStatus = document.getElementById("alive").checked
        setFormState({ ...formState, alive: charStatus })
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
    const addAlly = () => {
        setAllyField("block")
    }
    const addNote = () => {
        setNoteField("block")
    }
    const saveCharacter = async (event) => {
        event.preventDefault()
        console.log(formState)

        const { data } = await createCharacter({
            variables: { locationId: locationId, ...formState }
        })
        console.log(data)
        setFormState(data.editCharacter)
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
        window.location.reload()
    }
    // note to self the modal updates, but the list outside of this does not, how traverse files?
    const saveChanges = async (event) => {
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

    const deleteChar = async () => {
        const { data } = await deleteCharacter({
            variables: { locationId: locationId, characterId: formState._id }
        })
        console.log(allCharacters)
        const updatedCharacters = await allCharacters.filter((char) => char._id !== formState._id)

        // console.log(updatedCharacters)
        setAllChars(updatedCharacters)
        setShowModal(false)
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
                        <input id="alive" name="alive" type="checkbox" checked={formState.alive} disabled={isActive} onChange={handleStatus} />
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

            {character.name == null ?
                (<button onClick={saveCharacter}>Save</button>) :
                (<>
                    <button onClick={saveChanges}>Save</button>
                    <button onClick={toggleEdit} id='editBtn'>Edit</button>
                    <button onClick={deleteChar}>Delete</button>
                </>)}

        </>
    )
}

export default Character