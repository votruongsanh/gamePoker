import { randomLength } from "./helper";

export default class Player {
    cards = [];

    sortCards(cards, sort) {
        sort ? cards.sort(this.sortAscending) : cards.sort(this.sortDescending);
    };
    sortAscending(a, b) {
        return a.number - b.number;
    };
    sortDescending(a, b) {
        return b.number - a.number;
    };

    getRandomCard() {
        const card = [];
        const index = randomLength(this.cards.length);
        card.push(this.cards[index]);
        this.cards = this.cards.filter(card => card.name !== this.cards[index].name);
        return card;
    }
    checkDoubleCards() {
        const cards = [...this.cards];
        let result = [];
        let count = 0;
        for (let i = 0; i < cards.length - 1; i++) {
            for (let j = i + 1; j < cards.length; j++) {
                if (cards[i].number === cards[j].number) {
                    count++;
                    cards.splice(j, 1);
                }
            }
            if (count > 0) {
                result.push(cards[i]);
                count = 0;
            }
        }
        return result;
    }
    getRandomDoubleCards() {
        const doubleCards = this.checkDoubleCards();
        const index = randomLength(doubleCards.length);
        const randomDoubleCards = this.cards.filter((item) => item.number === doubleCards[index].number);
        this.deleteCards(randomDoubleCards);
        if (randomDoubleCards.length > 2) {
            randomDoubleCards.splice(2);
        }
        return randomDoubleCards;
    }
    deleteCards(cardsDelete) {
        for (let i = 0; i < cardsDelete.length; i++) {
            for (let y = 0; y < this.cards.length; y++) {
                if (this.cards[y].name === cardsDelete[i].name) {
                    this.cards.splice(y, 1)
                }
            }
        }
    }
    getGreaterCard(cardPlayed) {
        const newCards = this.cards.filter((card) => card.number + card.symbol > cardPlayed.reduce((total, value) => {
            return total += value.number + value.symbol;
        }, 0));
        if (newCards.length > 0) {
            const index = randomLength(newCards.length);
            this.cards = this.cards.filter(card => card.name !== newCards[index].name);
            return [newCards[index]];
        } else
            return newCards

    }

    getGreaterDoubleCard(cardPlayed) {
        const checkDouble = this.checkDoubleCards();
        if (checkDouble.length > 0) {
            const doubleCards = this.getDoubleCards(checkDouble);
            const greaterCardFromCardsPlayed = this.getGreaterCardFromCardsPlayed(cardPlayed);
            const greaterCards = doubleCards.filter(card => (card.number + card.symbol) > greaterCardFromCardsPlayed.reduce((total, item) => {
                return total += item.number + item.symbol
            }, 0))
            if (greaterCards.length > 0) {
                const filterDoubleCard = this.filterDoubleCards(greaterCards);
                const index = randomLength(filterDoubleCard.length);
                const randomDoubleCards = this.cards.filter((item) => item.number === filterDoubleCard[index].number);
                this.deleteCards(randomDoubleCards);
                if (randomDoubleCards.length > 2) {
                    randomDoubleCards.splice(2);
                }
                return randomDoubleCards;
            }else
                return [];
        }

        return [];
    }
    getDoubleCards(preDoubleCards) {
        const doubleCards = [];
        for (let i = 0; i < this.cards.length; i++) {
            for (let y = 0; y < preDoubleCards.length; y++) {
                if (this.cards[i].number === preDoubleCards[y].number) {
                    doubleCards.push(this.cards[i])
                }
            }
        }
        return doubleCards;
    }
    getGreaterCardFromCardsPlayed(cardsPlayed) {
        const greaterCard = []
        for (let i = 0; i < cardsPlayed.length; i++) {
            for (let j = i + 1; j < cardsPlayed.length; j++) {
                if ((cardsPlayed[i].number + cardsPlayed[i].symbol) > (cardsPlayed[j].number + cardsPlayed[j].symbol)) {
                    greaterCard.push(cardsPlayed[i])
                } else {
                    greaterCard.push(cardsPlayed[j])
                }
            }
        }
        return greaterCard;
    }

    filterDoubleCards(cards) {
        // const cards = [...this.cards];
        let result = [];
        let count = 0;
        for (let i = 0; i < cards.length - 1; i++) {
            for (let j = i + 1; j < cards.length; j++) {
                if (cards[i].number === cards[j].number) {
                    count++;
                    cards.splice(j, 1);
                }
            }
            if (count > 0) {
                result.push(cards[i]);
                count = 0;
            }
        }
        return result;
    }
}