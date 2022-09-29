import React from 'react';
import {BrowserRouter as Router,Switch,Route,Redirect} from 'react-router-dom';
import {Header} from './components/ui/Header';
import { EstadoView } from './components/estados/EstadoView';
import { UsuarioView } from './components/usuarios/UsuarioView';
import { MarcaView } from './components/marcas/MarcaView';
import { TipoView } from './components/tipos/TipoView';
import { InventarioView } from './components/inventarios/InventarioView';
import { InventarioUpdate } from './components/inventarios/InventarioUpdate';
import { UsuarioUpdate } from './components/usuarios/UsuarioUpdate';
import { MarcaUpdate } from './components/marcas/MarcaUpdate';
import { TipoUpdate } from './components/tipos/TipoUpdate';
import { EstadoUpdate } from './components/estados/EstadoUpdate';

const App = () => {
    return <Router>
        <Header />
        <Switch>
            <Route exact path='/' component={InventarioView} />
            <Route exact path='/usuarios' component={UsuarioView}/>
            <Route exact path='/marcas' component={MarcaView}/>
            <Route exact path='/tipos' component={TipoView}/>
            <Route exact path='/estados' component={EstadoView}/>
            <Route exact path='/inventarios/edit/:inventarioId' component={InventarioUpdate}/>
            <Route exact path='/usuarios/edit/:usuarioId' component={UsuarioUpdate}/>
            <Route exact path='/marcas/edit/:marcaId' component={MarcaUpdate}/>
            <Route exact path='/tipos/edit/:tipoEquipoId' component={TipoUpdate}/>
            <Route exact path='/estados/edit/:estadoEquipoId' component={EstadoUpdate}/>
            <Redirect to='/' />
        </Switch>
    </Router>
}

export {
    App
}