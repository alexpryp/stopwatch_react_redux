import React, { useEffect } from 'react';
import { formatTime } from './additionalFunctions.js';
import { createStore, bindActionCreators } from 'redux';
import { connect, } from 'react-redux';
import { reducer } from './redux/reducer.js';
import {
	setTimerState,
	setStartTime,
	setStartLapTime,
	setMainTimer,
	setCalculatedTime,
	setAmountOfCalculatedTime,
	setButtonBlock,
	setIntervalHistory
} from './redux/actionCreators.js';

export const store = createStore(reducer);

function MainTimer(props) {
	useEffect(() => {
		if (props.timerState === 'clean' || props.timerState === 'stop') {
			return;
		}

		let timerId = setTimeout(() => {
			let time = new Date() - props.startTime;
			props.setCalculatedTime( time );
			props.setMainTimer(
				new Date(props.amountOfCalculatedTime + props.calculatedTime)
			);
		}, 200);

		return function cleanup() {
			clearTimeout(timerId);
		} 
	});

	let formTime = formatTime(props.mainTimer);

	return (
			<div className="main-timer">
				<span>{formTime.hours}</span>:
				<span>{formTime.minutes}</span>:
				<span>{formTime.seconds}</span> <span className="milliseconds">{formTime.milliseconds}</span>
			</div>
	);
}

function IntervalHistory(props) {
	let intervalHistory = [...props.intervalHistory]

	if (intervalHistory.length > 0) {
		let intervHist = intervalHistory.map((time, index) => {
			let ind = index + 1;
			if(ind < 10) {
				ind = '0' + ind;
			}

			let formMainTime = formatTime(time[0]);
			let formLapTime = formatTime(new Date(time[1]));

			return (<div key={ind.toString()}>
				<span className="index">{ind}</span> | <span className="main-timer-history">
					<span>{formMainTime.hours}</span>:
					<span>{formMainTime.minutes}</span>:
					<span>{formMainTime.seconds}</span>:
					<span>{formMainTime.milliseconds}</span>
				</span> | <span className="lap-timer-history">
					<span>{formLapTime.hours}</span>:
					<span>{formLapTime.minutes}</span>:
					<span>{formLapTime.seconds}</span>. <span className="milliseconds">{formLapTime.milliseconds}</span>
				</span>
			</div>);
		});
	
		return (
			<div className="interval-history">
				{intervHist}
			</div>
		);
	} else if (props.buttonBlock === 'stop' || props.buttonBlock === 'restart') {
		return (
			<div className="interval-history">
				<div className="interval-history-background">
					<span aria-label="Clock Face Two Oclock" role="img">&#x1F551;</span>
				</div>
				<div className="interval-history-instructions">
					<span>После нажатия кнопки "Интервал" появятся данные о времени, затраченном на каждый Интервал</span>	
				</div>
			</div>
		);
	} else {
		return (
			<div className="interval-history">
				<div className="interval-history-background">
					<span  aria-label="Clock Face Two Oclock" role="img">&#x1F551;</span>
				</div>
				<div className="interval-history-instructions">
					<span>После нажатия кнопки "Начать" секундомер начнет отсчет</span>	
				</div>
			</div>
		);
	}
}

