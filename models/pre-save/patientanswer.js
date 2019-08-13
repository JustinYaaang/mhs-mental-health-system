exports.getBand = function getBand(answerJson, rules) {
  try {
    if (isRed(answerJson, rules))
      return "RED";
    else if (isGreen(answerJson, rules))
      return "GREEN";
    else
      return "BLUE";
  } catch (error) {
    return "UNKNOWN";
  }
}

function isRed(answerJson, rules) {
  return isBand(answerJson, rules, "RED");
}

function isGreen(answerJson, rules) {
  return isBand(answerJson, rules, "GREEN");
}

function isBand(answerJson, rules, band) {
  var checks = rules[band]
  var result = true;
  checks.forEach(function(check, index) {
    var questionName = check["name"]
    var condition = check["condition"]
    var checkValue = check["value"]

    var scoreForQuestion = getScoreForQuestion(answerJson, rules, questionName);
    var isCheckValid = validateCondition(answerJson, rules, scoreForQuestion, condition, checkValue);
    result = (result && isCheckValid)

  });
  return result;
}

function validateCondition(answerJson, rules, score, condition, checkValue) {
  var valid = false;
  if (condition === "gt") {
    valid = score > checkValue;
  } else if (condition === "lt") {
    valid = score < checkValue;
  } else if (condition === "eq") {
    valid = score === checkValue;
  } else if (condition === "le") {
    valid = score <= checkValue;
  } else if (condition === "ge") {
    valid = score >= checkValue;
  } else if (condition === "ne") {
    valid = score !== checkValue;
  }
  return valid;
}

function getScoreForQuestion(answerJson, rules, questionName) {
  var score = 0;
  var answers = answerJson[questionName];
  var answerType = getAnswerType(answerJson, rules, questionName);
  if (answerType === "ARRAY") {
    answers.forEach(function(answer, index) {
      var selectedAnswer = answer.split("_")[1];
      score = score + Number(selectedAnswer);
    });
  } else if (answerType === "DICT") {
    for (var key in answers) {
      var selectedAnswer = answers[key].split("_")[1];
      score = score + Number(selectedAnswer);
    }
  }
  return score;
}

function getAnswerType(answerJson, rules, questionName) {
  return Array.isArray(answerJson[questionName]) ? "ARRAY" : "DICT";
}
