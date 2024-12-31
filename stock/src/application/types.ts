export const TYPES = {
  Database: Symbol.for('Database'),
  Log: Symbol.for('Log'),
  Messaging: Symbol.for('Messaging'),
  Consumer: Symbol.for('Consumer'),

  // repositories
  StockRepository: Symbol.for('StockRepository'),
  ProductRepository: Symbol.for('ProductRepository'),
  PurchaseRepository: Symbol.for('PurchaseRepository'),

  // UseCases
  CreateProduct: Symbol.for('CreateProduct'),
  PurchaseRegistry: Symbol.for('PurchaseRegistry'),
};
