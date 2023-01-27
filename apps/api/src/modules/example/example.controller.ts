import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common'

import { CreateExampleDto } from './example.dto'
import { ExampleService } from './example.service'

@Controller('example')
export class ExampleController {
  constructor(private readonly exampleService: ExampleService) {}

  @Post()
  createExample(@Body() createExampleDto: CreateExampleDto) {
    return this.exampleService.createExample(createExampleDto)
  }

  @Get()
  getAllExample() {
    return this.exampleService.getAllExample()
  }
}
