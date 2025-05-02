import axios from 'axios';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const ValidacionSchema = Yup.object({
    name: Yup.string().required('El nombre es requerido').matches(/^[a-zA-Z]+/,'Debe incluir solo letras y espacios.'),

    email: Yup.string()
      .email('Correo inválido'),


    phone: Yup.string()
    .matches(
      /^\+\d{1,3}\d{7,14}$/,
      'Debe incluir el código de país (ej: +521234567890)'
    ),

  }).test('email-or-phone', 'Debe proporcionar un email o un teléfono', (values) => {
    return !!(values.email || values.phone);
  });

function ContactForm() {
    const baseUrl = 'https://api.leeroygarcia.dev';

    return ( 
        <div className='flex flex-col justify-center items-center py-4 h-dvh w-full'>
            <Formik
                initialValues={{
                    name: '',
                    email: '',
                    phone: '',
                    message: '',
                }}
                onSubmit={async (values) => {
                    const { 
                        email,
                        message,
                        name,
                        phone,
                    } = values
                    console.log("🚀 ~ onSubmit={ ~ values:", values)
                    await new Promise(async (r) => {
                        // axios.post()
                        const response = await axios.post('https://api.leeroygarcia.dev/send-email', {
                            // baseURL: baseUrl
                            name,
                            email,
                            phone,
                            message
                        })

                        console.log('endpointemail', response);
                        // setTimeout(r, 500)
                    });
                    alert(JSON.stringify(values, null, 2));
                }}
                validationSchema={ValidacionSchema}
            >
                {({errors, touched}) => (
                    <Form className='flex flex-col justify-center items-center gap-2 w-full'>
                        {/* <label htmlFor="name">Nombre:</label> */}
                        <Field
                            className="w-full bg-black rounded-xl p-2 placeholder-white text-white" 
                            id="name" 
                            name="name" 
                            placeholder="John Doe" 
                        />
                        <ErrorMessage name="name" component="div" className="text-red-500" />

                        {/* <label htmlFor="email">Email:</label> */}
                        <Field 
                            className="w-full bg-black  rounded-xl p-2 placeholder-black text-white"
                            id="email" 
                            name="email" 
                            placeholder="example@email.com" 
                        />

                        <ErrorMessage name="email" component="div" className="text-red-500" />

                        {/* <label htmlFor="email">Telefono:</label> */}
                        <Field
                            className="w-full bg-black  rounded-xl p-2 placeholder-blue-950 text-white"
                            id="phone"
                            name="phone"
                            placeholder="+527782233445"
                            type="text"
                        />

                        <ErrorMessage name="phone" component="div" className="text-red-500" />

                        <Field
                            className="w-full bg-black rounded-xl p-2 placeholder-blue-950 text-white h-28 text-left align-top resize-none"
                            id="message"
                            name="message"
                            placeholder="Hola me gustaria hablar contigo..."
                            type="textarea"
                            as="textarea"
                        />

                        <ErrorMessage name="message" component="div" className="text-red-500" />

                        {typeof errors === 'string' && (
                                <div className="text-white font-semibold text-xl">{errors}</div>
                                // <div className="text-red-500">{errors}</div>
                            )}

                        <button 
                            className="bg-cosmic-purple w-1/2 rounded-xl p-2" 
                            type="submit"
                        >Enviar</button>
                    </Form>
                )}
            </Formik>
        </div>
     );
}

export default ContactForm;