import Link from 'next/link';
import { siteConfig } from '@/config/site';
import { getMockCourses } from '@/lib/drupal-client';

export default function HomePage() {
  const courses = getMockCourses();
  
  return (
    <>
      {/* Hero */}
      <section className="bg-primary-500 py-20 md:py-32">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white font-heading mb-6">
              {siteConfig.tagline}
            </h1>
            <p className="text-lg md:text-xl text-white/90 mb-8">
              {siteConfig.description}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/cursussen"
                className="inline-flex items-center justify-center px-6 py-3 bg-accent-500 text-primary-900 font-medium rounded-lg hover:bg-accent-400 transition-colors"
              >
                Bekijk alle cursussen
                <ArrowIcon />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center px-6 py-3 border-2 border-white text-white font-medium rounded-lg hover:bg-white/10 transition-colors"
              >
                Neem contact op
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      {/* Features */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center font-heading mb-12">
            Waarom Vijfhart?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Feature
              icon={<LightbulbIcon />}
              title="Ervaren trainers"
              description="Onze trainers zijn experts met jarenlange praktijkervaring in hun vakgebied."
            />
            <Feature
              icon={<BoxIcon />}
              title="Praktijkgericht"
              description="Leer direct toepasbare vaardigheden met hands-on oefeningen en realistische cases."
            />
            <Feature
              icon={<BadgeIcon />}
              title="Gecertificeerd"
              description="Officiële certificeringen van toonaangevende technologieleveranciers."
            />
          </div>
        </div>
      </section>
      
      {/* Popular Courses */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold font-heading">
              Populaire cursussen
            </h2>
            <Link
              href="/cursussen"
              className="text-primary-500 hover:text-primary-600 font-medium hidden md:flex items-center"
            >
              Alle cursussen
              <ArrowIcon />
            </Link>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
          <div className="mt-8 text-center md:hidden">
            <Link
              href="/cursussen"
              className="inline-flex items-center text-primary-500 hover:text-primary-600 font-medium"
            >
              Bekijk alle cursussen
              <ArrowIcon />
            </Link>
          </div>
        </div>
      </section>
      
      {/* CTA */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold font-heading mb-4">
            Klaar om te starten?
          </h2>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Bekijk ons uitgebreide cursusaanbod en vind de training die bij jou past.
          </p>
          <Link
            href="/cursussen"
            className="inline-flex items-center justify-center px-8 py-4 bg-primary-500 text-white font-medium rounded-lg hover:bg-primary-600 transition-colors"
          >
            Ontdek onze cursussen
          </Link>
        </div>
      </section>
      
      {/* Contact */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold font-heading mb-4">
              Vragen?
            </h2>
            <p className="text-gray-600 mb-6">
              Neem gerust contact met ons op voor advies over de beste training voor jou of je team.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <a
                href={`tel:${siteConfig.contact.phone.replace(/\s/g, '')}`}
                className="inline-flex items-center justify-center gap-2 text-lg font-medium text-primary-500 hover:text-primary-600"
              >
                <PhoneIcon />
                {siteConfig.contact.phone}
              </a>
              <a
                href={`mailto:${siteConfig.contact.email}`}
                className="inline-flex items-center justify-center gap-2 text-lg font-medium text-primary-500 hover:text-primary-600"
              >
                <EmailIcon />
                {siteConfig.contact.email}
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

// Components
function Feature({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className="text-center p-6">
      <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary-50 text-primary-500 mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}

function CourseCard({ course }: { course: { id: string; title: string; slug: string; shortDescription: string; duration: number; level: string; priceDisplay: string } }) {
  return (
    <Link
      href={`/cursussen/${course.slug}`}
      className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-lg transition-shadow"
    >
      <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
        <span className="px-2 py-1 bg-gray-100 rounded">{course.duration} dagen</span>
        <span className="px-2 py-1 bg-gray-100 rounded capitalize">{course.level}</span>
      </div>
      <h3 className="text-lg font-semibold mb-2">{course.title}</h3>
      <p className="text-gray-600 text-sm mb-4">{course.shortDescription}</p>
      <p className="text-primary-500 font-semibold">{course.priceDisplay}</p>
    </Link>
  );
}

// Icons
function ArrowIcon() {
  return (
    <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
    </svg>
  );
}

function LightbulbIcon() {
  return (
    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
    </svg>
  );
}

function BoxIcon() {
  return (
    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
    </svg>
  );
}

function BadgeIcon() {
  return (
    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
    </svg>
  );
}

function EmailIcon() {
  return (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
  );
}
