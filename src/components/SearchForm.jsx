import React, {useState} from 'react'

export default function SearchForm({ retrieveGames }) {
  const [game, setGame] = useState("");

	return (
		<form onSubmit={(e) => retrieveGames(e, game)}>
			<input type="text" name="game" id="game" placeholder="Enter a game" value={game} onChange={(e) => setGame(e.target.value)}/>
			<button type="submit">Search for Games</button>
		</form>
	)
}
