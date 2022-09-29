import { axiosInstance } from "../helpers/axios-config";

const getEstadoEquipo = () => {
    return axiosInstance.get('estados',{
        headers: {
            'Content-type': 'application/json'
        }
    });
}

const crearEstadoEquipo = (data) => {
    return axiosInstance.post('estados', data, {
        headers: {
            'Content-type': 'application/json'
        }
    });
}

const editEstadoEquipo = (estadoEquipoId, data) => {
    return axiosInstance.put(`estados/${estadoEquipoId}`, data, {
        headers: {
            'Content-type': 'application/json'
        }
    });
}

const getEstadoEquipoPorId = (estadoEquipoId) => {
    return axiosInstance.get(`estados/${estadoEquipoId}`,{
        headers: {
            'Content-type': 'application/json'
        }
    });

}

export {
    getEstadoEquipo, crearEstadoEquipo, editEstadoEquipo, getEstadoEquipoPorId
}