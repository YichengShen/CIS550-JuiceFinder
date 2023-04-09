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
