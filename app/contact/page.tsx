'use client';

import Page from '@/components/ComponentWrapper';
import emailjs from '@emailjs/browser';
import { useRef, useState } from 'react';

const ContactForm = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const [form, setForm] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e: any) => {
    const { name, value } = e.target;

    setForm({ ...form, [name]: value });
  };

  const validateForm = () => {
    const { name, email, message } = form;

    const nameError = document.querySelector('#name-error');
    const emailError = document.querySelector('#email-error');
    const messageError = document.querySelector('#message-error');
    let current: { [key: string]: boolean } = {
      name: false,
      email: false,
      message: false,
    };

    if (name.trim().length < 3) {
      nameError && nameError.classList.remove('hidden');
      current['name'] = false;
    } else {
      nameError && nameError.classList.add('hidden');
      current['name'] = true;
    }

    const email_regex =
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (!email.trim().toLowerCase().match(email_regex)) {
      emailError && emailError.classList.remove('hidden');
      current['email'] = false;
    } else {
      emailError && emailError.classList.add('hidden');
      current['email'] = true;
    }

    if (message.trim().length < 5) {
      messageError && messageError.classList.remove('hidden');
      current['message'] = false;
    } else {
      messageError && messageError.classList.add('hidden');
      current['message'] = true;
    }

    return Object.keys(current).every((k) => current[k]);
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();

    if (!validateForm()) return false;

    setLoading(true);

    emailjs
      .send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || '',
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || '',
        {
          from_name: form.name,
          from_email: form.email.trim().toLowerCase(),
          to_name: 'mayank',
          to_email: process.env.NEXT_PUBLIC_EMAILJS_RECIEVER,
          message: form.message,
        },
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY
      )
      .then(
        () => {
          // Success
          setLoading(false);
          alert('Thank You. I will get back to you as soon as possible.');

          setForm({
            name: '',
            email: '',
            message: '',
          });
        },
        (error) => {
          setLoading(false);
          console.log(error);
          alert('Sorry. Something went wrong.');

          setForm({
            name: '',
            email: '',
            message: '',
          });
        }
      );
  };

  return (
    <div className='my-14 flex justify-center items-center  min-h-[712px] h-[calc(100vh-552px)] md:h-[calc(100vh-428px)]'>
      <div className='flex-col flex gap-10 overflow-hidden bg-white/10  p-4 w-[500px] rounded-xl !h-fit'>
        <p className='text-xl text-center text-white'>Get in touch</p>

        <form
          ref={formRef}
          onSubmit={handleSubmit}
          className='mt-12 flex flex-col gap-8 bg-traparent'
        >
          <label htmlFor='name' className='flex flex-col'>
            <span className='text-white font-medium mb-4'>Your Name*</span>
            <input
              type='text'
              name='name'
              id='name'
              value={form.name}
              onChange={handleChange}
              placeholder='Your name'
              title="What's your name?"
              className='bg-tertiary py-4 px-6 placeholder:text-secondary rounded-lg outline-none border-none font-medium '
            />

            <span className='text-red-900 mt-2 hidden' id='name-error'>
              Invalid Name!
            </span>
          </label>

          <label htmlFor='email' className='flex flex-col'>
            <span className='text-white font-medium mb-4'>Your Email*</span>
            <input
              type='email'
              name='email'
              id='email'
              value={form.email}
              onChange={handleChange}
              placeholder='Your email'
              title="What's your email?"
              className='bg-tertiary py-4 px-6 placeholder:text-secondary rounded-lg outline-none border-none font-medium'
            />

            <span className='text-red-900 mt-2 hidden' id='email-error'>
              Invalid E-mail!
            </span>
          </label>

          <label htmlFor='message' className='flex flex-col'>
            <span className='text-white font-medium mb-4'>Your Message*</span>
            <textarea
              rows={7}
              name='message'
              id='message'
              value={form.message}
              onChange={handleChange}
              placeholder='Message'
              title='What do you want to say?'
              className='bg-tertiary py-4 px-6 placeholder:text-secondary rounded-lg outline-none border-none font-medium'
            />

            <span className='text-red-900 mt-2 hidden' id='message-error'>
              Invalid Message!
            </span>
          </label>

          <button
            type='submit'
            className='bg-white px-7 py-3 text-white rounded-full outline-none text-center transition borderBlack dark:bg-white/10 hover:bg-white/20'
            disabled={loading}
          >
            {loading ? 'Sending...' : 'Send'}
          </button>
        </form>
      </div>
    </div>
  );
};
export default Page(ContactForm);
