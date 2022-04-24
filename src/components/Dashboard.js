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


const spotifyApi = new SpotifyWebApi({
  clientId: "37ff2a2a358a41f7bf29cb92dde7dc78",
})

var url = 'https://api.spotify.com/v1'

var backendURL = 'http://localhost:3001/'

export default function Dashboard({ code }) {
  const accessToken = useAuth(code)
  const [search, setSearch] = useState("")
  // const [searchResults, setSearchResults] = useState([])
  const [playingTrack, setPlayingTrack] = useState()
  const [lyrics, setLyrics] = useState("")
  const [playlists, setPlaylists] = useState([])
  const [selectedPlaylists, setSelectedPlaylists] = useState([])
  const [userData, setUserData] = useState({})
  
  const getID = async () => {
    const val = await axios.get(url+"/me")
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
    getID()
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

  useEffect(() => {
    if (!accessToken) return
    spotifyApi.setAccessToken(accessToken)
  }, [accessToken])

  // useEffect(() => {
  //   if (!search) return setSearchResults([])
  //   if (!accessToken) return
  //   let cancel = false
  //   spotifyApi.searchTracks(search).then(res => {
  //     if (cancel) return
  //     console.log("res: ", res)
  //     console.log("setting search results")
  //     setSearchResults(
  //       res.body.tracks.items.map(track => {
  //         const smallestAlbumImage = track.album.images.reduce(
  //           (smallest, image) => {
  //             if (image.height < smallest.height) return image
  //             return smallest
  //           },
  //           track.album.images[0]
  //         )

  //         return {
  //           artist: track.artists[0].name,
  //           title: track.name,
  //           uri: track.uri,
  //           albumUrl: smallestAlbumImage.url,
  //         }
  //       })
  //     )
  //   })

  //   return () => (cancel = true)
  // }, [search, accessToken])

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

  return (
    <Container className="d-flex flex-column py-2" style={{ height: "100vh" }}>
      <button style={{"height": '50px'}} onClick={onSubmitRun}> Click to see your playlists </button>
      <button style={{"height": '50px'}} onClick={createNewAuxGroup}> Create a new Aux group </button>
      <input id="input1" style={{"height": '50px'}} />
      <button onClick={findAuxGroup}> Submit</button>
      {/* <Form.Control
        type="search"
        placeholder="Search Your Playlists"
        value={search}
        onChange={e => setSearch(e.target.value)}
      /> */}
      <div className="flex-grow-1 my-2" style={{ overflowY: "auto" }}>
        {playlists.map(playlist => (
          <TrackSearchResult
            playlist={playlist}
            selectPlaylist={addToPlaylist}
          />
        ))}
        {playlists.length === 0 && (
          <div className="text-center" style={{ whiteSpace: "pre" }}>
            No PlayLists
          </div>
        )}
      </div>
      <div>
        <Player accessToken={accessToken} trackUri={playingTrack?.uri} />
      </div>
    </Container>
  )
}