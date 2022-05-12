import React from "react"
import { Container } from "react-bootstrap"
import { backendURL, frontendURL, spotifyURL } from "./urls";

// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";

import { getAnalytics } from "firebase/analytics";

// TODO: Add SDKs for Firebase products that you want to use

// https://firebase.google.com/docs/web/setup#available-libraries


// Your web app's Firebase configuration

// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {

  apiKey: "AIzaSyAD1pFbfWNlM2MzF-NbzFl5Ef43wFfRrrY",

  authDomain: "cloudfront-bf47f.firebaseapp.com",

  projectId: "cloudfront-bf47f",

  storageBucket: "cloudfront-bf47f.appspot.com",

  messagingSenderId: "542376561364",

  appId: "1:542376561364:web:1a241ada6b1ebc7ec54941",

  measurementId: "G-W5JGVZJ3NT"

};


// Initialize Firebase

const app = initializeApp(firebaseConfig);

const analytics = getAnalytics(app);

// const clientID = "37ff2a2a358a41f7bf29cb92dde7dc78"
const AUTH_URL =
  "https://accounts.spotify.com/authorize?client_id=37ff2a2a358a41f7bf29cb92dde7dc78&response_type=code&redirect_uri=http://localhost:8080&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state%20user-top-read%20user-follow-read%20playlist-read-private%20playlist-modify-private%20playlist-modify-public%20playlist-read-collaborative%20user-read-currently-playing"

export default function Login() {
  return (
    <div style={{backgroundImage: "url("+frontendURL+'arcane.png)', height: "100vh", color: "white"}}>
      <h1 
        className="d-flex justify-content-center"
        style={{paddingTop: "40px", "fontFamily": 'Courier New', fontSize: "100px"}}
      > 
      Who Got the Aux!? </h1>
      <br/><br/><br/><br/><br/><br/>
      <span className="justify-content-center" style={{'textAlign': 'center'}}>
        <h5> <b style={{fontSize: "25px"}}> Who Got the Aux!? </b> is a web application where you can create a group playlist of music using existing playlists that each user already has. </h5>
        <h5> Then our custom algorithm will rank these songs and play them in order to ensure optimal enjoyment! </h5>
      </span>
      <br/><br/><br/><br/><br/><br/>
      <Container
        className="d-flex justify-content-center align-items-center"
        style={{"marginBottom": "25%"}}
      >
        <a className="btn btn-success btn-lg" href={AUTH_URL}>
        Please login with your Spotify account here!
        </a>
      </Container>
    </div>
  )
}