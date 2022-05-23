const {Router} = require('express');
const Marca = require('../models/Marca');
const router = Router();
const marca = require('../models/Marca');

router.get('/', async function(req, res){
    try{
        const marca = await Marca.find().populate([
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
        res.send(marca);
    }catch(error){
        console.log(error);
        res.send('Ocurrio un error al consultar marca');
    }
})

router.post('/', async function(req, res){
    try{
        console.log('Objeto recibido', req.body);

        const existeMarca = await Marca.findOne({nombre: req.body.nombre});
        console.log('Respuesta existe marca', existeMarca);

        if (existeMarca) {
            return res.send('Marca ya existe');
        }

        let marca = new Marca();
        marca.nombre = req.body.nombre;
        marca.estado = req.body.estado;
        marca.fechaCreacion = new Date();
        marca.fechaActualizacion = new Date();

        marca = await marca.save();

        res.send(marca);
    }catch(error){
        console.log(error);
        res.send('Ocurrio un error');
    }
})

router.put('/:marcaId', async function(req, res){
    try{
        console.log('Objeto recibido', req.body, req.params);

        let marca = await Marca.findById(req.params.marcaId);
        if(!marca){
           return res.send('Marca no existe');
       }
        const existeMarca = await Marca
                .findOne({nombre:req.body.nombre,_id:{$ne:marca._id}});

        console.log('Respuesta existe marca', existeMarca);
       
        if(existeMarca){
           return res.send('Marca ya existe');
       }
        marca.nombre = req.body.nombre;
        marca.estado = req.body.estado;
        marca.fechaCreacion = new Date;
        marca.fechaActualizacion = new Date;

        marca = await marca.save();
        
        res.send(marca);
    }catch(error){
        console.log(error);
        res.send('Ocurrio un error al actualizar tipo de equipo');
    }
    
});

module.exports = router;