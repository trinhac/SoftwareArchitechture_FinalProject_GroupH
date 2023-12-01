const express = require("express")
const cors = require('cors')
const admin = require('firebase-admin')
const credentials = require("../key.json")
const app = express()
app.use(express.json())
app.use(cors())

admin.initializeApp({
    credential: admin.credential.cert(credentials)
});
const db = admin.firestore();
app.use(express.urlencoded({ extended: true }));

app.post("/create", async (req, res) => {
    try {
        const id = req.body.Bookid;
        const bookJson = {
            id: req.body.Bookid,
            name: req.body.Bookname,
            author: req.body.Author,
            hasLibraryCard: Boolean(req.body.hasLibraryCard)
        };
        const response = await db.collection("books").add(bookJson);
        res.send(bookJson);
    } catch (error) {
        console.error("Error adding book:", error);
        res.status(500).send({ error: "Failed to add book" });
    }
});

app.listen(3000, () => console.log("Connecting 3000"));