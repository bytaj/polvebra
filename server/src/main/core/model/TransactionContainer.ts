import Tag from './Tag';

export default abstract class TransactionContainer {
    private id?: any;
    private name: string;
    private tag: Tag;
    private amount : number;
    private date : Date;
    

    public constructor(name: string, amount: number, tag?:Tag, date?: Date){
        this.name = name;
        this.amount = amount;
        if(tag){
            this.tag = tag;
        }else{
            this.tag = new Tag("");
        }
        if(date){
            this.date = date;
        }else{
            this.date = new Date();
        }
    }

    public getId():any{
        return this.id;
    }

    public setId(id:any){
        if (!this.id){
            this.id = id;
        }
    }

    public getName(): string{
        return this.name;
    }

    public setName(name: string): void{
        this.name = name;
    }

    public getTag(): Tag|undefined{
        return this.tag;
    }

    public setTag(tag: Tag): void{
        this.tag = tag;
    }

    public getAmount(): number{
        return this.amount;
    }

    public setAmount(amount: number): void{
        this.amount = amount;
    }

    public getDate(): Date{
        return this.date;
    }

    public setDate(date: Date): void{
        this.date = date;
    }
}