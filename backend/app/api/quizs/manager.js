const { Quiz } = require('../../models')
const { filtreQuestionDuQuiz } = require('./questions/manager')
const { filtreReponseDeLaQuestion } = require('./questions/reponses/manager')

/**
 * Function buildQuizz.
 * This function aggregates the questions and answers from the database to build a quizz with all the data needed by the clients.
 * @param quizId
 */
const buildQuizz = (quizId) => {
  const quiz = Quiz.getById(quizId)
  const questions = filtreQuestionDuQuiz(quiz.id)
  const questionWithAnswers = questions.map((question) => {
    const reponse = filtreReponseDeLaQuestion(question.id)
    return { ...question, reponse }
  })
  return { ...quiz, questions: questionWithAnswers }
}

/**
 * Function buildQuizzes.
 * This function aggregates the questions and answers from the database to build entire quizzes.
 */
const buildQuizzes = () => {
  const quizzes = Quiz.get()
  return quizzes.map((quiz) => buildQuizz(quiz.id))
}

module.exports = {
  buildQuizz,
  buildQuizzes,
}
