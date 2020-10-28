import React from 'react';
import './App.css';

import Board from './Board';
import DBManager from './DBManager';


const boxesElement = [
  {title:'box1',boxClicked:false, value:''}, 
  {title:'box2',boxClicked:false, value:''}, 
  {title:'box3',boxClicked:false, value:''}, 
  {title:'box4',boxClicked:false, value:''}, 
  {title:'box5',boxClicked:false, value:''}, 
  {title:'box6',boxClicked:false, value:''}, 
  {title:'box7',boxClicked:false, value:''}, 
  {title:'box8',boxClicked:false, value:''}, 
  {title:'box9',boxClicked:false, value:''}
];

class App extends React.Component {
state = {
  boxes: boxesElement,
  users:{},
  currentUser:'',
}

numberOfTurn = 0;
createMessage = false;

// componentDidMount() {
//      DBManager.getUsers().then((users) => {
        
//       });
// }    

createUsers = () =>{
  DBManager.getUsers().then((users) => {
    this.setState({users});
  });
}
// createUsers = () =>{
//   DBManager.getUsers().then((users) => {
//     if (users.length < 2) {
//       const userName = prompt('What is your name?');
//       const newUser =  {
//         name: userName
//       }

//       DBManager.createNewUser(newUser).then(user => {
//         this.setState({currentUser: user});
//       });
//     }
//     else{
//       alert('Please wait, there are already 2 players');
//     }
//   }); 
// }


createXorO = (title) =>{
  this.numberOfTurn ++;

  
  if (!this.state.isMyTurn && this.state.player === 'Me') {
    const boxesAfterClickedX = this.state.boxes;
    const boxesAfterClickedXToChange = boxesAfterClickedX.find(box=> {
        return box.title === title;
    });

    boxesAfterClickedXToChange.value  = 'X';

    this.setState({boxes: boxesAfterClickedX});
    this.setState({isMyTurn: false});
    
  }
  else if (this.state.isMyTurn && this.props.player === 'Opponent') {
    const boxesAfterClickedO = this.state.boxes;
    const boxesAfterClickedOToChange = boxesAfterClickedO.find(box=> {
        return box.title === title;
    });

    boxesAfterClickedOToChange.value  = 'O';

    this.setState({boxes: boxesAfterClickedO}); 
    
  }
  const boxes = this.state.boxes;
  const boxesToChange = boxes.find(box => {
        return box.title === title;
      }); 

   boxesToChange.boxClicked = !boxesToChange.boxClicked;

    this.setState({boxes: boxes});
    this.setState({isMyTurn:true});
}

findWinner = () =>{

    if (this.state.boxes[0].value !== '' && this.state.boxes[0].value === this.state.boxes[1].value && this.state.boxes[1].value === this.state.boxes[2].value) {
        return this.state.boxes[0].value;
    }
     else if (this.state.boxes[3].value !== '' && this.state.boxes[3].value === this.state.boxes[4].value && this.state.boxes[4].value === this.state.boxes[5].value) {
        return this.state.boxes[3].value;
    }
     if (this.state.boxes[6].value !== '' && this.state.boxes[6].value === this.state.boxes[7].value && this.state.boxes[7].value === this.state.boxes[8].value) {
        return this.state.boxes[6].value;
    }
     if (this.state.boxes[0].value !== '' && this.state.boxes[0].value === this.state.boxes[3].value && this.state.boxes[3].value === this.state.boxes[6].value) {
        return this.state.boxes[0].value;
    }
     if (this.state.boxes[1].value !== '' && this.state.boxes[1].value === this.state.boxes[4].value && this.state.boxes[4].value === this.state.boxes[7].value) {
        return this.state.boxes[1].value;
    }
     if (this.state.boxes[2].value !== '' && this.state.boxes[2].value === this.state.boxes[5].value && this.state.boxes[5].value === this.state.boxes[8].value) {
        return this.state.boxes[2].value;
    }
     if (this.state.boxes[0].value !== '' && this.state.boxes[0].value === this.state.boxes[4].value && this.state.boxes[4].value === this.state.boxes[8].value) {
        return this.state.boxes[0].value;
    }
     if (this.state.boxes[2].value !== '' && this.state.boxes[2].value === this.state.boxes[4].value && this.state.boxes[4].value === this.state.boxes[6].value) {
        return this.state.boxes[2].value;
    }
    else {
      return 'draw';
    }
    
}

messageWinner = () =>{ 
  this.winner = this.findWinner();
  this.message = '';
  if (this.winner === 'X') {
    this.createMessage = true;
    this.message = 'The winner is ' + this.winner;
  }

  else if(this.winner === 'O'){
    this.createMessage = true;
    this.message = 'The winner is ' + this.winner;
  }

  else if(this.winner === 'draw' && this.numberOfTurn > 8){
    this.createMessage = true;
    this.message = 'Its a draw';
  }

  if (this.winner === 'X' || this.winner === 'O') {
    const boxes = this.state.boxes;
    const gameDone = boxes.map((boxes) => boxes.boxClicked = true );
    this.setState({boxes:boxes});
  } 

}

reset = () =>{
  this.numberOfTurn = 0;
  this.createMessage = false;

  const boxes = this.state.boxes;
  const resetClickBoxes = boxes.map((boxes) => boxes.boxClicked = false );
  this.setState({boxes:boxes});

  const resetValues = boxes.map((boxes) => boxes.value = '');
  this.setState({boxes:boxes});

}


  render = () => { 

    return (
      <div >
        <Board boxes={this.state.boxes} createXorO={this.createXorO} findWinner={this.findWinner} messageWinner={this.messageWinner} reset={this.reset}/>
        <div className = 'message'>{this.createMessage === true && this.message}</div>
        <button className='createUserButton' onClick={this.createUsers} >createUser</button>
        <button className = 'resetButton' onClick={this.reset} >RESTART</button>
      </div>
    );
  }
}

export default App;