/**
 *
 * @param {Function} f una funzione continua in un intorno di x
 * @param {Number} a una stima iniziale della radice
 * @param {Number} x una seconda stima della radice
 * @param {Number} e1 tolleranza su asse delle ascisse
 * @param {Number} e2 tolleranza su asse delle ordinate
 * @param {Number} nmax numero massimo di iterazioni
 */
const secanti = (f, a, x, e1 = 1e-16, e2 = 1e-16, nmax = 10) => {
  let f_a = f(a);
  let err = e1 + 1; // permette di entrare nel ciclo
  for (let iter = 0; iter < nmax && err >= e1; iter++) {
    let f_x = f(x);
    let inv_m_k = (a - x) / (f_a - f_x);
    let xp = x;
    a = x;
    f_a = f_x;
    x = xp - f_x * inv_m_k;
    err = Math.abs(x - xp);
    if (Math.abs(f_x) < e2) {
      return x;
    }
  }
  return x;
};
