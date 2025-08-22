import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { motion } from 'motion/react';
import PacmanLoader from 'react-spinners/PacmanLoader';
import { supabase } from '../supabaseClient';
import Swal from 'sweetalert2';


const ValidacionSchema = Yup.object({
    name: Yup.string()
        .required('Name is required')
        .matches(/^[a-zA-Z]+/,'Name must have only letters'),

    email: Yup.string()
      .email('Email is invalid'),


    phone: Yup.string()
    .matches(
      /^\+\d{1,3}\d{7,14}$/,
      'Phone number must include country code (example: +521234567890)'
    ),

    message: Yup.string()
      .required('Message is required')
      .min(10, 'Message must have at least 10 characters')
      .max(500, 'Message must have less than 500 characters'),

  }).test('email-or-phone', 'You must provide email or phone', (values) => {
    return !!(values.email || values.phone);
  });

function ContactForm() {

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
                            placeholder="Hello I would like to contact you..."
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
                                    isSubmitting ? <PacmanLoader color="#FFC857" /> : 'Send Message'
                                }

                        </motion.button>
                    </Form>
                )}
            </Formik>
        </div>
     );
}

export default ContactForm;