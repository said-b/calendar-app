import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class Box extends React.Component {
	constructor(props) {
		super(props);
		this.onClick = this.onClick.bind(this);
	}

	onClick(e){
		this.props.boxClick(e);

	}
	render(){

		const gA = {
			gridArea: 'a' + this.props.day
		}
		//console.log(gA);
		return(
			<div className='box'style={gA} onClick={this.onClick}>
			{this.props.day}
			</div>
			)
	}

}

class Calendar extends React.Component {
	constructor(props){
		 super(props);
		 
		 //this.daysInMonth = 30;

		 this.boxClick = this.boxClick.bind(this);
	}

	boxClick(e){
		this.props.showModal(e);


	}

	render(){
		// const daysInMonth = new Date(this.props.year, this.props.month + 1, 0).getDate()
		//console.log(this.props);
		//const month = this.props.month + 1
		const date = new Date(this.props.year, parseInt(this.props.month) + 1, 0);
		const daysInMonth = date.getDate();
		const firstDayInMonth = new Date(this.props.year, parseInt(this.props.month), 1).getDay();
		//console.log(date);
		//console.log(this.props);
		const boxArray = [];
		{for(let i = 1; i <= daysInMonth; i++) {
				boxArray.push(<Box boxClick={this.boxClick}day={i}/>);
			
			}}

		const gridArea = Array(42).fill('.');
		for(let i = firstDayInMonth; i < daysInMonth + firstDayInMonth; i++){
			//gridArea[i] =  i - firstDayInMonth + 1; 
			gridArea[i] = "a" + (i - firstDayInMonth + 1);
		}
		//console.log(gridArea);

		const arrays = [], size = 7;
    
		while (gridArea.length > 0)
		  arrays.push(gridArea.splice(0, size));

		//console.log(arrays);
		const weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday","Saturday"];

		const gridTA = {
			gridTemplateAreas: '"'+ weekdays.join(' ') + '" "'
			+ arrays[0].join(' ') + '" "' 
			+ arrays[1].join(' ') + '" "'
			+ arrays[2].join(' ') + '" "'
			+ arrays[3].join(' ') + '" "'
			+ arrays[4].join(' ') + '" "'
			+ arrays[5].join(' ') /*"wet . . . . . ."*/ + '"'	 
		}
		//console.log(gridTA);
		const weekBar = [];
		for(let i = 0; i < weekdays.length; i++){
			let tempgA = {gridArea: weekdays[i]}
			weekBar.push(
				<h3 style={tempgA}>{weekdays[i]}</h3>

				)
		}





		return(
		<div className="calendar"
		style={gridTA}>
			{weekBar}
			{boxArray}
			
		</div>


			)
	}

}

class SelectDate extends React.Component{
	constructor(props){
		super(props);
		this.handleMonthChange = this.handleMonthChange.bind(this);
		this.handleYearChange = this.handleYearChange.bind(this);
	}

	handleMonthChange(e){
		this.props.onMonthChange(e.target.value);

	}

	handleYearChange(e){
		this.props.onYearChange(e.target.value);
	}

	render(){
		const yearList = []
		{for(let i = 1990; i < 2022; i++) {
				yearList.push(<option value={i}>{i}</option>);
		}}
		return(
			<div className="date-select">
				<select value={this.props.month} name="" id="" onChange={this.handleMonthChange}>
					<option value="0">January</option>
					<option value="1">Febuary</option>
					<option value="2">March</option>
					<option value="3">April </option>
					<option value="4">May</option>
					<option value="5">June</option>
					<option value="6">July</option>
					<option value="7">August</option>
					<option value="8">September</option>
					<option value="9">October</option>
					<option value="10">November</option>
					<option value="11">December</option>
				</select>
				<select value={this.props.year}name="" id="" onChange={this.handleYearChange}>
					{yearList}
				</select>
			</div>

		)
	}
}


class TaskModal extends React.Component{
	constructor(props){
		super(props);
		this.onModalClick = this.onModalClick.bind(this); 
	}

	onModalClick(e){
		this.props.onModalClick(e);

	}
	render(){

		const modalStyle = {
			display: this.props.display

		}


		return(
			<div className="modal" style={modalStyle} onClick={this.onModalClick}>
				<div className="modal-content">
					
					<p className="tasks">{this.props.tasks}</p>
					<label for="tasks-text">Add new task</label> 
					<input type="text"id="tasks-text"/>
					<label for="save-btn">Save</label>
					<input type="button" id="save-btn"/>
				</div>
			</div>
			)
	}

}


class Parent extends React.Component{
	constructor(props){
		super(props);
		this.state = {year: 2000, month: 0, modalDisplay: "none"};
		this.onMonthChange = this.onMonthChange.bind(this);
		this.onYearChange = this.onYearChange.bind(this);
		this.showModal = this.showModal.bind(this);
		this.hideModal = this.hideModal.bind(this);
	}

	onMonthChange(month){

		this.setState((state, props) => ({
			year: state.year,
			month: month
		}));	
	}
	onYearChange(year){

		this.setState((state, props) => ({
			year: year,
			month: state.month
		}));	

	}

	showModal(e){
		this.setState((state, props) => ({
			year: state.year,
			month: state.month,
			modalDisplay: "flex"
		}));
	}

	hideModal(e){
		if(e.target.className == "modal"){
			this.setState((state, props) => ({
			year: state.year,
			month: state.month,
			modalDisplay: "none"
		}));
		}
	}

	render(){
		return(
			<div className="parent">
				<h1>Calendar</h1>
				<SelectDate onMonthChange={this.onMonthChange} onYearChange={this.onYearChange} 
				year={this.state.year} month={this.state.month}/>
				<Calendar year={this.state.year} month={this.state.month} showModal={this.showModal}/>
				<TaskModal display={this.state.modalDisplay} onModalClick={this.hideModal}/>
			</div>

			)
	}

}



ReactDOM.render(<Parent />,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

