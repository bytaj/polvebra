import { InvalidArgumentError } from '../../../../../src/Contexts/Shared/domain/value-object/InvalidArgumentError';
import { PhoneNumber } from '../../../../../src/Contexts/Shared/domain/value-object/PhoneNumber';

describe('Creation of phone number', () => {
    it("PhoneNumber starting by 6 successfully created",  ()=>{
        const phoneNumber = new PhoneNumber("600000000");
        expect(phoneNumber.value).toEqual("600000000")
    });

    it("PhoneNumber starting by 7 successfully created",  ()=>{
        const phoneNumber = new PhoneNumber("600000000");
        expect(phoneNumber.value).toEqual("600000000")
    });

    it("PhoneNumber don\'t start by 6 or 7",  ()=>{
        expect(() => {new PhoneNumber("200000000")}).toThrow(InvalidArgumentError);
    });

    it("PhoneNumber sort",  ()=>{
        expect(() => {new PhoneNumber("6000000")}).toThrow(InvalidArgumentError);
    });

    it("PhoneNumber long",  ()=>{
        expect(() => {new PhoneNumber("600000000000")}).toThrow(InvalidArgumentError);
    });
});