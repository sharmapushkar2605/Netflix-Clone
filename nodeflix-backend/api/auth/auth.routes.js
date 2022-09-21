const router = require("express").Router();
const authDao = require("./auth.dao");

// POST request to register user
// http://localhost:8000/api/auth/register
router.post("/register", (req, res) => {
  try {
    authDao
      .register(req.body)
      .then((response) => {
        res.status(response.status).json(response);
      })
      .catch((error) => {
        res.status(error.status).json(error);
      });
  } catch (error) {
    res.status(error.status).json(error);
  }
});

// POST request to login user
// http://localhost:8000/api/auth/login
router.post("/login", (req, res) => {
  try {
    authDao
      .login(req.body)
      .then((response) => {
        res.status(response.status).json(response);
      })
      .catch((error) => {
        res.status(error.status).json(error);
      });
  } catch (error) {
    res.status(error.status).json(error);
  }
});


module.exports = router;
