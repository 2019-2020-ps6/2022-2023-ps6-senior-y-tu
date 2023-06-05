const { Router } = require('express')

const { Reponse } = require('../../models')
const manageAllErrors = require('../../utils/routes/error-management')

const router = new Router()

router.get('/', (req, res) => {
  try {
    res.status(200).json(Reponse.get())
  } catch (err) {
    manageAllErrors(res, err)
  }
})

router.get('/:reponseId', (req, res) => {
  try {
    const reponse = Reponse.getById(req.params.reponseId)
    res.status(200).json(reponse)
  } catch (err) {
    manageAllErrors(res, err)
  }
})

router.post('/', (req, res) => {
  try {
    const reponse = Reponse.create({ ...req.body })
    res.status(201).json(reponse)
  } catch (err) {
    manageAllErrors(res, err)
  }
})

router.put('/:reponseId', (req, res) => {
  try {
    res.status(200).json(Reponse.update(req.params.reponseId, req.body))
  } catch (err) {
    manageAllErrors(res, err)
  }
})

router.delete('/:reponseId', (req, res) => {
  try {
    Reponse.delete(req.params.reponseId)
    res.status(204).end()
  } catch (err) {
    manageAllErrors(res, err)
  }
})


module.exports = router
