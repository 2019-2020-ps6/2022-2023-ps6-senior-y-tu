const Joi = require('joi')
const BaseModel = require('../../utils/base-model')

module.exports = new BaseModel('StatistiqueJeu', {
  idPatient: Joi.string().required(),
  nombreDeplacement: Joi.number(),
  autreTouchesAppuyer: Joi.string(),
})
