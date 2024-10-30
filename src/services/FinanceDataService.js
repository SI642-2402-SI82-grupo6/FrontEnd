import http from "../http-common";

class FinanceDataService {

    getTasaYPlazo(id) {
        return http.get(`/wallet/tasa-y-plazo/${id}`);
    }

    updateTasaYPlazo(id, data) {
        return http.put(`/wallet/tasa-y-plazo/${id}`, data);
    }

    deleteTasaYPlazo(id) {
        return http.delete(`/wallet/tasa-y-plazo/${id}`);
    }

    getAllTasaYPlazo() {
        return http.get(`/wallet/tasa-y-plazo`);
    }

    createTasaYPlazo(data) {
        return http.post(`/wallet/tasa-y-plazo`, data);
    }

    deleteAllTasaYPlazo() {
        return http.delete(`/wallet/tasa-y-plazo`);
    }

    getLetra(id) {
        return http.get(`/wallet/letras/${id}`);
    }

    updateLetra(id, data) {
        return http.put(`/wallet/letras/${id}`, data);
    }

    deleteLetra(id) {
        return http.delete(`/wallet/letras/${id}`);
    }

    getAllLetras() {
        return http.get(`/wallet/letras`);
    }

    createLetra(data) {
        return http.post(`/wallet/letras`, data);
    }

    getFactura(id) {
        return http.get(`/wallet/facturas/${id}`);
    }

    updateFactura(id, data) {
        return http.put(`/wallet/facturas/${id}`, data);
    }

    deleteFactura(id) {
        return http.delete(`/wallet/facturas/${id}`);
    }

    getAllFacturas() {
        return http.get(`/wallet/facturas`);
    }

    createFactura(data) {
        return http.post(`/wallet/facturas`, data);
    }

    getCostesGastos(id) {
        return http.get(`/wallet/costes-gastos/${id}`);
    }

    updateCostesGastos(id, data) {
        return http.put(`/wallet/costes-gastos/${id}`, data);
    }

    deleteCostesGastos(id) {
        return http.delete(`/wallet/costes-gastos/${id}`);
    }

    getAllCostesGastos() {
        return http.get(`/wallet/costes-gastos`);
    }

    createCostesGastos(data) {
        return http.post(`/wallet/costes-gastos`, data);
    }

    createResultadosConsulta(data) {
        return http.post(`/wallet/resultados/consulta`, data);
    }

    getAllResultadosConsulta() {
        return http.get(`/wallet/resultados/consulta/all`);
    }

    getResultadosCartera() {
        return http.get(`/wallet/resultados/cartera/consultar`);
    }

    signup(data) {
        return http.post(`/auth/signup`, data);
    }
    deleteCostesGastosAll(){
        return http.delete(`/wallet/costes-gastos`);
    }



    logout() {
        return http.post(`/auth/logout`).then(response => {
            if (response.data && response.data.message) {
                localStorage.removeItem('authToken'); // Remove the token from localStorage
                localStorage.removeItem('user'); // Remove the user from localStorage
                return response.data;
            } else {
                throw new Error("Logout response does not contain a message.");
            }
        });
    }
}

export default new FinanceDataService();