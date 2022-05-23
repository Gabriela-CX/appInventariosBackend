const mongoose = require('mongoose');
const dotenv = require('dotenv').config();
const getConnection = async() => {

    try{
        const url = process.env.URI;
        await mongoose.connect(url);

        console.log('Conexion exitosa');
    }catch(error){
        console.log(error);
    }
    
}

module.exports = {
    getConnection
}