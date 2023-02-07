import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-public-app-layout',
  templateUrl: './public-app-layout.component.html',
  styleUrls: ['./public-app-layout.component.scss']
})
export class PublicAppLayoutComponent implements OnInit {
  moduleRoute!: string;
  isPublic!: boolean;

  constructor(@Inject(DOCUMENT) private document: Document,
    private route: ActivatedRoute) {
    this.applyTheme();
  }

  applyTheme() {
    this.injectStylesFileLink('v2e-theme.css');
  }

  injectStylesFileLink(stylesFilename: string) {
    const head = this.document.getElementsByTagName('head')[0];
    let themeLink = this.document.getElementById('module-theme') as HTMLLinkElement;

    if (themeLink) {
      themeLink.href = stylesFilename;
    } else {
      const style = this.document.createElement('link');
      style.id = 'module-theme';
      style.rel = 'stylesheet';
      style.href = `${stylesFilename}`;

      head.appendChild(style);
    }
  }

  ngOnInit(): void {
    // console.log('this.route: ' + this.route.snapshot.data['isPublic']);
    this.isPublic = false;
    if (this.route.snapshot.data['isPublic'] as boolean) {
      this.isPublic = true;
    } else {
      this.isPublic = true;
    }
  }
}
