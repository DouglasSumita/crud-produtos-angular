import { Categoria } from './categoria';

export class Produto {

  id: number;
  nome: string;
  descricao: string;
  preco: number;
  categoria: Categoria;

  constructor(id?: number, nome?: string, descricao?: string, preco?: number, categoria?: Categoria) {
    this.id = id;
    this.nome = nome;
    this.descricao = descricao;
    this.preco = preco;
    this.categoria = categoria;
  }

  getId(): number {
    return this.id;
  }

  setId(id: number): void {
    this.id = id;
  }

  getNome(): string {
    return this.nome;
  }

  setNome(nome: string): void {
    this.nome = nome;
  }

  getDescricao(): string {
    return this.descricao;
  }

  setDescricao(descricao: string): void {
    this.descricao = descricao;
  }

  getPreco(): number {
    return this.preco;
  }

  setPreco(preco: number): void {
    this.preco = preco;
  }

  getCategoria(): Categoria {
    return this.categoria;
  }

  setCategoria(categoria: Categoria): void {
    this.categoria = categoria;
  }


}
