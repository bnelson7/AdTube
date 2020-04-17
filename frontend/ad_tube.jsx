import React from "react"
import ReactDOM from "react-dom"
import Root from './components/root'
import configureStore from './store/store';
import { signup, login, logout } from "./util/session_api_util"

document.addEventListener("DOMContentLoaded", () => {
    const root = document.getElementById("root")
    const store = configureStore()

    
    // let store = {};
    // if (window.currentUser) {
    //     const preloadedState = {
    //         entities: {
    //             users: { [window.currentUser.id]: window.currentUser }
    //         },
    //         session: { id: window.currentUser.id }
    //     };
    //     store = configureStore(preloadedState);
    //     delete window.currentUser;
    // } else {
    //     store = configureStore();
    // }
    
    // testing
    window.signup = signup
    window.login = login
    window.logout = logout
    
    window.getState = store.getState
    window.dispatch = store.dispatch
    
    ReactDOM.render(<Root store={store} />, root)
})