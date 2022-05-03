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

var url = 'https://api.spotify.com/v1'
var backendURL = 'http://localhost:3001/'

export default function Dashboard({ changeLeader, accessToken }) {
  const [search, setSearch] = useState("")
  // const [searchResults, setSearchResults] = useState([])
  const [playingTrack, setPlayingTrack] = useState()
  const [lyrics, setLyrics] = useState("")
  const [playlists, setPlaylists] = useState([])
  const [selectedPlaylists, setSelectedPlaylists] = useState([])
  const [userData, setUserData] = useState({})
  const [redirect1, setRedirect1] = useState(false)
  const [redirectCreate, setRedirectCreate] = useState(false)
  const [redirectJoin, setRedirectJoin] = useState(false)
  const [idFlag, setIdFlag] = useState(false)

  const getID = async () => {
    var head = "Bearer " + accessToken
    console.log("accesstoken: ", accessToken)
    let config = {
      headers: {
        "Authorization": head,
        'Content-Type': 'application/json'
      }
    }
    await axios.get(url+"/me", config)
    .then((resp) => {
      console.log("get me: ", resp)
      setUserData(resp.data)
    })
    .catch((e) => {
      console.log("error me: ", e)
    })
  }

  // function chooseTrack(track) {
  //   setPlayingTrack(track)
  //   setSearch("")
  //   setLyrics("")
  // }

  useEffect(() => {
    if (!playingTrack) return

    axios
      .get("http://localhost:3001/lyrics", {
        params: {
          track: playingTrack.title,
          artist: playingTrack.artist,
        },
      })
      .then(res => {
        setLyrics(res.data.lyrics)
      })
  }, [playingTrack])

  const onSubmitRun = async (e) => {
    e.preventDefault()
    if(!accessToken) return
    var head = "Bearer " + accessToken
    console.log("accesstoken: ", accessToken)
    let config = {
      headers: {
        "Authorization": head,
        'Content-Type': 'application/json'
      }
    }
    
    const val = await axios.get("https://api.spotify.com/v1/me/playlists", config
    ).then((resp) => {
      setPlaylists(resp.data.items)
      console.log("resp1: ", resp)
    })
    .catch((e) => {
      console.log("error: ", e)
    })
  }

  const createNewAuxGroup = async (e) => {
    e.preventDefault()
    const val = await axios.post(backendURL + "group/create", {
      uid: userData.id
    })
    .then((resp) => {
      console.log("aux create resp: ", resp);
    })
    .catch((e) => {
      console.log("error: ", e)
    })
  }

  const findAuxGroup = async (e) => {
    var val = document.getElementById("input1").value;
    console.log("find aux: ", val)
    const group = await axios.get(backendURL + "group/find/" + val)
    .then((resp) => {
      console.log("findAuxGroup: ", resp)
      if(resp.data.length === 0){
        Alert.fire({
          title: "Cannot find aux group"
  
        })
        .then((result) => {
          if(result.isConfirmed) {
            document.getElementById("input1").value = "";
          }
        })
      } else {
        console.log("Group found?")
        setRedirect1(true)
      }
    })
    .catch((e) => {
      console.log("error: ", e)
    })
  }

  const addToPlaylist = (playlist) => {
    setSelectedPlaylists([...selectedPlaylists, playlist])
    console.log("playlists:", selectedPlaylists)
  }

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
    .then((result) => {
      if (result.isConfirmed) {
        changeLeader(true);
        setRedirectCreate(true);
      }
    })
  }

  const setLeader = (e) => {
    e.preventDefault()
    changeLeader(false)
    setRedirectJoin(true)
  }

  if(redirect1){
    return <Redirect to="/auxGroup" />
  }
  else if(redirectCreate){
    return <Redirect to="/playlist"/> 
  }
  else if(redirectJoin){
    return <Redirect to={"/joinGroup"}/>
  }
  return (
    <Container className="d-flex flex-column py-2" style={{ height: "100vh" }}>
      <button className="btn btn-success btn-lg" onClick={createGroup}>
        Create a Party group!
      </button>
      <button className="btn btn-success btn-lg" onClick={setLeader}>
        Join a Party group!
      </button>
      {/* <div>
        <Player accessToken={accessToken} trackUri={playingTrack?.uri} />
      </div> */}
    </Container>
  )
}