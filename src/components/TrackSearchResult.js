import React from "react"
import { backendURL, frontendURL } from "./urls"
export default function TrackSearchResult({ songs, selectPlaylist }) {
  // console.log("list1: ", playlist.images)
  function handlePlay() {
    selectPlaylist(songs)
  }

  return (
    <div
      className="d-flex m-2 align-items-center"
      style={{ cursor: "pointer", 'alignContent': 'center' }}
      onClick={handlePlay}
    >
      <img alt="No Pic" src={songs.album.images.length !== 0  ? songs.album.images[0].url : frontendURL+"frontPage.jpg"} style={{ height: "64px", width: "64px" }} />
      <div className="ml-3">
        <div>{songs.name}</div>
        <div>{songs.artists[0].name}</div>
        <div className="text-muted">{songs.preview_url}</div>
      </div>
    </div>
  )
}