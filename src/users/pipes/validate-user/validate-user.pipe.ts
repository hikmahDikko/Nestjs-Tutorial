import { ArgumentMetadata, HttpException, HttpStatus, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class ValidateUserPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    console.log('Inside validate User')
    console.log(value);
    console.log(metadata);

    const parseAgeToInt = parseInt(value.age.toString());

    if(isNaN(parseAgeToInt)) {
      console.log(`${value.age} is not a number`);
      throw new HttpException('Invalid age input', HttpStatus.BAD_REQUEST);
    }else {
      return {...value, age : parseAgeToInt}
    }
    return value;
  }
}
