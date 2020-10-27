import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Produto } from '../../model/produto';
import { CategoriaService } from './../categoria/categoria.service';
import { NumeroUtil } from '../../../util/numero';

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {

  urlApi: string = 'api/produtos';
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(
    private http: HttpClient,
    private categoriaService: CategoriaService
  ) { }

  async getIdLivre(): Promise<number> {
    let idLivre: number;
    await this.getProdutos()
      .toPromise()
      .then(produtos => {
        idLivre = 1;
        if (produtos.length) {
          idLivre = produtos.map(p => p.id)
            .sort((a, b) => NumeroUtil.comparar(a, b))
            .reverse()[0] + 1;
        }
      })
      .catch(e => {
        console.error(e)
      });

    return idLivre;
  }

  getProduto(id: number): Observable<Produto> {
    return this.http.get<Produto>(`${this.urlApi}/${id}`)
    .pipe(
      tap(_ => console.log(`Buscando produto id ${id}`)),
      catchError(this.handleError<Produto>('getProduto'))
    );
  }

  getProdutos(): Observable<any[]> {
    return this.http.get<Produto[]>(this.urlApi)
      .pipe(
        tap(_ => console.log('Buscando produtos...')),
        catchError(this.handleError<Produto[]>('getProdutos', []))
    );
  }

  add(produto: Object): Observable<Produto> {
    return this.http.post<Produto>(this.urlApi, produto, this.httpOptions)
      .pipe(
        tap((novoProduto) => console.log(`Adicionando novo produto ${novoProduto.nome}`)),
        catchError(this.handleError<Produto>('postProduto'))
      );
  }

  atualizar(objProduto): Observable<Produto> {
    const url = `${this.urlApi}/${objProduto.id}`
    return this.http.put<Produto>(url, objProduto, this.httpOptions)
      .pipe(
        tap(_ => console.log(`Atualizando produto id ${objProduto.id}`),
        catchError(this.handleError<Produto>('atualizar')))
      )
  }

  deletar(id: number): Observable<Produto> {
    return this.http.delete<Produto>(`${this.urlApi}/${id}`)
      .pipe(
        tap(_ => console.log(`Deletando produto id ${id}`)),
        catchError(this.handleError<Produto>('deletar'))
      );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);

    };
  }

  converteProdutosApiParaProdutosComponent(produtos, categorias): Produto[] {
    return produtos.map(p => this.converteProdutoApiParaProdutoComponent(p, categorias));
  }

  converteProdutoApiParaProdutoComponent(produto, categorias): Produto {
    return new Produto(produto.id, produto.nome, produto.descricao, produto.preco, categorias.find(c => c.id === produto.categoriaId));
  }
}
