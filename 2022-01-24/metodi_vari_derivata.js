/*!
  Definisco una funzione f.
  f(x) = x^2
  @param {Number} x
  @return {Number} x^2
*/
let f = function (x) {
  return x * x;
};

// Primo tentativo.
// Un valore di h scelto a caso
/*!
  Definisco la funzione derivata.
  @param {Function} f una funzione
  @return  {Function} la funzione f' che accetta un argomento numerico e restituisce un numero
*/
const derivata = function (f) {
  return function (x) {
    var h = 0.00001;
    return (f (x + h) - f (x)) / h;
  };
};


// Un secondo tentativo
// h scelta come il numero più piccolo che si può rappresentare
/*!
  Definisco la funzione derivata.
  @param {Function} f una funzione
  @return  {Function} la funzione f' che accetta un argomento numerico e restituisce un numero
*/
var derivata = function (f) {
  return function (x) {
    var h = Number.EPSILON;
    return (f (x + h) - f (x)) / h;
  };
};

// Terzo tentativo.
// Un valore di h per minimizzare l'errore di troncamento
// Differenze in avanti
derivata = function (f) {
  return function (x) {
    // h deve essere scelto in modo da minimizzare
    // l'errore di troncamento
    // h = radq(epsilon) * x0, se x0 diverso da 0 
    var h;
    if (Math.abs(x) <= Number.EPSILON)
      h = Math.sqrt(Number.EPSILON);
    else 
      h= Math.sqrt(Number.EPSILON) * x;
    return (f (x + h) - f (x)) / h;
  };
}; 

// Quarto tentativo.
// Un valore di h per minimizzare l'errore di troncamento
// Differenze all'indietro
derivata = function (f) {
  return function (x) {
    // h deve essere scelto in modo da minimizzare
    // l'errore di troncamento
    // h = radq(epsilon) * x0, se x0 diverso da 0 
    var h;
    if (Math.abs(x) <= Number.EPSILON)
      h = Math.sqrt(Number.EPSILON);
    else 
      h= Math.sqrt(Number.EPSILON) * x;
    return (f (x - h) - f (x)) / (-h);
  };
};

// Quinto tentativo.
// Un valore di h per minimizzare l'errore di troncamento
// Differenze centrali
derivata = function (f) {
  return function (x) {
    // h deve essere scelto in modo da minimizzare
    // l'errore di troncamento
    // h = radq(epsilon) * x0, se x0 diverso da 0 
    var h;
    if (Math.abs(x) <= Number.EPSILON)
      h = Math.sqrt(Number.EPSILON);
    else 
      h= Math.sqrt(Number.EPSILON) * x;
    return (f (x + h) - f (x - h)) / (2 * h);
  };
};

// Sesto tentativo.
// Un valore di h per minimizzare l'errore di troncamento
// Differenze centrali
derivata = function (f) {
  return function (x) {
    // h deve essere scelto in modo da minimizzare
    // l'errore di troncamento
    // h = radq(epsilon) * x0, se x0 diverso da 0 
    var h;
    if (Math.abs(x) <= Number.EPSILON)
      h = Math.sqrt(Number.EPSILON);
    else 
      h= Math.sqrt(Number.EPSILON) * x;
    // Tengo conto dell'errore di troncamento nel calcolo di x+h
    var xph = x + h;
    var xmh = x - h;
    // Calcolo l'incremento in modo esatto
    var dueh = xph - xmh;
    return (f (xph) - f (xmh)) / (dueh);
  };
};

// Esempi di calcolo
var f1 = derivata (f);
console.log('x', 'stima', 'migl. appr', 'err. assoluto', 'errore relativo');
var valori = [0, 1, 2, 10, 100, 1000, 1E6, 1E-20, 1E20];
valori.forEach(function (v) {
  var f1v_s = f1(v);
  var f1v_e = 2 * v;
  var err_a = Math.abs(f1v_s - f1v_e);
  var err_r = Math.abs(err_a / f1v_e);
 console.log(v, f1v_s, f1v_e, err_a, err_r); 
});


//
// Miglior scelta per h
//

derivata = function (f) {
  return function (x0) {
    // h deve essere scelto in modo da minimizzare
    // l'errore di troncamento
    // h = radq(epsilon) * x0, se x0 diverso da 0 
    var h = Math.sqrt(Number.EPSILON);
    if (Math.abs(x0) > 1.E-6)
      h *= x0;
    
    // (x + h) è soggetto ad errori di troncamento
    // va rivalutato
    var xph = x0 + h;
    var xmh = x0 - h;
    // il valore dell'incremento effettivo è h1
    var h1 = xph - x0;
    // se possiamo calcolare due volte la funzione
    // calcolare la derivata con il rapporto incrementale
    // delle differenze simmetriche migliora l'accuratezza
    // in quanto riduce l'errore di troncamento
    return (f (xph) - f (xmh)) / (2 * h1);
  };
};
