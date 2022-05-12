import React from "react"
import { Container } from "react-bootstrap"

// const clientID = "37ff2a2a358a41f7bf29cb92dde7dc78"
const AUTH_URL =
  "https://accounts.spotify.com/authorize?client_id=37ff2a2a358a41f7bf29cb92dde7dc78&response_type=code&redirect_uri=http://localhost:8080&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state%20user-top-read%20user-follow-read%20playlist-read-private%20playlist-modify-private%20playlist-modify-public%20playlist-read-collaborative%20user-read-currently-playing"

export default function Login() {
  return (
    <div style={{"backgroundColor": "lightblue", height: "100vh"}}>
      <h1 
        className="d-flex justify-content-center"
        style={{}}
      > 
      Who Got the Aux!? </h1>
      <br/><br/><br/><br/><br/><br/>
      <span className="justify-content-center" style={{'textAlign': 'center'}}>
        <h5> <b> Party city is a web application where you can create a group playlist of music using existing playlists that each user already has. </b> </h5>
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
      <span style={{bottom: 0}}>
        {"_ "}
      </span>
    </div>
  )
}