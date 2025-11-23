import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { validate as uuidValidate, version as uuidVersion } from 'uuid';

@Injectable()
export class UuidValidationPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    if (!uuidValidate(value) || uuidVersion(value) !== 4) {
      throw new BadRequestException('Validation failed (UUID v4 is expected)');
    }

    return value;
  }
}
