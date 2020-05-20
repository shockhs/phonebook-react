import React, { FunctionComponent } from 'react';
import firebase from '../data/firebase';

const Header: FunctionComponent<{ random: number }> = ({ random }) => {

    const handleLogoutClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        event.preventDefault()
        firebase.auth().signOut()
    }

    return (
        <div className="header">
            <h1 className="header__title">Phone Book</h1>
            <h2 className="header__counter">Total count: {random}</h2>
            <div className="header__logout">
                <button onClick={(e) => handleLogoutClick(e)}>Logout</button>
            </div>
        </div>
    );
}

export default Header;