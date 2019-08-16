import React from 'react'
import './Instructions.css'

function Instructions(props) {

  return (
    <div className="Instructions">
      <h2>Instructions</h2>

      <p><strong>Musical Chairs: Automated</strong> lets you automate the starting and stopping of music in a Musical Chairs game. 
      In a typical Musical Chairs game, players walk around a circle of outward-facing chairs while music plays for a random but fairly 
      short amount of time. When the music stops, players try to sit in an empty chair. Since there is always one chair less than the
      amount of players, there will be one player left standing who didn't sit in an empty chair fast enough, and this player is out of 
      the game along with one chair. The game continues with additional rounds of
      players walking around while the music is playing and removing a person and a chair when it stops. The last round will have 2
      people walking around the chairs, and the winner will be the one who sits in the final chair when the music stops.</p>

      <h3>Physical Game Setup</h3>
      <p>To play Musical Chairs, you'll need 2 or more players and one less chair than there are players. For instance, if there are 5 
        players, you'll need 5 people and 4 chairs to play the game.</p>
      <p> Position the chairs in a circle facing outward. Players should be evenly spaced around the chairs, ready to walk around them
        in the same direction in a circle before the game starts. </p>

      <h3>Game Setup in App</h3>
      <p>On the Game Setup screen, select a song from the <strong>Song</strong> dropdown that you want to be played during the game and fill out the following inputs with numbers:</p>
      <ul className="Instructions-input-list">
        <li><strong>Number of Players</strong> - Enter the number of people (between 2 and 9999) who will be playing the game.</li>
        <li><strong>Min Play Time per Round</strong>  - Minimum amount of time (between 3 and 60 seconds) that the music should play in a round.</li>
        <li><strong>Max Play Time per Round</strong>  - Maximum amount of time (between 5 and 120 seconds) that the music should play in a round.</li>
        <li><strong>Delay Before Starting Game</strong>   - Amount of time (between 1 and 120 seconds) that should pass after the <strong>Let's Go</strong> button
         in <strong>Game Setup</strong> is clicked and before the music starts playing in the first round. This may be needed if a player needs to walk from a computer to the
         area where the game is being played after clicking the <strong>Let's Go</strong> button.</li>
        <li><strong>Delay Between Rounds</strong> - Amount of time to wait (between 1 and 120 seconds) after music stops in a round before the music in the next round starts.  It is the amount of time needed to remove a chair from the game and for the player who didn't find an empty chair to sit in to leave the game.</li>
      </ul>
      <p>Once you're done setting up the game physically and in the app, click the <strong>Let's Go</strong> button.</p>
      
      <h3>Playing the Game</h3>

      <p>After clicking the <strong>Let's Go</strong> button, you'll see the word <strong>Wait!</strong> along with an icon of a hand
      being held up and the amount of seconds until the music starts. Ideally, all players should be positioned around the
      chairs before the <strong>Let's Go</strong> button is clicked, but the person who clicked the button might need to
      walk over to the game area after the button is pressed.</p>

      <p>When the music starts, you'll see the word <strong>Go!</strong> and an icon of a person walking as the selected song is playing.
      As the music plays, players should walk around the chairs. The selected song will play for a random amount of time between
      the <strong>Min Play Time per Round</strong> and <strong>Max Play Time per Round</strong> that was chosen during <strong>Game Setup</strong>.</p>

      <p>After the music stops, <strong>Wait!</strong> will be displayed in the app and players should try to sit in an empty
        chair. The one player left standing after all other players are seated in chairs is out of the game. One chair should also be removed
        from the game and remaining players can get ready to walk around the chairs when the music starts again.</p>

      <p>When the music starts back up, you can start the next round of walking around the chairs while the music is playing
      and removing a player and chair from the game when it stops.</p>

      <p>The game continues like this until 2 players are left in the final round: the one who sits in the final chair after the music stops wins!</p>

      <h3>Start a New Game with New Options</h3>
      <p>At any time while a game is being played or when you see <strong>Game Over</strong>,  click 
      the <strong>Return to Game Setup</strong> button to end the current game and return to <strong>Game Setup</strong> to 
      choose options for starting a new game.</p>
      <h3>Restarting the Game with the Same Options</h3>
      <p>At any time while a game is being played or when you see <strong>Game Over</strong>, click the <strong>Restart Game</strong> button
      to start a new game right away with the same options as the game that was being played.</p>
      </div>
  )
}

export default Instructions