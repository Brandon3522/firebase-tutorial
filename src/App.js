import './styles.css';
import { useState } from 'react';
import { app, database } from './firebase.js';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import {
    collection,
    addDoc,
    getDocs,
    doc,
    updateDoc,
    deleteDoc,
    onSnapshot,
    query,
    where,
} from 'firebase/firestore';

// replace createUserWithEmailAndPassword with signInWithEmailAndPassword for sign in functionality

function App() {
    let auth = getAuth();
    const [data, setData] = useState();
    const collectionRef = collection(database, 'users');

    const handleInput = (event) => {
        let newInput = { [event.target.name]: event.target.value };

        // ...data = everything in the previous state ?
        setData({ ...data, ...newInput });
    };

    // query the collection
    const ageQuery = query(collectionRef, where('age', '<', '28'));

    // Create user with email and password
    const createUser = () => {
        createUserWithEmailAndPassword(auth, data.email, data.password)
            .then((response) => {
                console.log(response.user);
            })
            .catch((err) => {
                alert(err.message);
            });
    };

    // Sign in user with email and password
    const signIn = () => {
        signInWithEmailAndPassword(auth, data.email, data.password)
            .then((response) => {
                console.log(response.user);
            })
            .catch((err) => {
                alert(err.message);
            });
    };



    // Send data to the database
    const handleData = () => {
        addDoc(collectionRef, {
            email: data.email,
            password: data.password,
        })
            .then(() => {
                alert('Data Added');
            })
            .catch((err) => {
                alert(err.message);
            });
    };

    // retrieve data from the database
    // retrieves user along with the ID of the users
    const getData = () => {
        getDocs(collectionRef).then((response) => {
            console.log(
                response.docs.map((item) => {
                    return { ...item.data(), id: item.id };
                })
            );
        });
    };

    // listen for realtime updates with onSnapshot
    // tracks when data has changed
    const getSnapshot = () => {
        onSnapshot(collectionRef, (data) => {
            console.log(
                data.docs.map((item) => {
                    return item.data();
                })
            );
        });
    };

    // update data in the database
    // update the user from the database with given ID
    const updateData = () => {
        const docToUpdate = doc(database, 'users', 'Zj9wvCgcIwh2tr8rBmMw');

        updateDoc(docToUpdate, {
            email: 'updatedEmail',
            password: 'password1',
        })
            .then(() => {
                alert('Data updated');
            })
            .catch((err) => {
                alert(err.message);
            });
    };

    // delete data in the database
    // delete the user from the database with the given ID
    const deleteData = () => {
        const docToUpdate = doc(database, 'users', 'Zj9wvCgcIwh2tr8rBmMw');

        deleteDoc(docToUpdate)
            .then(() => {
                alert('Data deleted');
            })
            .catch((err) => {
                alert(err.message);
            });
    };

    return (
        <div className="App">
            <input
                name="email"
                placeholder="Email"
                onChange={(event) => handleInput(event)}
            ></input>
            <input
                name="password"
                placeholder="Password"
                onChange={(event) => handleInput(event)}
            ></input>
            <br></br>
            <br></br>
            <button onClick={createUser}>Create User</button>
            <br></br>
            <br></br>
            <button onClick={signIn}>Sign In</button>
            <br></br>
            <br></br>
            <button onClick={handleData}>Submit Data</button>
            <br></br>
            <br></br>
            <button onClick={getData}>Get Data</button>
            <br></br>
            <br></br>
            <button onClick={updateData}>Update Data</button>
            <br></br>
            <br></br>
            <button onClick={deleteData}>Delete Data</button>
            <br></br>
            <br></br>
            {/* getSnapshot button may not be needed */}
            <button onClick={getSnapshot}>Snapshot Data</button>
            <br></br>
            <br></br>
        </div>
    );
}

export default App;
