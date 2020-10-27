import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Categoria } from './../../model/categoria';
import { NumeroUtil } from './../../../util/numero';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  urlApi = 'api/categorias';
  httpOptions = {
    headers: new HttpHeaders({
      'Content-type': 'Application/json'
    })
  }

  constructor(
    private http: HttpClient
  ) { }

  getCategorias(): Observable<Categoria[]> {
    return this.http.get<Categoria[]>(this.urlApi)
      .pipe(
        tap(_ => console.log('Buscando categorias')),
        catchError(this.handleError<Categoria[]>('getCategorias', []))
      )
  }

  getCategoria(id: number): Observable<Categoria> {
    return this.http.get<Categoria>(`${this.urlApi}/${id}`)
      .pipe(
        tap(_ => console.log(`Buscando categoria id ${id}`)),
        catchError(this.handleError<Categoria>('getCategoria'))
      )
  }

  atualizar(categoria: Categoria): Observable<Categoria> {
    return this.http.put<Categoria>(`${this.urlApi}/${categoria.id}`, categoria, this.httpOptions)
      .pipe(
        tap(_ => console.log(`Atualizando categoria id ${categoria.id}`)),
        catchError(this.handleError<Categoria>('putCategoria'))
      );
  }

  deletar(id: number): Observable<Categoria> {
    return this.http.delete<Categoria>(`${this.urlApi}/${id}`)
      .pipe(
        tap(_ => console.log(`Deletando produto id ${id}`)),
        catchError(this.handleError<Categoria>('deleteCategoria'))
      );
  }

  add(categoria: Categoria): Observable<Categoria> {
    return this.http.post<Categoria>(this.urlApi, categoria, this.httpOptions)
      .pipe(
        tap(_ => console.log(`Adicionando categoria`)),
        catchError(this.handleError<Categoria>('postCategoria'))
      )
  }
  async getIdLivre(): Promise<number> {
    let idLivre: number;
    await this.getCategorias()
      .toPromise()
      .then(categorias => {
        idLivre = 1;
        if (categorias.length) {
          idLivre = categorias.map(p => p.id)
            .sort((a, b) => NumeroUtil.comparar(a, b))
            .reverse()[0] + 1;
        }
      })
      .catch(e => {
        console.error(e)
      });

    return idLivre;
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

}
