import React, { useState, useEffect } from "react";
import { withFormik, Form, Field } from "formik";
import * as Yup from "yup";
import axios from "axios";

const MegaForm = ({values, errors, touched, status }) => {
    const [users, setUsers] = useState([]);
    useEffect(() => {
        if (status) {
            setUsers([...users, status]);
        }
    }, [status])

    return (
        <div className = 'mega-form'>
            <Form>
                {touched.name && errors.name && (
                    <p className = 'error'>{errors.name}</p>
                )}
                <Field type ='text' name = 'name' placeholder = 'Name' />

                {touched.email && errors.email && (
                    <p className = 'error'>{errors.email}</p>
                )}
                <Field type ='email' name ='email' placeholder = 'Email' />

                {touched.password && errors.password && (
                    <p className = 'error'>{errors.password}</p>
                )}
                <Field type = 'password' name = 'password' placeholder = 'Password' />

                {touched.password && errors.role && (
                    <p className = 'error'>{errors.role}</p>
                )}

                <Field component = 'select' name = 'role'>
                    <option value = '' disabled>Select a Role</option>
                    <option value = 'frontend-dev'>Frontend Dev</option>
                    <option value = 'backend-dev'>Backend Dev</option>
                    <option value = 'ux-designer'>UX Designer</option>
                    <option value = 'intern'>Intern</option>
                </Field>

                {touched.termsOfService && errors.termsOfService && (
                    <p className = 'error'>{errors.term}</p>
                )}
                <label>
                    Agree with Terms of Service
                    <Field type = 'checkbox' name ='termsOfService' checked={values.termsOfService} />
                </label>
                <button type = 'submit'>Join Team</button>
            </Form>
            {users.map(user => (
                <div key={user.id}>
                    <h2>Name: {user.name}</h2>
                    <p>Email: {user.email}</p>
                    <p>Password: {user.password}</p>
                    <p>Role: {user.role}</p>
                    </div>
            ))}
        </div>
    )
}

const FormikMegaForm = withFormik ({
    mapPropsToValues: (values) => {
        return {
            name: values.name || "",
            email: values.email || "",
            password: values.password || "",
            role: values.role || "",
            termsOfService: values.termsOfService || false,
        }  
    },

    validationSchema: Yup.object().shape({
        name: Yup.string().required('Name Required'),
        email: Yup.string().required('Valid Email Required'),
        password: Yup.string().min(6).required('Minimum Password Length is 6 Characters'),
        role: Yup.string().required('Please Select a Role'),
        termsOfService: Yup.bool().oneOf([true], 'Terms of Service Agreement Required')
    }),

    handleSubmit(values, { setStatus }) {
        axios
        .post("https://reqres.in/api/users/", values)
        .then(res => {
            setStatus(res.data);
        })
        .catch(err => console.log(err.res));
    }
    

})(MegaForm);

export default FormikMegaForm;