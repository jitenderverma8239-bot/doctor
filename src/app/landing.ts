import { Component } from '@angular/core';

@Component({
  selector: 'app-landing',
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class Landing {
  menuOpen = false;
  expandedService: string | null = null;
  faqOpen: string | null = null;
  galleryCategory = 'All';
  activeGalleryImage: { src: string; alt: string } | null = null;
  readonly galleryCategories = ['All', 'Smile care', 'Orthodontics', 'In-clinic care'];
  readonly galleryImages = [
    { src: '/smile-before.png', alt: 'Close-up smile photograph', label: 'Smile care', category: 'Smile care' },
    { src: '/smile-after.png', alt: 'Close-up smile photograph', label: 'Smile care', category: 'Smile care' },
    { src: '/smile-braces.png', alt: 'Close-up view of dental braces', label: 'Braces and aligners', category: 'Orthodontics' },
    { src: '/smile-treatment.png', alt: 'Dental professional examining a patient', label: 'Dental consultation', category: 'In-clinic care' }
  ];
  readonly faqs = [
    { question: 'How often should I visit a dentist?', answer: 'The right check-up schedule depends on your oral health and history. Ask your dentist how often you should come in.' },
    { question: 'Is root canal treatment painful?', answer: 'Experiences vary. The dentist can explain what to expect, discuss comfort options, and answer your questions before treatment.' },
    { question: 'Do you provide dental implants?', answer: 'Dental implants are listed among our care options. Contact the clinic to arrange a consultation and discuss suitability.' },
    { question: 'What are clear aligners?', answer: 'Clear aligners are removable orthodontic appliances. A clinician can explain whether they may be an option for your teeth.' },
    { question: 'How can I book an appointment?', answer: 'Use the online appointment flow to choose a service, preferred doctor, date, and time, then send your request by WhatsApp or SMS.' },
    { question: 'What payment options are available?', answer: 'Please call the clinic to ask about current payment options and the cost of your recommended care.' }
  ];
  private readonly serviceDetails: Record<string, string> = {
    'Preventive care': 'Routine exams and professional cleanings help spot concerns early and keep teeth and gums in good shape.',
    'Teeth whitening': 'We assess your smile and discuss suitable whitening options, expected results, and aftercare before treatment.',
    'Braces & aligners': 'Talk through alignment goals and get guidance on braces or clear aligners, along with a personalized care plan.',
    'Dental implants': 'Begin with a consultation to review your needs, treatment options, and the steps involved in restoring a missing tooth.',
    'Root canal care': 'Our dentist will assess the tooth, explain the treatment, and discuss how to restore it after care.',
    'Cosmetic dentistry': 'Explore aesthetic options and a considered plan shaped around your preferences and dental health.',
    'Pediatric dentistry': 'Contact the clinic to discuss a child’s dental visit and the care options available.',
    'Gum treatment': 'Arrange an assessment to discuss gum concerns and possible next steps.'
  };

  get filteredGallery(): typeof this.galleryImages {
    return this.galleryCategory === 'All'
      ? this.galleryImages
      : this.galleryImages.filter(image => image.category === this.galleryCategory);
  }

  get expandedServiceDescription(): string {
    return this.expandedService ? this.serviceDetails[this.expandedService] ?? '' : '';
  }

  toggleService(name: string): void {
    this.expandedService = this.expandedService === name ? null : name;
  }

  toggleFaq(question: string): void {
    this.faqOpen = this.faqOpen === question ? null : question;
  }

  openGalleryImage(src: string, alt: string): void {
    this.activeGalleryImage = { src, alt };
  }

  closeGalleryImage(): void {
    this.activeGalleryImage = null;
  }

  scrollToTop(): void {
    const behavior = window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth';
    window.scrollTo({ top: 0, behavior });
  }

  navigateToSection(event: MouseEvent, sectionId: string): void {
    event.preventDefault();
    this.menuOpen = false;
    const behavior = window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth';
    document.getElementById(sectionId)?.scrollIntoView({ behavior, block: 'start' });
    window.history.replaceState(null, '', `#${sectionId}`);
  }
}
