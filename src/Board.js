import React from 'react';
import './App.css';

import Box from './Box';

class Board extends React.Component {
  render = () =>  {
  	const {isMyTurn} = this.props;
  	let boxes = this.props.boxes;

  	if (!this.props.boxes) {
  		boxes = new Array(9);
  	}

    return (
      <div className={`board ${!isMyTurn ? 'disabled' : ''}`}>
        {boxes.map((box, index) => {
          return <Box key={index} title={box.title} boxClicked={box.boxClicked} value={box.value} createXorO={this.props.createXorO} findWinner={this.props.findWinner} messageWinner={this.props.messageWinner} reset={this.props.reset}/>;
        })}
      </div>
    );
  }
}

export default Board;