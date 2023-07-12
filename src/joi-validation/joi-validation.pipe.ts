import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  Paramtype,
  PipeTransform,
} from '@nestjs/common';
import { ObjectSchema } from 'joi';

@Injectable()
export class JoiValidationPipe implements PipeTransform {
  constructor(private schema: ObjectSchema) {}

  transform(value: any, metadata: ArgumentMetadata) {
    if (!this.mustValidate(metadata.type)) {
      return value;
    }

    const { error } = this.schema.validate(value);
    if (error) {
      throw new BadRequestException(error.message);
    }

    return value;
  }

  private mustValidate(type: Paramtype): boolean {
    return type === 'body';
  }
}
