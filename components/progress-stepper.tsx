"use client"

import { motion } from "framer-motion"
import { Check } from "lucide-react"
import { useFormContext } from "@/lib/form-context"

const steps = [
  { id: 1, title: "Personal Info", description: "Basic information" },
  { id: 2, title: "Address", description: "Location details" },
  { id: 3, title: "Preferences", description: "Your choices" },
  { id: 4, title: "Review", description: "Confirm details" },
]

export function ProgressStepper() {
  const { formData } = useFormContext()
  const { currentStep, completedSteps } = formData

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between">
        {steps.map((step, index) => {
          const isCompleted = completedSteps.includes(step.id)
          const isCurrent = currentStep === step.id
          const isUpcoming = step.id > currentStep

          return (
            <div key={step.id} className="flex items-center flex-1">
              <div className="flex flex-col items-center">
                <motion.div
                  className={`
                    relative w-12 h-12 rounded-full flex items-center justify-center font-semibold text-sm
                    ${
                      isCompleted
                        ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg"
                        : isCurrent
                          ? "bg-gradient-to-r from-teal-500 to-cyan-500 text-white shadow-lg ring-4 ring-teal-200"
                          : "bg-gray-200 text-gray-500"
                    }
                  `}
                  initial={{ scale: 0.8 }}
                  animate={{ scale: isCurrent ? 1.1 : 1 }}
                  transition={{ duration: 0.3 }}
                >
                  {isCompleted ? (
                    <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.2 }}>
                      <Check className="w-6 h-6" />
                    </motion.div>
                  ) : (
                    step.id
                  )}

                  {isCurrent && (
                    <motion.div
                      className="absolute inset-0 rounded-full bg-gradient-to-r from-teal-500 to-cyan-500"
                      initial={{ scale: 1, opacity: 0.5 }}
                      animate={{ scale: 1.3, opacity: 0 }}
                      transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                    />
                  )}
                </motion.div>

                <div className="mt-3 text-center">
                  <p
                    className={`text-sm font-medium ${isCurrent ? "text-teal-600" : isCompleted ? "text-purple-600" : "text-gray-500"}`}
                  >
                    {step.title}
                  </p>
                  <p className="text-xs text-gray-400 mt-1">{step.description}</p>
                </div>
              </div>

              {index < steps.length - 1 && (
                <div className="flex-1 h-px mx-4 mt-[-20px]">
                  <motion.div
                    className={`h-full ${isCompleted ? "bg-gradient-to-r from-purple-600 to-blue-600" : "bg-gray-200"}`}
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: isCompleted ? 1 : 0 }}
                    transition={{ duration: 0.5 }}
                    style={{ transformOrigin: "left" }}
                  />
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
