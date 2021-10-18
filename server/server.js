import express from 'express';
import bodyParser from 'body-parser';
import {
  postLogin,
  createLogin,
} from '../db/db.js';
const app = express();
export const port = 3001;


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
//Endpoints needed:
//get: beginnerhighscores
//get: intermediatehighscores
//get: experthighscores

//post: insecurelogin
//  used to 'log in'.  Shape of req.body should be:
//    {
//      username: 'user1',
//      insecurePassword: 'nosaltnohash'
//    }
//  if no response to query,
//    createUser
//      then send 201 with entire user document
//  if password is correct
//    send 200
//  else send 401

//post: completedboard
//  used to tell server you have completed a board, shape of data is:
//   {
//     difficulty: ('beginner', 'intermediate', 'expert', or 'custom')
//     username: 'username',
//     seconds: 26,
//     date: new Date(),
//   }


app.get('/test', (req, res) => {
  console.log('got a request at /test');
  res.status(200).send('stuff');
});

app.listen(port, () => {
  console.log(`Minesweeper listening at http://localhost:${port}`);
});