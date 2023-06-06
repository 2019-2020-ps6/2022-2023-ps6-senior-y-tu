const { Reponses } = require('../../../../models')
const NotFoundError = require('../../../../utils/errors/not-found-error.js')
const { getQuestionFromQuiz } = require('../manager')

/**
 * filterAnswersFromQuestion.
 * This function filters among the questions to return only the question linked with the given quizId.
 * @param questionId
 */
const filtreReponseDeLaQuestion = (questionId) => {
  const test = Reponses.get().filter((reponse) => (reponse.questionId === questionId))
  return test
}

/**
 * getAnswerFromQuestion.
 * This function retrieves an answer from a question. It will throw a not found exception if the questionId in the answer is different from the one provided in parameter.
 * @param quizId
 * @param questionId
 * @param reponseId
 */
const getReponseFromQuestion = (quizId, questionId, reponseId) => {
  const question = getQuestionFromQuiz(quizId, questionId)
  const reponse = Reponses.getById(reponseId)
  if (reponse.questionId !== question.id) throw new NotFoundError(`${reponse.name} id=${reponseId} was not found for ${question.name} id=${question.id} : not found`)
  return reponse
}

module.exports = {
  getReponseFromQuestion,
  filtreReponseDeLaQuestion,
}
