import _ from 'lodash';
import React, { FunctionComponent, useCallback, useEffect, useState } from 'react';
import firebase from '../data/firebase';
import ContactItem from './ContactItem';
import CreateContactForm from './CreateContactForm';
import Header from './Header';
import SearchContact from './SearchContact';


type bookElement = {
    uid: string,
    name: string,
    phoneNumber: string
}

const MainPage: FunctionComponent = () => {

    const [phoneBook, setPhoneBook] = useState<Array<bookElement>>([]);
    const [nameContact, setNameContact] = useState('');
    const [numberContact, setNumberContact] = useState('');
    const [forceUpdate, setForceUpdate] = useState(false);
    const [deleteUid, setDeleteUid] = useState('');
    const [searchName, setSearchName] = useState('');

    useEffect(() => {
        const { currentUser } = firebase.auth();
        const createTask = async () => {
            if (currentUser) {
                await firebase.database().ref(`/phonebook/${currentUser.uid}`)
                    .push({ "name": nameContact, "phoneNumber": numberContact })
                    .then(() => {
                        setNameContact('');
                        setNumberContact('');
                        setForceUpdate(forceUpdate => !forceUpdate);
                    })
            }
        }
        const deleteTask = async () => {
            if (currentUser) {
                await firebase.database().ref(`/phonebook/${currentUser.uid}/${deleteUid}`)
                    .remove()
                    .then(() => {
                        setDeleteUid('');
                        setForceUpdate(forceUpdate => !forceUpdate);
                    })
            }
        }
        if (nameContact !== '' && numberContact !== '') createTask()
        else if (deleteUid !== '') deleteTask()// eslint-disable-next-line
    }, [nameContact, deleteUid]);

    useEffect(() => {
        const { currentUser } = firebase.auth()
        if (currentUser) {
            firebase.database().ref(`/phonebook/${currentUser.uid}`)
                .on('value', list => {
                    setPhoneBook(_.map(list.val(), (val, uid) => { return { ...val, uid } }))
                });
        }
    }, [forceUpdate])

    const updateContactList = useCallback((name: string, phoneNumber: string) => {
        setNumberContact(phoneNumber)
        setNameContact(name);
    }, [])

    const handleChangeSearch = (nameSearching: string) => {
        setSearchName(nameSearching.toLowerCase());
    }

    const handleDeleteContact = useCallback((uid: string) => {
        setDeleteUid(uid);
    }, [])

    return (
        <div className="container">
            <Header random={phoneBook.length} />
            <div className="mainPage">
                <div className="bookElements">
                    <SearchContact searchName={searchName} handleChangeSearch={handleChangeSearch} />
                    {phoneBook.length
                        ? phoneBook.filter((item) => {
                            var searchVal = item.name.toLowerCase()
                            if (searchVal.indexOf(searchName) !== -1) {
                                return item
                            }
                        }).map(item => {
                            return <ContactItem
                                key={item.uid}
                                deleteContact={handleDeleteContact}
                                phoneNumber={item.phoneNumber}
                                uid={item.uid}
                                name={item.name} />
                        })
                        : null
                    }
                    <CreateContactForm updateContactList={updateContactList} />
                </div>
            </div>
        </div>
    );
}

export default MainPage;