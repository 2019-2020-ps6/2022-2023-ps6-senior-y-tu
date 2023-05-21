const { Router } = require('express')

const { StatistiqueJeu } = require('../../models')
const manageAllErrors = require('../../utils/routes/error-management')

const router = new Router()

router.get('/', (req, res) => {
  try {
    res.status(200).json(StatistiqueJeu.get())
  } catch (err) {
    manageAllErrors(res, err)
  }
})

router.get('/:idPatient', (req, res) => {
  try {
    const test = StatistiqueJeu.get().filter((statistiqueJeu) => statistiqueJeu.idPatient === req.params.idPatient)
    if (test.length !== 0) {
      res.status(200).json(test[0])
    } else {
      res.status(404).end()
    }
  } catch (err) {
    manageAllErrors(res, err)
  }
})

router.post('/', (req, res) => {
  try {
    const statistiqueJeu = StatistiqueJeu.create({ ...req.body })
    res.status(201).json(statistiqueJeu)
  } catch (err) {
    manageAllErrors(res, err)
  }
})

router.put('/:idPatient', (req, res) => {
  try {
    const test = StatistiqueJeu.get().filter((statistiqueJeu) => statistiqueJeu.idPatient === req.params.idPatient)
    if (test.length !== 0) {
      res.status(200).json(StatistiqueJeu.update(test[0].id, {
        idPatient: test[0].idPatient,
        nombreDeplacement: req.body.nombreDeplacement,
        autreTouchesAppuyer: req.body.autreTouchesAppuyer,
      }))
    } else {
      res.status(404).end()
    }
  } catch (err) {
    manageAllErrors(res, err)
  }
})

router.delete('/:idPatient', (req, res) => {
  try {
    const test = StatistiqueJeu.get().filter((statistiqueJeu) => statistiqueJeu.idPatient === req.params.idPatient)
    for (let i = 0; i < test.length; i += 1) {
      StatistiqueJeu.delete(test[i].id)
    }
    res.status(204).end()
  } catch (err) {
    manageAllErrors(res, err)
  }
})

module.exports = router
