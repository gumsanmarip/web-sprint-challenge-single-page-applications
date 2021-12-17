import React, { useState } from "react";
import * as yup from 'yup';
import axios from 'axios';

const formSchema = yup.object().shape({
    name: yup.string().required('Enter Username'),
    size: yup.string().required('Small', 'Medium', 'Large'),
    special: yup.string(),
    pepperoni: yup.boolean().oneOf([true]),
    extraPepperoni: yup.boolean().oneOf([true]),
    cheese: yup.boolean().oneOf([true]),
    extraCheese: yup.boolean().oneOf([true]),
    instructions: yup.string(),
})


function Form() {

const [form, setForm] = useState(
  {
    name: "",
    size: "",
    pepperoni: false,
    extraPepperoni: false,
    cheese: false,
    extraCheese: false,
    instructions: "",
});

const [errorState, setErrorState] = useState({
    name: "",
    size: "",
    pepperoni: false,
    extraPepperoni: false,
    cheese: false,
    extraCheese: false,
    instructions: "",
})

const validate = (e) => {
 yup.reach(formSchema, e.target.name)
 .validate(e.target.value)
 .then( valid => {
    setErrorState({
      ...errorState,
      [e.target.name]: ""
    })
 })
 .catch(error => {
   console.log(error.errors)
   setErrorState({
     ...errorState,
     [e.target.name]: error.errors[0]
   })
 })
};

const inputChange = e => {
  e.persist
  (validate(e))
  let value = e.target.type === "checkbox" ? e.target.checked : e.target.value;
  setForm({...form, [e.target.name]: value });
};

const formSubmit = (e) => {
  e.preventDefault();
  axios.post('https://reqres.in/api/users', form)
  .then(res => console.log(res))
  .catch(err => console.log(err));
};

return(
  <div className="pizzaForm">
    <h1>Create Pizza</h1>
        <form onSubmit={formSubmit}>
            <label>Name
                <input 
                    id="name" 
                    name="name"
                    type="text" 
                    value={form.name} 
                    onChange={inputChange} 
                />
                {errorState.name.length > 1 ? <p className="error">{errorState.name}</p> : null}
            </label>
  
            <label>Size Select</label>
                <select 
                id="size-dropdown" 
                name="size" 
                value={form.size} 
                onChange={inputChange}>
                    <option value=''>- Select an option -</option>
                    <option value='small'>Small</option>
                    <option value='medium'>Medium</option>
                    <option value='large'>Large</option>
                </select>
  
            <label>Choose Your Toppings Below:</label>
                    <label>Pepperoni
                    <input
                        id="toppings"
                        type='checkbox'
                        name='pepperoni'
                        checked={form.pepperoni}
                        onChange={inputChange}
                    />
                    </label>

                    <label>Extra Pepperoni
                    <input
                        id="toppings"
                        type='checkbox'
                        name='extraPepperoni'
                        checked={form.extraPepperoni}
                        onChange={inputChange}
                    />
                    </label>

                    <label>Cheese
                    <input
                        id="toppings"
                        type='checkbox'
                        name='cheese'
                        checked={form.cheese}
                        onChange={inputChange}
                    />
                    </label>

                    <label>Extra Cheese
                    <input
                        id="toppings"
                        type='checkbox'
                        name='extraCheese'
                        checked={form.extraCheese}
                        onChange={inputChange}
                    />
                    </label>
            <label>Special instructions</label>
                <textarea 
                    name="instructions"
                    id="instructions"
                    placeholder="Instructions"
                    value={form.instructions}
                    onChange={inputChange}
                />
                <button
                    name="order-button"
                    type="submit">
                        Place Order
                </button>

</form>
</div>
);
}

export default Form;