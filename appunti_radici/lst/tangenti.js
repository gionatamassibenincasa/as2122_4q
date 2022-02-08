/**
 *
 * @param {Function} f una funzione continua e derivabile in un intorno di x
 * @param {Number} x il valore x_0
 * @param {Function} f1 la derivata prima di f
 * @param {Number} e1 tolleranza su asse delle ascisse
 * @param {Number} e2 tolleranza su asse delle ordinate
 * @param {Number} nmax numero massimo di iterazioni
 */
const tangenti = (f, x, f1, e1 = 1e-16, e2 = 1e-16, nmax = 10) => {
  let err = e1 + 1; // permette di entrare nel ciclo
  for (let iter = 0; iter < nmax && err >= e1; iter++) {
    let f_x = f(x);
    if (Math.abs(f_x) < e2) {
      return x;
    }
    let f1_x = f1(x);
    let xp = x;
    x = xp - f_x / f1_x;
    err = Math.abs(x - xp);
  }
  return x;
};
