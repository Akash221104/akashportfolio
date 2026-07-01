'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Card from './ui/Card';
import Button from './ui/Button';
import { Mail, Phone, BookOpen, Send, CheckCircle2, ArrowRight } from 'lucide-react';
import { Github, Linkedin } from '@/components/ui/Icons';

export default function Contact() {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    // Basic Validation
    if (!formState.name || !formState.email || !formState.subject || !formState.message) {
      setErrorMsg('Please fill in all the fields.');
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Simulate form submission delay
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setIsSuccess(true);
      setFormState({ name: '', email: '', subject: '', message: '' });
    } catch {
      setErrorMsg('An error occurred. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-24 px-6 md:px-12 bg-black/20">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl sm:text-4xl font-display font-bold text-white tracking-tight mb-3"
          >
            Get In Touch
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="w-12 h-1 bg-primary rounded-full mb-4"
          />
          <p className="text-muted text-sm max-w-sm">
            Let&apos;s build something impactful together.
          </p>
        </div>

        {/* Two-Column Form Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Column 1: Info and Links (lg:col-span-5) */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-6">
            <Card className="flex-1 flex flex-col justify-between border-border bg-card">
              <div>
                <h3 className="text-lg font-display font-bold text-white mb-3">
                  Let&apos;s Connect
                </h3>
                <p className="text-sm text-muted leading-relaxed mb-6">
                  Have an exciting project opportunity, internship opening, research proposal, or just want to chat about generative AI and developer communities? Drop a message!
                </p>

                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center text-primary shrink-0">
                      <Mail className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-[10px] text-muted block">Direct Email</span>
                      <a
                        href="mailto:assatpute123456@gmail.com"
                        className="text-xs text-white hover:underline font-medium"
                      >
                        assatpute123456@gmail.com
                      </a>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center text-primary shrink-0">
                      <Phone className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-[10px] text-muted block">Call / WhatsApp</span>
                      <a
                        href="tel:+919987935895"
                        className="text-xs text-white hover:underline font-medium"
                      >
                        +91 9987935895
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Social connect list */}
              <div className="mt-10 border-t border-border/60 pt-6">
                <span className="text-[10px] font-bold text-muted uppercase tracking-wider block mb-4">
                  Find me on
                </span>
                <div className="grid grid-cols-3 gap-3">
                  <a
                    href="https://www.linkedin.com/in/akash-satpute-548b5a256/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-lg border border-border bg-white/[0.01] hover:bg-white/5 text-muted hover:text-white flex flex-col items-center justify-center text-center gap-2 transition-colors group cursor-pointer"
                  >
                    <Linkedin className="w-5 h-5 text-muted group-hover:text-primary transition-colors" />
                    <span className="text-[10px] font-medium">LinkedIn</span>
                  </a>
                  <a
                    href="https://github.com/Akash221104"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-lg border border-border bg-white/[0.01] hover:bg-white/5 text-muted hover:text-white flex flex-col items-center justify-center text-center gap-2 transition-colors group cursor-pointer"
                  >
                    <Github className="w-5 h-5 text-muted group-hover:text-white transition-colors" />
                    <span className="text-[10px] font-medium">GitHub</span>
                  </a>
                  <a
                    href="https://akashblogss.hashnode.dev/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-lg border border-border bg-white/[0.01] hover:bg-white/5 text-muted hover:text-white flex flex-col items-center justify-center text-center gap-2 transition-colors group cursor-pointer"
                  >
                    <BookOpen className="w-5 h-5 text-muted group-hover:text-secondary transition-colors" />
                    <span className="text-[10px] font-medium">Blog</span>
                  </a>
                </div>
              </div>
            </Card>
          </div>

          {/* Column 2: Form (lg:col-span-7) */}
          <div className="lg:col-span-7">
            <Card className="h-full border-border bg-card relative overflow-hidden">
              <AnimatePresence mode="wait">
                {!isSuccess ? (
                  <motion.form
                    key="form"
                    onSubmit={handleSubmit}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="space-y-4 flex flex-col h-full justify-between"
                  >
                    <div className="space-y-4">
                      {/* Name & Email Row */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="flex flex-col gap-1.5">
                          <label htmlFor="name" className="text-xs text-muted font-medium">
                            Your Name
                          </label>
                          <input
                            type="text"
                            id="name"
                            name="name"
                            value={formState.name}
                            onChange={handleChange}
                            placeholder="John Doe"
                            className="bg-white/5 border border-border/80 rounded-lg px-4 py-2 text-sm text-white focus:outline-none focus:border-primary transition-colors"
                            required
                          />
                        </div>
                        <div className="flex flex-col gap-1.5">
                          <label htmlFor="email" className="text-xs text-muted font-medium">
                            Your Email
                          </label>
                          <input
                            type="email"
                            id="email"
                            name="email"
                            value={formState.email}
                            onChange={handleChange}
                            placeholder="john@example.com"
                            className="bg-white/5 border border-border/80 rounded-lg px-4 py-2 text-sm text-white focus:outline-none focus:border-primary transition-colors"
                            required
                          />
                        </div>
                      </div>

                      {/* Subject */}
                      <div className="flex flex-col gap-1.5">
                        <label htmlFor="subject" className="text-xs text-muted font-medium">
                          Subject
                        </label>
                        <input
                          type="text"
                          id="subject"
                          name="subject"
                          value={formState.subject}
                          onChange={handleChange}
                          placeholder="Project Collaboration"
                          className="bg-white/5 border border-border/80 rounded-lg px-4 py-2 text-sm text-white focus:outline-none focus:border-primary transition-colors"
                          required
                        />
                      </div>

                      {/* Message */}
                      <div className="flex flex-col gap-1.5">
                        <label htmlFor="message" className="text-xs text-muted font-medium">
                          Message
                        </label>
                        <textarea
                          id="message"
                          name="message"
                          value={formState.message}
                          onChange={handleChange}
                          rows={5}
                          placeholder="Tell me more about your requirements..."
                          className="bg-white/5 border border-border/80 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-primary transition-colors resize-none"
                          required
                        />
                      </div>
                    </div>

                    {/* Submit Actions */}
                    <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4">
                      {errorMsg && (
                        <span className="text-xs text-rose-400 font-medium">{errorMsg}</span>
                      )}
                      <div className="flex-1" />
                      <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full sm:w-auto gap-2"
                      >
                        {isSubmitting ? 'Sending Message...' : 'Send Message'}
                        <Send className="w-3.5 h-3.5" />
                      </Button>
                    </div>
                  </motion.form>
                ) : (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="h-full flex flex-col items-center justify-center text-center py-12 px-6"
                  >
                    <div className="w-14 h-14 rounded-full bg-emerald-400/10 border border-emerald-400/20 flex items-center justify-center text-emerald-400 mb-6">
                      <CheckCircle2 className="w-8 h-8" />
                    </div>
                    <h3 className="text-xl font-display font-bold text-white mb-2">
                      Message Sent!
                    </h3>
                    <p className="text-sm text-muted leading-relaxed max-w-sm mb-8">
                      Thank you for reaching out. Your message has been received, and Akash will get back to you shortly.
                    </p>
                    <Button variant="outline" onClick={() => setIsSuccess(false)} className="gap-2">
                      Send another message
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Button>
                  </motion.div>
                )}
              </AnimatePresence>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
