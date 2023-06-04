import {dt} from "./datatypes.mjs";
import vIEW from "./ui/vIEW.mjs";

class bUSINESSaPP {
  constructor({title, storageManager, validateOnInput=false}) {
    this.title = title;
    this.storageManager = storageManager;
    this.validateOnInput = validateOnInput;
    this.crudViews = {};
  }
  setup() {
    // set up all business object classes and their CRUD views
    for (const Class of Object.values( dt.classes)) {
      Class.setup();
      this.crudViews[Class.name] = {};
      for (const crudCode of ["R","C","U","D"]) {
        this.crudViews[Class.name][crudCode] = new vIEW({modelClass: Class, viewType: crudCode});
      }
    }
  }
  async createTestData() {
    try {
      const busObjClasses = Object.values( dt.classes);
      await this.storageManager.createEmptyDb( busObjClasses);
      for (const Class of busObjClasses) {
        await this.storageManager.add( Class, Class.testData);
      }
    } catch (e) {
      console.log( `${e.constructor.name}: ${e.message}`);
    }
  }
  async clearDatabase() {
    if (confirm( "Do you really want to delete the entire database?")) {
      try {
        await this.storageManager.deleteDatabase();
        console.log("All data cleared.");
      } catch (e) {
        console.log( `${e.constructor.name}: ${e.message}`);
      }
    }
  }
}

export default bUSINESSaPP;