import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Categoria } from './../../../model/categoria';
import { CategoriaService } from './../../../services/categoria/categoria.service';

@Component({
  selector: 'app-nova-categoria',
  templateUrl: './nova-categoria.component.html',
  styleUrls: ['./nova-categoria.component.css']
})
export class NovaCategoriaComponent implements OnInit {

  categoria: Categoria;
  categorias: Categoria[];

  constructor(
    private categoriaService: CategoriaService,
    private router: Router
  ) { }

  ngOnInit(): void {
    if (!this.categorias) {
      this.categorias = this.categoriaService.getCategorias();
    }
    this.categoria = new Categoria();
    this.categoria.setId(this.categoriaService.getIdLivre());
    this.categoria.setNome('');
  }

  onSubmit(): void {
    this.categoriaService.add(this.categoria);
    this.irParaPaginaDeCategorias();
  }

  irParaPaginaDeCategorias(): void {
    this.router.navigate(['categorias']);
  }
}
