import { Definition } from 'node-dependency-injection';
import { DomainEvent } from '../../Contexts/Shared/domain/DomainEvent';
import { DomainEventSubscriber } from '../../Contexts/Shared/domain/DomainEventSubscriber';
import { InMemoryAsyncEventBus } from '../../Contexts/Shared/infrastructure/EventBus/InMemoryAsyncEventBus';
import container from './config/dependency-injection';

export function registerSubscribers() {
    const eventBus = container.get('Mooc.shared.EventBus') as InMemoryAsyncEventBus;
    const subscriberDefinitions = container.findTaggedServiceIds('domainEventSubscriber') as Map<String, Definition>;
    const subscribers: Array<DomainEventSubscriber<DomainEvent>> = [];

    subscriberDefinitions.forEach((value: any, key: any) => subscribers.push(container.get(key)));
    eventBus.addSubscribers(subscribers);
}
