import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common'
import { ApiNotFoundResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger'

import { CreateExampleDto, getExampleDto } from './example.dto'
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
  @ApiOkResponse({ type: getExampleDto, isArray: true })
  getAllExample() {
    return this.exampleService.getAllExample()
  }

  @Get(':id')
  @ApiNotFoundResponse({ description: 'Example not found' })
  @ApiOkResponse({ type: getExampleDto })
  getExampleById(@Param('id') id: number) {
    return this.exampleService.getExampleById(+id)
  }

  @Put(':id')
  @ApiNotFoundResponse({ description: 'Example not found' })
  @ApiOkResponse({ type: getExampleDto })
  updateExample(
    @Param('id') id: number,
    @Body() updateExampleDto: CreateExampleDto,
  ) {
    return this.exampleService.updateExample(+id, updateExampleDto)
  }

  @Delete(':id')
  @ApiNotFoundResponse({ description: 'Example not found' })
  @ApiOkResponse({ type: getExampleDto })
  deleteExample(@Param('id') id: number) {
    return this.exampleService.deleteExample(+id)
  }
}
