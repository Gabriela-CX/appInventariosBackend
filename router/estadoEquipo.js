const {Router} = require('express');
const EstadoEquipo = require('../models/EstadoEquipo');
const router = Router();
const estadoEquipo = require('../models/EstadoEquipo');

router.get('/', async function(req, res){
    try{
        const estadoEquipo = await EstadoEquipo.find();
        res.send(estadoEquipo);
    }catch(error){
        console.log(error);
        res.send('Ocurrio un error al consultar marca');
    }
})

router.get('/:estadoEquipoId', async(req, res)=>{

    try{
        const {estadoEquipoId} = req.params;

        const response = await EstadoEquipo.findById({_id: estadoEquipoId});

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

        const existeEstadoEquipo = await EstadoEquipo.findOne({nombre: req.body.nombre});
        console.log('Respuesta existe estado de equipo', existeEstadoEquipo);

        if (existeEstadoEquipo) {
            return res.send('Este estado de equipo ya existe');
        }

        let estadoEquipo = new EstadoEquipo();
        estadoEquipo.nombre = req.body.nombre;
        estadoEquipo.estado = req.body.estado;
        estadoEquipo.fechaCreacion = new Date();
        estadoEquipo.fechaActualizacion = new Date();

        estadoEquipo = await estadoEquipo.save();

        res.send(estadoEquipo);
    }catch(error){
        console.log(error);
        res.send('Ocurrio un error');
    }
})

router.put('/:estadoEquipoId', async function(req, res){
    try{
        console.log('Objeto recibido', req.body, req.params);

        let estadoEquipo = await EstadoEquipo.findById(req.params.estadoEquipoId);
        if(!estadoEquipo){
           return res.send('Estado de equipo no existe');
       }
        const existeEstadoEquipo = await EstadoEquipo
                .findOne({nombre:req.body.nombre,_id:{$ne:estadoEquipo._id}});

        console.log('Respuesta existe estado de equipo', existeEstadoEquipo);
       
        if(existeEstadoEquipo){
           return res.send('Estado equipo ya existe');
       }
        estadoEquipo.nombre = req.body.nombre;
        estadoEquipo.estado = req.body.estado;
        estadoEquipo.fechaCreacion = new Date;
        estadoEquipo.fechaActualizacion = new Date;

        estadoEquipo = await estadoEquipo.save();
        
        res.send(estadoEquipo);
    }catch(error){
        console.log(error);
        res.send('Ocurrio un error al actualizar estado de equipo');
    }
    
});

router.delete('/:estadoEquipoId', async function(req, res){
    try{
        console.log('Borrar estado de equipo', req.params.id);
        const {estadoEquipoId} = req.params;

        const existeEstadoEquipo = await EstadoEquipo.findById({_id: estadoEquipoId});

        if(!existeEstadoEquipo){
            return res.send('Estado de equipo no existe');
        }

        const response = await existeEstadoEquipo.remove();
        res.status(200).send(response);

    } catch(error){
        console.log(error);
        res.send('Ocurrio un error al borrar estado de equipo');
    }
})

module.exports = router;