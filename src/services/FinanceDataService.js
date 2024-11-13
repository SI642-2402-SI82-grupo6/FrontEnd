import http from "../http-common";

class FinanceDataService {

    // Tasa y Plazo Controller
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

    // Letra Controller
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

    // Factura Controller
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

    // Costes y Gastos Controller
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

    deleteCostesGastosAll() {
        return http.delete(`/wallet/costes-gastos`);
    }

    // Cartera Controller
    createCartera(data) {
        return http.post(`/wallet/cartera/crearCartera`, data);
    }

    agregarDocumento(cartId, documentId) {
        return http.post(`/wallet/cartera/agregarDocumento?carteraId=${cartId}&doumentoId=${documentId}`);
    }

    obtenerCarteras() {
        return http.get(`/wallet/cartera/obtenerCarteras`);
    }
    obtenerResultadoDeCartera(id) {
        return http.get(`/wallet/cartera/obtenerResultadosConsultaPorCartera?carteraId=${id}`)
    }

    obtenerCartera(id) {
        return http.get(`/wallet/cartera/obtenerCartera/${id}`);
    }
    obtenerDocumentosCreados(){
        return http.get(`/wallet/resultados/consulta/obtenerDocumentosCreados`);
    }

    eliminarCartera(id) {
        return http.delete(`/wallet/cartera/eliminarCartera?carteraId=${id}`);
    }

    // Auth Controller
    signup(data) {
        return http.post(`/auth/signup`, data);
    }



    logout() {
        return http.post(`/api/auth/logout`).then(response => {
            if (response.data && response.data.message) {
                localStorage.removeItem('authToken'); // Remove the token from localStorage
                localStorage.removeItem('user'); // Remove the user from localStorage
                return response.data;
            } else {
                throw new Error("Logout response does not contain a message.");
            }
        });
    }

    // Resultados Consulta Controller
    obtenerResultadosConsulta() {
        return http.get(`/api/wallet/resultados/consulta/obtenerResultados`);
    }
}

export default new FinanceDataService();