
const express = require ('express');
const Item = require('../models/item');
const router = express.Router();

//Listar todos
router.get('/', async(req,res) => {
    const items = await Item.find()
    if(items.length == 0){
        res.send('Nenhum item cadastrado')
    }
    res.send({items})
});

//Listar um por numero 
router.get('/:number', async(req,res) => {
    try {
        const item = await Item.findOne({number: req.params.number}).lean();

        res.send({item})
    } catch (error) {
        return res.status(400).send({error: 'Error loading item'})
    } 
});

//Cadastar
router.post('/register', async(req,res) => {
    const {number}= req.body;

    try{

        if(await Item.findOne({ number })){
            return res.status(400).send({ error: 'Item already exists' })
        }

        const item = await Item.create(req.body)

        return res.send({item})

    } catch(err) {

       return res.status(400).send({ error: 'Registration failed' })
    }

});

//Atualizar um Item
router.put('/:number', async(req,res) => {
   const number = req.params.number

   const {name, description, valor} = req.body

   const update = {name,description,valor}

   try {
    const item = await Item.updateOne({number:number}, {name, description, valor})

    return res.send({update})
   } catch (error) {
        console.log(error)
        return res.status(400).send({ error: 'Registration failed' })
   }


});

//Deletar um Item
router.delete('/:number', async(req,res) => {
    try {
        await Item.findOneAndRemove(req.params.number).lean()

       return res.send()
   } catch (error) {
       return res.status(400).send({error: 'Error deleting item'})
       
   }
});




module.exports = app => app.use('/crud', router);
 