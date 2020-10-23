import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProdutoComponent } from './components/produto/produto.component';
import { CategoriaComponent } from './components/categoria/categoria.component';
import { EditarProdutoComponent } from './components/produto/editar/editar-produto.component';
import { NovoProdutoComponent } from './components/produto/novo/novo-produto.component';
import { EditarCategoriaComponent } from './components/categoria/editar/editar-categoria.component';
import { NovaCategoriaComponent } from './components/categoria/nova/nova-categoria.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'produtos',
    pathMatch: 'full'
  },
  {
    path: 'produtos',
    component: ProdutoComponent
  },
  {
    path: 'categorias',
    component: CategoriaComponent
  },
  {
    path: 'produtos/editar/:id',
    component: EditarProdutoComponent
  },
  {
    path: 'produtos/novo',
    component: NovoProdutoComponent
  },
  {
    path: 'categorias/editar/:id',
    component: EditarCategoriaComponent
  },
  {
    path: 'categorias/novo',
    component: NovaCategoriaComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
