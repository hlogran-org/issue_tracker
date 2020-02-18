# Github Issue Tracker
## Steps to run the application
### 1. Set up GitHub access
To connect to the GitHub API, we need to set up a config file with the connection information. The file must be placed under the `server/src/config` and must be named `gh-connection.json`. The file's format is as follows:
```
{
  "ORGANIZATION": "some_organization_name",
  "REPO": "some_repository_name",
  "TOKEN": "github_oauth_token"
}
```
`ORGANIZATION` being the organization owner of the repository whose issues will be tracked.  
`REPO` being the name of the repository whose issues will be tracked.  
`TOKEN` being the OAuth token used to connect to the GitHub API.  

For more information check the [README.md](server/src/config/README.md) file inside the `server/src/config`.
### 2. Run the project
This can be done in two ways: manually or, if you are a docker user, with docker-compose.
#### Manually
To run the project manually, you have to execute the following commands in order, from the project's base folder:
```
cd server  
npm install  
cd ..  
cd client  
npm install  
cd ..  
npm install  
npm start
```
#### docker-compose
With docker-compose, this can be done with a single instruction, run from the project's base folder:
```
docker-compose up
```
### 3. Open the web page
Finally, open your favorite browser and go to `http://localhost:3000`.


## Notes
The priority score of each issue is calculated using the priority labels assigned to it, according to the following table:

Label name | Weight
---------- | ------
Critical Priority | 1000
Very High Priority | 500
High Priority | 50
Mid Priority | 15
Low Priority | 7

In case an issue has more of one of these labels, only the one with the highest weight will be taken into account.  
In case none of these labels are found in the issue, the weight will be 1.
