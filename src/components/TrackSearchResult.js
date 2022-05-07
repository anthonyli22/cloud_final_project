import React from "react"

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
      <img alt="No Pic" src={playlist.images.length !== 0  ? playlist.images[0].url : "http://localhost:3000/frontPage.jpg"} style={{ height: "64px", width: "64px" }} />
      <div className="ml-3">
        <div>{playlist.name}</div>
        <div className="text-muted">{playlist.description}</div>
      </div>
    </div>
  )
}