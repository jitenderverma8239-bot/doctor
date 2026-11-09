import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

interface DayOption {
  value: string;
  weekday: string;
  day: string;
  month: string;
}

@Component({
  selector: 'app-appointment',
  imports: [CommonModule, RouterLink],
  templateUrl: './appointment.html',
  styleUrl: './appointment.css'
})
export class Appointment {
  step = 1;
  service = '';
  selectedDate = '';
  selectedTime = '';
  doctor = '';
  preferredChannel = 'WhatsApp';
  patientName = '';
  patientPhone = '';
  patientEmail = '';
  patientNotes = '';
  submitted = false;
  readonly services = [
    { name: 'Dental check-up', detail: 'Routine examination of teeth and gums.', icon: '◉' },
    { name: 'Teeth cleaning', detail: 'Scaling and polishing for a fresh, healthy smile.', icon: '+' },
    { name: 'Tooth filling', detail: 'Care for cavities and damaged teeth.', icon: '◇' },
    { name: 'Root canal', detail: 'Treatment for infected or painful teeth.', icon: '⌁' },
    { name: 'Braces & aligners', detail: 'Explore orthodontic options for your smile.', icon: '〰' },
    { name: 'Dental implants', detail: 'Replace missing teeth with lasting care.', icon: '+' },
    { name: 'Cosmetic dentistry', detail: 'Whitening, veneers, and smile enhancements.', icon: '☼' },
    { name: 'Other / not sure', detail: 'Tell us what you need and we’ll guide you.', icon: '♡' }
  ];
  readonly times = ['9:00 AM', '9:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM', '12:00 PM', '1:00 PM', '1:30 PM', '2:00 PM', '2:30 PM', '3:00 PM', '3:30 PM', '4:00 PM', '4:30 PM', '5:00 PM', '5:30 PM', '6:00 PM'];
  readonly days: DayOption[] = this.makeDays();

  private makeDays(): DayOption[] {
    const days: DayOption[] = [];
    const date = new Date();
    for (let offset = 1; days.length < 21; offset++) {
      const day = new Date();
      day.setDate(date.getDate() + offset);
      if (day.getDay() === 0) continue;
      days.push({
        value: `${day.getFullYear()}-${String(day.getMonth() + 1).padStart(2, '0')}-${String(day.getDate()).padStart(2, '0')}`,
        weekday: new Intl.DateTimeFormat('en-IN', { weekday: 'short' }).format(day),
        day: new Intl.DateTimeFormat('en-IN', { day: 'numeric' }).format(day),
        month: new Intl.DateTimeFormat('en-IN', { month: 'short' }).format(day)
      });
    }
    return days;
  }

  chooseService(name: string): void {
    this.service = name;
  }

  continueToSchedule(): void {
    if (this.service && this.doctor) this.step = 2;
  }

  continueToDetails(): void {
    if (this.selectedDate && this.selectedTime) this.step = 3;
  }

  previous(): void {
    if (this.step > 1) this.step--;
  }

  get message(): string {
    const date = this.selectedDate
      ? new Date(`${this.selectedDate}T12:00:00`).toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })
      : '';
    return [
      'Appointment request — Parnamika Dental',
      `Patient: ${this.patientName}`,
      `Phone: +91 ${this.patientPhone}`,
      this.patientEmail ? `Email: ${this.patientEmail}` : '',
      `Service: ${this.service}`,
      `Preferred doctor: ${this.doctor || 'Any available doctor'}`,
      `Requested time: ${date} at ${this.selectedTime}`,
      this.patientNotes ? `Notes: ${this.patientNotes}` : ''
    ].filter(Boolean).join('\n');
  }

  get whatsappUrl(): string {
    return `https://wa.me/916280433229?text=${encodeURIComponent(this.message)}`;
  }

  get smsUrl(): string {
    return `sms:+916280433229?body=${encodeURIComponent(this.message)}`;
  }

  get emailUrl(): string {
    return `mailto:info@parnamikadental.com?subject=${encodeURIComponent('Appointment request — Parnamika Dental')}&body=${encodeURIComponent(this.message)}`;
  }

  submit(event: Event): void {
    event.preventDefault();
    const form = event.currentTarget as HTMLFormElement;
    const values = new FormData(form);
    this.patientName = String(values.get('name') ?? '');
    this.patientPhone = String(values.get('phone') ?? '');
    this.patientEmail = String(values.get('email') ?? '');
    this.patientNotes = String(values.get('notes') ?? '');
    this.preferredChannel = String(values.get('confirmVia') ?? 'WhatsApp');
    this.submitted = true;
  }
}
