let _proveedorService = null;

class ProveedorController {
    constructor({ ProveedorService }) {
        _proveedorService = ProveedorService;
    }
    async get(req, res) {
        const { id } = req.params;
        const proveedor = await _proveedorService.get(id);
        return res.send(proveedor);
    }
    async getAll(req, res) {
        const { pageSize, pageNum } = req.query;
        const proveedores = await _proveedorService.getAll(pageSize, pageNum);
        return res.send(proveedores);
    }
    async create(req, res) {
        const { body } = req;
        const createdProveedor = await _proveedorService.create(body);
        return res.send(createdProveedor);
    }
    async update(req, res) {
        const { body } = req;
        const { id } = req.params;
        const updatedProveedor = await _proveedorService(id, body);
        return res.send(updatedProveedor);
    }
    async delete(req, res) {
        const { id } = req.params;
        const deletedProveedor = await _proveedorService.delete(id);
        return res.send(deletedProveedor);
    }
    async getCompras(req, res) {}
    async search(req, res) {}
}

module.exports = ProveedorController;
