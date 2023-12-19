const express = require("express")
const server = express()
const port = 3000
server.use(express.json())
server.use(express.static("public"))
server.use(express.urlencoded({extended:false}))
server.listen(port,()=>{
    console.log(`je suis au port ${port}`)
})
const etudiant =[];
server.get("/",(req,res)=>{
    res.render("index.html")
})
server.post("/",(req,res)=>{
    const user ={
        id : etudiant.length+0,
        email:req.body.email,
        first_name : req.body.first_name,
        last_name : req.body.last_name,
    }
    res.send(user);
    etudiant.push(user)
})
server.get("/josue",(req,res)=>{
    res.json({"voici ce que vous voulez":etudiant})
})
server.get("/josue/:id",(req,res)=>{
    const{ id} = req.query
    const parsId = parseInt(id)
    if(!isNaN(parsId)){
        const create = etudiant.find((etudiant)=> etudiant.id === parsId)
        res.send(create);
    }else{
        console.log("ca ne passe pas")
    }
 
})
server.get("/boulingui/:first_name",(req,res)=>{
    const {first_name} = req.query
    if(first_name){
        const create = etudiant.find((etudiant)=> etudiant.first_name === first_name);
        res.json(create);
    }else{

    }
   
})
server.post("/josue",(req,res)=>{
    const user ={
         id :etudiant.length+0,
        first_name : req.body.first_name,
        last_name : req.body.last_name,
    }
    etudiant.push(user);
    res.send(user)
})
server.put("/josue/:id",(req,res)=>{
     let id = req.params.id
    let first_name = req.body.first_name
    let last_name = req.body.last_name
    let index = etudiant.findIndex((etudiant)=>{
        return (etudiant.id == Number.parseInt(id))
    })
    if(index>0){
        let std = etudiant[index]
        std.first_name = first_name,
        std.last_name = last_name,
        res.send(std)
    }else{
        console.log("ca ne passe pas");
    }

})
server.delete("/josue/:id",(req,res)=>{
    let id = req.params.id
    let index = etudiant.findIndex((etudiant)=>{
        return (etudiant.id == Number.parseInt(id))
    })
    if(index > 0){
        let std = etudiant[index];
        etudiant.splice(index ,1)
        res.send(std)
    }else{
        console.log("ca ne passe pas")
    }
})
server.patch("/josue/:id",(req,res)=>{
    let id = req.params.id*1
    const create = etudiant.find((etudiant)=> etudiant.id === id)
    const etudiantIndex = etudiant.indexOf(create)
    const etudiantUpdate = Object.assign(create,req.body)
    etudiant[etudiantIndex]= etudiantUpdate
    res.status(200).json({
        message:"success",
        data:{
            etudiant:etudiantUpdate
        }
    })
})