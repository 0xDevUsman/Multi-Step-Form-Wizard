"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import { ArrowRight, User } from "lucide-react"
import { useFormContext, personalInfoSchema, type PersonalInfo } from "@/lib/form-context"
import { ProgressStepper } from "@/components/progress-stepper"
import { FormInput } from "@/components/form-input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { PageHeader } from "@/components/page-header"

export default function Step1() {
  const router = useRouter()
  const { formData, dispatch } = useFormContext()

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<PersonalInfo>({
    resolver: zodResolver(personalInfoSchema),
    defaultValues: formData.personalInfo,
    mode: "onChange",
  })

  const onSubmit = (data: PersonalInfo) => {
    dispatch({ type: "UPDATE_PERSONAL_INFO", payload: data })
    dispatch({ type: "COMPLETE_STEP", payload: 1 })
    dispatch({ type: "SET_CURRENT_STEP", payload: 2 })
    router.push("/step/2")
  }

  return (
    <div>
      <PageHeader />
      <div className="container mx-auto px-4 py-8">
        <ProgressStepper />

        <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Form Section */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader className="text-center pb-8">
                <div className="mx-auto w-16 h-16 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center mb-4">
                  <User className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                  Personal Information
                </CardTitle>
                <p className="text-gray-600 mt-2">Let's start with your basic information</p>
              </CardHeader>

              <CardContent className="space-y-6">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormInput
                      label="First Name"
                      {...register("firstName")}
                      error={errors.firstName?.message}
                      placeholder="Enter your first name"
                    />

                    <FormInput
                      label="Last Name"
                      {...register("lastName")}
                      error={errors.lastName?.message}
                      placeholder="Enter your last name"
                    />
                  </div>

                  <FormInput
                    label="Email Address"
                    type="email"
                    {...register("email")}
                    error={errors.email?.message}
                    placeholder="Enter your email address"
                  />

                  <FormInput
                    label="Phone Number"
                    type="tel"
                    {...register("phone")}
                    error={errors.phone?.message}
                    placeholder="Enter your phone number"
                  />

                  <motion.div
                    className="pt-6"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                  >
                    <Button
                      type="submit"
                      className="w-full bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 text-white font-semibold py-3 px-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200"
                      disabled={!isValid}
                    >
                      Continue to Address
                      <ArrowRight className="ml-2 w-5 h-5" />
                    </Button>
                  </motion.div>
                </form>
              </CardContent>
            </Card>
          </motion.div>

          {/* Image Section */}
          <motion.div
            className="hidden lg:flex items-center justify-center"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="relative">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=500&h=600&fit=crop"
                  alt="Professional woman working on laptop"
                  className="w-full h-96 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-purple-900/30 to-transparent" />
              </div>

              {/* Floating decorative elements */}
              <motion.div
                className="absolute -top-6 -right-6 w-24 h-24 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full opacity-80"
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
              />

              <motion.div
                className="absolute -bottom-6 -left-6 w-20 h-20 bg-gradient-to-r from-teal-400 to-cyan-400 rounded-full opacity-80"
                animate={{ rotate: -360 }}
                transition={{ duration: 15, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
              />

              {/* Info card overlay */}
              <motion.div
                className="absolute bottom-6 left-6 right-6 bg-white/90 backdrop-blur-sm rounded-lg p-4 shadow-lg"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
              >
                <h4 className="font-semibold text-gray-800 mb-2">Quick & Easy</h4>
                <p className="text-sm text-gray-600">
                  Our form takes less than 3 minutes to complete and guides you every step of the way.
                </p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
