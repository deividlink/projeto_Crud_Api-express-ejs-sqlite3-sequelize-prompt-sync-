const root = require('../root')
const info = require('./conexao/dados')
console.log(root.control + '\\Control')
const Control = require(root.control + '\\control')
const db = require(root.conexao+"\\dados")
const prompt = require('prompt-sync')(
    signint = false
)
function complete(commands) {
    return function (str) {
      var i;
      var ret = [];
      for (i=0; i< commands.length; i++) {
        if (commands[i].indexOf(str) == 0)
          ret.push(commands[i]);
      }
      return ret;
    };
};

async function command(){
    const comandos = ["criar","atualizar","apagar","mostrar","buscar","buscarNome","sair"]
    let result = prompt("Comando> ",{autocomplete:complete(comandos)})
    if(comandos.indexOf(result) > -1 && result == "criar"){
        console.log("criar")
        let pais = prompt("Pais> ")
        let iso2 = prompt("ISO2>")
        let iso3 = prompt("ISO3> ")
        let num = prompt("Numerico> ")
        await Control.CreateDb(pais,iso2,iso3,num)
        pais = ''
        iso2 = ''
        iso3 = ''
        num = ''
    }
    else if(comandos.indexOf(result) > -1 && result == "atualizar"){
        console.log("atualizar")
        let id = prompt("ID> ")
        let param = prompt("Atributo> ",{autocomplete:complete("pais","iso2","iso3","numerico")})
        let valor = prompt("Valor> ")
        if(id.length != 0 && param.length != 0 && valor != 0){
        await Control.atualizaDb(id,param,valor)
        id = ''
        param = ''
        valor = ''
        }
    }
    else if(comandos.indexOf(result) > -1 && result === "apagar"){
        let del = prompt("Apagar(ID)> ") 
        await Control.deletarDb(del)
        del = ''
    }
    else if(comandos.indexOf(result) > -1 && result === "mostrar"){
        await Control.show()
    }
    else if(comandos.indexOf(result) > -1 && result === "sair"){
        process.exit(1)
    }
    else if(comandos.indexOf(result) > -1 && result === "buscar"){
        let id = prompt("ID> ")
        await Control.buscarDb(id)
        id = ''
    }
    else if(comandos.indexOf(result) > -1 && result === "buscarNome"){
        let nome = prompt("Nome>")
        await Control.buscarNomeDb(nome)
        id = ''
    }
    else{
        console.error(`Comando ${result} Desconhecido`)
    }
    result = ''
    command()
}
command()
