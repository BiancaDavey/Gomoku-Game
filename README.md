# Gomoku-Game

Gomoku is a React program creating a Gomoku game for the user to play. The program provides for the user to play as player one against player two. The game is won by player one placing five blue squares in a row horizontally, vertically or diagonally, or by player two placing five white squares in a row horizontally, vertically or diagonally.

## Features

* Colour-coded display of squares selected by player one being black with a blue border and by player two being white with a pink border.
* The game results in a draw if no free squares remain on the game board.
* Status of the game is displayed, including which player's turn it is and whether the game has been won by player one, won by player two or resulted in a draw.
* Size of game board can be selected by the user.
* Display of the id and final status of each saved game on the Games History page.
* Display of the moves made in each game in order, including the square selected and the player who selected the square.
* Validation of user input for logging in, with an error message displaying if the user has not entered a valid username and password.
* User validation with token.
* Restricted access to the Game, Games History and Game Log pages of the application, being only for authenticated users who have logged in successfully.
* Backend with Express and MongoDB.

## Bonus Features

* Gomoku title with flickering "neon light" animation effect.

## Installation & Set Up

1. Navigate into the gomoku game react folder: `cd gomoku-game-react`
2. Start the app: `yarn start`
3. Go to [localhost:3000](http://localhost:3000)
4. Navigate into the gomoku game service folder: `cd ..`, `cd gomoku-game-service`
5. Start the backend service: `yarn run dev`
6. Open a new tab in the web browser and navigate to the Postman Collection for the game: [Postman Collection](https://www.postman.com/collections/6be45320a282151c890f).

## Game Instructions

1. Click on the "Login" button on the header of the React application to be redirected to the Login page. Type the username: admin and the password: admin2022 into the username and password fields, and click Login to log in and be redirected to the Home Page. This pre-configured user has one past game saved.
2. Alternatively, click on the "Login" button the header, and then click on the "Sign Up" button on the header to be redirected to the Sign Up page. Enter a username and password and click on the "Sign Up" button to sign up as a new user.
3. On the Home Page, click on the drop down menu and choose a size for the game board.
4. Click on the Start button to be redirected to the Games page to play the game. The game status is displayed above the game board.
5. Click on a square to begin the game as player one. Clicking on a square places a black square for player one. Every second square clicked on will place a black square for player one.
6. Click on another square to place a white square for player two. Every second square clicked on will place a white square for player two.
7. Place five squares in a row horizontally, vertically or diagonally for player one or player two to win the game. Once the game is won, it will become read-only and no more squares can be selected.
8. Click the Leave button to save the game and be redirected to the Games Page, displaying the game id, final status and date for each past saved game.
9. Click on the Restart button before the game has ended to restart the game.
10. Click on the View Game Log button next to a game id to be redirected to the Game Log page for the game.
11. On the Game Log page, the game final status and game board with each move made in the game in order can be viewed.
12. Click the Back to be redirected back to the Games History page. 
13. Click on the Gomoku text in the header to be redirected from any page to the Home Page.

## Usage Example

* Login page with credential validation
[![Gomoku-Game-Login-Validation.png](https://i.postimg.cc/XvWKtj2q/Gomoku-Game-Login-Validation.png)](https://postimg.cc/Wd9Jkvcc)

* Sign-Up page
[![Gomoku-Game-Sign-Up.png](https://i.postimg.cc/1tfKrWCr/Gomoku-Game-Sign-Up.png)](https://postimg.cc/KkhLZ5y1)

* Home page with game board size selection
[![Gomoku-Game-Home-Page.png](https://i.postimg.cc/WzZ6QdPD/Gomoku-Game-Home-Page.png)](https://postimg.cc/YLpWFq0k)

* Game Board with active game status and game board
[![Gomoku-Game-Game-Board.png](https://i.postimg.cc/ncvG29kg/Gomoku-Game-Game-Board.png)](https://postimg.cc/nChmczNG)

* Game Board with winner and read-only game board
[![Gomoku-Game-Game-Board-Winner.png](https://i.postimg.cc/wM5RXLpk/Gomoku-Game-Game-Board-Winner.png)](https://postimg.cc/Cn1KYZdZ)

* Past Games page
[![Gomoku-Game-Past-Games.png](https://i.postimg.cc/X7QpnV7X/Gomoku-Game-Past-Games.png)](https://postimg.cc/dLZqBcCK)

* Game Log displaying final status and read-only game board
[![Gomoku-Game-Game-Log.png](https://i.postimg.cc/Hk8HFHrq/Gomoku-Game-Game-Log.png)](https://postimg.cc/DShtb9d6)

* The game can be viewed in Postman by sending a GET Games request with authorisation being the Bearer Token for the user.
[![Gomoku-Game-Postman.png](https://i.postimg.cc/9QLrVG0N/Gomoku-Game-Postman.png)](https://postimg.cc/4YhJQHzz)

* The game can be viewed in MongoDB.
[![Gomoku-Game-Mongo-DB.png](https://i.postimg.cc/MTpkwQct/Gomoku-Game-Mongo-DB.png)](https://postimg.cc/WDCY6twJ)

## Author

Bianca Davey

bdavey2@myune.edu.au