import { Directive, ElementRef, Renderer2, Input } from '@angular/core';

@Directive({
  selector: '[highlightHashtag]',
})
export class HighlightHashtagDirective {
  @Input('highlightColor') highlightColor: string = '#fb6f92';

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngAfterViewInit() {
    const text = this.el.nativeElement.textContent;
    const highlightedText = this.highlightHashtags(text);

    // InnerHTML'i değiştirerek rengi değiştirilmiş metni ekleyin
    this.renderer.setProperty(
      this.el.nativeElement,
      'innerHTML',
      highlightedText
    );
  }

  private highlightHashtags(text: string): string {
    // Metni işleyerek # ile başlayan ifadeleri bulup renklendirin ve link ekleyin
    const regex = /#(\w+)/g;
    const highlightedText = text.replace(regex, (match, hashtag) => {
      const link = `<a href="/search/${hashtag}" style="color: ${this.highlightColor}">#${hashtag}</a>`;
      return link;
    });

    return highlightedText;
  }
}
