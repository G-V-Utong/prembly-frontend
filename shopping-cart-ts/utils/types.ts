export type Product = {
  id: number
  name: string
  price: number
  image: string
  description: string
  slug: string
  features: string[]
}

export type CartItem = Product & { quantity: number }
export type CartState = { items: Record<string, CartItem> }