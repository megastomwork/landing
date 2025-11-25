'use client'

import { Intro1Section } from '@/features/page/sections/intro-1'
import { AboutSection } from '@/features/page/sections/about/about-section'
import { DescriptionSection } from '@/features/page/sections/description/description-section'
import { ServicesSection } from '@/features/page/sections/services'
import { BlogGridSection } from '@/features/page/sections/blog-grid'
import { PageFeedbacksSection } from '@/features/page/sections/feedbacks'
import { PageContactSection } from '@/features/page/sections/contact'
import { ContactInfoSection } from '@/features/page/sections/contact-info/contact-info-section'
import { DoctorsSection } from '@/features/page/sections/doctors/doctors-section'
import { FaqSection } from '@/features/page/sections/faq/faq-section'
import { PricesSection } from '@/features/page/sections/prices/prices-section'

export default function TestPage() {
  // Mock data for testing sections
  const mockIntroData = {
    image: {
      id: 1,
      url: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=1200',
      alt: 'Dental clinic interior',
      width: 1200,
      height: 800,
      updatedAt: new Date().toISOString(),
      createdAt: new Date().toISOString(),
      filename: 'intro.jpg',
      mimeType: 'image/jpeg',
      filesize: 0,
    },
    alt: 'Dental clinic interior',
  }

  const mockAboutData = {
    title: 'Про Нас',
    description:
      'Клініка Megastom – це сучасний медичний заклад, який об\'єднує команду досвідчених лікарів та передове обладнання. Ми пропонуємо комплексний підхід до лікування, орієнтуючись на потреби кожного відвідувача.',
    image: {
      id: 2,
      url: 'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?w=800',
      alt: 'Our team',
      width: 800,
      height: 600,
      updatedAt: new Date().toISOString(),
      createdAt: new Date().toISOString(),
      filename: 'about.jpg',
      mimeType: 'image/jpeg',
      filesize: 0,
    },
    stats: [
      { value: '6', label: 'Кваліфікованих лікарів' },
      { value: '4', label: 'Кабінетів стоматології' },
      { value: '22', label: 'Роки досвіду' },
      { value: '10 000+', label: 'Задоволених пацієнтів' },
    ],
  }

  const mockDescriptionData = {
    title: 'Наша місія:',
    text: 'Забезпечення високоякісної медичної допомоги для всієї родини, створення довіри та комфортних умов для наших пацієнтів. Ми прагнемо, щоб кожен відвідувач почувався впевнено і отримав професійне обслуговування.',
  }

  const mockServicesData = {
    title: 'Наші послуги',
    description:
      'У клініці Megastom ми пропонуємо широкий спектр послуг для всієї родини.',
  }

  const mockBlogArticlesData = {
    title: 'Останні статті',
    articlesCount: 3,
    showMoreLink: true,
    buttonText: 'Більше статей',
  }

  const mockFeedbacksData = {
    title: 'Відгуки наших клієнтів',
  }

  const mockContactData = {
    title: 'Дозволь собі здорову посмішку і ми зробимо її',
    description: 'Написати нам у соц. мережах:',
    image: {
      id: 3,
      url: 'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?w=600',
      alt: 'Contact us',
      width: 600,
      height: 700,
      updatedAt: new Date().toISOString(),
      createdAt: new Date().toISOString(),
      filename: 'contact.jpg',
      mimeType: 'image/jpeg',
      filesize: 0,
    },
    showImage: true,
  }

  const mockContactInfoData = {
    title: 'Контакти',
    showMap: true,
  }

  const mockDoctorsData = {}

  const mockFaqData = {
    title: 'Часті питання',
  }

  const mockPricesData = {
    title: 'Наші ціни',
    description: 'Прозорі та доступні ціни на всі послуги',
  }

  return (
    <div className="bg-gray-50">
      {/* Section headers for screenshots */}
      <div className="bg-blue-600 p-4 text-center text-white">
        <h1 className="text-2xl font-bold">Test Page - All Sections</h1>
        <p>Використовується для створення preview зображень секцій</p>
      </div>

      {/* Intro Section */}
      <div id="intro-section" className="border-b-8 border-blue-500">
        <div className="bg-gray-800 p-2 text-center text-sm text-white">
          INTRO SECTION
        </div>
        <Intro1Section {...mockIntroData} />
      </div>

      {/* About Section */}
      <div id="about-section" className="border-b-8 border-blue-500">
        <div className="bg-gray-800 p-2 text-center text-sm text-white">
          ABOUT SECTION
        </div>
        <AboutSection {...mockAboutData} />
      </div>

      {/* Description Section */}
      <div id="description-section" className="border-b-8 border-blue-500">
        <div className="bg-gray-800 p-2 text-center text-sm text-white">
          DESCRIPTION SECTION
        </div>
        <DescriptionSection {...mockDescriptionData} />
      </div>

      {/* Services Section */}
      <div id="services-section" className="border-b-8 border-blue-500">
        <div className="bg-gray-800 p-2 text-center text-sm text-white">
          SERVICES SECTION
        </div>
        <ServicesSection {...mockServicesData} />
      </div>

      {/* Blog Articles Section */}
      <div id="blog-articles-section" className="border-b-8 border-blue-500">
        <div className="bg-gray-800 p-2 text-center text-sm text-white">
          BLOG ARTICLES SECTION
        </div>
        <BlogGridSection {...mockBlogArticlesData} />
      </div>

      {/* Feedbacks Section */}
      <div id="feedbacks-section" className="border-b-8 border-blue-500">
        <div className="bg-gray-800 p-2 text-center text-sm text-white">
          FEEDBACKS SECTION
        </div>
        <PageFeedbacksSection {...mockFeedbacksData} />
      </div>

      {/* Contact Section */}
      <div id="contact-section" className="border-b-8 border-blue-500">
        <div className="bg-gray-800 p-2 text-center text-sm text-white">
          CONTACT SECTION
        </div>
        <PageContactSection {...mockContactData} />
      </div>

      {/* Contact Info Section */}
      <div id="contact-info-section" className="border-b-8 border-blue-500">
        <div className="bg-gray-800 p-2 text-center text-sm text-white">
          CONTACT INFO SECTION
        </div>
        <ContactInfoSection {...mockContactInfoData} />
      </div>

      {/* Doctors Section */}
      <div id="doctors-section" className="border-b-8 border-blue-500">
        <div className="bg-gray-800 p-2 text-center text-sm text-white">
          DOCTORS SECTION
        </div>
        <DoctorsSection {...mockDoctorsData} />
      </div>

      {/* FAQ Section */}
      <div id="faq-section" className="border-b-8 border-blue-500">
        <div className="bg-gray-800 p-2 text-center text-sm text-white">
          FAQ SECTION
        </div>
        <FaqSection {...mockFaqData} />
      </div>

      {/* Prices Section */}
      <div id="prices-section" className="border-b-8 border-blue-500">
        <div className="bg-gray-800 p-2 text-center text-sm text-white">
          PRICES SECTION
        </div>
        <PricesSection {...mockPricesData} />
      </div>

      <div className="bg-green-600 p-8 text-center text-white">
        <h2 className="text-xl font-bold">End of Test Page</h2>
      </div>
    </div>
  )
}
