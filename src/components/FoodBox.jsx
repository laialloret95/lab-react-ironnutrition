import React, { Component } from 'react';
import 'bulma/css/bulma.css';

class FoodBox extends Component {
    constructor(props) {
        super(props)
        this.state = {
            quantity: 1
        }
    }

    handleQuantity = (e) => {
        this.setState ({
            quantity: e.target.value
        })
    }

    render() {
        const {name, calories, image } = this.props.food 
        return(
            <div className="box container-foods">
            <article className="media">
                <div className="media-left">
                <figure className="image is-64x64">
                    <img src={image} alt="foodimage"/>
                </figure>
                </div>
                <div className="media-content">
                <div className="content">
                    <p>
                    <strong>{name}</strong> <br />
                    <small>{calories} cal</small>
                    </p>
                </div>
                </div>
                <div className="media-right">
                <div className="field has-addons">
                    <div className="control">
                    <input className="input" type="number" onChange={this.handleQuantity}/>
                    </div>
                    <div className="control">
                    <button className="button is-info" onClick={() => this.props.onAddQuantity(this.props.index, this.state.quantity)}>
                        +
                    </button>
                    </div>
                </div>
                </div>
            </article>
            </div>

        )
    }
}

export default FoodBox;