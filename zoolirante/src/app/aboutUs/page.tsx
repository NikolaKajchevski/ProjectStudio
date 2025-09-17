import Link from "next/link";

export default function AboutUs() {
  return (
    <div className="min-h-screen bg-gray-200">
      <section
        className="relative h-96 bg-cover bg-center bg-no-repeat flex items-center justify-center text-white"
        style={{ backgroundImage: "url('https://images4.alphacoders.com/783/783592.jpg')" }}
      >
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="relative z-10 text-center px-4">
          <h1 className="text-5xl font-bold mb-4">About Us</h1>
          <p className="text-xl mb-6">Get to know more about Zoolirante!</p>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <section className="p-4 border border-gray-300 bg-white rounded-lg">
            <h2 className="text-xl font-bold mb-2 text-orange-500">Our Story & Mission</h2>
            <p className="text-gray-600 mb-4">
              All the way from Italy, Zoolirante aims to create wildlife discovery fun, ethical, and accessible, right here in South Australia.
              Our mission is to bring people closer to nature and help save species from extinction.
            </p>
            <ul className="list-disc pl-5 text-gray-600 mb-6 space-y-2">
              <li><b>Care & Welfare:</b> Enrichment calendars and habitats that promote natural behaviours.</li>
              <li><b>Conservation:</b> Evidence-based breeding programs and habitat protection initiatives.</li>
              <li><b>Education:</b> Keeper talks and workshops that turn curiosity into action.</li>
              <li><b>Community:</b> Inclusive pricing and memberships for broader access.</li>
            </ul>
          </section>
          <section className="p-4 border border-gray-300 bg-white rounded-lg">
            <h2 className="text-xl font-bold mb-2 text-orange-500">Get Involved</h2>
            <p className="text-gray-600 mb-4">
              Whether you’re a student, a future keeper, or a community hero, there’s a place for you at Zoolirante.
            </p>
            <ul className="list-disc pl-5 text-gray-600 mb-6 space-y-2">
              <li><b>Workshops & Tours:</b> Hands-on learning for schools and curious minds.</li>
              <li><b>Volunteer Pathways:</b> Help with guest guides and exhibits.</li>
              <li><b>Early Careers:</b> Internships and graduate roles in animal care and tech.</li>
              <li><b>Events & Impact:</b> Check seasonal events and conservation projects.</li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
}
