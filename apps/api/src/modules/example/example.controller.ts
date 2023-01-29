import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common'
import { ApiNotFoundResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger'

import {
  CreateExampleDto,
  GetExampleDto,
  UpdateExampleDto,
} from './example.dto'
import { ExampleService } from './example.service'

@ApiTags('example')
@Controller('example')
export class ExampleController {
  constructor(private readonly exampleService: ExampleService) {}

  @Post()
  createExample(@Body() createExampleDto: CreateExampleDto) {
    return this.exampleService.createExample(createExampleDto)
  }

  @Get()
  @ApiOkResponse({ type: GetExampleDto, isArray: true })
  getAllExample() {
    return this.exampleService.getAllExample()
  }

  @Get(':id')
  @ApiNotFoundResponse({ description: 'Example not found' })
  @ApiOkResponse({ type: GetExampleDto })
  getExampleById(@Param('id') id: number) {
    return this.exampleService.getExampleById(+id)
  }

  @Put(':id')
  @ApiNotFoundResponse({ description: 'Example not found' })
  @ApiOkResponse({ type: UpdateExampleDto })
  updateExample(
    @Param('id') id: number,
    @Body() updateExampleDto: UpdateExampleDto,
  ) {
    return this.exampleService.updateExample(+id, updateExampleDto)
  }

  @Delete(':id')
  @ApiNotFoundResponse({ description: 'Example not found' })
  @ApiOkResponse({ type: GetExampleDto })
  deleteExample(@Param('id') id: number) {
    return this.exampleService.deleteExample(+id)
  }
}
