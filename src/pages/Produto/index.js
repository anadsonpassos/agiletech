import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

import api from '../../services/api'

import './style.css';

import logoImg from '../../assets/logo.png';

export default function Produto() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [value, setValue] = useState('');

    const history = useHistory();

    const clienteId = localStorage.getItem('clienteId');

    async function handleProduto(e) {
        e.preventDefault();

        const data = {
            title,
            description,
            value,
        };

        try {
           await api.post('produtos', data, {
                headers: {
                    Authorization: clienteId,
                }
            })

          history.push('/profile');
            alert(`Produto cadastrado com sucesso!`);
        } catch (err) {
            console.log(err)
            alert('Erro ao cadastrar caso, tente novamente.');
        }
    }

    return (
        <div className="produto-container">
            <div className="content">
                <section>
                    <img src={logoImg} alt="Ágil Tech" />

                    <h1>Cadastro novo produto</h1>
                    <p>Aqui você raliza o cadastro de produtos, poderá informar detalhes e valores para o seu produto. Vamos em frente!</p>

                    <Link className="back-link" to="/profile">
                        <FiArrowLeft size={16} color="E02041" />
                        Voltar para Home
                    </Link>
                </section>

                <form onSubmit={handleProduto}>
                    <input 
                        placeholder="Título do Produto"
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                    />
                    <textarea 
                        placeholder="Descrição do seu produto"
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                    />
                    <input 
                        placeholder="Valor em reais utilizando pontos ex: 100.15"
                        value={value}
                        onChange={e => setValue(e.target.value)}
                    />

                    <button className="button" type="submit">Cadastrar</button>
                </form>
            </div>
        </div>
    )
}