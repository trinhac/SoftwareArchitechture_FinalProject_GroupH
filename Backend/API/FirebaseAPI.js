const express = require('express');
const cors = require('cors');
const { initializeApp } = require('firebase/app');
const { getFirestore, collection, getDocs, getDoc, doc, setDoc, addDoc, query, where, updateDoc, deleteDoc, orderBy, startAt, endAt } = require('firebase/firestore/lite');

//----------------------------------------------------------------------------------------------------------//
const firebaseConfig =
{
    apiKey: "AIzaSyA1xJ0gWOtqL1HsKbjFaMRAsivyWwHmhJ0",
    authDomain: "library-softwareengineering.firebaseapp.com",
    databaseURL: "https://library-softwareengineering-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "library-softwareengineering",
    storageBucket: "library-softwareengineering.appspot.com",
    messagingSenderId: "347751562680",
    appId: "1:347751562680:web:e517d4c5b1a25e9873634d",
    measurementId: "G-10ZHBN8ET4"
};
//----------------------------------------------------------------------------------------------------------//
const server = express();
server.use(cors());
server.use(express.json());

const fb = initializeApp(firebaseConfig);
const db = getFirestore(fb);
var bookCollection = collection(db, "Books");
var userCollection = collection(db, "Users");
//-----------------------------------------CRUD For Books---------------------------------------------------//

server.get("/books/id/:id", async (req, res) => {
    var result = await getDoc(doc(bookCollection, req.params.id));
    //result.id
    if (result.exists()) {
        res.status(234).send(result.data());
        console.log(result.data());
        return;
    }
    res.status(567).send(`Cannot find book with ID: ${req.params.id} in the collection Books, check again`);
    console.log(`Cannot find book with ID: ${req.params.id} in the collection Books, check again`);
})
server.get("/books", async (req, res) => {
    try {
        var result = await getDocs(bookCollection);
        var booksData = [];
        result.forEach((document) => {
            booksData.push({ id: document.id, ...document.data() });
        });
        res.send(booksData);
    } catch (error) {
        console.error(error);
        res.status(500).send("Lỗi máy chủ nội bộ");
    }
});

server.get("/books/name/:name", async (req, res) => {
    var result = await getDocs(query(bookCollection, orderBy("BookName", "asc"), startAt(req.params.name), endAt(req.params.name + '\uf8ff')));
    listData = []
    result.forEach((document) => {
        console.log("--");
        console.log(document.data());
        listData.push(document.data());
    })
    res.send(listData);
})

server.post("/books/post", async (req, res) => {
    try {
        await addDoc(bookCollection,
            {
                BookName: req.body.BookName,
                Author: req.body.Author,
                TotalEdition: req.body.TotalEdition,
                PublishYear: req.body.PublishYear,
                description: req.body.description,
                subject_places: req.body.subject_places,
                subject_times: req.body.subject_times,
                subjects: req.body.subjects
            })
            .then(() => {
                console.log(`Added Book: ${req.body.BookName} to the database`);
                res.status(789).send("OK");
            })
    }
    catch (err) {
        console.log(err);
        res.status(567).send("Key fields are unspecified, or wrong format");
    }
})

server.put("/books/update/:name", async (req, res) => {
    var document = await getDocs(query(bookCollection, where("BookName", "==", req.params.name)))
    //console.log(document.empty)
    try {
        await updateDoc(doc(bookCollection, document.docs.at(0).id),
            {
                BookName: req.body.BookName,
                Author: req.body.Author,
                TotalEdition: req.body.TotalEdition,
                PublishYear: req.body.PublishYear,
                description: req.body.description,
                subject_places: req.body.subject_places,
                subject_times: req.body.subject_times,
                subjects: req.body.subjects
            })
            .then(() => {
                console.log(`Updated book ${document.docs.at(0).get("BookName")} to book name: ${req.body.BookName}`);
                res.status(234).send(`Updated book ${document.docs.at(0).get("BookName")} to book name: ${req.body.BookName}`);
            })
    }
    catch (err) {
        console.log(err);
        res.status(567).send(err);
    }
})

