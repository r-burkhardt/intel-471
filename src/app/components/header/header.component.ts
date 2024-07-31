import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {
  private _router = inject(Router);

  isHidden = false;

  ngOnInit() {
    this._router.events.subscribe(() => {
      console.log('router', this._router);
      this.isHidden = this._router.url === '/';
    });
  }
}
