import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-a-propos',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './a-propos.html',
  styleUrls: ['./a-propos.css']
})
export class AProposComponent {
  equipe = [
    {
      nom: 'Fatima Diallo',
      poste: 'Fondatrice & CEO',
      description: 'Passionnée par la mode pudique et élégante',
      photo: '👩‍💼'
    },
    {
      nom: 'Aminata Sow',
      poste: 'Styliste en Chef',
      description: 'Experte en design de vêtements modestes',
      photo: '👩‍🎨'
    },
    {
      nom: 'Khady Ba',
      poste: 'Responsable Qualité',
      description: 'Garantit l\'excellence de chaque produit',
      photo: '👩‍💼'
    }
  ];

  valeurs = [
    {
      titre: 'Qualité Premium',
      description: 'Des tissus soigneusement sélectionnés pour votre confort',
      icone: '✨'
    },
    {
      titre: 'Mode Pudique',
      description: 'Des créations élégantes respectant vos valeurs',
      icone: '🎀'
    },
    {
      titre: 'Éthique',
      description: 'Production responsable et commerce équitable',
      icone: '🌱'
    },
    {
      titre: 'Innovation',
      description: 'Designs modernes alliant tradition et tendance',
      icone: '💡'
    }
  ];
}