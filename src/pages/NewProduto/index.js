import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

import api from '../../services/api'

import './style.css';

import logoImg from '../../assets/logo.png';

export default function NewProduto() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [value, setValue] = useState('');

    const history = useHistory();

    const ClienteId = localStorage.getItem('ClienteId')

    async function handleNewProduto(e) {
        e.preventDefault();

        const data = {
            title,
            description,
            value,
        };

        try {
            await api.post('produtos', data, {
                headers: {
                    Authorization: ClienteId,
                }
            })

          history.push('/profile')  
        } catch (err) {
            alert('Erro ao cadastrar caso, tente novamente.');
        }
    }

    return (
        <div className="new-produto-container">
            <div className="content">
                <section>
                    <img src={logoImg} alt="Ágil Tech" />

                    <h1>Cadastro novo produto </h1>
                    <p>Detalhes do produto para que os nosso clientes conheça mais sobre o produto que vai adquirir.</p>

                    <Link className="back-link" to="/profile">
                        <FiArrowLeft size={16} color="E02041" />
                        Voltar para Home
                    </Link>
                </section>

                <form onSubmit={handleNewProduto}>
                    <input 
                        placeholder="Título do Produto"
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                    />
                    <textarea 
                        placeholder="Descrição"
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                    />
                    <input 
                        placeholder="Valor em reais"
                        value={value}
                        onChange={e => setValue(e.target.value)}
                    />

                    <button className="button" type="submit">Cadastrar</button>
                </form>
            </div>
        </div>
    )
}