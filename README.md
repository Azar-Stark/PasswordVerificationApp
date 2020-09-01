# PasswordVerificationApp

PasswordVerificationApp is a web application demonstrating an end to end app using React, Typescript, Redux, Spring Boot, H2, JPA.


Front-End

A simulation of verifing password for an account, where the user enter a username, a password and re-enter password to confirm match, and rules, which are:
1. At least one lowercase character.
2. At least one uppercase character.
3. At least one digit.
4. Password length must be greater than 6.

The flow / features of the app
A username and 2 passwords applied the above passwords are required to enable:
1. The submit button which sends the API request.
  1.1 If succeeded a modal with a success message will pop-up.
  1.2 If failed a modal with a failure message will pop-up.
2. The 4 red labels will change color from red to green according to the above rules, while typing in the text boxes.
3. A loading indicator when clicking the button, indicates the start of the API request to failure / success response / storing in Redux state.

Files:
Plain and simple 'Actions', 'Reducers' including 'Reducers Mapper', A 'mother Component' that is wrapped to 'Store Provider'.


Back-End

Done with Spring Boot, JPA, to handle the /saveUserPassword API which looks for a username in the H2 DB, if found it'll update it's password, otherwise, a new user will be created with it's new password.

Backend includes a user POJO, a repository config to persist the users info, a rest controller to handle the API with JPA, H2 DB details to initialize and connect to the DB, CORS filtering to work with different hosts etc.


Getting Started

Run the following commands on each end:
a. Front-End - "npm install" & "npm start"
  a.1 Recommended to install redux-devtools to take a good look at actions and reducers.
  
  App state is initialized with the API as empty object, after requesting the saveUserPassword API it will update the API state with callStatus to indicate loading and success.
  A successful API will demonstrate storing the response in the API state.
  
b. Back-End - "mvn clean install" & "mvn spring-boot:run"
  b.1 User can enter to H2 via localhost:8081/h2-console with username/pass: admin/admin to check changes in DB.
  
  The DB initializes with a username/pass of DockDock/DockDock123.
  



