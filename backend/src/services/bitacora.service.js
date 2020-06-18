const BaseService = require("./base.service");
let _bitacoraRepository = null;

class BitacoraService extends BaseService {
    constructor({ BitacoraRepository }) {
        super(BitacoraRepository);
        _bitacoraRepository = BitacoraRepository;
    }
}

module.exports = BitacoraService;
