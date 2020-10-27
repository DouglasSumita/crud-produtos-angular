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

  async ngOnInit(): Promise<void> {
    this.getCategorias();
    this.getProdutos();

    this.id = await this.produtoService.getIdLivre();
  }

  onSubmit(): void {
    const objProduto = {
      nome: this.nome,
      descricao: this.descricao,
      preco: parseFloat(this.preco),
      categoriaId: parseInt(this.categoriaId)
    }

    this.addProduto(objProduto);
    this.irParaPaginaDeProdutos();
  }

  getProdutos(): void {
    this.produtoService.getProdutos().subscribe(p => this.produtos = p);
  }

  getCategorias(): void {
    this.categoriaService.getCategorias().subscribe(c => this.categorias = c);
  }

  addProduto(produto: Object): void {
    this.produtoService.add(produto).subscribe();
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
