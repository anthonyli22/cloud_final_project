import "bootstrap/dist/css/bootstrap.min.css"
import Login from "./components/Login"
import Main from "./components/Main"
// import { BrowserRouter as  Router, Link, Route, Routes } from "react-router-dom"
// import { useState, useEffect } from "react"
// import useAuth from "./components/useAuth"


// import AuxGroup from "./components/auxGroup"
// import WaitingRoom from "./components/waitingRoom"
// import JoinGroup from "./components/joinGroup"
// import SelectPlaylist from "./components/selectPlaylist"

const code = new URLSearchParams(window.location.search).get("code")

function App() {
  return code ? <Main code={code}/> : <Login />
}

export default App