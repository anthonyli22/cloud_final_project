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
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';

var url = 'https://api.spotify.com/v1'
var backendURL = 'http://localhost:3001/'

export default function JoinGroup({setGroupID}) {
    const [redirectNext, setRedirectNext] = useState(false)
    const [redirectBack, setRedirectBack] = useState(false)
    var prevPage = "Prev Page"

    const nextRoom = async (e) => {
        e.preventDefault()
        var val = document.getElementById("input2").value;
        console.log("find aux: ", val)
        await axios.get(backendURL + "group/find/" + val)
        .then((resp) => {
            console.log("findAuxGroup: ", resp)
            if(resp.data.length === 0){
                Alert.fire({
                    title: "Cannot find aux group"
            
                })
                .then((result) => {
                    if(result.isConfirmed) {
                        document.getElementById("input2").value = "";
                    }
                }
            )
            } else {
                console.log("Group found?")
                setGroupID(val)
                setRedirectNext(true)
            }
        })
        .catch((e) => {
            console.log("error: ", e)
        })
    }

    const prevRoom = (e) => {
        e.preventDefault()
        setRedirectBack(true)
    }

    if(redirectNext){
        return <Redirect to={"/playlist"}/>
    }
    else if(redirectBack){
        return <Redirect to={"/"}/>
    }
    return (
        <div style={{'textAlign': 'center', 'margin': 'auto'}}> 
            <h1> Join Code Room</h1>
            <p style={{'marginTop': "10%"}}> Please enter your group code. 
                You should've gotten this from the group leader
                <br/>
                If no one has created a group yet, hit the "{prevPage}" button below 
            </p>
            <div>
                <input id="input2" style={{'marginTop': "5%"}}/> <button onClick={nextRoom}> Submit</button>  <br/>

                <button style={{'marginRight': "5%", 'marginTop': "10%"}} className="btn btn-success btn-lg" onClick={prevRoom}> {prevPage} </button>
                <button style={{'marginLeft': "5%", 'marginTop': "10%"}} className="btn btn-success btn-lg" onClick={nextRoom}> Next Page </button>
            </div>
            
        </div>
    )
}
