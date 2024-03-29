// Schema
import User from '../models/user';
// import AppError from '../utils/appError';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

export const signup = async (request, response, next) => {
  try {
    console.log(request.body);
    const { name, email, password } = request.body;
    if (password.length < 10) {
      // messageと、error type。
      // throw new AppError('Password should be at least 10 characters.', 400, 'PasswordLengthError');
      return next(new AppError('Password has to be at least 10 characters long.', 400, 'PasswordLengthError'));
    }
    const user = new User({
      name,
      email,
      password,
      createdAt: new Date(),
      pushToken: '',
      // patrons: 0,
      // fame: 0,
      // launcher: false,
      // ongoingMeetup: {
      //   state: false,
      // },
      // leadership: {
      //   teamManagement: 0,
      //   timeManagement: 0,
      //   planning: 0,
      //   courage: 0,
      //   integrity: 0,
      //   reliability: 0,
      //   creative: 0,
      //   flexibility: 0,
      //   communication: 0,
      //   relationshipBuilding: 0,
      //   mentoring: 0,
      // },
      // personality: {
      //   considerate: 0,
      //   communication: 0,
      //   openMinded: 0,
      //   spontaneous: 0,
      //   diversity: 0,
      //   passionate: 0,
      //   hardWorking: 0,
      //   concentration: 0,
      //   calmAndRelaxed: 0,
      //   respectful: 0,
      //   teamWorking: 0,
      //   adaptivity: 0,
      // },
    });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    await user.save();

    const jwtToken = jwt.sign({ id: user._id }, process.env.JWT_PRIVATE_KEY);
    response.status(201).send({
      user,
      jwtToken,
    });
  } catch (error) {
    console.log(error.name);
    console.log(error.message);
    next(error);
    response.status(400).json({
      message: 'Password has to be at least 10 characters long.',
    });
  }
};

export const login = async (request, response, next) => {
  try {
    const { email, password } = request.body;
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error('Nooooo.mail');
    }
    console.log(user);

    const isEnteredPasswordCorrect = await user.isPasswordCorrect(password, user.password);
    if (!isEnteredPasswordCorrect) {
      throw new Error('password not match...');
    }

    // 基本、10dayにしましょう。expirationは。
    const jwtToken = jwt.sign({ id: user._id }, process.env.JWT_PRIVATE_KEY);
    response.json({
      user,
      jwtToken,
    });
  } catch (error) {
    console.log(error.message, error.name);
    response.status(400).send({
      message: 'OOPS! Something wrong with your email or password. Please enter your email and password again.',
    });
  }
};

export const loadMe = async (request, response) => {
  try {
    const { user } = request;
    response.status(200).json({
      user,
    });
  } catch (error) {
    console.log(error);
  }
};

export const logout = async (request, response) => {
  try {
  } catch (error) {
    console.log(error);
  }
};

export const deleteMe = async (request, response) => {
  try {
    const user = await User.findByIdAndRemove(request.params.id);
    response.status(204).json({
      message: 'resource deleted successfully',
    });
  } catch (error) {
    console.log(error);
  }
};
