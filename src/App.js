import "./App.css";
import {
  BrowserRouter,
  Routes,
  Route,
  useParams,
  Link,
  useNavigate,
} from "react-router-dom";
import { useState } from "react";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        {/* Routes before Login */}
        <Route
          path="/login"
          element={<Login onLoginUpdate={setIsLoggedIn} />}
        ></Route>
        <Route
          path="/signup"
          element={<Signup onLoginUpdate={setIsLoggedIn} />}
        ></Route>

        {/* Routes after login */}
        {isLoggedIn ? (
          <Route
            path="/logout"
            element={<Logout onLoginUpdate={setIsLoggedIn} />}
          ></Route>
        ) : null}
        {isLoggedIn ? <Route path="/about" element={<About />}></Route> : null}

        {/* Routes for everyone */}

        <Route
          path="/"
          element={
            <Home isLoggedIn={isLoggedIn} onLoginUpdate={setIsLoggedIn} />
          }
        ></Route>
        <Route path="/:pageName" element={<PageNotFound />}></Route>
      </Routes>
    </BrowserRouter>
  );
}
function NavBar() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        height: "80px",
        margin: "16px",
        backgroundColor: "#0005",
        justifyContent: "space-around",
        alignItems: "center",
      }}
    >
      <Link to="/login">Login</Link>
      <Link to="/signup">Signup</Link>
      <Link to="/about">About</Link>
      <Link to="/logout">Logout</Link>
    </div>
  );
}

function Home({ isLoggedIn, onLoginUpdate }) {
  return (
    <>
      {isLoggedIn ? <About></About> : <Login onLoginUpdate={onLoginUpdate} />}
    </>
  );
}
function Login({ onLoginUpdate }) {
  const navigate = useNavigate();
  return (
    <button
      onClick={() => {
        onLoginUpdate(true);
        navigate("/");
      }}
    >
      Login
    </button>
  );
}

function Signup({ onLoginUpdate }) {
  const navigate = useNavigate();
  return (
    <button
      onClick={() => {
        onLoginUpdate(true);
        navigate("/");
      }}
    >
      Signup
    </button>
  );
}

function Logout({ onLoginUpdate }) {
  const navigate = useNavigate();
  return (
    <button
      onClick={() => {
        onLoginUpdate(false);
        navigate("/");
      }}
    >
      Logout
    </button>
  );
}

function About() {
  return <button>About</button>;
}
function PageNotFound() {
  const params = useParams();
  let message = `"${params.pageName}" page not found!`;
  if (params.pageName == "about") {
    message = "You need to be logged in to access this page.";
  }

  return <p>{message}</p>;
}
export default App;
