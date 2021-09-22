# Minesweeper

## Inspiration

I've always enjoyed puzzle games like Sudoku and Minesweeper.  I've tried to keep the styling and gameplay as close as possible to the original.

## About

I initally created a bare minimum implementation of [Minesweeper](https://github.com/jsmithb117/mini-apps/tree/master/minesweeper) as part of my HackReactor coursework.

This repo is closely based on that app and I will use this repo as a platform for learning/reinforcing other technologies (Typescript, GraphQL...).

I intend to make all major changes in Branches and integrated into the Main branch with Pull Requests.  Main branch changes should be sporadic and minor, ex: Removed rfdc dependency, Adjusted css to responsively render buttons...

## Branches

bareMinimumMinesweeper - A fully functional 10x10 Minesweeper board.  No bells, no whistles, state is held in the App component.

redux - Same board, different state management.  Uses Redux Hooks and immer.

testing - PR's includes coverage report.

### Next steps:

* ~~More Testing~~ Always more testing.

* ~~Make app responsive~~ Responsive-ish

* ~~PropType validation~~ Complete

* Typescript

* Ability to reset and create a new board.

* Form for reset board and Multiple board sizes, maybe X*Y board or easy/medium/hard.  Use separate reducer and actionCreators for form actions and use combineReducers

* Track 'score' (time to complete)

* Build menu around board in app with stats and forms

* Express/Mongo (REST API) server and username (no auth) for data persistence between sessions

* Add auth for users (plaintext)

* Add salt/hash for passwords

* Add High score board

* GraphQL for queries

* Server Side Rendering

* Refactor to React Native and create a mobile App

## Lessons Learned

### Cleaning up some questionable decisions
In my original repo, some of the code is a little suspect.  For instance, consider the line:

    let row = event.target.className.split(' ')[2].split('w')[1];  //There is probably a better way to store/retrieve the rows and cols

I knew it wasn't the right way to get it done as evidenced by my comment, but it worked until I figured out a better way.  The solution was to pass the 'piece' prop to the click handler, which would then have access to the 'row' and 'col' properties.  When refactoring the app to use Redux, I moved all of the click handler logic to the reducer and dispatched actions directly from the button instead of creating click handlers.

### Mutating State
While refactoring for Redux, I kept encountering strange read-only errors in my app.  While researching the problem, 99% of the places I found led me to the conclusion that I was mutating my store.  I implemented immer into my reducer logic to eliminate the possibility of mutating state, but it was still happening!  I could click on any piece once and not get an error, but when I clicked a second piece I got the read-only error.  Eventually I found the culprit.  In the if (action.type === LEFTCLICK) case of reducer.js, I was doing:

    const newBoard = [ ...state.board ];
    zeroFinder(row, col, newBoard);

The problem was that I was shallow-copying an array with nested objects but I needed to deep-copy it so that the values were passed as values instead of references.  My initial quick and dirty solution was to use JSON.stringify(JSON.parse(state.board)), but I knew this solution was terrible for performance, so I used rfdc to create a deep copy of the board.  After thinking about this problem again as I write this, it would be even better to simply use the draft state that immer provides like I should have when I initially implemented immer.  The silver lining is that I was forced to actually find the problem and solve it.  If I had implemented immer correctly the first time around, I wouldn't have actually found my mistake and I wouldn't have been able to learn much from my mistake.