import { getPersistenceController } from "../../controllers/PersistenceController";

export default class Tag{
    private id?: any;
    private name : string;
    private description?: string;
    private parentTag?: Tag;

    constructor(name: string, description?:string){
        this.name = name;
        if(description){
            this.description = description;
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

    public getDescription(): string| undefined{
        return this.description;
    }

    public setDescription(description: string): void{
        this.description = description;
    }

    public getParentTag(): Tag | undefined{
        return this.parentTag;
    }

    public setParentTag(parentTag: Tag): void{
        this.parentTag = parentTag;
    }

    public createSonTag(name:string, description?:string):Tag{
        let tagSon:Tag = new Tag(name, description);
        tagSon.setParentTag(this);
        getPersistenceController().getTagAdapter().createTag(tagSon);
        return tagSon;
    }

    public static createTagFromJSON(json:any):Tag{
        let tag:Tag = new Tag(json.name, json.description);
        tag.setId(json._id.valueOf());
        return tag;
    }
}
