const { Router } = require('express')
const { Reponses } = require('../../../../models')

const { getQuestionFromQuiz } = require('../manager')
const { filtreReponseDeLaQuestion, getReponseFromQuestion } = require('./manager')

const router = new Router({ mergeParams: true })

router.get('/', (req, res) => {
  try {
    const question = getQuestionFromQuiz(req.params.quizId, req.params.questionId)
    const reponses = filtreReponseDeLaQuestion(question.id)
    res.status(200).json(reponses)
  } catch (err) {
    if (err.name === 'NotFoundError') {
      res.status(404).end()
    } else {
      res.status(500).json(err)
    }
  }
})

router.get('/:reponseId', (req, res) => {
  try {
    const reponse = getReponseFromQuestion(req.params.quizId, req.params.questionId, req.params.reponseId)
    res.status(200).json(reponse)
  } catch (err) {
    if (err.name === 'NotFoundError') {
      res.status(404).end()
    } else {
      res.status(500).json(err)
    }
  }
})

router.post('/', (req, res) => {
  try {
    console.log(req.body)
    console.log(req.params)
    const question = getQuestionFromQuiz(req.params.quizId, req.params.questionId)
    console.log(question)
    const reponse = Reponses.create({ ...req.body, questionId: question.id })
    res.status(201).json(reponse)
  } catch (err) {
    if (err.name === 'NotFoundError') {
      res.status(404).end()
    } else if (err.name === 'ValidationError') {
      res.status(400).json(err.extra)
    } else {
      res.status(500).json(err)
    }
  }
})

router.put('/:reponseId', (req, res) => {
  try {
    const reponse = getReponseFromQuestion(req.params.quizId, req.params.questionId, req.params.reponsId)
    console.log(reponse)
    const updatedReponse = Reponses.update(req.params.reponseId, { ...req.body, questionId: reponse.questionId })
    res.status(200).json(updatedReponse)
  } catch (err) {
    if (err.name === 'NotFoundError') {
      res.status(404).end()
    } else if (err.name === 'ValidationError') {
      res.status(400).json(err.extra)
    } else {
      res.status(500).json(err)
    }
  }
})

router.delete('/:reponseId', (req, res) => {
  try {
    getReponseFromQuestion(req.params.quizId, req.params.questionId, req.params.reponseId)
    Reponses.delete(req.params.reponseId)
    res.status(204).end()
  } catch (err) {
    if (err.name === 'NotFoundError') {
      res.status(404).end()
    } else {
      res.status(500).json(err)
    }
  }
})

module.exports = router
