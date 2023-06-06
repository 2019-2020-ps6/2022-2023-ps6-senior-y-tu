const Joi = require('joi')
const BaseModel = require('../../../../utils/base-model.js')

module.exports = new BaseModel('Reponse', {
  valeur: Joi.string().required(),
  estCorrect: Joi.boolean().required(),
  questionId: Joi.number(),
})
