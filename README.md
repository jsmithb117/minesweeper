# Minesweeper

## Inspiration

I've always enjoyed puzzle games like Sudoku and Minesweeper.  I've tried to keep the styling and gameplay as close as possible to the original.

## About

I initally created a bare minimum implementation of [Minesweeper](https://github.com/jsmithb117/mini-apps/tree/master/minesweeper) as part of my HackReactor coursework.

This repo is closely based on that app and I will use this repo as a platform for learning/reinforcing other technologies (Typescript, GraphQL...).

I intend to make all major changes in Branches and integrated into the Main branch with Pull Requests.  Main branch changes should be sporadic and minor, ex: Removed rfdc dependency, Adjusted css to responsively render buttons...

## Branches

### Completed
bareMinimumMinesweeper - A fully functional 10x10 Minesweeper board.  No bells, no whistles, state is held in the App component.

redux - Same board, different state management.  Uses Redux Hooks and immer.

testing - PR's include coverage reports.

typescript - Refactors for typescript

forms - Adds a display at the top for # of mines remaining and a form at the bottom to change the board size

### Work In Progress

### Todo:

* ~~More Testing~~ Always more testing.

* ~~Make app responsive~~ Responsive-ish

* ~~PropType validation~~ Complete

* ~~Typescript~~ Complete

* ~~Use separate reducer and actionCreators for form actions and use combineReducers~~ - Complete

* ~~Ability to reset and create a new board.~~ Merged with next todo.



* ~~Form for reset board and Multiple board sizes, maybe X*Y board or easy/medium/hard.~~ - Complete

* ~~Styling updates to match what 'real' minesweeper looks like when you lose~~ - Complete

* ~~Track 'score' (time to complete)~~ - Merged with Backend

* Add 'Pause' button that covers entire board and stops incrementing time

* Build menu around board in app with stats and forms

* Express/Mongo (REST API) server and username (no auth) for data persistence between sessions, Track 'score' (time to complete)

* Add auth for users (plaintext)

* Add salt/hash for passwords

* Add High score board

* GraphQL for queries

* Server Side Rendering

* Refactor to React Native and create a mobile App

## Lessons Learned

All mistakes are opportunities to learn and grow and (hopefully) not repeat those same mistakes.  Documenting some of the more egregious mistakes will help future me (and maybe others) to solidify what I've learned.

### Cleaning up some questionable decisions
In my original repo, some of the code is a little suspect.  For instance, consider the line:

    let row = event.target.className.split(' ')[2].split('w')[1];  //There is probably a better way to store/retrieve the rows and cols

I knew it wasn't the right way to get it done as evidenced by my comment, but it worked until I figured out a better way.  The solution was to pass the 'piece' prop to the click handler, which would then have access to the 'row' and 'col' properties.  When refactoring the app to use Redux, I moved all of the click handler logic to the reducer and dispatched actions directly from the button instead of creating click handlers.

Lesson learned:  If I encounter this problem again, I'd think a little longer about how I could pass data without using questionable (being generous) practices.

### Mutating State
While refactoring for Redux, I kept encountering strange read-only errors in my app.  While researching the problem, 99% of the places I found led me to the conclusion that I was mutating my store.  I implemented immer into my reducer logic to eliminate the possibility of mutating state, but it was still happening!  I could click on any piece once and not get an error, but when I clicked a second piece I got the read-only error.  Eventually I found the culprit.  In the if (action.type === LEFTCLICK) case of reducer.js, I was doing:

    const newBoard = [ ...state.board ];
    zeroFinder(row, col, newBoard);

The problem was that I was shallow-copying an array with nested objects but I needed to deep-copy it so that the values were passed as values instead of references.  My initial quick and dirty solution was to use JSON.stringify(JSON.parse(state.board)), but I knew this solution was terrible for performance, so I used rfdc to create a deep copy of the board.  After thinking about this problem again as I write this, it would be even better to simply use the draft state that immer provides like I should have when I initially implemented immer.  The silver lining is that I was forced to actually find the problem and solve it.  If I had implemented immer correctly the first time around, I wouldn't have actually found my mistake and I wouldn't have been able to learn much from my mistake.

Lesson learned: ALWAYS use Immer or Redux Toolkit for state mutations in a Redux project.

### Cleaning up more questionable decisions

I used the pieces on my board to store a 'val' property which could be a string or a number.  I realized the mistake early, but deferred refactoring it until I had some tests set up because I knew refactoring it was going to be a big task.  That mistake caught up to me as soon as I began refactoring for Typescript so I decided to fix it right in the typescript branch.  Even having those tests to support me and check if and where my code was broken, refactoring was a manageable chore.

I solved the problem by adding an 'isMine' boolean property and using that to conditionally render the display value.

Lesson learned:  Use Typescript from the beginning and/or just don't make silly mistakes like allowing a property type to change in different circumstances.

### Problems using the newest version of React with Enzyme

I have been using Enzyme to render my tests.  There is no adapter for React17 for Enzyme yet, so I am using a community version that claims to work on React17.  Most features work fine, however, it seems that there may be an issue selecting radio buttons.  No matter what type of event I simulate, the onRadioChange method of the Form component will not execute.  After many hours assuming the problem was on my end (this may still be true), I changed my assumption that the problem was with my code and refactored to use @testing-library/react, to render and test my Form component.  This isn't a very interesting problem, but it's a problem worth keeping in mind.  It's still a safe bet to approach a bug as if the problem is 100% your fault, but there are times when you're doing what you're supposed to be doing, but one of your dependencies has a bug in it.  I may make a minimum reproducible example and see what StackOverflow thinks.
