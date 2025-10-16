export type Product = {
  id: string
  name: string
  price: number
  image: string
  description: string
  slug: string
  features: []
}

export type CartItem = Product & { quantity: number }
export type CartState = { items: Record<string, CartItem> }