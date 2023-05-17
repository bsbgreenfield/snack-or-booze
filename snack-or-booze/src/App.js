import React, { useState, useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import "./App.css";
import Home from "./Home";
import SnackOrBoozeApi from "./Api";
import NavBar from "./NavBar";
import { Route, Routes } from "react-router-dom";
import Menu from "./FoodMenu";
import Snack from "./FoodItem";
import NotFound from "./NotFound";

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [snacks, setSnacks] = useState([]);

  useEffect(() => {
    async function getSnacks() {
      let snacks = await SnackOrBoozeApi.getSnacks();
      setSnacks(snacks);
      setIsLoading(false);
    }
    getSnacks();
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
            <Route exact path="/" element= { <Home snacks={snacks} />}/>
            <Route exact path="/snacks" element= { <Menu snacks={snacks} title="Snacks" />}/>
            <Route path="/snacks/:id" element={ <Snack items={snacks} cantFind="/snacks" />}/>
            <Route path="*" element= {<NotFound/>}/>
          </Routes>
        </main>
      </BrowserRouter>
    </div>
  );
}

export default App;
