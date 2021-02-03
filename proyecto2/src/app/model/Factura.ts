
export class Factura {
    id: number;
    create_at:Date;
    customer_id:number;
    description: string;
    number_invoice:number;
    state: string;
    


    constructor(id:number,create_at:Date,customer_id:number,description:string,number_invoice:number,state:string){
        this.id=id;
        this.create_at=create_at;
        this.customer_id=customer_id;
        this.description=description;
        this.number_invoice=number_invoice;
        this.state=state;
    }
}