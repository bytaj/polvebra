import { EventBus } from '../../../../Shared/domain/EventBus';
import { Nullable } from '../../../../Shared/domain/Nullable';
import { TransactionId } from '../../../Shared/domain/Transaction/TransactionId';
import Transaction from '../../domain/Transaction';
import TransactionAmount from '../../domain/TransactionAmount';
import TransactionRepository from '../../domain/TransactionRepository';

export class SubTransactionIncrementer {
    constructor(private repository: TransactionRepository, private bus: EventBus) {}

    async run(parentTransactionId: TransactionId, newTransactionId: TransactionId, amount: TransactionAmount) {
        const parentTransaction:Nullable<Transaction> = await this.repository.search(parentTransactionId);

        if (parentTransaction && !(await parentTransaction.hasSubTransaction(newTransactionId))) {
            await parentTransaction.addSubTransaction(newTransactionId, amount);
            if (parentTransaction.overwriteBySubTransaction){
                this.bus.publish(parentTransaction.pullDomainEvents());
                this.repository.update(parentTransactionId, parentTransaction);
            }

        }
    }
}
