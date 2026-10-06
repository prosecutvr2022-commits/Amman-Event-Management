/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { FeaturedReelSection } from './components/FeaturedReelSection';
import { TrustStrip } from './components/TrustStrip';
import { ServicesSection } from './components/ServicesSection';
import { WhyChooseUs } from './components/WhyChooseUs';
import { ProcessSection } from './components/ProcessSection';
import { EventGallery } from './components/EventGallery';
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

        {/* 3. Trust / Value Proposition Strip */}
        <TrustStrip />

        {/* 3. Services Section (All 17 Banner Services Categorized) */}
        <ServicesSection onSelectService={(srv) => handleOpenEnquiry(srv)} />

        {/* 4. Why Choose Amman Event Management */}
        <WhyChooseUs onOpenEnquiry={() => handleOpenEnquiry()} />

        {/* 5. Event Planning Process (4 Steps) */}
        <ProcessSection />

        {/* 6. Event Gallery */}
        <EventGallery onStartPlanning={() => handleOpenEnquiry()} />

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
