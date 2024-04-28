import express from "express";
import fs, { write } from "fs";
import bodyParser from "body-parser";

const app = express();
app.use(bodyParser.json());

const readData = () =>{
    try{
        const data = fs.readFileSync("./db.json");
    return JSON.parse(data);
    }catch(error){
        console.log(error);
    }
    
};
const writeData = (data) => {
        try{
           fs.writeFileSync("./dn.json", JSON.stringify(data));
        }catch(error){
            console.log(error);
        }
};
app.get("/", (req,res)=>{
    res.send("welcome to my first API with node.js")
});

app.get("/productos", (req,res) => {
    const data =readData();
    res.json(data.Productos);
});

app.get("/Productos/:id", (req, res) => {
    const data = readData();
    const id = parseInt(req.params.id);
    const Productos = data.Productos.find((Productos) => Productos.id === id );
    res.json(Productos);
});

app.post("/Productos" , (req, res) => {
    const data = readData();
    const body = req.body;
    const newPoductos = {
        id: data.Productos.length + 1,
        ...body,

    };
    data.Productos.push(newPoductos);
    writeData(data);
    res.json(newPoductos);
});
app.put("/Productos/:id", (req, res)=> {
    const data = readData();
    const body = req.body;
    const id = parseInt(req.params.id);
    const ProductoIndex = data.Productos.findIndex((Productos) => Productos.id === id);
    data.Productos[ProductoIndex] = {
        ...data.Productos[ProductoIndex],
        ...body,
    };
    writeData(data);
    res.json({ message: "Datos del productos actualizado"})
});

app.delete("/Productos/:id", (req, res)=> {
    const data = readData();
    const id = parseInt(req.params.id);
    const ProductoIndex = data.Productos.findIndex((Productos) => Productos.id === id);
    data.Productos.splice(ProductoIndex,1);
    writeData(data);
    res.json({message: "El producto fue eliminado"});
});

app.listen(3000,() => {
    console.log('El servidor esta conectado en el puerto 3000');

});