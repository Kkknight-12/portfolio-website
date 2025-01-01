'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { motion } from 'framer-motion';
import { useState } from 'react';
import emailjs from '@emailjs/browser';
import {
  MapPin,
  Mail,
  Clock,
  Send,
  Linkedin,
  Github,
  Twitter,
} from 'lucide-react';
import { EXTRA_LINKS } from '@/constants';
import Page from '@/components/ComponentWrapper';

type FormData = {
  name: string;
  email: string;
  message: string;
};

const initialFormData: FormData = {
  name: '',
  email: '',
  message: '',
};

const contactInfo = [
  {
    icon: <MapPin className='h-6 w-6' />,
    title: 'Location',
    details: 'Indore, India',
    description: 'Available for remote work worldwide',
  },
  {
    icon: <Mail className='h-6 w-6' />,
    title: 'Email',
    details: 'mayanks365@gmail.com',
    description: 'Send me a message anytime!',
  },
  {
    icon: <Clock className='h-6 w-6' />,
    title: 'Response Time',
    details: '24-48 hours',
    description: "I'll get back to you as soon as possible",
  },
];

const socialLinks = [
  {
    icon: <Linkedin className='h-5 w-5' />,
    href: EXTRA_LINKS.linkedin,
    label: 'LinkedIn',
    color: 'hover:text-[#0077b5]',
  },
  {
    icon: <Github className='h-5 w-5' />,
    href: EXTRA_LINKS.github,
    label: 'GitHub',
    color: 'hover:text-[#333]',
  },
  {
    icon: <Twitter className='h-5 w-5' />,
    href: '#',
    label: 'Twitter',
    color: 'hover:text-[#1DA1F2]',
  },
];

