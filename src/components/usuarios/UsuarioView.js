import React, {useState, useEffect} from 'react';
import { crearUsuario, getUsuario } from '../../services/usuarioService';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';

export const UsuarioView = (props) => {


  const [usuario, setUsuario] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [valoresForm, setValoresForm] = useState([]);
  const {nombre='', email='', estado=''} = valoresForm;


  const listarUsuarios = async () => {
    try{
      Swal.fire({
        allowOutsideClick: false,
        text: 'Cargando...'
      });
      Swal.showLoading();
      const {data} = await getUsuario();
      setUsuario(data);
      Swal.close();
    }catch(error){
      console.log(error);
      Swal.close();
    }
  }

  useEffect(() => {
    listarUsuarios();
  }, []);

  const handleOpenModal= () => {
    setOpenModal(!openModal)
  }

  const handleOnChange = ({target}) => {
    const {name, value} = target;
    setValoresForm({...valoresForm, [name]:value})
  }


  const handleOnSubmit= async (e) => {
    e.preventDefault();
    const usuario ={
        nombre,email,estado
    }
    try{
        Swal.fire({
            allowOutsideClick: false,
            text: 'Cargando...'
        });
        Swal.showLoading();
        const {data}= await crearUsuario(usuario);
        console.log(data);
        Swal.close();
        handleOpenModal();
        listarUsuarios();
    }catch(error){
        console.log(error);
        Swal.close();
        let mensaje;
        if(error && error.response && error.response.data){
            mensaje = error.response.data;
        }else{
            mensaje= 'Ocurrió un error, por favor intente de nuevo';
        }
        Swal.fire('Error',mensaje,'error');
    }

    
}
 
  return (
      <div className="container-fluid mt-3 mb-2">
        <div className='card'>
            <div className='card-header'>
                  <h5 className='card-title'>Usuarios <i class="fa-solid fa-users"></i></h5>
            </div>
            <form>
              <div className='row'>
                <div className='col'>
                  <div className="mb-3">
                    <label className="form-label">Nombre</label>
                    <input type="text" name='nombre'
                      required
                      value={nombre}  
                      onChange={(e) => handleOnChange(e)}
                      className="form-control"/>
                  </div>
                </div><div className='col'>
                  <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input type="text" name='email'
                      required
                      value={email}  
                      onChange={(e) => handleOnChange(e)}
                      className="form-control"/>
                  </div>
                </div>
                <div className='col'>
                  <div className="mb-3">
                    <label className="form-label">Estado</label>
                    <select className='form-select'
                        required
                        value={estado}  
                        onChange={(e) => handleOnChange(e)}
                        name='estado'>
                        <option value=''>--SELECCIONE--</option>
                        <option>Activo</option>
                        <option>Inactivo</option>
                      </select>
                  </div>
                </div>
              </div>
              <div className='row'>
                <div className='col'>
                  <button className='boton2' onSubmit={(e) => handleOnSubmit(e)}>Crear</button>
                  <button className='boton3'>Cancelar</button>
                </div>
              </div>
              <div className='row'>
                <div className='col'>
                  <p></p>
                  <p></p>
                  <p></p>
                </div>
              </div>
            </form>
            <table onSubmit={(e) => handleOnSubmit(e)} className="table table-striped">
              <thead>
                <tr>
                  <th scope="col"></th>
                  <th scope="col">Nombre</th>
                  <th scope="col">Email</th>
                  <th scope="col">Status</th>
                  <th scope="col">Fecha creación</th>
                  <th scope="col">Fecha actualización</th>
                  <th scope="col"></th>
                </tr>
              </thead>
              <tbody>
                {
                  usuario.map((usuario) => {
                    return <tr>
                            <th scope="row"><i class="fa-solid fa-user"></i></th>
                            <td>{usuario.nombre}</td>
                            <td>{usuario.email}</td>
                            <td>{usuario.estado}</td>
                            <td>{usuario.fechaCreacion}</td>
                            <td>{usuario.fechaActualizacion}</td>
                            <td className='editar'><Link to={`usuarios/edit/${usuario._id}`}><i class="fa-solid fa-pen"></i> Editar</Link></td>
                            
                            
                          </tr>
                  })
                }
                
              </tbody>
            </table>
            
        </div>
      </div>
  )
}

