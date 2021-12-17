import React, { useState, useEffect } from 'react'
import * as yup from 'yup';
import axios from 'axios';
    
export default function Form(props) {    
  
    const initialFormValues = {
        name: "",
        size: "",
        pepperoni: false,
        extraPepperoni: false,
        cheese: false,
        extraCheese: false,
        instructions: "",
    }

    const initialFormErrors = {
        name: "",
        size: "",
        pepperoni: false,
        extraPepperoni: false,
        cheese: false,
        extraCheese: false,
        instructions: "",
    }
    const [formValues, setFormValues] = useState(initialFormValues) 
    const [formErrors, setFormErrors] = useState(initialFormErrors) 

    const formSchema = yup.object().shape({
        name: yup.string().trim().required('Enter Username').min(3, 'Username has to be more than three characters!'),
        size: yup
          .string().oneOf(['Small', 'Medium', 'Large']),
        pepperoni: yup 
          .string().bool(),
        extraPepperoni: yup.bool(),
        cheese: yup.bool(),
        extraCheese: yup.bool(),
        instructions: yup.string,    
      })
    

      useEffect(() => {
		formSchema.isValid(form).then((valid) => {
			setButtonDisabled(!valid)
		})
	})  

    const [buttonDisabled, setButtonDisabled] = useState(true)  
   
    const {
        values,
        submit,
        change,
        disabled,
        errors,
    } = props

    const [form, setForm] = useState(initialFormValues);

    const onSubmit = evt => {
        evt.preventDefault()
        submit()
    }

    const onChange = evt => {
        const { name, value, checked, type } = evt.target
        const valueToUse = type === 'checkbox' ? checked : value;
        change(name, valueToUse)
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