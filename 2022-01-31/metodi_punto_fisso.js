const corde = (f, a, x) => {
  const f_a = f(a);
  if (Math.abs(f_a) < 1E-16) return a;
  let xm1 = a;
  let k = 0;
  while ((k < 100) && (Math.abs(x - xm1) >= 1E-16)) {
    f_x = f(x);
    if (Math.abs(f_x) < 1E-16) return x;
    const inv_mk = (a - x) / (f_a - f_x);
    xm1 = x;
    console.log("x[" + k + "] = " + x);
    console.log("m[" + k + "]^(-1) = " + inv_mk);
    x = x - inv_mk * f_x;
    k = k + 1;
  }
  return x;
};

let alfa = corde(x => x * x - 1, 0, 2);
console.log(alfa);

const secanti = (f, x, xm1) => {
  let f_x = f(x);
  if (Math.abs(f_x) < 1E-16) return x;
  let f_xm1 = f(xm1);
  if (Math.abs(f_xm1) < 1E-16) return xm1;

  let k = 0;
  while ((k < 100) && (Math.abs(x - xm1) >= 1E-16)) {
    const inv_mk = (x - xm1) / (f_x - f_xm1);
    xm1 = x;
    console.log("x[" + k + "] = " + x);
    console.log("m[" + k + "]^(-1) = " + inv_mk);
    x = x - inv_mk * f_x;
    f_xm1 = f_x;
    f_x = f(x);
    if (Math.abs(f_x) < 1E-16) return x;

    k = k + 1;
  }
  return x;
};

alfa = secanti(x => x * x - 1, 0, 2);
console.log(alfa);

const tangenti = (f, x, f1) => {
  let f_x = f(x);
  if (Math.abs(f_x) < 1E-16) return x;
  let xm1 = x + 1;

  let k = 0;
  while ((k < 100) && (Math.abs(x - xm1) >= 1E-16)) {
    const inv_mk = 1/f1(x);
    xm1 = x;
    console.log("x[" + k + "] = " + x);
    console.log("m[" + k + "]^(-1) = " + inv_mk);
    x = x - inv_mk * f_x;
    f_x = f(x);
    if (Math.abs(f_x) < 1E-16) return x;

    k = k + 1;
  }
  return x;
};

alfa = tangenti(x => x * x - 1, 3, x => 2 * x);
console.log(alfa);
