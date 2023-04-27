const validateId = function (id) {
    const check = /^(?:(?:[a-fA-F0-9]{12})|(?:[a-fA-F0-9]{24})|(?:\d+))$/;
    let result = check.test(id);
    return result;
  };
  module.exports={validateId}