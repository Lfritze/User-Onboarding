import React from "react";

function Form ({values}) {
    // const [users, setUsers] = useState ([]) 

 return (
     <div className = 'name-form'>
         <Form>
         <Field type="text" name="name" placeholder="Name" />
            {touched.name && errors.name && (<p>{errors.name}</p>)}
            
         </Form>
     </div>
 )
    
}

