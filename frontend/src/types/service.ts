export interface ServiceCatalogItem {
  id: number
  name: string
  unit: string
  price: number
}

export interface UsedServiceItem {
  id: number
  serviceId: number
  serviceName: string
  unit: string
  bookedRoomId: number
  quantity: number
  unitPrice: number
  discount: number
  totalAmount: number
}

export interface CreateServiceRequest {
  name: string
  unit: string
  price: number
}

export interface AddUsedServiceRequest {
  serviceId: number
  quantity: number
  discount?: number
}
