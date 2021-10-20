import express from 'express';
import bodyParser from 'body-parser';
import {
  postLogin,
  createLogin,
  getBeginnerHighScores,
  getIntermediateHighScores,
  getExpertHighScores,
  postCompletedBoard,
  createHighScores,
  totalGamesPlayed,
  getUserData,
} from '../db/db.js';
import cors from 'cors';

const app = express();
export const port = 3001;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
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
app.get('/highscores', (req, res) => {
  const beginner = getBeginnerHighScores();
  const intermediate = getIntermediateHighScores();
  const expert = getExpertHighScores();
  Promise.all([beginner, intermediate, expert])
    .then(([beginner, intermediate, expert]) => {
      const allHighScores = {
        beginner,
        intermediate,
        expert,
      };
      res.send(allHighScores);
    })
});

app.post('/user/', (req, res) => {
  getUserData(req.body)
    .then(({
      beginner_scores,
      intermediate_scores,
      expert_scores,
      best_beginner_score,
      best_intermediate_score,
      best_expert_score,
      total_games_played,
      plainTextPassword,
    }) => {
      if (plainTextPassword === req.body.password) { //insecure, FIXME
        res.send({
          bestBeginnerScore: best_beginner_score,
          bestIntermediateScore: best_intermediate_score,
          bestExpertScore: best_expert_score,
          beginnerScores: beginner_scores,
          intermediateScores: intermediate_scores,
          expertScores: expert_scores,
          totalGamesPlayed: total_games_played,
        });
      } else {
        res.sendStatus(401);
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(400).send(err);
    });
});

app.post('/insecurelogin', (req, res) => {
  //as the name implies, this is in no way secure or desired behavior for production, but it works for now FIXME
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
      res.send(dbResponse);
    })
    .catch((err) => {
      console.error('Error in /completed: ', err);
      res.sendStatus(400);
    })
});

app.post('/create_high_scores', (req, res) => {
  createHighScores()
    .then((dbResponse) => {
      res.send(dbResponse);
    })
    .catch((err) => console.error(err));
});

app.get('/played', (req, res) => {
  totalGamesPlayed(req.body)
    .then((dbResponse) => {
      res.status(200).json(dbResponse);
    })
    .catch((err) => console.error(err));
});

app.get('/test', (req, res) => {
  console.log('got a request at /test');
  res.status(200).send('stuff');
});

app.listen(port, () => {
  console.log(`Minesweeper listening at http://localhost:${port}`);
});