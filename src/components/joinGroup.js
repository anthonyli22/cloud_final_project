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


export default function joinGroup() {
    return (
        <div> 
            <h1> Join Code Room</h1>
            <p> Please enter your group code. 
                You should've gotten this from the group leader

                If no one has created a group yet, hit the “return” 
                button below 
            </p>
            <input>
            
            </input>

            <a className="btn btn-success btn-lg" href="/"> Return to previous page </a>
            <a className="btn btn-success btn-lg" href="/playlist" > Next Page </a>
        </div>
    )
}
