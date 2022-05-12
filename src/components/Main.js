import SpotifyWebApi from "spotify-web-api-node"

import "bootstrap/dist/css/bootstrap.min.css"
import { BrowserRouter as  Router, Link, Route } from "react-router-dom"
import { useState, useEffect } from "react"
import useAuth from "./useAuth"

import WaitingRoom from "./waitingRoom"
import JoinGroup from "./joinGroup"
import SelectPlaylist from "./selectPlaylist"
import Dashboard from "./Dashboard"
import ListeningRoom from "./ListeningRoom"
import { backendURL, url } from './urls';

const spotifyApi = new SpotifyWebApi({
  clientId: "322ee9f88e3444a5b9e205d03139b939",
})

export default function Main({ code }) {
  const accessToken = useAuth(code)
  const [leader, setLeader] = useState(false)
  const [playlist, setPlaylist] = useState([])
  const [groupID, setID] = useState(0)
  const [userData, setUserData] = useState()

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
  
  function Footer(){
    return (
      <p style={styles}> Created by Anthony Li, John Lee, and Mahin Chowdhury </p>
      )
  }
  
  function Header(){
    return (
      <header
      className="header"
      style={{
        // marginBottom: window.location.pathname == "/login" ? '0' : '5%',
        marginLeft: '0px',
        marginTop: '0px',
        backgroundColor: '#e9f5fd'
      }}
    >
      <h1
        style={{
          marginBottom: '7px',
          marginLeft: '-5%',
          marginTop: '7px',
          fontFamily: 'Arya',
          fontWeight: '450'
        }}
      >
        {"`  "}
      </h1>
    </header>
    )
  }

  return ( 
      <div style={{'height': '100vh'}}>
        {/* <Header> </Header> */}
        <Router>
            <Route path='/'
              render={(props) => (<>
                <Dashboard 
                  changeLeader={leaderStatus} 
                  accessToken={accessToken}
                  setGroupID={setGroupID}
                  setMyData={setUserData}
                  />
              </>)}
            />
            <Route path='/dashboard'
              render={(props) => (<>
                <Dashboard 
                  changeLeader={leaderStatus} 
                  accessToken={accessToken}
                  setGroupID={setGroupID}
                  setMyData={setUserData}
                  />
              </>)}
            />
            <Route path={'/listeningRoom'}
                render={(props) => (<>
                  <ListeningRoom 
                    accessToken={accessToken} 
                    playingTrack={playlist}
                    groupID={groupID}
                    leader={leader}
                  />
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
                  changeSong={changePlaylist} 
                  accessToken={accessToken}
                  userData={userData}
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
  'backgroundColor': "lightblue",
  "height": "5vh",
  "fontFamily": "Lucida Handwriting"
}