import React, {useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import { editEstadoEquipo, getEstadoEquipoPorId } from '../../services/estadoEquipoService';
import Swal from 'sweetalert2';

export const EstadoUpdate = () => {

    const {estadoEquipoId=''}= useParams();
    const [estadosEquipo,setEstadosEquipo]= useState({}); 
    const [valoresForm, setValoresForm] = useState([]);
    const {nombre='',estado=''} = valoresForm;

    const getEstadoEquipo=async () => {
        try{
            Swal.fire({
                allowOutsideClick: false,
                text: 'Cargando...'
            });
            Swal.showLoading();
            const {data}=await getEstadoEquipoPorId(estadoEquipoId);
            setEstadosEquipo(data);
            Swal.close();
        }catch(error){
            console.log(error);
            Swal.close();
        }
    }
 
    useEffect(() => {
        getEstadoEquipo();
    }, [estadoEquipoId]);

    useEffect(() => {
            setValoresForm({
                nombre: estadosEquipo.nombre,
                estado: estadosEquipo.estado,
            });
    }, [estadosEquipo]);

    const handleOnChange = ({target}) => {
        const {name, value} = target;
        setValoresForm({...valoresForm, [name]:value})
    }

    const handleOnSubmit= async (e) => {
        e.preventDefault();
        const estadoEquipo ={
            nombre,estado
        }
        try{
            Swal.fire({
                allowOutsideClick: false,
                text: 'Cargando...'
            });
            Swal.showLoading();
            const {data}= await editEstadoEquipo(estadoEquipoId, estadoEquipo);
            console.log(data);
            alert('Modificado exitosamente.');
            Swal.close();
        }catch(error){
            console.log(error);
            console.log(error.response.data);
            Swal.close();
            let mensaje;
            if(error && error.response && error.response.data){
                mensaje = error.response.data;
            }else{
                mensaje= 'Ocurri?? un error, por favor intente de nuevo';
            }
            Swal.fire('Error',mensaje,'error');
        }
    }

  return (
    <div className='container-fluid mt-3 mb-2'>
        <div className='card'>
            <div className='card-header'>
                <h5 className='card-title'>Editar estado de equipo <i class="fa-solid fa-check"></i></h5>
            </div>
            <div className='card-body'>
                <div className='row'>
                    <div className='col'>
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
                                    <select className="form-select"
                                        required
                                        onChange={(e) => handleOnChange(e)}
                                        name='estado'
                                        value={estado}>
                                        <option value="">--SELECCIONE--</option>
                                        <option value="Activo">Activo</option>
                                        <option value="Inactivo">Inactivo</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className='row'>
                            <div className='col'>
                                <button className='btn btn-primary'>Guardar</button>
                            </div>
                        </div>
                    </form>
                    </div>
                </div>
            </div>
        </div>
        
    </div>
  )
}