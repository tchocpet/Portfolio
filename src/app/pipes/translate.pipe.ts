import { Pipe, PipeTransform, ChangeDetectorRef } from '@angular/core';
import { TranslationService } from '../services/translation.service';

@Pipe({
  name: 'translate',
  standalone: true,
  pure: false,
})
export class TranslatePipe implements PipeTransform {
  constructor(private translationService: TranslationService, private cdr: ChangeDetectorRef) {}

  transform(key: string): string {
    this.translationService.currentLanguage();
    return this.translationService.getTranslation(key);
  }
}
