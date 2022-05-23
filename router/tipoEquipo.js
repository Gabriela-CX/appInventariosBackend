const {Router} = require('express');
const TipoEquipo = require('../models/TipoEquipo');
const router = Router();
const tipoEquipo = require('../models/TipoEquipo');

router.get('/', async function(req, res){
    try{
        const tipoEquipo = await TipoEquipo.find().populate([
            {
                path: 'nombre'
            },
            {
                path: 'estado'
            },
            {
                path:'fechaCreacion'
            },
            {
                path:'fechaCreacion'
            }
        ]);
        res.send(tipoEquipo);
    }catch(error){
        console.log(error);
        res.send('Ocurrio un error al consultar tipo de equipo');
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

module.exports = router;