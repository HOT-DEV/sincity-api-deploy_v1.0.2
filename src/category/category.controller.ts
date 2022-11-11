import { Controller, Get, Post, All } from '@nestjs/common';
import { CategoryService } from './category.service';
import { Category } from '../interfaces';

@Controller('category')
export class CategoryController {
    constructor(private readonly categoryService: CategoryService) {}

    @All('/getCategoryAll')
    async getAll(): Promise<any> {
        return await this.categoryService.getCategoryAll();        
    }
}