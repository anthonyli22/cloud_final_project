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
import { Redirect, Link, useHistory } from 'react-router-dom';


export default function ListeningRoom({accessToken, playingTrack}) {
    // console.log("playing: ", playingTrack)
    return (
        <div style={{'textAlign': 'center'}}> 
            <p style={{marginBottom: "40%"}}> {"_"}</p>
            <span>
                <button style={{marginRight: "50px"}}> money</button>
                <button> tye</button>
            </span>
            <p style={{bottom: 0}}> Listening!!!</p>
            <div>
                <Player accessToken={accessToken} trackUri={playingTrack} />
            </div>
        </div>
    )  
}
