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
import { backendURL, frontendURL, spotifyURL } from './urls';

export default function JoinGroup({setGroupID}) {
    const [redirectNext, setRedirectNext] = useState(false)
    const [redirectBack, setRedirectBack] = useState(false)
    var prevPage = "Previous Page"

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
        return <Redirect to={"/dashboard"}/>
    }
    return (
        <div className="d-flex flex-column py-2" style={{'textAlign': 'center', 'margin': 'auto', height: "100vh", backgroundImage: "url("+frontendURL+'pic4.jpg)'}}> 
            <h1> Join Code Room</h1>
            <p style={{'marginTop': "5%"}}> <b> Please enter your group code. 
                You should've gotten this from the group leader
                <br/>
                If no one has created a group yet, hit the "{prevPage}" button below  </b>
            </p>
            <div>
                <input id="input2" style={{'marginTop': "5%"}}/> <button onClick={nextRoom}> Submit</button>  <br/>

                <button style={{'marginTop': "24%",  'marginBottom': "1%" }} className="btn btn-success btn-lg" onClick={prevRoom}> {prevPage} </button>
            </div>
            <div>
                
            </div>
        </div>
    )
}
