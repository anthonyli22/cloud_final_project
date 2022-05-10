import React from "react"
import { Container } from "react-bootstrap"
import img1 from "../pictures/pic1.jpg"

// const clientID = "37ff2a2a358a41f7bf29cb92dde7dc78"
const AUTH_URL =
  "https://accounts.spotify.com/authorize?client_id=37ff2a2a358a41f7bf29cb92dde7dc78&response_type=code&redirect_uri=http://localhost:8080&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state%20user-top-read%20user-follow-read%20playlist-read-private"

export default function Login() {
  return (
    <div style={{'backgroundImage': img1}}>
      <h1 className="d-flex justify-content-center"> Who Got the Aux!? </h1>
      <br/><br/><br/><br/><br/><br/>
      <span className="justify-content-center" style={{'textAlign': 'center'}}>
        <p> Party city is a web application where you can create a group playlist of music using existing playlists that each user already has. </p>
        <p> Then our custom algorithm will rank these songs and play them in order to ensure optimal enjoyment! </p>
      </span>
      <br/><br/><br/><br/><br/><br/>
      <Container
        className="d-flex justify-content-center align-items-center"
      >
        <a className="btn btn-success btn-lg" href={AUTH_URL}>
        Please login with your Spotify account here!
        </a>
      </Container>
      <span>

      </span>
    </div>
  )
}