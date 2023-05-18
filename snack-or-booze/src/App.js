import React, { useState, useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import "./App.css";
import Home from "./Home";
import SnackOrBoozeApi from "./Api";
import NavBar from "./NavBar";
import { Route, Routes } from "react-router-dom";
import Menu from "./Menu";
import Item from "./Item";
import AddItemForm from "./AddItem";
import NotFound from "./NotFound";

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [snacks, setSnacks] = useState([]);
  const [drinks, setDrinks] = useState([])

  const addItem = (type, item) => {
    /**
     * Called in the AddItem component, updates state based on type of item (snack or drink)
     */
    if(type == 'snack') setSnacks([...snacks, item])
    else if(type == 'drink') setDrinks([...drinks, item])
  }
  useEffect(() => {
    async function getItems() {
      let s =  SnackOrBoozeApi.getSnacks(); // updated to do simultaneous calls
      let d = SnackOrBoozeApi.getDrinks()
      let snacks = await s
      let drinks = await d
      setSnacks(snacks)
      setDrinks(drinks)
      console.log(snacks, drinks)
      setIsLoading(false);
    }
    getItems();
  }, []);

  if (isLoading) {
    return <p>Loading &hellip;</p>;
  }

  return (
    <div className="App">
      <BrowserRouter>
        <NavBar />
        <main>
          <Routes>
            <Route exact path="/" element= { <Home items={snacks} />}/>
            <Route exact path="/snacks" element= { <Menu items={snacks} title="Snacks" />}/>
            <Route path="/snacks/:id" element={ <Item items={snacks} cantFind="/snacks" />}/>
            <Route exact path="/drinks" element= { <Menu items={drinks} title="Drinks" />}/>
            <Route path="/drinks/:id" element={ <Item items={drinks} cantFind="/drinks" />}/>
            <Route path='/add' element={<AddItemForm addItem= {addItem}/>}/>
            <Route path="*" element= {<NotFound/>}/>
          </Routes>
        </main>
      </BrowserRouter>
    </div>
  );
}

export default App;
