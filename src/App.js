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
    return <button className="button is-primary mb-3" onClick={this.handleAddNewFood}> Add New Food</button>
  }

  handleSubmitForm = (newFood) => {
    const newFoodsArray = [...this.state.foodsArray];
    newFoodsArray.push(newFood);

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
      newFoodsArray = this.state.foodsArray.filter(food => food.name.toLowerCase().includes(query));
    }

    this.setState({
      foodsArray: newFoodsArray
    })
  }

  handleAddQuantity = (index, quantity) => {
      const food = this.state.foodsArray[index]
      const todayFoodCopy = [...this.state.todayFood]
      let newTodayFood = [];

      if(todayFoodCopy.filter(todayFood => todayFood.name.includes(food.name)).length >= 1) {
        const i = todayFoodCopy.findIndex((todayFood => todayFood.name === food.name))

        todayFoodCopy[i].quantity = parseInt(todayFoodCopy[i].quantity) + parseInt(quantity)
        todayFoodCopy[i].calories =  parseInt(todayFoodCopy[i].quantity) * parseInt(todayFoodCopy[i].calories)

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

  handleDelete = (i) => {
    const todayFoodCopy = [...this.state.todayFood];
    todayFoodCopy.splice(i, 1)

    this.setState({
      todayFood:todayFoodCopy,
      calories: this.sumTotalCalories(todayFoodCopy)
    })
  }
  

  render() {
    const { foodsArray } = this.state;

    return (
      <div>
        <div className="column my-3 mx-6">
          <input placeholder="Search for Food" className="input is-primary" type="text" id="value" name="value" onChange={(e) => this.handleSearchBar(e.target.value)} />
        </div>
        <div className="columns">
          <div className="column is-half my-3 mx-6">
            {this.header()}

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
          <div className="column is-half my-3 mx-6">
              <TodayFood foodArray={this.state.todayFood} totalCal={this.state.calories} onDelete={this.handleDelete}/>
          </div> 
        </div>
      </div>
      
    )
  }
}

export default App;
