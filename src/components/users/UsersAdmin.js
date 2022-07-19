import React, { useState, useEffect } from "react";
import Sidebar from "../Sidebar";
import Topbar from "../Topbar";
import { Link, useNavigate } from "react-router-dom";
import config from '../../helpers/config.json';

const UsersAdmin = () => {
    let navigate = useNavigate();
    const [rowsData, setRows] = useState(0);
    useEffect(() => {
        updateusers();
    });

    const updateusers = () => {
        const requestOptions = {
            method: 'GET', headers: { 'Content-Type': 'application/json'}
        };
        fetch(config.apiURL+"users/"+config.operatorId, requestOptions).then((response) => {
            return response.json();
        }).then((result) => {
            // this.setState({ usersList: result.data.map((users) => { return users; }) });
            let usersList = result.data.map((users) => { return users; });
            let rowData;
            if(usersList.length === 0){
                rowData = (<tr><td colSpan="4" className="text-center">No existen usuarios</td></tr>);
            } else {
                rowData = usersList.map(p => {
                    let button;
                    if(p.active){
                        button = <button className="btn btn-secondary" onClick={() => disable(p)}><i className="fas fa-eye-slash"></i> Deshabilitar</button>;
                    } else {
                        button = <button className="btn btn-primary" onClick={() => enable(p)}><i className="fas fa-eye"></i> Habilitar</button>;
                    }
                    
                    return (<tr>
                        <td>{p.name}</td><td >{p.nickname}</td><td>{p.password}</td><td>{p.level}</td><td>{p.active}</td>
                        <td className="d-flex justify-content-between">
                            {button}
                            <button className="btn btn-warning" onClick={() => edit(p)}><i className="fas fa-pencil"></i> Editar</button>
                        </td>
                    </tr>); 
                });
            }
            setRows(rowData);
        });
    };

    const disable = (users) => {
        if(window.confirm("¿Está seguro/a de querer deshabilitar:\n"+users.name)){
            const requestOptionsPatch = {
                method: 'PUT', headers: { 'Content-Type': 'application/json'}, body: JSON.stringify({
                    operatorId: config.operatorId,
                    name: users.name,
                    nickname: parseInt(users.nickname),
                    password: parseInt(users.password),
                    level: parseInt(users.level),
                    active: false
                })
            };
            fetch(config.apiURL+"users/"+users.id, requestOptionsPatch).then((response) => {
                return response.json();
            }).then((result) => {
                updateusers();
                window.alert("Deshabilitación completada");
            });   
        }
    }
    const enable = (users) => {
        if(window.confirm("¿Está seguro/a de querer volver a habilitar:\n"+users.name)){
            const requestOptionsPatch = {
                method: 'PUT', headers: { 'Content-Type': 'application/json'}, body: JSON.stringify({
                    operatorId: config.operatorId,
                    userid: users.id,
                    name: users.name,
                    nickname: users.nickname,
                    password: users.password,
                    level: users.level,
                    active: true
                })
            };
            fetch(config.apiURL+"users/"+users.id, requestOptionsPatch).then((response) => {
                return response.json();
            }).then((result) => {
                updateusers();
                window.alert("Habilitación completada")
            });   
        }
    }
    const edit = (users) => {
        let usersData = JSON.stringify(users);
        sessionStorage.setItem("users", usersData);
        navigate("/users/edit");
    }
    
    return (
        <div>
                <Topbar />
                <Sidebar />
                <div className="content-wrapper">
                    <section className="content-header">
                    <div className="container-fluid">
                        <div className="row mb-2">
                            <div className="col-sm-6">
                                <h1>Panel de usuarios</h1>
                            </div>
                            <div className="col-sm-6">
                                <ol className="breadcrumb float-sm-right">
                                    <li className="breadcrumb-item"><a href="/">Cloud Sales</a></li>
                                    <li className="breadcrumb-item active">user</li>
                                </ol>
                            </div>
                        </div>
                    </div>
                    </section>
                    <section className="content">
                        <div className="card">
                            <div className="card-header">
                                <Link to="/users/add" className="btn btn-success"><i className="fas fa-plus"></i> Nuevo</Link>
                            </div>
                            <div className="card-body">
                                <div className="row">
                                    <table className="table">
                                        <thead>
                                            <tr>
                                                <th>nombre</th>
                                                <th>nickname</th>
                                                <th>contraseña</th>
                                                <th>level</th>
                                                <th>active</th>
                                                <th>Acciones</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                                {rowsData}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
    );
}
export default UsersAdmin;