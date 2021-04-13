import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import NavMenu from "./components/NavMenu";
import BgHome from "./components/BgHome";

function App() {
    return (
        <div className="App">
            <NavMenu />
            <BgHome />
        </div>
    );
}

export default App;
