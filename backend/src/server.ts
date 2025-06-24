import express, {Application} from "express";
import {fernsRouter, FernsRouterOptions, Permissions, setupServer} from "ferns-api";

import {connectToMongo} from "./dbUtils";
import {User} from "./user";

/*
 * FERNS-API LIFECYCLE HOOKS DOCUMENTATION
 *
 * Ferns-api provides a comprehensive set of lifecycle hooks that allow you to customize
 * the behavior of CRUD operations at various stages of the request/response cycle:
 *
 * REQUEST FLOW:
 * 1. Authentication & Authorization
 * 2. Permission checks
 * 3. Request body transformation
 * 4. PRE-HOOKS (preCreate, preUpdate, preDelete)
 *    - Run before database operations
 *    - Can modify request data or block operations by returning null
 *    - Should return modified data or throw APIError
 * 5. Database operation (create/update/delete, not a hook and handled by ferns-api)
 * 6. Population (if populatePaths specified)
 * 7. POST-HOOKS (postCreate, postUpdate, postDelete)
 *    - Run after database operations but before response
 *    - Used for side effects like notifications, cascade operations
 *    - Cannot modify the response data (use responseHandler for that)
 * 8. RESPONSE-HANDLER
 *    - If not provided, ferns-api will use a default response handler that serializes
 *      the data to JSON
 *    - Final serialization step before sending response to client
 *    - Can filter, transform, or modify response data
 *    - Should return the final JSON structure
 *
 */

// This is where you can add your routes
function addRoutes(router: express.Router, options?: Partial<FernsRouterOptions<any>>): void {
  // Simple health check.
  router.get("/health", (_req, res) => {
    res.json({status: "ok"});
  });

  router.use(
    "/users",
    fernsRouter(User, {
      ...options,
      // Obviously, we wouldn't want to do this in production.
      permissions: {
        list: [Permissions.IsAny],
        create: [Permissions.IsAny],
        read: [Permissions.IsAny],
        update: [Permissions.IsAny],
        delete: [Permissions.IsAny],
      },
      // _id is not included, because you can go to /users/_id.
      queryFields: ["kind", "name"],

      // PRE-HOOKS: Run before database operations
      preCreate: async (value: any, _request: express.Request) => {
        // Example: validate user data, set defaults, check business rules
        console.info("User preCreate hook called", {data: value});
        return value;
      },

      preUpdate: async (value: any, _request: express.Request) => {
        // Example: validate updates, enforce business rules, audit changes
        console.info("User preUpdate hook called", {data: value});
        return value;
      },

      preDelete: async (value: any, _request: express.Request) => {
        // Example: check if user can be deleted, validate dependencies
        console.info("User preDelete hook called", {data: value});
        return value;
      },

      // POST-HOOKS: Run after database operations, before response,
      // but does not modify the response data. Good for side effects.
      postCreate: async (value: any, _request: express.Request) => {
        // Example: send welcome email, create related records, trigger notifications
        console.info("User postCreate hook called", {createdUser: value._id});
      },

      postUpdate: async (
        value: any,
        cleanedBody: any,
        _request: express.Request,
        prevValue: any
      ) => {
        // Example: send update notifications, sync with external systems, audit logging
        console.info("User postUpdate hook called", {
          updatedUser: value._id,
          changes: cleanedBody,
          previousValue: prevValue,
        });
      },

      postDelete: async (_request: express.Request, value: any) => {
        // TODO: Add post-delete logic for users
        // Example: cleanup related records, send notifications, audit logging
        console.info("User postDelete hook called", {deletedUser: value._id});
      },

      // RESPONSE HANDLER: Final serialization before sending to client
      responseHandler: async (
        value: any,
        method: string,
        _request: express.Request,
        _options: any
      ) => {
        // Example: filter sensitive fields, add computed properties, format data
        console.info("User responseHandler called", {method});

        // Default behavior - you can customize this
        if (Array.isArray(value)) {
          return value.map((doc) => (doc.toObject ? doc.toObject() : doc));
        } else {
          return value?.toObject ? value.toObject() : value;
        }
      },
    })
  );
}

// If you have middleware you need to add before all the routes, you can add it here.
function addMiddleware(
  _router: express.Router,
  _options?: Partial<FernsRouterOptions<any>>
): void {}

async function getBaseServer(skipListen = false): Promise<Application> {
  await connectToMongo();
  return setupServer({
    // @ts-ignore
    userModel: User,
    addRoutes,
    loggingOptions: {
      level: "debug",
    },
    addMiddleware,
    skipListen,
  });
}

// Export for testing
export {getBaseServer};

// Only start the server if this is the main module
if (require.main === module) {
  getBaseServer();
}
