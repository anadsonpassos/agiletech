import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiLogIn } from 'react-icons/fi';
import { TiHeartFullOutline } from "react-icons/ti";
import { GoRocket } from "react-icons/go";

import api from '../../services/api';

import './styles.css';

import logoImg from '../../assets/logo.png';
import robosImg from '../../assets/robos.png';

export default function Login() {
    const [id, setId] = useState('');
    const history = useHistory();

    async function handleLogin(e) {
        e.preventDefault();

        try {
            const response = await api.post('sessions', { id });

            localStorage.setItem('clienteId', id);
            localStorage.setItem('clienteName', response.data.name);

              history.push('/profile');
            } catch (err) {
                
                alert( 'Falha no login, tente novamente.' );
        }
    }

    return (
        <div className="login-container">
            <section className="form">
                <img src={logoImg} alt="Ágil Tech" />

                <form onSubmit={handleLogin}>
                    <h1>Faça seu Login! <GoRocket size={40} color="rgb(49, 47, 129)" /></h1>

                    <input 
                        placeholder="Digite seu ID"
                        value={id}
                        onChange={e => setId(e.target.value)}
                    />
                    <button className="button" type="submit">Entrar</button>

                    <Link className="back-link" to="/register">
                        <FiLogIn size={16} color="E02041" />
                        Não tenho cadastro
                    </Link>
                </form>
            </section>

            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.5.0/css/font-awesome.min.css"></link>
            <a class="whatsapp-link" href="https://web.whatsapp.com/send?phone=5511952035844" target="blank">
                <i class="fa fa-whatsapp"></i>
            </a>
    
            <div class="info">
                <p id="saudacao">
                    Com <TiHeartFullOutline size={22} color="E02041" /> <a href="https://www.youtube.com/channel/UCxrNx31B2RlbfZmFZ5FV7zg" target="blank">Agile Tech</a>
                </p>
            </div>
            <img src={robosImg} alt="Robos" />
        </div>
    );
}