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


export default function WaitingRoom({leader}) {
    return (
        <div> 
            {leader === true && <h1 style={{'textAlign': 'center'}}> Waiting for group leader to start...</h1>}
            {leader === false && <h1 style={{'textAlign': 'center'}}> You are the leader </h1>}
        </div>
    )  
}
