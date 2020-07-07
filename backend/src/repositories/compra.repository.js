const BaseRepository = require("./base.repository");
let _compra = null;
let _detalleCompra = null;

class CompraRepository extends BaseRepository {
    constructor({ Compra, DetalleCompra }) {
        super(Compra);
        _compra = Compra;
        _detalleCompra = DetalleCompra;
    }

    async getAll(limitResults, pageNum, sortBy = "id", orderBy = "desc") {
        // Check if sort key is an actual attribute of model
        if (!this.validSort(_compra, sortBy)) {
            return [];
        }
        if (!limitResults || !pageNum) {
            return await _compra.findAll({
                order: [[sortBy, orderBy]],
            });
        }
        const page = parseInt(pageNum);
        const limit = parseInt(limitResults);
        const results = await _compra.findAll({
            limit,
            offset: (page - 1) * limit,
            order: [[sortBy, orderBy]],
        });
        const count = await _compra.count();
        const paginationResults = this.getPaginate(limit, page, count);
        paginationResults.results = results;
        return paginationResults;
    }
    async createDetalles(detalles) {
        return await _detalleCompra.bulkCreate(detalles);
    }

    async getByFecha(fecha) {
        return await _compra.findAll({
            where: {
                fecha,
            },
        });
    }
}

module.exports = CompraRepository;
