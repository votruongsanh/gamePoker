import { Card } from './card';

export class Cards {
    cards = [];

    addCard(card) {
        this.cards.push(card);
    }
    new(numbers, symbols) {
        for (let symbol of symbols) {
            for (let number of numbers) {
                const card = new Card(`./playingcard/${number}-${symbol.name}.png`, number, symbol.value, `${number}-${symbol.name}`);
                this.addCard(card);
            }
        }
        return this.cards;
    }
    shuffle(cards) {
        for (let i = cards.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [cards[i], cards[j]] = [cards[j], cards[i]];
        }
        return cards;
    }
    divideNumberRecursive(start, end, fnCallack) {
        setTimeout(() => {
            if (start < end) {
                fnCallack(start);
                this.divideNumberRecursive(start + 1, end, fnCallack);
            }
        }, 8);
    }
}
