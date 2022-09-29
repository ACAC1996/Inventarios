import React, {useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import { getUsuarioPorId, editUsuario, getUsuario } from '../../services/usuarioService';
import Swal from 'sweetalert2';

export const UsuarioUpdate = () => {

    const {usuarioId=''}= useParams();
    const [usuario,setUsuario]= useState({}); 
    const [valoresForm, setValoresForm] = useState([]);
    const {nombre='',email='',estado=''} = valoresForm;

    const getUsuario=async () => {
        try{
            Swal.fire({
                allowOutsideClick: false,
                text: 'Cargando...'
            });
            Swal.showLoading();
            const {data}=await getUsuarioPorId(usuarioId);
            setUsuario(data);
            Swal.close();
        }catch(error){
            console.log(error);
            Swal.close();
        }
    }

    useEffect(() => {
        getUsuario();
    }, [usuarioId]);

    useEffect(() => {
            setValoresForm({
                nombre: usuario.nombre,
                email: usuario.email,
                estado: usuario.estado,
            });
    }, [usuario]);

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
            const {data}= await editUsuario(usuarioId, usuario);
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
                mensaje= 'Ocurrió un error, por favor intente de nuevo';
            }
            Swal.fire('Error',mensaje,'error');
        }
    }

  return (
    <div className='container-fluid mt-3 mb-2'>
        <div className='card'>
            <div className='card-header'>
                <h5 className='card-title'>Editar usuario <i class="fa-solid fa-user"></i></h5>
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
                                    <label className="form-label">Email</label>
                                    <input type="text" name='email' 
                                        required
                                        onChange={(e) => handleOnChange(e)}
                                        value={email} className="form-control"/>
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