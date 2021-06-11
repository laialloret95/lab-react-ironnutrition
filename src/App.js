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
      addNewFood: false,
    })
  }

  handleSearchBar = (query) => {
    let newFoodsArray;
    
    if(query.length === 0) {
      newFoodsArray = initialFoods

    } else {
      newFoodsArray = initialFoods.filter(food => food.name.toLowerCase().includes(query));
    }


    this.setState({
      foodsArray: newFoodsArray
    })
  }

  render() {
    const { foodsArray } = this.state;

    return (
      <div>
        {this.header()}

        <div>
            <input type="text" id="value" name="value" onChange={(e) => this.handleSearchBar(e.target.value)} />
        </div>

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
