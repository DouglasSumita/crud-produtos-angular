export class NumeroUtil {
  /**
   * Se o número A for maior que B retorna 1, Se menor -1, se igual 0;
   *
   * @param a number
   * @param b number
   * @return number
   */
  static comparar(a: number, b: number): number {
    if (a < b) return -1;
    if (a > b) return 1;
    return 0;
  }
}
