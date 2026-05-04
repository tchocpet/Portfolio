import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormsModule,
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MATERIAL_IMPORTS } from '../../shared/material';
import { TranslationService } from '../../services/translation.service';
import { RouterModule } from '@angular/router';
import { TranslatePipe } from '../../pipes/translate.pipe';
import emailjs from '@emailjs/browser';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
    TranslatePipe,
    ...MATERIAL_IMPORTS,
  ],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
})
export class ContactComponent implements OnInit {
  contactForm!: FormGroup;
  sending = false;
  serverMessage = '';

  constructor(
    private fb: FormBuilder,
    private translationService: TranslationService,
  ) {
    // Initialize EmailJS with your Public Key
    // Get your Public Key from: https://dashboard.emailjs.com/admin/account
    emailjs.init('y18Jul5fp_HBY-um3');
  }

  ngOnInit(): void {
    this.contactForm = this.fb.group({
      name: ['', [Validators.required, Validators.pattern(/\S+/)]],
      email: [
        '',
        [Validators.required, Validators.email, Validators.pattern(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)],
      ],
      message: ['', [Validators.required, Validators.pattern(/\S+/)]],
      privacy: [false, Validators.requiredTrue],
    });
  }

  onSubmit(): void {
    this.contactForm.markAllAsTouched();

    const name = this.contactForm.value.name?.trim();
    const email = this.contactForm.value.email?.trim();
    const message = this.contactForm.value.message?.trim();

    if (!this.contactForm.valid || !name || !email || !message) return;

    this.sending = true;
    this.serverMessage = '';

    emailjs
      .send('service_8gc1rjs', 'template_0ps8jj5', {
        to_email: 'thiernomam78@gmail.com',
        to_name: 'Diallo',
        from_name: name,
        from_email: email,
        message: message,
      })
      .then(
        () => {
          this.sending = false;
          this.serverMessage = this.translationService.getTranslation('contact.success');
          this.contactForm.reset({ privacy: false });
          this.contactForm.markAsPristine();
          this.contactForm.markAsUntouched();

          setTimeout(() => {
            this.serverMessage = '';
          }, 3000);
        },
        () => {
          this.sending = false;
          this.serverMessage = this.translationService.getTranslation('contact.failure');

          setTimeout(() => {
            this.serverMessage = '';
          }, 3000);
        },
      );
  }
}
