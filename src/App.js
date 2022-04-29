import "bootstrap/dist/css/bootstrap.min.css"
import Login from "./components/Login"
import Dashboard from "./components/Dashboard"
import { BrowserRouter as  Router, Link, Route, Routes } from "react-router-dom"
import { useState, useEffect } from "react"


import AuxGroup from "./components/auxGroup"
import WaitingRoom from "./components/waitingRoom"
import JoinGroup from "./components/joinGroup"
import SelectPlaylist from "./components/selectPlaylist"

const code = new URLSearchParams(window.location.search).get("code")

function App() {
  const [leader, setLeader] = useState(false)

  const leaderStatus = (val) => {
    setLeader(val)
  }
  console.log("code: ", code)
  return ( 
      <div>
        <Header> </Header>
        <Router>
          <Routes>
            <Route path='/' element={<FrontPage/>}/>
            <Route path="/auxGroup" element={<AuxGroup/>}/>
            <Route path="/playlist" element={<SelectPlaylist/>}/>
            <Route path="/waitingRoom" element={<WaitingRoom leader={leader} />} />
            <Route path="/joinGroup" element={<JoinGroup status={leaderStatus}/>} />
            <Route path="*" element={<ErrorPage/>} />
            
          </Routes>
        </Router>
        <Footer>

        </Footer>
      </div>
    )
    
}

function FrontPage(){
  return code ? <Dashboard code={code} /> : <Login />
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

const styles = {
  'textAlign': 'center',
  'position': 'relative',
  'bottom': 0,
}
export default App