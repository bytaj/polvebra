import UserRepository from "../../User/domain/UserRepository";
import AccountPersistenceAdapter from "../../Account/domain/AccountPersistenceAdapter";
import TagPersistenceAdapter from "../../tag/domain/TagPersistenceAdapter";
import TransactionPersistenceAdapter from "./TransactionPersistenceAdapter";
import PeriodicTransactionPersistenceAdapter from "./PeriodicTransactionPersistenceAdapter";

export default interface PersistenceAdapter{
    getUserAdapter():UserRepository;
    getAccountAdapter():AccountPersistenceAdapter;
    getTagAdapter():TagPersistenceAdapter;
    getTransactionAdapter():TransactionPersistenceAdapter;
    getPeriodicTransactionAdapter():PeriodicTransactionPersistenceAdapter;
}