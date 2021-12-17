import * as yup from 'yup';


const formSchema = yup.object().shape({
    name: yup.string().trim().required('Enter Username').min(3, 'Username has to be more than three characters!'),
    size: yup.string().oneOf(['Small', 'Medium', 'Large']),
    pepperoni: yup.string().boolean().oneOf([true]),
    extraPepperoni: yup.boolean().oneOf([true]),
    cheese: yup.boolean().oneOf([true]),
    extraCheese: yup.boolean().oneOf([true]),
    instructions: yup.string,    
  });
  export default formSchema;