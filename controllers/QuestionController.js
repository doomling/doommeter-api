const axios = require("axios");
const Question = require("../models/Question");
const { post } = require("../app");

class QuestionController {
  constructor(moodService) {
    this.moodService = moodService;
  }

  async create(req, res) {
    try {
      axios
        .get(
          `https://curiouscat.me/api/v2/profile?username=iamdoomling&count=100`
        )
        .then((data) => {
          const { posts } = data.data;

          posts.map(async (item) => {
            if (item.reply) {
              const query = await Question.findOne({ id: item.id }).exec();
              if (!query) {
                const filteredData = {
                  id: item.id,
                  question: item.comment,
                  answer: item.reply,
                };

                this.moodService.create(filteredData);
              }
            }
          });

          return res.sendStatus(200);
        });
    } catch (err) {
      return res.sendStatus(500);
    }
  }

  async modifyMood(req, res) {
    if (req.body.id) {
      try {
        this.moodService.modifyMood(req.body.id, req.body.mood);
        return res.sendStatus(200);
      } catch (err) {
        console.log(err);
        return res.sendStatus(500);
      }
    }
  }
}

module.exports = QuestionController;