function ContactForm() {
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const validateForm = () => {
    const { name, email, message } = formData;

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

  // const handleSubmit = (e: any) => {
  //   e.preventDefault();

  //   if (!validateForm()) return false;

  //   setLoading(true);

  //   emailjs
  //     .send(
  //       process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || '',
  //       process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || '',
  //       {
  //         from_name: form.name,
  //         from_email: form.email.trim().toLowerCase(),
  //         to_name: 'mayank',
  //         to_email: process.env.NEXT_PUBLIC_EMAILJS_RECIEVER,
  //         message: form.message,
  //       },
  //       process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY
  //     )
  //     .then(
  //       () => {
  //         // Success
  //         setLoading(false);
  //         alert('Thank You. I will get back to you as soon as possible.');

  //         setForm({
  //           name: '',
  //           email: '',
  //           message: '',
  //         });
  //       },
  //       (error) => {
  //         setLoading(false);
  //         console.log(error);
  //         alert('Sorry. Something went wrong.');

  //         setForm({
  //           name: '',
  //           email: '',
  //           message: '',
  //         });
  //       }
  //     );
  // };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return false;

    setIsLoading(true);

    try {
      await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || '',
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || '',
        {
          from_name: formData.name,
          from_email: formData.email.trim(),
          to_name: 'mayank',
          to_email: process.env.NEXT_PUBLIC_EMAILJS_RECIEVER,
          message: formData.message,
        },
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY
      );

      toast({
        title: 'Message Sent!',
        description:
          'Thank you for reaching out. I&apos;ll get back to you soon.',
      });
      setFormData(initialFormData);
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to send message. Please try again.',
      });
    } finally {
      setIsLoading(false);
    }
  };
  // return (
  //   <div className='my-14 flex justify-center items-center  min-h-[712px] h-[calc(100vh-552px)] md:h-[calc(100vh-428px)]'>
  //     <div className='flex-col flex gap-10 overflow-hidden bg-white/10  p-4 w-[500px] rounded-xl !h-fit'>
  //       <p className='text-xl text-center text-white'>Get in touch</p>

  //       <form
  //         ref={formRef}
  //         onSubmit={handleSubmit}
  //         className='mt-12 flex flex-col gap-8 bg-traparent'
  //       >
  //         <label htmlFor='name' className='flex flex-col'>
  //           <span className='text-white font-medium mb-4'>Your Name*</span>
  //           <input
  //             type='text'
  //             name='name'
  //             id='name'
  //             value={form.name}
  //             onChange={handleChange}
  //             placeholder='Your name'
  //             title="What's your name?"
  //             className='bg-tertiary py-4 px-6 placeholder:text-secondary rounded-lg outline-none border-none font-medium '
  //           />

  //           <span className='text-red-900 mt-2 hidden' id='name-error'>
  //             Invalid Name!
  //           </span>
  //         </label>

  //         <label htmlFor='email' className='flex flex-col'>
  //           <span className='text-white font-medium mb-4'>Your Email*</span>
  //           <input
  //             type='email'
  //             name='email'
  //             id='email'
  //             value={form.email}
  //             onChange={handleChange}
  //             placeholder='Your email'
  //             title="What's your email?"
  //             className='bg-tertiary py-4 px-6 placeholder:text-secondary rounded-lg outline-none border-none font-medium'
  //           />

  //           <span className='text-red-900 mt-2 hidden' id='email-error'>
  //             Invalid E-mail!
  //           </span>
  //         </label>

  //         <label htmlFor='message' className='flex flex-col'>
  //           <span className='text-white font-medium mb-4'>Your Message*</span>
  //           <textarea
  //             rows={7}
  //             name='message'
  //             id='message'
  //             value={form.message}
  //             onChange={handleChange}
  //             placeholder='Message'
  //             title='What do you want to say?'
  //             className='bg-tertiary py-4 px-6 placeholder:text-secondary rounded-lg outline-none border-none font-medium'
  //           />

  //           <span className='text-red-900 mt-2 hidden' id='message-error'>
  //             Invalid Message!
  //           </span>
  //         </label>

  //         <button
  //           type='submit'
  //           className='bg-white px-7 py-3 text-white rounded-full outline-none text-center transition borderBlack dark:bg-white/10 hover:bg-white/20'
  //           disabled={loading}
  //         >
  //           {loading ? 'Sending...' : 'Send'}
  //         </button>
  //       </form>
  //     </div>
  //   </div>
  // );

  return (
    <div className='container mx-auto px-4 py-12'>
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className='text-center max-w-3xl mx-auto mb-16'
      >
        <h1 className='text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent'>
          Let's Work Together
        </h1>
        <p className='text-gray-300 text-lg'>
          Have a project in mind? Looking to collaborate? Or just want to say
          hi? I&apos;d love to hear from you!
        </p>
      </motion.div>

      <div className='grid lg:grid-cols-2 gap-12'>
        {/* Contact Info */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className='space-y-8'
        >
          {/* Contact Cards */}
          <div className='grid gap-6'>
            {contactInfo.map((info, index) => (
              <motion.div
                key={info.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
                className='bg-white/5 backdrop-blur-sm border border-white/10 p-6 rounded-xl hover:border-white/20 transition-colors'
              >
                <div className='flex gap-4'>
                  <div className='text-purple-400'>{info.icon}</div>
                  <div>
                    <h3 className='text-lg font-semibold mb-1'>{info.title}</h3>
                    <p className='text-gray-300 font-medium'>{info.details}</p>
                    <p className='text-gray-400 text-sm'>{info.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Social Links */}
          <div className='space-y-4'>
            <h2 className='text-xl font-semibold'>Connect With Me</h2>
            <div className='flex gap-4'>
              {socialLinks.map((social, index) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target='_blank'
                  rel='noopener noreferrer'
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 + index * 0.1 }}
                  className={`bg-white/5 p-3 rounded-full ${social.color} transition-colors`}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Contact Form */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className='bg-white/5 backdrop-blur-sm border border-white/10 p-8 rounded-xl'
        >
          <form onSubmit={handleSubmit} className='space-y-6'>
            <div className='space-y-2'>
              <Input
                name='name'
                placeholder='Your name'
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                disabled={isLoading}
                className='bg-white/5 border-white/10 focus:border-purple-500'
              />
            </div>
            <div className='space-y-2'>
              <Input
                name='email'
                type='email'
                placeholder='Your email'
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                disabled={isLoading}
                className='bg-white/5 border-white/10 focus:border-purple-500'
              />
            </div>
            <div className='space-y-2'>
              <Textarea
                name='message'
                placeholder='Your message'
                value={formData.message}
                onChange={(e) =>
                  setFormData({ ...formData, message: e.target.value })
                }
                className='min-h-[150px] bg-white/5 border-white/10 focus:border-purple-500'
                disabled={isLoading}
              />
            </div>
            <Button
              type='submit'
              className='w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:opacity-90'
              disabled={isLoading}
            >
              {isLoading ? (
                'Sending...'
              ) : (
                <>
                  Send Message
                  <Send className='w-4 h-4 ml-2' />
                </>
              )}
            </Button>
          </form>
        </motion.div>
      </div>

      {/* Animation Dots */}
      <div className='hidden lg:block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10'>
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className='w-[500px] h-[500px] rounded-full bg-gradient-to-r from-purple-500/20 to-pink-500/20 blur-3xl'
        />
      </div>
    </div>
  );
}
export default Page(ContactForm);
