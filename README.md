# CIS550-JuiceFinder

## Milestones Google docs
- [Milestone 1](https://docs.google.com/document/d/1pku4BXDyfwcwIl79Wt63EHu3fOGUqHgm4nena25gOHI/edit?usp=sharing) (Read Only)
- [Milestone 2](https://docs.google.com/document/d/1PfW73ovIRpKvGcIU_ZMnfBr6SQaT2bWj0P3VmOTvJLo/edit?usp=sharing) (Read Only)
- [Milestone 3](https://docs.google.com/document/d/1tS1bNB624FFI93yG8ylwTZ-AxITk1LdJnpr6UCQTenA/edit?usp=sharing) (Read Only)
- [Milestone 4](https://docs.google.com/document/d/1DBQwfZ47GZomX-pLMmrBX_h1hd0nSFBgpHMD6minqFE/edit?usp=sharing) (Read Only)

## Code for Data Cleaning, Wrangling, and Ingesting

See `/datasets/JuiceFiner_DDL.sql` and `/datasets/preprocessing/`.

## Dependencies Installation
- Install dependencies on the root folder
    ```
    npm install
    ```
- Install server-side dependencies
    ```
    cd server
    npm install
    ```
- Install client-side dependencies
    ```
    cd client
    npm install --legacy-peer-deps
    ```

## Run the Application
- Start the server
  ```
  cd server
  npm start
  ```
- In a new terminal, start the client
  ```
  cd client
  npm start
  ```
After a few seconds, you will see a webpage pops up in your browser with URL `localhost:3000`

## Safety Note
Both `/server/.env` and `/client/.env` contain sensitive credentials such as database password and API key. **Please keep them confidential.**