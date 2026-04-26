import { Produit } from '../models/produit';

describe('Produit Model', () => {
  it('devrait créer un objet Produit valide', () => {
    const produit: Produit = {
      id: 1,
      libelle: 'Robe Jennah',
      description: 'Robe fluide et élégante, parfaite pour toutes les occasions.',
      prix: 55000,
      couleur: 'Beige',
      image: 'assets/images/img.jpg',
      quantite: 0
    };

    expect(produit).toBeTruthy();
    expect(produit.libelle).toBe('Robe Jennah');
    expect(produit.prix).toBeGreaterThan(0);
  });
});
