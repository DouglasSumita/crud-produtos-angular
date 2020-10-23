import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';

import { Produto } from './../../../model/produto';
import { Categoria } from './../../../model/categoria';
import { ProdutoService } from './../../../services/produto/produto.service';
import { CategoriaService } from './../../../services/categoria/categoria.service';

@Component({
  selector: 'app-novo-produto',
  templateUrl: './novo-produto.component.html',
  styleUrls: ['./novo-produto.component.css']
})
export class NovoProdutoComponent implements OnInit {

  id: number;
  nome: string = '';
  descricao: string = '';
  preco: string = '0.0';

  categorias: Categoria[];
  categoriaId: string;
  produtos: Produto[];

  constructor(
    private produtoService: ProdutoService,
    private categoriaService: CategoriaService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getCategorias();
    this.getProdutos();

    this.id = this.produtoService.getIdLivre();
  }

  onSubmit(): void {
    const produto: Produto = new Produto();
    produto.setId(this.id);
    produto.setNome(this.nome);
    produto.setDescricao(this.descricao);
    produto.setPreco(parseFloat(this.preco));
    produto.setCategoria(this.getCategoria(parseInt(this.categoriaId)));
    this.addProduto(produto);
    this.irParaPaginaDeProdutos();
  }

  getProdutos(): void {
    this.produtos = this.produtoService.getProdutos();
  }

  getCategorias(): void {
    this.categorias = this.categoriaService.getCategorias();
  }

  addProduto(produto: Produto): void {
    this.produtoService.addProduto(produto);
  }

  async irParaPaginaDeProdutos() {
    await this.router.navigate(['']);
  }

  getCategoria(id: number): Categoria {
    if (!this.categorias.length) {
      this.getCategorias();
    }
    return this.categorias.find(categoria => categoria.id === id);
  }
}
