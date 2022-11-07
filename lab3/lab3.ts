//Знімок (memento)
class Product {
  name: string;
  producer: string;
  price: number;

  constructor(name: string, producer: string, price: number) {
    this.name = name;
    this.producer = producer;
    this.price = price;
  }

  getProductInfo(): string {
    return `${this.name} ${this.producer}: ${this.price}$`;
  }
}

class Originator {
  private state: Product;

  constructor(state: Product) {
    this.state = state;
    console.log(`Originator: My initial state is: ${state.getProductInfo()}`);
  }

  public changeProduct(product: Product): void {
    this.state = product;
  }

  public save(): Memento {
    return new ConcreteMemento(this.state);
  }

  public restore(memento: Memento): void {
    this.state = memento.getState();
  }
}

interface Memento {
  getState(): Product;

  getName(): string;
}

class ConcreteMemento implements Memento {
  private state: Product;

  constructor(state: Product) {
    this.state = state;
  }

  public getState(): Product {
    return this.state;
  }

  public getName(): string {
    return this.state.getProductInfo();
  }
}

class Caretaker {
  private mementos: Memento[] = [];

  private originator: Originator;

  constructor(originator: Originator) {
    this.originator = originator;
  }

  public backup(): void {
    this.mementos.push(this.originator.save());
  }

  public removeProduct(): void {
    if (this.isEmpty()) {
      return;
    }
    const memento = this.mementos.pop();

    if (memento) {
      this.originator.restore(memento);
    }
  }

  public removeSomeLastProducts(n: number = 2): void {
    if (this.isEmpty()) {
      return;
    }
    const mementos = this.mementos.splice(-n);

    if (mementos) {
      for (const memento of mementos) {
        this.originator.restore(memento);
      }
    }
  }

  public isEmpty(): boolean {
    return this.mementos.length === 0;
  }

  public showHistory(): void {
    if (this.isEmpty()) {
      console.log("empty(");
      return;
    }
    console.log("----------------------------------");
    for (const memento of this.mementos) {
      console.log(memento.getName());
    }
    console.log("----------------------------------");
  }
}

const originator = new Originator(new Product("Car", "BMW", 15000));
const caretaker = new Caretaker(originator);

caretaker.backup();
originator.changeProduct(new Product("Car", "Mercedes", 20000));

caretaker.backup();
originator.changeProduct(new Product("Car", "Dodge", 30000));

caretaker.backup();
originator.changeProduct(new Product("Car", "Lamborghini", 150000));

caretaker.backup();
originator.changeProduct(new Product("Car", "Volkswagen", 9000));

caretaker.backup();
originator.changeProduct(new Product("Car", "Tesla", 80000));
caretaker.backup();

caretaker.showHistory();

caretaker.removeProduct();

caretaker.showHistory();

caretaker.removeSomeLastProducts();

caretaker.showHistory();
