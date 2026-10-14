/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { FeaturedReelSection } from './components/FeaturedReelSection';
import { CertifiedProfessionalSection } from './components/CertifiedProfessionalSection';
import { TrustStrip } from './components/TrustStrip';
import { ServicesSection } from './components/ServicesSection';
import { OurWorksCarouselSection } from './components/OurWorksCarouselSection';
import { WhyChooseUs } from './components/WhyChooseUs';
import { ProcessSection } from './components/ProcessSection';
import { EventGallery } from './components/EventGallery';
import { CraftedMomentsVideoSection } from './components/CraftedMomentsVideoSection';
import { WeddingShowcase } from './components/WeddingShowcase';
import { CorporateShowcase } from './components/CorporateShowcase';
import { CompleteSolutions } from './components/CompleteSolutions';
import { Testimonials } from './components/Testimonials';
import { SocialSection } from './components/SocialSection';
import { ContactSection } from './components/ContactSection';
import { FinalCTA } from './components/FinalCTA';
import { Footer } from './components/Footer';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { MobileQuickBar } from './components/MobileQuickBar';
import { EnquiryModal } from './components/EnquiryModal';

export default function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [preSelectedService, setPreSelectedService] = useState<string | undefined>(undefined);

  const handleOpenEnquiry = (serviceName?: string) => {
    setPreSelectedService(serviceName);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setPreSelectedService(undefined);
  };

  return (
    <div className="min-h-screen bg-[#070D1E] text-slate-100 flex flex-col selection:bg-[#C5A059] selection:text-[#070D1E] relative">
      {/* Sticky Navigation */}
      <Navbar onOpenEnquiry={handleOpenEnquiry} />

      <main className="flex-1">
        {/* 1. Hero Section */}
        <Hero onOpenEnquiry={() => handleOpenEnquiry()} />

        {/* 2. Featured Viral Instagram Reel Section (Directly Below Hero) */}
        <FeaturedReelSection onPlanEvent={() => handleOpenEnquiry('Wedding')} />

        {/* 2b. Certified Event Management Professional & Government Registered Company Section */}
        <CertifiedProfessionalSection
          onPlanEvent={() => handleOpenEnquiry('Certified Event Planner')}
          onEnquire={() => handleOpenEnquiry()}
        />

        {/* 3. Trust / Value Proposition Strip */}
        <TrustStrip />

        {/* 3. Services Section (All 17 Banner Services Categorized) */}
        <ServicesSection onSelectService={(srv) => handleOpenEnquiry(srv)} />

        {/* Our Works Section (Carousel Mode of Real Setups below "Everything You Need for a Perfect Event") */}
        <OurWorksCarouselSection onSelectWork={(work) => handleOpenEnquiry(work)} />

        {/* 4. Why Choose Amman Event Management */}
        <WhyChooseUs onOpenEnquiry={() => handleOpenEnquiry()} />

        {/* 5. Event Planning Process (4 Steps) */}
        <ProcessSection />

        {/* 6. Event Gallery (Moments We’ve Crafted) */}
        <EventGallery onStartPlanning={() => handleOpenEnquiry()} />

        {/* 6b. Live Celebration Video Section (Below Moments We’ve Crafted) */}
        <CraftedMomentsVideoSection onOpenEnquiry={(srv) => handleOpenEnquiry(srv)} />

        {/* 7. Wedding & Celebration Section */}
        <WeddingShowcase onPlanWedding={() => handleOpenEnquiry('Wedding')} />

        {/* 8. Corporate & Brand Events Section */}
        <CorporateShowcase onDiscussCorporate={() => handleOpenEnquiry('Corporate Events')} />

        {/* 9. Complete Event Solutions */}
        <CompleteSolutions onSelectService={(srv) => handleOpenEnquiry(srv)} />

        {/* 10. Testimonials */}
        <Testimonials />

        {/* 11. Instagram / Social Media & Banner QR Showcase */}
        <SocialSection />

        {/* 12. Contact / Lead Capture Enquiry Section */}
        <ContactSection initialService={preSelectedService} />

        {/* 13. Final Cinematic CTA */}
        <FinalCTA onPlanEvent={() => handleOpenEnquiry()} />
      </main>

      {/* 14. Footer */}
      <Footer onOpenEnquiry={handleOpenEnquiry} />

      {/* Floating WhatsApp Action */}
      <FloatingWhatsApp onOpenEnquiry={() => handleOpenEnquiry()} />

      {/* Mobile Sticky Action Bar */}
      <MobileQuickBar onOpenEnquiry={() => handleOpenEnquiry()} />

      {/* Interactive Event Enquiry Modal */}
      <EnquiryModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        preSelectedService={preSelectedService}
      />
    </div>
  );
}
