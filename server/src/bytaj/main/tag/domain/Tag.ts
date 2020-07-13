import { getPersistenceController } from "../../shared/application/PersistenceController";

export default class Tag{
    private _id?: any;
    private _name : string;
    private _description?: string;
    private _parentTag?: Tag;

    constructor(name: string, description?:string){
        this._name = name;
        if(description){
            this._description = description;
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

    get description(): string {
        return <string>this._description;
    }

    set description(value: string) {
        this._description = value;
    }

    get parentTag(): Tag {
        return <Tag>this._parentTag;
    }

    set parentTag(value: Tag) {
        this._parentTag = value;
    }

    public async createSonTag(name:string, description?:string):Promise<Tag>{
        let tagSon:Tag = new Tag(name, description);
        tagSon.parentTag = this;
        await getPersistenceController().getTagAdapter().createTag(tagSon);
        return tagSon;
    }

    public static createTagFromJSON(json:any):Tag{
        let tag:Tag = new Tag(json._name, json._description);
        tag.id = json._id.valueOf();
        return tag;
    }
}
