import { axiosInstance } from "../helpers/axios-config";

const getInventario = () => {
    return axiosInstance.get('inventario',{
        headers: {
            'Content-type': 'application/json'
        }
    });

}

const crearInventario = (data) => {
    return axiosInstance.post('inventario', data, {
        headers: {
            'Content-type': 'application/json'
        }
    });
}

const editInventario = (inventarioId, data) => {
    return axiosInstance.put(`inventario/${inventarioId}`, data, {
        headers: {
            'Content-type': 'application/json'
        }
    });
}

const getInventarioPorId = (inventarioId) => {
    return axiosInstance.get(`inventario/${inventarioId}`,{
        headers: {
            'Content-type': 'application/json'
        }
    });

}

export {
    getInventario, crearInventario, editInventario, getInventarioPorId
}