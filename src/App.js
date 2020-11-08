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
  users: {},
  currentUser:null,
  thisPageUser: null,
}

numberOfTurn = 0;
createMessage = false;

componentDidMount() {

  DBManager.getUsers((users) => {
    if (users && Object.keys(users).length > 0) {
        this.setState({users});
        this.numberOfTurn = 0;

        DBManager.setCurrentUser(Object.keys(users)[0]);
        this.setState({currentUser:Object.keys(users)[0]});   
    }

    DBManager.getBoxesLive((boxes)=> {
      if (boxes) {
        this.setState({boxes});
        this.numberOfTurn ++;
      }
    });   
  });

  DBManager.getCurrentUser((currentUser) => {
    this.setState({currentUser});
  })

}    


createUsers = () =>{
  const {users} = this.state;

  if (Object.keys(users).length < 2) {
    const newUserName = prompt('What is your name?');

    DBManager.createNewUser(newUserName).then(user => {
      const {users} = this.state; 
      
      this.setState({
        users: {
          ...users, 
          [user.id]: user
        },
        thisPageUser: user.id
      });
    });
  }
  else{
    alert('Please wait, there are already 2 players');
  } 
}


createXorO = (title) =>{
  const{users} = this.state;
  if (users.length < 2) {
    return ;
  }

  if (this.numberOfTurn % 2 === 0) {
    DBManager.setCurrentUser(Object.keys(this.state.users)[0]);
    this.setState({currentUser:Object.keys(this.state.users)[0]});
  }
  else{
    DBManager.setCurrentUser(Object.keys(this.state.users)[1]);
    this.setState({currentUser:Object.keys(this.state.users)[1]});
  }

  
  if (Object.keys(this.state.users).length === 2 && this.state.currentUser === Object.keys(this.state.users)[0]) {
    const boxesAfterClickedX = this.state.boxes;
    const boxesAfterClickedXToChange = boxesAfterClickedX.find(box=> {
        return box.title === title;
    });

    boxesAfterClickedXToChange.value  = 'X';

    this.setState({boxes: boxesAfterClickedX});
    DBManager.setBoxes(this.state.boxes);
    // this.lastValue = 'X';
    
  }
  else if (Object.keys(this.state.users).length === 2 && this.state.currentUser === Object.keys(this.state.users)[1]) {
    const boxesAfterClickedO = this.state.boxes;
    const boxesAfterClickedOToChange = boxesAfterClickedO.find(box=> {
        return box.title === title;
    });

    boxesAfterClickedOToChange.value  = 'O';

    this.setState({boxes: boxesAfterClickedO}); 
    DBManager.setBoxes(this.state.boxes);
    // this.lastValue = 'O';
    
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
  DBManager.setBoxes(this.state.boxes);

}


  render = () => {
    const {users,boxes,currentUser, thisPageUser} = this.state;
    
    console.log('this.numberOfTurn', this.numberOfTurn);
   
    return (
      <div >
        <div>
          Number of player: <span>{Object.keys(users).length}</span>
          {users && Object.keys(users).map((userKey, index) => {
            const currentUser = users[userKey];
            console.log('currentUser', currentUser);

            return <div key={userKey}>Player {index + 1}: {currentUser.name}</div>
          })}
        </div>
        {currentUser && <div>Current Player: {users[currentUser].name}</div>}
        <Board boxes={this.state.boxes} createXorO={this.createXorO} findWinner={this.findWinner} messageWinner={this.messageWinner} reset={this.reset} isMyTurn={thisPageUser === currentUser}/>
        <div className = 'message'>{this.createMessage === true && this.message}</div>
        <button className='createUserButton' onClick={this.createUsers} >createUser</button>
        <button className = 'resetButton' onClick={this.reset} >RESTART</button>
      </div>
    );
  }
}

export default App;