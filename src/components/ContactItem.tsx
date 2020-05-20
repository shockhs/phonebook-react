import React, { FunctionComponent, useEffect, useState } from 'react';
import firebase from '../data/firebase';
import deleteIcon from '../images/delete.svg';
import saveIcon from '../images/save.svg';


interface ContactItem {
    name: string,
    phoneNumber: string,
    uid: string,
    deleteContact: (uid: string) => void
}

const ContactItem: FunctionComponent<ContactItem> = ({ name, phoneNumber, uid, deleteContact }) => {
    const [nameContact, setNameContact] = useState(name);
    const [numberContact, setNumberContact] = useState(phoneNumber);
    const [statusEdit, setStatusEdit] = useState(false);
    const [forceUpdate, setForceUpdate] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        setStatusEdit(false)
        const { currentUser } = firebase.auth();
        const updateTask = async () => {
            if (currentUser) {
                await firebase.database().ref(`/phonebook/${currentUser.uid}/${uid}`)
                    .update({ "name": nameContact, "phoneNumber": numberContact })
                    .catch(() => setError('Something wrong. Try again late'))
            }
        }
        if (nameContact !== name || numberContact !== phoneNumber) updateTask()// eslint-disable-next-line
    }, [forceUpdate]);

    return (
        <div className="bookElements__item">
            <div className="bookElements__item-main">
                {statusEdit
                    ? <div className="bookElements__item-main-view">
                        <label htmlFor="nameInput">Name: </label>
                        <input
                            id="nameInput"
                            type="text"
                            className="bookElements__item-main-label"
                            onChange={(e) => setNameContact(e.currentTarget.value)}
                            value={nameContact} />
                        <label htmlFor="phoneNumberInput">Phone Number: </label>
                        <input
                            id="phoneNumberInput"
                            type="text"
                            value={numberContact}
                            autoFocus={true}
                            onChange={(e) => { setNumberContact(e.currentTarget.value) }} />
                    </div>
                    : <div className="bookElements__item-main-view">
                        <span className="bookElements__item-main-view-span">Name: </span>
                        <label onDoubleClick={() => setStatusEdit(true)}>
                            {nameContact}
                        </label>
                        <span className="bookElements__item-main-view-span">Phone Number: </span>
                        <label onDoubleClick={() => setStatusEdit(true)}>
                            {numberContact}
                        </label>
                    </div>}

                {statusEdit
                    ? <div className="bookElements__item-main-icons">
                        <img src={saveIcon} alt="saveIcon" onClick={() => setForceUpdate(forceUpdate => !forceUpdate)} />
                        <img src={deleteIcon} alt="deleteIcon" onClick={() => deleteContact(uid)} />
                    </div>
                    : null}
            </div>
            {
                error !== ''
                    ? <div className="bookElements__item-error">
                        {error}
                    </div>
                    : null
            }
        </div >
    );
}

export default ContactItem;