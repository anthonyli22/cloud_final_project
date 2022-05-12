import { useState, useEffect } from "react"
import useAuth from "./useAuth"
import Player from "./Player"
import TrackSearchResult from "./TrackSearchResult"
import { Container, Form } from "react-bootstrap"
import SpotifyWebApi from "spotify-web-api-node"
import axios from "axios"
import requests from "requests"
import { Button } from "bootstrap"
import Alert from 'sweetalert2';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import { backendURL, frontendURL, spotifyURL } from "./urls"


export default function Dashboard({ changeLeader, accessToken, setGroupID, setMyData }) {
  const [userData, setUserData] = useState({})
  const [redirectCreate, setRedirectCreate] = useState(false)
  const [redirectJoin, setRedirectJoin] = useState(false)

  const getID = async () => {
    var head = "Bearer " + accessToken
    console.log("accesstoken: ", accessToken)
    let config = {
      headers: {
        "Authorization": head,
        'Content-Type': 'application/json'
      }
    }
    await axios.get(spotifyURL+"me", config)
    .then((resp) => {
      console.log("get me: ", resp)
      setUserData(resp.data)
      setMyData(resp.data)
    })
    .catch((e) => {
      console.log("error me: ", e)
    })
  }

  useEffect(() => {
    getID()
  }, [accessToken])

  const createGroup = (e) => {
    e.preventDefault()
    Alert.fire({
      title: "Creating Group",
      html: 
      `<p> You are about to create a group! <br/> Do you want to proceed? </p>`,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
      showCancelButton: true,
      confirmButtonColor: '#068a2f',
    })
    .then( async (result) => {
      if (result.isConfirmed) {
        console.log("user id: ", userData.id)
        await axios.post(backendURL + "group/create", {
          uid: userData.id
        })
        .then((resp) => {
          console.log("aux create resp: ", resp);
          setGroupID(resp.data['id'])
          changeLeader(true);
          setRedirectCreate(true);
        })
        .catch((e) => {
          console.log("error: ", e)
        })
        
      }
    })
  }

  const setLeader = (e) => {
    e.preventDefault()
    changeLeader(false)
    setRedirectJoin(true)
  }


  if(redirectCreate){
    return <Redirect to="/playlist"/> 
  }
  else if(redirectJoin){
    return <Redirect to={"/joinGroup"}/>
  }
  return (
    <div style={{height: "100vh", "position": "50%", backgroundImage: "url("+frontendURL+'pic1.jpg)'}}>
      <h1  style={{alignContent: "center", textAlign: "center", color: "white", backgroundColor: "black", padding: "0px"}}> The Aux Dashboard Page </h1>
      <Container className="d-flex flex-column py-2" style={{marginTop: "15%" }}>
        <button className="btn btn-success btn-lg" onClick={createGroup} style={{marginBottom: "1%"}}>
          Create a Party group!
        </button>
        <button className="btn btn-success btn-lg" onClick={setLeader}>
          Join a Party group!
        </button>
      </Container>
    </div>
  )
}