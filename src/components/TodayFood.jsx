import React, { Component } from 'react';
import 'bulma/css/bulma.css';

class TodayFood extends Component {



    render() {
        
        return(
        <>
            <h1>Today's foods</h1>
            <ul className="container">
            {
                this.props.foodArray ? 
                    this.props.foodArray.map((food, i) => {
                        return (
                            <li key={'cart ' + food.name + i}>
                                {`${food.quantity} ${food.name} = ${food.calories} cal`}
                                <span onClick={() => this.props.onDelete(i)}>
                                    <i className="fas fa-trash-alt red"></i>
                                </span>
                            </li>
                        )
                    })
                :

                null
            }
            </ul>
            {this.props.totalCal > 0 && <p>Total {this.props.totalCal} cal</p>}
        </>
        )
    }
}

export default TodayFood;