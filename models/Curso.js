const mongoose = require('mongoose')

const Curso = mongoose.model('Curso', {
    title: String,
    description: String,
    img_url: String,
    link: String,
    categoria: String,
})

module.exports = Curso