import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CardComponent } from '../../../../share/components/card/card';

@Component({
  selector: 'app-services-page',
  standalone: true,
  imports: [RouterLink, CardComponent],
  templateUrl: './services-page.html',
  styleUrl: './services-page.scss'
})
export class ServicesPage {}
