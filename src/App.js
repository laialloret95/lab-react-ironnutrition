import React, {Component} from 'react';
import './App.css';
import FoodBox from './components/FoodBox';
import initialFoods from './foods.json';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      foodsArray: initialFoods
    }
  }

  render() {
    const { foodsArray } = this.state;

    return (
      foodsArray.map((food, index) => {
        return (
          <FoodBox 
              key={index} 
              food={food} 
              index={index}
          />
        )
      })
    );
  }

}

export default App;
