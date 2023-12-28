const { getDocs, getDoc, setDoc, updateDoc, deleteDoc, doc } = require('firebase/firestore');
const userCollection = require('./path_to_your_user_collection');

const getUsers = async (req, res) => {
  try {
    const result = await getDocs(userCollection);
    const listdata = [];
    result.forEach((document) => {
      console.log(document.data());
      listdata.push(document.data());
    });
    res.send(listdata);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
};

const getUserByName = async (req, res) => {
  try {
    const result = await getDoc(doc(userCollection, req.params.name));
    if (result.exists()) {
      console.log(`Found a user with name ${req.params.name}`);
      console.log(result.data());
      res.status(234).send(result.data());
    } else {
      console.log(`Unable to find user with name ${req.params.name} on User Collection, check again!`);
      res.status(404).send(`Unable to find user with name ${req.params.name} on User Collection, check again!`);
    }
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
};

const addUser = async (req, res) => {
  try {
    // Add user logic
    // ...

    res.send('User added successfully');
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
};

const updateUser = async (req, res) => {
  try {
    // Update user logic
    // ...

    res.send('User updated successfully');
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
};

const deleteUser = async (req, res) => {
  try {
    // Delete user logic
    // ...

    res.send('User deleted successfully');
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
};

module.exports = {
  getUsers,
  getUserByName,
  addUser,
  updateUser,
  deleteUser,
};