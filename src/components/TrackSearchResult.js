import React from "react"

const url = "http://localhost:5000/"

export default function TrackSearchResult({ playlist, selectPlaylist }) {
  // console.log("list1: ", playlist.images)
  function handlePlay() {
    selectPlaylist(playlist)
  }

  return (
    <div
      className="d-flex m-2 align-items-center"
      style={{ cursor: "pointer", 'alignContent': 'center' }}
      onClick={handlePlay}
    >
      <img alt="No Pic" src={playlist.images.length !== 0  ? playlist.images[0].url : url + "frontPage.jpg"} style={{ height: "64px", width: "64px" }} />
      <div className="ml-3">
        <div>{playlist.name}</div>
        <div className="text-muted">{playlist.description}</div>
      </div>
    </div>
  )
}