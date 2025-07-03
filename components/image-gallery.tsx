"use client"
import { motion } from "framer-motion"
import { Check } from "lucide-react"

const sampleImages = [
  {
    url: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop",
    title: "Mountain Landscape",
  },
  {
    url: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=400&h=300&fit=crop",
    title: "Forest Path",
  },
  {
    url: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&h=300&fit=crop",
    title: "Ocean Waves",
  },
  {
    url: "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=400&h=300&fit=crop",
    title: "Desert Dunes",
  },
  {
    url: "https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=400&h=300&fit=crop",
    title: "City Skyline",
  },
  {
    url: "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=400&h=300&fit=crop",
    title: "Tropical Beach",
  },
  {
    url: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop",
    title: "Autumn Forest",
  },
  {
    url: "https://images.unsplash.com/photo-1464822759844-d150baec3e5d?w=400&h=300&fit=crop",
    title: "Snow Mountains",
  },
  {
    url: "https://images.unsplash.com/photo-1493246507139-91e8fad9978e?w=400&h=300&fit=crop",
    title: "Flower Field",
  },
]

interface ImageGalleryProps {
  selectedImages: string[]
  onSelectionChange: (images: string[]) => void
}

export function ImageGallery({ selectedImages, onSelectionChange }: ImageGalleryProps) {
  const toggleImage = (imageUrl: string) => {
    if (selectedImages.includes(imageUrl)) {
      onSelectionChange(selectedImages.filter((img) => img !== imageUrl))
    } else {
      onSelectionChange([...selectedImages, imageUrl])
    }
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-2xl font-bold text-gray-800 mb-2">Choose Your Favorite Images</h3>
        <p className="text-gray-600">Select the images that inspire you the most</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {sampleImages.map((image, index) => {
          const isSelected = selectedImages.includes(image.url)

          return (
            <motion.div
              key={index}
              className="relative cursor-pointer group"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => toggleImage(image.url)}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <div
                className={`
                relative overflow-hidden rounded-xl border-2 transition-all duration-200 shadow-md hover:shadow-lg
                ${
                  isSelected
                    ? "border-teal-500 ring-2 ring-teal-200 shadow-lg transform scale-105"
                    : "border-gray-200 group-hover:border-gray-300"
                }
              `}
              >
                <img
                  src={image.url || "/placeholder.svg"}
                  alt={image.title}
                  className="w-full h-32 md:h-40 object-cover transition-transform duration-300 group-hover:scale-110"
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-200" />

                {/* Title overlay */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-3">
                  <p className="text-white text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    {image.title}
                  </p>
                </div>

                {/* Selection indicator */}
                {isSelected && (
                  <motion.div
                    className="absolute inset-0 bg-teal-500 bg-opacity-20 flex items-center justify-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="bg-teal-500 rounded-full p-2 shadow-lg">
                      <Check className="w-5 h-5 text-white" />
                    </div>
                  </motion.div>
                )}

                {/* Hover effect */}
                <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <div
                    className={`w-6 h-6 rounded-full border-2 ${isSelected ? "bg-teal-500 border-teal-500" : "border-white bg-white/20"} backdrop-blur-sm`}
                  >
                    {isSelected && <Check className="w-4 h-4 text-white m-0.5" />}
                  </div>
                </div>
              </div>
            </motion.div>
          )
        })}
      </div>

      {selectedImages.length > 0 && (
        <motion.div
          className="text-center p-4 bg-teal-50 rounded-lg border border-teal-200"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <p className="text-teal-700 font-medium">
            ✨ {selectedImages.length} image{selectedImages.length !== 1 ? "s" : ""} selected
          </p>
          <p className="text-teal-600 text-sm mt-1">Great choice! These images will be saved to your preferences.</p>
        </motion.div>
      )}
    </div>
  )
}
