import { Injectable } from '@angular/core';

import { Produto } from '../../model/produto';
import { Categoria } from '../../model/categoria';

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {

  produtos: Produto[] = [];

  constructor() { }

  getProdutos(): Produto[] {
    this.produtos = [];
    this.produtos.push(new Produto(1, "Hambúrguer", "Pão, bife de hambúrguer 90g, salada e batata.", 8.5));
    this.produtos.push(new Produto(2, "X-Búrguer", "Pão, bife de hambúrguer 90g, 1 fatia de queijo, salada e batata.", 8.5));
    this.produtos.push(new Produto(3, "Coca cola 350ml", "", 5.5));
    return this.produtos;
  }

  addProduto(produto: Produto): Produto[] {
    this.produtos.push(produto);
    return this.produtos;
  }

  getIdLivre(): number {

    const produtos: Produto[] = this.produtos;
    let nextId: number = 1;

    while (produtos.filter((produto) => produto.id === nextId).length) {
      nextId++;
    }

    return nextId;
  }
}
