import { MongoClient, type Db } from "mongodb";

/**
 * A single MongoClient per process, shared across invocations.
 *
 * Serverless platforms keep the module scope alive between warm requests but
 * throw away the request scope, so connecting per request would open a fresh
 * pool every time and exhaust the cluster's connection limit — 500 on the free
 * tier — long before traffic justified it. Caching the *promise* rather than
 * the client also means concurrent cold requests share one handshake instead
 * of racing to open several.
 */

export const DB_NAME = process.env.MONGODB_DB || "aeronive";
export const CONTACT_COLLECTION =
  process.env.MONGODB_CONTACT_COLLECTION || "contact_submissions";

declare global {
  // Survives HMR in dev, where every edit re-evaluates the module and would
  // otherwise leak a pool per reload.
  var __aeronive_mongo: Promise<MongoClient> | undefined;
}

let cached: Promise<MongoClient> | undefined;

function connect(uri: string): Promise<MongoClient> {
  const promise = new MongoClient(uri, {
    maxPoolSize: 10,
    // Surface an unreachable cluster as a fast 502 instead of hanging the
    // request until the platform's own timeout kills it.
    serverSelectionTimeoutMS: 8000,
  }).connect();

  // A rejected promise would otherwise be cached forever, turning one bad
  // cold start into a permanently broken process.
  promise.catch(() => {
    if (cached === promise) cached = undefined;
    if (globalThis.__aeronive_mongo === promise) {
      globalThis.__aeronive_mongo = undefined;
    }
  });

  return promise;
}

/**
 * Resolves the application database, or `null` when `MONGODB_URI` is unset so
 * callers can degrade deliberately rather than throwing at import time.
 */
export function getDb(): Promise<Db> | null {
  const uri = process.env.MONGODB_URI;
  if (!uri) return null;

  if (process.env.NODE_ENV === "development") {
    globalThis.__aeronive_mongo ??= connect(uri);
    return globalThis.__aeronive_mongo.then((client) => client.db(DB_NAME));
  }

  cached ??= connect(uri);
  return cached.then((client) => client.db(DB_NAME));
}
