# Minesweeper

## Inspiration

I've always enjoyed puzzle games like Sudoku and Minesweeper.  I've tried to keep the styling and gameplay as close as possible to the original.

## About

I initally created a bare minimum implementation of [Minesweeper](https://github.com/jsmithb117/mini-apps/tree/master/minesweeper) as part of my HackReactor coursework.

This repo is closely based on that app and I will use this repo as a platform for learning/reinforcing other technologies (Typescript, GraphQL...).

I intend to make all major changes in Branches and integrated into the Main branch with Pull Requests.  ~~Main branch changes should be sporadic and minor, ex: Removed rfdc dependency, Adjusted css to responsively render buttons...~~ No more main branch commits!

## Branches

### Completed
bareMinimumMinesweeper - A fully functional 10x10 Minesweeper board.  No bells, no whistles, state is held in the App component.

redux - Same board, different state management.  Uses Redux Hooks and immer.

testing - PR's include coverage reports.

typescript - Refactors for typescript

forms - Adds a display at the top for # of mines remaining and a form at the bottom to change the board size

pause - Adds the ability to cover the whole board and pause time.

fullstack - Stores each user score for each default board, top 10 global scores for each default board, and total games played. Renders top user score for each default board and top ten global scores for each default board.

query - Uses React Query for fetching data from server

graphql - Refactor server and client to use GraphQL for queries

flask-server - Flask server that can optionally replace the Express server (in ./minesweeper/server do 'export FLASK_APP=flaskServer', then 'flask run')


### Next up / Work In Progress

dbRefactor - Refactor db schema to simplify data handling by server.

### Todo:

* ~~More Testing~~ Always more testing.

* ~~Make app responsive~~ ~~Responsive-ish~~ It is no longer responsive-ish.  TODO

* ~~PropType validation~~ ~~Complete~~ Not necessary with Typescript

* ~~Typescript~~ Complete

* ~~Use separate reducer and actionCreators for form actions and use combineReducers~~ - Complete

* ~~Ability to reset and create a new board.~~

* ~~Form for reset board and Multiple board sizes, maybe X*Y board or easy/medium/hard.~~ - Complete

* ~~Styling updates to match what 'real' minesweeper looks like when you lose~~ - Complete

* ~~Track 'score' (time to complete)~~

* ~~Add 'Pause' button that covers entire board and stops incrementing time~~ - Complete

* ~~Express/Mongo (REST API) server and username (plaintext auth) for data persistence between sessions, Track 'score' (time to complete)~~

* ~~Add auth for users (plaintext)~~ Merged with Express/Mongo

* Add salt/hash for passwords - I may do it manually as a learning experience or use a library or SaaS product

* ~~Add High score board~~ - Merged with Express/Mongo

* ~~Implement React Query where Redux uses server data~~ - Complete

* ~~GraphQL for queries~~

* Flask server to optionally replace Express server

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

I used the pieces on my board to store a 'val' property which could be a string or a number.  I realized the mistake early, but deferred refactoring it until I had some tests set up because I knew refactoring it was going to be a big task.  That mistake caught up to me as soon as I began refactoring for Typescript so I decided to fix it right in the typescript branch.  Having those tests to support me to check if and where my code was broken, refactoring was a manageable chore.

I solved the problem by adding an 'isMine' boolean property and using that to conditionally render the display value.

Lesson learned:  Use Typescript from the beginning and/or just don't make silly mistakes like allowing a property type to change in different circumstances.

### Problems using the newest version of React with Enzyme

I have been using Enzyme to render my tests.  There is no adapter for React17 for Enzyme yet, so I am using a community version that claims to work on React17.  Most features work fine, however, it seems that there may be an issue selecting radio buttons.  No matter what type of event I simulate, the onRadioChange method of the Form component will not execute.  After many hours assuming the problem was on my end (this may still be true), I changed my assumption that the problem was with my code and refactored to use @testing-library/react, to render and test my Form component.  This isn't a very interesting problem, but it's a problem worth keeping in mind.  It's still a safe bet to approach a bug as if the problem is 100% your fault, but there are times when you're doing what you're supposed to be doing, but one of your dependencies has a bug in it.  I may make a minimum reproducible example and see what StackOverflow thinks.

Update: I posted something on StackOverflow  ( https://stackoverflow.com/questions/69559144/testing-radio-buttons-in-react-17-with-enzyme ) and have gotten 0 responses in 7 days.

### Typescript...
This one's a little different than the others.  I was able to solve the others and write about it.  I haven't yet figured this one out so I'm writing about a problem without writing about the solution.

I've tried to only use the any type temporarily until I am able to code it properly, but I've found a situation where I'm stuck.  clickReducer takes in a state (slice) and an action.  The state is easy to type but I'm having trouble with the action.

There are many different shapes of actions, and I'm having trouble defining a type that will work with all of them, specifically, my problem is in my understanding of how to use Unions and Intersections.  I've tried the following that works in some cases, but not in others:
interface Type1  {
  type: string,
};
interface Type2 extends Type1 {
    payload: { length: number }
};
interface Type3 extends Type1 {
    payload: { width: number }
};

For Type3, TS expects: { action: 'somestring', width: 10 };
If I do a Union of the three (type Type4 = Type1 | Type2 | Type3), it would expect { action: 'somestring' }, which is not what I want.
If I do an Intersection of the three, it would expect { length: 10, width: 10 }, which is also not what I want.
If I were to do a Union of the three and the Intersection of the three (type Type4 = Type1 | Type2 | Type3 | (Type1 & Type2 & Type 3)), it would expect { action: 'somestring', payload: {length: 10, width: 10}}, which is again not what I want.

I would like the payload to either be { length: number } or { width: number }.
I've even tried to use optional properties like:
{ type: string,
  payload?: {
    width?: number,
    length?: number
  }
}
but again, this doesn't work.  The only thing that I can think of that would work is to add all properties to all actions and only use the properties that I need but that just seems wrong.

Until I solve this problem, I'm going to type the actions as 'any' in the reducers.  There's also another any type in store.ts, but that's a problem for another day.

Update: I ended up going with the 'add all properties to all actions' route in the fullstack branch.  I added a function that takes in an 'options' object that creates an action with all properties set to null, then updates the necessary properties of the action from the options object. I tried to create it in such a way that if I need to create a new action with a new payload property, I only need to change the interface and the 'baseActionCreator' function, but there may be other things I'd need to update.  If I find that this solutions isn't easily maintainable, I'll explore other patterns to refactor to.  It seems to work fine right now, time will tell.

Update 2: My solution works, but I've found a way better solution (the 'right' answer).  The redux package has an 'AnyAction' type that you can import and use instead of my janky solution.

### React Query

I've run into some trouble refactoring for the useMutation hook from React-Query.

The app runs as expected in the browser, and even passes all tests but I get a long series of errors stating:

    "Warning: An update to App ran an effect, but was not wrapped in act(...)..."

The documentation is a little confusing on this topic.  It says:

    If you're using React 16.8+ and .mount(), Enzyme will wrap apis including .simulate(), .setProps(), .setContext(), .invoke() with ReactTestUtils.act() so you don't need to manually wrap it.

    A common pattern to trigger handlers with .act() and assert is:

    const wrapper = mount(<SomeComponent />);
    act(() => wrapper.prop('handler')());
    wrapper.update();
    expect(/* ... */);

    We cannot wrap the result of .prop() (or .props()) with .act() in Enzyme internally since it will break the equality of the returned value. However, you could use .invoke() to simplify the code: ...

My understanding of how this is supposed to work is not what is happening.

I'm using React 17.0.2 and mount.  The only invoking I'm doing is with .simulate so I shouldn't need to wrap anything in act.  But I'm still getting the errors.

I tried narrowing down the problem by disabling all tests that cause this error, then enabling only one simple test.  I pared it down to the basics:

    describe('Renders App and does a simple test', () => {
      let store= createStore(rootReducer, initialTestState);
      let wrapper: ReactWrapper;
      beforeEach(() => {
        store = createStore(rootReducer, initialTestState);
        wrapper = mount(
          <QueryClientProvider client={queryClient}>
          <Provider store={store}>
            <React.StrictMode>
              <App test={false} />
            </React.StrictMode>
          </Provider>
          </QueryClientProvider>
      )});

    it('should be true', () => {
      expect(true).toBe(true);
    })});

This still returns an error each time useEffect is triggered.

I wrapped the mount call:

    wrapper = act(() => {
      mount(
        <QueryClientProvider client={queryClient}>
        <Provider store={store}>
          <React.StrictMode>
            <App test={true} />
          </React.StrictMode>
        </Provider>
        </QueryClientProvider>
      );
    })

Same errors.

Since the app works as intended, and the tests pass, I'm going to ignore the errors for now.  This problem may be related to the issues I was having with React17 and Enzyme.

### More questionable decisions catching up with me

When I initially create a users high scores, I decided to not set the values as null as it might cause errors so I set the seconds property as positive infinity so that when the user completes their first board, the db method will check that the score is less than infinity and set that as its new high score.  The problem with that is that GraphQL doesn't recognize Infinity as an Int type.  There is a way to create custom scalar types and there is also a pretty comprehensive type library (graphql-scalars), but a simpler solution would be to set the initial value of seconds as a number higher than a real score could be or even simpler, not add a score to the new users mongo document.  For now I'm just going to change it to a high number.  Later, I'll remove the default scores and refactor wherever I run into problems with that.

One more minor issue with this, GraphQL doesn't have a Date type so I've set it as a String.  I'm not sure if this will cause problems on the client yet.

### Python

The Flask server in this project is my first Python code written.  Including about 4 hours I took to familiarize myself with Python syntax, it took me about 10 hours of coding and research to complete the server.

### Database schema

Normally, I plan out what data my client needs and shape the database to match that.  It makes it easier to write the server logic, especially for GET endpoints.  I didn't do that in this case, mostly because I wasn't sure all of the data that the client required.

I've updated the database schema to more closely resemble the data my client needs.  This simplifies data handling on the server and makes the code easier to read.

Lesson learned: If I matched the client data requirements in the database schema as I went, I wouldn't have needed to refactor.