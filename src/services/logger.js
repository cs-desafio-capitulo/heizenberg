import axios from 'axios';

export default async (req, res, next) => {
  try {
    await axios.post('https://immense-brushlands-11219.herokuapp.com/log/', {
      user: 123,
      service: 'HEIZENBERG',
      description: `${req.method} on ${req.url}`,
      level: res.statusCode < 400 ? 'INFO' : 'ERROR',
      date: Date.now(),
    });
  } catch (error) {
    throw new Error(error);
  }

  next();
};
