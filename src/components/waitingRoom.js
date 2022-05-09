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
import io from 'socket.io-client'

const socket = io.connect("https://cloudback.azurewebsites.net/");

export default function WaitingRoom({leader, groupID}) {
    const [startMusic, setStartMusic] = useState(false)

    const start = () => {
        socket.emit("button_pressed", {groupID} )
        console.log("set musics to trueeee21321321", {groupID})
        setStartMusic(true)
    }

    useEffect(() => {
        socket.on("receive_pressed", (data) => {
            console.log("set musics to trueeee")
            setStartMusic(true)
        })
    })

    useEffect(() => {
        socket.emit("join", groupID)
    }, [groupID])

    if(startMusic){
        return <Redirect to={'/listeningRoom'} />
    }
    return (
        <div style={{'textAlign': 'center', 'margin': 'auto'}}> 
            {leader === false && <h1 style={{'textAlign': 'center'}}> Waiting for group leader to start...</h1>}
            {leader === true && 
                <div >
                    <h1 > You are the leader </h1>
                    <p > Now when you group is ready, you may click the "Start" button below <br/> 
                        and we'll generate a playlist to your group's taste. <br/> Enjoy! </p>
                    <button onClick={start}> Start the music! </button>
                </div>
            }
        </div>
    )  
}
