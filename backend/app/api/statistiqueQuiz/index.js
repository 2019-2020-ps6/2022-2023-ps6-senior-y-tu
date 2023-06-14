const { Router } = require('express')

const { StatistiqueQuiz, Patient} = require('../../models')
const manageAllErrors = require('../../utils/routes/error-management')

const router = new Router()

router.get('/', (req, res) => {
  try {
    res.status(200).json(StatistiqueQuiz.get())
  } catch (err) {
    manageAllErrors(res, err)
  }
})

router.get('/:idStatistiqueQuiz', (req, res) => {
  try {
    const statistiqueQuiz = StatistiqueQuiz.getById(req.params.idstatistiquesQuiz)
    res.status(200).json(statistiqueQuiz)
  } catch (err) {
    manageAllErrors(res, err)
  }
})

router.post('/', (req, res) => {
  try {
    console.log('je suis dans creer une  statistique pour un quiz')
    const statistiqueQuiz = StatistiqueQuiz.create({ ...req.body })
    res.status(201).json(statistiqueQuiz)
  } catch (err) {
    manageAllErrors(res, err)
  }
})

router.put('/:idStatistiqueQuiz', (req, res) => {
  try {
    res.status(200).json(StatistiqueQuiz.update(req.params.idstatistiquesQuiz, req.body))
  } catch (err) {
    manageAllErrors(res, err)
  }
})

router.delete('/:idStatistiqueQuiz', (req, res) => {
  try {
    StatistiqueQuiz.delete(req.params.idstatistiquesQuiz)
    res.status(204).end()
  } catch (err) {
    manageAllErrors(res, err)
  }
})

module.exports = router
