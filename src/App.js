import React, {Component} from 'react';
import './App.css';
import FoodBox from './components/FoodBox';
import initialFoods from './foods.json';
import 'bulma/css/bulma.css';
import Form from './components/Form';


class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      foodsArray: initialFoods,
      addNewFood: false
    }
  }

  handleAddNewFood = () => {
    this.setState ({
      addNewFood: true
    })
  }

  header = () => {
    if (this.state.addNewFood) {
      return <Form onSubmit={this.handleSubmitForm}/>
    }
    return <button onClick={this.handleAddNewFood}> Add New Food</button>
  }

  handleSubmitForm = (newFood) => {
    const newFoodsArray = [newFood, ...this.state.foodsArray];

    this.setState ({
      foodsArray: newFoodsArray,
      addNewFood: false
    })
  }

  render() {
    const { foodsArray } = this.state;

    return (
      <div>
        {this.header()}

        {foodsArray.map((food, index) => {
          return (
                <FoodBox 
                    key={index} 
                    food={food} 
                    index={index}
                />
          )
          })}
      </div>
    )
  }
}

export default App;
