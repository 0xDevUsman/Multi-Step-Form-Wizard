"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  CheckCircle,
  User,
  MapPin,
  Settings,
  Send,
} from "lucide-react";
import { useFormContext } from "@/lib/form-context";
import { ProgressStepper } from "@/components/progress-stepper";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { PageHeader } from "@/components/page-header";

export default function Step4() {
  const router = useRouter();
  const { formData, dispatch } = useFormContext();

  const goBack = () => {
    dispatch({ type: "SET_CURRENT_STEP", payload: 3 });
    router.push("/step/3");
  };

  const handleSubmit = async () => {
    // Simulate API call
    const toastId = toast.loading("Submitting your information...");
    
    setTimeout(() => {
      toast.dismiss(toastId);
    }, 3000);

    await new Promise((resolve) => setTimeout(resolve, 2000));

    toast.success("Form submitted successfully!", {
      description: "Thank you for completing the form. We'll be in touch soon.",
      duration: 5000,
    });

    // Reset form and redirect
    setTimeout(() => {
      dispatch({ type: "RESET_FORM" });
      router.push("/step/1");
    }, 2000);
  };

  return (
    <div>
      <PageHeader />
      <div className="container mx-auto px-4 py-8">
        <ProgressStepper />

        <motion.div
          className="max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader className="text-center pb-8">
              <div className="mx-auto w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mb-4">
                <CheckCircle className="w-8 h-8 text-white" />
              </div>
              <CardTitle className="text-3xl font-bold bg-gradient-to-r from-green-500 to-emerald-500 bg-clip-text text-transparent">
                Review & Confirm
              </CardTitle>
              <p className="text-gray-600 mt-2">
                Please review your information before submitting
              </p>
            </CardHeader>

            <CardContent className="space-y-8">
              <div className="grid gap-6">
                {/* Personal Information */}
                <motion.div
                  className="border border-gray-200 rounded-lg p-6"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <User className="w-5 h-5 text-purple-600" />
                    <h3 className="text-lg font-semibold text-gray-800">
                      Personal Information
                    </h3>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-500">Name:</span>
                      <p className="font-medium">
                        {formData.personalInfo.firstName}{" "}
                        {formData.personalInfo.lastName}
                      </p>
                    </div>
                    <div>
                      <span className="text-gray-500">Email:</span>
                      <p className="font-medium">
                        {formData.personalInfo.email}
                      </p>
                    </div>
                    <div>
                      <span className="text-gray-500">Phone:</span>
                      <p className="font-medium">
                        {formData.personalInfo.phone}
                      </p>
                    </div>
                  </div>
                </motion.div>

                {/* Address Information */}
                <motion.div
                  className="border border-gray-200 rounded-lg p-6"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <MapPin className="w-5 h-5 text-teal-600" />
                    <h3 className="text-lg font-semibold text-gray-800">
                      Address Information
                    </h3>
                  </div>
                  <div className="text-sm">
                    <p className="font-medium">
                      {formData.addressInfo.street}
                      <br />
                      {formData.addressInfo.city}, {formData.addressInfo.state}{" "}
                      {formData.addressInfo.zipCode}
                      <br />
                      {formData.addressInfo.country}
                    </p>
                  </div>
                </motion.div>

                {/* Preferences */}
                <motion.div
                  className="border border-gray-200 rounded-lg p-6"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <Settings className="w-5 h-5 text-purple-600" />
                    <h3 className="text-lg font-semibold text-gray-800">
                      Preferences
                    </h3>
                  </div>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-500">Newsletter:</span>
                      <span
                        className={`font-medium ${
                          formData.preferences.newsletter
                            ? "text-green-600"
                            : "text-gray-600"
                        }`}
                      >
                        {formData.preferences.newsletter
                          ? "Subscribed"
                          : "Not subscribed"}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Notifications:</span>
                      <span
                        className={`font-medium ${
                          formData.preferences.notifications
                            ? "text-green-600"
                            : "text-gray-600"
                        }`}
                      >
                        {formData.preferences.notifications
                          ? "Enabled"
                          : "Disabled"}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Theme:</span>
                      <span className="font-medium capitalize">
                        {formData.preferences.theme}
                      </span>
                    </div>
                    <div>
                      <span className="text-gray-500">Selected Images:</span>
                      <p className="font-medium">
                        {formData.preferences.selectedImages?.length || 0}{" "}
                        images selected
                      </p>
                    </div>
                  </div>
                </motion.div>

                {/* Selected Images Preview */}
                {formData.preferences.selectedImages &&
                  formData.preferences.selectedImages.length > 0 && (
                    <motion.div
                      className="border border-gray-200 rounded-lg p-6"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.4 }}
                    >
                      <h3 className="text-lg font-semibold text-gray-800 mb-4">
                        Selected Images
                      </h3>
                      <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
                        {formData.preferences.selectedImages.map(
                          (imageUrl, index) => (
                            <img
                              key={index}
                              src={imageUrl || "/placeholder.svg"}
                              alt={`Selected image ${index + 1}`}
                              className="w-full h-20 object-cover rounded-lg border border-gray-200"
                            />
                          )
                        )}
                      </div>
                    </motion.div>
                  )}
              </div>

              <motion.div
                className="flex gap-4 pt-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <Button
                  type="button"
                  onClick={goBack}
                  variant="outline"
                  className="flex-1 border-gray-300 hover:bg-gray-50 bg-transparent"
                >
                  <ArrowLeft className="mr-2 w-5 h-5" />
                  Back to Edit
                </Button>

                <Button
                  onClick={handleSubmit}
                  className="flex-1 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-semibold py-3 px-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200"
                >
                  Submit Form
                  <Send className="ml-2 w-5 h-5" />
                </Button>
              </motion.div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
