import {
  Component,
  ElementRef,
  TemplateRef,
  ViewChild,
  inject,
} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { trigger, style, transition, animate } from '@angular/animations';
import { DataService } from './data.service';
import { CommonModule } from '@angular/common';
import { ConvertTextToHtmlPipe } from './convert-text-to-html.pipe';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { GeminiConfig } from './chat-form';
import { API_KEY_CONF } from './config';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    CommonModule,
    ConvertTextToHtmlPipe,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    trigger('typeWritterEffect', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('2s', style({ opacity: 1 })),
      ]),
    ]),
  ],
})
export class AppComponent {
  @ViewChild('messagesContainer') private messagesContainer!: ElementRef;
  private dataService = inject(DataService);
  public messagesHistory: { role: string; parts: string }[] = [];
  public userMessage!: string | null;
  public loading = false;

  modelOptions = [
    { label: '', value: 'gemini-pro' },
    { label: 'Gemini v1.0.0-Pro (Basic)', value: 'gemini-1.0-pro' },
    { label: 'Gemini v1.0.0-Pro-001 (Updated)', value: 'gemini-1.0-pro-001' },
    {
      label: 'Gemini v1.5 (Experimental)',
      value: 'gemini-1.5-pro',
      disabled: true,
    },
  ];

  chatForm = new FormGroup({
    apiKey: new FormControl(API_KEY_CONF || ''),
    model: new FormControl(this.modelOptions[0].value),
  });

  sendMessage(message: string) {
    if (!message || this.loading) return;
    setTimeout(() => this.scrollToBottom(), 0);
    this.loading = true;
    this.messagesHistory.push(
      {
        role: 'user',
        parts: message,
      },
      {
        role: 'model',
        parts: '',
      }
    );
    this.dataService
      .generateContentWithGeminiPro(
        message,
        this.messagesHistory,
        this.chatForm.value as GeminiConfig
      )
      .subscribe({
        next: (res: any) => {
          this.loading = false;
          this.userMessage = null;
          this.messagesHistory = this.messagesHistory.slice(0, -2);
          this.messagesHistory.push(
            {
              role: 'user',
              parts: message,
            },
            {
              role: 'model',
              parts: res,
            }
          );
          setTimeout(() => this.scrollToBottom(), 0);
        },
        error: (error) => {
          this.loading = false;
          console.error('Error generating content:', error);
          this.messagesHistory.push({
            role: 'model',
            parts: 'Sorry, something went wrong. Please try again later.',
          });
          setTimeout(() => this.scrollToBottom(), 0);
        },
      });
  }

  scrollToBottom(): void {
    try {
      this.messagesContainer.nativeElement.scrollTop =
        this.messagesContainer.nativeElement.scrollHeight;
    } catch (err) {}
  }

  ngAfterViewInit() {
    this.scrollToBottom();
  }

  autoGrowTextZone(e: any) {
    e.target.style.height = '0px';
    e.target.style.height = e.target.scrollHeight + 25 + 'px';
  }
}
