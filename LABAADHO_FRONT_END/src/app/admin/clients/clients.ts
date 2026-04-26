import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Client {
  id: number;
  nom: string;
  email: string;
  telephone: string;
  dateInscription: string;
}

@Component({
  selector: 'app-admin-clients',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './clients.html',
  styleUrls: ['./clients.css']
})
export class ClientsComponent implements OnInit {
  clients: Client[] = [];

  constructor() { }

  ngOnInit(): void {
    this.clients = [
      {id: 1, nom: 'Aissatou', email: 'aissatou@example.com', telephone: '770000000', dateInscription: '2025-01-01'},
      {id: 2, nom: 'Mamadou', email: 'mamadou@example.com', telephone: '770000001', dateInscription: '2025-02-10'},
    ];
  }

  supprimerClient(id: number): void {
    if(confirm('Supprimer ce client ?')) {
      this.clients = this.clients.filter(c => c.id !== id);
    }
  }
}
