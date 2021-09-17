# Minesweeper

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Inspiration

I've always enjoyed puzzle games like Sudoku and Minesweeper.  I've tried to keep the styling and gameplay as close as possible to the original.

## Future Plans

I intend to use this repo as a platform for learning/reinforcing other technologies (Typescript, GraphQL...)

### Next steps:

* Typescript

* Ability to reset and create a new board.

* Multiple board sizes, maybe X*Y board with a form, maybe easy/medium/hard

* Track 'score' (time to complete)

* Build menu around board in app with stats and forms

* Express/Mongo (REST API) server and username (no auth) for data persistence between sessions

* Add auth for users (plaintext)

* Add salt/hash for passwords

* Add High score board

* GraphQL for queries

* Server Side Rendering

## History

I initally created a minesweeper app as part of my HackReactor coursework.  That repo can be found at: https://github.com/jsmithb117/mini-apps/tree/master/minesweeper  It was a bare minimum implementation and some of the code was a little suspect.  For instance, the line:

    let row = event.target.className.split(' ')[2].split('w')[1];  //There is probably a better way to store/retrieve the rows and cols

I knew it wasn't the right way to get it done, but it worked until I figured out a better way.  If you're curious, the better way was to pass the piece prop to the click handlers when calling them so they can access the row and col properties.  When refactoring the app to use Redux, I moved the logic to the reducer and dispatched actions directly from the Piece component instead of using click handlers.

