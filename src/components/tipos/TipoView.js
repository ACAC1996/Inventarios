import React, {useState, useEffect} from 'react';
import { getTipoEquipo, crearTipoEquipo } from '../../services/tipoEquipoService';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';

export const TipoView = (props) => {
  const [tiposEquipo, setTiposEquipo] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [valoresForm, setValoresForm] = useState([]);
  const {nombre='', estado=''} = valoresForm;

  const listarTiposEquipo = async () => {
    try{
      Swal.fire({
        allowOutsideClick: false,
        text: 'Cargando...'
      });
      Swal.showLoading();
      const {data} = await getTipoEquipo();
      setTiposEquipo(data);
      Swal.close();
    }catch(error){
      console.log(error);
      Swal.close();
    }
  }

  useEffect(() => {
    listarTiposEquipo();
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
    const tipoEquipo ={
        nombre,estado
    }
    try{
        Swal.fire({
            allowOutsideClick: false,
            text: 'Cargando...'
        });
        Swal.showLoading();
        const {data}= await crearTipoEquipo(tipoEquipo);
        console.log(data);
        Swal.close();
        handleOpenModal();
        listarTiposEquipo();
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
                  <h5 className='card-title'>Tipos de equipo <i class="fa-solid fa-computer"></i></h5>
            </div>
            <form onSubmit={(e) => handleOnSubmit(e)}>
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
                  <button className='boton2'>Crear</button>
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
            <table class="table table-striped">
              <thead>
                <tr>
                  <th scope="col"></th>
                  <th scope="col">Nombre</th>
                  <th scope="col">Status</th>
                  <th scope="col">Fecha creación</th>
                  <th scope="col">Fecha actualización</th>
                  <th scope="col"></th>
                </tr>
              </thead>
              <tbody>
                {
                  tiposEquipo.map((tipoEquipo) => {
                    return <tr>
                            <th scope="row"><i class="fa-solid fa-computer"></i></th>
                            <td>{tipoEquipo.nombre}</td>
                            <td>{tipoEquipo.estado}</td>
                            <td>{tipoEquipo.fechaCreacion}</td>
                            <td>{tipoEquipo.fechaActualizacion}</td>
                            <td className='editar'><Link to={`tipos/edit/${tipoEquipo._id}`}> <i class="fa-solid fa-pen"></i> Editar</Link></td>
                          </tr>
                  })
                }
                
              </tbody>
            </table>
        </div>
      </div>
  )
}
