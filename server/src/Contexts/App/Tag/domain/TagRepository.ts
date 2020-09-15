import { Nullable } from '../../../Shared/domain/Nullable';
import { TagId } from '../../Shared/domain/Tag/TagId';
import { UserId } from '../../Shared/domain/User/UserId';
import Tag from './Tag';


export default interface TagRepository{
    save(client: Tag): Promise<void>;

    search(id: TagId): Promise<Nullable<Tag>>;

    searchAll(): Promise<Nullable<Tag[]>>;

    searchAllTagsFromUser(id:UserId): Promise<Nullable<Tag[]>>;

    searchTagsSon(id:TagId): Promise<Nullable<Tag[]>>;

    update(id:TagId, tag:Tag):Promise<void>;
}