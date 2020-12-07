import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiPower, FiTrash2 } from 'react-icons/fi';
import { IoMdHappy, IoIosEye } from "react-icons/io";

import api from '../../services/api';

import './style.css';

import logoImg from '../../assets/logo.png';

export default function Profile() {
    const [produtos, setProdutos] = useState([]);

    const history = useHistory();

    const clienteId = localStorage.getItem('clienteId');
    const clienteName = localStorage.getItem('clienteName');

    useEffect(() => {
        api.get('profile', {
            headers: {
                Authorization: clienteId,
            }
        }).then(response => {
            setProdutos(response.data);
        })
    }, [clienteId]);

    async function handleDeleteProduto(id) {
        try {
            await api.delete(`produtos/${id}`, {
                headers: {
                    Authorization: clienteId,
                }
            });

          setProdutos(produtos.filter(produto => produto.id !== id));
        } catch (err) {
            alert('Erro ao deletar caso, tente novamente.')
        }
    }

    function handleLogout() {
        localStorage.clear();

        history.push('/');
    }

    return (
        <div className="profile-container">
            <header>
                <img src={logoImg} alt="Ágile Tech" />
                <span>Bem vindo(a), {clienteName}! <IoMdHappy size={35} color="rgb(49, 47, 129)" /></span>

                <Link className="button" to="/produtos">Cadastrar novo produto</Link>
                <button onClick={handleLogout} type="button">
                    <FiPower size={18} color="E02041" />
                </button>
            </header>

                <h1>Suas receitas cadastradas! <IoIosEye size={40} color="rgb(49, 47, 129)" /></h1>

            <ul>
               {produtos.map(produto => (
                   <li key={produto.id}>

                       <strong>NOME DA RECEITA:</strong>
                       <p>{produto.title}</p>
    
                       <strong>DESCRIÇÃO DA RECEITA:</strong>
                       <p>{produto.description}</p>
    
                       <strong>VALOR MÉDIO DA RECEITA:</strong>
                       <p>{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(produto.value)}</p>
    
                       <button onClick={() => handleDeleteProduto(produto.id)} type="button">
                           <FiTrash2 size={20} color="#a8a8b3" />
                       </button>
                   </li>
                ))}
            </ul>
        </div>
    );
}