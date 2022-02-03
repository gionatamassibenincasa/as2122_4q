const corde = (f, a, x) => {
  console.log("*** CORDE (f: " + f.toString() + ", a: " + a + ", x: " + x + ") ***");
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


console.log("###\n#### CORDE\n###\n");
let alfa = corde(x => x * x - 1, 0, 2);
console.log(alfa);

alfa = corde(x => Math.sin(x) - Math.exp(x - 1), 0.715, 0.72);
console.log(alfa);

const secanti = (f, x, xm1) => {
  console.log("*** SECANTI (f: " + f.toString() + ", x: " + x + ", xm1: " + xm1 + ") ***");  
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

console.log("###\n#### SECANTI\n###\n");
alfa = secanti(x => x * x - 1, 0, 2);
console.log(alfa);

alfa = secanti(x => Math.sin(x) - Math.exp(x - 1), 0.715, 0.72);
console.log(alfa);

const tangenti = (f, x, f1) => {
  console.log("*** TANGENTI (f: " + f.toString() + ", x: " + x + ", f': " + f1.toString() + ") ***");  
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

console.log("###\n#### TANGENTI\n###\n");
alfa = tangenti(x => x * x - 1, 3, x => 2 * x);
console.log(alfa);

alfa = tangenti(x => Math.sin(x) - Math.exp(x - 1), -3, x => Math.cos(x) - Math.exp(x - 1));
console.log(alfa);

alfa = tangenti(x => Math.log2(x) - 7, 1, x => 1 / x / Math.log(2));
console.log(alfa);

/*
$$x_{k+1} = x_k - {f'(x_k) \over f''(x_k)} \pm \sqrt{{\left(f'(x_k)\right)^2 - 2 f(x_k) \cdot f''(x_k)} \over {\left( f''(x_k)\right)^2}}$$

*/
const parabole = (f, x, f1, f2) => {
  console.log("*** PARABOLE (f: " + f.toString() + ", x: " + x + ", f': " + f1.toString() + ", f'': " + f2.toString() + ") ***");  
  let f_x = f(x);
  if (Math.abs(f_x) < 1E-16) return x;
  let xm1 = x + 1;

  let k = 0;
  while ((k < 100) && (Math.abs(x - xm1) >= 1E-15)) {
    xm1 = x;
    const f2_x = f2(x);
    const f1_x = f1(x);
    // f_x già calcolato
    const delta2 = f1_x * f1_x - 2 * f_x * f2_x;
    let delta;
    if (delta2 <= 0) delta = 0;
    else delta = Math.sqrt(delta2);
    x = x - (f1_x - delta) / f2_x;
    console.log("x[" + k + "] = " + x);
    f_x = f(x);
    if (Math.abs(f_x) < 1E-16) return x;

    k = k + 1;
  }
  return x;
};

console.log("###\n#### PARABOLE\n###\n");
alfa = parabole(x => x * x - 1, 3, x => 2 * x, x => 2);
console.log(alfa);

alfa = parabole(x => Math.log2(x) - 7, 1, x => 1 / x / Math.log(2), x => -1 / x / x / Math.log(2));
console.log(alfa);

alfa = parabole(x => Math.sin(x) - Math.exp(x - 1), -3,
                x => Math.cos(x) - Math.exp(x - 1),
                x => -(Math.sin(x) - Math.exp(x - 1)));
console.log(alfa);
