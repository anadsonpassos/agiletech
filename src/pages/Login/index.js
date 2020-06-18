import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiLogIn } from 'react-icons/fi';

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
                    <h1>Faça seu Login</h1>

                    <input 
                        placeholder="Digite seu melhor email"
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

            <img src={robosImg} alt="Robos" />
        </div>
    );
}