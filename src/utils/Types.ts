import { entityMap } from "./EntityFilters";

// Define a new type called EntityMap that transforms the entityMap object
// This creates a type-safe structure for accessing entity data and filters
export type EntityMap = {
    // Use mapped type syntax to iterate through all keys of entityMap
    [K in keyof typeof entityMap]: {
        // For each entity type, define a 'data' property that is an array of the model type
        // This ensures that data is always handled as an array of the model
        data: (typeof entityMap)[K]["model"];

        // For each entity type, define a 'filters' property
        // The type of this property will be the 'filters' property from the corresponding entityMap entry
        filters: (typeof entityMap)[K]["filters"];
    };
};