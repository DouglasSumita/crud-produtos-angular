import { Component, OnInit } from '@angular/core';
import { faEdit, faTrashAlt, faPlusSquare } from '@fortawesome/free-solid-svg-icons';

import { Categoria } from '../../model/categoria';
import { CategoriaService } from '../../services/categoria/categoria.service';
import { ProdutoService } from './../../services/produto/produto.service';

@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.component.html',
  styleUrls: ['./categoria.component.css']
})
export class CategoriaComponent implements OnInit {

  faEdit = faEdit;
  faTrashAlt = faTrashAlt;
  faPlusSquare = faPlusSquare;

  categorias: Categoria[] = [];

  constructor(
    private categoriaService: CategoriaService,
    private produtoService: ProdutoService
  ) { }

  ngOnInit(): void {
    this.getCategorias();
  }

  getCategorias(): void {
    this.categorias = this.categoriaService.getCategorias();
  }

  deletar(categoria: Categoria): void {
    const produtos = this.produtoService.getProdutos();

    if (produtos.find(p => p.categoria.id === categoria.id)) {
      alert('Existe produtos cadastrados com a categoria, não sera possivel deletar!');
    } else {
      this.categorias = this.categorias.filter(c => c.id !== categoria.id);
      this.categoriaService.deletar(categoria.id);
    }
  }
}
