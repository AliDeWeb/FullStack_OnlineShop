import {
  BadRequestException,
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateProductDto } from './dto/createProduct.dto';
import { ProductsRepository } from './products.repository';
import { Schema } from 'mongoose';
import { deleteFile } from 'src/utilities/funcs/delete-file';
import { UpdateProductDto } from './dto/updateProduct.dto';
import { BrandsService } from 'src/brands/brands.service';
import { ProductModelsService } from '../product-models/product-models.service';
import { DeleteImageDto } from './dto/deleteImage.dto';

@Injectable()
export class ProductsService {
  constructor(
    private readonly ProductsRepository: ProductsRepository,
    @Inject(forwardRef(() => ProductModelsService))
    private readonly ProductModelsService: ProductModelsService,
    private readonly BrandsService: BrandsService,
  ) {}

  async createProduct(productData: CreateProductDto) {
    if (productData?.brand) {
      const brand = await this.BrandsService.findBrandById(productData?.brand);

      if (brand?.allowedCategories?.length) {
        const ids = Array.from(brand.allowedCategories, (item) =>
          (item as any)._id.toString(),
        );

        if (!ids.includes(productData.category))
          throw new BadRequestException('brand and category are not related');
      }
    }

    return await this.ProductsRepository.createProduct(productData);
  }

  async deleteProduct(id: Schema.Types.ObjectId) {
    const product = await this.ProductsRepository.findProductById(id);

    if (!product) throw new NotFoundException('product is not found');

    const productImagesPath = product.images;

    const result = await this.ProductsRepository.deleteProduct(id);

    if (!result) throw new BadRequestException('product does not exist');

    for (const el of productImagesPath) {
      await deleteFile(`static/${el}`);
    }

    return result;
  }

  async findAllProducts(queryObj: any) {
    return await this.ProductsRepository.findAllProducts(queryObj);
  }

  async findProductById(id: Schema.Types.ObjectId) {
    const product = await this.ProductsRepository.findProductById(id);

    if (!product) throw new NotFoundException('the product is not found');

    await this.updateProductsView(id);

    return product;
  }

  async updateProductsView(id: Schema.Types.ObjectId) {
    await this.ProductsRepository.updateProductsView(id);
  }

  async updateProductsSold(ids: Schema.Types.ObjectId[]) {
    return await this.ProductsRepository.updateProductsSold(ids);
  }

  async findProductByIdWithoutPopulate(id: Schema.Types.ObjectId) {
    const product =
      await this.ProductsRepository.findProductByIdWithoutPopulate(id);

    if (!product) throw new NotFoundException('the product is not found');

    return product;
  }

  async updateProduct(
    id: Schema.Types.ObjectId,
    productData: UpdateProductDto,
    images?: string[],
  ) {
    const prevProductData = await this.ProductsRepository.findProductById(id);

    if (!prevProductData) throw new NotFoundException('product is not found');

    if (!productData?.details) productData.details = [];

    const product = await this.ProductsRepository.updateProduct(
      id,
      productData,
      images,
    );

    if (!product) throw new NotFoundException('the product is not found');

    return product;
  }

  async deleteProductImages(
    id: Schema.Types.ObjectId,
    DeleteImageDto: DeleteImageDto,
  ) {
    const data = await this.ProductsRepository.deleteProductImages(
      id,
      DeleteImageDto.imagesUrl,
    );

    if (!data) throw new NotFoundException('the product is not found');

    for (const el of DeleteImageDto.imagesUrl) {
      await deleteFile(`static/${el}`);
    }

    return data;
  }

  async getProductsData() {
    return await this.ProductsRepository.findProductsByFilter([
      {
        $group: {
          _id: null,
          count: { $sum: 1 },
          views: { $sum: '$view' },
          sales: { $sum: '$sold' },
        },
      },
      { $project: { _id: 0 } },
    ]);
  }

  async changeProductActiveStatus(
    isActive: boolean,
    id: Schema.Types.ObjectId,
  ) {
    return await this.ProductsRepository.changeProductActiveStatus(
      isActive,
      id,
    );
  }

  async mostDiscountProducts(limit: number) {
    return await this.ProductModelsService.mostDiscountProducts(limit);
  }
}
