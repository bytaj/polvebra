export default class Tag{
    private name : string;
    private description?: string;
    private parentTag?: Tag;

    constructor(name: string, description?:string){
        this.name = name;
        if(description){
            this.description = description;
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
}
