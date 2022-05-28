const validacionInventario = (req) => {

    const validaciones = [];

    if (!req.body.serial){
        validation.push("Serial requerido");
    }

    if (!req.body.modelo){
        validation.push("Modelo requerido");
    }

    if (!req.body.descripcion){
        validation.push("Descripcion requerida");
    }

    if (!req.body.color){
        validation.push("Color requerido");
    }

    if (!req.body.foto){
        validation.push("Foto requerida");
    }

    if (!req.body.fechaCompra){
        validation.push("Fecha requerida");
    }

    if (!req.body.precio){
        validation.push("Precio requerido");
    }

    return validaciones;
}

module.exports = {validacionInventario}