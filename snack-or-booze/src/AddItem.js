import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function AddItemForm({ addItem }) {
    const initialVal = { type: "", name: "", description: "", recipe: "", serve: "" }
    const [formData, setFormData] = useState(initialVal) // data controlling form
    const [invalid, setInvalid] = useState({
        type: false, name: false, description: false, recipe: false, serve: false
    }) // used to indiciate which fields need to be filled out. 

    const navigate = useNavigate()

    const handleSubmit = (e) => {
        /**
         * function to handle the data to create a new item when the form is submitted
         * first check formdata for any empty entries - if so, dont submit, and mark those empty values
         * as invalid in state. 
         * otherwise tailor the data from the form to the format of the objects that come
         * back from the API, change the state on the parent component App with addItem() to 
         * include the new value. Finally clear form and redirect to the appropriate menu.
         */
        e.preventDefault();
        let emptySlots = Object.entries(formData).filter( kv => kv[1] === '')
        console.log(emptySlots)
        if (!emptySlots.length){
            let formattedItem = {
                id: formData.name.toLowerCase(),
                name: formData.name,
                description: formData.description,
                recipe: formData.recipe,
                serve: formData.serve
            }
            addItem(formData.type, formattedItem)
            navigate(`/${formData.type}s`)
            setFormData(initialVal)
        }
       else{
        let newInvalid = {...invalid}
        emptySlots.forEach(kv => newInvalid[kv[0]] = true)
        setInvalid(newInvalid)
       }
    }


    const handleChange = (e) => {
        /**
         * standard handleChange for controlled components, setting values in state. 
         */

        const { name, value } = e.target
        const newFormData = { ...formData, [name]: value }
        setFormData(newFormData)
    }

    return (
        <form onSubmit={handleSubmit} className="Form">
            <label htmlFor="type">Type: </label>
            <select name="type" id="type" value={formData.type} onChange={handleChange}
                style={invalid.type ? { border: '1px solid red' } : {}}>
                <option value=""></option>
                <option value="snack">Snack</option>
                <option value="drink">Drink</option>
            </select>
            <label htmlFor="name">Name: </label>
            <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                style={invalid.name ? { border: '1px solid red' } : {}} />
            <label htmlFor="description">Description: </label>
            <input
                type="text"
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                style={invalid.description ? { border: '1px solid red' } : {}} />
            <label htmlFor="recipe">Recipe: </label>
            <input
                type="textarea"
                id="recipe"
                name="recipe"
                value={formData.recipe}
                onChange={handleChange}
                style={invalid.recipe ? { border: '1px solid red' } : {}} />
            <label htmlFor="serve">Serve: </label>
            <input
                type="textarea"
                id="serve"
                name="serve"
                value={formData.serve}
                onChange={handleChange}
                style={invalid.serve ? { border: '1px solid red' } : {}} />
            <button type="submit">Submit</button>
        </form>
    )
}

export default AddItemForm