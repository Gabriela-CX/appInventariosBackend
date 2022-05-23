const {Router} = require('express');
const Inventario = require('../models/Inventario');
const Usuario = require('../models/Usuario');
const router = Router();
const usuario = require('../models/Usuario');


//Create usuario
router.post('/', async function(req, res){
    
    try{
        console.log('Objeto recibido', req.body);

        const existeUsuario = await Usuario.findOne({email: req.body.email});
        console.log('Respuesta existe usuario', existeUsuario);

        if (existeUsuario) {
            return res.send('Email ya existe');
        }

        let usuario = new Usuario();
        usuario.nombre = req.body.nombre;
        usuario.email = req.body.email;
        usuario.estado = req.body.estado;
        usuario.fechaCreacion = new Date();
        usuario.fechaActualizacion = new Date();

        usuario = await usuario.save();

        res.send(usuario);
    }catch(error){
        console.log(error);
        res.send('Ocurrio un error');
    }
    
});

//Read Usuario
router.get('/', async function(req, res){
    try{
        const usuario = await Usuario.find().populate([
            {
                path: 'nombre'
            },
            {
                path: 'email'
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
        res.send(usuario);
    }catch(error){
        console.log(error);
        res.send('Ocurrio un error al consultar usuario');
    }
})

//Update usuario
router.put('/:usuarioId', async function(req, res){
    try{
        console.log('Objeto recibido', req.body, req.params);

        let usuario = await Usuario.findById(req.params.usuarioId);
        if(!usuario){
           return res.send('Usuario no existe');
       }
        const existeUsuario = await Usuario
                .findOne({email:req.body.email,_id:{$ne:usuario._id}});

        console.log('Respuesta existe usuario', existeUsuario);
       
        if(existeUsuario){
           return res.send('Email ya existe');
       }
        usuario.nombre = req.body.nombre;
        usuario.email = req.body.email;
        usuario.estado = req.body.estado;
        usuario.fechaCreacion = new Date;
        usuario.fechaActualizacion = new Date;

        usuario = await usuario.save();
        
        res.send(usuario);
    }catch(error){
        console.log(error);
        res.send('Ocurrio un error al consultar usuario');
    }
    
});

//Delete Usuario
router.delete('/', async function(req, res){
    try{
        console.log('Borrar usuario', req.params.id);
        const {id} = req.params;

        const usuarioExiste = await Usuario.findById({_id: id});

        if(!usuarioExiste){
            return res.send('Usuario no existe');
        }

        const response = await inventarioExiste.remove();
        res.status(200).send(response);

    } catch(error){
        console.log(error);
        res.send('Ocurrio un error al borrar usuario');
    }
})


module.exports = router;