export default class Lokal {
  public lokalStorage: Storage;
  public isSupported: boolean = false;

  // Check & SetUp Storage
  constructor(storage: Storage) {
    this.lokalStorage = storage;
    this.isSupported = (() => {
      try {
        const dummyKey = "IamHereToCheckOnYou";
        this.lokalStorage.setItem(dummyKey, dummyKey);
        this.lokalStorage.removeItem(dummyKey);
        return true;
      } catch {
        return false;
      }
    })();
  }

  // Get item value
  public getItem(key: string): string | null {
    if (this.isSupported) {
      return localStorage.getItem(key);
    }
    return null;
  }

  // Check if item exists in Storage
  public hasItem(key: string): boolean {
    if (this.isSupported) {
      return localStorage.getItem(key) !== null;
    }
    return false;
  }

  // Set item
  public setItem(key: string, value: string) {
    if (this.isSupported) {
      return this.lokalStorage.setItem(key, value);
    }
  }

  // Get remaining space
  public remainingSpace(): string | null {
    let amount = 0;
    if (this.isSupported) {
      for (const key in this.lokalStorage) {
        if (this.lokalStorage.hasOwnProperty(key)) {
          const space = (this.lokalStorage[key].length * 2) / 1024 / 1024;
          amount += space;
        }
      }
      return amount.toFixed(2);
    }
    return null;
  }
}
