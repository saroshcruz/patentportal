import Link from "next/link"

interface ServiceCardProps {
  title: string
  description: string
  href: string
}

export default function ServiceCard({ title, description, href }: ServiceCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6 hover:shadow-lg hover:border-blue-300 transition-all duration-300 group">
      <div className="h-full flex flex-col">
        <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-blue-900 transition-colors duration-300">
          {title}
        </h3>
        <p className="text-gray-600 mb-6 flex-grow leading-relaxed">{description}</p>
        <Link href={href}>
          <button className="w-full bg-blue-900 text-white py-3 px-4 rounded-lg font-semibold hover:bg-blue-800 transition-colors duration-300 shadow-sm">
            Request Quotation
          </button>
        </Link>
      </div>
    </div>
  )
}
