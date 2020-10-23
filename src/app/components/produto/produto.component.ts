import { Component, OnInit } from '@angular/core';
import { faEdit, faTrashAlt, faPlusSquare } from '@fortawesome/free-solid-svg-icons';

import { ProdutoService } from '../../services/produto/produto.service';
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

  deletar(produto: Produto) {
    this.produtos = this.produtos.filter(p => p.id != produto.id);
    this.produtoService.deletar(produto.id);
  }
}
