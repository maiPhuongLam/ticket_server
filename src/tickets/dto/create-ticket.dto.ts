import { IsArray, ArrayNotEmpty, ArrayUnique, ValidateNested, registerDecorator, ValidationOptions, ValidationArguments } from 'class-validator';
import { Type } from 'class-transformer';

function IsSeatFormat(validationOptions?: ValidationOptions) {
    return function (object: object, propertyName: string) {
        registerDecorator({
            name: 'isSeatFormat',
            target: object.constructor,
            propertyName: propertyName,
            constraints: [],
            options: validationOptions,
            validator: {
                validate(value: any, args: ValidationArguments) {
                    if (!Array.isArray(value)) return false;
                    const seatRegex = /^[A-Z]-\d+$/;
                    return value.every((seat: any) => typeof seat === 'string' && seatRegex.test(seat));
                },
                defaultMessage(args: ValidationArguments) {
                    return `${args.property} format is invalid. It should be in the format Letter-Number, e.g., A-1`;
                }
            },
        });
    };
}

export class CreateTicketDto {
    @IsArray({ message: 'Seats must be provided as an array' })
    @ArrayNotEmpty({ message: 'Seats array cannot be empty' })
    @ArrayUnique({ message: 'Seats array must contain unique elements' })
    @IsSeatFormat()
    seats: string[];

    constructor(data: Partial<CreateTicketDto>) {
        Object.assign(this, data);
    }
}
