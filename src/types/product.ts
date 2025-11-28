export type Product = {
  id: number
  name: string
  price: number
  description: string
  category: string
  image: string
  inStock: boolean
}

export type ProductCategory = {
  id: string
  name: string
  description: string
}