import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import NavMenu from "./components/NavMenu";
import Footer from "./components/Footer";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import HomeScreen from "./screens/HomeScreen";
import Products from "./components/Products";
import ProductDetailsScreen from "./screens/ProductDetailsScreen";
import CartScreen from "./screens/CartScreen";

function App() {
    return (
        <>
            <Router>
                <div className="App">
                    <NavMenu />
                    <main>
                        <Switch>
                            <Route exact path="/" component={HomeScreen} />
                            <Route exact path="/meal" component={Products} />
                            <Route exact path="/grocery" component={Products} />
                            <Route path="/productdetails/:id" component={ProductDetailsScreen} />
                            <Route path="/cart/:id?" component={CartScreen} />
                        </Switch>
                    </main>
                    <Footer />
                </div>
            </Router>
        </>
    );
}

export default App;
