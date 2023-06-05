const {Patient, Configuration} = require('../../../models')
const NotFoundError = require("../../../utils/errors/not-found-error");

const filterPatient = (patientId) => {
    const configurations = Configuration.get()
    const parseId = parseInt(patientId, 10)
    return configurations.filter((config) =>config.idPatient === parseId)
}

const getConfigurationFromPatient = (patientId, configId) => {
    const patient = Patient.getById(patientId)
    const patientIdInt = parseInt(patientId, 10)
    const config = Configuration.getById(configId)
    if (config.idPatient !== patientIdInt) throw new NotFoundError(`${patient.name} id =${configId} was not found for ${patient.name} id= ${patient.id}: not found`)
    return config
}