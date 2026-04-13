export interface PropertyProfile {
  id: number
  name: string
  starLevel: number
  address: string
  description?: string | null
}

export interface UpdatePropertyProfileRequest {
  name: string
  starLevel: number
  address: string
  description?: string
}
