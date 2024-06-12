export interface Transaction {
  type: string,
  source: string,
  destination: string,
  amount: number,
  category: string,
  description: string,
  status: string,
  balance: number,
  date: string
}
