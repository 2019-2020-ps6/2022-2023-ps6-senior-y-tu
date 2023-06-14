const { Router } = require('express')
const PatientsRouter = require('./patients')
const ThemesRouter = require('./themes')
const StatistiqueJeuRouter = require('./statistiqueJeu')
const ConfigurationRouter = require('./patients/configuration')
const QuizsRouter = require('./quizs')
const StatistiqueQuizRouter = require('./statistiqueQuiz')

const router = new Router()
router.get('/status', (req, res) => res.status(200).json('ok'))
router.use('/patients', PatientsRouter)
router.use('/themes', ThemesRouter)
router.use('/statistiqueJeu', StatistiqueJeuRouter)
router.use('/configuration', ConfigurationRouter)
router.use('/quiz', QuizsRouter)
router.use('/statistiqueQuiz', StatistiqueQuizRouter)


module.exports = router
