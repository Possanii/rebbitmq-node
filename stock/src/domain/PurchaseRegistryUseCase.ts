export interface PurchaseRegistryUseCase {
  registerPurchase(purchaseId: string): Promise<void>;
}
