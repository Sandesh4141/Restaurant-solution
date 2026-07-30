export interface Order {
  id: string;
  customerName: string;
  totalAmount: number;
  status: OrderStatus;
  createdAt: string;
  items: OrderItem[];
}

export interface OrderItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
}

export enum OrderStatus {
  Pending = "Pending",
  InProgress = "In Progress",
  Completed = "Completed",
}
