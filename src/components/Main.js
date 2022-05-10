import SpotifyWebApi from "spotify-web-api-node"

import "bootstrap/dist/css/bootstrap.min.css"
import { BrowserRouter as  Router, Link, Route, Routes } from "react-router-dom"
import { useState, useEffect } from "react"
import useAuth from "./useAuth"

import WaitingRoom from "./waitingRoom"
import JoinGroup from "./joinGroup"
import SelectPlaylist from "./selectPlaylist"
import Dashboard from "./Dashboard"
import ListeningRoom from "./ListeningRoom"

const spotifyApi = new SpotifyWebApi({
  clientId: "37ff2a2a358a41f7bf29cb92dde7dc78",
})

export default function Main({ code }) {
  const accessToken = useAuth(code)
  const [leader, setLeader] = useState(false)
  const [playlist, setPlaylist] = useState([])
  const [groupID, setID] = useState(0)

  useEffect(() => {
    if (!accessToken) return
    spotifyApi.setAccessToken(accessToken)
    console.log("token: ", accessToken)
  }, [accessToken])

  const leaderStatus = (val) => {
    setLeader(val)
  }

  const changePlaylist = (list) => {
    setPlaylist(list)
  }

  const setGroupID = (id) => {
    setID(id)
  }

  function ErrorPage(){
    return <Link to="/"> This is not a valid page! Please click this link to return to the home page! </Link>
  }
  
  function Footer(){
    return (
      <p style={styles}> Created by Anthony Li, John Lee, and Mahin Chowdhury </p>
      )
  }
  
  function Header(){
    return (
      <span>
        <p> <a href="/"> Home Page</a> <p style={{'textAlign': 'center'}}> Created by Anthony Li, John Lee, and Mahin Chowdhury</p> </p>
      </span>)
  }

  return ( 
      <div style={{'height': '100%'}}>
        <Header> </Header>
        <Router>
            <Route path='/'
              render={(props) => (<>
                <Dashboard 
                  changeLeader={leaderStatus} 
                  accessToken={accessToken}
                  setGroupID={setGroupID}
                  />
              </>)}
            />
            <Route path={'/listeningRoom'}
                render={(props) => (<>
                  <ListeningRoom accessToken={accessToken} playingTrack={playlist}/>
                </>)}
            />
            <Route path="/playlist"
              render={(props) => (<>
                <SelectPlaylist 
                  leader={leader} 
                  accessToken={accessToken} 
                  changePlaylist={changePlaylist} 
                  groupID={groupID}
                />
              </>)}
            />
            <Route path="/waitingRoom" 
              render={(props) => (<>
                <WaitingRoom 
                  leader={leader} 
                  playlist={playlist}
                  groupID={groupID}
                  /> 
              </>)}
            />
            <Route path="/joinGroup" 
              render={(props) => (<>
                <JoinGroup 
                  status={leaderStatus}
                  setGroupID={setGroupID}
                />
              </>)}
            />
            {/* <Route path="*"  
              render={(props) => (<>
                <ErrorPage/>
              </>)}
            /> */}
        </Router>
        <Footer>

        </Footer>
      </div>
    )
}

const styles = {
  'textAlign': 'center',
  'position': 'relative',
  'bottom': 0,
}