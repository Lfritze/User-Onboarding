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
        <div>
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
                    Agree with Terms of termsOfService
                    <Field type = 'checkbox' name ='termsOfService' checked={values.termsOfService} />
                </label>
                <button type = 'submit'>Join Team</button>
            </Form>
            {users.map(user => (
                <div key={user.id}>
                    <h1>Name: {user.name}</h1>
                    <h1>Email: {user.name}</h1>
                    <h1>Password: {user.name}</h1>
                    <h1>Role: {user.name}</h1>
            ))}
        </div>
    )
}

const FormikMegaForm = withFormik ({
    mapPropsToValues: (values) => {
        return {
            name: values.name || '',
            email: values.email || '',
            password: values.password || '',
            role: values.role || '',
            termsOfService: values.termsOfService || false,
        }  
    },

    validationSchema: Yup

})

// export default MegaForm;