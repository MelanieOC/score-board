let PLAYERS = [
  {
    name: "Jim Hoskins",
    score: 31,
    id: 1,
  },
  {
    name: "Andree Hoskins",
    score: 35,
    id: 2,
  },
  {
    name: "Alena Hoskins",
    score: 42,
    id: 3,
  },
];

const Header = props => {
  return (
    <div>
      <header className='header'>
        <table className='stats'>
          <tr><td>PLAYERS:</td><td>{props.players.length}</td></tr>
          <tr><td>TOTAL POINTS:</td><td>{props.players.map(a => a.score).reduce((a, b) => a + b)}</td></tr>
        </table>
        <div className='stopwatch'>
          <h2>STOPWATCH</h2>
          <h1 className='stopwatch-time'>0</h1>
          <button>start</button><button>reset</button>
        </div>
      </header>
    </div>
  );
}
const PlayerList = props => {
  return (
    <div>
      {
        props.players.map(a => {
          return <div className='player'>
            <div className='player-name'>{a.name}</div>
            <div className='player-score counter'>
              <button className='counter-action decrement'>-</button>
              <span className='counter-score'>{a.score}</span>
              <button className='counter-action increment'>+</button>
            </div>
          </div>
        })
      }
    </div>
  );
}
const PlayerForm = props => {
  return (
    <div className='add-player-form'>
      <form>
        <input type="text" placeholder='ENTER A NAME' />
        <input type="submit" value='add player' />
      </form>
    </div>
  );
}
//
//
const Application = ({ title, players }) => {
  return (
    <div className='scoreboard'>
      <Header players={players} />
      <PlayerList players={players} />
      <PlayerForm />
    </div>
  );
}

ReactDOM.render(<Application title="Scoreboard" players={PLAYERS} />, document.getElementById('container'));