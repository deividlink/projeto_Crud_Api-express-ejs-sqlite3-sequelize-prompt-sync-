const express = require('express')
const app = express()
let db = require('./src/conexao/db')
let dados = require('./src/conexao/dados')
app.set("view-engine","ejs")

app.get("/", function(req,res){
    res.render("./home.ejs")
})

app.get("/api",async function(req,res){
    try{
        let bd = await dados.findAll()
        if(bd != null){
            res.status(200).json(bd)
            console.log(res.statusCode + " " + req.originalUrl)
        }
        else{
            res.status(404).end("Ocorreu Um Problema no Servidor")
            console.log(res.statusCode + " " + req.originalUrl)
        }


    }catch(err){
        console.log(err)
    }
})                        

app.get("/api/searchID",function(req,res){
    res.redirect('/')
})


app.get("/api/searchID/:id",async function(req,res){
    let id = (req.params.id.length != 0) ? req.params.id : false
    if(id != "false"){
        try{
            let bd = await dados.findByPk(id)
            if(bd != null){
                res.status(200).json(bd)
                console.log(res.statusCode + " " + req.originalUrl)
            }
            else{
                
                res.status(404).end("ID Nao Encontrada no Servidor")
                console.log(res.statusCode + " " + req.originalUrl)
            }
        }catch(err){
            console.log(err)
        }
    }
})

app.get('/api/searchNome/',function(req,res){
    res.render("/home",{alert:true,url:req.originalUrl})
})

app.get("/api/searchNome/:nome",async function(req,res){
    let nome = req.params.nome.length != 0 ? req.params.nome : "false"
    if(nome != "false"){
        let bd = await dados.findOne({where:{pais:nome}})
        if(bd != null){
            res.status(200).json(bd)
            console.log(res.statusCode + " " + req.originalUrl)
        }
        else{
            res.status(404).end("Nome Nao Encontrado no Servidor")
            console.log(res.statusCode + " " + req.originalUrl)
        }
    }
})

app.listen(8000,(req,res)=>{
    console.log('server 8000 ')
})