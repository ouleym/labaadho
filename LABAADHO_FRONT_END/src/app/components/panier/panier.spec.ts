describe('Interface Panier', () => {
  it('should define the Panier interface structure', () => {
    const panier = {
      id: 1,
      dateCreation: new Date(),
      detailPaniers: []
    };

    expect(panier).toBeDefined();
    expect(panier.id).toBe(1);
  });
});
