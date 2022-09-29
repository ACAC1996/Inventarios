import React, {useState, useEffect} from 'react';
import { crearMarca,getMarca } from '../../services/marcaService';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';

export const MarcaView = (props) => {
  const [marcas, setMarcas] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [valoresForm, setValoresForm] = useState([]);
  const {nombre='', estado=''} = valoresForm;

  const listarMarcas = async () => {
    try{
      Swal.fire({
        allowOutsideClick: false,
        text: 'Cargando...'
      }); 
      Swal.showLoading(); 
      const {data} = await getMarca();
      setMarcas(data);
      Swal.close();
    }catch(error){
      console.log(error);
      Swal.close();
    }
  }

  useEffect(() => {
    listarMarcas();
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
    const marca ={
        nombre,estado
    }
    try{
        Swal.fire({
            allowOutsideClick: false,
            text: 'Cargando...'
        });
        Swal.showLoading();
        const {data}= await crearMarca(marca);
        console.log(data);
        Swal.close();
        handleOpenModal();
        listarMarcas();
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

const cont=0;
 
  return (
      <div className="container-fluid mt-3 mb-2">
        <div className='card'>
            <div className='card-header'>
                  <h5 className='card-title'>Marcas <i class="fa-solid fa-copyright"></i></h5>
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
                  <button className='boton2'>Guardar</button>
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
                  marcas.map((marca) => {
                    return <tr>
                            <th scope="row"><i class="fa-solid fa-font-awesome"></i></th>
                            <td>{marca.nombre}</td>
                            <td>{marca.estado}</td>
                            <td>{marca.fechaCreacion}</td>
                            <td>{marca.fechaActualizacion}</td>
                            <td className='editar'><Link to={`marcas/edit/${marca._id}`}><i class="fa-solid fa-pen"></i> Editar</Link></td>
                          </tr>
                  })
                }
                
              </tbody>
            </table>
        </div>
      </div>
  )
}
