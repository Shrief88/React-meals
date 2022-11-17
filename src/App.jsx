import './App.css'
import Header from './components/header/Header'
import MealList from './components/mealList/MealList'

function App() {
  
  return (
    <div className="flex flex-col gap-10">
      <Header/>
      <MealList/>
    </div>
  )
}

export default App
