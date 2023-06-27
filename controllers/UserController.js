const User = require("../models/User")
const bcrypt =require('bcrypt')
const jwt = require('jsonwebtoken')


async function showUser(req, res){

    const id = req.params.id

//check if user exists 
const user = await User.findById(id, '-password')

if(!user) {
    return res.status(404).json({ msg: 'Usuário não encontrado'})
}

res.status(200).json({ user })
}

module.exports = {showUser}
