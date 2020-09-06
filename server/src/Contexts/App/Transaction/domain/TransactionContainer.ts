import Tag from '../../Tag/domain/Tag';

export default abstract class TransactionContainer {
    private _id?: any;
    private _name: string;
    private _tag: Tag;
    private _amount : number;
    private _date : Date;


    protected constructor(name: string, amount: number, tag?:Tag, date?: Date){
        this._name = name;
        this._amount = amount;
        if(tag){
            this._tag = tag;
        }else{
            this._tag = new Tag("");
        }
        if(date){
            this._date = date;
        }else{
            this._date = new Date();
        }
    }

    get id(): any {
        return this._id;
    }

    set id(value: any) {
        this._id = value;
    }

    get name(): string {
        return this._name;
    }

    set name(value: string) {
        this._name = value;
    }

    get tag(): Tag {
        return this._tag;
    }

    set tag(value: Tag) {
        this._tag = value;
    }

    get amount(): number {
        return this._amount;
    }

    set amount(value: number) {
        this._amount = value;
    }

    get date(): Date {
        return this._date;
    }

    set date(value: Date) {
        this._date = value;
    }
}