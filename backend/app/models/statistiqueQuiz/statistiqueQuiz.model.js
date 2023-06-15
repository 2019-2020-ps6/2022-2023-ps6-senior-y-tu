const Joi = require('joi')
const BaseModel = require('../../utils/base-model')

module.exports = new BaseModel('StatistiqueQuiz', {
  idPatient: Joi.string().required(),
  bonneReponse: Joi.number(),
  nombreReponse: Joi.number(),
  temp: Joi.number(),
  idQuiz: Joi.string().required(),
})
