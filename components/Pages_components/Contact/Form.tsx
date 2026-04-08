"use client";

import React, { useState, useTransition } from "react";
import { z } from "zod";
import { useToast } from "@/components/ui/use-toast";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import image1 from "@/public/images/icon-1-contact-marketing-template.svg";
import image2 from "@/public/images/icon-2-contact-marketing-template.svg";
import image3 from "@/public/images/V13.png";
import { Textarea } from "@/components/ui/textarea";
import {
  ArrowRight,
  Building,
  Mail,
  MapPin,
  Smartphone,
  UserRound,
} from "lucide-react";
import { motion } from "framer-motion";
import {
  Form as Forms,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { FormError } from "@/components/form-error";
import { contact } from "@/actions/contact";
import { contactSchema } from "@/schemas";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";

type ContactFormValues = z.infer<typeof contactSchema>;

interface Services {
  id: string;
  name: string;
  description: string;
  icon: string;
}

interface Props {
  services: Services[];
}

const Form = ({ services }: Props) => {
  const { toast } = useToast();
  const [error, setError] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      email: "",
      name: "",
      phoneNumber: "",
      service: "",
      description: "",
      company: "",
    },
  });

  const onSubmit = (values: ContactFormValues) => {
    setError("");

    startTransition(async () => {
      const data = await contact(values);

      if (data.success) {
        toast({
          title: "Success",
          description: data.message || "Message sent successfully.",
          variant: "default",
        });

        form.reset();
      } else {
        setError(data.error);

        toast({
          title: "Error",
          description: data.error || "Something went wrong.",
          variant: "destructive",
        });
      }
    });
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0, transition: { duration: 0.7 } }}
      className="bg-linear-to-b from-white via-red-50/20 to-white px-4 pb-28 pt-24 xl:px-14 xxl:px-40 xll:px-80 xxx:px-[22%] lll:px-[25%]"
    >
      <div className="grid items-start gap-10 xl:grid-cols-[1fr_1.1fr] xl:gap-12">
        <div className="w-full">
          <div className="inline-flex rounded-full bg-red-50 px-4 py-2 text-sm font-semibold text-red-500">
            Get in touch
          </div>

          <h1 className="mt-5 text-3xl md:text-4xl font-bold leading-tight text-gray-900 sm:text-5xl">
            Ready to elevate your brand?
          </h1>

          <p className="mt-5 max-w-xl text-lg leading-8 text-gray-500">
            Contact us to discuss your project and discover how we can help you
            grow with design, printing, digital solutions, and more.
          </p>

          <div className="mt-10 grid gap-4">
            <div className="flex items-center gap-4 rounded-3xl border border-gray-200 bg-white p-5 shadow-sm">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-red-50">
                <Image
                  src={image1}
                  alt="Email icon"
                  priority
                  width={28}
                  height={28}
                  className="rounded-xl object-contain"
                />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-400">Email us</p>
                <h5 className="text-base font-semibold text-gray-900 sm:text-lg">
                  contact@mhmdigital.us
                </h5>
              </div>
            </div>

            <div className="flex items-center gap-4 rounded-3xl border border-gray-200 bg-white p-5 shadow-sm">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-red-50">
                <Image
                  src={image2}
                  alt="Phone icon"
                  priority
                  width={28}
                  height={28}
                  className="rounded-xl object-contain"
                />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-400">Call us</p>
                <h5 className="text-base font-semibold text-gray-900 sm:text-lg">
                  +1 888 903 7679
                </h5>
              </div>
            </div>

            <div className="flex items-center gap-4 rounded-3xl border border-gray-200 bg-white p-5 shadow-sm">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-red-50">
                <Image
                  src={image3}
                  alt="Location icon"
                  priority
                  width={28}
                  height={28}
                  className="rounded-xl object-contain"
                />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-400">Location</p>
                <h5 className="text-base font-semibold uppercase text-gray-900 sm:text-lg">
                  Seattle, WA 98118
                </h5>
              </div>
            </div>
          </div>

          <div className="mt-8 rounded-[32px] border border-gray-200 bg-white p-6 shadow-sm">
            <h3 className="text-xl font-bold text-gray-900">
              Let&apos;s talk about your project
            </h3>
            <p className="mt-3 text-sm leading-7 text-gray-500">
              Fill out the form and tell us what you need. We’ll review your
              request and get back to you as soon as possible.
            </p>
          </div>
        </div>

        <div className="w-full">
          <Forms {...form}>
            <form
              className="rounded-[36px] border border-gray-200 bg-white px-6 py-8 shadow-[0_20px_60px_rgba(0,0,0,0.08)] sm:px-8 md:px-10"
              onSubmit={form.handleSubmit(onSubmit)}
            >
              <div className="mb-8 border-b border-gray-100 pb-6">
                <h2 className="text-2xl font-bold text-gray-900 md:text-3xl">
                  Send us a message
                </h2>
                <p className="mt-2 text-sm leading-6 text-gray-500">
                  Complete the form below and we’ll contact you shortly.
                </p>
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormControl>
                        <div className="flex items-center gap-3 rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 transition-all duration-300 focus-within:border-red-300 focus-within:bg-white focus-within:shadow-sm">
                          <UserRound className="h-5 w-5 shrink-0 text-gray-400" />
                          <Input
                            placeholder="Full name *"
                            {...field}
                            disabled={isPending}
                            className="border-0 bg-transparent p-0 shadow-none focus-visible:ring-0"
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormControl>
                        <div className="flex items-center gap-3 rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 transition-all duration-300 focus-within:border-red-300 focus-within:bg-white focus-within:shadow-sm">
                          <Mail className="h-5 w-5 shrink-0 text-gray-400" />
                          <Input
                            type="email"
                            placeholder="Email *"
                            {...field}
                            disabled={isPending}
                            className="border-0 bg-transparent p-0 shadow-none focus-visible:ring-0"
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="phoneNumber"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormControl>
                        <div className="flex items-center gap-3 rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 transition-all duration-300 focus-within:border-red-300 focus-within:bg-white focus-within:shadow-sm">
                          <Smartphone className="h-5 w-5 shrink-0 text-gray-400" />
                          <Input
                            type="tel"
                            placeholder="Phone number *"
                            {...field}
                            disabled={isPending}
                            className="border-0 bg-transparent p-0 shadow-none focus-visible:ring-0"
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="company"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormControl>
                        <div className="flex items-center gap-3 rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 transition-all duration-300 focus-within:border-red-300 focus-within:bg-white focus-within:shadow-sm">
                          <Building className="h-5 w-5 shrink-0 text-gray-400" />
                          <Input
                            placeholder="Company name"
                            {...field}
                            disabled={isPending}
                            className="border-0 bg-transparent p-0 shadow-none focus-visible:ring-0"
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="mt-5">
                <FormField
                  control={form.control}
                  name="service"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormControl>
                        <select
                          onChange={field.onChange}
                          value={field.value}
                          disabled={isPending}
                          className="w-full cursor-pointer rounded-2xl border border-gray-200 bg-gray-50 px-5 py-4 text-base text-gray-700 transition-all duration-300 hover:border-black focus:border-red-300 focus:bg-white focus:outline-none"
                        >
                          <option value="">Select a service *</option>
                          {services.map((item) => (
                            <option key={item.id} value={item.name}>
                              {item.name}
                            </option>
                          ))}
                        </select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="mt-5">
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormControl>
                        <Textarea
                          placeholder="Describe your project..."
                          {...field}
                          disabled={isPending}
                          className="min-h-42.5 rounded-3xl border-gray-200 bg-gray-50 px-5 py-4 text-base placeholder:text-gray-400 transition-all duration-300 hover:border-black focus:border-red-300 focus:bg-white"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="mt-5">
                <FormError message={error} />
              </div>

              <div className="mt-8 flex flex-col gap-4">
                <motion.button
                  whileHover={{ y: -6 }}
                  whileTap={{ scale: 0.98 }}
                  disabled={isPending}
                  className="flex w-full items-center justify-center gap-2 rounded-full bg-red-500 px-8 py-4 text-white shadow-[0_12px_30px_rgba(239,68,68,0.25)] transition-all duration-300 hover:bg-red-600 cursor-pointer disabled:cursor-not-allowed disabled:opacity-70"
                  type="submit"
                >
                  <span className="text-base font-semibold sm:text-lg">
                    {isPending ? "Sending..." : "Submit"}
                  </span>
                  <ArrowRight className="h-5 w-5 text-white" />
                </motion.button>

                <div className="text-center text-sm text-gray-400">or</div>

                <Link href="/appointment" className="w-full">
                  <motion.div
                    whileHover={{ y: -6 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex w-full items-center justify-center gap-2 rounded-full bg-gray-900 px-8 py-4 text-white shadow-lg transition-all duration-300 hover:bg-black"
                  >
                    <span className="text-center text-base font-semibold sm:text-lg">
                      Schedule an appointment
                    </span>
                  </motion.div>
                </Link>
              </div>
            </form>
          </Forms>
        </div>
      </div>
    </motion.section>
  );
};

export default Form;