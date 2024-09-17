"use client"
 
import { Button } from "@/components/ui/button"
import {Form} from "@/components/ui/form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import CustomFormField from "../CustomFormField"
import SubmitButton from "../SubmitButton"
import { useState } from "react"
import { UserFormValidation } from "@/lib/validation"
import { useRouter } from "next/navigation"
import { createUser } from "@/lib/actions/patient.actions"
 
// Enum for different types of form fields  - can be extended as per the requirements TO be frank I don't
// understand why this is necessary here but Every one on stack overflow said it would be betterthis way
export enum FormFieldtype{
  INPUT = 'input',
  TEXTAREA = 'textarea',
  PHONE_INPUT = 'phone-input',
  CHECKBOX = 'checkbox',
  DATE_PICKER = 'date-picker',
  SELECT = 'select',
  SKELETON = 'skeleton',
}




 
const PatientForm = () => {
  const router = useRouter();
  const [isLoading, setisLoading] = useState(false);
  const form = useForm<z.infer<typeof UserFormValidation>>({
    resolver: zodResolver(UserFormValidation),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
    },
  })
 
 async function onSubmit({name, email, phone}: z.infer<typeof UserFormValidation>) {
    setisLoading(true);

    try {
     const userData = {name,email,phone, }

     const user = await createUser(userData);

     if(user) router.push(`/patients/${user.$id}/register`)

    } catch (error) {
      console.log(error);
    }
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 flex-1">
        <section className="mb-10 space-y-4">
          <h1 className="header">Hi there👋</h1>
          <p className="text-dark-700">Schedule your appointment</p>
        </section>
        <CustomFormField
        fieldType={FormFieldtype.INPUT}
        control={form.control}
        name="name"
        label="Full Name"
        placeholder="Jhon Doe"
        iconSrc="/assets/icons/user.svg"
        iconAlt="user"
        />

        <CustomFormField
        fieldType={FormFieldtype.INPUT}
        control={form.control}
        name="email"
        label="Email"
        placeholder="example@example.com"
        iconSrc="/assets/icons/email.svg"
        iconAlt="email"
        />
        
        <CustomFormField
        fieldType={FormFieldtype.PHONE_INPUT}
        control={form.control}
        name="phone"
        label="Phone number"
        placeholder="1234567890"
        />
        <SubmitButton isLoading={isLoading} >
          Get Started
        </SubmitButton>
      </form>
    </Form>
  )
}

export default PatientForm