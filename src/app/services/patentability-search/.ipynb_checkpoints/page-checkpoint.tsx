import Header from "@/components/header"
import QuotationForm from "@/components/quotation-form"
import EstimateCalculator from "@/components/estimate-calculator"

export default function PatentabilitySearchPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-900 to-blue-800 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center text-white">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Patentability Search Service</h1>
            <p className="text-xl text-blue-100 leading-relaxed">
              Comprehensive prior art analysis to determine your invention's patent potential
            </p>
          </div>
        </div>
      </section>

      {/* Main Content Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
              {/* Detailed Service Explanation */}
              <div className="space-y-6">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Understanding Patentability Search</h2>

                <div className="space-y-6 text-gray-600 leading-relaxed">
                  <p className="text-lg">
                    A patentability search is a comprehensive investigation into existing patents, published
                    applications, and prior art to determine whether your invention is novel and non-obvious enough to
                    qualify for patent protection. This critical first step in the patent process can save you
                    significant time, money, and resources by identifying potential obstacles before you invest in a
                    full patent application.
                  </p>

                  <p className="text-lg">
                    Our patentability search service is essential for inventors, entrepreneurs, and businesses looking
                    to protect their innovations. We conduct thorough searches across multiple patent databases,
                    technical literature, and commercial products to provide you with a clear picture of your
                    invention's patentability prospects. This process helps you make informed decisions about your
                    intellectual property strategy and increases your chances of successful patent prosecution.
                  </p>

                  <p className="text-lg">
                    At LegalCo, we provide a <strong className="text-blue-900">secure, simple, and efficient</strong>{" "}
                    patentability search process. Our experienced patent professionals use advanced search tools and
                    methodologies to deliver comprehensive reports within tight deadlines. We prioritize data security
                    throughout the process, ensuring your confidential information remains protected while providing
                    clear, actionable insights that help you navigate the complex patent landscape with confidence.
                  </p>
                </div>

                {/* Key Benefits */}
                <div className="bg-blue-50 rounded-lg p-6 mt-8">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Key Benefits</h3>
                  <ul className="space-y-3 text-gray-700">
                    <li className="flex items-start">
                      <span className="text-blue-900 mr-2">•</span>
                      <span>Avoid costly patent application rejections</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-900 mr-2">•</span>
                      <span>Identify potential design-around opportunities</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-900 mr-2">•</span>
                      <span>Make informed IP strategy decisions</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-900 mr-2">•</span>
                      <span>Strengthen your patent application</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Request Quotation Form */}
              <div>
                <QuotationForm />
              </div>
            </div>

            {/* Estimate Calculator Section */}
            <div className="border-t border-gray-200 pt-16">
              <div className="max-w-2xl mx-auto">
                <div className="text-center mb-8">
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">Estimate Your Cost</h2>
                  <p className="text-gray-600 text-lg">
                    Get an instant estimate for your patentability search based on your specific requirements.
                  </p>
                </div>
                <EstimateCalculator />
              </div>
            </div>

            {/* Process Section */}
            <div className="mt-16 bg-gray-50 rounded-lg p-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Our Search Process</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="bg-blue-900 text-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                    1
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Initial Consultation</h3>
                  <p className="text-gray-600">
                    We discuss your invention details and search requirements to develop a targeted strategy.
                  </p>
                </div>
                <div className="text-center">
                  <div className="bg-blue-900 text-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                    2
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Comprehensive Search</h3>
                  <p className="text-gray-600">
                    Our experts conduct thorough searches across global patent databases and technical literature.
                  </p>
                </div>
                <div className="text-center">
                  <div className="bg-blue-900 text-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                    3
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Detailed Report</h3>
                  <p className="text-gray-600">
                    Receive a comprehensive report with analysis, recommendations, and strategic insights.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
