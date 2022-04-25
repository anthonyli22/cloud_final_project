import "bootstrap/dist/css/bootstrap.min.css"
import Login from "./components/Login"
import Dashboard from "./components/Dashboard"
import { BrowserRouter as  Router, Link, Route, Routes } from "react-router-dom"

import AuxGroup from "./components/auxGroup"

const code = new URLSearchParams(window.location.search).get("code")

function App() {
  console.log("code: ", code)
  return ( 
      <div>
        <Router>
          <Routes>
            <Route path='/' element={<FrontPage/>}/>
            <Route path="/auxGroup" element={<AuxGroup/>}/>
            <Route path="*" element={<ErrorPage/>} />
          </Routes>
        </Router>
      </div>
    )
    
}

function FrontPage(){
  return code ? <Dashboard code={code} /> : <Login />
}

function ErrorPage(){
  return <Link to="/"> This is not a valid page! Please click this link to return to the home page! </Link>
}

export default App