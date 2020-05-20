import React, { FunctionComponent, useState } from 'react';

interface createForm {
    updateContactList: (name: string, phoneNumber: string) => void
}

const CreateContactForm: FunctionComponent<createForm> = ({ updateContactList }) => {

    const [nameContact, setNameContact] = useState<string>('');
    const [numberContact, setNumberContact] = useState<string>('');

    const handleClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        event.preventDefault();
        updateContactList(nameContact, numberContact);
        setNameContact('');
        setNumberContact('');
    }

    return (
        <div className="inputForm">
            <div className="inputForm__field">
                <input
                    required
                    type="text"
                    value={nameContact}
                    onChange={(e) => setNameContact(e.currentTarget.value)}
                />
                <label>Name:</label>
                <span></span>
            </div>
            <div className="inputForm__field">
                <input
                    required
                    type="text"
                    value={numberContact}
                    onChange={(e) => setNumberContact(e.currentTarget.value)}
                />
                <label>Phone Number:</label>
                <span></span>
            </div>
            <button className="inputForm__button" onClick={(e) => handleClick(e)}>Add Contact</button>
        </div>
    );
}

export default CreateContactForm;