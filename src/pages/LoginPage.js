import React from "react";
import Proptypes from 'prop-types';
import { Link } from "react-router-dom";
import LoginInput from "../components/LoginInput";
import { login } from "../utils/api";

function LoginPage({loginSuccess}){
    async function onLogin({email, password}){
        const {error, data} = await login({email, password});

        if(!error){
            loginSuccess(data);
        }
    }

    return(
        <section className="login-page">
            <h2>Silahkan Masuk untuk Melanjutkan...</h2>
            <LoginInput login={onLogin} />
            <p>Belum punya akun? <Link to="/register">Daftar dulu</Link></p>
        </section>
    );

}

LoginPage.propTypes ={
    loginSuccess:Proptypes.func.isRequired,
}

export default LoginPage;