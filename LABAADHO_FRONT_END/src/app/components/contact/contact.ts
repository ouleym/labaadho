import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './contact.html',
  styleUrls: ['./contact.css']
})
export class ContactComponent {
  contact = {
    nom: '',
    email: '',
    telephone: '',
    sujet: '',
    message: ''
  };

  messageSent = false;

  infosContact = [
    {
      icone: '📍',
      titre: 'Adresse',
      contenu: 'Dakar, Sénégal<br>Quartier XYZ, Rue ABC'
    },
    {
      icone: '📞',
      titre: 'Téléphone',
      contenu: '+221 33 XXX XX XX<br>+221 77 XXX XX XX'
    },
    {
      icone: '📧',
      titre: 'Email',
      contenu: 'contact@labaadho.com<br>support@labaadho.com'
    },
    {
      icone: '🕐',
      titre: 'Horaires',
      contenu: 'Lun - Sam: 9h - 19h<br>Dimanche: Fermé'
    }
  ];

  onSubmit() {
    if (this.contact.nom && this.contact.email && this.contact.message) {
      // Simuler l'envoi du message
      console.log('Message envoyé:', this.contact);
      this.messageSent = true;
      
      // Réinitialiser le formulaire après 3 secondes
      setTimeout(() => {
        this.contact = {
          nom: '',
          email: '',
          telephone: '',
          sujet: '',
          message: ''
        };
        this.messageSent = false;
      }, 3000);
    }
  }
}