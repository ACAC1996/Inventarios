import { axiosInstance } from "../helpers/axios-config";

const getTipoEquipo = () => {
    return axiosInstance.get('tipos',{
        headers: {
            'Content-type': 'application/json'
        }
    });
}

const crearTipoEquipo = (data) => {
    return axiosInstance.post('tipos', data, {
        headers: {
            'Content-type': 'application/json'
        }
    });
}

const editTipoEquipo = (tipoEquipoId, data) => {
    return axiosInstance.put(`tipos/${tipoEquipoId}`, data, {
        headers: {
            'Content-type': 'application/json'
        }
    });
}

const getTipoEquipoPorId = (tipoEquipoId) => {
    return axiosInstance.get(`tipos/${tipoEquipoId}`,{
        headers: {
            'Content-type': 'application/json'
        }
    });

}

export {
    getTipoEquipo, crearTipoEquipo, editTipoEquipo, getTipoEquipoPorId
}