import axios from 'axios';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { motion } from 'motion/react';
import PacmanLoader from 'react-spinners/PacmanLoader';
import { supabase } from '../supabaseClient';
import Swal from 'sweetalert2';


const ValidacionSchema = Yup.object({
    name: Yup.string()
        .required('El nombre es requerido')
        .matches(/^[a-zA-Z]+/,'Debe incluir solo letras y espacios.'),

    email: Yup.string()
      .email('Correo inválido'),


    phone: Yup.string()
    .matches(
      /^\+\d{1,3}\d{7,14}$/,
      'Debe incluir el código de país (ej: +521234567890)'
    ),

    message: Yup.string()
      .required('El mensaje es requerido')
      .min(10, 'El mensaje debe tener al menos 10 caracteres')
      .max(500, 'El mensaje debe tener menos de 500 caracteres'),

  }).test('email-or-phone', 'Debe proporcionar un email o un teléfono', (values) => {
    return !!(values.email || values.phone);
  });

function ContactForm() {
    const baseUrl = 'https://api.leeroygarcia.dev';

    return ( 
        <div className='flex flex-col justify-center items-center w-full'>
            <Formik
                initialValues={{
                    name: '',
                    email: '',
                    phone: '',
                    message: '',
                }}
                
                onSubmit={(values, { setSubmitting, resetForm }) => {
                    const { 
                        email,
                        message,
                        name,
                        phone,
                    } = values
                    console.log("🚀 ~ onSubmit={ ~ values:", values)
                    console.log('issubmitting');
                    setTimeout(() => {
                        console.log('enviando email');
                       
                        supabase
                            .from('emails')
                            .insert([
                                {
                                    name,
                                    email,
                                    phone,
                                    message
                                }
                            ])
                            .select()
                            .then((response) => {
                                console.log('response', response);
                            })


                        setSubmitting(false);
                        Swal.fire({
                            icon: 'success',
                            title: 'Email enviado',
                            text: '¡Gracias por contactarnos!',
                            showConfirmButton: false,
                            timer: 2000,
                            background: '#0D0D2B',
                            color: '#F5F7FA',
                            timerProgressBar: true
                        }).then(() => {
                            resetForm();
                        })
                        // alert(JSON.stringify(values, null, 2));
                    }, 3000);
                }}
                validationSchema={ValidacionSchema}
                validateOnChange={true}
                // validateOnBlur={true}
            >
                {({ 
                    isSubmitting,
                    isValid
                }) => (
                  
                    <Form className='flex flex-col justify-center items-center gap-3 w-full'>
                        <Field
                            className="w-full bg-deep-blue  rounded-xl p-3 
                                placeholder-star-white text-white shadow-md
                                focus:scale-105 transition-all ease-in-out duration-500
                                focus:outline-none
                                focus:bg-neon-purple
                                " 
                            id="name" 
                            name="name" 
                            placeholder="John Doe" 
                        />
                        <ErrorMessage name="name" component="div" className="text-red-500" />


                        <Field 
                            className="w-full bg-deep-blue  rounded-xl p-3 
                                placeholder-star-white text-white shadow-md
                                focus:scale-105 transition-all ease-in-out duration-500
                                focus:outline-none
                                focus:bg-neon-purple
                                "
                            id="email" 
                            name="email" 
                            placeholder="example@email.com" 
                        />

                        <ErrorMessage name="email" component="div" className="text-red-500" />

                        <Field
                            className="w-full bg-deep-blue  rounded-xl p-3 
                                placeholder-star-white text-white shadow-md
                                focus:scale-105 transition-all ease-in-out duration-500
                                focus:outline-none
                                focus:bg-neon-purple"
                            id="phone"
                            name="phone"
                            placeholder="+527782233445"
                            type="text"
                        />

                        <ErrorMessage name="phone" component="div" className="text-red-500" />

                        <Field
                            className="w-full bg-deep-blue  rounded-xl p-3 
                                placeholder-blue-950 text-white h-28 text-left 
                                align-top resize-none shadow-md
                                focus:scale-105 transition-all ease-in-out duration-500
                                focus:outline-none
                                focus:bg-neon-purple
                                "
                            id="message"
                            name="message"
                            placeholder="Hola me gustaria hablar contigo..."
                            type="textarea"
                            as="textarea"
                        />

                        <ErrorMessage name="message" component="div" className="text-red-500" />

                        {/* {
                            !isValid && <div className="text-white font-semibold text-xl">Completa todos los campos</div>
                        } */}

                         <motion.button
                            whileHover={{ scale: 1.03, backgroundColor: '#9333ea', color: '#fff' }}
                            whileTap={{ scale: 0.95 }}
                            transition={{ type: 'spring', stiffness: 100 }}
                            type='submit'
                            disabled={!isValid || isSubmitting}
                            className={`px-6 py-3 
                                w-full
                                text-lg
                                ${!isValid || isSubmitting ? 'hover:cursor-not-allowed' :  'hover:cursor-pointer'}
                                
                                rounded-lg bg-turquoise-green text-black 
                                font-semibold shadow-lg hover:shadow-xl 
                                focus:outline-none
                                flex flex-row justify-center items-center
                                `}
                            >

                                {
                                    isSubmitting ? <PacmanLoader color="#FFC857" /> : 'Enviar'
                                }

                        </motion.button>
                    </Form>
                )}
            </Formik>
        </div>
     );
}

export default ContactForm;