import UserPersistenceAdapter from "../../user/domain/UserPersistenceAdapter";
import AccountPersistenceAdapter from "../../account/domain/AccountPersistenceAdapter";
import TagPersistenceAdapter from "../../tag/domain/TagPersistenceAdapter";
import TransactionPersistenceAdapter from "./TransactionPersistenceAdapter";
import PeriodicTransactionPersistenceAdapter from "./PeriodicTransactionPersistenceAdapter";

export default interface PersistenceAdapter{
    getUserAdapter():UserPersistenceAdapter;
    getAccountAdapter():AccountPersistenceAdapter;
    getTagAdapter():TagPersistenceAdapter;
    getTransactionAdapter():TransactionPersistenceAdapter;
    getPeriodicTransactionAdapter():PeriodicTransactionPersistenceAdapter;
}