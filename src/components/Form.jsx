import React, { Component } from 'react';
import 'bulma/css/bulma.css';

class Form extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name: '',
            calories: 0,
            image: 'https://icons-for-free.com/iconfiles/png/512/food+icon-1320184414775447246.png',
            quantity: 0,
        }
    }

    handleChange = (e) => {
        const name = e.target.name
        this.setState ({
            [name]: e.target.value
        })
    }

    handleAddFood = () => {
        this.props.onSubmit(this.state)
    }

    render() {
        
        return(
        <div>
            <label>Name:</label>
            <input type="text" id="name" name="name" value={this.state.name} onChange={this.handleChange} />

            <label>Calories:</label>
            <input type="number" id="calories" name="calories" value={this.state.calories} onChange={this.handleChange} />

            <label>Image:</label>
            <input type="url" id="image" name="image" alt="foodImage" value={this.state.image} onChange={this.handleChange}/>

            <button onClick={this.handleAddFood}>Submit</button>
        </div>
        )
    }
}

export default Form;