# Message Board Application

## Tech Stack

- React
- Redux using redux toolkit
- Styled Components
- Cypress
- Fetch API
- The web uses are very trivial signin/register functionality to demonstrate the ability to post/edit/reply to threads based on the user
- GitHub Actions for running the test cases post commit on "main" branch (https://github.com/samrat-ghosh-13/chatroom/actions)
- Deployment using vercel at https://chatroom-tau.vercel.app/ (using deploy branch - https://github.com/samrat-ghosh-13/chatroom/tree/deploy) and fake JSON Server is hosted at "https://my-json-server.typicode.com/samrat-ghosh-13/json-server/". Use any user from db.json file, the changes are not persisted as JSON Server cannot accomodate that

In the project directory, you can run:

## Available Scripts

### For running the app in local

use `yarn start` and `yarn server` in two different terminal windows.

### For testing the app in local

use `yarn start` and `yarn server` in two different terminal windows and - 
- `yarn test` for running the tests in terminal
- `yarn test:headless` for running the tests in headless browser
- `yarn test:e2e` for running the End to End test cases

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `yarn server`

use yarn server to start the Fake JSON Server to fetch the data from the API Endpoints, which in turn fetch data from db.json
Runs the JSON server in the development mode.<br />
Open [http://localhost:8000](http://localhost:8000) to view it in the browser.

### `yarn test`

use yarn test to do unit testing of the components and the reducers using cypress.io

### `yarn test:e2e`

use yarn test:e2e to do end to end testing using cypress.io

### `yarn build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Functionalities
- A client can create a new public message thread (post signin)
- A client can add a public reply to a message thread (post signin)
- A client can modify their own messages (post signin)
- A client can delete their own messages (post signin)
- Public message threads and replies are viewable (post signin)
- A client can sign in or register

## Lighthouse reports

Web vitals of the application in Desktop and mobile - 

Desktop -

![Screenshot 2021-10-27 at 3 15 22 AM](https://user-images.githubusercontent.com/22419506/138965744-bac996bf-7809-4a98-98ed-5927f054059f.png)

Mobile - 

![Screenshot 2021-10-27 at 3 18 21 AM](https://user-images.githubusercontent.com/22419506/138965980-3f7e9d8b-1006-4422-b3cd-d415254bd5c4.png)

## What can be improved? 

- using color variables
- using margin, spacing variables
- using constants to store the static texts, that can support multiple languages
