# Notes for Developers

## Server

### How to add new routes
1. Go to `./routes` folder and check whether a javascript file corresponding to the routes you want to implement exists
    - If a file exists, implement routes in that file
    - Otherwise, create a new javascript file

2. In `./routes/index.js`, add a line like `router.use("/vehicles", require("./vehicles"));` to configure your route. 

   (Specifically, the example line is setting up a route for all requests that start with `/vehicles` and forwarding those requests to another router middleware defined in a separate file located at `./vehicles.js`.)

3. Implement your routes in the javascript files that you configured in Step 2. See `./routes/vehicles.js` for an example.
