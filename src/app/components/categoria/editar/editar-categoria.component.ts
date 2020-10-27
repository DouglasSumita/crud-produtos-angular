import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Categoria } from '../../../model/categoria';
import { CategoriaService } from './../../../services/categoria/categoria.service';
import { ProdutoService } from './../../../services/produto/produto.service';

@Component({
  selector: 'app-editar-categoria',
  templateUrl: './editar-categoria.component.html',
  styleUrls: ['./editar-categoria.component.css']
})
export class EditarCategoriaComponent implements OnInit {

  id: number;
  categoria: Categoria;
  categorias: Categoria[];

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private categoriaService: CategoriaService,
    private produtoService: ProdutoService
  ) { }

  ngOnInit(): void {
    this.id = +this.activatedRoute.snapshot.paramMap.get('id');
    this.getCategoria();
  }

  onSubmit(): void {
    if (!this.categoria.nome) {
      alert('Nome da categoria inválida!');
    } else {
      this.atualizarCategoria()
      this.irParaPaginaDeCategorias();
    }
  }

  atualizarCategoria(): void {
    this.categoriaService.atualizar(this.categoria).subscribe();
  }

  getCategoria(): void {
    this.categoriaService.getCategoria(this.id)
      .subscribe(c => this.categoria = c);
  }

  irParaPaginaDeCategorias(): void {
    this.router.navigate(['categorias']);
  }

  deletar(id: number): void {
    if (confirm(`Deletar categoria id ${id}?`)) {
      this.produtoService.getProdutos()
        .subscribe(produtos => {
          if (produtos.find(p => p.categoriaId === id)) {
            alert(`Existe produtos cadastrados com a categoria id ${id}, não sera possivel deletar!`);
          } else {
            this.categoriaService.deletar(id).subscribe();
          }
        });
    }
  }
}
