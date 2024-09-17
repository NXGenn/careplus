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
import { FormFieldtype } from "./PatientForm"
 
 
const RegisterForm = ({user}: {user: User}) => {
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
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-12  flex-1">
        <section className="space-y-4">
          <h1 className="header">Welcome  👋</h1>
          <p className="text-dark-700">Let us know more about you</p>
        </section>
        <section className="space-y-6">
          <div className="mb-9 space-y-1">


          </div>
          <h2 className="sub-header">Personal Information</h2>
        </section>
        <CustomFormField
        fieldType={FormFieldtype.INPUT}
        control={form.control}
        name="name"
        placeholder="Jhon Doe"
        label="Full Name"
        iconSrc="/assets/icons/user.svg"
        iconAlt="user"
        />
        <div className="flex flex-col gap-6 xl:flex-row">
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
        </div>
        <div className="flex flex-col xl:flex-row">

        </div>
        <SubmitButton isLoading={isLoading} >
          Get Started
        </SubmitButton>
      </form>
    </Form>
  )
}

export default RegisterForm