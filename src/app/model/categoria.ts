export class Categoria {

  id: number;
  nome: string;

  constructor(id?: number, nome?: string) {
    this.id = id;
    this.nome = nome;
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
}
