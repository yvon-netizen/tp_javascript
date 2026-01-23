console.log("=== TP 1 : Closures & Fonctions avancées ===\n");

function createCounter(initialValue = 0) {
  let count = initialValue;
  
  return {
    increment() {
      count++;
      return count;
    },
    decrement() {
      count--;
      return count;
    },
    value() {
      return count;
    }
  };
}

const counter = createCounter(5);
console.log("Valeur initiale:", counter.value()); 
console.log("Après increment:", counter.increment()); 
console.log("Après increment:", counter.increment()); 
console.log("Après decrement:", counter.decrement()); 
console.log("Valeur actuelle:", counter.value()); 

function once(fn) {
  let executed = false;
  let result;
  
  return function(...args) {
    if (!executed) {
      result = fn.apply(this, args);
      executed = true;
    }
    return result;
  };
}

const sayHello = once(() => {
  console.log("Hello!");
  return "Bonjour";
});
console.log("\nTest once:");
console.log(sayHello());
console.log(sayHello()); 

function memoize(fn) {
  const cache = {};
  
  return function(...args) {
    const key = JSON.stringify(args);
    
    if (key in cache) {
      console.log(`Résultat en cache pour ${key}`);
      return cache[key];
    }
    
    const result = fn.apply(this, args);
    cache[key] = result;
    return result;
  };
}

const slowSquare = memoize((n) => {
  console.log(`Calcul de ${n}²...`);
  return n * n;
});
console.log("\nTest memoize:");
console.log(slowSquare(5)); 
console.log(slowSquare(5)); 
console.log(slowSquare(10)); 