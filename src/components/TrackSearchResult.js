import React from "react"

export default function TrackSearchResult({ playlist, selectPlaylist }) {
  function handlePlay() {
    selectPlaylist(playlist)
  }

  return (
    <div
      className="d-flex m-2 align-items-center"
      style={{ cursor: "pointer", 'alignContent': 'center' }}
      onClick={handlePlay}
    >
      <img alt="No" src={playlist.images[0].url} style={{ height: "64px", width: "64px" }} />
      <div className="ml-3">
        <div>{playlist.name}</div>
        <div className="text-muted">{playlist.description}</div>
      </div>
    </div>
  )
}