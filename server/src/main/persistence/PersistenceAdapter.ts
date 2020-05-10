import UserPersistenceAdapter from "./UserPersistenceAdapter";
import AccountPersistenceAdapter from "./AccountPersistenceAdapter";
import TagPersistenceAdapter from "./TagPersistenceAdapter";
import DepositPersistenceAdapter from "./DepositPersistenceAdapter";
import OutlayPersistenceAdapter from "./OutlayPersistenceAdapter";

export default interface PersistenceAdapter{
    getUserAdapter():UserPersistenceAdapter;
    getAccountAdapter():AccountPersistenceAdapter;
    getTagAdapter():TagPersistenceAdapter;
    getDepositAdapter():DepositPersistenceAdapter;
    getOutlayAdapter():OutlayPersistenceAdapter;
}