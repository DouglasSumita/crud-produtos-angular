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

/* Icon */
  faEdit = faEdit;
  faTrashAlt = faTrashAlt;
  faPlusSquare = faPlusSquare;

/* Paginate */
  page: number = 1;
  itemsPerPage: number = 10;

  categorias: Categoria[] = [];

  constructor(
    private categoriaService: CategoriaService,
    private produtoService: ProdutoService
  ) { }

  ngOnInit(): void {
    this.getCategorias();
  }

  getCategorias(): void {
    this.categoriaService.getCategorias().subscribe(c => this.categorias = c);
  }

  deletar(id: number): void {
    if (confirm(`Deletar categoria id ${id}?`)) {
      this.produtoService.getProdutos()
        .subscribe(produtos => {
          if (produtos.find(p => p.categoriaId === id)) {
            alert(`Existe produtos cadastrados com a categoria id ${id}, não sera possivel deletar!`);
          } else {
            this.categoriaService.deletar(id).subscribe(_ => this.getCategorias());
          }
        });
    }
  }

}
