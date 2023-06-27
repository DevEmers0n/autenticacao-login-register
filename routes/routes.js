const { logout } = require('../controllers/AuthController')
const { login, register } = require('../controllers/AuthController')
const { cursos, criarCurso, curso, removerCursos, editarCurso } = require('../controllers/CursoController')
const { showUser } = require('../controllers/UserController')
const { checkToken } = require('../utils/checktoken')

const routes = require('express').Router()

routes.post('/auth/login', login)
routes.post('/auth/register', register)

routes.get('/user/:id', checkToken, showUser)

routes.get('/cursos', checkToken, cursos)
routes.post('/cursos', checkToken, criarCurso)
routes.get('/cursos/:id', checkToken, curso)
routes.delete('/cursos/:id', checkToken, removerCursos)
routes.put('/cursos/:id', checkToken, editarCurso)

routes.get('/logout/:id', checkToken, logout)

module.exports = routes

