const PLAYERS = [
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
class Model {
  constructor(players) {
    this.players = players;
    this.inputValue = null;
  }
  addPlayer(text) {
    this.players.push({
      name: text.value,
      score: 0,
      id: this.players.length + 1
    })
    text.value = '';
    this.notify();
  }
  decrease(player) {
    player.score--;
    this.notify();
  }
  increase(player) {
    player.score++;
    this.notify();
  }
  totalPoints() {
    return this.players.map(item => item.score).reduce((total, item) => total + item);
  }
  subscribe(render) {
    this.render = render;
  }
  notify() {
    this.render();
  }
}
class StopWatch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      counter: 0,
      button: 'start'
    }
  }
  startTimer() {
    this.timer = setInterval(() => {
      this.setState((prevState)=>({
        counter: prevState.counter + 1
      }));
    }, 1000);
    this.setState({
      button: 'stop'
    })
  }
  resetTimer(){
    this.setState({
      counter: 0
    });
  }
  stopTimer () {
    clearInterval(this.timer);
    this.setState({
      button: 'start'
    })
  }
    
  render() {
    return (
      <div className='stopwatch'>
        <h2>STOPWATCH</h2>
        <div className='stopwatch-time'>{this.state.counter}</div>
        <button onClick={this.state.button==='start'?()=>this.startTimer():()=>this.stopTimer()}>{this.state.button}</button>
        <button onClick={()=>this.resetTimer()}>reset</button>
      </div>
    );
  }
}
const Header = ({ model }) => {
  return (
    <div>
      <header className='header'>
        <table className='stats'>
          <tbody>
            <tr><td>PLAYERS:</td><td>{model.players.length}</td></tr>
            <tr><td>TOTAL POINTS:</td><td>{model.totalPoints()}</td></tr>
          </tbody>
        </table>
        <StopWatch />
      </header>
    </div>
  );
}
const Player = ({ player }) => {
  return (
    <div className='player' key={player.id}>
      <div className='player-name'>{player.name}</div>
      <div className='player-score counter'>
        <button className='counter-action decrement' onClick={player.score ? () => model.decrease(player) : ''}>-</button>
        <span className='counter-score'>{player.score}</span>
        <button className='counter-action increment' onClick={() => model.increase(player)} >+</button>
      </div>
    </div>
  );
}
const PlayerList = ({ model }) => {
  return (
    <div>
      {
        model.players.map(player => {
          return <Player player={player} />
        })
      }
    </div>
  );
}
const PlayerForm = ({ model }) => {
  return (
    <div className='add-player-form'>
      <form onSubmit={e => {
        e.preventDefault();
        model.addPlayer(model.inputValue);
      }}
      >
        <input type="text" placeholder='ENTER A NAME' onChange={e => (model.inputValue = e.target)} />
        <input type="submit" value='add player' />
      </form>
    </div>
  );
}
//
//
const Application = ({ model }) => {
  return (
    <div className='scoreboard'>
      <Header model={model} />
      <PlayerList model={model} />
      <PlayerForm model={model} />
    </div>
  );
}


let model = new Model(PLAYERS);
let render = () => {
  ReactDOM.render(
    <Application model={model} />,
    document.getElementById('container')
  );
};

model.subscribe(render);
render(); 