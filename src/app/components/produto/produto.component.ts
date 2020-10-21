import { Component, OnInit } from '@angular/core';
import { ProdutoService } from './../../services/produto/produto.service';
import { faEdit, faTrashAlt, faPlusSquare } from '@fortawesome/free-solid-svg-icons';

import { Produto } from '../../model/produto';
@Component({
  selector: 'app-produto',
  templateUrl: './produto.component.html',
  styleUrls: ['./produto.component.css']
})
export class ProdutoComponent implements OnInit {

  faEdit = faEdit;
  faTrashAlt = faTrashAlt;
  faPlusSquare = faPlusSquare;

  produtos: Produto[];

  constructor(private produtoService: ProdutoService) { }

  ngOnInit(): void {
    this.getProdutos()
  }

  getProdutos(): void {
    this.produtos = this.produtoService.getProdutos();
  }

  addProduto(): void {
    const produto = new Produto();
    produto.setId(this.produtoService.getIdLivre());
    produto.setNome('Teste');
    produto.setDescricao('Teste');
    produto.setPreco(2.99);

    this.produtos = this.produtoService.addProduto(produto);
    console.log(this.produtos);
  }
}
