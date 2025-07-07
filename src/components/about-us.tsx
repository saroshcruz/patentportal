
import { Shield } from "lucide-react"

export default function AboutUs() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-8">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">About Us</h2>

              <div className="space-y-6 text-gray-600 leading-relaxed">
                <p className="text-lg">
                  At LegalCo, we are committed to providing exceptional legal services that prioritize
                  <strong className="text-blue-900"> security, simplicity, and efficiency</strong>. Our firm has built a
                  reputation for delivering comprehensive intellectual property solutions that protect our clients' most
                  valuable assets while ensuring a seamless experience throughout the legal process.
                </p>

                <p className="text-lg">
                  Our mission is to bridge the gap between complex legal requirements and practical business needs. We
                  believe that legal services should be accessible, transparent, and results-driven. With our team of
                  experienced attorneys and cutting-edge technology, we streamline traditional legal processes to
                  deliver faster, more cost-effective solutions without compromising on quality.
                </p>

                <p className="text-lg">
                  We value integrity, innovation, and client satisfaction above all else. Our professional approach
                  combines deep legal expertise with modern efficiency, ensuring that every client receives personalized
                  attention and strategic guidance tailored to their unique needs. Trust LegalCo to secure your legal
                  future with confidence and peace of mind.
                </p>
              </div>
            </div>

            <div className="lg:col-span-4 flex justify-center">
              <div className="bg-blue-50 rounded-full p-8">
                <Shield className="h-24 w-24 text-blue-900" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
