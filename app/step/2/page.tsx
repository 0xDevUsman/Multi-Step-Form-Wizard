"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import { ArrowRight, ArrowLeft, MapPin } from "lucide-react"
import { useFormContext, addressInfoSchema, type AddressInfo } from "@/lib/form-context"
import { ProgressStepper } from "@/components/progress-stepper"
import { FormInput } from "@/components/form-input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { PageHeader } from "@/components/page-header"

export default function Step2() {
  const router = useRouter()
  const { formData, dispatch } = useFormContext()

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<AddressInfo>({
    resolver: zodResolver(addressInfoSchema),
    defaultValues: formData.addressInfo,
    mode: "onChange",
  })

  const onSubmit = (data: AddressInfo) => {
    dispatch({ type: "UPDATE_ADDRESS_INFO", payload: data })
    dispatch({ type: "COMPLETE_STEP", payload: 2 })
    dispatch({ type: "SET_CURRENT_STEP", payload: 3 })
    router.push("/step/3")
  }

  const goBack = () => {
    dispatch({ type: "SET_CURRENT_STEP", payload: 1 })
    router.push("/step/1")
  }

  return (
    <div>
      <PageHeader />
      <div className="container mx-auto px-4 py-8">
        <ProgressStepper />

        <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Form Section */}
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
            <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader className="text-center pb-8">
                <div className="mx-auto w-16 h-16 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-full flex items-center justify-center mb-4">
                  <MapPin className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-3xl font-bold bg-gradient-to-r from-teal-500 to-cyan-500 bg-clip-text text-transparent">
                  Address Information
                </CardTitle>
                <p className="text-gray-600 mt-2">Where can we reach you?</p>
              </CardHeader>

              <CardContent className="space-y-6">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  <FormInput
                    label="Street Address"
                    {...register("street")}
                    error={errors.street?.message}
                    placeholder="Enter your street address"
                  />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormInput
                      label="City"
                      {...register("city")}
                      error={errors.city?.message}
                      placeholder="Enter your city"
                    />

                    <FormInput
                      label="State/Province"
                      {...register("state")}
                      error={errors.state?.message}
                      placeholder="Enter your state"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormInput
                      label="ZIP/Postal Code"
                      {...register("zipCode")}
                      error={errors.zipCode?.message}
                      placeholder="Enter your ZIP code"
                    />

                    <FormInput
                      label="Country"
                      {...register("country")}
                      error={errors.country?.message}
                      placeholder="Enter your country"
                    />
                  </div>

                  <motion.div
                    className="flex gap-4 pt-6"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                  >
                    <Button
                      type="button"
                      onClick={goBack}
                      variant="outline"
                      className="flex-1 border-gray-300 hover:bg-gray-50 bg-transparent"
                    >
                      <ArrowLeft className="mr-2 w-5 h-5" />
                      Back
                    </Button>

                    <Button
                      type="submit"
                      className="flex-1 bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 text-white font-semibold py-3 px-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200"
                      disabled={!isValid}
                    >
                      Continue to Preferences
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
                  src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=500&h=600&fit=crop"
                  alt="Modern city buildings and architecture"
                  className="w-full h-96 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-teal-900/30 to-transparent" />
              </div>

              {/* Floating decorative elements */}
              <motion.div
                className="absolute -top-4 -right-4 w-20 h-20 bg-gradient-to-r from-teal-400 to-cyan-400 rounded-full opacity-80"
                animate={{ y: [0, -15, 0] }}
                transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
              />

              <motion.div
                className="absolute -bottom-4 -left-4 w-16 h-16 bg-gradient-to-r from-cyan-400 to-blue-400 rounded-full opacity-80"
                animate={{ y: [0, 15, 0] }}
                transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
              />

              {/* Info card overlay */}
              <motion.div
                className="absolute bottom-6 left-6 right-6 bg-white/90 backdrop-blur-sm rounded-lg p-4 shadow-lg"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
              >
                <h4 className="font-semibold text-gray-800 mb-2">Secure & Private</h4>
                <p className="text-sm text-gray-600">
                  Your address information is encrypted and stored securely. We never share your data.
                </p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
