const {Router} = require('express');
const TipoEquipo = require('../models/TipoEquipo');
const router = Router();
const tipoEquipo = require('../models/TipoEquipo');

router.get('/', async function(req, res){
    try{
        const tipoEquipo = await TipoEquipo.find();
        res.send(tipoEquipo);
    }catch(error){
        console.log(error);
        res.send('Ocurrio un error al consultar tipo de equipo');
    }
})

router.get('/:tipoEquipoId', async(req, res)=>{

    try{
        const {tipoEquipoId} = req.params;

        const response = await TipoEquipo.findById({_id: tipoEquipoId});

        console.log(response)
        res.status(200).send(response);
    } catch(error){
        console.log("Error!: ", error.message)
        res.status(500).send(error.message);
    }
})

router.post('/', async function(req, res){
    try{
        console.log('Objeto recibido', req.body);

        const existeTipoEquipo = await TipoEquipo.findOne({nombre: req.body.nombre});
        console.log('Respuesta existe tipo de equipo', existeTipoEquipo);

        if (existeTipoEquipo) {
            return res.send('Tipo de equipo ya existe');
        }

        let tipoEquipo = new TipoEquipo();
        tipoEquipo.nombre = req.body.nombre;
        tipoEquipo.estado = req.body.estado;
        tipoEquipo.fechaCreacion = new Date();
        tipoEquipo.fechaActualizacion = new Date();

        tipoEquipo = await tipoEquipo.save();

        res.send(tipoEquipo);
    }catch(error){
        console.log(error);
        res.send('Ocurrio un error');
    }
})

router.put('/:tipoEquipoId', async function(req, res){
    try{
        console.log('Objeto recibido', req.body, req.params);

        let tipoEquipo = await TipoEquipo.findById(req.params.tipoEquipoId);
        if(!tipoEquipo){
           return res.send('Tipo de equipo no existe');
       }
        const existeTipoEquipo = await TipoEquipo
                .findOne({nombre:req.body.nombre,_id:{$ne:tipoEquipo._id}});

        console.log('Respuesta existe tipo de equipo', existeTipoEquipo);
       
        if(existeTipoEquipo){
           return res.send('Tipo de equipo ya existe');
       }
        tipoEquipo.nombre = req.body.nombre;
        tipoEquipo.estado = req.body.estado;
        tipoEquipo.fechaCreacion = new Date;
        tipoEquipo.fechaActualizacion = new Date;

        tipoEquipo = await tipoEquipo.save();
        
        res.send(tipoEquipo);
    }catch(error){
        console.log(error);
        res.send('Ocurrio un error al actualizar tipo de equipo');
    }
    
});

router.delete('/:tipoEquipoId', async function(req, res){
    try{
        console.log('Borrar tipo equipo', req.params.id);
        const {tipoEquipoId} = req.params;

        const existeTipoEquipo = await TipoEquipo.findById({_id: tipoEquipoId});

        if(!existeTipoEquipo){
            return res.send('Tipo de equipo no existe');
        }

        const response = await existeTipoEquipo.remove();
        res.status(200).send(response);

    } catch(error){
        console.log(error);
        res.send('Ocurrio un error al borrar tipo equipo');
    }
})

module.exports = router;