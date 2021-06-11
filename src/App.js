import React, {Component} from 'react';
import './App.css';
import FoodBox from './components/FoodBox';
import initialFoods from './foods.json';
import 'bulma/css/bulma.css';
import Form from './components/Form';
import TodayFood from './components/TodayFood';


class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      foodsArray: initialFoods,
      addNewFood: false,
      todayFood: [],
      calories: 0
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

  handleAddQuantity = (index, quantity) => {
      const food = initialFoods[index]
      const todayFoodCopy = [...this.state.todayFood]
      let newTodayFood = [];

      if(todayFoodCopy.filter(todayfFood => todayfFood.name.includes(food.name)).length >= 1) {
        const i = todayFoodCopy.findIndex((todayFood => todayFood.name === food.name))

        todayFoodCopy[i].quantity = todayFoodCopy[i].quantity + quantity
        todayFoodCopy[i].calories =  todayFoodCopy[i].quantity * todayFoodCopy[i].calories

        newTodayFood = todayFoodCopy
      } else {
        const newFood = {"name":food.name, "calories":food.calories, "quantity": quantity}
        newTodayFood = [newFood, ...this.state.todayFood];
      }

      this.setState({
        todayFood: newTodayFood,
        calories: this.sumTotalCalories(newTodayFood)
      })
  }

  sumTotalCalories = (array) => {
    let sum = 0;

    for (let i = 0; i < array.length; i++) {
        sum += array[i].calories;
    }

    return sum
  }

  render() {
    const { foodsArray } = this.state;

    return (
      <div className="columns">
        <div className="column">
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
                      onAddQuantity={this.handleAddQuantity}
                  />
            )
            })}
        </div>
        <div className="column">
            <TodayFood foodArray={this.state.todayFood} totalCal={this.state.calories}/>
        </div> 
      </div>
    )
  }
}

export default App;
