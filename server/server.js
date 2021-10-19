import express from 'express';
import bodyParser from 'body-parser';
import {
  postLogin,
  createLogin,
  getBeginnerHighScores,
  getIntermediateHighScores,
  getExpertHighScores,
  postCompletedBoard,
} from '../db/db.js';
const app = express();
export const port = 3001;


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/beginner', (req, res) => {
  getBeginnerHighScores()
    .then((dbResponse) => {
      res.send(dbResponse);
    })
    .catch((err) => {
      console.error('Error in /beginner: ', err);
      res.status(400).send(err);
    });
});
app.get('/intermediate', (req, res) => {
  getIntermediateHighScores()
    .then((dbResponse) => {
      res.send(dbResponse);
    })
    .catch((err) => {
      console.error('Error in /intermediate: ', err);
      res.status(400).send(err);
    });
});
app.get('/expert', (req, res) => {
  getExpertHighScores()
    .then((dbResponse) => {
      res.send(dbResponse);
    })
    .catch((err) => {
      console.error('Error in /expert: ', err);
      res.status(400).send(err);
    });
});

app.post('/insecurelogin', (req, res) => {
  postLogin(req.body)
    .then((dbResponse) => {
      if (!dbResponse) {
        createLogin(req.body)
          .then((newUserResponse) => {
            res.status(201).send(newUserResponse);
          })
          .catch((err) => {
            console.error('Error in /insecurelogin: ', err);
            res.status(400).send(err);
          });
      }
      if (dbResponse && req.body.password === dbResponse.plainTextPassword) {
        res.send(dbResponse);
      }
      if (dbResponse && req.body.password !== dbResponse.plainTextPassword) {
        res.sendStatus(401);
      }
    })
    .catch((err) => {
      console.error('Error in /insecurelogin: ', err);
      res.status(400).send(err);
    });
});

app.post('/completed', (req, res) => {
  postCompletedBoard(req.body)
    .then((dbResponse) => {
      console.log('server dbResponse: ', dbResponse);
      res.send(dbResponse);
    })
    .catch((err) => {
      console.error('Error in /completed: ', err);
      res.sendStatus(400);
    })
})

app.get('/test', (req, res) => {
  console.log('got a request at /test');
  res.status(200).send('stuff');
});

app.listen(port, () => {
  console.log(`Minesweeper listening at http://localhost:${port}`);
});