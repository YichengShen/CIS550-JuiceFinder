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
      - Delete the existing index.js files as you wish, they are simply place holders because git don't recognize empty folders.  While you can, the use of index.js is not necessary.
    - Otherwise, create a new javascript file
    - Feel free to create helper js files. It is recommended in React to break pages into smaller reusable components.

2. Implement your js file to create specific page.

3. Import your js file into `src/App.js`, so that you can use the functions exported there. Examples will be provided later.

## Automated tests

### Prettier, ESLint

If you encounter errors related to this part, make sure you have run `npm i` in all of the three dirs: `/`, `/client/`, `server`

Prettier is a code formatter that automatically formats code according to a set of rules. ESLint is a static analysis tool that helps developers find and fix code quality issues. Currently, we are using the popular Airbnb style guide with prettier plugin. It is recommended to install eslint and prettier extensions in your code editor so that they can check your code as you type. We use separate .eslintrc and .prettierrc files for the server and client parts.

If you find certain eslint rules not reasonable or unnecessary for our project, feel free to disable them in the .eslintrc files. See `server/.eslintrc.json` for an example, here `"rules": {"no-console": 0}` disables the no-console check for the server code since it is very common to log things when running a server. Similarly, you can alter code style preference in prettierrc. For example, you can limit characters per line to 80 max.
### Git Hooks

Git hooks are scripts that are triggered by specific Git events, such as committing or pushing changes to a repository. Currently, there are pre-commit and pre-push git hooks for the entire repository, implemented by husky. For better performance, we choose to run hooks only on staged (modified) files.

Before you try to make a commit, husky will fist chekc your code style with prettier and format and save your code, then it will use eslint to run a static analysis on your code. If there are any warnings or errors during this stage, your commit will abort and you have to look at the logs and fix the errors before you commit again. Currently, eslint is set to tolerate 0 warnings, this can be changed in `./lint-staged-pre-commit.js`.

Before you try to push your commits to the remote git repository, husky will run corresponding tests. If the you changed `client/src/App.js`, then corresponding tests such as `client/src/App.test.js`. If there are errors in the tests, your push will abort.

### GitHub Actions

When you push to or create a pull request that try to merge code into the `main` branch, GitHub Actions will run to check your code first. This is a thorough tests on the entire codebase of client or server, depending on which part you have modified. Certain file extensions, such as .css and .md, are ignored.