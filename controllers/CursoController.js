const Curso = require("../models/Curso");


async function curso(req, res){
    const id = req.params.id

    //check if user exists 
    const curso = await Curso.findById(id)
    
    if(!curso) {
        return res.status(404).json({ msg: 'Curso não encontrado!'})
    }
    
    res.status(200).json({ curso })
}

async function cursos(req, res){
    const cursos = await Curso.find()
    return res.status(200).json(cursos)
}

async function criarCurso(req, res){
    const {title, description, img_url, link} = req.body

    //validations

    if(!title) {
        return res.status(422).json({msg: 'O title é obrigatório'})
    }

    if(!description) {
        return res.status(422).json({msg: 'A description é obrigatória'})
    }

    if(!link) {
        return res.status(422).json({msg: 'O link é obrigatório'})
    }
//create curso

const curso = new Curso({
    title,
    description,
    link,
    img_url
})

try {
    await curso.save()

    res.status(201).json({msg: 'Curso cadastrado com sucesso!'})

}catch(erro) {

    console.log(erro)

    res
    .status(500)
    .json({msg: 'Aconteceu um erro no servidor, tente novamente mais tarde!',
})
}
}

async function removerCursos(req, res){

    const id = req.params.id
    const cursos = await Curso.findByIdAndDelete(id)
    return res.json({
        msg: "Deletado com sucesso!"
    })
}

async function editarCurso(req, res){
    const id = req.params.id;
  const title = req.body.title;
  const img_url = req.body.img_url;
  const link = req.body.link;
  const description = req.body.description;
  

  try {
    await Curso.findByIdAndUpdate(id, {
      title: title,
      img_url: img_url,
      description: description,
      link: link
    });
    return res.json({msg: "Atualizado com sucesso!"});
  } catch (err) {
    console.log(err)
  }
}

module.exports = {
    cursos,
    criarCurso,
    curso,
    removerCursos,
    editarCurso
}