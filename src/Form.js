import React, { useState } from "react";
import * as yup from 'yup';
import axios from 'axios';

const formSchema = yup.object().shape({
    name: yup.string().trim().required('Enter Username').min(3, 'Username has to be more than three characters!'),
    size: yup.string().oneOf(['Small', 'Medium', 'Large']),
    pepperoni: yup.string().boolean().oneOf([true]),
    extraPepperoni: yup.boolean().oneOf([true]),
    cheese: yup.boolean().oneOf([true]),
    extraCheese: yup.boolean().oneOf([true]),
    instructions: yup.string,    
  })
    
export default function Form(props) {    
  
    const [initialFormValues, setInitialValues] = useState({
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
    });

    const {
        values,
        submit,
        change,
    } = props

    const validate = (evt) => {
        yup.reach(formSchema, evt.target.name)
        .validate(evt.target.value)
        .then( valid => {
           setErrorState({
             ...errorState,
             [evt.target.name]: ""
           })
        })
        .catch(error => {
          console.log(error.errors)
          setErrorState({
            ...errorState,
            [evt.target.name]: error.errors[0]
          })
        })
       };

    const [form, setForm] = useState(initialFormValues);

    const onSubmit = evt => {
        evt.preventDefault()
        submit()
    }

    
    const onChange = evt => {
        /* 🔥 FIX THIS SO IT ALSO WORKS WITH CHECKBOXES */
        const { name, value, checked, type } = evt.target
        const valueToUse = type === 'checkbox' ? checked : value;
        change(name, valueToUse)
        validate(evt)
    }
  

    const formSubmit = (e) => {
        e.preventDefault();
        axios.post(`https://reqres.in/api/orders`, form)
            .then(res => { console.log('RES', res) })
            .catch(err => console.log(err.response));
        setForm(initialFormValues)
        };

    return (
        <div>
            <form className={formSubmit} onSubmit={onSubmit}>
                <h2>Create Pizza</h2>
            
                <div className='form-group inputs'>

                    <label>Name
                    <input
                        value={values.name}
                        onChange={onChange}
                        name='name'
                        type='text'
                    />
                    </label>

                    <label>Size
                    <select
                        onChange={onChange}
                        value={values.role}
                        name='size'
                    >
                        <option value=''>- Select an option -</option>
                        <option value='small'>Small</option>
                        <option value='medium'>Medium</option>
                        <option value='large'>Large</option>
                    </select>
                    </label>

                    <label>Pepperoni
                    <input
                        id="toppings"
                        type='checkbox'
                        name='pepperoni'
                        checked={values.pepperoni}
                        onChange={onChange}
                    />
                    </label>

                    <label>Extra Pepperoni
                    <input
                        id="toppings"
                        type='checkbox'
                        name='extraPepperoni'
                        checked={values.extraPepperoni}
                        onChange={onChange}
                    />
                    </label>

                    <label>Cheese
                    <input
                        id="toppings"
                        type='checkbox'
                        name='cheese'
                        checked={values.cheese}
                        onChange={onChange}
                    />
                    </label>

                    <label>Extra Cheese
                    <input
                        id="toppings"
                        type='checkbox'
                        name='extraCheese'
                        checked={values.extraCheese}
                        onChange={onChange}
                    />
                    </label>

                    <label>Special instructions
                    <input
                        value={values.instructions}
                        onChange={onChange}
                        name='instructions'
                        type='text'
                    />
                    </label>

                    <button
                    name="order-button"
                    type="submit">
                        Place Order
                    </button>

                </div>

            </form>
        </div>
    )
    }