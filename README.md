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

====
TODO: 
* Express
* MongoDB
====

## Bonus Features

* Gomoku title with flickering "neon light" animation effect.

## Installation

1. Navigate into the gomoku game react folder: `cd gomoku-game-react`
2. Start the app: `yarn start`
3. Go to [localhost:3000](http://localhost:3000)
4. Navigate into the gomoku game service folder: `cd ..`, `cd gomoku-game-service`
5. Start the backend service: `yarn run dev`
6. Open a new tab in the web browser and navigate to the Postman Collection for the game: [Postman Collection](https://www.getpostman.com/collections/6be45320a282151c890f).
7. Click on the "Login" button on the header of the React application to be redirected to the Login page. 
8. Type the username: admin and the password: admin2022 into the username and password fields, and click Login to log in and be redirected to the Home Page.

==== 
TODO: add Postman, MongoDB. 
=====

## Game Instructions

1. On the Home Page, click on the drop down menu and choose a size for the game board.
2. Click on the Start button to be redirected to the Games page to play the game. The game status is displayed above the game board.
3. Click on a square to begin the game as player one. Clicking on a square places a black square for player one. Every second square clicked on will place a black square for player one.
4. Click on another square to place a white square for player two. Every second square clicked on will place a white square for player two.
5. Place five squares in a row horizontally, vertically or diagonally for player one or player two to win the game. Once the game is won, it will become read-only and no more squares can be selected.
6. Click the Leave button to save the game and be redirected to the Games Page, displaying the game id, final status and date for each past saved game.
7. Click on the Restart button before the game has ended to restart the game.
8. Click on the View Game Log button next to a game id to be redirected to the Game Log page for the game.
9. On the Game Log page, the game final status and game board with each move made in the game in order can be viewed.
10. Click the Back to be redirected back to the Games History page. 
11. Click on the Gomoku text in the header to be redirected from any page to the Home Page.

## Usage Example

=====
TODO:
* Add game images.
* Add images of Postman.
* Add images of MongoDB.
=====

## Author

Bianca Davey

bdavey2@myune.edu.au