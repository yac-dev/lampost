import Question from '../models/question';

export const createQuestion = async (request, response) => {
  try {
    const question = await Question.create({});
    response.status(201).json({
      post,
    });
  } catch (error) {
    console.log(error);
  }
};
