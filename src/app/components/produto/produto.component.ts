import { Component, OnInit } from '@angular/core';
import { faEdit, faTrashAlt, faPlusSquare } from '@fortawesome/free-solid-svg-icons';

import { Categoria } from '../../model/categoria';
import { Produto } from '../../model/produto';
import { ProdutoService } from '../../services/produto/produto.service';
import { CategoriaService } from './../../services/categoria/categoria.service';

@Component({
  selector: 'app-produto',
  templateUrl: './produto.component.html',
  styleUrls: ['./produto.component.css']
})
export class ProdutoComponent implements OnInit {

  faEdit = faEdit;
  faTrashAlt = faTrashAlt;
  faPlusSquare = faPlusSquare;

  page: number = 1;
  itemsPerPage: number = 10;

  produtos: Produto[];
  categorias: Categoria[];

  constructor(
    private produtoService: ProdutoService,
    private categoriaService: CategoriaService
  ) { }

  ngOnInit(): void {
    this.getCategorias();
  }

  getProdutos(): void {
    this.produtoService.getProdutos().subscribe(p => this.produtos = this.produtoService.converteProdutosApiParaProdutosComponent(p, this.categorias));
  }

  getCategorias(): void {
    this.categoriaService.getCategorias().subscribe((c) => {
      this.categorias = c
      this.getProdutos();
    })
  }

  deletar(id: number) {
    if (confirm(`Deletar produto id ${id}?`)) {
      this.produtoService.deletar(id).subscribe(_ => this.getProdutos());
    }
  }
}
