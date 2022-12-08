# Money Pot 
## CPSC 362 Sec 01 Class Number 13548 Fall 2022
## Developers: Nicholas Caro, Will Sidaris

### Project Description
Our application is a rotating savings account manager. 

A rotating savings and credit association (ROSCA) is a group of individuals who together act as an informal financial institution. A ROSCA uses a common fund to which individuals contribute a set amount regularly (usually monthly), while one member withdraws the funds at each meeting (Investopidia). 

Users can use our application to create, find, and delete their rotating savings account (in our app we call them money pots)

Our client and server run locally on different points. Money pots are stored in our MongoDb database via api requests. 

### How To Run Via Terminal

##### Requirements
- Npm
- Node (npm will be installed with node)
  - You can install view homebrew `brew install node`
- Maven
  - You can install via homebrew `brew install maven`

##### How to Run Client
1. From project root `cd client`
2. (Only needs to be done once) Install dependecies fron package.json `npm install`
3. To start client `npm start`

##### How to Run Server
1. From project root `cd server`
2. Build Spring Boot Project with Maven `mvn package`
3. To start the server `mvn spring-boot:run`


### Bugs To Fix
- No error handling that position input is a valid int and that there are no duplicates
- When finding a money pot, if money pot does not exist an empty object will be presented



