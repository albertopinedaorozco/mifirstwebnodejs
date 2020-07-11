//importar expres
const express = require('express');
//instanciando express en el objeto app
const app = express();
//importar modulo personalizado
const date = require('./date')
const bmi = require('./bmi')

// const logger = (req, res,next) =>{
//     console.log(req.method);
//     console.log(req.path);
//     //console.log("Acceso a la pagina de usuarios");
//     console.log(`${date()} :: ${req.method} :: ${req.path}`);
//     next();
// }

//modelos
const users = [];

//middlewares
app.use(express.json());//formatea los objectos que se reciben de request en formato json

const logger = (req, res,next) =>{
    console.log(req.method);
    console.log(req.path);
    //console.log("Acceso a la pagina de usuarios");
    console.log(`${date()} :: ${req.method} :: ${req.path}`);
    next();
}

//app.use(logger) //para este caso el logger se usaría de manera para todas las rutas

app.post('/users',logger,(req, res)=>{
    const user= {
        name: req.body.name,
        lastname: req.body.lastname
    }
    users.push(user);
    res.status(200).send(`El usuario ${user.name} fue creado!`)

})

app.get('/users',logger,(req,res)=>{
    //console.log(req);
    res.status(200).send(users);
})

app.get('/',(req,res)=>{
    //console.log(req);
    res.status(200).res.send("Hola mundo " + new Date());
})

app.get('/:name',(req,res)=>{
    //console.log(req);
    const name = req.params.name
    res.send(`Hola ${name}`);
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

app.get('/users/:id',logger,(req,res)=>{
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

/*calcular indice de masa corporal*/
app.get('/bmi/:weight/:height/',(req,res)=>{
    //console.log(req);
    const weight = req.params.weight;
    const height = req.params.height;
    const bmiValue = bmi(parseFloat(weight), parseFloat(height));
    console.log(bmiValue);
    
    if (bmiValue!=="Error"){
        res.status(200);
        res.send(`Resultado de bmi es ${bmiValue} `);
    }else{
        res.status(400);
        res.send("Error al realizar el calculo");
        //res.sendStatus(400);
    }
    
})

app.listen(3000, ()=>{
    console.log("Servidor iniciado")
})


