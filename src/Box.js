import React from 'react';

class Box extends React.Component {
 
 createXorO = () =>{
 	this.props.createXorO(this.props.title);
 }

 callToXorOFunction = () =>{
  if (this.props.boxClicked===false) {
  	this.createXorO();
  	this.props.messageWinner();
  }

}

  render = () => {
  	let valueClass = '';

  	if (this.props.value === 'X') {
  		valueClass = 'boxX';
  	} else if (this.props.value === 'O') {	
  		valueClass = 'boxO';
  	}

  	const className = 'boxes ' + valueClass;
    return (
      <div   className={className} id={this.props.title}	
           onClick={this.callToXorOFunction}>{this.props.value}
      </div>
    );
  }
}

export default Box;
   