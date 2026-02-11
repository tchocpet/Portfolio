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

  constructor(private fb: FormBuilder, private translationService: TranslationService) {
    // Initialize EmailJS with your Public Key
    // Get your Public Key from: https://dashboard.emailjs.com/admin/account
    emailjs.init('y18Jul5fp_HBY-um3');
  }

  ngOnInit(): void {
    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      message: ['', Validators.required],
      privacy: [false, Validators.requiredTrue],
    });
  }

  onSubmit(): void {
    if (!this.contactForm.valid) return;
    this.sending = true;
    this.serverMessage = '';

    const { name, email, message } = this.contactForm.value;

    // Send email using EmailJS
    emailjs
      .send(
        'service_8gc1rjs', // Get from EmailJS dashboard
        'template_0ps8jj5', // Get from EmailJS dashboard
        {
          to_email: 'thiernomam78@gmail.com',
          to_name: 'Diallo',
          from_name: name,
          from_email: email,
          message: message,
        }
      )
      .then(
        () => {
          this.sending = false;
          this.serverMessage = this.translationService.getTranslation('contact.success');
          this.contactForm.reset({ privacy: false });
          this.contactForm.markAsPristine();
          this.contactForm.markAsUntouched();
        },
        (error) => {
          this.sending = false;
          console.error('Email send error:', error);
          this.serverMessage = this.translationService.getTranslation('contact.failure');
        }
      );
  }
}
