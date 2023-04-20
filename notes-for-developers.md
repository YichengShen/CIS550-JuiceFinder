# Notes for Developers

## General Stuff

### Manage depedencies

When you introduce a new dependency (install a new package), add it to `package.json` by using `-s` or `--save-dev` flags so that other collaborators can also `npm install` the same version of it.

- To install *package needed in depolyment* and add an entry to the `"dependencies"` attribute of a `package.json` file, run the following command:

    `npm install <package-name> -s`
    
- To install *package needed only in development* and add an entry to the `"devDependencies"` attribute of a `package.json` file, run the following command:

    `npm install <package-name> --save-dev`

- To delete a package and remove an entry in `package.json`, run the following command:

    `npm uninstall <package_name>`


## Server

### How to add new routes
1. Go to `./routes` folder and check whether a javascript file corresponding to the routes you want to implement exists
    - If a file exists, implement routes in that file
    - Otherwise, create a new javascript file

2. In `./routes/index.js`, add a line like `router.use("/vehicles", require("./vehicles"));` to configure your route. 

   (Specifically, the example line is setting up a route for all requests that start with `/vehicles` and forwarding those requests to another router middleware defined in a separate file located at `./vehicles.js`.)

3. Implement your routes in the javascript files that you configured in Step 2. See `./routes/vehicles.js` for an example.


## Client

### How to create a page
1. Go to `./src` folder and check whether a javascript file corresponding to the page you want to implement exists
    - If a file exists, write react code in that file
      - Delete the existing index.js files as you wish, they are simply place holders because git don't recognize empty folders.  While you can, the use of  a `index.js` is not mandatory.
    - Otherwise, create a new javascript file
    - Feel free to create helper js files. It is recommended in React to break pages into smaller reusable components.

2. Write [component(s)](https://react.dev/learn/your-first-component) inside the js file to create specific pages or elements. We use functional components as we did in HW2. Export the components so that they can be used in other js files. See `./src/home/Map.js` for an example.
    - You can pass props into components just like passing arguments into functions. To share props between 2 or more components, we can lift the props definition to their parent and passing down props into the child components. This is called prop drilling, see `./src/home/index.js`, `./src/home/Map.js`, `./src/home/MapInput.js` for an example.

3. Import your js file into `src/App.js` and reference them inside <Route />. For example, `<Route path="/login" element={<Login />} />` tells react to render the `Login` component when you visit the '/' route, i.e. `http://localhost:3000/` if you are running react development server locally.

### Theme related

- We use [MUI theme](https://mui.com/material-ui/customization/theming/).
- Themes are set in `./client/src/theme.js`.
- A useful tool is [MUI Theme Creator](https://bareynol.github.io/mui-theme-creator/). You could try different visual options and it generates the code we need in `theme.js`.
- For using theme, check `./client/src/landingPage/index.js` for an example.

## Automated tests

If you encounter errors related to this part, make sure you have run `npm i` in all of the three dirs: `/`, `/client/`, `server`

### Prettier, ESLint

Prettier is a code formatter that automatically formats code according to a set of rules. ESLint is a static analysis tool that helps developers find and fix code quality issues. Currently, we are using the popular Airbnb style guide with prettier plugin. 

It is recommended to install eslint and prettier extensions in your code editor so that they can check your code as you type. We use separate .eslintrc and .prettierrc files for the server and client parts.

If you find certain eslint rules not reasonable or unnecessary for our project, feel free to disable them in the .eslintrc files. See `server/.eslintrc.json` for an example, here `"rules": {"no-console": 0}` disables the no-console check for the server code since it is very common to log things when running a server. Similarly, you can customize code style preference in prettierrc. For example, you can limit characters per line to 80 max.

### Git Hooks

Git hooks are scripts that are triggered by specific Git events. Currently, there are pre-commit and pre-push git hooks for the entire repository, implemented by husky. For better performance, we choose to run hooks only on staged (modified) files.

#### Pre-Commit Hook

Before you try to make a commit, husky will: 
- First check your code style with prettier and format and save your code, 
- Then it will use eslint to run a static analysis on your code. 
    - If there are any warnings or errors during this stage, your commit will abort and you have to look at the logs and fix the errors before you commit again. 
    - Currently, eslint is set to tolerate 0 warnings, this can be changed in `/lint-staged-pre-commit.js`.

#### Pre-Push Hook

Before you try to push your commits to the remote git repository, husky will run corresponding tests. If the you changed `client/src/App.js`, then corresponding tests such as `client/src/App.test.js`. If there are errors in the tests, your push will abort. 
- The hook is set to check file that differs between your local branch `<branch>` and a remote branch with the same name, e.g. `origin/<branch>`. Therefore, when a push fails, double check that you are pushing to the branch of the same name on your remote server. For example, suppose you are on local branch `client`, and you are tracking remote repo `origin`, then you should push your commits to `origin/client`, which is almost always the case.
- It suggested that the remote branch that you are trying to push already exists. Otherwise, you may see unexpected behaviors. You can create a new branch using the github.com web UI.

#### Bypass Git Hooks

Though highly discouraged, you can append `--no-verify` to a commit or push action to bypass husky checks. Please only do so when you know what you are doing.

### GitHub Actions

When you push to or create a pull request that try to merge code into the `main` branch, GitHub Actions will run to check your code first. This is a thorough tests on the entire codebase of client or server, depending on which part you have modified. Certain file extensions, such as `.css` and `.md`, are ignored.
