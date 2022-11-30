import React, { useState } from 'react'
import { useMutation } from '@apollo/client'
import { EDIT_CHARACTER } from '../../utils/mutations'
import { Navigate } from 'react-router-dom'
const Character = ({ character, setShowModal }) => {
    // console.log(allCharacters)
    const initialState = { ...character }
    console.log(initialState)
    const [formState, setFormState] = useState(initialState)
    const [isActive, setActive] = useState(true)
    const [AllyField, setAllyField] = useState("none")
    const [NoteField, setNoteField] = useState('none')

    const handleChange = (event) => {
        // console.log(event.target)
        const { name, value } = event.target;
        console.log(typeof (value))
        setFormState({
            // _id: formState._id,
            ...formState,
            [name]: value,
        })
    };
    const [editCharacter, { error, data }] = useMutation(EDIT_CHARACTER)
    const toggleEdit = () => {
        setActive(false)
    }

    // note to self the modal updates, but the list outside of this does not, how traverse files?
    const saveCharacter = async (event) => {
        event.preventDefault()
        const newAllyField = document.getElementById("newAllyInput").value
        const newNoteField = document.getElementById("newNoteInput").value
        const levelInput = parseInt(document.getElementById("level").value)
        console.log(levelInput)
        console.log(newAllyField)
        const newAlly = newAllyField.split(',')
        console.log(newAlly)
        const newNote = newNoteField.split(',')
        const newAllyArray = [...character.allies, ...newAlly]
        const newNoteArray = [...character.notes, ...newNote]
        console.log(newAllyArray)
        // if (newAlly == [""] && newNote == [""]) {
        //     setFormState({ ...character, notes: [...character.notes, ...newNote] })

        // } else if (newNote == [""]) {
        //     setFormState({ ...character, allies: [...character.allies, ...newAlly,] })

        // } else if (newAlly == [""]) {
        //     setFormState({ ...character })
        // } else {
        //     setFormState({ ...character, allies: [...character.allies, ...newAlly,], notes: [...character.notes, ...newNote] })

        // }
        // console.log(formState)
        await setFormState({ ...character, level: levelInput, allies: newAllyArray })
        console.log(formState)
        const { data } = await editCharacter({
            variables: { characterId: character._id, ...formState }
        })
        console.log(data)
        // setFormState(data.editCharacter)
        setActive(true)
        // setAllyField("none")
        // setNoteField("none")
        // const updatedCharacters = await allCharacters.map(char => {
        //     if (char._id === formState._id) {
        //         console.log("gottem")
        //         return formState
        //     }
        //     return char
        // })

        // setAllChars(updatedCharacters)
        // setShowModal(false)
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
                        <input id="level" name="level" type="number" value={formState.level} disabled={isActive} onChange={handleChange} />
                    </div>
                    {/* make below the boolean not input */}
                    <div style={styles.padding}>
                        <label for="alive">Status</label>
                        <input name="alive" type="checkbox" value={formState.alive} disabled={isActive} onChange={handleChange} />
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
                    </div>
                </div>

            </div>
            <button onClick={saveCharacter}>Save</button>
            <button onClick={toggleEdit} id='editBtn'>Edit</button>
        </>
    )
}

export default Character