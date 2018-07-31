// Get Space Usage Types `getSpaceUsage`
export interface ISpaceUsageResults {
  usedSpace: string;
  availableSpace: string;
  [key: string]: string;
}

export default class Lokale {
  public lokaleStorage: Storage;
  public isSupported: boolean = false;

  // Check & SetUp Storage
  constructor(storage: Storage) {
    this.lokaleStorage = storage || localStorage;
    this.isSupported = (() => {
      try {
        const dummyKey = "IamHereToCheckOnYou";
        this.lokaleStorage.setItem(dummyKey, dummyKey);
        this.lokaleStorage.removeItem(dummyKey);
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
      return this.lokaleStorage.setItem(key, value);
    }
  }

  // Remove item
  public removeItem(key: string) {
    if (this.isSupported) {
      if (this.lokaleStorage.hasOwnProperty(key)) {
        return this.lokaleStorage.removeItem(key);
      }
    }
  }

  // Clear Storage
  public clear() {
    if (this.isSupported) {
      this.lokaleStorage.clear();
    }
  }

  // Get detailed space usage
  // TODO: Add functionality to get size of one item
  public getSpaceUsage(): ISpaceUsageResults {
    const result: ISpaceUsageResults = {
      availableSpace: "",
      usedSpace: "",
    };
    let usedSpace = 0;
    let hasSpace = true;
    let dummyData = "A";

    if (this.isSupported) {
      // Test available space
      while (hasSpace) {
        try {
          dummyData += dummyData;
          this.lokaleStorage.setItem("availableSpace", dummyData);
        } catch (e) {
          hasSpace = false;
        }
      }
      // Each key size & total used space
      Object.keys(this.lokaleStorage).forEach( (key) => {
        const amount = (this.lokaleStorage[key].length * 2) / 1024 / 1024;
        usedSpace += amount;
        result[key] = `${amount.toFixed(2)} MB`;
      });

      result.usedSpace = `${usedSpace.toFixed(2)} MB`;
      result.availableSpace = `${usedSpace.toFixed(2)} MB`;
      // Remove dummy data
      this.lokaleStorage.removeItem("availableSpace");
    }
    return result;
  }
}
