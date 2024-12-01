const errorHandler = (error, request, response, next) => {
  if (error.name === "CastError") {
    return response.status(400).send({ error: "malformatted id" });
  } else if (error.name === "NotFoundError") {
    return response.status(404).send({ error: error.message });
  } else if (error.name === "NotUserError") {
    return response.status(404).send({ error: error.message });
  } else if (error.errors && error.errors[0].validatorName === "isEmail") {
    return response.status(404).send({ error: error.message });
  } else if (
    error.errors &&
    (error.errors[0].validatorName === "min" ||
      error.errors[0].validatorName === "max")
  ) {
    return response.status(404).send({ error: error.message });
  }
  console.log(error);
  
  return response.status(500).send({ error: "Error interno del servidor" });
};

module.exports = errorHandler