import Header from "@/components/header"

export default function IPConsultingPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-900 to-blue-800 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center text-white">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">IP Consulting Service</h1>
            <p className="text-xl text-blue-100 leading-relaxed">
              Strategic intellectual property consulting to protect and monetize your innovations
            </p>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Coming Soon</h2>
            <p className="text-xl text-gray-600 mb-8">
              Our comprehensive IP consulting service page is currently under development.
            </p>
            <p className="text-gray-600">For immediate assistance with IP consulting, please contact us directly.</p>
          </div>
        </div>
      </section>
    </div>
  )
}
