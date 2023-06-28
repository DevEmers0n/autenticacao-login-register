const User = require("../models/User")
const bcrypt =require('bcrypt')
const jwt = require('jsonwebtoken')


const generatetoken = (id) => {
    return jwt.sign({id}, process.env.SECRET, {
        expiresIn: 84600
    } )
}

async function login(req, res){
    try {
        const {email, password} = req.body

    if(!email) {
        return res.status(422).json({msg: 'O email é obrigatório'})
    }

    if(!password) {
        return res.status(422).json({msg: 'A senha é obrigatória'})
    }
    
    //check if user exists
    const user = await User.findOne({ email: email })

    if (!user) {
        return res.status(422).json({ msg: 'Usuário não encontrado!' })
    }

    // check if password match

    const checkPassword = await bcrypt.compare(password, user.password)

    if(!checkPassword) {
        return res.status(422).json({ msg:'Senha inválida!'})
    }

    return res.status(200).json({
        token: generatetoken(user.id),
        user: user
    })

    } catch(erro) {
      console.log(erro)

        res
        .status(500)
        .json({msg: 'Aconteceu um erro no servidor, tente novamente mais tarde!',
    }) 

    }
}

async function register(req, res){
    const {name, email, password, confirmpassword} = req.body
    
    //validations

    if(!name) {
        return res.status(422).json({msg: 'O nome é obrigatório'})
    }

    if(!email) {
        return res.status(422).json({msg: 'O email é obrigatório'})
    }

    if(!password) {
        return res.status(422).json({msg: 'A senha é obrigatória'})
    }

    if(password !== confirmpassword){
        return res.status(422).json({msg: 'As senhas não conferem!'})
    }

    // check if user exists
    const userExists = await User.findOne({email: email})

if(userExists) {
       return res.status(422).json({msg: 'Por favor, utilize outro email!'})
   }


// create password

const salt = await bcrypt.genSalt(12)
const passwordHash = await bcrypt.hash(password, salt)


//create user

const user = new User({
    name,
    email,
    password: passwordHash
})


try {
    await user.save()

    res.status(201).json({msg: 'Usuário criado com sucesso!'})

}catch(erro) {

    console.log(erro)

    res
    .status(500)
    .json({msg: 'Aconteceu um erro no servidor, tente novamente mais tarde!',
})
}
}

async function logout(req, res){
    req.session = null
}


module.exports = {
    login, register, logout
}




