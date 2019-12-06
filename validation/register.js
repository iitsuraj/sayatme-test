var Validator = require("validator");
var isEmpty = require("./is-empty");

module.exports = function validateRegisterInput(data) {
  let errors = {};

  data.username = !isEmpty(data.username) ? data.username : "";
  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";

  if (!Validator.isLength(data.username, { min: 3, max: 30 })) {
    errors.username = "username must be between 3 and 30 characters";
  }

  if (Validator.isEmpty(data.username)) {
    errors.username = "username field is required";
  }

  if (Validator.isEmpty(data.email)) {
    errors.email = "Email field is required";
  }

  if (!Validator.isEmail(data.email)) {
    errors.email = "Email is invalid";
  }

  if (Validator.isEmpty(data.password)) {
    errors.password = "Password field is required";
  }

  if (!Validator.isLength(data.password, { min: 3 })) {
    errors.password = "Password must be at least 3 characters";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
