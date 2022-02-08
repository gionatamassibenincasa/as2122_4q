/**
 *
 * @param {Function} f una funzione continua in [a, b]
 * @param {Number} a l'estremo sinistro dell'intervallo di incertezza
 * @param {Number} b l'estremo destro dell'intervallo di incertezza
 * @param {Number} e1 tolleranza su asse delle ascisse
 * @param {Number} e2 tolleranza su asse delle ordinate
 * @param {Number} nmax numero massimo di iterazioni
 */
const bisezione = (f, a, b, e1 = 1e-16, e2 = 1e-16, nmax = 10) => {
  let f_a = f(a);
  let f_b = f(b);
  let s_a = Math.sign(f_a);
  let s_b = Math.sign(f_b);
  if (s_a === s_b) {
    throw "Segni concordi nei due estremi.";
  }
  let x;
  for (let iter = 0; iter < nmax && b - a >= e1; iter++) {
    x = a + (b - a) / 2;
    let f_x = f(x);
    if (Math.abs(f_x) < e2) {
      return x;
    }
    let s_x = Math.sign(f_x);
    if (s_a === s_x) {
      a = x;
    } else {
      b = x;
    }
  }
  return x;
};
