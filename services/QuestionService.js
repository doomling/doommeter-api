const Question = require("../models/Question");

class QuestionService {
  modifyMood(id, data) {
    console.log(data);
    const query = Question.findOneAndUpdate({ id: id }, { mood: data }).exec();
    return query;
  }

  create(data) {
    const newQuestion = new Question(data);
    return newQuestion.save();
  }
}

module.exports = QuestionService;
