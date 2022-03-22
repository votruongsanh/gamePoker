import Player from "./player";

export default class BoardGame {

  decks = [];
  players = [];
  cardPlayed = [];
  skipFlag = 0;

  constructor(numberOfPlayer) {
    this.newPlayers(numberOfPlayer);
  }
  addDecks(cards) {
    this.decks.push(cards)
  }
  newPlayers(numberOfPlayer) {
    for (let i = 0; i < numberOfPlayer; i++) {
      const player = new Player();
      this.players.push(player);
    }
  }

  newRound(index) {
    const playerNo = index + 1;
    const checkDoubleCards = this.players[index].checkDoubleCards();
    this.skipFlag = 0;

    if (checkDoubleCards.length > 0) {
      let indexRandom = Math.floor(Math.random() * 2) + 1;
      if (indexRandom === 1) {
        const randomCards = this.players[index].getRandomCard();
        this.addDecks({ playerName: `player-${playerNo}`, cards: randomCards });
        this.cardPlayed = randomCards;
      } else {
        const doubleCards = this.players[index].getRandomDoubleCards();
        this.addDecks({ playerName: `player-${playerNo}`, cards: doubleCards });
        this.cardPlayed = doubleCards;
      }
    } else {
      const randomCards = this.players[index].getRandomCard();
      this.addDecks({ playerName: `player-${playerNo}`, cards: randomCards });
      this.cardPlayed = randomCards;
    }
  }

  followRound(index) {
    const playerNo = index + 1;
    if (this.cardPlayed.length === 1) {
      const newCards = this.players[index].getGreaterCard(this.cardPlayed);
      if (newCards.length > 0) {
        this.addDecks({ playerName: `player-${playerNo}`, cards: newCards });
        this.cardPlayed = newCards;
        this.skipFlag = 0;
      } else {
        this.skipFlag += 1;
        this.addDecks({ playerName: `player-${playerNo}`, skip: true });
      }
    } else {
      const newCards = this.players[index].getGreaterDoubleCard(this.cardPlayed);
      if (newCards.length > 0) {
        this.addDecks({ playerName: `player-${playerNo}`, cards: newCards });
        this.cardPlayed = newCards;
        this.skipFlag = 0;
      } else {
        this.skipFlag += 1;
        this.addDecks({ playerName: `player-${playerNo}`, skip: true });
      }
    }
  }

  handlePlay(index, fnCallack) {

    setTimeout(() => {
      if (this.cardPlayed.length > 0 && this.skipFlag < 3) {
        this.followRound(index)
      } else {
        this.newRound(index)
      }
      fnCallack(index);
      if (this.players[index].cards.length === 0) return;
      index = index === 3 ? 0 : ++index;
      this.handlePlay(index, fnCallack);

    }, 20)

  }
}