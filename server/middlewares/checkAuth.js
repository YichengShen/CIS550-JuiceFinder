const admin = require("../services/firebaseAdmin");

const checkAuth = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    res.status(401).send("Unauthorized: Missing Authorization header");
    return;
  }

  const token = authHeader.split(" ")[1]; // Assuming the header is in the format: "Bearer <TOKEN>"

  try {
    const decodedToken = await admin.auth().verifyIdToken(token);
    req.user = decodedToken;
    next();
  } catch (error) {
    res
      .status(401)
      .send(`Unauthorized: Invalid Firebase ID token (${error.message})`);
  }
};

module.exports = { checkAuth };
