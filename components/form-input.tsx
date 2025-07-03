"use client"

import type React from "react"

import { forwardRef } from "react"
import { motion } from "framer-motion"

interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string
  error?: string
}

export const FormInput = forwardRef<HTMLInputElement, FormInputProps>(
  ({ label, error, className = "", ...props }, ref) => {
    return (
      <motion.div
        className="space-y-2"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <label className="block text-sm font-medium text-gray-700">{label}</label>
        <input
          ref={ref}
          className={`
            w-full px-4 py-3 border border-gray-300 rounded-lg
            focus:ring-2 focus:ring-teal-500 focus:border-teal-500
            transition-all duration-200 ease-in-out
            ${error ? "border-red-500 ring-2 ring-red-200" : ""}
            ${className}
          `}
          {...props}
        />
        {error && (
          <motion.p
            className="text-sm text-red-600"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            transition={{ duration: 0.2 }}
          >
            {error}
          </motion.p>
        )}
      </motion.div>
    )
  },
)

FormInput.displayName = "FormInput"
