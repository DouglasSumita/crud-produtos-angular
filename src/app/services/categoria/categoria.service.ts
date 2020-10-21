import { Injectable } from '@angular/core';

import { Categoria } from './../../model/categoria';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  categorias: Categoria[];

  constructor() { }

  getCategorias(): Categoria[] {
    this.categorias = [];
    this.categorias.push(new Categoria(1, 'Refrigerantes'));
    this.categorias.push(new Categoria(2, 'Hamburgueres'));
    return this.categorias;
  }
}
