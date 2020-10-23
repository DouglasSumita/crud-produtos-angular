import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

import { Produto } from './../../../model/produto';
import { Categoria } from './../../../model/categoria';
import { ProdutoService } from './../../../services/produto/produto.service';
import { CategoriaService } from './../../../services/categoria/categoria.service';

@Component({
  selector: 'app-editar-produto',
  templateUrl: './editar-produto.component.html',
  styleUrls: ['./editar-produto.component.css']
})
export class EditarProdutoComponent implements OnInit {

  @Input() produto: Produto;

  id: number;
  nome: string;
  descricao: string;
  preco: string;
  categorias: Categoria[];
  categoriaId: number;

  constructor(
    private produtoService: ProdutoService,
    private categoriaService: CategoriaService,
    private activatedRoute: ActivatedRoute,
    private location: Location,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.id = +this.activatedRoute.snapshot.paramMap.get('id');
    this.getProduto();

    if (!this.id || !this.produto) {
      this.irParaPaginaDeProdutos();
    } else {
      this.carregaAtributosProduto();
      this.getCategorias();
    }
  }

  goBack(): void {
    this.location.back();
  }

  getProduto(): void {
    this.produto = this.produtoService.getProduto(this.id);
  }

  getCategorias(): void {
    this.categorias = this.categoriaService.getCategorias();
  }

  carregaAtributosProduto(): void {
    this.nome = this.produto.nome;
    this.descricao = this.produto.descricao;
    this.preco = this.produto.preco.toString();
    this.categoriaId = this.produto.categoria.id;
  }

  onSubmit(): void {
    this.gravarProduto(this.produto);
    this.irParaPaginaDeProdutos();
  }

  gravarProduto(produto: Produto) {
    this.produto.nome = this.nome;
    this.produto.descricao = this.descricao;
    this.produto.preco = parseFloat(this.preco);
    this.produto.categoria = this.categorias.find(categoria => categoria.id == this.categoriaId);
  }

  irParaPaginaDeProdutos(): void {
    this.router.navigate(['']);
  }
}
