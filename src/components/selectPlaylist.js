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
import { Redirect, Link, useHistory, Navigate } from 'react-router-dom';


export default function SelectPlaylist({ leader }) {
    const [redirect, setRedirect] = useState(false);
    const selected = (e) => {
        e.preventDefault()
        setRedirect(true)
    }
    if (redirect) {
        if(leader){
            return <Navigate to={"/leaderRoom"} />
        }
        else {
            return <Navigate to={"/waitingRoom"} />
        }
    }
    else {
        return (
            <div> 
                <h1> Select Playlist</h1>

                <p> Your Key: </p>

                <form>
                    <input></input>
                    <button onClick={selected}></button>
                </form>
                
                
            </div>
        )       
    }
}
