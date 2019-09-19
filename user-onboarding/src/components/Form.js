import React, {useState, useEffect} from "react";
import { withFormik, Form, Field } from "formik";
import * as Yup from "yup";
import axios from "axios";

function NewUser ({values, errors, touched, isSubmitting, status}) {
    const [users, setUsers] = useState ([]);

    useEffect(() => {
        if(status) {
            setUsers(users => [...users, status]);
        }
    }, [status])  
    //name, email, password, terms of service checkbox, submit button
    return (
        <div className = 'name-form'>
            <Form>
                <div>
                <Field type="text" name="name" placeholder="Name" />
                    {touched.name && errors.name && (<p>{errors.name}</p>
                    )}
                </div>
                <div>
                <Field type="email" name ="email" placeholder ="Email" />
                    {touched.email && errors.email && (<p>{errors.email}</p>
                    )}
                </div>
                <div>
                <Field type="password" name ="password" placeholder ="Password" />
                    {touched.password && errors.password && (<p>{errors.password}</p>
                    )}
                </div>
                <label>Accept Terms of Service:
                <Field type="checkbox" name ="tos" checked={values.tos}  />
                
                </label>
                {/* placeholder ="Terms of Service" */}
                <div>
                <button disabled={isSubmitting}>Submit</button>
                </div>
            </Form>

            {users.map((things, index) => {
                return (
                    <div key = {index}>
                    <h1>{things.name}</h1>
                    <p>{things.email}</p>
                    </div>
                )
            })}
        </div>
    );  
}

const FormikNewUser = withFormik({
    mapPropsToValues({ name, email, password, checkbox}) {
        return {
            name: name || "",
            email: email || "",
            password: password || "",
            checkbox: checkbox || false,
        };
    },

    validationSchema: Yup.object().shape({
        name: Yup.string()
            .required("You Must Enter Your Name"),
        email: Yup.string()
            .email('Invalid Email')
            .required("You Must Enter Your Email"),
        password: Yup.string()
            .min(6, "Password must be 6 or more characters!")
            .required("You Must Enter A Password")
    }),

    handleSubmit(values, { resetForm, setErrors, setSubmitting, setStatus }) {
        if (values.email === "") {
            setErrors({ email: "That email is in use already" });
        } else {
            axios
                .post("https://reqres.in/api/users", values)
                .then(response => {
                    setStatus(response.data); 
                    resetForm();
                    setSubmitting(false);
                })
                .catch(error => {
                    console.log(error); 
                    setSubmitting(false);
                });
        }
    }
}) (NewUser)

console.log("THis is the HOC", FormikNewUser);

export default FormikNewUser;


