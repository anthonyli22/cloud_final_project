import React from "react"
import { Container } from "react-bootstrap"

// const clientID = "37ff2a2a358a41f7bf29cb92dde7dc78"
const AUTH_URL =
  "https://accounts.spotify.com/authorize?client_id=37ff2a2a358a41f7bf29cb92dde7dc78&response_type=code&redirect_uri=http://localhost:3000&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state%20user-top-read%20user-follow-read%20playlist-read-private"

export default function Login() {
  return (
    <Container
      className="d-flex justify-content-center align-items-center"
      style={{ minHeight: "100vh" }}
    >
      <a className="btn btn-success btn-lg" href={AUTH_URL}>
        Please Login With Spotify first
      </a>
    </Container>
  )
}