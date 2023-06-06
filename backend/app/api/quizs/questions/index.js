const { Router } = require('express')

const { Question, Quiz, Reponses } = require('../../../models')
const manageAllErrors = require('../../../utils/routes/error-management')
const { filtreQuestionDuQuiz, getQuestionFromQuiz } = require('./manager')
const ReponsesRouter = require('./reponses')

const router = new Router({ mergeParams: true })

router.get('/', (req, res) => {
  try {
    Quiz.getById(req.params.quizId)
    res.status(200).json(filtreQuestionDuQuiz(req.params.quizId))
  } catch (err) {
    manageAllErrors(res, err)
  }
})

router.get('/:questionId', (req, res) => {
  try {
    const question = getQuestionFromQuiz(req.params.quizId, req.params.questionId)
    res.status(200).json(question)
  } catch (err) {
    manageAllErrors(res, err)
  }
})

router.post('/', (req, res) => {
  try {
    console.log(req.body)
    Quiz.getById(req.params.quizId)
    const quizId = parseInt(req.params.quizId, 10)
    let question = Question.create({ intitule: req.body.intitule, quizId })
    if (req.body.reponses && req.body.reponses.length > 0) {
      const reponses = req.body.reponses.map((reponse) => Reponses.create({ ...reponse, questionId: question.id }))
      question = { ...question, reponses }
    }
    // const question = Question.create({ ...req.body })
    res.status(201).json(question)
  } catch (err) {
    manageAllErrors(res, err)
  }
})

router.put('/:questionId', (req, res) => {
  try {
    const question = getQuestionFromQuiz(req.params.quizId, req.params.questionId)
    const questionModifie = Question.update(req.params.questionId, { intitule: req.body.intitule, quizId: question.quizId })
    res.status(200).json(questionModifie)
    // res.status(200).json(Question.update(req.params.questionId, req.body))
  } catch (err) {
    manageAllErrors(res, err)
  }
})

router.delete('/:questionId', (req, res) => {
  try {
    getQuestionFromQuiz(req.params.quizId, req.params.questionId)
    Question.delete(req.params.questionId)
    res.status(204).end()
  } catch (err) {
    manageAllErrors(res, err)
  }
})

router.use('/:questionId/reponses', ReponsesRouter)


module.exports = router
