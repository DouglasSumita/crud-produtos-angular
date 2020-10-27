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
  preco: string;
  categorias: Categoria[];
  categoriaId;

  constructor(
    private produtoService: ProdutoService,
    private categoriaService: CategoriaService,
    private activatedRoute: ActivatedRoute,
    private location: Location,
    private router: Router,
  ) { }

  async ngOnInit(): Promise<void> {
    this.id = +this.activatedRoute.snapshot.paramMap.get('id');
    try {
      await this.getCategorias();
    } catch (e) {
      console.log(e.message);
      this.irParaPaginaDeProdutos();
    }
  }

  goBack(): void {
    this.location.back();
  }

  getProduto(): void {
    this.produtoService.getProduto(this.id)
      .subscribe(p => {
        this.produto = this.produtoService.converteProdutoApiParaProdutoComponent(p, this.categorias)
        this.carregaAtributosProduto();
      });
  }

  async getCategorias() {
    await this.categoriaService.getCategorias().subscribe(c => {
      this.categorias = c
      this.getProduto();
    });
  }

  carregaAtributosProduto(): void {
    this.preco = this.produto.preco.toString();
    this.categoriaId = this.produto.categoria.id;
  }

  onSubmit(): void {
    this.atualizarProduto();
    this.irParaPaginaDeProdutos();
  }

  atualizarProduto() {
    const objProduto = {
        id: this.produto.id,
        nome: this.produto.nome,
        descricao: this.produto.descricao,
        preco: parseFloat(this.preco),
        categoriaId: parseInt(this.categoriaId)
    }
    this.produtoService.atualizar(objProduto).subscribe();
  }

  irParaPaginaDeProdutos(): void {
    this.router.navigate(['']);
  }

  deletar(id: number) {
    if (confirm(`Deletar produto id ${id}?`)) {
      this.produtoService.deletar(id).subscribe();
      this.irParaPaginaDeProdutos();
    }
  }
}
