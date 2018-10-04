import React, {Component} from 'react';
import {connect} from 'react-redux'
import * as actiontypes from '../../store/actions'

import CounterControl from '../../components/CounterControl/CounterControl';
import CounterOutput from '../../components/CounterOutput/CounterOutput';

class Counter extends Component {
    state = {
        counter: 0
    };

    counterChangedHandler = (action, value) => {
        switch (action) {
            case 'inc':
                this.setState((prevState) => {
                    return {counter: prevState.counter + 1}
                });
                break;
            case 'dec':
                this.setState((prevState) => {
                    return {counter: prevState.counter - 1}
                });
                break;
            case 'add':
                this.setState((prevState) => {
                    return {counter: prevState.counter + value}
                });
                break;
            case 'sub':
                this.setState((prevState) => {
                    return {counter: prevState.counter - value}
                });
                break;
            default:
                console.log('This is the default case')
        }
    };

    render() {
        return (
            <div>
                <CounterOutput value={this.props.ctr}/>
                <CounterControl label="Increment" clicked={this.props.onIncrementCounter}/>
                <CounterControl label="Decrement" clicked={this.props.onDecrementCounter}/>
                <CounterControl label="Add 5" clicked={this.props.onAddCounter}/>
                <CounterControl label="Subtract 5" clicked={this.props.onSubtractCounter}/>
                <hr/>
                <button onClick={() => this.props.onStoreResult(this.props.ctr)}>Store Result</button>
                <ul>
                    {this.props.storedResults.map((el, index) => {
                        return <li key={el.id} onClick={() => this.props.onDeleteResult(el.id)}>{el.value}</li>
                    })}
                </ul>
            </div>
        );
    }
}


const mapStateToProps = (state) => {
    return {
        ctr: state.ctr.counter,
        storedResults: state.res.results
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        onIncrementCounter: () => dispatch({type: actiontypes.INCREMENT}),
        onDecrementCounter: () => dispatch({type: actiontypes.DECREMENT}),
        onAddCounter: () => dispatch({type: actiontypes.ADD, value: 5}),
        onSubtractCounter: () => dispatch({type: actiontypes.SUBTRACT, value: 5}),
        onStoreResult: (result) => dispatch({type: actiontypes.STORE_RESULT, result: result}),
        onDeleteResult: (id) => dispatch({type: actiontypes.DELETE_RESULT, resultElId: id})
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Counter);