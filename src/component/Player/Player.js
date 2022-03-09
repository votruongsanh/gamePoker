import React, { useState } from 'react';

export default function Player({ player, name }) {
    const [sort, setSort] = useState(true);

    const handleSort = () => {
        player.sortCards(player.cards, sort);
        setSort(!sort);
    }

    const renderCardsPlayer = () => {
        return player.cards.map((card) => <img
            key={card.name}
            src={card.img}
            alt={card.img}
            style={{ width: 50, height: 70 }}
        />)
    }

    return (
        <div id="iqcpy" className="player__item">
            <div className="row" id="i4a81">
                <div className="cell" id="iobzo">
                    <div id="ikblk">
                        <label id="iw3sp">{name}</label>
                    </div>
                    <button type="button" className="button sortNumber" id="iffl8" onClick={() => handleSort()}>Sắp xếp</button>
                </div>
                <div className="cell" id="iwlei">
                    <div id="ivr7h">
                        <label id="iqq7g">Số đã nhận: </label>
                        <div>
                            {renderCardsPlayer()}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
