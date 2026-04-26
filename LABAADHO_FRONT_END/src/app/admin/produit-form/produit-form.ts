import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router,  } from '@angular/router';
import { ProduitService } from '../../services/produit.service';

@Component({
  selector: 'app-produit-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule,],
  templateUrl: './produit-form.html',
  styleUrls: ['./produit-form.css']
})
export class ProduitFormComponent {
  produitForm!: FormGroup;
  imagePreview: string | ArrayBuffer | null = null;
  selectedImage!: File;

  constructor(
    private fb: FormBuilder,
    private produitService: ProduitService,
    private router: Router
  ) {
    this.produitForm = this.fb.group({
      libelle: ['', Validators.required],
      prix: ['', [Validators.required, Validators.min(0)]],
      prix_promo: [''],
      quantite: ['', [Validators.required, Validators.min(1)]],
      image: [null]
    });
  }

  /** 🔹 Gérer l'image */
  onImageSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedImage = file;
      const reader = new FileReader();
      reader.onload = () => (this.imagePreview = reader.result);
      reader.readAsDataURL(file);
    }
  }
  onCancel(): void {
  this.router.navigate(['/admin/produits']);
}

  /** 🔹 Enregistrer le produit */
  onSubmit() {
    if (this.produitForm.invalid) return;

    const formData = new FormData();
    Object.entries(this.produitForm.value).forEach(([key, value]) => {
      if (key !== 'image') formData.append(key, value as string);
    });

    if (this.selectedImage) {
      formData.append('image', this.selectedImage);
    }

    this.produitService.creerProduit(formData).subscribe({
      next: () => {
        alert('✅ Produit ajouté avec succès !');
        this.router.navigate(['/admin/produits']);
      },
      error: (err) => console.error('Erreur ajout produit :', err)
    });
    
  }
}
