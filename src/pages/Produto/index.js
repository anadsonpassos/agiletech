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
                    <p>Detalhes do produto para que os nosso clientes conheça mais sobre o produto que vai adquirir.</p>

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
                        placeholder="Descrição"
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                    />
                    <input 
                        placeholder="Valor em reais sem vírgula"
                        value={value}
                        onChange={e => setValue(e.target.value)}
                    />

                    <button className="button" type="submit">Cadastrar</button>
                </form>
            </div>
        </div>
    )
}