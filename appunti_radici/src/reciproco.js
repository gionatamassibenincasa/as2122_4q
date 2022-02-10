const reciproco = (nu) => {
  let x = 1e-10,
    xp = nu;
  while (Math.abs(x - xp) > 1e-16) {
    xp = x;
    x = xp * (2 - nu * xp);
    console.log(x);
  }
  return x;
};

console.log("\n\n1/100");
reciproco(100);

console.log("\n\n1/100");
reciproco(100000);
