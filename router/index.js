const route = require('express').Router();
var admin = require("firebase-admin");
var serviceAccount = require("../firebase/tracklories-backend-firebase-adminsdk-yjl3f-31b7c5c1b6");
const firebase = require('firebase');

const adminFirebase = admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://tracklories-backend.firebaseio.com"
  });

var firebaseConfig = {
    apiKey: "AIzaSyAhZMxe8VilK42jl_dLRC8gswftBbCnHfw",
    authDomain: "tracklories-backend.firebaseapp.com",
    databaseURL: "https://tracklories-backend.firebaseio.com",
    projectId: "tracklories-backend",
    storageBucket: "tracklories-backend.appspot.com",
    messagingSenderId: "634782846056",
    appId: "1:634782846056:web:384fdf14b81f4b48c4ffdd",
    measurementId: "G-V1N67W6QHX"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

route.get('/',(req, res) => {
    res.send('Todo Bien')
})

route.post('/register', async(req, res) => {
    console.log(req.body);
    const email = req.body.email
    const password = req.body.password
    try{
        const registerUser = await firebase.auth().createUserWithEmailAndPassword(email, password)
        const uid = await registerUser.user.uid
        const customToken = await adminFirebase.auth().createCustomToken(uid)
        res.status(200).send({
            customToken, 
            message: "Usuario Registrado"
        })

    } catch(err) {
        console.log(err)
        res.status(500).send({message: "error en el servidor"})
    }
})

route.post('/login', async(req, res) => {
    console.log(req.body);
    const email = req.body.email
    const password = req.body.password
    try{
        const registerUser = await firebase.auth().signInWithEmailAndPassword(email, password)
        const uid = await registerUser.user.uid
        const customToken = await adminFirebase.auth().createCustomToken(uid)
        console.log(customToken)
        res.status(200).send({
            customToken, 
            message: "Usuario Registrado"
        })

    } catch(err) {
        console.log(err)
        console.log(err.message)
        if(err.code === 'auth/user-not-found'){
            res.status(404).send({message: 'This Email do not exist.'})
        } else if (err.code === 'auth/wrong-password'){
            res.status(401).send({message: 'The password is not valid.'})
        } else {
        res.status(500).send({message: err.message})
        }
    }
})

module.exports = route;