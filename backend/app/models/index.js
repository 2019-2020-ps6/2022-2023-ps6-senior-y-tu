// const YourModel = require('./your-model.model.js')
const Patient = require('./patients/patient.model.js')
const Theme = require('./themes/theme.model.js')
const StatistiqueJeu = require('./statistiqueJeu/statistiqueJeu.js')
const Configuration = require('./configuration/configuration.model')
const Quiz = require('./quizs/quiz.model')
const StatistiqueQuiz = require('./statistiqueQuiz/statistiqueQuiz.model')

const Question = require('./quizs/questions/question.model')
const Reponses = require('./quizs/questions/reponses/reponses.model')

module.exports = {
  Patient,
  Theme,
  StatistiqueJeu,
  StatistiqueQuiz,
  Configuration,
  Quiz,
  Question,
  Reponses,
}
