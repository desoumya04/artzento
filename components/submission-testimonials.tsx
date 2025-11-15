"use client"

export function SubmissionTestimonials() {
  const testimonials = [
    {
      name: "Sarah Chen",
      role: "Digital Artist",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop",
      quote: "Artzento gave my art the exposure it deserved. Within a month of listing, I sold three pieces and gained hundreds of followers. The curation process was professional and the feedback invaluable.",
      rating: 5
    },
    {
      name: "Marcus Williams",
      role: "Abstract Painter",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop",
      quote: "The platform's support team is incredible. They helped me price my work appropriately and provided marketing tips that really worked. Best decision I made for my art career.",
      rating: 5
    },
    {
      name: "Emma Rodriguez",
      role: "Sculptor",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop",
      quote: "I've tried other platforms, but Artzento stands out. The community is supportive, the collectors are serious, and the submission process is straightforward. Highly recommended!",
      rating: 5
    }
  ]

  return (
    <section className="py-16 md:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            What Artists Say
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Hear from creators who have found success on our platform
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="group p-6 rounded-xl border border-border bg-linear-to-br from-white to-secondary/10 hover:shadow-xl hover:border-primary/50 transition-all duration-300"
            >
              {/* Rating Stars */}
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                ))}
              </div>

              {/* Quote */}
              <blockquote className="text-muted-foreground mb-6 italic">
                "{testimonial.quote}"
              </blockquote>

              {/* Author */}
              <div className="flex items-center gap-4">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover border-2 border-primary/20"
                />
                <div>
                  <div className="font-bold text-foreground">{testimonial.name}</div>
                  <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Additional Stats */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="text-center p-6 rounded-lg bg-secondary/20">
            <div className="text-4xl font-bold text-primary mb-2">98%</div>
            <div className="text-sm text-muted-foreground">Artist Satisfaction</div>
          </div>
          <div className="text-center p-6 rounded-lg bg-secondary/20">
            <div className="text-4xl font-bold text-primary mb-2">10K+</div>
            <div className="text-sm text-muted-foreground">Active Collectors</div>
          </div>
          <div className="text-center p-6 rounded-lg bg-secondary/20">
            <div className="text-4xl font-bold text-primary mb-2">$2M+</div>
            <div className="text-sm text-muted-foreground">Artwork Sold</div>
          </div>
          <div className="text-center p-6 rounded-lg bg-secondary/20">
            <div className="text-4xl font-bold text-primary mb-2">24/7</div>
            <div className="text-sm text-muted-foreground">Support Available</div>
          </div>
        </div>
      </div>
    </section>
  )
}
