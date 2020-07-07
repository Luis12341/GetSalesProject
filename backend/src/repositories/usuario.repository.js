const BaseRepository = require("./base.repository");
let _usuario = null;
let _rol = null;

class UsuarioRepository extends BaseRepository {
    constructor({ Usuario, Rol }) {
        super(Usuario);
        _usuario = Usuario;
        _rol = Rol;
    }

    async getAll(limitResults, pageNum, sortBy = "id", orderBy = "desc") {
        // Check if sort key is an actual attribute of model
        if (
            !this.validSort(_usuario, sortBy) &&
            !this.validSort(_rol, sortBy)
        ) {
            return [];
        }
        if (!limitResults || !pageNum) {
            return await _usuario.findAll({
                include: [{ model: _rol, as: "rol" }],
                order: [[sortBy, orderBy]],
            });
        }
        const page = parseInt(pageNum);
        const limit = parseInt(limitResults);
        const results = await _usuario.findAll({
            limit,
            offset: (page - 1) * limit,
            include: [{ model: _rol, as: "rol" }],
            order: [[sortBy ? sortBy : "id", orderBy ? orderBy : "desc"]],
        });
        const count = await _usuario.count();
        const paginatedResults = this.getPaginate(limit, page, count);
        paginatedResults.results = results;
        return paginatedResults;
    }

    async getUsuarioByUsername(username) {
        return await _usuario.findOne({
            where: {
                username,
            },
            include: [{ model: _rol, as: "rol" }],
        });
    }

    async getUsuarioByNombre(nombre) {
        return await _usuario.findOne({
            where: {
                nombre,
            },
        });
    }
    async getFacturas(userId) {
        const usuario = await _usuario.findByPk(userId);
        return await usuario.getFacturas();
    }

    async getCompras(userId) {
        const usuario = await _usuario.findByPk(userId);
        return await usuario.getCompras();
    }
}

module.exports = UsuarioRepository;
