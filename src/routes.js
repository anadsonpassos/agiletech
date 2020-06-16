import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import NewProduto from './pages/NewProduto';

export default function() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Login} />
                <Route path="/register" component={Register} />

                <Route path="/profile" component={Profile} />
                <Route path="/produtos/new" component={NewProduto} />
            </Switch>
        </BrowserRouter>
    );
}