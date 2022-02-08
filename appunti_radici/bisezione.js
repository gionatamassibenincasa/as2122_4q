const fs = require("fs");
/**
 *
 * @param {Function} f una funzione continua in [a, b]
 * @param {Number} a l'estremo sinistro dell'intervallo di incertezza
 * @param {Number} b l'estremo destro dell'intervallo di incertezza
 * @param {Number} e1 tolleranza su asse delle ascisse
 * @param {Number} e2 tolleranza su asse delle ordinate
 * @param {Number} nmax numero massimo di iterazioni
 */
const bisezioneToTeX = (f, a, b, e1 = 1e-16, e2 = 1e-16, nmax = 10) => {
  let str =
    "% Metodo di bisezione, f: " +
    f.toString() +
    ", I: [" +
    a +
    ", " +
    b +
    "]\n";
  str +=
    "$k$\t$a_k$\t$b_k$\t$x_k$\t$s_{a_k}$\t$s_{b_k}$\t$s_k$\t$|b_{k}-a_{k}|$\t$f_k$\n";
  let f_a = f(a);
  let f_b = f(b);
  let s_a = Math.sign(f_a);
  let s_b = Math.sign(f_b);
  if (s_a === s_b) {
    throw (
      "Segni concordi nei due estremi: " +
      f.toString() +
      ", a: " +
      a +
      ", b: " +
      b +
      ", f(a): " +
      f_a +
      ", f(b): " +
      f_b
    );
  }
  let x;
  const sep = "\t"; // "&"
  const endl = "\n"; // "\\\\\n"
  const endt = "\n"; // "\\hline"
  for (let iter = 0; iter < nmax && b - a >= e1; iter++) {
    x = a + (b - a) / 2;
    let f_x = f(x);
    let s_x = Math.sign(f_x);
    str +=
      iter +
      sep +
      a +
      sep +
      b +
      sep +
      x +
      sep +
      s_a +
      sep +
      s_b +
      sep +
      s_x +
      sep +
      (b - a) +
      sep +
      f_x +
      endl;
    if (s_a === s_x) {
      a = x;
    } else {
      b = x;
    }
    if (Math.abs(f_x) < e2) {
      return str + endt;
    }
  }
  return str + endt;
};

fs.writeFileSync(
  "tab_bis_sqrt_6.dat",
  bisezioneToTeX((x) => x * x - 6, 0, 6)
);
fs.writeFileSync(
  "tab_bis_sin.dat",
  bisezioneToTeX((x) => Math.sin(x), 3.0, 3.2)
);
fs.writeFileSync(
  "tab_bis_exp_mx.dat",
  bisezioneToTeX((x) => Math.exp(-Math.exp(-x)) - x, 0, 1) // exp(-exp(-x)) = x
);
