//importar expres
const express = require('express');
//instanciando express en el objeto app
const app = express();
//importar modulo personalizado
const date = require('./date')

app.get('/',(req,res)=>{
    //console.log(req);
    res.status(200).res.send("Hola mundo " + new Date());
})

app.get('/:name',(req,res)=>{
    //console.log(req);
    const name = req.params.name
    res.send(`Hola ${name}`);
})

app.get('/users',(req,res)=>{
    //console.log(req);
    res.send(`Pagina de usuarios`);
})

app.get('/users/lista/',(req,res)=>{
    datos = [
        {
            firstName: "Fireman",
            lastName: "Pineda",
            date: date()
        }
    ];
    //res.send(`Pagina de usuarios`);
    res.send(datos);
})

app.get('/users/:id',(req,res)=>{
    //console.log(req);
    const id = req.params.id

    if (id>0){
        res.status(200);
        res.send(`Pagina de usuarios ` + id);
    }else{
        res.status(400);
        res.send("Pagina web no existe");
        //res.sendStatus(400);
    }
    
})

app.listen(3000, ()=>{
    console.log("Servidor iniciado")
})


