import { ErrorMessage, Field } from "formik";

interface Props {
    id: string;
    placeholder: string;
    type?: string
}


function FieldContact({ id, placeholder, type = 'text' }:Props) {
    return ( 
        <>
            <Field 
                className="w-full bg-deep-blue  rounded-xl p-3 
                    placeholder-star-white text-white shadow-md
                    focus:scale-105 transition-all ease-in-out duration-500
                    focus:outline-none
                    focus:bg-neon-purple
                    "
                id={id}
                name={id}
                placeholder={placeholder}
                autocomplete={id}
                defaultValue=""
            />

            <ErrorMessage name={id} component="div" className="text-mars-red" />
        </>
     );
}

export default FieldContact;