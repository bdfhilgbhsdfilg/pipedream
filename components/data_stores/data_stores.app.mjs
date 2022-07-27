export default {
  type: "app",
  app: "data_stores",
  propDefinitions: {
    dataStore: {
      label: "Data Store",
      type: "data_store",
      description: "Select an existing Data Store or create a new one.",
    },
    key: {
      label: "Key",
      type: "string",
      description: "Key for the data you'd like to add or update. Refer to your existing keys [here](https://pipedream.com/data-stores/).",
      async options({ dataStore }) {
        return dataStore.keys();
      },
    },
    addRecordIfNotFound: {
      label: "Create a new record if the key is not found?",
      description: "Create a new record if no records are found for the specified key.",
      type: "string",
      options: [
        "Yes",
        "No",
      ],
      optional: true,
      reloadProps: true,
    },
  },
  methods: {
    shouldAddRecord(option) {
      return option === "Yes";
    },
    valueProp() {
      return {
        value: {
          label: "Value",
          type: "any",
          description: "Enter a string, object, or array.",
        },
      };
    },
    parseValue(value) {
      if (typeof value !== "string") {
        return value;
      }

      try {
        // using Function approach instead of eval:
        // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/eval#never_use_eval!
        const stringified = Function(`"use strict"; return JSON.stringify(${value})`)();
        return JSON.parse(stringified);
      } catch (err) {
        return value;
      }
    },
  },
};
