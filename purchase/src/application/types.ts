const TYPES = {
  Orm: Symbol.for('Orm'),
  Log: Symbol.for('Log'),
  Messaging: Symbol.for('Messaging'),

  // useCases
  PlacePurchase: Symbol.for('PlacePurchase'),
  UserUseCase: Symbol.for('UserUseCase'),

  // Repositories
  UserRepository: Symbol.for('UserRepository'),
  PurchaseRepository: Symbol.for('PurchaseRepository'),
};

export { TYPES };
