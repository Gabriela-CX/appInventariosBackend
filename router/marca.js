const {Router} = require('express');
const Marca = require('../models/Marca');
const router = Router();
const marca = require('../models/Marca');

router.get('/', async function(req, res){
    try{
        const marca = await Marca.find();
        res.send(marca);
    }catch(error){
        console.log(error);
        res.send('Ocurrio un error al consultar marca');
    }
})

router.get('/:marcaId', async(req, res)=>{

    try{
        const {marcaId} = req.params;

        const response = await Marca.findById({_id: marcaId});

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

router.delete('/:marcaId', async function(req, res){
    try{
        console.log('Borrar marca', req.params.id);
        const {marcaId} = req.params;

        const existeMarca = await Marca.findById({_id: marcaId});

        if(!existeMarca){
            return res.send('Marca no existe');
        }

        const response = await existeMarca.remove();
        res.status(200).send(response);

    } catch(error){
        console.log(error);
        res.send('Ocurrio un error al borrar marca');
    }
})

module.exports = router;