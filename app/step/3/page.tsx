"use client"

import { useForm, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import { ArrowRight, ArrowLeft, Settings } from "lucide-react"
import { useFormContext, preferencesSchema, type Preferences } from "@/lib/form-context"
import { ProgressStepper } from "@/components/progress-stepper"
import { ImageGallery } from "@/components/image-gallery"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { PageHeader } from "@/components/page-header"

export default function Step3() {
  const router = useRouter()
  const { formData, dispatch } = useFormContext()

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
    watch,
  } = useForm<Preferences>({
    resolver: zodResolver(preferencesSchema),
    defaultValues: formData.preferences,
    mode: "onChange",
  })

  const onSubmit = (data: Preferences) => {
    dispatch({ type: "UPDATE_PREFERENCES", payload: data })
    dispatch({ type: "COMPLETE_STEP", payload: 3 })
    dispatch({ type: "SET_CURRENT_STEP", payload: 4 })
    router.push("/step/4")
  }

  const goBack = () => {
    dispatch({ type: "SET_CURRENT_STEP", payload: 2 })
    router.push("/step/2")
  }

  return (
    <div>
      <PageHeader />
      <div className="container mx-auto px-4 py-8">
        <ProgressStepper />

        <motion.div
          className="max-w-4xl mx-auto"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader className="text-center pb-8">
              <div className="mx-auto w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mb-4">
                <Settings className="w-8 h-8 text-white" />
              </div>
              <CardTitle className="text-3xl font-bold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
                Preferences & Images
              </CardTitle>
              <p className="text-gray-600 mt-2">Customize your experience</p>
            </CardHeader>

            <CardContent className="space-y-8">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                <div className="space-y-6">
                  <h3 className="text-lg font-semibold text-gray-800">Notification Settings</h3>

                  <div className="space-y-4">
                    <Controller
                      name="newsletter"
                      control={control}
                      render={({ field }) => (
                        <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                          <div>
                            <Label htmlFor="newsletter" className="text-sm font-medium">
                              Newsletter Subscription
                            </Label>
                            <p className="text-sm text-gray-500">Receive our weekly newsletter with updates</p>
                          </div>
                          <Switch id="newsletter" checked={field.value} onCheckedChange={field.onChange} />
                        </div>
                      )}
                    />

                    <Controller
                      name="notifications"
                      control={control}
                      render={({ field }) => (
                        <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                          <div>
                            <Label htmlFor="notifications" className="text-sm font-medium">
                              Push Notifications
                            </Label>
                            <p className="text-sm text-gray-500">Get notified about important updates</p>
                          </div>
                          <Switch id="notifications" checked={field.value} onCheckedChange={field.onChange} />
                        </div>
                      )}
                    />
                  </div>

                  <div className="space-y-4">
                    <Label className="text-sm font-medium">Theme Preference</Label>
                    <Controller
                      name="theme"
                      control={control}
                      render={({ field }) => (
                        <div className="grid grid-cols-3 gap-4">
                          {["light", "dark", "auto"].map((theme) => (
                            <button
                              key={theme}
                              type="button"
                              onClick={() => field.onChange(theme)}
                              className={`
                              p-4 border-2 rounded-lg text-center capitalize transition-all duration-200
                              ${
                                field.value === theme
                                  ? "border-teal-500 bg-teal-50 text-teal-700"
                                  : "border-gray-200 hover:border-gray-300"
                              }
                            `}
                            >
                              {theme}
                            </button>
                          ))}
                        </div>
                      )}
                    />
                  </div>
                </div>

                <Controller
                  name="selectedImages"
                  control={control}
                  render={({ field }) => (
                    <ImageGallery selectedImages={field.value} onSelectionChange={field.onChange} />
                  )}
                />

                {errors.selectedImages && <p className="text-sm text-red-600">{errors.selectedImages.message}</p>}

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
                    className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold py-3 px-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200"
                    disabled={!isValid}
                  >
                    Review & Submit
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </motion.div>
              </form>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
