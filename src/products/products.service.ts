import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductsService {
  private products: Product[] = [
    {
      id: 1,
      name: 'Teclado',
      price: 100,
    },
    {
      id: 2,
      name: 'Monitor',
      price: 300,
    },
  ];

  create(createProductDto: CreateProductDto) {
    const { name, price } = createProductDto;

    const product: Product = {
      id: new Date().getTime() + 10,
      name,
      price,
    };

    this.products.unshift(product);

    return product;
  }

  findAll() {
    return this.products;
  }

  findOne(id: number): Product {
    const product = this.products.find((product) => product.id === id);
    if (!product) {
      throw new NotFoundException(`Producto #id: ${id} no encontrado`);
    }

    return product;
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    const { id: _, name, price } = updateProductDto;

    const product = this.findOne(id);

    const updateProduct = {
      id: id,
      name: name ?? product.name,
      price: price ?? product.price,
    };

    this.products = this.products.map((product) => {
      if (product.id === id) {
        return updateProduct;
      }
      return product;
    });

    return updateProduct;
  }

  remove(id: number) {
    const deleteProduct = this.findOne(id);
    this.products = this.products.filter((product) => product.id != id);
    return deleteProduct;
  }
}
