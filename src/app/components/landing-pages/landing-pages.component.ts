import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-landing-pages',
  templateUrl: './landing-pages.component.html',
  styleUrls: ['./landing-pages.component.css']
})
export class LandingPagesComponent implements OnInit {
  templates: any[] = [];
  safeUrls: { [key: string]: SafeResourceUrl } = {};
  selectedTemplate: any = null;

  customTitle = '';
  customLogo = '';
  productImages: string[] = [];
  features = '';

  constructor(private http: HttpClient, private sanitizer: DomSanitizer) {}

  ngOnInit(): void {
    this.http.get<any[]>('http://localhost:3000/templates').subscribe({
      next: (data) => {
        this.templates = data;
        this.templates.forEach(template => {
          const rawUrl = `http://localhost:3000/landing_pages_templates/${template.name}/index.html`;
          this.safeUrls[template.name] = this.sanitizer.bypassSecurityTrustResourceUrl(rawUrl);
        });
      },
      error: (err) => {
        console.error('Error fetching templates:', err);
      }
    });
  }

  selectTemplate(template: any): void {
    this.selectedTemplate = template;
    this.customTitle = '';
    this.customLogo = '';
    this.productImages = [];
    this.features = '';
  }

  addProductImage(url: string) {
    if (url.trim()) {
      this.productImages.push(url.trim());
    }
  }

  removeProductImage(index: number) {
    this.productImages.splice(index, 1);
  }

  saveTemplate(): void {
    const payload = {
      templateName: this.selectedTemplate?.name,
      title: this.customTitle,
      logoUrl: this.customLogo,
      products: this.productImages.map(img => ({ name: 'Product', imageUrl: img })),
      features: this.features
    };

    this.http.post('http://localhost:3000/save-landing', payload).subscribe({
      next: () => alert('Landing page saved successfully!'),
      error: (err) => console.error('Error saving landing page:', err)
    });
  }
}
