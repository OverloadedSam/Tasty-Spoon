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
import Category from './components/Category';
import SignInScreen from "./screens/SignInScreen";
import SignUpScreen from "./screens/SignUpScreen";
import OrderedProductsScreen from "./screens/OrderedProductsScreen";
import FavouritesScreen from "./screens/FavouritesScreen";
import ProfileScreen from "./screens/ProfileScreen";
import ShippingScreen from "./screens/ShippingScreen";
import PaymentMethodScreen from "./screens/PaymentMethodScreen";
import PlaceOrderScreen from "./screens/PlaceOrderScreen";
import OrderScreen from "./screens/OrderScreen";
import AboutUs from "./screens/AboutUs";

function App() {
    return (
        <>
            <Router>
                <div className="App">
                    <NavMenu />
                    <main>
                        <Switch>
                            <Route path="/category/:producttype" component={Category} />
                            <Route path="/productdetails/:id" component={ProductDetailsScreen} />
                            <Route path="/cart/:id?" component={CartScreen} />
                            <Route path="/order/:id" component={OrderScreen} />
                            <Route path="/about" component={AboutUs} />
                            <Route path="/profile" component={ProfileScreen} />
                            <Route path="/favourites" component={FavouritesScreen} />
                            <Route path="/ordereditems" component={OrderedProductsScreen} />
                            <Route path="/shipping" component={ShippingScreen} />
                            <Route path="/payment" component={PaymentMethodScreen} />
                            <Route path="/placeorder" component={PlaceOrderScreen} />
                            <Route path="/signin" component={SignInScreen} />
                            <Route path="/signup" component={SignUpScreen} />
                            <Route path="/grocery" component={Products} />
                            <Route path="/meal" component={Products} />
                            <Route exact path="/" component={HomeScreen} />
                        </Switch>
                    </main>
                    <Footer />
                </div>
            </Router>
        </>
    );
}

export default App;
