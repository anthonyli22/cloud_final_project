import "bootstrap/dist/css/bootstrap.min.css"
import Login from "./components/Login"
import Main from "./components/Main"

const code = new URLSearchParams(window.location.search).get("code")

function App() {
  return code ? <Main code={code}/> : <Login />
}

export default App