const yup = require("yup");

const compraSchema = yup.object().shape({
  proveedor_id:yup
    .number()
    .integer()
    .positive()
    .required(),
   usuario_id:yup
    .number()
    .integer()
    .positive()
    .required(),
  fecha:yup
    .date()
    .required()
});

module.exports = {
  compraSchema
};