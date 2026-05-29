'use client'
// src/app/contact/ContactClient.tsx
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { FaMapMarkerAlt, FaEnvelope } from 'react-icons/fa';
import { submitContactForm } from '../../lib/supabase';
import { cn } from '@/lib/utils';

const FALLBACK_EMAIL = 'ceus@unsw.edu.au';

const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, { message: 'Please enter your full name (at least 2 characters).' })
    .max(80, { message: 'That name is a bit long. Try 80 characters or fewer.' }),
  email: z
    .string()
    .trim()
    .min(1, { message: 'We need an email so we can write back.' })
    .email({ message: 'That email looks incomplete. Check for an @ and a domain.' }),
  subject: z
    .string()
    .trim()
    .min(3, { message: 'Add a short subject so we know what it is about.' })
    .max(120, { message: 'Try to keep the subject under 120 characters.' }),
  message: z
    .string()
    .trim()
    .min(10, { message: 'Add a few more details so we can help properly (at least 10 characters).' })
    .max(2000, { message: 'That is over 2000 characters. Trim it down or email us instead.' }),
});

type ContactFormValues = z.infer<typeof contactSchema>;

const inputBase =
  'w-full rounded-md border bg-white px-4 py-3 text-base text-gray-900 placeholder:text-gray-400 ' +
  'focus:outline-none focus:border-blue-600 focus:ring-[3px] focus:ring-blue-600/25 ' +
  'disabled:bg-gray-50 disabled:text-gray-500';

const inputDefault = 'border-gray-200';
const inputError = 'border-red-600';

