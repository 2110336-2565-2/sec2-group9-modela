import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common'
import {
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger'

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
  @ApiOperation({ summary: 'create example' })
  @ApiCreatedResponse({ type: GetExampleDto })
  createExample(@Body() createExampleDto: CreateExampleDto) {
    return this.exampleService.createExample(createExampleDto)
  }

  @Get()
  @ApiOperation({ summary: 'get all examples' })
  @ApiOkResponse({ type: GetExampleDto, isArray: true })
  getAllExample() {
    return this.exampleService.getAllExample()
  }

  @Get(':id')
  @ApiOperation({ summary: 'get example by id' })
  @ApiNotFoundResponse({ description: 'Example not found' })
  @ApiOkResponse({ type: GetExampleDto })
  getExampleById(@Param('id') id: number) {
    return this.exampleService.getExampleById(+id)
  }

  @Put(':id')
  @ApiOperation({ summary: 'update example by id' })
  @ApiNotFoundResponse({ description: 'Example not found' })
  @ApiOkResponse({ type: GetExampleDto })
  updateExample(
    @Param('id') id: number,
    @Body() updateExampleDto: UpdateExampleDto,
  ) {
    return this.exampleService.updateExample(+id, updateExampleDto)
  }

  @Delete(':id')
  @ApiOperation({ summary: 'delete example by id' })
  @ApiNotFoundResponse({ description: 'Example not found' })
  @ApiOkResponse({ type: GetExampleDto })
  deleteExample(@Param('id') id: number) {
    return this.exampleService.deleteExample(+id)
  }
}
