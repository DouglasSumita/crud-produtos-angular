import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Categoria } from '../../../model/categoria';
import { CategoriaService } from './../../../services/categoria/categoria.service';

@Component({
  selector: 'app-editar-categoria',
  templateUrl: './editar-categoria.component.html',
  styleUrls: ['./editar-categoria.component.css']
})
export class EditarCategoriaComponent implements OnInit {

  categoria: Categoria;
  categorias: Categoria[];

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private categoriaService: CategoriaService
  ) { }

  ngOnInit(): void {
    const id = +this.activatedRoute.snapshot.paramMap.get('id');
    this.getCategorias();

    if (!id) {
      this.irParaPaginaDeCategorias();
    } else {
      this.categoria = this.categorias.find(categoria => categoria.id === id);
    }

    if (!this.categoria) {
      this.irParaPaginaDeCategorias();
    }
  }

  onSubmit(): void {
    if (!this.categoria.nome) {
      alert('Nome da categoria inválida!');
    } else {
      this.irParaPaginaDeCategorias();
    }
  }

  getCategorias(): void {
    this.categorias = this.categoriaService.getCategorias();
  }

  irParaPaginaDeCategorias(): void {
    this.router.navigate(['categorias']);
  }

}
