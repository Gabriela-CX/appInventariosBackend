const validacionInventario = (req) => {

    const validaciones = [];

    if (!req.body.serial){
        validation.push("Serial requerido");
    }

    if (!req.body.modelo){
        validation.push("Modelo requerido");
    }

    return validaciones;
}

module.exports = {validacionInventario}