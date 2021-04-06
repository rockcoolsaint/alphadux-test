import jwt from 'jsonwebtoken';

// wants to like a post for example
// click the like button => auth middleware (next) => like controller...

const auth = async (req, res, next) => {
  try {
    //const token = req.headers.authorization.split(" ")[1];
    const token = req.headers.authorization

    let decodedData;

    if (token) {
      decodedData = jwt.verify(token, process.env.SECRET);

      req.userId = decodedData.id ? decodedData.id : null;
    }

    next();
  } catch (error) {
    console.log(error);
  }
}

export default auth;