const ContactClient: React.FC = () => {
  const [submitState, setSubmitState] = useState<'idle' | 'success' | 'error'>('idle');
  const [serverErrorMessage, setServerErrorMessage] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isSubmitted },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    mode: 'onBlur',
    reValidateMode: 'onChange',
    defaultValues: { name: '', email: '', subject: '', message: '' },
  });

  const onSubmit = async (values: ContactFormValues) => {
    setServerErrorMessage(null);
    try {
      await submitContactForm({
        name: values.name,
        email: values.email,
        subject: values.subject,
        message: values.message,
      });
      setSubmitState('success');
    } catch (error) {
      console.error('Failed to submit form:', error);
      setServerErrorMessage(
        'Something went wrong on our end. Please try again in a moment, or email us directly.'
      );
      setSubmitState('error');
    }
  };

  const handleSendAnother = () => {
    reset();
    setSubmitState('idle');
    setServerErrorMessage(null);
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="container mx-auto px-6 py-12 md:py-16">
        <header className="max-w-2xl mb-10 md:mb-14">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight">
            Contact CEUS
          </h1>
          <p className="text-lg text-gray-700 mt-4">
            Questions about events, merch, or a sponsorship enquiry? Send us a note and
            the committee will be in touch.
          </p>
          <p className="text-sm text-gray-600 mt-2">
            We reply within 3 to 4 days during term. Responses may be slower during exams and breaks.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Form column (wider) */}
          <section
            aria-labelledby="contact-form-heading"
            className="lg:col-span-3 bg-white p-6 md:p-8 rounded-lg border border-gray-200"
          >
            <h2
              id="contact-form-heading"
              className="text-2xl font-bold text-gray-900 mb-1"
            >
              Send us a message
            </h2>
            <p className="text-sm text-gray-600 mb-6">
              Fields marked with <span aria-hidden="true">*</span>
              <span className="sr-only">an asterisk</span> are required.
            </p>

            {submitState === 'success' ? (
              <div
                role="status"
                aria-live="polite"
                className="rounded-md border border-gray-200 bg-white p-6"
              >
                <h3 className="text-xl font-bold text-gray-900">
                  Thanks, your message is on its way.
                </h3>
                <p className="text-gray-700 mt-2">
                  A committee member will reply within 3 to 4 days during term.
                  In the meantime, feel free to follow us on socials for updates.
                </p>
                <p className="text-sm text-gray-600 mt-4">
                  Prefer email? Reach us directly at{' '}
                  <a
                    href={`mailto:${FALLBACK_EMAIL}`}
                    className="text-[#1B397E] underline underline-offset-2 hover:text-[#2563EB]"
                  >
                    {FALLBACK_EMAIL}
                  </a>
                  .
                </p>
                <div className="mt-6 flex flex-col sm:flex-row gap-3">
                  <button
                    type="button"
                    onClick={handleSendAnother}
                    className={cn(
                      'inline-flex items-center justify-center rounded-md px-5 py-3 font-semibold',
                      'bg-[#1B397E] text-white hover:bg-blue-700',
                      'focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-blue-600/25'
                    )}
                  >
                    Send another message
                  </button>
                  <a
                    href={`mailto:${FALLBACK_EMAIL}`}
                    className={cn(
                      'inline-flex items-center justify-center rounded-md px-5 py-3 font-semibold',
                      'border-2 border-[#1B397E] bg-transparent text-[#1B397E] hover:bg-[#1B397E]/5',
                      'focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-blue-600/25'
                    )}
                  >
                    Email us instead
                  </a>
                </div>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit(onSubmit)}
                noValidate
                className="space-y-5"
                aria-describedby={serverErrorMessage ? 'server-error' : undefined}
              >
                {/* Name */}
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-semibold text-gray-900 mb-1.5"
                  >
                    Full name <span aria-hidden="true" className="text-red-700">*</span>
                  </label>
                  <input
                    id="name"
                    type="text"
                    autoComplete="name"
                    aria-required="true"
                    aria-invalid={errors.name ? 'true' : 'false'}
                    aria-describedby={errors.name ? 'name-error' : undefined}
                    className={cn(inputBase, errors.name ? inputError : inputDefault)}
                    {...register('name')}
                  />
                  {errors.name && (
                    <p id="name-error" className="mt-1.5 text-sm text-red-700">
                      {errors.name.message}
                    </p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-semibold text-gray-900 mb-1.5"
                  >
                    Email address <span aria-hidden="true" className="text-red-700">*</span>
                  </label>
                  <input
                    id="email"
                    type="email"
                    autoComplete="email"
                    inputMode="email"
                    aria-required="true"
                    aria-invalid={errors.email ? 'true' : 'false'}
                    aria-describedby={
                      errors.email ? 'email-error' : 'email-help'
                    }
                    className={cn(inputBase, errors.email ? inputError : inputDefault)}
                    {...register('email')}
                  />
                  {errors.email ? (
                    <p id="email-error" className="mt-1.5 text-sm text-red-700">
                      {errors.email.message}
                    </p>
                  ) : (
                    <p id="email-help" className="mt-1.5 text-sm text-gray-600">
                      We will only use this to reply to your message.
                    </p>
                  )}
                </div>

                {/* Subject */}
                <div>
                  <label
                    htmlFor="subject"
                    className="block text-sm font-semibold text-gray-900 mb-1.5"
                  >
                    Subject <span aria-hidden="true" className="text-red-700">*</span>
                  </label>
                  <input
                    id="subject"
                    type="text"
                    autoComplete="off"
                    aria-required="true"
                    aria-invalid={errors.subject ? 'true' : 'false'}
                    aria-describedby={errors.subject ? 'subject-error' : 'subject-help'}
                    className={cn(inputBase, errors.subject ? inputError : inputDefault)}
                    {...register('subject')}
                  />
                  {errors.subject ? (
                    <p id="subject-error" className="mt-1.5 text-sm text-red-700">
                      {errors.subject.message}
                    </p>
                  ) : (
                    <p id="subject-help" className="mt-1.5 text-sm text-gray-600">
                      A short line like &quot;Sponsorship enquiry&quot; or &quot;Merch question&quot;.
                    </p>
                  )}
                </div>

                {/* Message */}
                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-semibold text-gray-900 mb-1.5"
                  >
                    Message <span aria-hidden="true" className="text-red-700">*</span>
                  </label>
                  <textarea
                    id="message"
                    rows={6}
                    autoComplete="off"
                    aria-required="true"
                    aria-invalid={errors.message ? 'true' : 'false'}
                    aria-describedby={errors.message ? 'message-error' : 'message-help'}
                    className={cn(inputBase, 'resize-y min-h-[8rem]', errors.message ? inputError : inputDefault)}
                    {...register('message')}
                  />
                  {errors.message ? (
                    <p id="message-error" className="mt-1.5 text-sm text-red-700">
                      {errors.message.message}
                    </p>
                  ) : (
                    <p id="message-help" className="mt-1.5 text-sm text-gray-600">
                      The more context you can share, the better we can help.
                    </p>
                  )}
                </div>

                {/* Server-side error */}
                {submitState === 'error' && serverErrorMessage && (
                  <div
                    id="server-error"
                    role="alert"
                    className="rounded-md border border-red-600 bg-red-50 p-4"
                  >
                    <p className="text-sm font-semibold text-red-700">
                      We could not send your message.
                    </p>
                    <p className="text-sm text-red-700 mt-1">
                      {serverErrorMessage} You can also email us at{' '}
                      <a
                        href={`mailto:${FALLBACK_EMAIL}`}
                        className="underline underline-offset-2"
                      >
                        {FALLBACK_EMAIL}
                      </a>
                      .
                    </p>
                  </div>
                )}

                {/* Generic validation summary on first failed submit */}
                {isSubmitted && Object.keys(errors).length > 0 && (
                  <div role="alert" className="rounded-md border border-red-600 bg-red-50 p-4">
                    <p className="text-sm font-semibold text-red-700">
                      Please check the highlighted fields and try again.
                    </p>
                  </div>
                )}

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    aria-busy={isSubmitting}
                    className={cn(
                      'w-full sm:w-auto inline-flex items-center justify-center',
                      'rounded-md px-6 py-3 font-semibold text-white',
                      'bg-[#1B397E] hover:bg-blue-700',
                      'focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-blue-600/25',
                      'disabled:opacity-70 disabled:cursor-not-allowed'
                    )}
                  >
                    {isSubmitting ? 'Sending…' : 'Send message'}
                  </button>
                  <p className="text-xs text-gray-600 mt-3">
                    By sending, you agree we may reply to the email you provided.
                  </p>
                </div>
              </form>
            )}
          </section>

          {/* Contact info column */}
          <aside
            aria-labelledby="contact-info-heading"
            className="lg:col-span-2 bg-white p-6 md:p-8 rounded-lg border border-gray-200"
          >
            <h2
              id="contact-info-heading"
              className="text-2xl font-bold text-gray-900 mb-6"
            >
              Other ways to reach us
            </h2>
            <div className="space-y-6">
              <div className="flex items-start">
                <FaEnvelope
                  aria-hidden="true"
                  className="text-[#1B397E] text-xl mt-1 mr-4 flex-shrink-0"
                />
                <div>
                  <h3 className="font-semibold text-gray-900">Email</h3>
                  <p className="text-gray-700">
                    <a
                      href={`mailto:${FALLBACK_EMAIL}`}
                      className="text-[#1B397E] underline underline-offset-2 hover:text-[#2563EB]"
                    >
                      {FALLBACK_EMAIL}
                    </a>
                  </p>
                  <p className="text-sm text-gray-600 mt-1">
                    Best for sponsors and longer enquiries.
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <FaMapMarkerAlt
                  aria-hidden="true"
                  className="text-[#1B397E] text-xl mt-1 mr-4 flex-shrink-0"
                />
                <div>
                  <h3 className="font-semibold text-gray-900">Address</h3>
                  <p className="text-gray-700">
                    K-F10, June Griffith Building
                    <br />
                    UNSW Sydney, High St
                    <br />
                    Kensington NSW 2052, Australia
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8">
              <div className="aspect-video rounded-md overflow-hidden border border-gray-200">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3310.9243864439327!2d151.2288773!3d-33.9173456!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6b12b18b76295deb%3A0x4a0d0172d71babf0!2sJune%20Griffith%20Building%20(F10)!5e0!3m2!1sen!2sau!4v1754220844152!5m2!1sen!2sau"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  title="June Griffith Building (F10) on Google Maps"
                />
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default ContactClient;
