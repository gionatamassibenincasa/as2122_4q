const fs = require("fs");
/**
 *
 * @param {Function} f una funzione continua in un intorno di x
 * @param {Number} a una stima iniziale della radice
 * @param {Number} x una seconda stima della radice
 * @param {Number} e1 tolleranza su asse delle ascisse
 * @param {Number} e2 tolleranza su asse delle ordinate
 * @param {Number} nmax numero massimo di iterazioni
 */
const secantiToTeX = (f, a, x, e1 = 1e-16, e2 = 1e-16, nmax = 10) => {
  const sep = "\t"; // "&"
  const endl = "\n"; // "\\\\\n"
  const endt = "\n"; // "\\hline"
  // Commento
  let str = `% Metodo delle secanti, f: ${f.toString()}, \$a$: ${a}, \$x_0\$: ${x}\n`;
  // Intestazioni
  str +=
    "$k$" +
    sep +
    "$x_k$" +
    sep +
    "$f_k$" +
    sep +
    "$m_k$" +
    sep +
    "$|x_{k+1}-x_{k}|$" +
    endl;
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
    str += iter + sep + xp + sep + f_x + sep + 1 / inv_m_k + sep + err + endl;
    if (Math.abs(f_x) < e2) {
      return str + endt;
    }
  }
  return str + endt;
};

fs.writeFileSync(
  "tab_sec_sqrt_6.dat",
  secantiToTeX((x) => x * x - 6, 6, 3)
);
fs.writeFileSync(
  "tab_sec_sin.dat",
  secantiToTeX((x) => Math.sin(x), 3.2, 3.1)
);
fs.writeFileSync(
  "tab_sec_exp_mx.dat",
  secantiToTeX(
    (x) => Math.exp(-Math.exp(-x)) - x, // exp(-exp(-x)) = x
    1,
    0.5
  )
);
