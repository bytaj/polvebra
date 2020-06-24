import UserPersistenceAdapter from "./UserPersistenceAdapter";
import AccountPersistenceAdapter from "./AccountPersistenceAdapter";
import TagPersistenceAdapter from "./TagPersistenceAdapter";
import TransactionPersistenceAdapter from "./TransactionPersistenceAdapter";
import PeriodicTransactionPersistenceAdapter from "./PeriodicTransactionPersistenceAdapter";

export default interface PersistenceAdapter{
    getUserAdapter():UserPersistenceAdapter;
    getAccountAdapter():AccountPersistenceAdapter;
    getTagAdapter():TagPersistenceAdapter;
    getTransactionAdapter():TransactionPersistenceAdapter;
    getPeriodicTransactionAdapter():PeriodicTransactionPersistenceAdapter;
}