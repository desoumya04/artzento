"use client"

import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { ArtistSubmissionForm } from "@/components/artist-submission-form"
import { SubmissionBenefits } from "@/components/submission-benefits"
import { SubmissionProcess } from "@/components/submission-process"
import { SubmissionTestimonials } from "@/components/submission-testimonials"

export default function SubmitPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-linear-to-br from-background via-secondary/30 to-background">
        {/* Hero Section */}
        <section className="relative py-20 md:py-28 overflow-hidden">
          <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <span className="inline-flex items-center rounded-full bg-primary/10 px-4 py-2 text-sm font-semibold text-primary mb-6 animate-fade-in">
              For Artists
            </span>
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6 animate-slide-up">
              Share Your Masterpiece with the World
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-8 animate-slide-up-delay">
              Join a vibrant community of creators and collectors on Artzento. Submit your artwork, 
              connect with art enthusiasts, and showcase your talent to a global audience.
            </p>
          </div>
        </section>

        {/* Submission Benefits */}
        <SubmissionBenefits />

        {/* Main Submission Form Section */}
        <section className="py-16 md:py-24">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 items-start">
              <div className="lg:col-span-2 space-y-6">
                <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                  Share your latest masterpiece with the Artzento community
                </h2>
                <p className="text-muted-foreground">
                  Submit new works, connect with collectors, and join a network of creators shaping the future of art.
                  We review every submission with care and respond within two business days.
                </p>
                <ul className="space-y-3 text-sm text-muted-foreground">
                  <li className="flex items-start gap-3 p-3 rounded-lg hover:bg-secondary/50 transition-colors">
                    <div className="shrink-0 w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center">
                      <svg className="h-4 w-4 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span>Feature-ready portfolio support and feedback from our curation team.</span>
                  </li>
                  <li className="flex items-start gap-3 p-3 rounded-lg hover:bg-secondary/50 transition-colors">
                    <div className="shrink-0 w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center">
                      <svg className="h-4 w-4 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span>Listing opportunities across categories including painting, sculpture, and digital art.</span>
                  </li>
                  <li className="flex items-start gap-3 p-3 rounded-lg hover:bg-secondary/50 transition-colors">
                    <div className="shrink-0 w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center">
                      <svg className="h-4 w-4 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span>Personalised promotion through newsletters, spotlights, and social collaborations.</span>
                  </li>
                </ul>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-4 pt-6">
                  <div className="p-4 rounded-lg bg-white border border-border shadow-sm">
                    <div className="text-3xl font-bold text-primary">500+</div>
                    <div className="text-sm text-muted-foreground">Artists Featured</div>
                  </div>
                  <div className="p-4 rounded-lg bg-white border border-border shadow-sm">
                    <div className="text-3xl font-bold text-primary">2 Days</div>
                    <div className="text-sm text-muted-foreground">Review Time</div>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-3 rounded-xl border border-border bg-white shadow-lg p-6 md:p-8 backdrop-blur">
                <ArtistSubmissionForm />
              </div>
            </div>
          </div>
        </section>

        {/* Submission Process */}
        <SubmissionProcess />

        {/* Testimonials */}
        <SubmissionTestimonials />

        {/* CTA Section */}
        <section className="py-16 bg-linear-to-r from-primary/10 via-primary/5 to-primary/10">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Ready to Showcase Your Art?
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Join hundreds of artists who have found their audience on Artzento
            </p>
            <button
              onClick={() => {
                document.querySelector('form')?.scrollIntoView({ behavior: 'smooth', block: 'center' })
              }}
              className="inline-flex items-center justify-center px-8 py-4 rounded-lg bg-primary text-primary-foreground font-bold hover:opacity-90 transition-all duration-300 ease-out shadow-lg hover:shadow-xl"
            >
              Submit Your Artwork Now
            </button>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
