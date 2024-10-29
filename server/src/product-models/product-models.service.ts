import {
  BadRequestException,
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ProductModelsRepository } from './product-models.repository';
import { ProductModelDto } from './dto/productModelsDto';
import { CategoriesService } from 'src/categories/categories.service';
import { ProductsService } from 'src/products/products.service';
import { Schema } from 'mongoose';

@Injectable()
export class ProductModelsService {
  constructor(
    private readonly productModelsRepository: ProductModelsRepository,
    private readonly categoriesService: CategoriesService,
    @Inject(forwardRef(() => ProductsService))
    private readonly productsService: ProductsService,
  ) {}

  async createProductModel(createProductModelDto: ProductModelDto) {
    const product = await this.productsService.findProductByIdWithoutPopulate(
      createProductModelDto.product,
    );

    if (
      createProductModelDto.category.toString() !== product.category.toString()
    )
      throw new BadRequestException('categories do not match');

    const category =
      await this.categoriesService.findCategoryByIdWithoutPopulate(
        createProductModelDto.category,
      );

    if (!category?.productVariantsSchema.length) {
      return await this.productModelsRepository.createProductModel(
        createProductModelDto,
      );
    }

    const allowedFields = category.productVariantsSchema.map(
      (variant) => variant.variantName,
    );

    for (const productModel of createProductModelDto.productModels) {
      const additionalFieldsKeys = Object.keys(
        productModel.additionalFields || {},
      );

      const invalidFields = additionalFieldsKeys.filter(
        (key) => !allowedFields.includes(key),
      );

      if (invalidFields.length) {
        throw new BadRequestException(
          `Invalid fields: ${invalidFields.join(', ')}. Allowed fields: ${allowedFields.join(', ')}`,
        );
      }

      for (const productVariant of category.productVariantsSchema) {
        const modelValue =
          productModel.additionalFields?.[productVariant.variantName];

        if (!productVariant.optional && !modelValue) {
          throw new BadRequestException(
            `Missing required field: ${productVariant.variantName}`,
          );
        }

        if (modelValue && productVariant.variantOptions?.length) {
          if (!productVariant.variantOptions.includes(modelValue)) {
            throw new BadRequestException(
              `Invalid value for ${productVariant.variantName}. Allowed values: ${productVariant.variantOptions.join(
                ', ',
              )}`,
            );
          }
        }
      }
    }

    return await this.productModelsRepository.createProductModel(
      createProductModelDto,
    );
  }

  async updateProductModel(
    id: Schema.Types.ObjectId,
    modelId: Schema.Types.ObjectId,
    updateProductModelDto: ProductModelDto,
  ) {
    const existingProductModel = await this.findProductModelsById(id);

    if (!existingProductModel) {
      throw new NotFoundException('Product model not found');
    }

    const product = await this.productsService.findProductByIdWithoutPopulate(
      updateProductModelDto.product,
    );

    if (
      updateProductModelDto.category.toString() !== product.category.toString()
    ) {
      throw new BadRequestException('categories do not match');
    }

    const category =
      await this.categoriesService.findCategoryByIdWithoutPopulate(
        updateProductModelDto.category,
      );

    if (!category?.productVariantsSchema.length) {
      return await this.productModelsRepository.updateProductModel(
        id,
        modelId,
        updateProductModelDto,
      );
    }

    const allowedFields = category.productVariantsSchema.map(
      (variant) => variant.variantName,
    );

    for (const productModel of updateProductModelDto.productModels) {
      const additionalFieldsKeys = Object.keys(
        productModel.additionalFields || {},
      );

      const invalidFields = additionalFieldsKeys.filter(
        (key) => !allowedFields.includes(key),
      );

      if (invalidFields.length) {
        throw new BadRequestException(
          `Invalid fields: ${invalidFields.join(', ')}. Allowed fields: ${allowedFields.join(', ')}`,
        );
      }

      for (const productVariant of category.productVariantsSchema) {
        const modelValue =
          productModel.additionalFields?.[productVariant.variantName];

        if (!productVariant.optional && !modelValue) {
          throw new BadRequestException(
            `Missing required field: ${productVariant.variantName}`,
          );
        }

        if (modelValue && productVariant.variantOptions?.length) {
          if (!productVariant.variantOptions.includes(modelValue)) {
            throw new BadRequestException(
              `Invalid value for ${productVariant.variantName}. Allowed values: ${productVariant.variantOptions.join(
                ', ',
              )}`,
            );
          }
        }
      }
    }

    return await this.productModelsRepository.updateProductModel(
      id,
      modelId,
      updateProductModelDto,
    );
  }

  async findProductModelsById(id: Schema.Types.ObjectId) {
    const productModel =
      await this.productModelsRepository.findProductModelsById(id);

    if (!productModel)
      throw new NotFoundException('product model is not found');

    return productModel;
  }

  async findProductModel(
    productModelsId: Schema.Types.ObjectId,
    productModelId: Schema.Types.ObjectId,
  ) {
    return await this.productModelsRepository.findProductModel(
      productModelsId,
      productModelId,
    );
  }

  async deleteProductModelById(id: Schema.Types.ObjectId) {
    const deletedModel =
      await this.productModelsRepository.deleteProductModelById(id);

    if (!deletedModel) throw new NotFoundException('product model not found');

    return deletedModel;
  }

  async decreaseProductCountByItemId(
    productModelId: Schema.Types.ObjectId,
    itemId: Schema.Types.ObjectId,
    decreaseAmount: number,
  ): Promise<void> {
    await this.productModelsRepository.decreaseProductCountByItemId(
      productModelId,
      itemId,
      decreaseAmount,
    );
  }

  async mostDiscountProducts(limit: number) {
    return await this.productModelsRepository.findModelsByFilter([
      {
        $unwind: '$productModels',
      },
      {
        $sort: { 'productModels.discount': -1 },
      },
      {
        $limit: limit || 20,
      },
      {
        $group: {
          _id: null,
          products: { $push: '$product' },
        },
      },
      {
        $project: { _id: 0 },
      },
      {
        $unwind: '$products',
      },
      {
        $lookup: {
          from: 'products',
          localField: 'products',
          foreignField: '_id',
          as: 'product',
        },
      },
      {
        $project: { products: 0 },
      },
      {
        $match: { product: { $ne: [] } },
      },
      {
        $project: {
          product: { $arrayElemAt: ['$product', 0] },
        },
      },
      {
        $replaceRoot: { newRoot: '$product' },
      },
      {
        $lookup: {
          from: 'productmodels',
          localField: '_id',
          foreignField: 'product',
          as: 'models',
        },
      },
    ]);
  }
}
