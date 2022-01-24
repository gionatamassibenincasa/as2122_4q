const derivata = (f) => {
  return (x0) => {
    const h = 1E-6;
    return ( f(x0 + h) - f(x0) ) / h;
  }
};

const derivata_quadrato_x = derivata(x => x * x);

const errore = (x, stima) => {
  if (x == 0) return -1;
  return Math.abs(stima - 2*x) / x * 100;
}

const punti = [
                1E-10,
               1E-6, 1E-3,
               0.01, 0.1,
               0, 1,
               10, 100,
               1000, 1E6,
               1E10, 1E23];
punti.forEach(x0 => {
  const stimaDerivata = derivata_quadrato_x(x0);
  const err = errore(x0, stimaDerivata);
  console.log("x0: " + x0 + "\tf'(x0): " + stimaDerivata + "\t errore %: " + err);
});