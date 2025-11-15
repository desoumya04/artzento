"use client"

import { ChangeEvent, FormEvent, useMemo, useState } from "react"

type FormStatus = "idle" | "success" | "error" | "uploading"

interface FormState {
  name: string
  email: string
  website: string
  instagram: string
  artworkTitle: string
  category: string
  medium: string
  price: string
  currency: string
  dimensions: string
  description: string
  imageUrl: string
}

const initialState: FormState = {
  name: "",
  email: "",
  website: "",
  instagram: "",
  artworkTitle: "",
  category: "",
  medium: "",
  price: "",
  currency: "INR",
  dimensions: "",
  description: "",
  imageUrl: "",
}

const requiredFields: Array<keyof FormState> = ["name", "email", "artworkTitle", "category", "description"]

export function ArtistSubmissionForm() {
  const [formData, setFormData] = useState<FormState>(initialState)
  const [status, setStatus] = useState<FormStatus>("idle")
  const [uploadProgress, setUploadProgress] = useState<string>("")
  const [previewImage, setPreviewImage] = useState<string>("")
  const [touched, setTouched] = useState<Record<keyof FormState, boolean>>(() => {
    return Object.keys(initialState).reduce((acc, key) => {
      acc[key as keyof FormState] = false
      return acc
    }, {} as Record<keyof FormState, boolean>)
  })

  const missingFields = useMemo(() => {
    return requiredFields.filter((field) => formData[field].trim().length === 0)
  }, [formData])

  const handleChange = (field: keyof FormState) => (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData((prev) => ({ ...prev, [field]: event.target.value }))
    
    // Update preview if it's the image URL field
    if (field === 'imageUrl' && event.target.value) {
      setPreviewImage(event.target.value)
    }
  }

  const handleBlur = (field: keyof FormState) => () => {
    setTouched((prev) => ({ ...prev, [field]: true }))
  }

  const handleFileUpload = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    // Validate file type
    if (!file.type.startsWith('image/')) {
      alert('Please upload an image file')
      return
    }

    // Validate file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      alert('File size must be less than 10MB')
      return
    }

    try {
      setStatus("uploading")
      setUploadProgress("Uploading image...")

      // Create preview
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreviewImage(reader.result as string)
      }
      reader.readAsDataURL(file)

      // Upload to Cloudinary
      const formData = new FormData()
      formData.append('file', file)

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      })

      if (!response.ok) {
        throw new Error('Failed to upload image')
      }

      const data = await response.json()
      
      setFormData((prev) => ({ ...prev, imageUrl: data.url }))
      setUploadProgress("Image uploaded successfully!")
      setTimeout(() => {
        setStatus("idle")
        setUploadProgress("")
      }, 2000)
    } catch (error) {
      console.error('Error uploading image:', error)
      setStatus("error")
      setUploadProgress("Failed to upload image. Please try again.")
      setTimeout(() => {
        setStatus("idle")
        setUploadProgress("")
      }, 3000)
    }
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (missingFields.length > 0) {
      setStatus("error")
      const updatedTouched = missingFields.reduce((acc, field) => {
        acc[field] = true
        return acc
      }, { ...touched })
      setTouched(updatedTouched)
      return
    }

    try {
      setStatus("idle")
      
      // Submit to API
      const response = await fetch('/api/artworks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: formData.artworkTitle,
          artistName: formData.name,
          artistEmail: formData.email,
          artistWebsite: formData.website,
          artistInstagram: formData.instagram,
          artistBio: `Artist specializing in ${formData.category}`,
          price: formData.price || '0',
          currency: formData.currency,
          image: formData.imageUrl || 'https://images.unsplash.com/photo-1578301978162-7aae4d755744?w=500&h=500&fit=crop',
          description: formData.description,
          dimensions: formData.dimensions || 'Not specified',
          year: new Date().getFullYear(),
          category: formData.category,
          medium: formData.medium || 'Mixed Media',
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to submit artwork')
      }

      setStatus("success")
      setTouched(() => {
        return Object.keys(initialState).reduce((acc, key) => {
          acc[key as keyof FormState] = false
          return acc
        }, {} as Record<keyof FormState, boolean>)
      })
      setFormData(initialState)
      
      // Optionally redirect to gallery after submission
      setTimeout(() => {
        window.location.href = '/gallery'
      }, 2000)
    } catch (error) {
      console.error('Error submitting artwork:', error)
      setStatus("error")
    }
  }

  const hasFieldError = (field: keyof FormState) => {
    return touched[field] && formData[field].trim().length === 0 && requiredFields.includes(field)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold text-foreground mb-1" htmlFor="name">
            Full name*
          </label>
          <input
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange("name")}
            onBlur={handleBlur("name")}
            placeholder="Sophia Turner"
            className={`w-full rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary ${hasFieldError("name") ? "border-red-500" : "border-border"}`}
          />
          {hasFieldError("name") ? <p className="mt-1 text-xs text-red-600">This field is required.</p> : null}
        </div>
        <div>
          <label className="block text-sm font-semibold text-foreground mb-1" htmlFor="email">
            Email*
          </label>
          <input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange("email")}
            onBlur={handleBlur("email")}
            placeholder="artist@email.com"
            className={`w-full rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary ${hasFieldError("email") ? "border-red-500" : "border-border"}`}
          />
          {hasFieldError("email") ? <p className="mt-1 text-xs text-red-600">This field is required.</p> : null}
        </div>
        <div>
          <label className="block text-sm font-semibold text-foreground mb-1" htmlFor="website">
            Portfolio or website
          </label>
          <input
            id="website"
            name="website"
            value={formData.website}
            onChange={handleChange("website")}
            onBlur={handleBlur("website")}
            placeholder="https://yourportfolio.com"
            className="w-full rounded-md border border-border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-foreground mb-1" htmlFor="instagram">
            Instagram handle
          </label>
          <input
            id="instagram"
            name="instagram"
            value={formData.instagram}
            onChange={handleChange("instagram")}
            onBlur={handleBlur("instagram")}
            placeholder="@yourhandle"
            className="w-full rounded-md border border-border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-foreground mb-1" htmlFor="artworkTitle">
            Artwork title*
          </label>
          <input
            id="artworkTitle"
            name="artworkTitle"
            value={formData.artworkTitle}
            onChange={handleChange("artworkTitle")}
            onBlur={handleBlur("artworkTitle")}
            placeholder="Neon City Dreams"
            className={`w-full rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary ${hasFieldError("artworkTitle") ? "border-red-500" : "border-border"}`}
          />
          {hasFieldError("artworkTitle") ? <p className="mt-1 text-xs text-red-600">This field is required.</p> : null}
        </div>
        <div>
          <label className="block text-sm font-semibold text-foreground mb-1" htmlFor="category">
            Category*
          </label>
          <input
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange("category")}
            onBlur={handleBlur("category")}
            placeholder="Painting, Sculpture, Digital Art, etc."
            className={`w-full rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary ${hasFieldError("category") ? "border-red-500" : "border-border"}`}
          />
          {hasFieldError("category") ? <p className="mt-1 text-xs text-red-600">This field is required.</p> : null}
        </div>
        <div>
          <label className="block text-sm font-semibold text-foreground mb-1" htmlFor="medium">
            Medium
          </label>
          <input
            id="medium"
            name="medium"
            value={formData.medium}
            onChange={handleChange("medium")}
            onBlur={handleBlur("medium")}
            placeholder="Acrylic on Canvas"
            className="w-full rounded-md border border-border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm font-semibold text-foreground mb-1">
            Expected price (optional)
          </label>
          <div className="flex gap-2">
            <select
              id="currency"
              name="currency"
              value={formData.currency}
              onChange={handleChange("currency")}
              className="w-32 rounded-md border border-border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary bg-white"
            >
              <option value="INR">₹ INR</option>
              <option value="USD">$ USD</option>
            </select>
            <input
              id="price"
              name="price"
              type="number"
              value={formData.price}
              onChange={handleChange("price")}
              onBlur={handleBlur("price")}
              placeholder="34500"
              className="flex-1 rounded-md border border-border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <p className="mt-1 text-xs text-muted-foreground">
            Enter the amount in numbers only (e.g., 34500 for {formData.currency === 'INR' ? '₹34,500' : '$34,500'})
          </p>
        </div>
        <div>
          <label className="block text-sm font-semibold text-foreground mb-1" htmlFor="dimensions">
            Dimensions
          </label>
          <input
            id="dimensions"
            name="dimensions"
            value={formData.dimensions}
            onChange={handleChange("dimensions")}
            onBlur={handleBlur("dimensions")}
            placeholder="24 x 36 inches"
            className="w-full rounded-md border border-border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm font-semibold text-foreground mb-3">
            Artwork Image*
          </label>
          
          {/* Image Upload Options */}
          <div className="space-y-4">
            {/* File Upload */}
            <div className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-primary transition-colors">
              <input
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                className="hidden"
                id="file-upload"
              />
              <label
                htmlFor="file-upload"
                className="cursor-pointer"
              >
                <div className="flex flex-col items-center">
                  <svg
                    className="w-12 h-12 text-muted-foreground mb-3"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                    />
                  </svg>
                  <p className="text-sm font-semibold text-foreground mb-1">
                    Click to upload or drag and drop
                  </p>
                  <p className="text-xs text-muted-foreground">
                    PNG, JPG, GIF up to 10MB
                  </p>
                </div>
              </label>
            </div>

            {/* OR Divider */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-border"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-background text-muted-foreground">OR</span>
              </div>
            </div>

            {/* URL Input */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-1" htmlFor="imageUrl">
                Paste Image URL
              </label>
              <input
                id="imageUrl"
                name="imageUrl"
                value={formData.imageUrl}
                onChange={handleChange("imageUrl")}
                onBlur={handleBlur("imageUrl")}
                placeholder="https://images.unsplash.com/..."
                className="w-full rounded-md border border-border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            {/* Upload Progress */}
            {uploadProgress && (
              <div className={`text-sm ${status === 'uploading' ? 'text-blue-600' : status === 'error' ? 'text-red-600' : 'text-green-600'}`}>
                {uploadProgress}
              </div>
            )}

            {/* Image Preview */}
            {previewImage && (
              <div className="mt-4">
                <p className="text-sm font-medium text-foreground mb-2">Preview:</p>
                <div className="relative w-full h-64 rounded-lg overflow-hidden border border-border">
                  <img
                    src={previewImage}
                    alt="Preview"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm font-semibold text-foreground mb-1" htmlFor="description">
            Artwork description*
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange("description")}
            onBlur={handleBlur("description")}
            placeholder="Tell us about the story, inspiration, and techniques behind this piece."
            rows={4}
            className={`w-full rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary ${hasFieldError("description") ? "border-red-500" : "border-border"}`}
          />
          {hasFieldError("description") ? <p className="mt-1 text-xs text-red-600">This field is required.</p> : null}
        </div>
      </div>

      {status === "error" && !uploadProgress ? (
        <p className="text-sm text-red-600">Please fill in all required fields to submit your artwork.</p>
      ) : null}
      {status === "success" ? (
        <p className="text-sm text-green-600">Thanks for sharing your work. Our curation team will reach out soon.</p>
      ) : null}

      <button
        type="submit"
        disabled={status === "uploading"}
        className="inline-flex items-center justify-center rounded-md bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {status === "uploading" ? "Uploading..." : "Submit your artwork"}
      </button>
    </form>
  )
}
