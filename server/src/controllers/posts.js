import Post from '../models/post';

export const createPost = async (request, response) => {
  try {
    const { content, genre, pics, limit, userId, place } = request.body;
    const post = new Post({
      content,
      pics,
      genre,
      limit,
      user: userId,
      place,
      createdAt: new Date(),
    });
    if (pics) {
      post.pics = pics;
    }
    await post.save();
    response.status(201).json({
      post,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getPosts = async (request, response) => {
  try {
    const posts = await Post.find().populate({
      path: 'user',
      model: 'User',
    });

    response.status(200).json({
      posts,
    });
  } catch (error) {
    console.log(error);
  }
};
