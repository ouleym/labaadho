import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-accueil',
  standalone: true,
  imports: [CommonModule, FormsModule,RouterLink],
  templateUrl: './accueil.html',
  styleUrls: ['./accueil.css']
})
export class AccueilComponent {
  title = 'Bienvenue sur LABAADHo';

  slides = [
    {
      image: 'assets/images/abaya1.jpg',
      caption: 'L’élégance au naturel'
    },
    {
      image: 'assets/images/abaya2.jpg',
      caption: 'Des tenues modestes et raffinées'
    },
    {
      image: 'assets/images/abaya3.jpg',
      caption: 'Exprime ta féminité avec style'
    }
  ];
}
