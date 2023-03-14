const root = require('../../root')
const info = require(root.conexao + '\\dados')
const db = require(root.conexao + '\\db')
class Control {
    constructor() {
        this.CreateDb;
        this.atualizaDb;
        this.deletarDb;
        this.show;
        this.buscarDb;
        this.buscarNomeDb;
    }
    async Init() {
        let res = await info.sync()
        console.log(res)
    }
    async CreateDb(Pais, iso2, iso3, num) {
        try {
            if (Pais.length != 0 && iso2.length != 0 && iso3.length != 0 && num.length != 0) {
                let res = await info.create({
                    pais: Pais,
                    iso3161_alpha2: iso2,
                    iso3161_alpha3: iso3,
                    numerico: parseInt(num)
                })
                console.log(res)
            }
        } catch (err) {
            if (err.name === "SequelizeUniqueConstraintError") {
                console.log("Esses Valores Ja Existem")
            }
            else if (err.name === 'SequelizeValidationError') {
                console.error("Os Valores não Podem Estar Vazios")
            }
            else {
                console.error(err)
            }
        }
    }
    async atualizaDb(id, atrib, val) {
        try {
            if (id.length != 0 && atrib.length != 0 && val.length != 0) {
                let atributos = ["pais", "iso2", "iso3", "numerico"]
                if (atributos.indexOf(atrib) > -1 && atrib === "pais") {
                    let res = await info.findByPk(id)
                    res.pais = val
                    res.save()
                    console.log(`Atributo Modificado \n-${atrib} = ${val}`)
                }
                else if (atributos.indexOf(atrib) > -1 && atrib === "iso2") {
                    let res = await info.findByPk(id)
                    res.iso3161_alpha2 = val
                    res.save()
                    console.log(`Atributo Modificado \n-${atrib} = ${val}`)
                }
                else if (atributos.indexOf(atrib) > -1 && atrib === "iso3") {
                    let res = await info.findByPk(id)
                    res.iso3161_alpha3 = val
                    res.save()
                    console.log(`Atributo Modificado \n-${atrib} = ${val}`)
                }
                else if (atributos.indexOf(atrib) > -1 && atrib === "numerico") {
                    let res = await info.findByPk(id)
                    res.numerico = parseInt(val)
                    res.save()
                    console.log(`Atributo Modificado \n-${atrib} = ${val}`)
                }
                else {
                    console.error(`Esse Atributo ${atrib} Não existe`)
                }
            }
        } catch (err) {
            if (err.name === "ValidationErrorItem") {
                console.log("Esses Valores Ja Existem")
            }
            else if (err.name === 'SequelizeValidationError') {
                console.error("Os Valores não Podem Estar Vazios")
            }
            else {
                console.error(err)
            }
        }
    }
    async deletarDb(id) {
        try {
            if (id.length != 0) {
                let res = await info.findByPk(id)
                res.destroy()
            }
        } catch (err) {
            console.log(err)
        }
    }
    async show() {
        try {
            let result = await info.findAll()
            
            result.forEach((show) => {
                console.log(show.dataValues)
            })

        } catch (err) {
            console.error(err);
        }

    }
    async buscarDb(id){
        try{
        if(id.length != 0){
            try{
            let res = await info.findByPk(id)
            console.log(res.dataValues)
            }catch(err){
                console.log(err)
            }
        }
    }catch(err){
        console.log(err)
    }
    }
    async buscarNomeDb(Nome){
        try{
            if(Nome.length != 0){
                let res = await info.findOne({where:{pais:Nome}})
                console.log(res.dataValues)
            }
        }catch(err){
            console.log(err)
        }
    }

}
module.exports = new Control;
