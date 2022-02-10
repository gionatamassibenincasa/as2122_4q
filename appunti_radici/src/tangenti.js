const fs = require("fs");
/**
 *
 * @param {Function} f una funzione continua in un intorno di x
 * @param {Number} x la stima iniziale della radice
 * @param {Function} f1 la derivata prima di f
 * @param {Number} e1 tolleranza su asse delle ascisse
 * @param {Number} e2 tolleranza su asse delle ordinate
 * @param {Number} nmax numero massimo di iterazioni
 */
const tangentiToTeX = (f, x, f1, e1 = 1e-16, e2 = 1e-16, nmax = 10) => {
  const sep = "\t"; // "&"
  const endl = "\n"; // "\\\\\n"
  const endt = "\n"; // "\\hline"
  // Commento
  let str = `% Metodo delle tangenti, f: ${f.toString()}, \$x_0\$: ${x}, f': ${f1.toString()}\n`;
  // Intestazioni
  str +=
    "$k$" +
    sep +
    "$x_k$" +
    sep +
    "$f_k$" +
    sep +
    "$f'_k$" +
    sep +
    "$|x_{k+1}-x_{k}|$" +
    endl;
  let err = e1 + 1; // permette di entrare nel ciclo
  for (let iter = 0; iter < nmax && err >= e1; iter++) {
    let f_x = f(x);
    let f1_x = f1(x);
    let xp = x;
    x = xp - f_x / f1_x;
    err = Math.abs(x - xp);
    str += iter + sep + xp + sep + f_x + sep + f1_x + sep + err + endl;
    if (Math.abs(f_x) < e2) {
      return str + endt;
    }
  }
  return str + endt;
};

fs.writeFileSync(
  "tab_tan_sqrt_6.dat",
  tangentiToTeX(
    (x) => x * x - 6,
    3,
    (x) => 2 * x
  )
);
fs.writeFileSync(
  "tab_tan_sin.dat",
  tangentiToTeX(
    (x) => Math.sin(x),
    3.1,
    (x) => Math.cos(x)
  )
);
fs.writeFileSync(
  "tab_tan_exp_mx.dat",
  tangentiToTeX(
    (x) => Math.exp(-Math.exp(-x)) - x, // exp(-exp(-x)) = x
    0.5,
    (x) => Math.exp(-x) * Math.exp(-Math.exp(-x)) - 1
  )
);
