import { useState, useEffect } from "react"
import SpotifyPlayer from "react-spotify-web-playback"
import io from 'socket.io-client'
import { backendURL, frontendURL, spotifyURL } from "./urls";

const socket = io.connect(backendURL);

export default function Player({ accessToken, trackUri, groupID, leader }) {
  const [play, setPlay] = useState(false)

  useEffect(() => setPlay(true), [trackUri])

  useEffect(() => {
    socket.emit("join", groupID)
}, [groupID])

  useEffect(() => {
    socket.on("receive_play", (data) => {
      console.log("set musics to trueeee")
      console.log("data ", data)
      setPlay(data.play)
    })
  })

  console.log("access token: ", accessToken)
  if (!accessToken) return null
  return (
    <SpotifyPlayer
      autoPlay={false}
      token={accessToken}
      showSaveIcon
      initialVolume={0.5}
      callback={state => {
        if (!state.isPlaying){
          if(leader){
            socket.emit("play_pressed", {groupID, playStatus: false} )
          }
          // setPlay(false)
        }
        else {
          if(leader){
            socket.emit("play_pressed", {groupID, playStatus: true} )
          }
        }
      }}
      play={play}
      uris={trackUri ? [trackUri] : []}
    />
  )
}