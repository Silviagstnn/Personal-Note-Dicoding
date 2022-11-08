import React from "react";
import { Route, Routes } from "react-router-dom";
import Navigation from "./Navigation";
import HomePage from "../pages/HomePage";
import AddPage from "../pages/AddPage";
import DetailPage from '../pages/DetailPage';
import RegisterPage from "../pages/RegisterPage";
import LoginPage from "../pages/LoginPage";
import {getUserLogged, putAccessToken} from "../utils/api";
import {ThemeProvider} from "../contexts/ThemContext";
import ToggleTheme from "./ToggleTheme";

class NoteApp extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            authedUser: null,
            initializing: true,
            theme: localStorage.getItem('theme') || 'dark',
            toggleTheme: () =>{
                this.setState((prevState) =>{
                    const newTheme = prevState.theme === "dark" ? "light" : "dark"
                    localStorage.setItem('theme', newTheme);
                    return{
                        theme: newTheme
                    };
                });
            }
        };

        this.onLoginSuccess = this.onLoginSuccess.bind(this);
        this.onLogOut = this.onLogOut.bind(this);
    }

    async onLoginSuccess ({accessToken}){
        putAccessToken(accessToken);

        const {data} = await getUserLogged();

        this.setState(() =>{
            return{
                authedUser: data,
            };
        });
    }

    async componentDidMount(){
        const {data} = await getUserLogged();

        this.setState(() =>{
            document.documentElement.setAttribute('data-theme', this.state.theme);
            return{
                authedUser:data,
                initializing: false
            };
        });
    }
     
    componentDidUpdate(prevProps, prevState){
        if(prevState.theme !== this.state.theme){
            document.documentElement.setAttribute('data-theme', this.state.theme);
        }
    }
    onLogOut(){
        this.setState(() =>{
            return{
                authedUser: null
            };
        });

        putAccessToken('');
    }

    render(){
        if(this.state.initializing){
            return null;
        }

        if(this.state.authedUser === null){
            return(
                <ThemeProvider value={this.state}>
                <div className="note-app">
                    <ToggleTheme />
                    <header className="note-app__header">
                        <h1>Aplikasi Catatan Personal</h1>
                    </header>
                    <main>
                        <Routes>
                            <Route path="/*" element={<LoginPage loginSuccess={this.onLoginSuccess}/>} />
                            <Route path="/register" element={<RegisterPage />} />
                        </Routes>
                    </main>
                </div>
                </ThemeProvider>
            )
        }
        return (
            <ThemeProvider value={this.state}>
                <div className="note-app">
                    <ToggleTheme />
                    <header className="note-app__header">
                        <h1>Aplikasi Catatan Personal</h1>
                        <Navigation logout={this.onLogOut} name ={this.state.authedUser.name}/>
                    </header>
                    <main>
                        <Routes>
                            <Route path="/" element = {<HomePage />} />
                            <Route path="/add" element  = { <AddPage />} />
                            <Route path="/notes/:id" element={<DetailPage />} />
                        </Routes>
                    </main>
                </div>
            </ThemeProvider>
        );
    }
}

export default NoteApp;