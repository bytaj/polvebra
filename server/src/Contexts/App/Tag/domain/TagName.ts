import { InvalidArgumentError } from '../../../Shared/domain/value-object/InvalidArgumentError';
import { StringValueObject } from '../../../Shared/domain/value-object/StringValueObject';

export class TagName extends StringValueObject {
    constructor(value: string) {
        super(value);
        //this.nameFormatIsCorrect(value);
    }

    private nameFormatIsCorrect(value: string): void {
        if (!value.includes(' ')) {
            throw new InvalidArgumentError(`The name <${value}> must have at least two names`);
        }
    }


}