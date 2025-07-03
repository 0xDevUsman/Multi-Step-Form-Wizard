"use client"

import type React from "react"
import { createContext, useContext, useReducer, type ReactNode } from "react"
import { z } from "zod"

// Zod schemas for validation
export const personalInfoSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
})

export const addressInfoSchema = z.object({
  street: z.string().min(5, "Street address must be at least 5 characters"),
  city: z.string().min(2, "City must be at least 2 characters"),
  state: z.string().min(2, "State must be at least 2 characters"),
  zipCode: z.string().min(5, "ZIP code must be at least 5 characters"),
  country: z.string().min(2, "Country must be at least 2 characters"),
})

export const preferencesSchema = z.object({
  newsletter: z.boolean(),
  notifications: z.boolean(),
  theme: z.enum(["light", "dark", "auto"]),
  selectedImages: z.array(z.string()).min(1, "Please select at least one image"),
})

export type PersonalInfo = z.infer<typeof personalInfoSchema>
export type AddressInfo = z.infer<typeof addressInfoSchema>
export type Preferences = z.infer<typeof preferencesSchema>

export interface FormData {
  personalInfo: Partial<PersonalInfo>
  addressInfo: Partial<AddressInfo>
  preferences: Partial<Preferences>
  currentStep: number
  completedSteps: number[]
}

type FormAction =
  | { type: "UPDATE_PERSONAL_INFO"; payload: Partial<PersonalInfo> }
  | { type: "UPDATE_ADDRESS_INFO"; payload: Partial<AddressInfo> }
  | { type: "UPDATE_PREFERENCES"; payload: Partial<Preferences> }
  | { type: "SET_CURRENT_STEP"; payload: number }
  | { type: "COMPLETE_STEP"; payload: number }
  | { type: "RESET_FORM" }

const initialState: FormData = {
  personalInfo: {},
  addressInfo: {},
  preferences: {
    newsletter: false,
    notifications: true,
    theme: "light",
    selectedImages: [],
  },
  currentStep: 1,
  completedSteps: [],
}

function formReducer(state: FormData, action: FormAction): FormData {
  switch (action.type) {
    case "UPDATE_PERSONAL_INFO":
      return { ...state, personalInfo: { ...state.personalInfo, ...action.payload } }
    case "UPDATE_ADDRESS_INFO":
      return { ...state, addressInfo: { ...state.addressInfo, ...action.payload } }
    case "UPDATE_PREFERENCES":
      return { ...state, preferences: { ...state.preferences, ...action.payload } }
    case "SET_CURRENT_STEP":
      return { ...state, currentStep: action.payload }
    case "COMPLETE_STEP":
      return {
        ...state,
        completedSteps: [...new Set([...state.completedSteps, action.payload])],
      }
    case "RESET_FORM":
      return initialState
    default:
      return state
  }
}

interface FormContextType {
  formData: FormData
  dispatch: React.Dispatch<FormAction>
}

const FormContext = createContext<FormContextType | undefined>(undefined)

export function FormProvider({ children }: { children: ReactNode }) {
  const [formData, dispatch] = useReducer(formReducer, initialState)

  return <FormContext.Provider value={{ formData, dispatch }}>{children}</FormContext.Provider>
}

export function useFormContext() {
  const context = useContext(FormContext)
  if (context === undefined) {
    throw new Error("useFormContext must be used within a FormProvider")
  }
  return context
}
