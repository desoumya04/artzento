"use client"

import { ChangeEvent, FormEvent, useMemo, useState } from "react"

type FormStatus = "idle" | "success" | "error"

interface FormState {
  name: string
  email: string
  website: string
  instagram: string
  artworkTitle: string
  category: string
  medium: string
  price: string
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
  dimensions: "",
  description: "",
  imageUrl: "",
}

const requiredFields: Array<keyof FormState> = ["name", "email", "artworkTitle", "category", "description"]

export function ArtistSubmissionForm() {
  const [formData, setFormData] = useState<FormState>(initialState)
  const [status, setStatus] = useState<FormStatus>("idle")
  const [touched, setTouched] = useState<Record<keyof FormState, boolean>>(() => {
    return Object.keys(initialState).reduce((acc, key) => {
      acc[key as keyof FormState] = false
      return acc
    }, {} as Record<keyof FormState, boolean>)
  })

  const missingFields = useMemo(() => {
    return requiredFields.filter((field) => formData[field].trim().length === 0)
  }, [formData])

  const handleChange = (field: keyof FormState) => (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [field]: event.target.value }))
  }

  const handleBlur = (field: keyof FormState) => () => {
    setTouched((prev) => ({ ...prev, [field]: true }))
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
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

    setStatus("success")
    setTouched(() => {
      return Object.keys(initialState).reduce((acc, key) => {
        acc[key as keyof FormState] = false
        return acc
      }, {} as Record<keyof FormState, boolean>)
    })
    console.log("Artist submission received", formData)
    setFormData(initialState)
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
        <div>
          <label className="block text-sm font-semibold text-foreground mb-1" htmlFor="price">
            Expected price (optional)
          </label>
          <input
            id="price"
            name="price"
            value={formData.price}
            onChange={handleChange("price")}
            onBlur={handleBlur("price")}
            placeholder="₹34,500"
            className="w-full rounded-md border border-border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
          />
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
          <label className="block text-sm font-semibold text-foreground mb-1" htmlFor="imageUrl">
            Artwork image URL
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

      {status === "error" ? (
        <p className="text-sm text-red-600">Please fill in all required fields to submit your artwork.</p>
      ) : null}
      {status === "success" ? (
        <p className="text-sm text-green-600">Thanks for sharing your work. Our curation team will reach out soon.</p>
      ) : null}

      <button
        type="submit"
        className="inline-flex items-center justify-center rounded-md bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition hover:opacity-90"
      >
        Submit your artwork
      </button>
    </form>
  )
}
