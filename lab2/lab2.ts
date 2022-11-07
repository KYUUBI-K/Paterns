//Легковаговик(Flyweight)

const zip = ([...arr]) =>
  Array(Math.max(...arr.map((a) => a.length)))
    .fill(0)
    .map((_, i) => arr.map((a) => a[i]));

class CustomSymbol {
  public symbol: string;
  public representaion: string[];

  constructor(symbol: string, representation: string[]) {
    this.symbol = symbol;
    this.representaion = representation;
  }

  print() {
    for (const row of this.representaion) {
      console.log(row);
    }
  }
}

class ComplexSymbol {
  public symbol: string;
  public representaion: string[][];

  constructor(symbol: string, representation: string[][]) {
    this.symbol = symbol;
    this.representaion = representation;
  }

  print() {
    for (const row of this.representaion) {
      console.log(...row);
    }
  }
}

class CustomSymbolFactory {
  private symbols: { [key: string]: CustomSymbol | ComplexSymbol };

  constructor(symbols: CustomSymbol[] | ComplexSymbol[]) {
    const copy = [...symbols];
    this.symbols = copy.reduce((prev, s) => {
      return {
        ...prev,
        [s.symbol]: s,
      };
    }, {});
  }

  create(symbol: string, representaion: string[]) {
    if (!!this.symbols[symbol]) {
      return this.symbols[symbol];
    }
    if (symbol.length > 1) {
      const complexSymbolRepresentations = zip(
        symbol.split("").map((s) => this.symbols[s].representaion as string[])
      );
      this.symbols[symbol] = new ComplexSymbol(
        symbol,
        complexSymbolRepresentations
      );
      return this.symbols[symbol];
    }
    this.symbols[symbol] = new CustomSymbol(symbol, representaion);
    return this.symbols[symbol];
  }

  printAllSymbols() {
    Object.values(this.symbols).forEach((obj) => obj.print());
  }
}

const factory = new CustomSymbolFactory([
  new CustomSymbol("1", ["** ", " * ", " * ", " * ", "***"]),
  new CustomSymbol("2", ["***", "  *", " * ", "*  ", "***"]),
  new CustomSymbol("3", ["***", "  *", "***", "  *", "***"]),
]);

factory.printAllSymbols();

const anotherOne = factory.create("1", ["** ", " * ", " * ", " * ", "***"]);
const oneTwoThree = factory.create("123", []);

factory.printAllSymbols();
// console.log(
//   zip([
//     ["** ", " * ", " * ", " * ", "***"],
//     ["***", "  *", " * ", "*  ", "***"],
//     ["***", "  *", "***", "  *", "***"],
//   ])
// );