server.delete("/delete/:id", async (req, res) => {
    try {
        deleteDoc(doc(bookCollection, req.params.id));
        console.log(`Deleted book with ID: ${req.params.id}!`);
        res.status(234).send(`Deleted book with ID: ${req.params.id}!`);
    }
    catch (err) {
        console.log(err);
        res.status(567).send(err);
    }
})

//----------------------------------------------------------------------------------------------------------//
//----------------------------------------------------------------------------------------------------------//
//-----------------------------------------CRUD For Users---------------------------------------------------//
server.get("/users", async (req, res) => {
    try {
        var result = await getDocs(userCollection);
        var listdata = [];
        result.forEach((document) => {
            console.log(document.data());
            listdata.push(document.data());
        })
        res.send(listdata);
    }
    catch (err) {
        console.log(err);
    }
})

server.get("/users/:name", async (req, res) => {
    try {
        var result = await getDoc(doc(userCollection, req.params.name))
        if (result.exists()) {
            console.log("Found a user with name " + req.params.name);
            console.log(result.data());
            res.status(234).send(result.data());
        }
        else {
            console.log("Unable to find user with name " + req.params.name + " on User Collection, check again!");
            res.status(567).send("Unable to find user with name " + req.params.name + " on User Collection, check again!");
        }
    }
    catch (err) {
        console.log(err);
        res.status(567).send(err);
    }
})

server.post("/users/post/:username", async (req, res) => {
    try {
        var result = await setDoc(doc(userCollection, req.params.username),
            {
                FullName: req.body.FullName,
                Address: req.body.Address,
                Phone: req.body.Phone,
                adminLevel: req.body.adminLevel
            })
            .then(() => {
                console.log("Added user with username " + req.params.username + ", with full name: " + req.body.FullName + ", Address: " + req.body.Address + ", Phone number: " + req.body.Phone + ", Administrator level: " + req.body.adminLevel);
                res.send("Added user with username " + req.params.username + ", with full name: " + req.body.FullName + ", Address: " + req.body.Address + ", Phone number: " + req.body.Phone + ", Administrator level: " + req.body.adminLevel);
            })
    }
    catch (err) {
        console.log("Required JSON fields: FullName, Address, Phone, adminLevel, please specified them");
        res.status(567).send("Required JSON fields: FullName, Address, Phone, adminLevel, please specified them");
    }
})

server.put("/users/update/:username", async (req, res) => {
    try {
        var result = await updateDoc(doc(userCollection, req.params.username),
            {
                FullName: req.body.FullName,
                Address: req.body.Address,
                Phone: req.body.Phone,
                adminLevel: req.body.adminLevel
            })
            .then(() => {
                console.log("Updated user with username: " + req.params.username + " to name: " + req.body.FullName + ", with address: " + req.body.Address + ", phone number: " + req.body.Phone + " and Administrator level: " + req.body.adminLevel);
                res.status(567).send("Updated user with username: " + req.params.username + " to name: " + req.body.FullName + ", with address: " + req.body.Address + ", phone number: " + req.body.Phone + " and Administrator level: " + req.body.adminLevel);
            })
    }
    catch (err) {
        console.log("Cannot find user with username: " + req.params.username);
        res.status(567).send("Cannot find user with username: " + req.params.username);
    }
})

server.delete("/users/delete/:username", async (req, res) => {
    try {
        var result = await deleteDoc(doc(userCollection, req.params.username))
            .then(() => {
                console.log("Deleted user with username: " + req.params.username);
                res.status(234).send("Deleted user with username: " + req.params.username);
            })
    }
    catch (err) {
        console.log("Cannot find user with username: " + req.params.username + ", cannot delete");
        res.status(567).send("Cannot find user with username: " + req.params.username + ", cannot delete");
    }
})


server.listen(8080, () => {
    console.log("Server is online");
});