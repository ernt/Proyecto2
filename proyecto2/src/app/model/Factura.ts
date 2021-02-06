
export interface Factura {
    id: number;
    numberInvoice: number;
    description: string;
    customerId: number;
    createAt: Date;
    items: [];
    state: string;
    customer: null;



}
