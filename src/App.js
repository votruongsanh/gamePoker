import { useState } from 'react';
import './App.css';
import Player from './component/Player/Player';
import { Cards } from './util/cards';
import BoardGame from './util/boardGame';
import { numbersCard, symbols } from './constant/porker';

const boardGame = new BoardGame(4);
const cardsObj = new Cards();
const newCards = cardsObj.new(numbersCard, symbols);

function App() {
  const [cards, setCards] = useState([...newCards]);
  const [players, setPlayers] = useState(boardGame.players)
  const [decks, setDecks] = useState(boardGame.decks);
  const [winner, setWinner] = useState('');

  //shuffle playing cards
  const shuffleCard = () => {
    let arrSuffle = [...cards];
    const newArrSuffle = cardsObj.shuffle(arrSuffle);
    setCards(newArrSuffle);
  }
  //render playing cards
  const renderCards = () => {
    return cards.map((card, index) => <img
      key={`img - ${index}`}
      src={card.img} alt={card.img}
      style={{ width: 75, height: 100, marginRight: 2 }}
    />)
  }
  //divide playing cards
  const divideCard = () => {
    let indexPlayer = Math.floor(Math.random() * boardGame.players.length);
    let divideCards = [...cards];

    cardsObj.divideNumberRecursive(0, divideCards.length, function (index) {
      players[indexPlayer].cards.push(divideCards[index]);
      indexPlayer = indexPlayer === 3 ? 0 : ++indexPlayer;

      cards.shift();
      setCards([...cards]);
    });
  }
  //handlePlayGame
  const handlePlayGame = () => {
    let randomIndex = Math.floor(Math.random() * boardGame.players.length);
    alert(`player ${randomIndex + 1} ra bài trước!!!`);
    boardGame.handlePlay(randomIndex, function (index) {
      if(boardGame.players[index].cards.length === 0){
        setWinner(`player - ${index + 1} -`)
      }
      setDecks([...boardGame.decks])
    });
  }
  const handlePlayAgain = () => {
    const newBoardGame = new BoardGame(4);
    const cards = new Cards();
    const newCardArr = cards.new(numbersCard, symbols);

    setCards(newCardArr)
    setPlayers(newBoardGame.players)
    setDecks(newBoardGame.decks)
    setWinner('')
  }
  const renderBoardGame = () => {
    return decks.map(((item, index) =>
      <div key={index} className="m-2">
        <span>{item.playerName}</span>
        {
          item.skip ?
            <span>--Skip--</span> : item.cards.map(card => <img
              key={card.name}
              src={card.img}
              alt={card.img}
              style={{ width: 50, height: 70 }}
            />)
        }
      </div>

    ))
  }

  return (
    <>
      <div>
        <div className="row">
          <div id="ievfi" className="cell">
            <div id="ij5ar">
              <h4>Số gốc</h4>
              <div className='playing-card__container'>
                {/* render playing cards */}
                {renderCards()}
              </div>
            </div>
          </div>
        </div>
        <form id="i0epk" className="form">
          <div id="i673q" className="row">
            <div id="ii0hl" className="cell">
              <button
                type="button"
                id="iek88"
                className="button mixNumbers"
                style={{ opacity: cards.length <= 0 ? 0.4 : '' }}
                disabled={cards.length <= 0 ? true : false}
                onClick={() => shuffleCard()}
              >Trộn số</button>
            </div>
            <div id="itbn1" className="cell">
              <button
                type="button"
                id="i9gof"
                className="button divideNumbers"
                style={{ opacity: cards.length <= 0 ? 0.4 : '' }}
                disabled={cards.length <= 0 ? true : false}
                onClick={() => divideCard()}
              >Chia số</button>
            </div>
            <div id="iyfuk" className="cell">
              {
                !winner ? <button type="button" id="ixjt2" className="button playGame"
                  disabled={cards.length > 0 ? true : false}
                  onClick={() => handlePlayGame()}>Bắt đầu chơi</button> :
                  <button type="button" className="button playGame"
                    onClick={() => handlePlayAgain()}>Chơi lại</button>
              }

            </div>
          </div>

          <div id="iovju" className="row__player">
            {players.map((player, index) => <Player
              key={index}
              player={player}
              name={`player-${index + 1}`}
            />)}
          </div>

        </form>
        <div className="row">
          <div id="i0f9l" className="cell">
            <div id="ipr7a">
              <h4 id="ipbmq">Số đã ra:</h4>
              <div className='container-cards'>
                {renderBoardGame()}
              </div>
              {winner && <h5 id="ig6gf">Người thắng: {winner}</h5>}
            </div>
          </div>
        </div>
      </div>

    </>
  );
}

export default App;
