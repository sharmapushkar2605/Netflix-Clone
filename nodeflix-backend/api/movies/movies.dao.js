const movieSchema = require("./movies.entity");
const userSchema = require("../auth/auth.entity");
const add = (movie, theUser, tag) => {
  return new Promise(async (resolve, reject) => {
    let success = false;
    try {
      const user = await userSchema.findOne({ email: theUser.email });
      const ifMovie = await movieSchema.findOne({
        user: user.id,
        movieId: movie.id,
        tag,
      });
      if(tag === 'like')
      {
        const isDisliked = await movieSchema.deleteOne({
          user: user.id,
          movieId: movie.id,
          tag:'dislike',
        });
      }
      if(tag === 'dislike')
      {
        const deleted = await movieSchema.deleteOne({
          user: user.id,
          movieId: movie.id,
          tag:'like',
        });
      }
      if (ifMovie)
      {
        let message= ''
        if (tag=== 'like')
        message = 'You have already liked it.'
        if (tag=== 'dislike')
        message = 'You have already disliked it.'
        if (tag=== 'watch-later')
        message = 'You have already added in watch later.'
        reject({
          message,
          success,
          severity: "warning",
        });
      }
      else {
        const newMovie = new movieSchema({
          user: user.id,
          movieId: movie.id,
          name: movie.name,
          genres: movie.genres,
          image: movie.image,
          tag: tag,
        });
        const saved = await newMovie.save();
        success = true;
        let message = ''
        if (tag=== 'like')
        message = 'Liked'
        if (tag=== 'dislike')
        message = 'Disliked'
        if (tag=== 'watch-later')
        message = 'Added to watch later.'
        resolve({ message, success, severity: "success" });
      }
    } catch (error) {
      console.log(error);
      reject({
        message: "Something went wrong",
        success: false,
        severity: "error",
      });
    }
  });
};

const get = (theUser, tag) => {
    return new Promise(async (resolve, reject) => {
      let success = false;
      try {
        const user = await userSchema.findOne({ email: theUser.email });
        const watchLaterList = await movieSchema.find({
          user: user.id,
          tag
        });
        success = true;
        let message=''
        if (tag=== 'like')
        message = 'Liked list fetched'
        if (tag=== 'dislike')
        message = 'Disliked list fetched'
        if (tag=== 'watch-later')
        message = 'Watch later list fetched'
        resolve({
          message,
          success,
          severity: "success",
          data: watchLaterList,
        });
      } catch (error) {
        console.log(error);
        reject({
          message: "Something went wrong",
          success: false,
          severity: "error",
          error
        });
      }
    });
  };
const deleteMovie = (theUser, tag, movie) => {
    return new Promise(async (resolve, reject) => {
      let success = false;
      try {
        const user = await userSchema.findOne({ email: theUser.email });
        const isDeleted = await movieSchema.deleteOne({
          user: user.id,
          movieId:movie,
          tag
        });
        if(isDeleted.deletedCount === 0)
        {
          reject({message:'Movie not found', severity:'warning', success})
        }
        success = true;
        let message=''
        if (tag=== 'like')
        message = 'Removed from Liked list'
        if (tag=== 'dislike')
        message = 'Removed from Disliked list'
        if (tag=== 'watch-later')
        message = 'Removed from Watch later list'
        resolve({
          message,
          success,
          severity: "success"
        });
      } catch (error) {
        console.log(error);
        reject({
          message: "Something went wrong",
          success: false,
          severity: "error",
          error
        });
      }
    });
  };
  
module.exports = {
  add,
  get,
  deleteMovie
};

// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3RtYWlsNUBnbWFpbC5jb20iLCJwYXNzd29yZCI6InRlc3RtYWlsNSIsImlhdCI6MTY1OTYwMTgyNn0.wLxo0qxgia8WEX4q4qUUZ20gbI4LGsjjyXHyfDc_bYo
