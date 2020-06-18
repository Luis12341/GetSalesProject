const BaseRepository = require("./base.repository");
let _compra = null;
let _detalleCompra = null;

class CompraRepository extends BaseRepository {
    constructor({ Compra, DetalleCompra }) {
        super(Compra);
        _compra = Compra;
        _detalleCompra = DetalleCompra;
    }
    async createDetalle(detalle) {
        const detalleCompra = await _detalleCompra.create(detalle);
        return detalleCompra;
    }

    async getByFecha(fecha){
        return await _compra.findAll({
            where: {
                fecha
            }
        })
    }
}

module.exports = CompraRepository;
