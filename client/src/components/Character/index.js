import React, { useEffect, useState, useContext } from 'react'
import { useMutation } from '@apollo/client'
import UserContext from '../../utils/UserContext'
import { EDIT_CHARACTER, CREATE_CHARACTER, DELETE_CHARACTER } from '../../utils/mutations'
import { Navigate, useParams } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashCan } from '@fortawesome/free-solid-svg-icons'
//have check to see if the person viewing is the owner or not using Auth and global state
const Character = ({ character, allCharacters, setAllChars, setShowModal, locationId }) => {
    // console.log()
    const { user } = useContext(UserContext)
    // console.log(user.campaigns)
    const globalCampaigns = user.campaigns
    const currentCampaign = useParams()
    // console.log(currentCampaign)

    const initialState = { ...character }
    const [formState, setFormState] = useState(initialState)
    let initialStatus;

    if (initialState.name == null) {
        initialStatus = false
    } else {
        initialStatus = true
    }
    const [isActive, setActive] = useState(initialStatus)
    const [AllyField, setAllyField] = useState("none")
    const [NoteField, setNoteField] = useState('none')
    const [createCharacter, { createError, createData }] = useMutation(CREATE_CHARACTER)
    const [editCharacter, { editError, editData }] = useMutation(EDIT_CHARACTER)
    const [deleteCharacter, { deleteError, deleteData }] = useMutation(DELETE_CHARACTER)

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormState({
            ...formState,
            [name]: value,
        })
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

        const { data } = await createCharacter({
            variables: { locationId: locationId, ...formState }
        })
        setFormState(data.createCharacter)
        setActive(true)
        setAllyField("none")
        setNoteField("none")
        setAllChars([...allCharacters, { ...formState }])
        setShowModal(false)
    }
    // note to self the modal updates, but the list outside of this does not, how traverse files?
    const saveChanges = async (event) => {
        event.preventDefault()

        const { data } = await editCharacter({
            variables: { characterId: formState._id, ...formState }
        })
        // setFormState(data.editCharacter)
        setActive(true)
        setAllyField("none")
        setNoteField("none")
        const updatedCharacters = await allCharacters.map(char => {
            if (char._id === formState._id) {
                return formState
            }
            return char
        })

        setAllChars(updatedCharacters)
        setShowModal(false)
    }
    const removeAlly = async (event) => {
        const targetAlly = parseInt(event.target.parentElement.dataset.allyNum)
        console.log(targetAlly)
        const updatedAllies = await formState.allies.filter((ally, index) =>
            index !== targetAlly
        )
        setFormState({ ...formState, allies: [...updatedAllies] })
    }
    const removeNote = async (event) => {

        const targetNote = event.target.parentElement.dataset.noteNum
        const updatedNotes = await formState.notes.filter((note, index) =>
            index != targetNote
        )
        setFormState({ ...formState, notes: [...updatedNotes] })
    }
    const deleteChar = async () => {
        const { data } = await deleteCharacter({
            variables: { locationId: locationId, characterId: formState._id }
        })
        const updatedCharacters = await allCharacters.filter((char) => char._id !== formState._id)

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
                <div>
                    <h2 className='card-header'> <input name="name" type="text" value={formState.name} disabled={isActive} onChange={handleChange} /></h2>
                </div>
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
                        {formState.allies.map((ally, index) => {
                            if (isActive) {
                                return (
                                    < li ><input value={ally} disabled={isActive} onChange={handleChange} /></li>
                                )
                            } else {
                                return (

                                    < li ><input value={ally} disabled={isActive} onChange={handleChange} /><FontAwesomeIcon style={{ cursor: "pointer" }} data-allyNum={index} onClick={removeAlly} icon={faTrashCan} /></li>
                                )
                            }
                        })}
                    </ul>
                    <button disabled={isActive} onClick={addAlly} id='allyBtn'>Add Ally</button>
                    <div id="newAllyField" style={{ display: AllyField }}>
                        <label for="newAlly">If more than one Ally, please seperate with a comma</label>
                        <input id="newAllyInput" name="newAlly" ></input>
                        <button onClick={saveAlly}> Save new Ally</button>
                    </div>
                    <p> Notes:</p>
                    <ul>
                        {formState.notes.map((note, index) => {
                            if (isActive) {
                                return (
                                    <li> <input value={note} disabled={isActive} onChange={handleChange} /></li>
                                )
                            } else {
                                return (
                                    <li> <input value={note} disabled={isActive} onChange={handleChange} /><FontAwesomeIcon style={{ cursor: "pointer" }} data-noteNum={index} onClick={removeNote} icon={faTrashCan} /></li>
                                )
                            }
                        })}
                    </ul>
                    <button disabled={isActive} id="noteBtn" onClick={addNote}>Add more notes</button>
                    <div id="newNoteField" style={{ display: NoteField }}>
                        <label for="newNote">Please seperate each notw with a comma</label>
                        <input id="newNoteInput" name="newNote" ></input>
                        <button onClick={saveNote}> Save Notes</button>
                    </div>
                </div>

            </div>

            {
                character.name == null ?
                    (<button onClick={saveCharacter}>Save</button>) :
                    (<>

                        {globalCampaigns.map(campaign => {
                            if (campaign._id === currentCampaign.campaignId) {
                                return (
                                    <>
                                        <button onClick={saveChanges}>Save</button>
                                        <button onClick={toggleEdit} id='editBtn'>Edit</button>
                                        <button onClick={deleteChar}>Delete</button>
                                    </>
                                )
                            } else {
                                return (<></>)
                            }
                        })}

                    </>)
            }

        </>
    )
}

export default Character