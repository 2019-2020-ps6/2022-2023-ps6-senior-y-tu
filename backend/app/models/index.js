// const YourModel = require('./your-model.model.js')
const Patient = require('./patients/patient.model.js')
const Theme = require('./themes/theme.model.js')
const StatistiqueJeu = require('./statistiqueJeu/statistiqueJeu.js')
const Configuration = require('./configuration/configuration.model')
const Quiz = require('./quizs/quiz.model')
const Question = require('./questions/question.model')
const Reponse = require('./reponses/reponses.model')

module.exports = {
  Patient,
  Theme,
  StatistiqueJeu,
  Configuration,
  Quiz,
  Question,
  Reponse,
}
