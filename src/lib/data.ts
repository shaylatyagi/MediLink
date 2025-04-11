
import { Medicine } from '@/components/MedicineCard';
import { Order } from '@/components/OrderCard';

export const medicines: Medicine[] = [
  {
    id: 'med-001',
    name: 'Acetaminophen',
    manufacturer: 'Johnson & Johnson',
    dosage: '500mg',
    inStock: true,
    price: 12.99
  },
  {
    id: 'med-002',
    name: 'Amoxicillin',
    manufacturer: 'Pfizer',
    dosage: '250mg',
    inStock: true,
    price: 15.50
  },
  {
    id: 'med-003',
    name: 'Lisinopril',
    manufacturer: 'AstraZeneca',
    dosage: '10mg',
    inStock: false,
    price: 22.75
  },
  {
    id: 'med-004',
    name: 'Metformin',
    manufacturer: 'Merck',
    dosage: '500mg',
    inStock: true,
    price: 18.25
  },
  {
    id: 'med-005',
    name: 'Atorvastatin',
    manufacturer: 'Pfizer',
    dosage: '20mg',
    inStock: false,
    price: 32.99
  },
  {
    id: 'med-006',
    name: 'Levothyroxine',
    manufacturer: 'Abbott',
    dosage: '50mcg',
    inStock: true,
    price: 14.50
  },
  {
    id: 'med-007',
    name: 'Albuterol',
    manufacturer: 'GlaxoSmithKline',
    dosage: '90mcg',
    inStock: true,
    price: 25.75
  },
  {
    id: 'med-008',
    name: 'Omeprazole',
    manufacturer: 'AstraZeneca',
    dosage: '20mg',
    inStock: false,
    price: 19.99
  }
];

export const orders: Order[] = [
  {
    id: 'order-001',
    medicineName: 'Lisinopril',
    quantity: 2,
    orderedAt: new Date(new Date().setDate(new Date().getDate() - 3)),
    status: 'processing',
    estimatedDelivery: new Date(new Date().setDate(new Date().getDate() + 2)),
    urgent: true
  },
  {
    id: 'order-002',
    medicineName: 'Atorvastatin',
    quantity: 1,
    orderedAt: new Date(new Date().setDate(new Date().getDate() - 1)),
    status: 'pending',
    estimatedDelivery: new Date(new Date().setDate(new Date().getDate() + 4)),
    urgent: false
  },
  {
    id: 'order-003',
    medicineName: 'Omeprazole',
    quantity: 3,
    orderedAt: new Date(new Date().setDate(new Date().getDate() - 5)),
    status: 'shipping',
    estimatedDelivery: new Date(new Date().setDate(new Date().getDate() + 1)),
    urgent: false
  },
  {
    id: 'order-004',
    medicineName: 'Metoprolol',
    quantity: 1,
    orderedAt: new Date(new Date().setDate(new Date().getDate() - 7)),
    status: 'delivered',
    estimatedDelivery: new Date(new Date().setDate(new Date().getDate() - 1)),
    urgent: false
  }
];

export const searchMedicines = (query: string): Medicine[] => {
  const lowercaseQuery = query.toLowerCase();
  return medicines.filter(
    medicine => 
      medicine.name.toLowerCase().includes(lowercaseQuery) ||
      medicine.manufacturer.toLowerCase().includes(lowercaseQuery)
  );
};
