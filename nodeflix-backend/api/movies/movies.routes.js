const router = require("express").Router();
const moviesDao = require("./movies.dao");
const fetchuser = require("../../middleware/fetchUser");

// http://localhost:8000/api/movies/add?tag={tag}
router.post("/add", fetchuser, (req, res) => {
  try {
    moviesDao
      .add(req.body, req.user,req.query.tag)
      .then((response) => res.json(response))
      .catch((error) => res.json(error));
  } catch (error) {
    res.send({
      message: "internal server error",
      success: false,
      severity: "error",
    });
  }
});

// http://localhost:8000/api/movies/get?tag={tag}
router.get("/get", fetchuser, (req, res) => {
  try {
    moviesDao
      .get(req.user,req.query.tag)
      .then((response) => res.json(response))
      .catch((error) => res.json(error));
  } catch (error) {
    res.send({
      message: "internal server error",
      success: false,
      severity: "error",
    });
  }
});
// http://localhost:8000/api/movies/get?tag={tag}
router.delete("/delete", fetchuser, (req, res) => {
  try {
    moviesDao
      .deleteMovie(req.user,req.query.tag, req.query.id)
      .then((response) => res.json(response))
      .catch((error) => res.json(error));
  } catch (error) {
    res.send({
      message: "internal server error",
      success: false,
      severity: "error",
    });
  }
});

module.exports = router;
