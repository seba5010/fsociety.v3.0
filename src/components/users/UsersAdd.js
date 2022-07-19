import React from "react";
import Sidebar from "../Sidebar";
import Topbar from "../Topbar";
import { useNavigate } from "react-router-dom";
import config from '../../helpers/config.json';

const UsersAdd = () => {
    let navigate = useNavigate(); 
    const cancel = () => {
        var {usersName, nickname, password, level, active, MDPercentage} = document.forms[0]; 
        var hasChanges = usersName.value.length > 0 ||  nickname.value.length > 0 || password.value.length > 0 || level.value.length > 0 ||
            active.value.length > 0 || MDPercentage.value.length > 0;
        if(hasChanges){
            if(window.confirm("Existen cambios sin guardar. ¿Seguro de querer cancelar?")){
                navigate("/users");
            }
        } else {
            navigate("/users")
        }
    }

    const save = async (event) => {
        event.preventDefault();
        var {usersName, nickname, password, level, active} = document.forms[0];
        var errors = "";
        errors += usersName.value.length === 0 ? "El campo 'Usuario' es obligatorio.\n" : "";
        errors += nickname.value.length === 0 ? "El campo 'Nickname' es obligatorio.\n" : "";
        errors += password.value.length === 0 ? "El campo 'Contraseña' es obligatorio.\n" : "";
        
        if(errors.length > 0){
            window.alert("Corrija los siguientes errores:\n"+errors);
        }
        else {
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json'},
                body: JSON.stringify({ "operatorId": config.operatorId, "name": usersName.value, "nickname": nickname.value, "password": password.value, "level": level.nivel,
                "active": active.value})
              }
              fetch(config.apiURL+"users", requestOptions).then((response) => {
                switch(response.status){
                  case 400:
                    console.log("consulta mal formada");
                    break;
                  case 403:
                    console.log("acceso prohibido");
                    break;
                  default:
                    //
                }
                return response.json();
              }).then((result) => {
                  window.alert("Regitro existoso");
                  navigate("/users");
              })
        }
    }
    return (<div>
            <Topbar />
            <Sidebar />
            <div className="content-wrapper">
                <section className="content-header">
                    <div className="container-fluid">
                        <div className="row mb-2">
                            <div className="col-sm-6">
                                <h1>Incorporación de user</h1>
                            </div>
                            <div className="col-sm-6">
                                <ol className="breadcrumb float-sm-right">
                                    <li className="breadcrumb-item"><a href="/">Cloud Sales</a></li>
                                    <li className="breadcrumb-item"><a href="/users">user</a></li>
                                    <li className="breadcrumb-item active">Agregar</li>
                                </ol>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="content">
                    <div className="card">
                        <div className="card-body">
                            <form onSubmit={save}>
                            <div className="row">
                                <div className="col-12">
                                    <div className="form-group">
                                        <label htmlFor="usersName" className="control-label">Nombre</label>
                                        <input type="text" name="usersName" id="usersName" className="form-control"required />
                                    </div>
                                </div>
                                <div className="col-4">
                                    <div className="form-group">
                                        <label htmlFor="nickname" className="control-label">nickname</label>
                                        <input type="string" name="nickname" id="nickname" className="form-control" required />
                                    </div>
                                </div>
                                <div className="col-4">
                                    <div className="form-group">
                                        <label htmlFor="password" className="control-label">contraseña</label>
                                        <input type="string" name="password" id="password" className="form-control" required />
                                    </div>
                                </div>
                                <div className="col-4">
                                    <div className="form-group">
                                        <label htmlFor="level" className="control-label">Nivel</label>
                                        <select className="form-control" name="nivel" id="nivel">
                                            <option value="seleccione">----seleccione</option>
                                            <option value="admin">admin</option>
                                            <option value="seller">vendedor</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="col-6">
                                    <div className="form-group">
                                        <label htmlFor="active" className="control-label">Active</label>
                                        <input type="string" name="active" id="active" className="form-control" required />
                                    </div>
                                </div>
                                
                            </div>
                            <div className="d-flex justify-content-between">
                                <button type="button" onClick={cancel} className="btn btn-secondary"><i className="fas fa-times"></i> Cancelar</button>
                                <button type="submit" className="btn btn-primary"><i className="fas fa-save"></i> Guardar</button>
                            </div>
                            </form>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    )
}

export default UsersAdd;