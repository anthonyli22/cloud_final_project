import "bootstrap/dist/css/bootstrap.min.css"
import Login from "./components/Login"
import Dashboard from "./components/Dashboard"

require("dotenv").config()

const code = new URLSearchParams(window.location.search).get("code")

function App() {
  console.log("code: ", code)
  return code ? <Dashboard code={code} /> : <Login />
}

export default App