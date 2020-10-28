import React from 'react';
import './App.css';

import Box from './Box';

class Board extends React.Component {
  render = () => {
    return (
      <div className="board">
        {this.props.boxes.map((boxes, index) => {
          return <Box key={index} title={boxes.title} boxClicked={boxes.boxClicked} value={boxes.value} createXorO={this.props.createXorO} findWinner={this.props.findWinner} messageWinner={this.props.messageWinner} reset={this.props.reset}/>;
        })}
      </div>
    );
  }
}

export default Board;