function ButtonBlock(props) {
	const setButtonBlock = props.setButtonBlock;
	
	function startHandler() {
		props.setTimerState('start');
		props.setStartTime(new Date());
		props.setStartLapTime(props.mainTimer);
		props.setButtonBlock("stop");
	}

	function stopHandler() {
		props.setTimerState('stop');
		props.setButtonBlock("restart");
		props.setAmountOfCalculatedTime(props.amountOfCalculatedTime + props.calculatedTime);
	}

	function intervalHandler() {
		let lap = props.mainTimer - props.startLapTime;
		props.setStartLapTime(props.mainTimer);
		props.setIntervalHistory([...props.intervalHistory, [props.mainTimer, lap]]);
	}

	function restartHandler() {
		props.setTimerState('start');
		props.setStartTime(new Date());
		props.setButtonBlock("stop");
	}

	function dischargeHandler() {
		props.setButtonBlock("start");
		props.setAmountOfCalculatedTime(0);
		props.setCalculatedTime(0);
		props.setMainTimer(new Date(0));
		props.setIntervalHistory([]);
	}

	switch (props.buttonBlock) {
		case ('stop'):
			return (
			<div className="buttons-block">
				<hr/>
				<button className="stop" onClick={ () => stopHandler() }>
					Стоп
				</button>
				<button className="interval" onClick={ () => intervalHandler() }>
					Интервал
				</button>
			</div>
			);
		case ('restart'):
			return (
			<div className="buttons-block">
				<hr/>
				<button className="restart" onClick={ () => restartHandler() }>
					Рестарт
				</button>
				<button className="discharge" onClick={ () => dischargeHandler(setButtonBlock) }>
					Сброс
				</button>
			</div>);
		case ('start'):
		default:
			return (
				<div className="buttons-block">
					<hr/>
					<button className="start" onClick={ () => startHandler() }>
						Начать
					</button>
				</div>
			);
	}
}

function App(props) {
	const { 
	    timerState,
		startTime,
		startLapTime,
		mainTimer,
		calculatedTime,
		amountOfCalculatedTime,
		buttonBlock,
		intervalHistory,
		setTimerState,
		setStartTime,
		setStartLapTime,
		setMainTimer,
		setCalculatedTime,
		setAmountOfCalculatedTime,
		setButtonBlock,
		setIntervalHistory
	} = props;

	return (
		<div className="app">
			<MainTimer 
				timerState={timerState}
				startTime={startTime} 
				mainTimer={mainTimer}
				setMainTimer={setMainTimer}
				calculatedTime={calculatedTime}
				setCalculatedTime={setCalculatedTime}
				amountOfCalculatedTime={amountOfCalculatedTime}
			/>
			<IntervalHistory
				intervalHistory={intervalHistory}
				buttonBlock={buttonBlock}
			/>
			<ButtonBlock
				buttonBlock={buttonBlock}
				setButtonBlock={setButtonBlock}
				setTimerState={setTimerState}
				setStartTime={setStartTime}
				startLapTime={startLapTime}
				setStartLapTime={setStartLapTime}
				mainTimer={mainTimer}
				setMainTimer={setMainTimer}
				calculatedTime={calculatedTime}
				setCalculatedTime={setCalculatedTime}
				amountOfCalculatedTime={amountOfCalculatedTime}
				setAmountOfCalculatedTime={setAmountOfCalculatedTime}
				intervalHistory={intervalHistory}
				setIntervalHistory={setIntervalHistory}
			/>
		</div>	
	);
}

const putStateToProps = (state) => {
	return {
		timerState: state.timerState,
		startTime: state.startTime,
		startLapTime: state.startLapTime,
		mainTimer: state.mainTimer,
		calculatedTime: state.calculatedTime,
		amountOfCalculatedTime: state.amountOfCalculatedTime,
		buttonBlock: state.buttonBlock,
		intervalHistory: state.intervalHistory
	};
};

const putActionsToProps = (dispatch) => {
	return {
		setTimerState: bindActionCreators(setTimerState, dispatch),
		setStartTime: bindActionCreators(setStartTime, dispatch),
		setStartLapTime: bindActionCreators(setStartLapTime, dispatch),
		setMainTimer: bindActionCreators(setMainTimer, dispatch),
		setCalculatedTime: bindActionCreators(setCalculatedTime, dispatch),
		setAmountOfCalculatedTime: bindActionCreators(setAmountOfCalculatedTime, dispatch),
		setButtonBlock: bindActionCreators(setButtonBlock, dispatch),
		setIntervalHistory: bindActionCreators(setIntervalHistory, dispatch)
	}
};

export const WrappedApp = connect(putStateToProps, putActionsToProps)(App);
