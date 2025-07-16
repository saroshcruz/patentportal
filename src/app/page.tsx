import Header from "@/components/header"
import HeroBanner from "@/components/hero-banner"
import ServiceCard from "@/components/service-card"
import AboutUs from "@/components/about-us"
import MilestoneCounter from "@/components/milestone-counter"

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <HeroBanner />

      {/* Services Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Our Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <ServiceCard
              title="Patentability Search"
              description="Comprehensive prior art search to determine the patentability of your invention before filing."
              href="/services/patentability-search"
            />
            <ServiceCard
              title="Patent Filing"
              description="Expert assistance in preparing and filing patent applications with maximum protection scope."
              href="/services/patent-filing"
            />
            <ServiceCard
              title="IP Consulting"
              description="Strategic intellectual property consulting to protect and monetize your innovations."
              href="/services/ip-consulting"
            />
          </div>
        </div>
      </section>

      <AboutUs />
      <MilestoneCounter />
    </div>
  )
}
