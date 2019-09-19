import React, {useState, useEffect} from "react";
import { withFormik, Form, Field } from "formik";

function NewUser ({values, errors, touched, status}) {
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
                <label>
                <Field type="checkbox" name ="check" checked={values.check} placeholder ="Terms of Service" />
                </label>

                <button>Submit</button>
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

export default FormikNewUser;

