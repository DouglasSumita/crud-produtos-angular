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
    if (!this.produtos.length) {
      this.produtos.push(new Produto(1, "Hambúrguer", "Pão, bife de hambúrguer 90g, salada e batata.", 8.5, new Categoria(1, 'Hamburgueres')));
      this.produtos.push(new Produto(2, "X-Búrguer", "Pão, bife de hambúrguer 90g, 1 fatia de queijo, salada e batata.", 8.5, new Categoria(1, 'Hamburgueres')));
      this.produtos.push(new Produto(3, "Coca cola 350ml", "", 5.5, new Categoria(2, 'Refrigerantes')));
    }
    return this.produtos;
  }

  getProduto(id: number): Produto {
    const produto = this.produtos.find(produto => produto.id === id);
    return produto;
  }

  addProduto(produto: Produto): Produto[] {
    this.produtos.push(produto);
    return this.produtos;
  }

  getIdLivre(): number {
    const produtos: Produto[] = this.produtos;
    let nextId: number = 1;

    while (produtos.find(produto => produto.id === nextId)) {
      nextId++;
    }
    return nextId;
  }

  deletar(produto: number | Produto): void {
    const id = (typeof produto === 'number') ? produto : produto.id;
    this.produtos = this.produtos.filter((produto) => produto.id != id);
  }

  gravar(produto: Produto): void {
    this.produtos.forEach(p => {
      if (produto.id === p.id) {
        p = produto;
      }
    })
  }
}
