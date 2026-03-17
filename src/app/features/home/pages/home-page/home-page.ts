import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CarouselComponent, CarouselSlide } from '../../../../share/components/carousel/carousel';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [RouterLink, CarouselComponent],
  templateUrl: './home-page.html',
  styleUrl: './home-page.scss'
})
export class HomePage {
  slides: CarouselSlide[] = [
    {
      image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1920',
      title: 'Diseño Excepcional',
      description: 'Creamos experiencias digitales que cautivan y inspiran'
    },
    {
      image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1920',
      title: 'Innovación Constante',
      description: 'Las últimas tecnologías para tu proyecto'
    },
    {
      image: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=1920',
      title: 'Resultados Medibles',
      description: 'Enfocados en el crecimiento de tu negocio'
    }
  ];
}
