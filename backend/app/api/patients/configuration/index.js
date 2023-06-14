const { Router } = require('express')

const { Configuration } = require('../../../models')
const manageAllErrors = require('../../../utils/routes/error-management')

const router = new Router()

router.get('/', (req, res) => {
  try {
    res.status(200).json(Configuration.get())
  } catch (err) {
    manageAllErrors(res, err)
  }
})

router.get('/:idPatient', (req, res) => {
  try {
    const test = Configuration.get().filter((config) => config.idPatient === req.params.idPatient)
    if (test.length !== 0) { res.status(200).json(test[0]) } else { res.status(404).end() }
  } catch (err) {
    manageAllErrors(res, err)
  }
})

router.post('/', (req, res) => {
  try {
    console.log(req.body)
    const configuration = Configuration.create({ ...req.body })
    res.status(201).json(configuration)
  } catch (err) {
    manageAllErrors(res, err)
  }
})

router.put('/:idPatient', (req, res) => {
  try {
    const test = Configuration.get().filter((config) => config.idPatient === req.params.idPatient)
    res.status(200).json(Configuration.update(test[0].id, {
      souris: req.body.souris,
      police: req.body.police,
      explication: req.body.explication,
      handicap: req.body.handicap,
      idPatient: req.params.idPatient,
    }))
  } catch (err) {
    manageAllErrors(res, err)
  }
})

router.delete('/:idPatient', (req, res) => {
  try {
    const test = Configuration.get().filter((configuration) => configuration.idPatient === req.params.idPatient)
    for (let i = 0; i < test.length; i += 1) {
      Configuration.delete(test[i].id)
    }
    res.status(204).end()
  } catch (err) {
    manageAllErrors(res, err)
  }
})

module.exports = router
