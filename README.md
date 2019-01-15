# Lokale - Simple API for localStorage Management
Lokale is a simple yet reliable api for browser localStorage or sessionStorage management.

### Install
Make sure you have the following installed
- [Node JS](https://nodejs.org/en/)
- [NPM](https://npmjs.com)

Run the folling command to add the package to your project dependencies
```bash
npm install lokale
```

### How to use
Lokale also supports typescripts, types declaration are included by default.

**CommonJs**
```javascript
const Lokale = require('lokale');
```

**ES6**
```javascript
import Lokale from 'lokale';
```

**Usage**
```javascript
// Initiate an instance
// You can use localStorage or sessionStorage
const lokalStorage = new Lokale(window.localStorage);

// Set item
lokalStorage.setItem('YourKey', 'YourData');
```

### API
Available options

| API                 | Arguments Type | Description                                                  | Returns                                                   |
|---------------------|----------------|--------------------------------------------------------------|-----------------------------------------------------------|
| lokale(**storage**) | Storage        | Set the preferred storage `localStorage` or `sessionStorage` |                                                           |
| getItem(key)        | String         | Get item by key name                                         | String - Value of the key                                 |
| setItem(key, value) | String, String | Set item value to storage                                    |                                                           |
| hasItem(key)        | String         | Check if item exists in the storage                          | Boolean                                                   |
| clear()             |                | Empty all keys and values in storage                         |                                                           |
| getSpaceUsage()     |                | Get detailed size/space infos about keys and remaining space | Object - Usage per key, `availableSpace`, and `usedSpace` |
