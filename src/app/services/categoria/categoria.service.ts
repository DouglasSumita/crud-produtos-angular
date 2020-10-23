import { Injectable } from '@angular/core';

import { Categoria } from './../../model/categoria';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  categorias: Categoria[] = [];

  constructor() { }

  getCategorias(): Categoria[] {
    if (!this.categorias.length) {
      this.categorias.push(new Categoria(1, 'Refrigerantes'));
      this.categorias.push(new Categoria(2, 'Hamburgueres'));
    }
    return this.categorias;
  }

  deletar(categoria: number | Categoria): void {
    const id = (typeof categoria === 'number') ? categoria : categoria.id;
    this.categorias = this.categorias.filter(categoria => categoria.id === id);
  }

  gravar(categoria: Categoria): void {
    this.categorias.forEach((c => {
      if (c.id === categoria.id) {
        c = categoria;
      }
    }))
  }

  getIdLivre(): number {
    const categorias: Categoria[] = this.categorias;
    let nextId: number = 1;

    while (categorias.find(c => c.id === nextId)) {
      nextId++;
    }
    return nextId;
  }

  add(categoria: Categoria): void {
    this.categorias.push(categoria);
  }
}
