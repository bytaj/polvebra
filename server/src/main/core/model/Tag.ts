export default class Tag{
    private name : string;
    private parentTag?: Tag;

    constructor(name: string){
        this.name = name;
    }

    public getName(): string{
        return this.name;
    }

    public setName(name: string): void{
        this.name = name;
    }

    public getParentTag(): Tag | undefined{
        return this.parentTag;
    }

    public setParentTag(parentTag: Tag): void{
        this.parentTag = parentTag;
    }
}
