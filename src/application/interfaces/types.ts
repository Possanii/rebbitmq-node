const TYPES = {
  Orm: Symbol.for('Orm'),
  Log: Symbol.for('Log'),

  // useCases
  PlaceOrder: Symbol.for('PlaceOrder'),
  UserUseCase: Symbol.for('UserUseCase'),

  // Repositories
  UserRepository: Symbol.for('UserRepository'),
  OrderRepository: Symbol.for('OrderRepository'),
};

export { TYPES };
