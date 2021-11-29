import express from 'express';
import bodyParser from 'body-parser';
import {
  createLogin,
  getBeginnerHighScores,
  getIntermediateHighScores,
  getExpertHighScores,
  postCompletedBoard,
  createHighScores,
  totalGamesCompleted,
  getUserData,
} from '../db/db.js';
import cors from 'cors';
import { graphqlHTTP } from 'express-graphql';
import { schema, rootValue } from './graphSchema.js';

const app = express();
export const port = 3001;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use('/graphql', graphqlHTTP({
  schema,
  rootValue,
  graphiql: true, //disable for production
}));

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

app.post('/user', (req, res) => {
  getUserData(req.body)
    .then(({
      beginnerScores,
      intermediateScores,
      expertScores,
      bestBeginnerScore,
      bestIntermediateScore,
      bestExpertScore,
      totalGamesCompleted,
      plainTextPassword,
    }) => {
      if (plainTextPassword === req.body.password) { //insecure, FIXME
        res.send({
          bestBeginnerScore,
          bestIntermediateScore,
          bestExpertScore,
          beginnerScores: beginnerScores.sort((a, b) => a.seconds - b.seconds),
          intermediateScores: intermediateScores.sort((a, b) => a.seconds - b.seconds),
          expertScores: expertScores.sort((a, b) => a.seconds - b.seconds),
          totalGamesCompleted,
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

app.post('/createuser', (req, res) => {
  getUserData(req.body)
    .then((dbResponse) => {
      if (!dbResponse) {
        createLogin(req.body)
          .then((newUserResponse) => {
            res.status(201).send(newUserResponse);
          })
          .catch((err) => {
            console.error('Error in /createuser: ', err);
            res.status(400).send(err);
          });
      }
      if (dbResponse) {
        res.send(dbResponse);
      }
    })
    .catch((err) => {
      console.error('Error in /createuser: ', err);
      res.status(400).send(err);
    });
});


//username, difficulty, seconds, date: new Date()
app.post('/completed', (req, res) => {
  postCompletedBoard(req.body)
    .then((dbResponse) => res.send(dbResponse))
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
  totalGamesCompleted(req.body)
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