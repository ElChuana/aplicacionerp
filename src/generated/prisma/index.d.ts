
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model bank_accounts
 * This table contains check constraints and requires additional setup for migrations. Visit https://pris.ly/d/check-constraints for more info.
 */
export type bank_accounts = $Result.DefaultSelection<Prisma.$bank_accountsPayload>
/**
 * Model bank_movements
 * This table contains check constraints and requires additional setup for migrations. Visit https://pris.ly/d/check-constraints for more info.
 */
export type bank_movements = $Result.DefaultSelection<Prisma.$bank_movementsPayload>
/**
 * Model companies
 * 
 */
export type companies = $Result.DefaultSelection<Prisma.$companiesPayload>
/**
 * Model cost_centers
 * 
 */
export type cost_centers = $Result.DefaultSelection<Prisma.$cost_centersPayload>
/**
 * Model credits
 * 
 */
export type credits = $Result.DefaultSelection<Prisma.$creditsPayload>
/**
 * Model movement_matches
 * 
 */
export type movement_matches = $Result.DefaultSelection<Prisma.$movement_matchesPayload>
/**
 * Model obligation_documents
 * 
 */
export type obligation_documents = $Result.DefaultSelection<Prisma.$obligation_documentsPayload>
/**
 * Model obligation_types
 * 
 */
export type obligation_types = $Result.DefaultSelection<Prisma.$obligation_typesPayload>
/**
 * Model obligations
 * This table contains check constraints and requires additional setup for migrations. Visit https://pris.ly/d/check-constraints for more info.
 */
export type obligations = $Result.DefaultSelection<Prisma.$obligationsPayload>
/**
 * Model projects
 * 
 */
export type projects = $Result.DefaultSelection<Prisma.$projectsPayload>
/**
 * Model sub_accounts
 * 
 */
export type sub_accounts = $Result.DefaultSelection<Prisma.$sub_accountsPayload>
/**
 * Model uf_rates
 * 
 */
export type uf_rates = $Result.DefaultSelection<Prisma.$uf_ratesPayload>
/**
 * Model users
 * 
 */
export type users = $Result.DefaultSelection<Prisma.$usersPayload>

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Bank_accounts
 * const bank_accounts = await prisma.bank_accounts.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternacionalalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Bank_accounts
   * const bank_accounts = await prisma.bank_accounts.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

  /**
   * Add a middleware
   * @deprecated since 4.16.0. For new code, prefer client extensions instead.
   * @see https://pris.ly/d/extensions
   */
  $use(cb: Prisma.Middleware): void

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.bank_accounts`: Exposes CRUD operations for the **bank_accounts** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Bank_accounts
    * const bank_accounts = await prisma.bank_accounts.findMany()
    * ```
    */
  get bank_accounts(): Prisma.bank_accountsDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.bank_movements`: Exposes CRUD operations for the **bank_movements** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Bank_movements
    * const bank_movements = await prisma.bank_movements.findMany()
    * ```
    */
  get bank_movements(): Prisma.bank_movementsDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.companies`: Exposes CRUD operations for the **companies** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Companies
    * const companies = await prisma.companies.findMany()
    * ```
    */
  get companies(): Prisma.companiesDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.cost_centers`: Exposes CRUD operations for the **cost_centers** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Cost_centers
    * const cost_centers = await prisma.cost_centers.findMany()
    * ```
    */
  get cost_centers(): Prisma.cost_centersDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.credits`: Exposes CRUD operations for the **credits** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Credits
    * const credits = await prisma.credits.findMany()
    * ```
    */
  get credits(): Prisma.creditsDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.movement_matches`: Exposes CRUD operations for the **movement_matches** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Movement_matches
    * const movement_matches = await prisma.movement_matches.findMany()
    * ```
    */
  get movement_matches(): Prisma.movement_matchesDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.obligation_documents`: Exposes CRUD operations for the **obligation_documents** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Obligation_documents
    * const obligation_documents = await prisma.obligation_documents.findMany()
    * ```
    */
  get obligation_documents(): Prisma.obligation_documentsDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.obligation_types`: Exposes CRUD operations for the **obligation_types** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Obligation_types
    * const obligation_types = await prisma.obligation_types.findMany()
    * ```
    */
  get obligation_types(): Prisma.obligation_typesDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.obligations`: Exposes CRUD operations for the **obligations** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Obligations
    * const obligations = await prisma.obligations.findMany()
    * ```
    */
  get obligations(): Prisma.obligationsDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.projects`: Exposes CRUD operations for the **projects** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Projects
    * const projects = await prisma.projects.findMany()
    * ```
    */
  get projects(): Prisma.projectsDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.sub_accounts`: Exposes CRUD operations for the **sub_accounts** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Sub_accounts
    * const sub_accounts = await prisma.sub_accounts.findMany()
    * ```
    */
  get sub_accounts(): Prisma.sub_accountsDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.uf_rates`: Exposes CRUD operations for the **uf_rates** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Uf_rates
    * const uf_rates = await prisma.uf_rates.findMany()
    * ```
    */
  get uf_rates(): Prisma.uf_ratesDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.users`: Exposes CRUD operations for the **users** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.users.findMany()
    * ```
    */
  get users(): Prisma.usersDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.7.0
   * Query Engine version: 3cff47a7f5d65c3ea74883f1d736e41d68ce91ed
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    bank_accounts: 'bank_accounts',
    bank_movements: 'bank_movements',
    companies: 'companies',
    cost_centers: 'cost_centers',
    credits: 'credits',
    movement_matches: 'movement_matches',
    obligation_documents: 'obligation_documents',
    obligation_types: 'obligation_types',
    obligations: 'obligations',
    projects: 'projects',
    sub_accounts: 'sub_accounts',
    uf_rates: 'uf_rates',
    users: 'users'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternacionalalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternacionalalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "bank_accounts" | "bank_movements" | "companies" | "cost_centers" | "credits" | "movement_matches" | "obligation_documents" | "obligation_types" | "obligations" | "projects" | "sub_accounts" | "uf_rates" | "users"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      bank_accounts: {
        payload: Prisma.$bank_accountsPayload<ExtArgs>
        fields: Prisma.bank_accountsFieldRefs
        operations: {
          findUnique: {
            args: Prisma.bank_accountsFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$bank_accountsPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.bank_accountsFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$bank_accountsPayload>
          }
          findFirst: {
            args: Prisma.bank_accountsFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$bank_accountsPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.bank_accountsFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$bank_accountsPayload>
          }
          findMany: {
            args: Prisma.bank_accountsFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$bank_accountsPayload>[]
          }
          create: {
            args: Prisma.bank_accountsCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$bank_accountsPayload>
          }
          createMany: {
            args: Prisma.bank_accountsCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.bank_accountsCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$bank_accountsPayload>[]
          }
          delete: {
            args: Prisma.bank_accountsDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$bank_accountsPayload>
          }
          update: {
            args: Prisma.bank_accountsUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$bank_accountsPayload>
          }
          deleteMany: {
            args: Prisma.bank_accountsDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.bank_accountsUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.bank_accountsUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$bank_accountsPayload>[]
          }
          upsert: {
            args: Prisma.bank_accountsUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$bank_accountsPayload>
          }
          aggregate: {
            args: Prisma.Bank_accountsAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateBank_accounts>
          }
          groupBy: {
            args: Prisma.bank_accountsGroupByArgs<ExtArgs>
            result: $Utils.Optional<Bank_accountsGroupByOutputType>[]
          }
          count: {
            args: Prisma.bank_accountsCountArgs<ExtArgs>
            result: $Utils.Optional<Bank_accountsCountAggregateOutputType> | number
          }
        }
      }
      bank_movements: {
        payload: Prisma.$bank_movementsPayload<ExtArgs>
        fields: Prisma.bank_movementsFieldRefs
        operations: {
          findUnique: {
            args: Prisma.bank_movementsFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$bank_movementsPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.bank_movementsFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$bank_movementsPayload>
          }
          findFirst: {
            args: Prisma.bank_movementsFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$bank_movementsPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.bank_movementsFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$bank_movementsPayload>
          }
          findMany: {
            args: Prisma.bank_movementsFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$bank_movementsPayload>[]
          }
          create: {
            args: Prisma.bank_movementsCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$bank_movementsPayload>
          }
          createMany: {
            args: Prisma.bank_movementsCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.bank_movementsCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$bank_movementsPayload>[]
          }
          delete: {
            args: Prisma.bank_movementsDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$bank_movementsPayload>
          }
          update: {
            args: Prisma.bank_movementsUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$bank_movementsPayload>
          }
          deleteMany: {
            args: Prisma.bank_movementsDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.bank_movementsUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.bank_movementsUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$bank_movementsPayload>[]
          }
          upsert: {
            args: Prisma.bank_movementsUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$bank_movementsPayload>
          }
          aggregate: {
            args: Prisma.Bank_movementsAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateBank_movements>
          }
          groupBy: {
            args: Prisma.bank_movementsGroupByArgs<ExtArgs>
            result: $Utils.Optional<Bank_movementsGroupByOutputType>[]
          }
          count: {
            args: Prisma.bank_movementsCountArgs<ExtArgs>
            result: $Utils.Optional<Bank_movementsCountAggregateOutputType> | number
          }
        }
      }
      companies: {
        payload: Prisma.$companiesPayload<ExtArgs>
        fields: Prisma.companiesFieldRefs
        operations: {
          findUnique: {
            args: Prisma.companiesFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$companiesPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.companiesFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$companiesPayload>
          }
          findFirst: {
            args: Prisma.companiesFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$companiesPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.companiesFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$companiesPayload>
          }
          findMany: {
            args: Prisma.companiesFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$companiesPayload>[]
          }
          create: {
            args: Prisma.companiesCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$companiesPayload>
          }
          createMany: {
            args: Prisma.companiesCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.companiesCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$companiesPayload>[]
          }
          delete: {
            args: Prisma.companiesDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$companiesPayload>
          }
          update: {
            args: Prisma.companiesUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$companiesPayload>
          }
          deleteMany: {
            args: Prisma.companiesDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.companiesUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.companiesUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$companiesPayload>[]
          }
          upsert: {
            args: Prisma.companiesUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$companiesPayload>
          }
          aggregate: {
            args: Prisma.CompaniesAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCompanies>
          }
          groupBy: {
            args: Prisma.companiesGroupByArgs<ExtArgs>
            result: $Utils.Optional<CompaniesGroupByOutputType>[]
          }
          count: {
            args: Prisma.companiesCountArgs<ExtArgs>
            result: $Utils.Optional<CompaniesCountAggregateOutputType> | number
          }
        }
      }
      cost_centers: {
        payload: Prisma.$cost_centersPayload<ExtArgs>
        fields: Prisma.cost_centersFieldRefs
        operations: {
          findUnique: {
            args: Prisma.cost_centersFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$cost_centersPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.cost_centersFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$cost_centersPayload>
          }
          findFirst: {
            args: Prisma.cost_centersFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$cost_centersPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.cost_centersFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$cost_centersPayload>
          }
          findMany: {
            args: Prisma.cost_centersFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$cost_centersPayload>[]
          }
          create: {
            args: Prisma.cost_centersCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$cost_centersPayload>
          }
          createMany: {
            args: Prisma.cost_centersCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.cost_centersCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$cost_centersPayload>[]
          }
          delete: {
            args: Prisma.cost_centersDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$cost_centersPayload>
          }
          update: {
            args: Prisma.cost_centersUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$cost_centersPayload>
          }
          deleteMany: {
            args: Prisma.cost_centersDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.cost_centersUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.cost_centersUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$cost_centersPayload>[]
          }
          upsert: {
            args: Prisma.cost_centersUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$cost_centersPayload>
          }
          aggregate: {
            args: Prisma.Cost_centersAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCost_centers>
          }
          groupBy: {
            args: Prisma.cost_centersGroupByArgs<ExtArgs>
            result: $Utils.Optional<Cost_centersGroupByOutputType>[]
          }
          count: {
            args: Prisma.cost_centersCountArgs<ExtArgs>
            result: $Utils.Optional<Cost_centersCountAggregateOutputType> | number
          }
        }
      }
      credits: {
        payload: Prisma.$creditsPayload<ExtArgs>
        fields: Prisma.creditsFieldRefs
        operations: {
          findUnique: {
            args: Prisma.creditsFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$creditsPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.creditsFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$creditsPayload>
          }
          findFirst: {
            args: Prisma.creditsFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$creditsPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.creditsFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$creditsPayload>
          }
          findMany: {
            args: Prisma.creditsFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$creditsPayload>[]
          }
          create: {
            args: Prisma.creditsCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$creditsPayload>
          }
          createMany: {
            args: Prisma.creditsCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.creditsCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$creditsPayload>[]
          }
          delete: {
            args: Prisma.creditsDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$creditsPayload>
          }
          update: {
            args: Prisma.creditsUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$creditsPayload>
          }
          deleteMany: {
            args: Prisma.creditsDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.creditsUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.creditsUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$creditsPayload>[]
          }
          upsert: {
            args: Prisma.creditsUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$creditsPayload>
          }
          aggregate: {
            args: Prisma.CreditsAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCredits>
          }
          groupBy: {
            args: Prisma.creditsGroupByArgs<ExtArgs>
            result: $Utils.Optional<CreditsGroupByOutputType>[]
          }
          count: {
            args: Prisma.creditsCountArgs<ExtArgs>
            result: $Utils.Optional<CreditsCountAggregateOutputType> | number
          }
        }
      }
      movement_matches: {
        payload: Prisma.$movement_matchesPayload<ExtArgs>
        fields: Prisma.movement_matchesFieldRefs
        operations: {
          findUnique: {
            args: Prisma.movement_matchesFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$movement_matchesPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.movement_matchesFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$movement_matchesPayload>
          }
          findFirst: {
            args: Prisma.movement_matchesFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$movement_matchesPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.movement_matchesFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$movement_matchesPayload>
          }
          findMany: {
            args: Prisma.movement_matchesFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$movement_matchesPayload>[]
          }
          create: {
            args: Prisma.movement_matchesCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$movement_matchesPayload>
          }
          createMany: {
            args: Prisma.movement_matchesCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.movement_matchesCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$movement_matchesPayload>[]
          }
          delete: {
            args: Prisma.movement_matchesDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$movement_matchesPayload>
          }
          update: {
            args: Prisma.movement_matchesUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$movement_matchesPayload>
          }
          deleteMany: {
            args: Prisma.movement_matchesDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.movement_matchesUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.movement_matchesUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$movement_matchesPayload>[]
          }
          upsert: {
            args: Prisma.movement_matchesUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$movement_matchesPayload>
          }
          aggregate: {
            args: Prisma.Movement_matchesAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateMovement_matches>
          }
          groupBy: {
            args: Prisma.movement_matchesGroupByArgs<ExtArgs>
            result: $Utils.Optional<Movement_matchesGroupByOutputType>[]
          }
          count: {
            args: Prisma.movement_matchesCountArgs<ExtArgs>
            result: $Utils.Optional<Movement_matchesCountAggregateOutputType> | number
          }
        }
      }
      obligation_documents: {
        payload: Prisma.$obligation_documentsPayload<ExtArgs>
        fields: Prisma.obligation_documentsFieldRefs
        operations: {
          findUnique: {
            args: Prisma.obligation_documentsFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$obligation_documentsPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.obligation_documentsFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$obligation_documentsPayload>
          }
          findFirst: {
            args: Prisma.obligation_documentsFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$obligation_documentsPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.obligation_documentsFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$obligation_documentsPayload>
          }
          findMany: {
            args: Prisma.obligation_documentsFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$obligation_documentsPayload>[]
          }
          create: {
            args: Prisma.obligation_documentsCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$obligation_documentsPayload>
          }
          createMany: {
            args: Prisma.obligation_documentsCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.obligation_documentsCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$obligation_documentsPayload>[]
          }
          delete: {
            args: Prisma.obligation_documentsDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$obligation_documentsPayload>
          }
          update: {
            args: Prisma.obligation_documentsUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$obligation_documentsPayload>
          }
          deleteMany: {
            args: Prisma.obligation_documentsDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.obligation_documentsUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.obligation_documentsUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$obligation_documentsPayload>[]
          }
          upsert: {
            args: Prisma.obligation_documentsUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$obligation_documentsPayload>
          }
          aggregate: {
            args: Prisma.Obligation_documentsAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateObligation_documents>
          }
          groupBy: {
            args: Prisma.obligation_documentsGroupByArgs<ExtArgs>
            result: $Utils.Optional<Obligation_documentsGroupByOutputType>[]
          }
          count: {
            args: Prisma.obligation_documentsCountArgs<ExtArgs>
            result: $Utils.Optional<Obligation_documentsCountAggregateOutputType> | number
          }
        }
      }
      obligation_types: {
        payload: Prisma.$obligation_typesPayload<ExtArgs>
        fields: Prisma.obligation_typesFieldRefs
        operations: {
          findUnique: {
            args: Prisma.obligation_typesFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$obligation_typesPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.obligation_typesFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$obligation_typesPayload>
          }
          findFirst: {
            args: Prisma.obligation_typesFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$obligation_typesPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.obligation_typesFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$obligation_typesPayload>
          }
          findMany: {
            args: Prisma.obligation_typesFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$obligation_typesPayload>[]
          }
          create: {
            args: Prisma.obligation_typesCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$obligation_typesPayload>
          }
          createMany: {
            args: Prisma.obligation_typesCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.obligation_typesCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$obligation_typesPayload>[]
          }
          delete: {
            args: Prisma.obligation_typesDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$obligation_typesPayload>
          }
          update: {
            args: Prisma.obligation_typesUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$obligation_typesPayload>
          }
          deleteMany: {
            args: Prisma.obligation_typesDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.obligation_typesUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.obligation_typesUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$obligation_typesPayload>[]
          }
          upsert: {
            args: Prisma.obligation_typesUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$obligation_typesPayload>
          }
          aggregate: {
            args: Prisma.Obligation_typesAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateObligation_types>
          }
          groupBy: {
            args: Prisma.obligation_typesGroupByArgs<ExtArgs>
            result: $Utils.Optional<Obligation_typesGroupByOutputType>[]
          }
          count: {
            args: Prisma.obligation_typesCountArgs<ExtArgs>
            result: $Utils.Optional<Obligation_typesCountAggregateOutputType> | number
          }
        }
      }
      obligations: {
        payload: Prisma.$obligationsPayload<ExtArgs>
        fields: Prisma.obligationsFieldRefs
        operations: {
          findUnique: {
            args: Prisma.obligationsFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$obligationsPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.obligationsFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$obligationsPayload>
          }
          findFirst: {
            args: Prisma.obligationsFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$obligationsPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.obligationsFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$obligationsPayload>
          }
          findMany: {
            args: Prisma.obligationsFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$obligationsPayload>[]
          }
          create: {
            args: Prisma.obligationsCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$obligationsPayload>
          }
          createMany: {
            args: Prisma.obligationsCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.obligationsCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$obligationsPayload>[]
          }
          delete: {
            args: Prisma.obligationsDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$obligationsPayload>
          }
          update: {
            args: Prisma.obligationsUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$obligationsPayload>
          }
          deleteMany: {
            args: Prisma.obligationsDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.obligationsUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.obligationsUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$obligationsPayload>[]
          }
          upsert: {
            args: Prisma.obligationsUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$obligationsPayload>
          }
          aggregate: {
            args: Prisma.ObligationsAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateObligations>
          }
          groupBy: {
            args: Prisma.obligationsGroupByArgs<ExtArgs>
            result: $Utils.Optional<ObligationsGroupByOutputType>[]
          }
          count: {
            args: Prisma.obligationsCountArgs<ExtArgs>
            result: $Utils.Optional<ObligationsCountAggregateOutputType> | number
          }
        }
      }
      projects: {
        payload: Prisma.$projectsPayload<ExtArgs>
        fields: Prisma.projectsFieldRefs
        operations: {
          findUnique: {
            args: Prisma.projectsFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$projectsPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.projectsFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$projectsPayload>
          }
          findFirst: {
            args: Prisma.projectsFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$projectsPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.projectsFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$projectsPayload>
          }
          findMany: {
            args: Prisma.projectsFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$projectsPayload>[]
          }
          create: {
            args: Prisma.projectsCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$projectsPayload>
          }
          createMany: {
            args: Prisma.projectsCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.projectsCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$projectsPayload>[]
          }
          delete: {
            args: Prisma.projectsDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$projectsPayload>
          }
          update: {
            args: Prisma.projectsUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$projectsPayload>
          }
          deleteMany: {
            args: Prisma.projectsDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.projectsUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.projectsUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$projectsPayload>[]
          }
          upsert: {
            args: Prisma.projectsUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$projectsPayload>
          }
          aggregate: {
            args: Prisma.ProjectsAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateProjects>
          }
          groupBy: {
            args: Prisma.projectsGroupByArgs<ExtArgs>
            result: $Utils.Optional<ProjectsGroupByOutputType>[]
          }
          count: {
            args: Prisma.projectsCountArgs<ExtArgs>
            result: $Utils.Optional<ProjectsCountAggregateOutputType> | number
          }
        }
      }
      sub_accounts: {
        payload: Prisma.$sub_accountsPayload<ExtArgs>
        fields: Prisma.sub_accountsFieldRefs
        operations: {
          findUnique: {
            args: Prisma.sub_accountsFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$sub_accountsPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.sub_accountsFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$sub_accountsPayload>
          }
          findFirst: {
            args: Prisma.sub_accountsFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$sub_accountsPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.sub_accountsFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$sub_accountsPayload>
          }
          findMany: {
            args: Prisma.sub_accountsFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$sub_accountsPayload>[]
          }
          create: {
            args: Prisma.sub_accountsCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$sub_accountsPayload>
          }
          createMany: {
            args: Prisma.sub_accountsCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.sub_accountsCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$sub_accountsPayload>[]
          }
          delete: {
            args: Prisma.sub_accountsDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$sub_accountsPayload>
          }
          update: {
            args: Prisma.sub_accountsUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$sub_accountsPayload>
          }
          deleteMany: {
            args: Prisma.sub_accountsDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.sub_accountsUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.sub_accountsUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$sub_accountsPayload>[]
          }
          upsert: {
            args: Prisma.sub_accountsUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$sub_accountsPayload>
          }
          aggregate: {
            args: Prisma.Sub_accountsAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSub_accounts>
          }
          groupBy: {
            args: Prisma.sub_accountsGroupByArgs<ExtArgs>
            result: $Utils.Optional<Sub_accountsGroupByOutputType>[]
          }
          count: {
            args: Prisma.sub_accountsCountArgs<ExtArgs>
            result: $Utils.Optional<Sub_accountsCountAggregateOutputType> | number
          }
        }
      }
      uf_rates: {
        payload: Prisma.$uf_ratesPayload<ExtArgs>
        fields: Prisma.uf_ratesFieldRefs
        operations: {
          findUnique: {
            args: Prisma.uf_ratesFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$uf_ratesPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.uf_ratesFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$uf_ratesPayload>
          }
          findFirst: {
            args: Prisma.uf_ratesFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$uf_ratesPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.uf_ratesFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$uf_ratesPayload>
          }
          findMany: {
            args: Prisma.uf_ratesFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$uf_ratesPayload>[]
          }
          create: {
            args: Prisma.uf_ratesCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$uf_ratesPayload>
          }
          createMany: {
            args: Prisma.uf_ratesCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.uf_ratesCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$uf_ratesPayload>[]
          }
          delete: {
            args: Prisma.uf_ratesDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$uf_ratesPayload>
          }
          update: {
            args: Prisma.uf_ratesUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$uf_ratesPayload>
          }
          deleteMany: {
            args: Prisma.uf_ratesDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.uf_ratesUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.uf_ratesUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$uf_ratesPayload>[]
          }
          upsert: {
            args: Prisma.uf_ratesUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$uf_ratesPayload>
          }
          aggregate: {
            args: Prisma.Uf_ratesAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUf_rates>
          }
          groupBy: {
            args: Prisma.uf_ratesGroupByArgs<ExtArgs>
            result: $Utils.Optional<Uf_ratesGroupByOutputType>[]
          }
          count: {
            args: Prisma.uf_ratesCountArgs<ExtArgs>
            result: $Utils.Optional<Uf_ratesCountAggregateOutputType> | number
          }
        }
      }
      users: {
        payload: Prisma.$usersPayload<ExtArgs>
        fields: Prisma.usersFieldRefs
        operations: {
          findUnique: {
            args: Prisma.usersFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$usersPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.usersFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$usersPayload>
          }
          findFirst: {
            args: Prisma.usersFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$usersPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.usersFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$usersPayload>
          }
          findMany: {
            args: Prisma.usersFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$usersPayload>[]
          }
          create: {
            args: Prisma.usersCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$usersPayload>
          }
          createMany: {
            args: Prisma.usersCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.usersCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$usersPayload>[]
          }
          delete: {
            args: Prisma.usersDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$usersPayload>
          }
          update: {
            args: Prisma.usersUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$usersPayload>
          }
          deleteMany: {
            args: Prisma.usersDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.usersUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.usersUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$usersPayload>[]
          }
          upsert: {
            args: Prisma.usersUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$usersPayload>
          }
          aggregate: {
            args: Prisma.UsersAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUsers>
          }
          groupBy: {
            args: Prisma.usersGroupByArgs<ExtArgs>
            result: $Utils.Optional<UsersGroupByOutputType>[]
          }
          count: {
            args: Prisma.usersCountArgs<ExtArgs>
            result: $Utils.Optional<UsersCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *   { emit: 'stdout', level: 'query' },
     *   { emit: 'stdout', level: 'info' },
     *   { emit: 'stdout', level: 'warn' }
     *   { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    bank_accounts?: bank_accountsOmit
    bank_movements?: bank_movementsOmit
    companies?: companiesOmit
    cost_centers?: cost_centersOmit
    credits?: creditsOmit
    movement_matches?: movement_matchesOmit
    obligation_documents?: obligation_documentsOmit
    obligation_types?: obligation_typesOmit
    obligations?: obligationsOmit
    projects?: projectsOmit
    sub_accounts?: sub_accountsOmit
    uf_rates?: uf_ratesOmit
    users?: usersOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => $Utils.JsPromise<T>,
  ) => $Utils.JsPromise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type Bank_accountsCountOutputType
   */

  export type Bank_accountsCountOutputType = {
    bank_movements: number
  }

  export type Bank_accountsCountOutputTypeSelect<ExtArgs extends $Extensions.InternacionalalArgs = $Extensions.DefaultArgs> = {
    bank_movements?: boolean | Bank_accountsCountOutputTypeCountBank_movementsArgs
  }

  // Custom InputTypes
  /**
   * Bank_accountsCountOutputType without action
   */
  export type Bank_accountsCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternacionalalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Bank_accountsCountOutputType
     */
    select?: Bank_accountsCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * Bank_accountsCountOutputType without action
   */
  export type Bank_accountsCountOutputTypeCountBank_movementsArgs<ExtArgs extends $Extensions.InternacionalalArgs = $Extensions.DefaultArgs> = {
    where?: bank_movementsWhereInput
  }


  /**
   * Count Type Bank_movementsCountOutputType
   */

  export type Bank_movementsCountOutputType = {
    movement_matches: number
  }

  export type Bank_movementsCountOutputTypeSelect<ExtArgs extends $Extensions.InternacionalalArgs = $Extensions.DefaultArgs> = {
    movement_matches?: boolean | Bank_movementsCountOutputTypeCountMovement_matchesArgs
  }

  // Custom InputTypes
  /**
   * Bank_movementsCountOutputType without action
   */
  export type Bank_movementsCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternacionalalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Bank_movementsCountOutputType
     */
    select?: Bank_movementsCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * Bank_movementsCountOutputType without action
   */
  export type Bank_movementsCountOutputTypeCountMovement_matchesArgs<ExtArgs extends $Extensions.InternacionalalArgs = $Extensions.DefaultArgs> = {
    where?: movement_matchesWhereInput
  }


  /**
   * Count Type CompaniesCountOutputType
   */

  export type CompaniesCountOutputType = {
    bank_accounts: number
    projects: number
  }

  export type CompaniesCountOutputTypeSelect<ExtArgs extends $Extensions.InternacionalalArgs = $Extensions.DefaultArgs> = {
    bank_accounts?: boolean | CompaniesCountOutputTypeCountBank_accountsArgs
    projects?: boolean | CompaniesCountOutputTypeCountProjectsArgs
  }

  // Custom InputTypes
  /**
   * CompaniesCountOutputType without action
   */
  export type CompaniesCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternacionalalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CompaniesCountOutputType
     */
    select?: CompaniesCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * CompaniesCountOutputType without action
   */
  export type CompaniesCountOutputTypeCountBank_accountsArgs<ExtArgs extends $Extensions.InternacionalalArgs = $Extensions.DefaultArgs> = {
    where?: bank_accountsWhereInput
  }

  /**
   * CompaniesCountOutputType without action
   */
  export type CompaniesCountOutputTypeCountProjectsArgs<ExtArgs extends $Extensions.InternacionalalArgs = $Extensions.DefaultArgs> = {
    where?: projectsWhereInput
  }


  /**
   * Count Type Cost_centersCountOutputType
   */

  export type Cost_centersCountOutputType = {
    other_cost_centers: number
    sub_accounts: number
  }

  export type Cost_centersCountOutputTypeSelect<ExtArgs extends $Extensions.InternacionalalArgs = $Extensions.DefaultArgs> = {
    other_cost_centers?: boolean | Cost_centersCountOutputTypeCountOther_cost_centersArgs
    sub_accounts?: boolean | Cost_centersCountOutputTypeCountSub_accountsArgs
  }

  // Custom InputTypes
  /**
   * Cost_centersCountOutputType without action
   */
  export type Cost_centersCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternacionalalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Cost_centersCountOutputType
     */
    select?: Cost_centersCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * Cost_centersCountOutputType without action
   */
  export type Cost_centersCountOutputTypeCountOther_cost_centersArgs<ExtArgs extends $Extensions.InternacionalalArgs = $Extensions.DefaultArgs> = {
    where?: cost_centersWhereInput
  }

  /**
   * Cost_centersCountOutputType without action
   */
  export type Cost_centersCountOutputTypeCountSub_accountsArgs<ExtArgs extends $Extensions.InternacionalalArgs = $Extensions.DefaultArgs> = {
    where?: sub_accountsWhereInput
  }


  /**
   * Count Type Obligation_typesCountOutputType
   */

  export type Obligation_typesCountOutputType = {
    obligations: number
  }

  export type Obligation_typesCountOutputTypeSelect<ExtArgs extends $Extensions.InternacionalalArgs = $Extensions.DefaultArgs> = {
    obligations?: boolean | Obligation_typesCountOutputTypeCountObligationsArgs
  }

  // Custom InputTypes
  /**
   * Obligation_typesCountOutputType without action
   */
  export type Obligation_typesCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternacionalalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Obligation_typesCountOutputType
     */
    select?: Obligation_typesCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * Obligation_typesCountOutputType without action
   */
  export type Obligation_typesCountOutputTypeCountObligationsArgs<ExtArgs extends $Extensions.InternacionalalArgs = $Extensions.DefaultArgs> = {
    where?: obligationsWhereInput
  }


  /**
   * Count Type ObligationsCountOutputType
   */

  export type ObligationsCountOutputType = {
    movement_matches: number
    obligation_documents: number
  }

  export type ObligationsCountOutputTypeSelect<ExtArgs extends $Extensions.InternacionalalArgs = $Extensions.DefaultArgs> = {
    movement_matches?: boolean | ObligationsCountOutputTypeCountMovement_matchesArgs
    obligation_documents?: boolean | ObligationsCountOutputTypeCountObligation_documentsArgs
  }

  // Custom InputTypes
  /**
   * ObligationsCountOutputType without action
   */
  export type ObligationsCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternacionalalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ObligationsCountOutputType
     */
    select?: ObligationsCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * ObligationsCountOutputType without action
   */
  export type ObligationsCountOutputTypeCountMovement_matchesArgs<ExtArgs extends $Extensions.InternacionalalArgs = $Extensions.DefaultArgs> = {
    where?: movement_matchesWhereInput
  }

  /**
   * ObligationsCountOutputType without action
   */
  export type ObligationsCountOutputTypeCountObligation_documentsArgs<ExtArgs extends $Extensions.InternacionalalArgs = $Extensions.DefaultArgs> = {
    where?: obligation_documentsWhereInput
  }


  /**
   * Count Type ProjectsCountOutputType
   */

  export type ProjectsCountOutputType = {
    bank_movements: number
    obligations: number
  }

  export type ProjectsCountOutputTypeSelect<ExtArgs extends $Extensions.InternacionalalArgs = $Extensions.DefaultArgs> = {
    bank_movements?: boolean | ProjectsCountOutputTypeCountBank_movementsArgs
    obligations?: boolean | ProjectsCountOutputTypeCountObligationsArgs
  }

  // Custom InputTypes
  /**
   * ProjectsCountOutputType without action
   */
  export type ProjectsCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternacionalalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProjectsCountOutputType
     */
    select?: ProjectsCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * ProjectsCountOutputType without action
   */
  export type ProjectsCountOutputTypeCountBank_movementsArgs<ExtArgs extends $Extensions.InternacionalalArgs = $Extensions.DefaultArgs> = {
    where?: bank_movementsWhereInput
  }

  /**
   * ProjectsCountOutputType without action
   */
  export type ProjectsCountOutputTypeCountObligationsArgs<ExtArgs extends $Extensions.InternacionalalArgs = $Extensions.DefaultArgs> = {
    where?: obligationsWhereInput
  }


  /**
   * Count Type Sub_accountsCountOutputType
   */

  export type Sub_accountsCountOutputType = {
    bank_movements: number
  }

  export type Sub_accountsCountOutputTypeSelect<ExtArgs extends $Extensions.InternacionalalArgs = $Extensions.DefaultArgs> = {
    bank_movements?: boolean | Sub_accountsCountOutputTypeCountBank_movementsArgs
  }

  // Custom InputTypes
  /**
   * Sub_accountsCountOutputType without action
   */
  export type Sub_accountsCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternacionalalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Sub_accountsCountOutputType
     */
    select?: Sub_accountsCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * Sub_accountsCountOutputType without action
   */
  export type Sub_accountsCountOutputTypeCountBank_movementsArgs<ExtArgs extends $Extensions.InternacionalalArgs = $Extensions.DefaultArgs> = {
    where?: bank_movementsWhereInput
  }


  /**
   * Count Type UsersCountOutputType
   */

  export type UsersCountOutputType = {
    bank_movements: number
    obligation_documents: number
  }

  export type UsersCountOutputTypeSelect<ExtArgs extends $Extensions.InternacionalalArgs = $Extensions.DefaultArgs> = {
    bank_movements?: boolean | UsersCountOutputTypeCountBank_movementsArgs
    obligation_documents?: boolean | UsersCountOutputTypeCountObligation_documentsArgs
  }

  // Custom InputTypes
  /**
   * UsersCountOutputType without action
   */
  export type UsersCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternacionalalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UsersCountOutputType
     */
    select?: UsersCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UsersCountOutputType without action
   */
  export type UsersCountOutputTypeCountBank_movementsArgs<ExtArgs extends $Extensions.InternacionalalArgs = $Extensions.DefaultArgs> = {
    where?: bank_movementsWhereInput
  }

  /**
   * UsersCountOutputType without action
   */
  export type UsersCountOutputTypeCountObligation_documentsArgs<ExtArgs extends $Extensions.InternacionalalArgs = $Extensions.DefaultArgs> = {
    where?: obligation_documentsWhereInput
  }


  /**
   * Models
   */

  /**
   * Model bank_accounts
   */

  export type AggregateBank_accounts = {
    _count: Bank_accountsCountAggregateOutputType | null
    _avg: Bank_accountsAvgAggregateOutputType | null
    _sum: Bank_accountsSumAggregateOutputType | null
    _min: Bank_accountsMinAggregateOutputType | null
    _max: Bank_accountsMaxAggregateOutputType | null
  }

  export type Bank_accountsAvgAggregateOutputType = {
    id: number | null
    company_id: number | null
  }

  export type Bank_accountsSumAggregateOutputType = {
    id: number | null
    company_id: number | null
  }

  export type Bank_accountsMinAggregateOutputType = {
    id: number | null
    company_id: number | null
    bank_name: string | null
    account_no: string | null
    currency: string | null
    created_at: Date | null
  }

  export type Bank_accountsMaxAggregateOutputType = {
    id: number | null
    company_id: number | null
    bank_name: string | null
    account_no: string | null
    currency: string | null
    created_at: Date | null
  }

  export type Bank_accountsCountAggregateOutputType = {
    id: number
    company_id: number
    bank_name: number
    account_no: number
    currency: number
    created_at: number
    _all: number
  }


  export type Bank_accountsAvgAggregateInputType = {
    id?: true
    company_id?: true
  }

  export type Bank_accountsSumAggregateInputType = {
    id?: true
    company_id?: true
  }

  export type Bank_accountsMinAggregateInputType = {
    id?: true
    company_id?: true
    bank_name?: true
    account_no?: true
    currency?: true
    created_at?: true
  }

  export type Bank_accountsMaxAggregateInputType = {
    id?: true
    company_id?: true
    bank_name?: true
    account_no?: true
    currency?: true
    created_at?: true
  }

  export type Bank_accountsCountAggregateInputType = {
    id?: true
    company_id?: true
    bank_name?: true
    account_no?: true
    currency?: true
    created_at?: true
    _all?: true
  }

  export type Bank_accountsAggregateArgs<ExtArgs extends $Extensions.InternacionalalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which bank_accounts to aggregate.
     */
    where?: bank_accountsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of bank_accounts to fetch.
     */
    orderBy?: bank_accountsOrderByWithRelationInput | bank_accountsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: bank_accountsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` bank_accounts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` bank_accounts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned bank_accounts
    **/
    _count?: true | Bank_accountsCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: Bank_accountsAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: Bank_accountsSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: Bank_accountsMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: Bank_accountsMaxAggregateInputType
  }

  export type GetBank_accountsAggregateType<T extends Bank_accountsAggregateArgs> = {
        [P in keyof T & keyof AggregateBank_accounts]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateBank_accounts[P]>
      : GetScalarType<T[P], AggregateBank_accounts[P]>
  }




  export type bank_accountsGroupByArgs<ExtArgs extends $Extensions.InternacionalalArgs = $Extensions.DefaultArgs> = {
    where?: bank_accountsWhereInput
    orderBy?: bank_accountsOrderByWithAggregationInput | bank_accountsOrderByWithAggregationInput[]
    by: Bank_accountsScalarFieldEnum[] | Bank_accountsScalarFieldEnum
    having?: bank_accountsScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: Bank_accountsCountAggregateInputType | true
    _avg?: Bank_accountsAvgAggregateInputType
    _sum?: Bank_accountsSumAggregateInputType
    _min?: Bank_accountsMinAggregateInputType
    _max?: Bank_accountsMaxAggregateInputType
  }

  export type Bank_accountsGroupByOutputType = {
    id: number
    company_id: number
    bank_name: string
    account_no: string
    currency: string
    created_at: Date
    _count: Bank_accountsCountAggregateOutputType | null
    _avg: Bank_accountsAvgAggregateOutputType | null
    _sum: Bank_accountsSumAggregateOutputType | null
    _min: Bank_accountsMinAggregateOutputType | null
    _max: Bank_accountsMaxAggregateOutputType | null
  }

  type GetBank_accountsGroupByPayload<T extends bank_accountsGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<Bank_accountsGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof Bank_accountsGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], Bank_accountsGroupByOutputType[P]>
            : GetScalarType<T[P], Bank_accountsGroupByOutputType[P]>
        }
      >
    >


  export type bank_accountsSelect<ExtArgs extends $Extensions.InternacionalalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    company_id?: boolean
    bank_name?: boolean
    account_no?: boolean
    currency?: boolean
    created_at?: boolean
    companies?: boolean | companiesDefaultArgs<ExtArgs>
    bank_movements?: boolean | bank_accounts$bank_movementsArgs<ExtArgs>
    _count?: boolean | Bank_accountsCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["bank_accounts"]>

  export type bank_accountsSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternacionalalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    company_id?: boolean
    bank_name?: boolean
    account_no?: boolean
    currency?: boolean
    created_at?: boolean
    companies?: boolean | companiesDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["bank_accounts"]>

  export type bank_accountsSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternacionalalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    company_id?: boolean
    bank_name?: boolean
    account_no?: boolean
    currency?: boolean
    created_at?: boolean
    companies?: boolean | companiesDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["bank_accounts"]>

  export type bank_accountsSelectScalar = {
    id?: boolean
    company_id?: boolean
    bank_name?: boolean
    account_no?: boolean
    currency?: boolean
    created_at?: boolean
  }

  export type bank_accountsOmit<ExtArgs extends $Extensions.InternacionalalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "company_id" | "bank_name" | "account_no" | "currency" | "created_at", ExtArgs["result"]["bank_accounts"]>
  export type bank_accountsInclude<ExtArgs extends $Extensions.InternacionalalArgs = $Extensions.DefaultArgs> = {
    companies?: boolean | companiesDefaultArgs<ExtArgs>
    bank_movements?: boolean | bank_accounts$bank_movementsArgs<ExtArgs>
    _count?: boolean | Bank_accountsCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type bank_accountsIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternacionalalArgs = $Extensions.DefaultArgs> = {
    companies?: boolean | companiesDefaultArgs<ExtArgs>
  }
  export type bank_accountsIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternacionalalArgs = $Extensions.DefaultArgs> = {
    companies?: boolean | companiesDefaultArgs<ExtArgs>
  }

  export type $bank_accountsPayload<ExtArgs extends $Extensions.InternacionalalArgs = $Extensions.DefaultArgs> = {
    name: "bank_accounts"
    objects: {
      companies: Prisma.$companiesPayload<ExtArgs>
      bank_movements: Prisma.$bank_movementsPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      company_id: number
      bank_name: string
      account_no: string
      currency: string
      created_at: Date
    }, ExtArgs["result"]["bank_accounts"]>
    composites: {}
  }

  type bank_accountsGetPayload<S extends boolean | null | undefined | bank_accountsDefaultArgs> = $Result.GetResult<Prisma.$bank_accountsPayload, S>

  type bank_accountsCountArgs<ExtArgs extends $Extensions.InternacionalalArgs = $Extensions.DefaultArgs> =
    Omit<bank_accountsFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: Bank_accountsCountAggregateInputType | true
    }

  export interface bank_accountsDelegate<ExtArgs extends $Extensions.InternacionalalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['bank_accounts'], meta: { name: 'bank_accounts' } }
    /**
     * Find zero or one Bank_accounts that matches the filter.
     * @param {bank_accountsFindUniqueArgs} args - Arguments to find a Bank_accounts
     * @example
     * // Get one Bank_accounts
     * const bank_accounts = await prisma.bank_accounts.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends bank_accountsFindUniqueArgs>(args: SelectSubset<T, bank_accountsFindUniqueArgs<ExtArgs>>): Prisma__bank_accountsClient<$Result.GetResult<Prisma.$bank_accountsPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Bank_accounts that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {bank_accountsFindUniqueOrThrowArgs} args - Arguments to find a Bank_accounts
     * @example
     * // Get one Bank_accounts
     * const bank_accounts = await prisma.bank_accounts.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends bank_accountsFindUniqueOrThrowArgs>(args: SelectSubset<T, bank_accountsFindUniqueOrThrowArgs<ExtArgs>>): Prisma__bank_accountsClient<$Result.GetResult<Prisma.$bank_accountsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Bank_accounts that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {bank_accountsFindFirstArgs} args - Arguments to find a Bank_accounts
     * @example
     * // Get one Bank_accounts
     * const bank_accounts = await prisma.bank_accounts.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends bank_accountsFindFirstArgs>(args?: SelectSubset<T, bank_accountsFindFirstArgs<ExtArgs>>): Prisma__bank_accountsClient<$Result.GetResult<Prisma.$bank_accountsPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Bank_accounts that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {bank_accountsFindFirstOrThrowArgs} args - Arguments to find a Bank_accounts
     * @example
     * // Get one Bank_accounts
     * const bank_accounts = await prisma.bank_accounts.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends bank_accountsFindFirstOrThrowArgs>(args?: SelectSubset<T, bank_accountsFindFirstOrThrowArgs<ExtArgs>>): Prisma__bank_accountsClient<$Result.GetResult<Prisma.$bank_accountsPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Bank_accounts that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {bank_accountsFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Bank_accounts
     * const bank_accounts = await prisma.bank_accounts.findMany()
     * 
     * // Get first 10 Bank_accounts
     * const bank_accounts = await prisma.bank_accounts.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const bank_accountsWithIdOnly = await prisma.bank_accounts.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends bank_accountsFindManyArgs>(args?: SelectSubset<T, bank_accountsFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$bank_accountsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Bank_accounts.
     * @param {bank_accountsCreateArgs} args - Arguments to create a Bank_accounts.
     * @example
     * // Create one Bank_accounts
     * const Bank_accounts = await prisma.bank_accounts.create({
     *   data: {
     *     // ... data to create a Bank_accounts
     *   }
     * })
     * 
     */
    create<T extends bank_accountsCreateArgs>(args: SelectSubset<T, bank_accountsCreateArgs<ExtArgs>>): Prisma__bank_accountsClient<$Result.GetResult<Prisma.$bank_accountsPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Bank_accounts.
     * @param {bank_accountsCreateManyArgs} args - Arguments to create many Bank_accounts.
     * @example
     * // Create many Bank_accounts
     * const bank_accounts = await prisma.bank_accounts.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends bank_accountsCreateManyArgs>(args?: SelectSubset<T, bank_accountsCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Bank_accounts and returns the data saved in the database.
     * @param {bank_accountsCreateManyAndReturnArgs} args - Arguments to create many Bank_accounts.
     * @example
     * // Create many Bank_accounts
     * const bank_accounts = await prisma.bank_accounts.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Bank_accounts and only return the `id`
     * const bank_accountsWithIdOnly = await prisma.bank_accounts.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends bank_accountsCreateManyAndReturnArgs>(args?: SelectSubset<T, bank_accountsCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$bank_accountsPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Bank_accounts.
     * @param {bank_accountsDeleteArgs} args - Arguments to delete one Bank_accounts.
     * @example
     * // Delete one Bank_accounts
     * const Bank_accounts = await prisma.bank_accounts.delete({
     *   where: {
     *     // ... filter to delete one Bank_accounts
     *   }
     * })
     * 
     */
    delete<T extends bank_accountsDeleteArgs>(args: SelectSubset<T, bank_accountsDeleteArgs<ExtArgs>>): Prisma__bank_accountsClient<$Result.GetResult<Prisma.$bank_accountsPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Bank_accounts.
     * @param {bank_accountsUpdateArgs} args - Arguments to update one Bank_accounts.
     * @example
     * // Update one Bank_accounts
     * const bank_accounts = await prisma.bank_accounts.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends bank_accountsUpdateArgs>(args: SelectSubset<T, bank_accountsUpdateArgs<ExtArgs>>): Prisma__bank_accountsClient<$Result.GetResult<Prisma.$bank_accountsPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Bank_accounts.
     * @param {bank_accountsDeleteManyArgs} args - Arguments to filter Bank_accounts to delete.
     * @example
     * // Delete a few Bank_accounts
     * const { count } = await prisma.bank_accounts.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends bank_accountsDeleteManyArgs>(args?: SelectSubset<T, bank_accountsDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Bank_accounts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {bank_accountsUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Bank_accounts
     * const bank_accounts = await prisma.bank_accounts.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends bank_accountsUpdateManyArgs>(args: SelectSubset<T, bank_accountsUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Bank_accounts and returns the data updated in the database.
     * @param {bank_accountsUpdateManyAndReturnArgs} args - Arguments to update many Bank_accounts.
     * @example
     * // Update many Bank_accounts
     * const bank_accounts = await prisma.bank_accounts.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Bank_accounts and only return the `id`
     * const bank_accountsWithIdOnly = await prisma.bank_accounts.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends bank_accountsUpdateManyAndReturnArgs>(args: SelectSubset<T, bank_accountsUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$bank_accountsPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Bank_accounts.
     * @param {bank_accountsUpsertArgs} args - Arguments to update or create a Bank_accounts.
     * @example
     * // Update or create a Bank_accounts
     * const bank_accounts = await prisma.bank_accounts.upsert({
     *   create: {
     *     // ... data to create a Bank_accounts
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Bank_accounts we want to update
     *   }
     * })
     */
    upsert<T extends bank_accountsUpsertArgs>(args: SelectSubset<T, bank_accountsUpsertArgs<ExtArgs>>): Prisma__bank_accountsClient<$Result.GetResult<Prisma.$bank_accountsPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Bank_accounts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {bank_accountsCountArgs} args - Arguments to filter Bank_accounts to count.
     * @example
     * // Count the number of Bank_accounts
     * const count = await prisma.bank_accounts.count({
     *   where: {
     *     // ... the filter for the Bank_accounts we want to count
     *   }
     * })
    **/
    count<T extends bank_accountsCountArgs>(
      args?: Subset<T, bank_accountsCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], Bank_accountsCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Bank_accounts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Bank_accountsAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends Bank_accountsAggregateArgs>(args: Subset<T, Bank_accountsAggregateArgs>): Prisma.PrismaPromise<GetBank_accountsAggregateType<T>>

    /**
     * Group by Bank_accounts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {bank_accountsGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends bank_accountsGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: bank_accountsGroupByArgs['orderBy'] }
        : { orderBy?: bank_accountsGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, bank_accountsGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetBank_accountsGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the bank_accounts model
   */
  readonly fields: bank_accountsFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for bank_accounts.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__bank_accountsClient<T, Null = never, ExtArgs extends $Extensions.InternacionalalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    companies<T extends companiesDefaultArgs<ExtArgs> = {}>(args?: Subset<T, companiesDefaultArgs<ExtArgs>>): Prisma__companiesClient<$Result.GetResult<Prisma.$companiesPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    bank_movements<T extends bank_accounts$bank_movementsArgs<ExtArgs> = {}>(args?: Subset<T, bank_accounts$bank_movementsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$bank_movementsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the bank_accounts model
   */
  interface bank_accountsFieldRefs {
    readonly id: FieldRef<"bank_accounts", 'Int'>
    readonly company_id: FieldRef<"bank_accounts", 'Int'>
    readonly bank_name: FieldRef<"bank_accounts", 'String'>
    readonly account_no: FieldRef<"bank_accounts", 'String'>
    readonly currency: FieldRef<"bank_accounts", 'String'>
    readonly created_at: FieldRef<"bank_accounts", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * bank_accounts findUnique
   */
  export type bank_accountsFindUniqueArgs<ExtArgs extends $Extensions.InternacionalalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the bank_accounts
     */
    select?: bank_accountsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the bank_accounts
     */
    omit?: bank_accountsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: bank_accountsInclude<ExtArgs> | null
    /**
     * Filter, which bank_accounts to fetch.
     */
    where: bank_accountsWhereUniqueInput
  }

  /**
   * bank_accounts findUniqueOrThrow
   */
  export type bank_accountsFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternacionalalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the bank_accounts
     */
    select?: bank_accountsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the bank_accounts
     */
    omit?: bank_accountsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: bank_accountsInclude<ExtArgs> | null
    /**
     * Filter, which bank_accounts to fetch.
     */
    where: bank_accountsWhereUniqueInput
  }

  /**
   * bank_accounts findFirst
   */
  export type bank_accountsFindFirstArgs<ExtArgs extends $Extensions.InternacionalalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the bank_accounts
     */
    select?: bank_accountsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the bank_accounts
     */
    omit?: bank_accountsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: bank_accountsInclude<ExtArgs> | null
    /**
     * Filter, which bank_accounts to fetch.
     */
    where?: bank_accountsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of bank_accounts to fetch.
     */
    orderBy?: bank_accountsOrderByWithRelationInput | bank_accountsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for bank_accounts.
     */
    cursor?: bank_accountsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` bank_accounts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` bank_accounts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of bank_accounts.
     */
    distinct?: Bank_accountsScalarFieldEnum | Bank_accountsScalarFieldEnum[]
  }

  /**
   * bank_accounts findFirstOrThrow
   */
  export type bank_accountsFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternacionalalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the bank_accounts
     */
    select?: bank_accountsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the bank_accounts
     */
    omit?: bank_accountsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: bank_accountsInclude<ExtArgs> | null
    /**
     * Filter, which bank_accounts to fetch.
     */
    where?: bank_accountsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of bank_accounts to fetch.
     */
    orderBy?: bank_accountsOrderByWithRelationInput | bank_accountsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for bank_accounts.
     */
    cursor?: bank_accountsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` bank_accounts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` bank_accounts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of bank_accounts.
     */
    distinct?: Bank_accountsScalarFieldEnum | Bank_accountsScalarFieldEnum[]
  }

  /**
   * bank_accounts findMany
   */
  export type bank_accountsFindManyArgs<ExtArgs extends $Extensions.InternacionalalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the bank_accounts
     */
    select?: bank_accountsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the bank_accounts
     */
    omit?: bank_accountsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: bank_accountsInclude<ExtArgs> | null
    /**
     * Filter, which bank_accounts to fetch.
     */
    where?: bank_accountsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of bank_accounts to fetch.
     */
    orderBy?: bank_accountsOrderByWithRelationInput | bank_accountsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing bank_accounts.
     */
    cursor?: bank_accountsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` bank_accounts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` bank_accounts.
     */
    skip?: number
    distinct?: Bank_accountsScalarFieldEnum | Bank_accountsScalarFieldEnum[]
  }

  /**
   * bank_accounts create
   */
  export type bank_accountsCreateArgs<ExtArgs extends $Extensions.InternacionalalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the bank_accounts
     */
    select?: bank_accountsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the bank_accounts
     */
    omit?: bank_accountsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: bank_accountsInclude<ExtArgs> | null
    /**
     * The data needed to create a bank_accounts.
     */
    data: XOR<bank_accountsCreateInput, bank_accountsUncheckedCreateInput>
  }

  /**
   * bank_accounts createMany
   */
  export type bank_accountsCreateManyArgs<ExtArgs extends $Extensions.InternacionalalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many bank_accounts.
     */
    data: bank_accountsCreateManyInput | bank_accountsCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * bank_accounts createManyAndReturn
   */
  export type bank_accountsCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternacionalalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the bank_accounts
     */
    select?: bank_accountsSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the bank_accounts
     */
    omit?: bank_accountsOmit<ExtArgs> | null
    /**
     * The data used to create many bank_accounts.
     */
    data: bank_accountsCreateManyInput | bank_accountsCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: bank_accountsIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * bank_accounts update
   */
  export type bank_accountsUpdateArgs<ExtArgs extends $Extensions.InternacionalalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the bank_accounts
     */
    select?: bank_accountsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the bank_accounts
     */
    omit?: bank_accountsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: bank_accountsInclude<ExtArgs> | null
    /**
     * The data needed to update a bank_accounts.
     */
    data: XOR<bank_accountsUpdateInput, bank_accountsUncheckedUpdateInput>
    /**
     * Choose, which bank_accounts to update.
     */
    where: bank_accountsWhereUniqueInput
  }

  /**
   * bank_accounts updateMany
   */
  export type bank_accountsUpdateManyArgs<ExtArgs extends $Extensions.InternacionalalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update bank_accounts.
     */
    data: XOR<bank_accountsUpdateManyMutationInput, bank_accountsUncheckedUpdateManyInput>
    /**
     * Filter which bank_accounts to update
     */
    where?: bank_accountsWhereInput
    /**
     * Limit how many bank_accounts to update.
     */
    limit?: number
  }

  /**
   * bank_accounts updateManyAndReturn
   */
  export type bank_accountsUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternacionalalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the bank_accounts
     */
    select?: bank_accountsSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the bank_accounts
     */
    omit?: bank_accountsOmit<ExtArgs> | null
    /**
     * The data used to update bank_accounts.
     */
    data: XOR<bank_accountsUpdateManyMutationInput, bank_accountsUncheckedUpdateManyInput>
    /**
     * Filter which bank_accounts to update
     */
    where?: bank_accountsWhereInput
    /**
     * Limit how many bank_accounts to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: bank_accountsIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * bank_accounts upsert
   */
  export type bank_accountsUpsertArgs<ExtArgs extends $Extensions.InternacionalalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the bank_accounts
     */
    select?: bank_accountsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the bank_accounts
     */
    omit?: bank_accountsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: bank_accountsInclude<ExtArgs> | null
    /**
     * The filter to search for the bank_accounts to update in case it exists.
     */
    where: bank_accountsWhereUniqueInput
    /**
     * In case the bank_accounts found by the `where` argument doesn't exist, create a new bank_accounts with this data.
     */
    create: XOR<bank_accountsCreateInput, bank_accountsUncheckedCreateInput>
    /**
     * In case the bank_accounts was found with the provided `where` argument, update it with this data.
     */
    update: XOR<bank_accountsUpdateInput, bank_accountsUncheckedUpdateInput>
  }

  /**
   * bank_accounts delete
   */
  export type bank_accountsDeleteArgs<ExtArgs extends $Extensions.InternacionalalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the bank_accounts
     */
    select?: bank_accountsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the bank_accounts
     */
    omit?: bank_accountsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: bank_accountsInclude<ExtArgs> | null
    /**
     * Filter which bank_accounts to delete.
     */
    where: bank_accountsWhereUniqueInput
  }

  /**
   * bank_accounts deleteMany
   */
  export type bank_accountsDeleteManyArgs<ExtArgs extends $Extensions.InternacionalalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which bank_accounts to delete
     */
    where?: bank_accountsWhereInput
    /**
     * Limit how many bank_accounts to delete.
     */
    limit?: number
  }

  /**
   * bank_accounts.bank_movements
   */
  export type bank_accounts$bank_movementsArgs<ExtArgs extends $Extensions.InternacionalalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the bank_movements
     */
    select?: bank_movementsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the bank_movements
     */
    omit?: bank_movementsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: bank_movementsInclude<ExtArgs> | null
    where?: bank_movementsWhereInput
    orderBy?: bank_movementsOrderByWithRelationInput | bank_movementsOrderByWithRelationInput[]
    cursor?: bank_movementsWhereUniqueInput
    take?: number
    skip?: number
    distinct?: Bank_movementsScalarFieldEnum | Bank_movementsScalarFieldEnum[]
  }

  /**
   * bank_accounts without action
   */
  export type bank_accountsDefaultArgs<ExtArgs extends $Extensions.InternacionalalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the bank_accounts
     */
    select?: bank_accountsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the bank_accounts
     */
    omit?: bank_accountsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: bank_accountsInclude<ExtArgs> | null
  }


  /**
   * Model bank_movements
   */

  export type AggregateBank_movements = {
    _count: Bank_movementsCountAggregateOutputType | null
    _avg: Bank_movementsAvgAggregateOutputType | null
    _sum: Bank_movementsSumAggregateOutputType | null
    _min: Bank_movementsMinAggregateOutputType | null
    _max: Bank_movementsMaxAggregateOutputType | null
  }

  export type Bank_movementsAvgAggregateOutputType = {
    id: number | null
    bank_account_id: number | null
    project_id: number | null
    debit: Decimal | null
    credit: Decimal | null
    sub_account_id: number | null
    created_by: number | null
  }

  export type Bank_movementsSumAggregateOutputType = {
    id: bigint | null
    bank_account_id: number | null
    project_id: number | null
    debit: Decimal | null
    credit: Decimal | null
    sub_account_id: number | null
    created_by: bigint | null
  }

  export type Bank_movementsMinAggregateOutputType = {
    id: bigint | null
    bank_account_id: number | null
    project_id: number | null
    bank_date: Date | null
    description: string | null
    debit: Decimal | null
    credit: Decimal | null
    currency: string | null
    exchange_rate_date: Date | null
    source: string | null
    sub_account_id: number | null
    created_by: bigint | null
    import_date: Date | null
  }

  export type Bank_movementsMaxAggregateOutputType = {
    id: bigint | null
    bank_account_id: number | null
    project_id: number | null
    bank_date: Date | null
    description: string | null
    debit: Decimal | null
    credit: Decimal | null
    currency: string | null
    exchange_rate_date: Date | null
    source: string | null
    sub_account_id: number | null
    created_by: bigint | null
    import_date: Date | null
  }

  export type Bank_movementsCountAggregateOutputType = {
    id: number
    bank_account_id: number
    project_id: number
    bank_date: number
    description: number
    debit: number
    credit: number
    currency: number
    exchange_rate_date: number
    source: number
    sub_account_id: number
    created_by: number
    import_date: number
    _all: number
  }


  export type Bank_movementsAvgAggregateInputType = {
    id?: true
    bank_account_id?: true
    project_id?: true
    debit?: true
    credit?: true
    sub_account_id?: true
    created_by?: true
  }

  export type Bank_movementsSumAggregateInputType = {
    id?: true
    bank_account_id?: true
    project_id?: true
    debit?: true
    credit?: true
    sub_account_id?: true
    created_by?: true
  }

  export type Bank_movementsMinAggregateInputType = {
    id?: true
    bank_account_id?: true
    project_id?: true
    bank_date?: true
    description?: true
    debit?: true
    credit?: true
    currency?: true
    exchange_rate_date?: true
    source?: true
    sub_account_id?: true
    created_by?: true
    import_date?: true
  }

  export type Bank_movementsMaxAggregateInputType = {
    id?: true
    bank_account_id?: true
    project_id?: true
    bank_date?: true
    description?: true
    debit?: true
    credit?: true
    currency?: true
    exchange_rate_date?: true
    source?: true
    sub_account_id?: true
    created_by?: true
    import_date?: true
  }

  export type Bank_movementsCountAggregateInputType = {
    id?: true
    bank_account_id?: true
    project_id?: true
    bank_date?: true
    description?: true
    debit?: true
    credit?: true
    currency?: true
    exchange_rate_date?: true
    source?: true
    sub_account_id?: true
    created_by?: true
    import_date?: true
    _all?: true
  }

  export type Bank_movementsAggregateArgs<ExtArgs extends $Extensions.InternacionalalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which bank_movements to aggregate.
     */
    where?: bank_movementsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of bank_movements to fetch.
     */
    orderBy?: bank_movementsOrderByWithRelationInput | bank_movementsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: bank_movementsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` bank_movements from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` bank_movements.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned bank_movements
    **/
    _count?: true | Bank_movementsCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: Bank_movementsAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: Bank_movementsSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: Bank_movementsMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: Bank_movementsMaxAggregateInputType
  }

  export type GetBank_movementsAggregateType<T extends Bank_movementsAggregateArgs> = {
        [P in keyof T & keyof AggregateBank_movements]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateBank_movements[P]>
      : GetScalarType<T[P], AggregateBank_movements[P]>
  }




  export type bank_movementsGroupByArgs<ExtArgs extends $Extensions.InternacionalalArgs = $Extensions.DefaultArgs> = {
    where?: bank_movementsWhereInput
    orderBy?: bank_movementsOrderByWithAggregationInput | bank_movementsOrderByWithAggregationInput[]
    by: Bank_movementsScalarFieldEnum[] | Bank_movementsScalarFieldEnum
    having?: bank_movementsScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: Bank_movementsCountAggregateInputType | true
    _avg?: Bank_movementsAvgAggregateInputType
    _sum?: Bank_movementsSumAggregateInputType
    _min?: Bank_movementsMinAggregateInputType
    _max?: Bank_movementsMaxAggregateInputType
  }

  export type Bank_movementsGroupByOutputType = {
    id: bigint
    bank_account_id: number
    project_id: number | null
    bank_date: Date
    description: string | null
    debit: Decimal | null
    credit: Decimal | null
    currency: string
    exchange_rate_date: Date | null
    source: string
    sub_account_id: number
    created_by: bigint | null
    import_date: Date
    _count: Bank_movementsCountAggregateOutputType | null
    _avg: Bank_movementsAvgAggregateOutputType | null
    _sum: Bank_movementsSumAggregateOutputType | null
    _min: Bank_movementsMinAggregateOutputType | null
    _max: Bank_movementsMaxAggregateOutputType | null
  }

  type GetBank_movementsGroupByPayload<T extends bank_movementsGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<Bank_movementsGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof Bank_movementsGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], Bank_movementsGroupByOutputType[P]>
            : GetScalarType<T[P], Bank_movementsGroupByOutputType[P]>
        }
      >
    >


  export type bank_movementsSelect<ExtArgs extends $Extensions.InternacionalalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    bank_account_id?: boolean
    project_id?: boolean
    bank_date?: boolean
    description?: boolean
    debit?: boolean
    credit?: boolean
    currency?: boolean
    exchange_rate_date?: boolean
    source?: boolean
    sub_account_id?: boolean
    created_by?: boolean
    import_date?: boolean
    bank_accounts?: boolean | bank_accountsDefaultArgs<ExtArgs>
    users?: boolean | bank_movements$usersArgs<ExtArgs>
    projects?: boolean | bank_movements$projectsArgs<ExtArgs>
    sub_accounts?: boolean | sub_accountsDefaultArgs<ExtArgs>
    movement_matches?: boolean | bank_movements$movement_matchesArgs<ExtArgs>
    _count?: boolean | Bank_movementsCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["bank_movements"]>

  export type bank_movementsSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternacionalalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    bank_account_id?: boolean
    project_id?: boolean
    bank_date?: boolean
    description?: boolean
    debit?: boolean
    credit?: boolean
    currency?: boolean
    exchange_rate_date?: boolean
    source?: boolean
    sub_account_id?: boolean
    created_by?: boolean
    import_date?: boolean
    bank_accounts?: boolean | bank_accountsDefaultArgs<ExtArgs>
    users?: boolean | bank_movements$usersArgs<ExtArgs>
    projects?: boolean | bank_movements$projectsArgs<ExtArgs>
    sub_accounts?: boolean | sub_accountsDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["bank_movements"]>

  export type bank_movementsSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternacionalalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    bank_account_id?: boolean
    project_id?: boolean
    bank_date?: boolean
    description?: boolean
    debit?: boolean
    credit?: boolean
    currency?: boolean
    exchange_rate_date?: boolean
    source?: boolean
    sub_account_id?: boolean
    created_by?: boolean
    import_date?: boolean
    bank_accounts?: boolean | bank_accountsDefaultArgs<ExtArgs>
    users?: boolean | bank_movements$usersArgs<ExtArgs>
    projects?: boolean | bank_movements$projectsArgs<ExtArgs>
    sub_accounts?: boolean | sub_accountsDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["bank_movements"]>

  export type bank_movementsSelectScalar = {
    id?: boolean
    bank_account_id?: boolean
    project_id?: boolean
    bank_date?: boolean
    description?: boolean
    debit?: boolean
    credit?: boolean
    currency?: boolean
    exchange_rate_date?: boolean
    source?: boolean
    sub_account_id?: boolean
    created_by?: boolean
    import_date?: boolean
  }

  export type bank_movementsOmit<ExtArgs extends $Extensions.InternacionalalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "bank_account_id" | "project_id" | "bank_date" | "description" | "debit" | "credit" | "currency" | "exchange_rate_date" | "source" | "sub_account_id" | "created_by" | "import_date", ExtArgs["result"]["bank_movements"]>
  export type bank_movementsInclude<ExtArgs extends $Extensions.InternacionalalArgs = $Extensions.DefaultArgs> = {
    bank_accounts?: boolean | bank_accountsDefaultArgs<ExtArgs>
    users?: boolean | bank_movements$usersArgs<ExtArgs>
    projects?: boolean | bank_movements$projectsArgs<ExtArgs>
    sub_accounts?: boolean | sub_accountsDefaultArgs<ExtArgs>
    movement_matches?: boolean | bank_movements$movement_matchesArgs<ExtArgs>
    _count?: boolean | Bank_movementsCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type bank_movementsIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternacionalalArgs = $Extensions.DefaultArgs> = {
    bank_accounts?: boolean | bank_accountsDefaultArgs<ExtArgs>
    users?: boolean | bank_movements$usersArgs<ExtArgs>
    projects?: boolean | bank_movements$projectsArgs<ExtArgs>
    sub_accounts?: boolean | sub_accountsDefaultArgs<ExtArgs>
  }
  export type bank_movementsIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternacionalalArgs = $Extensions.DefaultArgs> = {
    bank_accounts?: boolean | bank_accountsDefaultArgs<ExtArgs>
    users?: boolean | bank_movements$usersArgs<ExtArgs>
    projects?: boolean | bank_movements$projectsArgs<ExtArgs>
    sub_accounts?: boolean | sub_accountsDefaultArgs<ExtArgs>
  }

  export type $bank_movementsPayload<ExtArgs extends $Extensions.InternacionalalArgs = $Extensions.DefaultArgs> = {
    name: "bank_movements"
    objects: {
      bank_accounts: Prisma.$bank_accountsPayload<ExtArgs>
      users: Prisma.$usersPayload<ExtArgs> | null
      projects: Prisma.$projectsPayload<ExtArgs> | null
      sub_accounts: Prisma.$sub_accountsPayload<ExtArgs>
      movement_matches: Prisma.$movement_matchesPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: bigint
      bank_account_id: number
      project_id: number | null
      bank_date: Date
      description: string | null
      debit: Prisma.Decimal | null
      credit: Prisma.Decimal | null
      currency: string
      exchange_rate_date: Date | null
      source: string
      sub_account_id: number
      created_by: bigint | null
      import_date: Date
    }, ExtArgs["result"]["bank_movements"]>
    composites: {}
  }

  type bank_movementsGetPayload<S extends boolean | null | undefined | bank_movementsDefaultArgs> = $Result.GetResult<Prisma.$bank_movementsPayload, S>

  type bank_movementsCountArgs<ExtArgs extends $Extensions.InternacionalalArgs = $Extensions.DefaultArgs> =
    Omit<bank_movementsFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: Bank_movementsCountAggregateInputType | true
    }

  export interface bank_movementsDelegate<ExtArgs extends $Extensions.InternacionalalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['bank_movements'], meta: { name: 'bank_movements' } }
    /**
     * Find zero or one Bank_movements that matches the filter.
     * @param {bank_movementsFindUniqueArgs} args - Arguments to find a Bank_movements
     * @example
     * // Get one Bank_movements
     * const bank_movements = await prisma.bank_movements.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends bank_movementsFindUniqueArgs>(args: SelectSubset<T, bank_movementsFindUniqueArgs<ExtArgs>>): Prisma__bank_movementsClient<$Result.GetResult<Prisma.$bank_movementsPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Bank_movements that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {bank_movementsFindUniqueOrThrowArgs} args - Arguments to find a Bank_movements
     * @example
     * // Get one Bank_movements
     * const bank_movements = await prisma.bank_movements.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends bank_movementsFindUniqueOrThrowArgs>(args: SelectSubset<T, bank_movementsFindUniqueOrThrowArgs<ExtArgs>>): Prisma__bank_movementsClient<$Result.GetResult<Prisma.$bank_movementsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Bank_movements that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {bank_movementsFindFirstArgs} args - Arguments to find a Bank_movements
     * @example
     * // Get one Bank_movements
     * const bank_movements = await prisma.bank_movements.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends bank_movementsFindFirstArgs>(args?: SelectSubset<T, bank_movementsFindFirstArgs<ExtArgs>>): Prisma__bank_movementsClient<$Result.GetResult<Prisma.$bank_movementsPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Bank_movements that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {bank_movementsFindFirstOrThrowArgs} args - Arguments to find a Bank_movements
     * @example
     * // Get one Bank_movements
     * const bank_movements = await prisma.bank_movements.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends bank_movementsFindFirstOrThrowArgs>(args?: SelectSubset<T, bank_movementsFindFirstOrThrowArgs<ExtArgs>>): Prisma__bank_movementsClient<$Result.GetResult<Prisma.$bank_movementsPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Bank_movements that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {bank_movementsFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Bank_movements
     * const bank_movements = await prisma.bank_movements.findMany()
     * 
     * // Get first 10 Bank_movements
     * const bank_movements = await prisma.bank_movements.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const bank_movementsWithIdOnly = await prisma.bank_movements.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends bank_movementsFindManyArgs>(args?: SelectSubset<T, bank_movementsFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$bank_movementsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Bank_movements.
     * @param {bank_movementsCreateArgs} args - Arguments to create a Bank_movements.
     * @example
     * // Create one Bank_movements
     * const Bank_movements = await prisma.bank_movements.create({
     *   data: {
     *     // ... data to create a Bank_movements
     *   }
     * })
     * 
     */
    create<T extends bank_movementsCreateArgs>(args: SelectSubset<T, bank_movementsCreateArgs<ExtArgs>>): Prisma__bank_movementsClient<$Result.GetResult<Prisma.$bank_movementsPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Bank_movements.
     * @param {bank_movementsCreateManyArgs} args - Arguments to create many Bank_movements.
     * @example
     * // Create many Bank_movements
     * const bank_movements = await prisma.bank_movements.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends bank_movementsCreateManyArgs>(args?: SelectSubset<T, bank_movementsCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Bank_movements and returns the data saved in the database.
     * @param {bank_movementsCreateManyAndReturnArgs} args - Arguments to create many Bank_movements.
     * @example
     * // Create many Bank_movements
     * const bank_movements = await prisma.bank_movements.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Bank_movements and only return the `id`
     * const bank_movementsWithIdOnly = await prisma.bank_movements.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends bank_movementsCreateManyAndReturnArgs>(args?: SelectSubset<T, bank_movementsCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$bank_movementsPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Bank_movements.
     * @param {bank_movementsDeleteArgs} args - Arguments to delete one Bank_movements.
     * @example
     * // Delete one Bank_movements
     * const Bank_movements = await prisma.bank_movements.delete({
     *   where: {
     *     // ... filter to delete one Bank_movements
     *   }
     * })
     * 
     */
    delete<T extends bank_movementsDeleteArgs>(args: SelectSubset<T, bank_movementsDeleteArgs<ExtArgs>>): Prisma__bank_movementsClient<$Result.GetResult<Prisma.$bank_movementsPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Bank_movements.
     * @param {bank_movementsUpdateArgs} args - Arguments to update one Bank_movements.
     * @example
     * // Update one Bank_movements
     * const bank_movements = await prisma.bank_movements.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends bank_movementsUpdateArgs>(args: SelectSubset<T, bank_movementsUpdateArgs<ExtArgs>>): Prisma__bank_movementsClient<$Result.GetResult<Prisma.$bank_movementsPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Bank_movements.
     * @param {bank_movementsDeleteManyArgs} args - Arguments to filter Bank_movements to delete.
     * @example
     * // Delete a few Bank_movements
     * const { count } = await prisma.bank_movements.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends bank_movementsDeleteManyArgs>(args?: SelectSubset<T, bank_movementsDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Bank_movements.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {bank_movementsUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Bank_movements
     * const bank_movements = await prisma.bank_movements.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends bank_movementsUpdateManyArgs>(args: SelectSubset<T, bank_movementsUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Bank_movements and returns the data updated in the database.
     * @param {bank_movementsUpdateManyAndReturnArgs} args - Arguments to update many Bank_movements.
     * @example
     * // Update many Bank_movements
     * const bank_movements = await prisma.bank_movements.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Bank_movements and only return the `id`
     * const bank_movementsWithIdOnly = await prisma.bank_movements.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends bank_movementsUpdateManyAndReturnArgs>(args: SelectSubset<T, bank_movementsUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$bank_movementsPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Bank_movements.
     * @param {bank_movementsUpsertArgs} args - Arguments to update or create a Bank_movements.
     * @example
     * // Update or create a Bank_movements
     * const bank_movements = await prisma.bank_movements.upsert({
     *   create: {
     *     // ... data to create a Bank_movements
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Bank_movements we want to update
     *   }
     * })
     */
    upsert<T extends bank_movementsUpsertArgs>(args: SelectSubset<T, bank_movementsUpsertArgs<ExtArgs>>): Prisma__bank_movementsClient<$Result.GetResult<Prisma.$bank_movementsPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Bank_movements.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {bank_movementsCountArgs} args - Arguments to filter Bank_movements to count.
     * @example
     * // Count the number of Bank_movements
     * const count = await prisma.bank_movements.count({
     *   where: {
     *     // ... the filter for the Bank_movements we want to count
     *   }
     * })
    **/
    count<T extends bank_movementsCountArgs>(
      args?: Subset<T, bank_movementsCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], Bank_movementsCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Bank_movements.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Bank_movementsAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends Bank_movementsAggregateArgs>(args: Subset<T, Bank_movementsAggregateArgs>): Prisma.PrismaPromise<GetBank_movementsAggregateType<T>>

    /**
     * Group by Bank_movements.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {bank_movementsGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends bank_movementsGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: bank_movementsGroupByArgs['orderBy'] }
        : { orderBy?: bank_movementsGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, bank_movementsGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetBank_movementsGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the bank_movements model
   */
  readonly fields: bank_movementsFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for bank_movements.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__bank_movementsClient<T, Null = never, ExtArgs extends $Extensions.InternacionalalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    bank_accounts<T extends bank_accountsDefaultArgs<ExtArgs> = {}>(args?: Subset<T, bank_accountsDefaultArgs<ExtArgs>>): Prisma__bank_accountsClient<$Result.GetResult<Prisma.$bank_accountsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    users<T extends bank_movements$usersArgs<ExtArgs> = {}>(args?: Subset<T, bank_movements$usersArgs<ExtArgs>>): Prisma__usersClient<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    projects<T extends bank_movements$projectsArgs<ExtArgs> = {}>(args?: Subset<T, bank_movements$projectsArgs<ExtArgs>>): Prisma__projectsClient<$Result.GetResult<Prisma.$projectsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    sub_accounts<T extends sub_accountsDefaultArgs<ExtArgs> = {}>(args?: Subset<T, sub_accountsDefaultArgs<ExtArgs>>): Prisma__sub_accountsClient<$Result.GetResult<Prisma.$sub_accountsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    movement_matches<T extends bank_movements$movement_matchesArgs<ExtArgs> = {}>(args?: Subset<T, bank_movements$movement_matchesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$movement_matchesPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the bank_movements model
   */
  interface bank_movementsFieldRefs {
    readonly id: FieldRef<"bank_movements", 'BigInt'>
    readonly bank_account_id: FieldRef<"bank_movements", 'Int'>
    readonly project_id: FieldRef<"bank_movements", 'Int'>
    readonly bank_date: FieldRef<"bank_movements", 'DateTime'>
    readonly description: FieldRef<"bank_movements", 'String'>
    readonly debit: FieldRef<"bank_movements", 'Decimal'>
    readonly credit: FieldRef<"bank_movements", 'Decimal'>
    readonly currency: FieldRef<"bank_movements", 'String'>
    readonly exchange_rate_date: FieldRef<"bank_movements", 'DateTime'>
    readonly source: FieldRef<"bank_movements", 'String'>
    readonly sub_account_id: FieldRef<"bank_movements", 'Int'>
    readonly created_by: FieldRef<"bank_movements", 'BigInt'>
    readonly import_date: FieldRef<"bank_movements", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * bank_movements findUnique
   */
  export type bank_movementsFindUniqueArgs<ExtArgs extends $Extensions.InternacionalalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the bank_movements
     */
    select?: bank_movementsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the bank_movements
     */
    omit?: bank_movementsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: bank_movementsInclude<ExtArgs> | null
    /**
     * Filter, which bank_movements to fetch.
     */
    where: bank_movementsWhereUniqueInput
  }

  /**
   * bank_movements findUniqueOrThrow
   */
  export type bank_movementsFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternacionalalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the bank_movements
     */
    select?: bank_movementsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the bank_movements
     */
    omit?: bank_movementsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: bank_movementsInclude<ExtArgs> | null
    /**
     * Filter, which bank_movements to fetch.
     */
    where: bank_movementsWhereUniqueInput
  }

  /**
   * bank_movements findFirst
   */
  export type bank_movementsFindFirstArgs<ExtArgs extends $Extensions.InternacionalalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the bank_movements
     */
    select?: bank_movementsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the bank_movements
     */
    omit?: bank_movementsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: bank_movementsInclude<ExtArgs> | null
    /**
     * Filter, which bank_movements to fetch.
     */
    where?: bank_movementsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of bank_movements to fetch.
     */
    orderBy?: bank_movementsOrderByWithRelationInput | bank_movementsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for bank_movements.
     */
    cursor?: bank_movementsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` bank_movements from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` bank_movements.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of bank_movements.
     */
    distinct?: Bank_movementsScalarFieldEnum | Bank_movementsScalarFieldEnum[]
  }

  /**
   * bank_movements findFirstOrThrow
   */
  export type bank_movementsFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternacionalalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the bank_movements
     */
    select?: bank_movementsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the bank_movements
     */
    omit?: bank_movementsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: bank_movementsInclude<ExtArgs> | null
    /**
     * Filter, which bank_movements to fetch.
     */
    where?: bank_movementsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of bank_movements to fetch.
     */
    orderBy?: bank_movementsOrderByWithRelationInput | bank_movementsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for bank_movements.
     */
    cursor?: bank_movementsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` bank_movements from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` bank_movements.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of bank_movements.
     */
    distinct?: Bank_movementsScalarFieldEnum | Bank_movementsScalarFieldEnum[]
  }

  /**
   * bank_movements findMany
   */
  export type bank_movementsFindManyArgs<ExtArgs extends $Extensions.InternacionalalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the bank_movements
     */
    select?: bank_movementsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the bank_movements
     */
    omit?: bank_movementsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: bank_movementsInclude<ExtArgs> | null
    /**
     * Filter, which bank_movements to fetch.
     */
    where?: bank_movementsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of bank_movements to fetch.
     */
    orderBy?: bank_movementsOrderByWithRelationInput | bank_movementsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing bank_movements.
     */
    cursor?: bank_movementsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` bank_movements from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` bank_movements.
     */
    skip?: number
    distinct?: Bank_movementsScalarFieldEnum | Bank_movementsScalarFieldEnum[]
  }

  /**
   * bank_movements create
   */
  export type bank_movementsCreateArgs<ExtArgs extends $Extensions.InternacionalalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the bank_movements
     */
    select?: bank_movementsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the bank_movements
     */
    omit?: bank_movementsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: bank_movementsInclude<ExtArgs> | null
    /**
     * The data needed to create a bank_movements.
     */
    data: XOR<bank_movementsCreateInput, bank_movementsUncheckedCreateInput>
  }

  /**
   * bank_movements createMany
   */
  export type bank_movementsCreateManyArgs<ExtArgs extends $Extensions.InternacionalalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many bank_movements.
     */
    data: bank_movementsCreateManyInput | bank_movementsCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * bank_movements createManyAndReturn
   */
  export type bank_movementsCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternacionalalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the bank_movements
     */
    select?: bank_movementsSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the bank_movements
     */
    omit?: bank_movementsOmit<ExtArgs> | null
    /**
     * The data used to create many bank_movements.
     */
    data: bank_movementsCreateManyInput | bank_movementsCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: bank_movementsIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * bank_movements update
   */
  export type bank_movementsUpdateArgs<ExtArgs extends $Extensions.InternacionalalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the bank_movements
     */
    select?: bank_movementsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the bank_movements
     */
    omit?: bank_movementsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: bank_movementsInclude<ExtArgs> | null
    /**
     * The data needed to update a bank_movements.
     */
    data: XOR<bank_movementsUpdateInput, bank_movementsUncheckedUpdateInput>
    /**
     * Choose, which bank_movements to update.
     */
    where: bank_movementsWhereUniqueInput
  }

  /**
   * bank_movements updateMany
   */
  export type bank_movementsUpdateManyArgs<ExtArgs extends $Extensions.InternacionalalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update bank_movements.
     */
    data: XOR<bank_movementsUpdateManyMutationInput, bank_movementsUncheckedUpdateManyInput>
    /**
     * Filter which bank_movements to update
     */
    where?: bank_movementsWhereInput
    /**
     * Limit how many bank_movements to update.
     */
    limit?: number
  }

  /**
   * bank_movements updateManyAndReturn
   */
  export type bank_movementsUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternacionalalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the bank_movements
     */
    select?: bank_movementsSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the bank_movements
     */
    omit?: bank_movementsOmit<ExtArgs> | null
    /**
     * The data used to update bank_movements.
     */
    data: XOR<bank_movementsUpdateManyMutationInput, bank_movementsUncheckedUpdateManyInput>
    /**
     * Filter which bank_movements to update
     */
    where?: bank_movementsWhereInput
    /**
     * Limit how many bank_movements to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: bank_movementsIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * bank_movements upsert
   */
  export type bank_movementsUpsertArgs<ExtArgs extends $Extensions.InternacionalalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the bank_movements
     */
    select?: bank_movementsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the bank_movements
     */
    omit?: bank_movementsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: bank_movementsInclude<ExtArgs> | null
    /**
     * The filter to search for the bank_movements to update in case it exists.
     */
    where: bank_movementsWhereUniqueInput
    /**
     * In case the bank_movements found by the `where` argument doesn't exist, create a new bank_movements with this data.
     */
    create: XOR<bank_movementsCreateInput, bank_movementsUncheckedCreateInput>
    /**
     * In case the bank_movements was found with the provided `where` argument, update it with this data.
     */
    update: XOR<bank_movementsUpdateInput, bank_movementsUncheckedUpdateInput>
  }

  /**
   * bank_movements delete
   */
  export type bank_movementsDeleteArgs<ExtArgs extends $Extensions.InternacionalalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the bank_movements
     */
    select?: bank_movementsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the bank_movements
     */
    omit?: bank_movementsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: bank_movementsInclude<ExtArgs> | null
    /**
     * Filter which bank_movements to delete.
     */
    where: bank_movementsWhereUniqueInput
  }

  /**
   * bank_movements deleteMany
   */
  export type bank_movementsDeleteManyArgs<ExtArgs extends $Extensions.InternacionalalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which bank_movements to delete
     */
    where?: bank_movementsWhereInput
    /**
     * Limit how many bank_movements to delete.
     */
    limit?: number
  }

  /**
   * bank_movements.users
   */
  export type bank_movements$usersArgs<ExtArgs extends $Extensions.InternacionalalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the users
     */
    omit?: usersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: usersInclude<ExtArgs> | null
    where?: usersWhereInput
  }

  /**
   * bank_movements.projects
   */
  export type bank_movements$projectsArgs<ExtArgs extends $Extensions.InternacionalalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the projects
     */
    select?: projectsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the projects
     */
    omit?: projectsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: projectsInclude<ExtArgs> | null
    where?: projectsWhereInput
  }

  /**
   * bank_movements.movement_matches
   */
  export type bank_movements$movement_matchesArgs<ExtArgs extends $Extensions.InternacionalalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the movement_matches
     */
    select?: movement_matchesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the movement_matches
     */
    omit?: movement_matchesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: movement_matchesInclude<ExtArgs> | null
    where?: movement_matchesWhereInput
    orderBy?: movement_matchesOrderByWithRelationInput | movement_matchesOrderByWithRelationInput[]
    cursor?: movement_matchesWhereUniqueInput
    take?: number
    skip?: number
    distinct?: Movement_matchesScalarFieldEnum | Movement_matchesScalarFieldEnum[]
  }

  /**
   * bank_movements without action
   */
  export type bank_movementsDefaultArgs<ExtArgs extends $Extensions.InternacionalalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the bank_movements
     */
    select?: bank_movementsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the bank_movements
     */
    omit?: bank_movementsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: bank_movementsInclude<ExtArgs> | null
  }


  /**
   * Model companies
   */

  export type AggregateCompanies = {
    _count: CompaniesCountAggregateOutputType | null
    _avg: CompaniesAvgAggregateOutputType | null
    _sum: CompaniesSumAggregateOutputType | null
    _min: CompaniesMinAggregateOutputType | null
    _max: CompaniesMaxAggregateOutputType | null
  }

  export type CompaniesAvgAggregateOutputType = {
    id: number | null
  }

  export type CompaniesSumAggregateOutputType = {
    id: number | null
  }

  export type CompaniesMinAggregateOutputType = {
    id: number | null
    name: string | null
    rut: string | null
    address: string | null
    created_at: Date | null
  }

  export type CompaniesMaxAggregateOutputType = {
    id: number | null
    name: string | null
    rut: string | null
    address: string | null
    created_at: Date | null
  }

  export type CompaniesCountAggregateOutputType = {
    id: number
    name: number
    rut: number
    address: number
    created_at: number
    _all: number
  }


  export type CompaniesAvgAggregateInputType = {
    id?: true
  }

  export type CompaniesSumAggregateInputType = {
    id?: true
  }

  export type CompaniesMinAggregateInputType = {
    id?: true
    name?: true
    rut?: true
    address?: true
    created_at?: true
  }

  export type CompaniesMaxAggregateInputType = {
    id?: true
    name?: true
    rut?: true
    address?: true
    created_at?: true
  }

  export type CompaniesCountAggregateInputType = {
    id?: true
    name?: true
    rut?: true
    address?: true
    created_at?: true
    _all?: true
  }

  export type CompaniesAggregateArgs<ExtArgs extends $Extensions.InternacionalalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which companies to aggregate.
     */
    where?: companiesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of companies to fetch.
     */
    orderBy?: companiesOrderByWithRelationInput | companiesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: companiesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` companies from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` companies.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned companies
    **/
    _count?: true | CompaniesCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: CompaniesAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: CompaniesSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CompaniesMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CompaniesMaxAggregateInputType
  }

  export type GetCompaniesAggregateType<T extends CompaniesAggregateArgs> = {
        [P in keyof T & keyof AggregateCompanies]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCompanies[P]>
      : GetScalarType<T[P], AggregateCompanies[P]>
  }




  export type companiesGroupByArgs<ExtArgs extends $Extensions.InternacionalalArgs = $Extensions.DefaultArgs> = {
    where?: companiesWhereInput
    orderBy?: companiesOrderByWithAggregationInput | companiesOrderByWithAggregationInput[]
    by: CompaniesScalarFieldEnum[] | CompaniesScalarFieldEnum
    having?: companiesScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CompaniesCountAggregateInputType | true
    _avg?: CompaniesAvgAggregateInputType
    _sum?: CompaniesSumAggregateInputType
    _min?: CompaniesMinAggregateInputType
    _max?: CompaniesMaxAggregateInputType
  }

  export type CompaniesGroupByOutputType = {
    id: number
    name: string
    rut: string | null
    address: string | null
    created_at: Date
    _count: CompaniesCountAggregateOutputType | null
    _avg: CompaniesAvgAggregateOutputType | null
    _sum: CompaniesSumAggregateOutputType | null
    _min: CompaniesMinAggregateOutputType | null
    _max: CompaniesMaxAggregateOutputType | null
  }

  type GetCompaniesGroupByPayload<T extends companiesGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CompaniesGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CompaniesGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CompaniesGroupByOutputType[P]>
            : GetScalarType<T[P], CompaniesGroupByOutputType[P]>
        }
      >
    >


  export type companiesSelect<ExtArgs extends $Extensions.InternacionalalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    rut?: boolean
    address?: boolean
    created_at?: boolean
    bank_accounts?: boolean | companies$bank_accountsArgs<ExtArgs>
    projects?: boolean | companies$projectsArgs<ExtArgs>
    _count?: boolean | CompaniesCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["companies"]>

  export type companiesSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternacionalalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    rut?: boolean
    address?: boolean
    created_at?: boolean
  }, ExtArgs["result"]["companies"]>

  export type companiesSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternacionalalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    rut?: boolean
    address?: boolean
    created_at?: boolean
  }, ExtArgs["result"]["companies"]>

  export type companiesSelectScalar = {
    id?: boolean
    name?: boolean
    rut?: boolean
    address?: boolean
    created_at?: boolean
  }

  export type companiesOmit<ExtArgs extends $Extensions.InternacionalalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "rut" | "address" | "created_at", ExtArgs["result"]["companies"]>
  export type companiesInclude<ExtArgs extends $Extensions.InternacionalalArgs = $Extensions.DefaultArgs> = {
    bank_accounts?: boolean | companies$bank_accountsArgs<ExtArgs>
    projects?: boolean | companies$projectsArgs<ExtArgs>
    _count?: boolean | CompaniesCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type companiesIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternacionalalArgs = $Extensions.DefaultArgs> = {}
  export type companiesIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternacionalalArgs = $Extensions.DefaultArgs> = {}

  export type $companiesPayload<ExtArgs extends $Extensions.InternacionalalArgs = $Extensions.DefaultArgs> = {
    name: "companies"
    objects: {
      bank_accounts: Prisma.$bank_accountsPayload<ExtArgs>[]
      projects: Prisma.$projectsPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      name: string
      rut: string | null
      address: string | null
      created_at: Date
    }, ExtArgs["result"]["companies"]>
    composites: {}
  }

  type companiesGetPayload<S extends boolean | null | undefined | companiesDefaultArgs> = $Result.GetResult<Prisma.$companiesPayload, S>

  type companiesCountArgs<ExtArgs extends $Extensions.InternacionalalArgs = $Extensions.DefaultArgs> =
    Omit<companiesFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: CompaniesCountAggregateInputType | true
    }

  export interface companiesDelegate<ExtArgs extends $Extensions.InternacionalalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['companies'], meta: { name: 'companies' } }
    /**
     * Find zero or one Companies that matches the filter.
     * @param {companiesFindUniqueArgs} args - Arguments to find a Companies
     * @example
     * // Get one Companies
     * const companies = await prisma.companies.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends companiesFindUniqueArgs>(args: SelectSubset<T, companiesFindUniqueArgs<ExtArgs>>): Prisma__companiesClient<$Result.GetResult<Prisma.$companiesPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Companies that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {companiesFindUniqueOrThrowArgs} args - Arguments to find a Companies
     * @example
     * // Get one Companies
     * const companies = await prisma.companies.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends companiesFindUniqueOrThrowArgs>(args: SelectSubset<T, companiesFindUniqueOrThrowArgs<ExtArgs>>): Prisma__companiesClient<$Result.GetResult<Prisma.$companiesPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Companies that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {companiesFindFirstArgs} args - Arguments to find a Companies
     * @example
     * // Get one Companies
     * const companies = await prisma.companies.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends companiesFindFirstArgs>(args?: SelectSubset<T, companiesFindFirstArgs<ExtArgs>>): Prisma__companiesClient<$Result.GetResult<Prisma.$companiesPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Companies that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {companiesFindFirstOrThrowArgs} args - Arguments to find a Companies
     * @example
     * // Get one Companies
     * const companies = await prisma.companies.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends companiesFindFirstOrThrowArgs>(args?: SelectSubset<T, companiesFindFirstOrThrowArgs<ExtArgs>>): Prisma__companiesClient<$Result.GetResult<Prisma.$companiesPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Companies that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {companiesFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Companies
     * const companies = await prisma.companies.findMany()
     * 
     * // Get first 10 Companies
     * const companies = await prisma.companies.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const companiesWithIdOnly = await prisma.companies.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends companiesFindManyArgs>(args?: SelectSubset<T, companiesFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$companiesPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Companies.
     * @param {companiesCreateArgs} args - Arguments to create a Companies.
     * @example
     * // Create one Companies
     * const Companies = await prisma.companies.create({
     *   data: {
     *     // ... data to create a Companies
     *   }
     * })
     * 
     */
    create<T extends companiesCreateArgs>(args: SelectSubset<T, companiesCreateArgs<ExtArgs>>): Prisma__companiesClient<$Result.GetResult<Prisma.$companiesPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Companies.
     * @param {companiesCreateManyArgs} args - Arguments to create many Companies.
     * @example
     * // Create many Companies
     * const companies = await prisma.companies.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends companiesCreateManyArgs>(args?: SelectSubset<T, companiesCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Companies and returns the data saved in the database.
     * @param {companiesCreateManyAndReturnArgs} args - Arguments to create many Companies.
     * @example
     * // Create many Companies
     * const companies = await prisma.companies.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Companies and only return the `id`
     * const companiesWithIdOnly = await prisma.companies.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends companiesCreateManyAndReturnArgs>(args?: SelectSubset<T, companiesCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$companiesPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Companies.
     * @param {companiesDeleteArgs} args - Arguments to delete one Companies.
     * @example
     * // Delete one Companies
     * const Companies = await prisma.companies.delete({
     *   where: {
     *     // ... filter to delete one Companies
     *   }
     * })
     * 
     */
    delete<T extends companiesDeleteArgs>(args: SelectSubset<T, companiesDeleteArgs<ExtArgs>>): Prisma__companiesClient<$Result.GetResult<Prisma.$companiesPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Companies.
     * @param {companiesUpdateArgs} args - Arguments to update one Companies.
     * @example
     * // Update one Companies
     * const companies = await prisma.companies.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends companiesUpdateArgs>(args: SelectSubset<T, companiesUpdateArgs<ExtArgs>>): Prisma__companiesClient<$Result.GetResult<Prisma.$companiesPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Companies.
     * @param {companiesDeleteManyArgs} args - Arguments to filter Companies to delete.
     * @example
     * // Delete a few Companies
     * const { count } = await prisma.companies.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends companiesDeleteManyArgs>(args?: SelectSubset<T, companiesDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Companies.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {companiesUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Companies
     * const companies = await prisma.companies.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends companiesUpdateManyArgs>(args: SelectSubset<T, companiesUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Companies and returns the data updated in the database.
     * @param {companiesUpdateManyAndReturnArgs} args - Arguments to update many Companies.
     * @example
     * // Update many Companies
     * const companies = await prisma.companies.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Companies and only return the `id`
     * const companiesWithIdOnly = await prisma.companies.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends companiesUpdateManyAndReturnArgs>(args: SelectSubset<T, companiesUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$companiesPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Companies.
     * @param {companiesUpsertArgs} args - Arguments to update or create a Companies.
     * @example
     * // Update or create a Companies
     * const companies = await prisma.companies.upsert({
     *   create: {
     *     // ... data to create a Companies
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Companies we want to update
     *   }
     * })
     */
    upsert<T extends companiesUpsertArgs>(args: SelectSubset<T, companiesUpsertArgs<ExtArgs>>): Prisma__companiesClient<$Result.GetResult<Prisma.$companiesPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Companies.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {companiesCountArgs} args - Arguments to filter Companies to count.
     * @example
     * // Count the number of Companies
     * const count = await prisma.companies.count({
     *   where: {
     *     // ... the filter for the Companies we want to count
     *   }
     * })
    **/
    count<T extends companiesCountArgs>(
      args?: Subset<T, companiesCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CompaniesCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Companies.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CompaniesAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends CompaniesAggregateArgs>(args: Subset<T, CompaniesAggregateArgs>): Prisma.PrismaPromise<GetCompaniesAggregateType<T>>

    /**
     * Group by Companies.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {companiesGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends companiesGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: companiesGroupByArgs['orderBy'] }
        : { orderBy?: companiesGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, companiesGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCompaniesGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the companies model
   */
  readonly fields: companiesFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for companies.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__companiesClient<T, Null = never, ExtArgs extends $Extensions.InternacionalalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    bank_accounts<T extends companies$bank_accountsArgs<ExtArgs> = {}>(args?: Subset<T, companies$bank_accountsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$bank_accountsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    projects<T extends companies$projectsArgs<ExtArgs> = {}>(args?: Subset<T, companies$projectsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$projectsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the companies model
   */
  interface companiesFieldRefs {
    readonly id: FieldRef<"companies", 'Int'>
    readonly name: FieldRef<"companies", 'String'>
    readonly rut: FieldRef<"companies", 'String'>
    readonly address: FieldRef<"companies", 'String'>
    readonly created_at: FieldRef<"companies", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * companies findUnique
   */
  export type companiesFindUniqueArgs<ExtArgs extends $Extensions.InternacionalalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the companies
     */
    select?: companiesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the companies
     */
    omit?: companiesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: companiesInclude<ExtArgs> | null
    /**
     * Filter, which companies to fetch.
     */
    where: companiesWhereUniqueInput
  }

  /**
   * companies findUniqueOrThrow
   */
  export type companiesFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternacionalalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the companies
     */
    select?: companiesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the companies
     */
    omit?: companiesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: companiesInclude<ExtArgs> | null
    /**
     * Filter, which companies to fetch.
     */
    where: companiesWhereUniqueInput
  }

  /**
   * companies findFirst
   */
  export type companiesFindFirstArgs<ExtArgs extends $Extensions.InternacionalalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the companies
     */
    select?: companiesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the companies
     */
    omit?: companiesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: companiesInclude<ExtArgs> | null
    /**
     * Filter, which companies to fetch.
     */
    where?: companiesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of companies to fetch.
     */
    orderBy?: companiesOrderByWithRelationInput | companiesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for companies.
     */
    cursor?: companiesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` companies from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` companies.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of companies.
     */
    distinct?: CompaniesScalarFieldEnum | CompaniesScalarFieldEnum[]
  }

  /**
   * companies findFirstOrThrow
   */
  export type companiesFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternacionalalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the companies
     */
    select?: companiesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the companies
     */
    omit?: companiesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: companiesInclude<ExtArgs> | null
    /**
     * Filter, which companies to fetch.
     */
    where?: companiesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of companies to fetch.
     */
    orderBy?: companiesOrderByWithRelationInput | companiesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for companies.
     */
    cursor?: companiesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` companies from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` companies.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of companies.
     */
    distinct?: CompaniesScalarFieldEnum | CompaniesScalarFieldEnum[]
  }

  /**
   * companies findMany
   */
  export type companiesFindManyArgs<ExtArgs extends $Extensions.InternacionalalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the companies
     */
    select?: companiesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the companies
     */
    omit?: companiesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: companiesInclude<ExtArgs> | null
    /**
     * Filter, which companies to fetch.
     */
    where?: companiesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of companies to fetch.
     */
    orderBy?: companiesOrderByWithRelationInput | companiesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing companies.
     */
    cursor?: companiesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` companies from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` companies.
     */
    skip?: number
    distinct?: CompaniesScalarFieldEnum | CompaniesScalarFieldEnum[]
  }

  /**
   * companies create
   */
  export type companiesCreateArgs<ExtArgs extends $Extensions.InternacionalalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the companies
     */
    select?: companiesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the companies
     */
    omit?: companiesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: companiesInclude<ExtArgs> | null
    /**
     * The data needed to create a companies.
     */
    data: XOR<companiesCreateInput, companiesUncheckedCreateInput>
  }

  /**
   * companies createMany
   */
  export type companiesCreateManyArgs<ExtArgs extends $Extensions.InternacionalalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many companies.
     */
    data: companiesCreateManyInput | companiesCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * companies createManyAndReturn
   */
  export type companiesCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternacionalalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the companies
     */
    select?: companiesSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the companies
     */
    omit?: companiesOmit<ExtArgs> | null
    /**
     * The data used to create many companies.
     */
    data: companiesCreateManyInput | companiesCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * companies update
   */
  export type companiesUpdateArgs<ExtArgs extends $Extensions.InternacionalalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the companies
     */
    select?: companiesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the companies
     */
    omit?: companiesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: companiesInclude<ExtArgs> | null
    /**
     * The data needed to update a companies.
     */
    data: XOR<companiesUpdateInput, companiesUncheckedUpdateInput>
    /**
     * Choose, which companies to update.
     */
    where: companiesWhereUniqueInput
  }

  /**
   * companies updateMany
   */
  export type companiesUpdateManyArgs<ExtArgs extends $Extensions.InternacionalalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update companies.
     */
    data: XOR<companiesUpdateManyMutationInput, companiesUncheckedUpdateManyInput>
    /**
     * Filter which companies to update
     */
    where?: companiesWhereInput
    /**
     * Limit how many companies to update.
     */
    limit?: number
  }

  /**
   * companies updateManyAndReturn
   */
  export type companiesUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternacionalalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the companies
     */
    select?: companiesSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the companies
     */
    omit?: companiesOmit<ExtArgs> | null
    /**
     * The data used to update companies.
     */
    data: XOR<companiesUpdateManyMutationInput, companiesUncheckedUpdateManyInput>
    /**
     * Filter which companies to update
     */
    where?: companiesWhereInput
    /**
     * Limit how many companies to update.
     */
    limit?: number
  }

  /**
   * companies upsert
   */
  export type companiesUpsertArgs<ExtArgs extends $Extensions.InternacionalalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the companies
     */
    select?: companiesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the companies
     */
    omit?: companiesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: companiesInclude<ExtArgs> | null
    /**
     * The filter to search for the companies to update in case it exists.
     */
    where: companiesWhereUniqueInput
    /**
     * In case the companies found by the `where` argument doesn't exist, create a new companies with this data.
     */
    create: XOR<companiesCreateInput, companiesUncheckedCreateInput>
    /**
     * In case the companies was found with the provided `where` argument, update it with this data.
     */
    update: XOR<companiesUpdateInput, companiesUncheckedUpdateInput>
  }

  /**
   * companies delete
   */
  export type companiesDeleteArgs<ExtArgs extends $Extensions.InternacionalalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the companies
     */
    select?: companiesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the companies
     */
    omit?: companiesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: companiesInclude<ExtArgs> | null
    /**
     * Filter which companies to delete.
     */
    where: companiesWhereUniqueInput
  }

  /**
   * companies deleteMany
   */
  export type companiesDeleteManyArgs<ExtArgs extends $Extensions.InternacionalalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which companies to delete
     */
    where?: companiesWhereInput
    /**
     * Limit how many companies to delete.
     */
    limit?: number
  }

  /**
   * companies.bank_accounts
   */
  export type companies$bank_accountsArgs<ExtArgs extends $Extensions.InternacionalalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the bank_accounts
     */
    select?: bank_accountsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the bank_accounts
     */
    omit?: bank_accountsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: bank_accountsInclude<ExtArgs> | null
    where?: bank_accountsWhereInput
    orderBy?: bank_accountsOrderByWithRelationInput | bank_accountsOrderByWithRelationInput[]
    cursor?: bank_accountsWhereUniqueInput
    take?: number
    skip?: number
    distinct?: Bank_accountsScalarFieldEnum | Bank_accountsScalarFieldEnum[]
  }

  /**
   * companies.projects
   */
  export type companies$projectsArgs<ExtArgs extends $Extensions.InternacionalalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the projects
     */
    select?: projectsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the projects
     */
    omit?: projectsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: projectsInclude<ExtArgs> | null
    where?: projectsWhereInput
    orderBy?: projectsOrderByWithRelationInput | projectsOrderByWithRelationInput[]
    cursor?: projectsWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ProjectsScalarFieldEnum | ProjectsScalarFieldEnum[]
  }

  /**
   * companies without action
   */
  export type companiesDefaultArgs<ExtArgs extends $Extensions.InternacionalalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the companies
     */
    select?: companiesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the companies
     */
    omit?: companiesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: companiesInclude<ExtArgs> | null
  }


  /**
   * Model cost_centers
   */

  export type AggregateCost_centers = {
    _count: Cost_centersCountAggregateOutputType | null
    _avg: Cost_centersAvgAggregateOutputType | null
    _sum: Cost_centersSumAggregateOutputType | null
    _min: Cost_centersMinAggregateOutputType | null
    _max: Cost_centersMaxAggregateOutputType | null
  }

  export type Cost_centersAvgAggregateOutputType = {
    id: number | null
    parent_id: number | null
  }

  export type Cost_centersSumAggregateOutputType = {
    id: number | null
    parent_id: number | null
  }

  export type Cost_centersMinAggregateOutputType = {
    id: number | null
    code: string | null
    name: string | null
    parent_id: number | null
  }

  export type Cost_centersMaxAggregateOutputType = {
    id: number | null
    code: string | null
    name: string | null
    parent_id: number | null
  }

  export type Cost_centersCountAggregateOutputType = {
    id: number
    code: number
    name: number
    parent_id: number
    _all: number
  }


  export type Cost_centersAvgAggregateInputType = {
    id?: true
    parent_id?: true
  }

  export type Cost_centersSumAggregateInputType = {
    id?: true
    parent_id?: true
  }

  export type Cost_centersMinAggregateInputType = {
    id?: true
    code?: true
    name?: true
    parent_id?: true
  }

  export type Cost_centersMaxAggregateInputType = {
    id?: true
    code?: true
    name?: true
    parent_id?: true
  }

  export type Cost_centersCountAggregateInputType = {
    id?: true
    code?: true
    name?: true
    parent_id?: true
    _all?: true
  }

  export type Cost_centersAggregateArgs<ExtArgs extends $Extensions.InternacionalalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which cost_centers to aggregate.
     */
    where?: cost_centersWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of cost_centers to fetch.
     */
    orderBy?: cost_centersOrderByWithRelationInput | cost_centersOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: cost_centersWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` cost_centers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` cost_centers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned cost_centers
    **/
    _count?: true | Cost_centersCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: Cost_centersAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: Cost_centersSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: Cost_centersMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: Cost_centersMaxAggregateInputType
  }

  export type GetCost_centersAggregateType<T extends Cost_centersAggregateArgs> = {
        [P in keyof T & keyof AggregateCost_centers]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCost_centers[P]>
      : GetScalarType<T[P], AggregateCost_centers[P]>
  }




  export type cost_centersGroupByArgs<ExtArgs extends $Extensions.InternacionalalArgs = $Extensions.DefaultArgs> = {
    where?: cost_centersWhereInput
    orderBy?: cost_centersOrderByWithAggregationInput | cost_centersOrderByWithAggregationInput[]
    by: Cost_centersScalarFieldEnum[] | Cost_centersScalarFieldEnum
    having?: cost_centersScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: Cost_centersCountAggregateInputType | true
    _avg?: Cost_centersAvgAggregateInputType
    _sum?: Cost_centersSumAggregateInputType
    _min?: Cost_centersMinAggregateInputType
    _max?: Cost_centersMaxAggregateInputType
  }

  export type Cost_centersGroupByOutputType = {
    id: number
    code: string
    name: string
    parent_id: number | null
    _count: Cost_centersCountAggregateOutputType | null
    _avg: Cost_centersAvgAggregateOutputType | null
    _sum: Cost_centersSumAggregateOutputType | null
    _min: Cost_centersMinAggregateOutputType | null
    _max: Cost_centersMaxAggregateOutputType | null
  }

  type GetCost_centersGroupByPayload<T extends cost_centersGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<Cost_centersGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof Cost_centersGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], Cost_centersGroupByOutputType[P]>
            : GetScalarType<T[P], Cost_centersGroupByOutputType[P]>
        }
      >
    >


  export type cost_centersSelect<ExtArgs extends $Extensions.InternacionalalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    code?: boolean
    name?: boolean
    parent_id?: boolean
    cost_centers?: boolean | cost_centers$cost_centersArgs<ExtArgs>
    other_cost_centers?: boolean | cost_centers$other_cost_centersArgs<ExtArgs>
    sub_accounts?: boolean | cost_centers$sub_accountsArgs<ExtArgs>
    _count?: boolean | Cost_centersCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["cost_centers"]>

  export type cost_centersSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternacionalalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    code?: boolean
    name?: boolean
    parent_id?: boolean
    cost_centers?: boolean | cost_centers$cost_centersArgs<ExtArgs>
  }, ExtArgs["result"]["cost_centers"]>

  export type cost_centersSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternacionalalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    code?: boolean
    name?: boolean
    parent_id?: boolean
    cost_centers?: boolean | cost_centers$cost_centersArgs<ExtArgs>
  }, ExtArgs["result"]["cost_centers"]>

  export type cost_centersSelectScalar = {
    id?: boolean
    code?: boolean
    name?: boolean
    parent_id?: boolean
  }

  export type cost_centersOmit<ExtArgs extends $Extensions.InternacionalalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "code" | "name" | "parent_id", ExtArgs["result"]["cost_centers"]>
  export type cost_centersInclude<ExtArgs extends $Extensions.InternacionalalArgs = $Extensions.DefaultArgs> = {
    cost_centers?: boolean | cost_centers$cost_centersArgs<ExtArgs>
    other_cost_centers?: boolean | cost_centers$other_cost_centersArgs<ExtArgs>
    sub_accounts?: boolean | cost_centers$sub_accountsArgs<ExtArgs>
    _count?: boolean | Cost_centersCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type cost_centersIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternacionalalArgs = $Extensions.DefaultArgs> = {
    cost_centers?: boolean | cost_centers$cost_centersArgs<ExtArgs>
  }
  export type cost_centersIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternacionalalArgs = $Extensions.DefaultArgs> = {
    cost_centers?: boolean | cost_centers$cost_centersArgs<ExtArgs>
  }

  export type $cost_centersPayload<ExtArgs extends $Extensions.InternacionalalArgs = $Extensions.DefaultArgs> = {
    name: "cost_centers"
    objects: {
      cost_centers: Prisma.$cost_centersPayload<ExtArgs> | null
      other_cost_centers: Prisma.$cost_centersPayload<ExtArgs>[]
      sub_accounts: Prisma.$sub_accountsPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      code: string
      name: string
      parent_id: number | null
    }, ExtArgs["result"]["cost_centers"]>
    composites: {}
  }

  type cost_centersGetPayload<S extends boolean | null | undefined | cost_centersDefaultArgs> = $Result.GetResult<Prisma.$cost_centersPayload, S>

  type cost_centersCountArgs<ExtArgs extends $Extensions.InternacionalalArgs = $Extensions.DefaultArgs> =
    Omit<cost_centersFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: Cost_centersCountAggregateInputType | true
    }

  export interface cost_centersDelegate<ExtArgs extends $Extensions.InternacionalalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['cost_centers'], meta: { name: 'cost_centers' } }
    /**
     * Find zero or one Cost_centers that matches the filter.
     * @param {cost_centersFindUniqueArgs} args - Arguments to find a Cost_centers
     * @example
     * // Get one Cost_centers
     * const cost_centers = await prisma.cost_centers.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends cost_centersFindUniqueArgs>(args: SelectSubset<T, cost_centersFindUniqueArgs<ExtArgs>>): Prisma__cost_centersClient<$Result.GetResult<Prisma.$cost_centersPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Cost_centers that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {cost_centersFindUniqueOrThrowArgs} args - Arguments to find a Cost_centers
     * @example
     * // Get one Cost_centers
     * const cost_centers = await prisma.cost_centers.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends cost_centersFindUniqueOrThrowArgs>(args: SelectSubset<T, cost_centersFindUniqueOrThrowArgs<ExtArgs>>): Prisma__cost_centersClient<$Result.GetResult<Prisma.$cost_centersPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Cost_centers that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {cost_centersFindFirstArgs} args - Arguments to find a Cost_centers
     * @example
     * // Get one Cost_centers
     * const cost_centers = await prisma.cost_centers.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends cost_centersFindFirstArgs>(args?: SelectSubset<T, cost_centersFindFirstArgs<ExtArgs>>): Prisma__cost_centersClient<$Result.GetResult<Prisma.$cost_centersPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Cost_centers that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {cost_centersFindFirstOrThrowArgs} args - Arguments to find a Cost_centers
     * @example
     * // Get one Cost_centers
     * const cost_centers = await prisma.cost_centers.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends cost_centersFindFirstOrThrowArgs>(args?: SelectSubset<T, cost_centersFindFirstOrThrowArgs<ExtArgs>>): Prisma__cost_centersClient<$Result.GetResult<Prisma.$cost_centersPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Cost_centers that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {cost_centersFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Cost_centers
     * const cost_centers = await prisma.cost_centers.findMany()
     * 
     * // Get first 10 Cost_centers
     * const cost_centers = await prisma.cost_centers.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const cost_centersWithIdOnly = await prisma.cost_centers.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends cost_centersFindManyArgs>(args?: SelectSubset<T, cost_centersFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$cost_centersPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Cost_centers.
     * @param {cost_centersCreateArgs} args - Arguments to create a Cost_centers.
     * @example
     * // Create one Cost_centers
     * const Cost_centers = await prisma.cost_centers.create({
     *   data: {
     *     // ... data to create a Cost_centers
     *   }
     * })
     * 
     */
    create<T extends cost_centersCreateArgs>(args: SelectSubset<T, cost_centersCreateArgs<ExtArgs>>): Prisma__cost_centersClient<$Result.GetResult<Prisma.$cost_centersPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Cost_centers.
     * @param {cost_centersCreateManyArgs} args - Arguments to create many Cost_centers.
     * @example
     * // Create many Cost_centers
     * const cost_centers = await prisma.cost_centers.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends cost_centersCreateManyArgs>(args?: SelectSubset<T, cost_centersCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Cost_centers and returns the data saved in the database.
     * @param {cost_centersCreateManyAndReturnArgs} args - Arguments to create many Cost_centers.
     * @example
     * // Create many Cost_centers
     * const cost_centers = await prisma.cost_centers.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Cost_centers and only return the `id`
     * const cost_centersWithIdOnly = await prisma.cost_centers.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends cost_centersCreateManyAndReturnArgs>(args?: SelectSubset<T, cost_centersCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$cost_centersPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Cost_centers.
     * @param {cost_centersDeleteArgs} args - Arguments to delete one Cost_centers.
     * @example
     * // Delete one Cost_centers
     * const Cost_centers = await prisma.cost_centers.delete({
     *   where: {
     *     // ... filter to delete one Cost_centers
     *   }
     * })
     * 
     */
    delete<T extends cost_centersDeleteArgs>(args: SelectSubset<T, cost_centersDeleteArgs<ExtArgs>>): Prisma__cost_centersClient<$Result.GetResult<Prisma.$cost_centersPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Cost_centers.
     * @param {cost_centersUpdateArgs} args - Arguments to update one Cost_centers.
     * @example
     * // Update one Cost_centers
     * const cost_centers = await prisma.cost_centers.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends cost_centersUpdateArgs>(args: SelectSubset<T, cost_centersUpdateArgs<ExtArgs>>): Prisma__cost_centersClient<$Result.GetResult<Prisma.$cost_centersPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Cost_centers.
     * @param {cost_centersDeleteManyArgs} args - Arguments to filter Cost_centers to delete.
     * @example
     * // Delete a few Cost_centers
     * const { count } = await prisma.cost_centers.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends cost_centersDeleteManyArgs>(args?: SelectSubset<T, cost_centersDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Cost_centers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {cost_centersUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Cost_centers
     * const cost_centers = await prisma.cost_centers.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends cost_centersUpdateManyArgs>(args: SelectSubset<T, cost_centersUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Cost_centers and returns the data updated in the database.
     * @param {cost_centersUpdateManyAndReturnArgs} args - Arguments to update many Cost_centers.
     * @example
     * // Update many Cost_centers
     * const cost_centers = await prisma.cost_centers.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Cost_centers and only return the `id`
     * const cost_centersWithIdOnly = await prisma.cost_centers.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends cost_centersUpdateManyAndReturnArgs>(args: SelectSubset<T, cost_centersUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$cost_centersPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Cost_centers.
     * @param {cost_centersUpsertArgs} args - Arguments to update or create a Cost_centers.
     * @example
     * // Update or create a Cost_centers
     * const cost_centers = await prisma.cost_centers.upsert({
     *   create: {
     *     // ... data to create a Cost_centers
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Cost_centers we want to update
     *   }
     * })
     */
    upsert<T extends cost_centersUpsertArgs>(args: SelectSubset<T, cost_centersUpsertArgs<ExtArgs>>): Prisma__cost_centersClient<$Result.GetResult<Prisma.$cost_centersPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Cost_centers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {cost_centersCountArgs} args - Arguments to filter Cost_centers to count.
     * @example
     * // Count the number of Cost_centers
     * const count = await prisma.cost_centers.count({
     *   where: {
     *     // ... the filter for the Cost_centers we want to count
     *   }
     * })
    **/
    count<T extends cost_centersCountArgs>(
      args?: Subset<T, cost_centersCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], Cost_centersCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Cost_centers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Cost_centersAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends Cost_centersAggregateArgs>(args: Subset<T, Cost_centersAggregateArgs>): Prisma.PrismaPromise<GetCost_centersAggregateType<T>>

    /**
     * Group by Cost_centers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {cost_centersGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends cost_centersGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: cost_centersGroupByArgs['orderBy'] }
        : { orderBy?: cost_centersGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, cost_centersGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCost_centersGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the cost_centers model
   */
  readonly fields: cost_centersFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for cost_centers.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__cost_centersClient<T, Null = never, ExtArgs extends $Extensions.InternacionalalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    cost_centers<T extends cost_centers$cost_centersArgs<ExtArgs> = {}>(args?: Subset<T, cost_centers$cost_centersArgs<ExtArgs>>): Prisma__cost_centersClient<$Result.GetResult<Prisma.$cost_centersPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    other_cost_centers<T extends cost_centers$other_cost_centersArgs<ExtArgs> = {}>(args?: Subset<T, cost_centers$other_cost_centersArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$cost_centersPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    sub_accounts<T extends cost_centers$sub_accountsArgs<ExtArgs> = {}>(args?: Subset<T, cost_centers$sub_accountsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$sub_accountsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the cost_centers model
   */
  interface cost_centersFieldRefs {
    readonly id: FieldRef<"cost_centers", 'Int'>
    readonly code: FieldRef<"cost_centers", 'String'>
    readonly name: FieldRef<"cost_centers", 'String'>
    readonly parent_id: FieldRef<"cost_centers", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * cost_centers findUnique
   */
  export type cost_centersFindUniqueArgs<ExtArgs extends $Extensions.InternacionalalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the cost_centers
     */
    select?: cost_centersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the cost_centers
     */
    omit?: cost_centersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: cost_centersInclude<ExtArgs> | null
    /**
     * Filter, which cost_centers to fetch.
     */
    where: cost_centersWhereUniqueInput
  }

  /**
   * cost_centers findUniqueOrThrow
   */
  export type cost_centersFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternacionalalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the cost_centers
     */
    select?: cost_centersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the cost_centers
     */
    omit?: cost_centersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: cost_centersInclude<ExtArgs> | null
    /**
     * Filter, which cost_centers to fetch.
     */
    where: cost_centersWhereUniqueInput
  }

  /**
   * cost_centers findFirst
   */
  export type cost_centersFindFirstArgs<ExtArgs extends $Extensions.InternacionalalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the cost_centers
     */
    select?: cost_centersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the cost_centers
     */
    omit?: cost_centersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: cost_centersInclude<ExtArgs> | null
    /**
     * Filter, which cost_centers to fetch.
     */
    where?: cost_centersWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of cost_centers to fetch.
     */
    orderBy?: cost_centersOrderByWithRelationInput | cost_centersOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for cost_centers.
     */
    cursor?: cost_centersWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` cost_centers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` cost_centers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of cost_centers.
     */
    distinct?: Cost_centersScalarFieldEnum | Cost_centersScalarFieldEnum[]
  }

  /**
   * cost_centers findFirstOrThrow
   */
  export type cost_centersFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternacionalalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the cost_centers
     */
    select?: cost_centersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the cost_centers
     */
    omit?: cost_centersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: cost_centersInclude<ExtArgs> | null
    /**
     * Filter, which cost_centers to fetch.
     */
    where?: cost_centersWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of cost_centers to fetch.
     */
    orderBy?: cost_centersOrderByWithRelationInput | cost_centersOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for cost_centers.
     */
    cursor?: cost_centersWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` cost_centers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` cost_centers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of cost_centers.
     */
    distinct?: Cost_centersScalarFieldEnum | Cost_centersScalarFieldEnum[]
  }

  /**
   * cost_centers findMany
   */
  export type cost_centersFindManyArgs<ExtArgs extends $Extensions.InternacionalalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the cost_centers
     */
    select?: cost_centersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the cost_centers
     */
    omit?: cost_centersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: cost_centersInclude<ExtArgs> | null
    /**
     * Filter, which cost_centers to fetch.
     */
    where?: cost_centersWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of cost_centers to fetch.
     */
    orderBy?: cost_centersOrderByWithRelationInput | cost_centersOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing cost_centers.
     */
    cursor?: cost_centersWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` cost_centers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` cost_centers.
     */
    skip?: number
    distinct?: Cost_centersScalarFieldEnum | Cost_centersScalarFieldEnum[]
  }

  /**
   * cost_centers create
   */
  export type cost_centersCreateArgs<ExtArgs extends $Extensions.InternacionalalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the cost_centers
     */
    select?: cost_centersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the cost_centers
     */
    omit?: cost_centersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: cost_centersInclude<ExtArgs> | null
    /**
     * The data needed to create a cost_centers.
     */
    data: XOR<cost_centersCreateInput, cost_centersUncheckedCreateInput>
  }

  /**
   * cost_centers createMany
   */
  export type cost_centersCreateManyArgs<ExtArgs extends $Extensions.InternacionalalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many cost_centers.
     */
    data: cost_centersCreateManyInput | cost_centersCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * cost_centers createManyAndReturn
   */
  export type cost_centersCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternacionalalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the cost_centers
     */
    select?: cost_centersSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the cost_centers
     */
    omit?: cost_centersOmit<ExtArgs> | null
    /**
     * The data used to create many cost_centers.
     */
    data: cost_centersCreateManyInput | cost_centersCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: cost_centersIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * cost_centers update
   */
  export type cost_centersUpdateArgs<ExtArgs extends $Extensions.InternacionalalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the cost_centers
     */
    select?: cost_centersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the cost_centers
     */
    omit?: cost_centersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: cost_centersInclude<ExtArgs> | null
    /**
     * The data needed to update a cost_centers.
     */
    data: XOR<cost_centersUpdateInput, cost_centersUncheckedUpdateInput>
    /**
     * Choose, which cost_centers to update.
     */
    where: cost_centersWhereUniqueInput
  }

  /**
   * cost_centers updateMany
   */
  export type cost_centersUpdateManyArgs<ExtArgs extends $Extensions.InternacionalalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update cost_centers.
     */
    data: XOR<cost_centersUpdateManyMutationInput, cost_centersUncheckedUpdateManyInput>
    /**
     * Filter which cost_centers to update
     */
    where?: cost_centersWhereInput
    /**
     * Limit how many cost_centers to update.
     */
    limit?: number
  }

  /**
   * cost_centers updateManyAndReturn
   */
  export type cost_centersUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternacionalalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the cost_centers
     */
    select?: cost_centersSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the cost_centers
     */
    omit?: cost_centersOmit<ExtArgs> | null
    /**
     * The data used to update cost_centers.
     */
    data: XOR<cost_centersUpdateManyMutationInput, cost_centersUncheckedUpdateManyInput>
    /**
     * Filter which cost_centers to update
     */
    where?: cost_centersWhereInput
    /**
     * Limit how many cost_centers to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: cost_centersIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * cost_centers upsert
   */
  export type cost_centersUpsertArgs<ExtArgs extends $Extensions.InternacionalalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the cost_centers
     */
    select?: cost_centersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the cost_centers
     */
    omit?: cost_centersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: cost_centersInclude<ExtArgs> | null
    /**
     * The filter to search for the cost_centers to update in case it exists.
     */
    where: cost_centersWhereUniqueInput
    /**
     * In case the cost_centers found by the `where` argument doesn't exist, create a new cost_centers with this data.
     */
    create: XOR<cost_centersCreateInput, cost_centersUncheckedCreateInput>
    /**
     * In case the cost_centers was found with the provided `where` argument, update it with this data.
     */
    update: XOR<cost_centersUpdateInput, cost_centersUncheckedUpdateInput>
  }

  /**
   * cost_centers delete
   */
  export type cost_centersDeleteArgs<ExtArgs extends $Extensions.InternacionalalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the cost_centers
     */
    select?: cost_centersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the cost_centers
     */
    omit?: cost_centersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: cost_centersInclude<ExtArgs> | null
    /**
     * Filter which cost_centers to delete.
     */
    where: cost_centersWhereUniqueInput
  }

  /**
   * cost_centers deleteMany
   */
  export type cost_centersDeleteManyArgs<ExtArgs extends $Extensions.InternacionalalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which cost_centers to delete
     */
    where?: cost_centersWhereInput
    /**
     * Limit how many cost_centers to delete.
     */
    limit?: number
  }

  /**
   * cost_centers.cost_centers
   */
  export type cost_centers$cost_centersArgs<ExtArgs extends $Extensions.InternacionalalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the cost_centers
     */
    select?: cost_centersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the cost_centers
     */
    omit?: cost_centersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: cost_centersInclude<ExtArgs> | null
    where?: cost_centersWhereInput
  }

  /**
   * cost_centers.other_cost_centers
   */
  export type cost_centers$other_cost_centersArgs<ExtArgs extends $Extensions.InternacionalalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the cost_centers
     */
    select?: cost_centersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the cost_centers
     */
    omit?: cost_centersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: cost_centersInclude<ExtArgs> | null
    where?: cost_centersWhereInput
    orderBy?: cost_centersOrderByWithRelationInput | cost_centersOrderByWithRelationInput[]
    cursor?: cost_centersWhereUniqueInput
    take?: number
    skip?: number
    distinct?: Cost_centersScalarFieldEnum | Cost_centersScalarFieldEnum[]
  }

  /**
   * cost_centers.sub_accounts
   */
  export type cost_centers$sub_accountsArgs<ExtArgs extends $Extensions.InternacionalalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the sub_accounts
     */
    select?: sub_accountsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the sub_accounts
     */
    omit?: sub_accountsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: sub_accountsInclude<ExtArgs> | null
    where?: sub_accountsWhereInput
    orderBy?: sub_accountsOrderByWithRelationInput | sub_accountsOrderByWithRelationInput[]
    cursor?: sub_accountsWhereUniqueInput
    take?: number
    skip?: number
    distinct?: Sub_accountsScalarFieldEnum | Sub_accountsScalarFieldEnum[]
  }

  /**
   * cost_centers without action
   */
  export type cost_centersDefaultArgs<ExtArgs extends $Extensions.InternacionalalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the cost_centers
     */
    select?: cost_centersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the cost_centers
     */
    omit?: cost_centersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: cost_centersInclude<ExtArgs> | null
  }


  /**
   * Model credits
   */

  export type AggregateCredits = {
    _count: CreditsCountAggregateOutputType | null
    _avg: CreditsAvgAggregateOutputType | null
    _sum: CreditsSumAggregateOutputType | null
    _min: CreditsMinAggregateOutputType | null
    _max: CreditsMaxAggregateOutputType | null
  }

  export type CreditsAvgAggregateOutputType = {
    id: number | null
    obligation_id: number | null
    interest_rate_pct: Decimal | null
  }

  export type CreditsSumAggregateOutputType = {
    id: bigint | null
    obligation_id: bigint | null
    interest_rate_pct: Decimal | null
  }

  export type CreditsMinAggregateOutputType = {
    id: bigint | null
    obligation_id: bigint | null
    interest_rate_pct: Decimal | null
    start_date: Date | null
    end_date: Date | null
    amortization_scheme: string | null
    last_calculated: Date | null
  }

  export type CreditsMaxAggregateOutputType = {
    id: bigint | null
    obligation_id: bigint | null
    interest_rate_pct: Decimal | null
    start_date: Date | null
    end_date: Date | null
    amortization_scheme: string | null
    last_calculated: Date | null
  }

  export type CreditsCountAggregateOutputType = {
    id: number
    obligation_id: number
    interest_rate_pct: number
    start_date: number
    end_date: number
    amortization_scheme: number
    last_calculated: number
    _all: number
  }


  export type CreditsAvgAggregateInputType = {
    id?: true
    obligation_id?: true
    interest_rate_pct?: true
  }

  export type CreditsSumAggregateInputType = {
    id?: true
    obligation_id?: true
    interest_rate_pct?: true
  }

  export type CreditsMinAggregateInputType = {
    id?: true
    obligation_id?: true
    interest_rate_pct?: true
    start_date?: true
    end_date?: true
    amortization_scheme?: true
    last_calculated?: true
  }

  export type CreditsMaxAggregateInputType = {
    id?: true
    obligation_id?: true
    interest_rate_pct?: true
    start_date?: true
    end_date?: true
    amortization_scheme?: true
    last_calculated?: true
  }

  export type CreditsCountAggregateInputType = {
    id?: true
    obligation_id?: true
    interest_rate_pct?: true
    start_date?: true
    end_date?: true
    amortization_scheme?: true
    last_calculated?: true
    _all?: true
  }

  export type CreditsAggregateArgs<ExtArgs extends $Extensions.InternacionalalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which credits to aggregate.
     */
    where?: creditsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of credits to fetch.
     */
    orderBy?: creditsOrderByWithRelationInput | creditsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: creditsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` credits from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` credits.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned credits
    **/
    _count?: true | CreditsCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: CreditsAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: CreditsSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CreditsMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CreditsMaxAggregateInputType
  }

  export type GetCreditsAggregateType<T extends CreditsAggregateArgs> = {
        [P in keyof T & keyof AggregateCredits]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCredits[P]>
      : GetScalarType<T[P], AggregateCredits[P]>
  }




  export type creditsGroupByArgs<ExtArgs extends $Extensions.InternacionalalArgs = $Extensions.DefaultArgs> = {
    where?: creditsWhereInput
    orderBy?: creditsOrderByWithAggregationInput | creditsOrderByWithAggregationInput[]
    by: CreditsScalarFieldEnum[] | CreditsScalarFieldEnum
    having?: creditsScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CreditsCountAggregateInputType | true
    _avg?: CreditsAvgAggregateInputType
    _sum?: CreditsSumAggregateInputType
    _min?: CreditsMinAggregateInputType
    _max?: CreditsMaxAggregateInputType
  }

  export type CreditsGroupByOutputType = {
    id: bigint
    obligation_id: bigint
    interest_rate_pct: Decimal
    start_date: Date
    end_date: Date | null
    amortization_scheme: string | null
    last_calculated: Date | null
    _count: CreditsCountAggregateOutputType | null
    _avg: CreditsAvgAggregateOutputType | null
    _sum: CreditsSumAggregateOutputType | null
    _min: CreditsMinAggregateOutputType | null
    _max: CreditsMaxAggregateOutputType | null
  }

  type GetCreditsGroupByPayload<T extends creditsGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CreditsGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CreditsGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CreditsGroupByOutputType[P]>
            : GetScalarType<T[P], CreditsGroupByOutputType[P]>
        }
      >
    >


  export type creditsSelect<ExtArgs extends $Extensions.InternacionalalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    obligation_id?: boolean
    interest_rate_pct?: boolean
    start_date?: boolean
    end_date?: boolean
    amortization_scheme?: boolean
    last_calculated?: boolean
    obligations?: boolean | obligationsDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["credits"]>

  export type creditsSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternacionalalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    obligation_id?: boolean
    interest_rate_pct?: boolean
    start_date?: boolean
    end_date?: boolean
    amortization_scheme?: boolean
    last_calculated?: boolean
    obligations?: boolean | obligationsDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["credits"]>

  export type creditsSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternacionalalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    obligation_id?: boolean
    interest_rate_pct?: boolean
    start_date?: boolean
    end_date?: boolean
    amortization_scheme?: boolean
    last_calculated?: boolean
    obligations?: boolean | obligationsDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["credits"]>

  export type creditsSelectScalar = {
    id?: boolean
    obligation_id?: boolean
    interest_rate_pct?: boolean
    start_date?: boolean
    end_date?: boolean
    amortization_scheme?: boolean
    last_calculated?: boolean
  }

  export type creditsOmit<ExtArgs extends $Extensions.InternacionalalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "obligation_id" | "interest_rate_pct" | "start_date" | "end_date" | "amortization_scheme" | "last_calculated", ExtArgs["result"]["credits"]>
  export type creditsInclude<ExtArgs extends $Extensions.InternacionalalArgs = $Extensions.DefaultArgs> = {
    obligations?: boolean | obligationsDefaultArgs<ExtArgs>
  }
  export type creditsIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternacionalalArgs = $Extensions.DefaultArgs> = {
    obligations?: boolean | obligationsDefaultArgs<ExtArgs>
  }
  export type creditsIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternacionalalArgs = $Extensions.DefaultArgs> = {
    obligations?: boolean | obligationsDefaultArgs<ExtArgs>
  }

  export type $creditsPayload<ExtArgs extends $Extensions.InternacionalalArgs = $Extensions.DefaultArgs> = {
    name: "credits"
    objects: {
      obligations: Prisma.$obligationsPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: bigint
      obligation_id: bigint
      interest_rate_pct: Prisma.Decimal
      start_date: Date
      end_date: Date | null
      amortization_scheme: string | null
      last_calculated: Date | null
    }, ExtArgs["result"]["credits"]>
    composites: {}
  }

  type creditsGetPayload<S extends boolean | null | undefined | creditsDefaultArgs> = $Result.GetResult<Prisma.$creditsPayload, S>

  type creditsCountArgs<ExtArgs extends $Extensions.InternacionalalArgs = $Extensions.DefaultArgs> =
    Omit<creditsFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: CreditsCountAggregateInputType | true
    }

  export interface creditsDelegate<ExtArgs extends $Extensions.InternacionalalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['credits'], meta: { name: 'credits' } }
    /**
     * Find zero or one Credits that matches the filter.
     * @param {creditsFindUniqueArgs} args - Arguments to find a Credits
     * @example
     * // Get one Credits
     * const credits = await prisma.credits.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends creditsFindUniqueArgs>(args: SelectSubset<T, creditsFindUniqueArgs<ExtArgs>>): Prisma__creditsClient<$Result.GetResult<Prisma.$creditsPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Credits that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {creditsFindUniqueOrThrowArgs} args - Arguments to find a Credits
     * @example
     * // Get one Credits
     * const credits = await prisma.credits.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends creditsFindUniqueOrThrowArgs>(args: SelectSubset<T, creditsFindUniqueOrThrowArgs<ExtArgs>>): Prisma__creditsClient<$Result.GetResult<Prisma.$creditsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Credits that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {creditsFindFirstArgs} args - Arguments to find a Credits
     * @example
     * // Get one Credits
     * const credits = await prisma.credits.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends creditsFindFirstArgs>(args?: SelectSubset<T, creditsFindFirstArgs<ExtArgs>>): Prisma__creditsClient<$Result.GetResult<Prisma.$creditsPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Credits that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {creditsFindFirstOrThrowArgs} args - Arguments to find a Credits
     * @example
     * // Get one Credits
     * const credits = await prisma.credits.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends creditsFindFirstOrThrowArgs>(args?: SelectSubset<T, creditsFindFirstOrThrowArgs<ExtArgs>>): Prisma__creditsClient<$Result.GetResult<Prisma.$creditsPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Credits that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {creditsFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Credits
     * const credits = await prisma.credits.findMany()
     * 
     * // Get first 10 Credits
     * const credits = await prisma.credits.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const creditsWithIdOnly = await prisma.credits.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends creditsFindManyArgs>(args?: SelectSubset<T, creditsFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$creditsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Credits.
     * @param {creditsCreateArgs} args - Arguments to create a Credits.
     * @example
     * // Create one Credits
     * const Credits = await prisma.credits.create({
     *   data: {
     *     // ... data to create a Credits
     *   }
     * })
     * 
     */
    create<T extends creditsCreateArgs>(args: SelectSubset<T, creditsCreateArgs<ExtArgs>>): Prisma__creditsClient<$Result.GetResult<Prisma.$creditsPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Credits.
     * @param {creditsCreateManyArgs} args - Arguments to create many Credits.
     * @example
     * // Create many Credits
     * const credits = await prisma.credits.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends creditsCreateManyArgs>(args?: SelectSubset<T, creditsCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Credits and returns the data saved in the database.
     * @param {creditsCreateManyAndReturnArgs} args - Arguments to create many Credits.
     * @example
     * // Create many Credits
     * const credits = await prisma.credits.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Credits and only return the `id`
     * const creditsWithIdOnly = await prisma.credits.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends creditsCreateManyAndReturnArgs>(args?: SelectSubset<T, creditsCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$creditsPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Credits.
     * @param {creditsDeleteArgs} args - Arguments to delete one Credits.
     * @example
     * // Delete one Credits
     * const Credits = await prisma.credits.delete({
     *   where: {
     *     // ... filter to delete one Credits
     *   }
     * })
     * 
     */
    delete<T extends creditsDeleteArgs>(args: SelectSubset<T, creditsDeleteArgs<ExtArgs>>): Prisma__creditsClient<$Result.GetResult<Prisma.$creditsPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Credits.
     * @param {creditsUpdateArgs} args - Arguments to update one Credits.
     * @example
     * // Update one Credits
     * const credits = await prisma.credits.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends creditsUpdateArgs>(args: SelectSubset<T, creditsUpdateArgs<ExtArgs>>): Prisma__creditsClient<$Result.GetResult<Prisma.$creditsPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Credits.
     * @param {creditsDeleteManyArgs} args - Arguments to filter Credits to delete.
     * @example
     * // Delete a few Credits
     * const { count } = await prisma.credits.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends creditsDeleteManyArgs>(args?: SelectSubset<T, creditsDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Credits.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {creditsUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Credits
     * const credits = await prisma.credits.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends creditsUpdateManyArgs>(args: SelectSubset<T, creditsUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Credits and returns the data updated in the database.
     * @param {creditsUpdateManyAndReturnArgs} args - Arguments to update many Credits.
     * @example
     * // Update many Credits
     * const credits = await prisma.credits.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Credits and only return the `id`
     * const creditsWithIdOnly = await prisma.credits.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends creditsUpdateManyAndReturnArgs>(args: SelectSubset<T, creditsUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$creditsPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Credits.
     * @param {creditsUpsertArgs} args - Arguments to update or create a Credits.
     * @example
     * // Update or create a Credits
     * const credits = await prisma.credits.upsert({
     *   create: {
     *     // ... data to create a Credits
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Credits we want to update
     *   }
     * })
     */
    upsert<T extends creditsUpsertArgs>(args: SelectSubset<T, creditsUpsertArgs<ExtArgs>>): Prisma__creditsClient<$Result.GetResult<Prisma.$creditsPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Credits.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {creditsCountArgs} args - Arguments to filter Credits to count.
     * @example
     * // Count the number of Credits
     * const count = await prisma.credits.count({
     *   where: {
     *     // ... the filter for the Credits we want to count
     *   }
     * })
    **/
    count<T extends creditsCountArgs>(
      args?: Subset<T, creditsCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CreditsCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Credits.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CreditsAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends CreditsAggregateArgs>(args: Subset<T, CreditsAggregateArgs>): Prisma.PrismaPromise<GetCreditsAggregateType<T>>

    /**
     * Group by Credits.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {creditsGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends creditsGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: creditsGroupByArgs['orderBy'] }
        : { orderBy?: creditsGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, creditsGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCreditsGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the credits model
   */
  readonly fields: creditsFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for credits.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__creditsClient<T, Null = never, ExtArgs extends $Extensions.InternacionalalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    obligations<T extends obligationsDefaultArgs<ExtArgs> = {}>(args?: Subset<T, obligationsDefaultArgs<ExtArgs>>): Prisma__obligationsClient<$Result.GetResult<Prisma.$obligationsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the credits model
   */
  interface creditsFieldRefs {
    readonly id: FieldRef<"credits", 'BigInt'>
    readonly obligation_id: FieldRef<"credits", 'BigInt'>
    readonly interest_rate_pct: FieldRef<"credits", 'Decimal'>
    readonly start_date: FieldRef<"credits", 'DateTime'>
    readonly end_date: FieldRef<"credits", 'DateTime'>
    readonly amortization_scheme: FieldRef<"credits", 'String'>
    readonly last_calculated: FieldRef<"credits", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * credits findUnique
   */
  export type creditsFindUniqueArgs<ExtArgs extends $Extensions.InternacionalalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the credits
     */
    select?: creditsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the credits
     */
    omit?: creditsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: creditsInclude<ExtArgs> | null
    /**
     * Filter, which credits to fetch.
     */
    where: creditsWhereUniqueInput
  }

  /**
   * credits findUniqueOrThrow
   */
  export type creditsFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternacionalalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the credits
     */
    select?: creditsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the credits
     */
    omit?: creditsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: creditsInclude<ExtArgs> | null
    /**
     * Filter, which credits to fetch.
     */
    where: creditsWhereUniqueInput
  }

  /**
   * credits findFirst
   */
  export type creditsFindFirstArgs<ExtArgs extends $Extensions.InternacionalalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the credits
     */
    select?: creditsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the credits
     */
    omit?: creditsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: creditsInclude<ExtArgs> | null
    /**
     * Filter, which credits to fetch.
     */
    where?: creditsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of credits to fetch.
     */
    orderBy?: creditsOrderByWithRelationInput | creditsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for credits.
     */
    cursor?: creditsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` credits from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` credits.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of credits.
     */
    distinct?: CreditsScalarFieldEnum | CreditsScalarFieldEnum[]
  }

  /**
   * credits findFirstOrThrow
   */
  export type creditsFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternacionalalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the credits
     */
    select?: creditsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the credits
     */
    omit?: creditsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: creditsInclude<ExtArgs> | null
    /**
     * Filter, which credits to fetch.
     */
    where?: creditsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of credits to fetch.
     */
    orderBy?: creditsOrderByWithRelationInput | creditsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for credits.
     */
    cursor?: creditsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` credits from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` credits.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of credits.
     */
    distinct?: CreditsScalarFieldEnum | CreditsScalarFieldEnum[]
  }

  /**
   * credits findMany
   */
  export type creditsFindManyArgs<ExtArgs extends $Extensions.InternacionalalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the credits
     */
    select?: creditsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the credits
     */
    omit?: creditsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: creditsInclude<ExtArgs> | null
    /**
     * Filter, which credits to fetch.
     */
    where?: creditsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of credits to fetch.
     */
    orderBy?: creditsOrderByWithRelationInput | creditsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing credits.
     */
    cursor?: creditsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` credits from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` credits.
     */
    skip?: number
    distinct?: CreditsScalarFieldEnum | CreditsScalarFieldEnum[]
  }

  /**
   * credits create
   */
  export type creditsCreateArgs<ExtArgs extends $Extensions.InternacionalalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the credits
     */
    select?: creditsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the credits
     */
    omit?: creditsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: creditsInclude<ExtArgs> | null
    /**
     * The data needed to create a credits.
     */
    data: XOR<creditsCreateInput, creditsUncheckedCreateInput>
  }

  /**
   * credits createMany
   */
  export type creditsCreateManyArgs<ExtArgs extends $Extensions.InternacionalalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many credits.
     */
    data: creditsCreateManyInput | creditsCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * credits createManyAndReturn
   */
  export type creditsCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternacionalalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the credits
     */
    select?: creditsSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the credits
     */
    omit?: creditsOmit<ExtArgs> | null
    /**
     * The data used to create many credits.
     */
    data: creditsCreateManyInput | creditsCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: creditsIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * credits update
   */
  export type creditsUpdateArgs<ExtArgs extends $Extensions.InternacionalalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the credits
     */
    select?: creditsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the credits
     */
    omit?: creditsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: creditsInclude<ExtArgs> | null
    /**
     * The data needed to update a credits.
     */
    data: XOR<creditsUpdateInput, creditsUncheckedUpdateInput>
    /**
     * Choose, which credits to update.
     */
    where: creditsWhereUniqueInput
  }

  /**
   * credits updateMany
   */
  export type creditsUpdateManyArgs<ExtArgs extends $Extensions.InternacionalalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update credits.
     */
    data: XOR<creditsUpdateManyMutationInput, creditsUncheckedUpdateManyInput>
    /**
     * Filter which credits to update
     */
    where?: creditsWhereInput
    /**
     * Limit how many credits to update.
     */
    limit?: number
  }

  /**
   * credits updateManyAndReturn
   */
  export type creditsUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternacionalalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the credits
     */
    select?: creditsSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the credits
     */
    omit?: creditsOmit<ExtArgs> | null
    /**
     * The data used to update credits.
     */
    data: XOR<creditsUpdateManyMutationInput, creditsUncheckedUpdateManyInput>
    /**
     * Filter which credits to update
     */
    where?: creditsWhereInput
    /**
     * Limit how many credits to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: creditsIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * credits upsert
   */
  export type creditsUpsertArgs<ExtArgs extends $Extensions.InternacionalalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the credits
     */
    select?: creditsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the credits
     */
    omit?: creditsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: creditsInclude<ExtArgs> | null
    /**
     * The filter to search for the credits to update in case it exists.
     */
    where: creditsWhereUniqueInput
    /**
     * In case the credits found by the `where` argument doesn't exist, create a new credits with this data.
     */
    create: XOR<creditsCreateInput, creditsUncheckedCreateInput>
    /**
     * In case the credits was found with the provided `where` argument, update it with this data.
     */
    update: XOR<creditsUpdateInput, creditsUncheckedUpdateInput>
  }

  /**
   * credits delete
   */
  export type creditsDeleteArgs<ExtArgs extends $Extensions.InternacionalalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the credits
     */
    select?: creditsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the credits
     */
    omit?: creditsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: creditsInclude<ExtArgs> | null
    /**
     * Filter which credits to delete.
     */
    where: creditsWhereUniqueInput
  }

  /**
   * credits deleteMany
   */
  export type creditsDeleteManyArgs<ExtArgs extends $Extensions.InternacionalalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which credits to delete
     */
    where?: creditsWhereInput
    /**
     * Limit how many credits to delete.
     */
    limit?: number
  }

  /**
   * credits without action
   */
  export type creditsDefaultArgs<ExtArgs extends $Extensions.InternacionalalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the credits
     */
    select?: creditsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the credits
     */
    omit?: creditsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: creditsInclude<ExtArgs> | null
  }


  /**
   * Model movement_matches
   */

  export type AggregateMovement_matches = {
    _count: Movement_matchesCountAggregateOutputType | null
    _avg: Movement_matchesAvgAggregateOutputType | null
    _sum: Movement_matchesSumAggregateOutputType | null
    _min: Movement_matchesMinAggregateOutputType | null
    _max: Movement_matchesMaxAggregateOutputType | null
  }

  export type Movement_matchesAvgAggregateOutputType = {
    movement_id: number | null
    obligation_id: number | null
    matched_amount: Decimal | null
  }

  export type Movement_matchesSumAggregateOutputType = {
    movement_id: bigint | null
    obligation_id: bigint | null
    matched_amount: Decimal | null
  }

  export type Movement_matchesMinAggregateOutputType = {
    movement_id: bigint | null
    obligation_id: bigint | null
    matched_amount: Decimal | null
  }

  export type Movement_matchesMaxAggregateOutputType = {
    movement_id: bigint | null
    obligation_id: bigint | null
    matched_amount: Decimal | null
  }

  export type Movement_matchesCountAggregateOutputType = {
    movement_id: number
    obligation_id: number
    matched_amount: number
    _all: number
  }


  export type Movement_matchesAvgAggregateInputType = {
    movement_id?: true
    obligation_id?: true
    matched_amount?: true
  }

  export type Movement_matchesSumAggregateInputType = {
    movement_id?: true
    obligation_id?: true
    matched_amount?: true
  }

  export type Movement_matchesMinAggregateInputType = {
    movement_id?: true
    obligation_id?: true
    matched_amount?: true
  }

  export type Movement_matchesMaxAggregateInputType = {
    movement_id?: true
    obligation_id?: true
    matched_amount?: true
  }

  export type Movement_matchesCountAggregateInputType = {
    movement_id?: true
    obligation_id?: true
    matched_amount?: true
    _all?: true
  }

  export type Movement_matchesAggregateArgs<ExtArgs extends $Extensions.InternacionalalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which movement_matches to aggregate.
     */
    where?: movement_matchesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of movement_matches to fetch.
     */
    orderBy?: movement_matchesOrderByWithRelationInput | movement_matchesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: movement_matchesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` movement_matches from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` movement_matches.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned movement_matches
    **/
    _count?: true | Movement_matchesCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: Movement_matchesAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: Movement_matchesSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: Movement_matchesMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: Movement_matchesMaxAggregateInputType
  }

  export type GetMovement_matchesAggregateType<T extends Movement_matchesAggregateArgs> = {
        [P in keyof T & keyof AggregateMovement_matches]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateMovement_matches[P]>
      : GetScalarType<T[P], AggregateMovement_matches[P]>
  }




  export type movement_matchesGroupByArgs<ExtArgs extends $Extensions.InternacionalalArgs = $Extensions.DefaultArgs> = {
    where?: movement_matchesWhereInput
    orderBy?: movement_matchesOrderByWithAggregationInput | movement_matchesOrderByWithAggregationInput[]
    by: Movement_matchesScalarFieldEnum[] | Movement_matchesScalarFieldEnum
    having?: movement_matchesScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: Movement_matchesCountAggregateInputType | true
    _avg?: Movement_matchesAvgAggregateInputType
    _sum?: Movement_matchesSumAggregateInputType
    _min?: Movement_matchesMinAggregateInputType
    _max?: Movement_matchesMaxAggregateInputType
  }

  export type Movement_matchesGroupByOutputType = {
    movement_id: bigint
    obligation_id: bigint
    matched_amount: Decimal
    _count: Movement_matchesCountAggregateOutputType | null
    _avg: Movement_matchesAvgAggregateOutputType | null
    _sum: Movement_matchesSumAggregateOutputType | null
    _min: Movement_matchesMinAggregateOutputType | null
    _max: Movement_matchesMaxAggregateOutputType | null
  }

  type GetMovement_matchesGroupByPayload<T extends movement_matchesGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<Movement_matchesGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof Movement_matchesGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], Movement_matchesGroupByOutputType[P]>
            : GetScalarType<T[P], Movement_matchesGroupByOutputType[P]>
        }
      >
    >


  export type movement_matchesSelect<ExtArgs extends $Extensions.InternacionalalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    movement_id?: boolean
    obligation_id?: boolean
    matched_amount?: boolean
    bank_movements?: boolean | bank_movementsDefaultArgs<ExtArgs>
    obligations?: boolean | obligationsDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["movement_matches"]>

  export type movement_matchesSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternacionalalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    movement_id?: boolean
    obligation_id?: boolean
    matched_amount?: boolean
    bank_movements?: boolean | bank_movementsDefaultArgs<ExtArgs>
    obligations?: boolean | obligationsDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["movement_matches"]>

  export type movement_matchesSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternacionalalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    movement_id?: boolean
    obligation_id?: boolean
    matched_amount?: boolean
    bank_movements?: boolean | bank_movementsDefaultArgs<ExtArgs>
    obligations?: boolean | obligationsDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["movement_matches"]>

  export type movement_matchesSelectScalar = {
    movement_id?: boolean
    obligation_id?: boolean
    matched_amount?: boolean
  }

  export type movement_matchesOmit<ExtArgs extends $Extensions.InternacionalalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"movement_id" | "obligation_id" | "matched_amount", ExtArgs["result"]["movement_matches"]>
  export type movement_matchesInclude<ExtArgs extends $Extensions.InternacionalalArgs = $Extensions.DefaultArgs> = {
    bank_movements?: boolean | bank_movementsDefaultArgs<ExtArgs>
    obligations?: boolean | obligationsDefaultArgs<ExtArgs>
  }
  export type movement_matchesIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternacionalalArgs = $Extensions.DefaultArgs> = {
    bank_movements?: boolean | bank_movementsDefaultArgs<ExtArgs>
    obligations?: boolean | obligationsDefaultArgs<ExtArgs>
  }
  export type movement_matchesIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternacionalalArgs = $Extensions.DefaultArgs> = {
    bank_movements?: boolean | bank_movementsDefaultArgs<ExtArgs>
    obligations?: boolean | obligationsDefaultArgs<ExtArgs>
  }

  export type $movement_matchesPayload<ExtArgs extends $Extensions.InternacionalalArgs = $Extensions.DefaultArgs> = {
    name: "movement_matches"
    objects: {
      bank_movements: Prisma.$bank_movementsPayload<ExtArgs>
      obligations: Prisma.$obligationsPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      movement_id: bigint
      obligation_id: bigint
      matched_amount: Prisma.Decimal
    }, ExtArgs["result"]["movement_matches"]>
    composites: {}
  }

  type movement_matchesGetPayload<S extends boolean | null | undefined | movement_matchesDefaultArgs> = $Result.GetResult<Prisma.$movement_matchesPayload, S>

  type movement_matchesCountArgs<ExtArgs extends $Extensions.InternacionalalArgs = $Extensions.DefaultArgs> =
    Omit<movement_matchesFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: Movement_matchesCountAggregateInputType | true
    }

  export interface movement_matchesDelegate<ExtArgs extends $Extensions.InternacionalalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['movement_matches'], meta: { name: 'movement_matches' } }
    /**
     * Find zero or one Movement_matches that matches the filter.
     * @param {movement_matchesFindUniqueArgs} args - Arguments to find a Movement_matches
     * @example
     * // Get one Movement_matches
     * const movement_matches = await prisma.movement_matches.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends movement_matchesFindUniqueArgs>(args: SelectSubset<T, movement_matchesFindUniqueArgs<ExtArgs>>): Prisma__movement_matchesClient<$Result.GetResult<Prisma.$movement_matchesPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Movement_matches that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {movement_matchesFindUniqueOrThrowArgs} args - Arguments to find a Movement_matches
     * @example
     * // Get one Movement_matches
     * const movement_matches = await prisma.movement_matches.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends movement_matchesFindUniqueOrThrowArgs>(args: SelectSubset<T, movement_matchesFindUniqueOrThrowArgs<ExtArgs>>): Prisma__movement_matchesClient<$Result.GetResult<Prisma.$movement_matchesPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Movement_matches that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {movement_matchesFindFirstArgs} args - Arguments to find a Movement_matches
     * @example
     * // Get one Movement_matches
     * const movement_matches = await prisma.movement_matches.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends movement_matchesFindFirstArgs>(args?: SelectSubset<T, movement_matchesFindFirstArgs<ExtArgs>>): Prisma__movement_matchesClient<$Result.GetResult<Prisma.$movement_matchesPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Movement_matches that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {movement_matchesFindFirstOrThrowArgs} args - Arguments to find a Movement_matches
     * @example
     * // Get one Movement_matches
     * const movement_matches = await prisma.movement_matches.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends movement_matchesFindFirstOrThrowArgs>(args?: SelectSubset<T, movement_matchesFindFirstOrThrowArgs<ExtArgs>>): Prisma__movement_matchesClient<$Result.GetResult<Prisma.$movement_matchesPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Movement_matches that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {movement_matchesFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Movement_matches
     * const movement_matches = await prisma.movement_matches.findMany()
     * 
     * // Get first 10 Movement_matches
     * const movement_matches = await prisma.movement_matches.findMany({ take: 10 })
     * 
     * // Only select the `movement_id`
     * const movement_matchesWithMovement_idOnly = await prisma.movement_matches.findMany({ select: { movement_id: true } })
     * 
     */
    findMany<T extends movement_matchesFindManyArgs>(args?: SelectSubset<T, movement_matchesFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$movement_matchesPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Movement_matches.
     * @param {movement_matchesCreateArgs} args - Arguments to create a Movement_matches.
     * @example
     * // Create one Movement_matches
     * const Movement_matches = await prisma.movement_matches.create({
     *   data: {
     *     // ... data to create a Movement_matches
     *   }
     * })
     * 
     */
    create<T extends movement_matchesCreateArgs>(args: SelectSubset<T, movement_matchesCreateArgs<ExtArgs>>): Prisma__movement_matchesClient<$Result.GetResult<Prisma.$movement_matchesPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Movement_matches.
     * @param {movement_matchesCreateManyArgs} args - Arguments to create many Movement_matches.
     * @example
     * // Create many Movement_matches
     * const movement_matches = await prisma.movement_matches.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends movement_matchesCreateManyArgs>(args?: SelectSubset<T, movement_matchesCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Movement_matches and returns the data saved in the database.
     * @param {movement_matchesCreateManyAndReturnArgs} args - Arguments to create many Movement_matches.
     * @example
     * // Create many Movement_matches
     * const movement_matches = await prisma.movement_matches.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Movement_matches and only return the `movement_id`
     * const movement_matchesWithMovement_idOnly = await prisma.movement_matches.createManyAndReturn({
     *   select: { movement_id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends movement_matchesCreateManyAndReturnArgs>(args?: SelectSubset<T, movement_matchesCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$movement_matchesPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Movement_matches.
     * @param {movement_matchesDeleteArgs} args - Arguments to delete one Movement_matches.
     * @example
     * // Delete one Movement_matches
     * const Movement_matches = await prisma.movement_matches.delete({
     *   where: {
     *     // ... filter to delete one Movement_matches
     *   }
     * })
     * 
     */
    delete<T extends movement_matchesDeleteArgs>(args: SelectSubset<T, movement_matchesDeleteArgs<ExtArgs>>): Prisma__movement_matchesClient<$Result.GetResult<Prisma.$movement_matchesPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Movement_matches.
     * @param {movement_matchesUpdateArgs} args - Arguments to update one Movement_matches.
     * @example
     * // Update one Movement_matches
     * const movement_matches = await prisma.movement_matches.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends movement_matchesUpdateArgs>(args: SelectSubset<T, movement_matchesUpdateArgs<ExtArgs>>): Prisma__movement_matchesClient<$Result.GetResult<Prisma.$movement_matchesPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Movement_matches.
     * @param {movement_matchesDeleteManyArgs} args - Arguments to filter Movement_matches to delete.
     * @example
     * // Delete a few Movement_matches
     * const { count } = await prisma.movement_matches.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends movement_matchesDeleteManyArgs>(args?: SelectSubset<T, movement_matchesDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Movement_matches.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {movement_matchesUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Movement_matches
     * const movement_matches = await prisma.movement_matches.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends movement_matchesUpdateManyArgs>(args: SelectSubset<T, movement_matchesUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Movement_matches and returns the data updated in the database.
     * @param {movement_matchesUpdateManyAndReturnArgs} args - Arguments to update many Movement_matches.
     * @example
     * // Update many Movement_matches
     * const movement_matches = await prisma.movement_matches.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Movement_matches and only return the `movement_id`
     * const movement_matchesWithMovement_idOnly = await prisma.movement_matches.updateManyAndReturn({
     *   select: { movement_id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends movement_matchesUpdateManyAndReturnArgs>(args: SelectSubset<T, movement_matchesUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$movement_matchesPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Movement_matches.
     * @param {movement_matchesUpsertArgs} args - Arguments to update or create a Movement_matches.
     * @example
     * // Update or create a Movement_matches
     * const movement_matches = await prisma.movement_matches.upsert({
     *   create: {
     *     // ... data to create a Movement_matches
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Movement_matches we want to update
     *   }
     * })
     */
    upsert<T extends movement_matchesUpsertArgs>(args: SelectSubset<T, movement_matchesUpsertArgs<ExtArgs>>): Prisma__movement_matchesClient<$Result.GetResult<Prisma.$movement_matchesPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Movement_matches.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {movement_matchesCountArgs} args - Arguments to filter Movement_matches to count.
     * @example
     * // Count the number of Movement_matches
     * const count = await prisma.movement_matches.count({
     *   where: {
     *     // ... the filter for the Movement_matches we want to count
     *   }
     * })
    **/
    count<T extends movement_matchesCountArgs>(
      args?: Subset<T, movement_matchesCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], Movement_matchesCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Movement_matches.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Movement_matchesAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends Movement_matchesAggregateArgs>(args: Subset<T, Movement_matchesAggregateArgs>): Prisma.PrismaPromise<GetMovement_matchesAggregateType<T>>

    /**
     * Group by Movement_matches.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {movement_matchesGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends movement_matchesGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: movement_matchesGroupByArgs['orderBy'] }
        : { orderBy?: movement_matchesGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, movement_matchesGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetMovement_matchesGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the movement_matches model
   */
  readonly fields: movement_matchesFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for movement_matches.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__movement_matchesClient<T, Null = never, ExtArgs extends $Extensions.InternacionalalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    bank_movements<T extends bank_movementsDefaultArgs<ExtArgs> = {}>(args?: Subset<T, bank_movementsDefaultArgs<ExtArgs>>): Prisma__bank_movementsClient<$Result.GetResult<Prisma.$bank_movementsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    obligations<T extends obligationsDefaultArgs<ExtArgs> = {}>(args?: Subset<T, obligationsDefaultArgs<ExtArgs>>): Prisma__obligationsClient<$Result.GetResult<Prisma.$obligationsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the movement_matches model
   */
  interface movement_matchesFieldRefs {
    readonly movement_id: FieldRef<"movement_matches", 'BigInt'>
    readonly obligation_id: FieldRef<"movement_matches", 'BigInt'>
    readonly matched_amount: FieldRef<"movement_matches", 'Decimal'>
  }
    

  // Custom InputTypes
  /**
   * movement_matches findUnique
   */
  export type movement_matchesFindUniqueArgs<ExtArgs extends $Extensions.InternacionalalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the movement_matches
     */
    select?: movement_matchesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the movement_matches
     */
    omit?: movement_matchesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: movement_matchesInclude<ExtArgs> | null
    /**
     * Filter, which movement_matches to fetch.
     */
    where: movement_matchesWhereUniqueInput
  }

  /**
   * movement_matches findUniqueOrThrow
   */
  export type movement_matchesFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternacionalalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the movement_matches
     */
    select?: movement_matchesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the movement_matches
     */
    omit?: movement_matchesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: movement_matchesInclude<ExtArgs> | null
    /**
     * Filter, which movement_matches to fetch.
     */
    where: movement_matchesWhereUniqueInput
  }

  /**
   * movement_matches findFirst
   */
  export type movement_matchesFindFirstArgs<ExtArgs extends $Extensions.InternacionalalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the movement_matches
     */
    select?: movement_matchesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the movement_matches
     */
    omit?: movement_matchesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: movement_matchesInclude<ExtArgs> | null
    /**
     * Filter, which movement_matches to fetch.
     */
    where?: movement_matchesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of movement_matches to fetch.
     */
    orderBy?: movement_matchesOrderByWithRelationInput | movement_matchesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for movement_matches.
     */
    cursor?: movement_matchesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` movement_matches from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` movement_matches.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of movement_matches.
     */
    distinct?: Movement_matchesScalarFieldEnum | Movement_matchesScalarFieldEnum[]
  }

  /**
   * movement_matches findFirstOrThrow
   */
  export type movement_matchesFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternacionalalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the movement_matches
     */
    select?: movement_matchesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the movement_matches
     */
    omit?: movement_matchesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: movement_matchesInclude<ExtArgs> | null
    /**
     * Filter, which movement_matches to fetch.
     */
    where?: movement_matchesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of movement_matches to fetch.
     */
    orderBy?: movement_matchesOrderByWithRelationInput | movement_matchesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for movement_matches.
     */
    cursor?: movement_matchesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` movement_matches from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` movement_matches.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of movement_matches.
     */
    distinct?: Movement_matchesScalarFieldEnum | Movement_matchesScalarFieldEnum[]
  }

  /**
   * movement_matches findMany
   */
  export type movement_matchesFindManyArgs<ExtArgs extends $Extensions.InternacionalalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the movement_matches
     */
    select?: movement_matchesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the movement_matches
     */
    omit?: movement_matchesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: movement_matchesInclude<ExtArgs> | null
    /**
     * Filter, which movement_matches to fetch.
     */
    where?: movement_matchesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of movement_matches to fetch.
     */
    orderBy?: movement_matchesOrderByWithRelationInput | movement_matchesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing movement_matches.
     */
    cursor?: movement_matchesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` movement_matches from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` movement_matches.
     */
    skip?: number
    distinct?: Movement_matchesScalarFieldEnum | Movement_matchesScalarFieldEnum[]
  }

  /**
   * movement_matches create
   */
  export type movement_matchesCreateArgs<ExtArgs extends $Extensions.InternacionalalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the movement_matches
     */
    select?: movement_matchesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the movement_matches
     */
    omit?: movement_matchesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: movement_matchesInclude<ExtArgs> | null
    /**
     * The data needed to create a movement_matches.
     */
    data: XOR<movement_matchesCreateInput, movement_matchesUncheckedCreateInput>
  }

  /**
   * movement_matches createMany
   */
  export type movement_matchesCreateManyArgs<ExtArgs extends $Extensions.InternacionalalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many movement_matches.
     */
    data: movement_matchesCreateManyInput | movement_matchesCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * movement_matches createManyAndReturn
   */
  export type movement_matchesCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternacionalalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the movement_matches
     */
    select?: movement_matchesSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the movement_matches
     */
    omit?: movement_matchesOmit<ExtArgs> | null
    /**
     * The data used to create many movement_matches.
     */
    data: movement_matchesCreateManyInput | movement_matchesCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: movement_matchesIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * movement_matches update
   */
  export type movement_matchesUpdateArgs<ExtArgs extends $Extensions.InternacionalalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the movement_matches
     */
    select?: movement_matchesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the movement_matches
     */
    omit?: movement_matchesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: movement_matchesInclude<ExtArgs> | null
    /**
     * The data needed to update a movement_matches.
     */
    data: XOR<movement_matchesUpdateInput, movement_matchesUncheckedUpdateInput>
    /**
     * Choose, which movement_matches to update.
     */
    where: movement_matchesWhereUniqueInput
  }

  /**
   * movement_matches updateMany
   */
  export type movement_matchesUpdateManyArgs<ExtArgs extends $Extensions.InternacionalalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update movement_matches.
     */
    data: XOR<movement_matchesUpdateManyMutationInput, movement_matchesUncheckedUpdateManyInput>
    /**
     * Filter which movement_matches to update
     */
    where?: movement_matchesWhereInput
    /**
     * Limit how many movement_matches to update.
     */
    limit?: number
  }

  /**
   * movement_matches updateManyAndReturn
   */
  export type movement_matchesUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternacionalalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the movement_matches
     */
    select?: movement_matchesSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the movement_matches
     */
    omit?: movement_matchesOmit<ExtArgs> | null
    /**
     * The data used to update movement_matches.
     */
    data: XOR<movement_matchesUpdateManyMutationInput, movement_matchesUncheckedUpdateManyInput>
    /**
     * Filter which movement_matches to update
     */
    where?: movement_matchesWhereInput
    /**
     * Limit how many movement_matches to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: movement_matchesIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * movement_matches upsert
   */
  export type movement_matchesUpsertArgs<ExtArgs extends $Extensions.InternacionalalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the movement_matches
     */
    select?: movement_matchesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the movement_matches
     */
    omit?: movement_matchesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: movement_matchesInclude<ExtArgs> | null
    /**
     * The filter to search for the movement_matches to update in case it exists.
     */
    where: movement_matchesWhereUniqueInput
    /**
     * In case the movement_matches found by the `where` argument doesn't exist, create a new movement_matches with this data.
     */
    create: XOR<movement_matchesCreateInput, movement_matchesUncheckedCreateInput>
    /**
     * In case the movement_matches was found with the provided `where` argument, update it with this data.
     */
    update: XOR<movement_matchesUpdateInput, movement_matchesUncheckedUpdateInput>
  }

  /**
   * movement_matches delete
   */
  export type movement_matchesDeleteArgs<ExtArgs extends $Extensions.InternacionalalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the movement_matches
     */
    select?: movement_matchesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the movement_matches
     */
    omit?: movement_matchesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: movement_matchesInclude<ExtArgs> | null
    /**
     * Filter which movement_matches to delete.
     */
    where: movement_matchesWhereUniqueInput
  }

  /**
   * movement_matches deleteMany
   */
  export type movement_matchesDeleteManyArgs<ExtArgs extends $Extensions.InternacionalalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which movement_matches to delete
     */
    where?: movement_matchesWhereInput
    /**
     * Limit how many movement_matches to delete.
     */
    limit?: number
  }

  /**
   * movement_matches without action
   */
  export type movement_matchesDefaultArgs<ExtArgs extends $Extensions.InternacionalalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the movement_matches
     */
    select?: movement_matchesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the movement_matches
     */
    omit?: movement_matchesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: movement_matchesInclude<ExtArgs> | null
  }


  /**
   * Model obligation_documents
   */

  export type AggregateObligation_documents = {
    _count: Obligation_documentsCountAggregateOutputType | null
    _avg: Obligation_documentsAvgAggregateOutputType | null
    _sum: Obligation_documentsSumAggregateOutputType | null
    _min: Obligation_documentsMinAggregateOutputType | null
    _max: Obligation_documentsMaxAggregateOutputType | null
  }

  export type Obligation_documentsAvgAggregateOutputType = {
    id: number | null
    obligation_id: number | null
    uploaded_by: number | null
  }

  export type Obligation_documentsSumAggregateOutputType = {
    id: number | null
    obligation_id: bigint | null
    uploaded_by: bigint | null
  }

  export type Obligation_documentsMinAggregateOutputType = {
    id: number | null
    obligation_id: bigint | null
    file_name: string | null
    file_path: string | null
    uploaded_by: bigint | null
    uploaded_at: Date | null
  }

  export type Obligation_documentsMaxAggregateOutputType = {
    id: number | null
    obligation_id: bigint | null
    file_name: string | null
    file_path: string | null
    uploaded_by: bigint | null
    uploaded_at: Date | null
  }

  export type Obligation_documentsCountAggregateOutputType = {
    id: number
    obligation_id: number
    file_name: number
    file_path: number
    uploaded_by: number
    uploaded_at: number
    _all: number
  }


  export type Obligation_documentsAvgAggregateInputType = {
    id?: true
    obligation_id?: true
    uploaded_by?: true
  }

  export type Obligation_documentsSumAggregateInputType = {
    id?: true
    obligation_id?: true
    uploaded_by?: true
  }

  export type Obligation_documentsMinAggregateInputType = {
    id?: true
    obligation_id?: true
    file_name?: true
    file_path?: true
    uploaded_by?: true
    uploaded_at?: true
  }

  export type Obligation_documentsMaxAggregateInputType = {
    id?: true
    obligation_id?: true
    file_name?: true
    file_path?: true
    uploaded_by?: true
    uploaded_at?: true
  }

  export type Obligation_documentsCountAggregateInputType = {
    id?: true
    obligation_id?: true
    file_name?: true
    file_path?: true
    uploaded_by?: true
    uploaded_at?: true
    _all?: true
  }

  export type Obligation_documentsAggregateArgs<ExtArgs extends $Extensions.InternacionalalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which obligation_documents to aggregate.
     */
    where?: obligation_documentsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of obligation_documents to fetch.
     */
    orderBy?: obligation_documentsOrderByWithRelationInput | obligation_documentsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: obligation_documentsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` obligation_documents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` obligation_documents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned obligation_documents
    **/
    _count?: true | Obligation_documentsCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: Obligation_documentsAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: Obligation_documentsSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: Obligation_documentsMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: Obligation_documentsMaxAggregateInputType
  }

  export type GetObligation_documentsAggregateType<T extends Obligation_documentsAggregateArgs> = {
        [P in keyof T & keyof AggregateObligation_documents]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateObligation_documents[P]>
      : GetScalarType<T[P], AggregateObligation_documents[P]>
  }




  export type obligation_documentsGroupByArgs<ExtArgs extends $Extensions.InternacionalalArgs = $Extensions.DefaultArgs> = {
    where?: obligation_documentsWhereInput
    orderBy?: obligation_documentsOrderByWithAggregationInput | obligation_documentsOrderByWithAggregationInput[]
    by: Obligation_documentsScalarFieldEnum[] | Obligation_documentsScalarFieldEnum
    having?: obligation_documentsScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: Obligation_documentsCountAggregateInputType | true
    _avg?: Obligation_documentsAvgAggregateInputType
    _sum?: Obligation_documentsSumAggregateInputType
    _min?: Obligation_documentsMinAggregateInputType
    _max?: Obligation_documentsMaxAggregateInputType
  }

  export type Obligation_documentsGroupByOutputType = {
    id: number
    obligation_id: bigint
    file_name: string
    file_path: string
    uploaded_by: bigint | null
    uploaded_at: Date
    _count: Obligation_documentsCountAggregateOutputType | null
    _avg: Obligation_documentsAvgAggregateOutputType | null
    _sum: Obligation_documentsSumAggregateOutputType | null
    _min: Obligation_documentsMinAggregateOutputType | null
    _max: Obligation_documentsMaxAggregateOutputType | null
  }

  type GetObligation_documentsGroupByPayload<T extends obligation_documentsGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<Obligation_documentsGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof Obligation_documentsGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], Obligation_documentsGroupByOutputType[P]>
            : GetScalarType<T[P], Obligation_documentsGroupByOutputType[P]>
        }
      >
    >


  export type obligation_documentsSelect<ExtArgs extends $Extensions.InternacionalalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    obligation_id?: boolean
    file_name?: boolean
    file_path?: boolean
    uploaded_by?: boolean
    uploaded_at?: boolean
    obligations?: boolean | obligationsDefaultArgs<ExtArgs>
    users?: boolean | obligation_documents$usersArgs<ExtArgs>
  }, ExtArgs["result"]["obligation_documents"]>

  export type obligation_documentsSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternacionalalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    obligation_id?: boolean
    file_name?: boolean
    file_path?: boolean
    uploaded_by?: boolean
    uploaded_at?: boolean
    obligations?: boolean | obligationsDefaultArgs<ExtArgs>
    users?: boolean | obligation_documents$usersArgs<ExtArgs>
  }, ExtArgs["result"]["obligation_documents"]>

  export type obligation_documentsSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternacionalalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    obligation_id?: boolean
    file_name?: boolean
    file_path?: boolean
    uploaded_by?: boolean
    uploaded_at?: boolean
    obligations?: boolean | obligationsDefaultArgs<ExtArgs>
    users?: boolean | obligation_documents$usersArgs<ExtArgs>
  }, ExtArgs["result"]["obligation_documents"]>

  export type obligation_documentsSelectScalar = {
    id?: boolean
    obligation_id?: boolean
    file_name?: boolean
    file_path?: boolean
    uploaded_by?: boolean
    uploaded_at?: boolean
  }

  export type obligation_documentsOmit<ExtArgs extends $Extensions.InternacionalalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "obligation_id" | "file_name" | "file_path" | "uploaded_by" | "uploaded_at", ExtArgs["result"]["obligation_documents"]>
  export type obligation_documentsInclude<ExtArgs extends $Extensions.InternacionalalArgs = $Extensions.DefaultArgs> = {
    obligations?: boolean | obligationsDefaultArgs<ExtArgs>
    users?: boolean | obligation_documents$usersArgs<ExtArgs>
  }
  export type obligation_documentsIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternacionalalArgs = $Extensions.DefaultArgs> = {
    obligations?: boolean | obligationsDefaultArgs<ExtArgs>
    users?: boolean | obligation_documents$usersArgs<ExtArgs>
  }
  export type obligation_documentsIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternacionalalArgs = $Extensions.DefaultArgs> = {
    obligations?: boolean | obligationsDefaultArgs<ExtArgs>
    users?: boolean | obligation_documents$usersArgs<ExtArgs>
  }

  export type $obligation_documentsPayload<ExtArgs extends $Extensions.InternacionalalArgs = $Extensions.DefaultArgs> = {
    name: "obligation_documents"
    objects: {
      obligations: Prisma.$obligationsPayload<ExtArgs>
      users: Prisma.$usersPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      obligation_id: bigint
      file_name: string
      file_path: string
      uploaded_by: bigint | null
      uploaded_at: Date
    }, ExtArgs["result"]["obligation_documents"]>
    composites: {}
  }

  type obligation_documentsGetPayload<S extends boolean | null | undefined | obligation_documentsDefaultArgs> = $Result.GetResult<Prisma.$obligation_documentsPayload, S>

  type obligation_documentsCountArgs<ExtArgs extends $Extensions.InternacionalalArgs = $Extensions.DefaultArgs> =
    Omit<obligation_documentsFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: Obligation_documentsCountAggregateInputType | true
    }

  export interface obligation_documentsDelegate<ExtArgs extends $Extensions.InternacionalalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['obligation_documents'], meta: { name: 'obligation_documents' } }
    /**
     * Find zero or one Obligation_documents that matches the filter.
     * @param {obligation_documentsFindUniqueArgs} args - Arguments to find a Obligation_documents
     * @example
     * // Get one Obligation_documents
     * const obligation_documents = await prisma.obligation_documents.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends obligation_documentsFindUniqueArgs>(args: SelectSubset<T, obligation_documentsFindUniqueArgs<ExtArgs>>): Prisma__obligation_documentsClient<$Result.GetResult<Prisma.$obligation_documentsPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Obligation_documents that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {obligation_documentsFindUniqueOrThrowArgs} args - Arguments to find a Obligation_documents
     * @example
     * // Get one Obligation_documents
     * const obligation_documents = await prisma.obligation_documents.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends obligation_documentsFindUniqueOrThrowArgs>(args: SelectSubset<T, obligation_documentsFindUniqueOrThrowArgs<ExtArgs>>): Prisma__obligation_documentsClient<$Result.GetResult<Prisma.$obligation_documentsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Obligation_documents that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {obligation_documentsFindFirstArgs} args - Arguments to find a Obligation_documents
     * @example
     * // Get one Obligation_documents
     * const obligation_documents = await prisma.obligation_documents.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends obligation_documentsFindFirstArgs>(args?: SelectSubset<T, obligation_documentsFindFirstArgs<ExtArgs>>): Prisma__obligation_documentsClient<$Result.GetResult<Prisma.$obligation_documentsPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Obligation_documents that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {obligation_documentsFindFirstOrThrowArgs} args - Arguments to find a Obligation_documents
     * @example
     * // Get one Obligation_documents
     * const obligation_documents = await prisma.obligation_documents.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends obligation_documentsFindFirstOrThrowArgs>(args?: SelectSubset<T, obligation_documentsFindFirstOrThrowArgs<ExtArgs>>): Prisma__obligation_documentsClient<$Result.GetResult<Prisma.$obligation_documentsPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Obligation_documents that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {obligation_documentsFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Obligation_documents
     * const obligation_documents = await prisma.obligation_documents.findMany()
     * 
     * // Get first 10 Obligation_documents
     * const obligation_documents = await prisma.obligation_documents.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const obligation_documentsWithIdOnly = await prisma.obligation_documents.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends obligation_documentsFindManyArgs>(args?: SelectSubset<T, obligation_documentsFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$obligation_documentsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Obligation_documents.
     * @param {obligation_documentsCreateArgs} args - Arguments to create a Obligation_documents.
     * @example
     * // Create one Obligation_documents
     * const Obligation_documents = await prisma.obligation_documents.create({
     *   data: {
     *     // ... data to create a Obligation_documents
     *   }
     * })
     * 
     */
    create<T extends obligation_documentsCreateArgs>(args: SelectSubset<T, obligation_documentsCreateArgs<ExtArgs>>): Prisma__obligation_documentsClient<$Result.GetResult<Prisma.$obligation_documentsPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Obligation_documents.
     * @param {obligation_documentsCreateManyArgs} args - Arguments to create many Obligation_documents.
     * @example
     * // Create many Obligation_documents
     * const obligation_documents = await prisma.obligation_documents.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends obligation_documentsCreateManyArgs>(args?: SelectSubset<T, obligation_documentsCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Obligation_documents and returns the data saved in the database.
     * @param {obligation_documentsCreateManyAndReturnArgs} args - Arguments to create many Obligation_documents.
     * @example
     * // Create many Obligation_documents
     * const obligation_documents = await prisma.obligation_documents.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Obligation_documents and only return the `id`
     * const obligation_documentsWithIdOnly = await prisma.obligation_documents.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends obligation_documentsCreateManyAndReturnArgs>(args?: SelectSubset<T, obligation_documentsCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$obligation_documentsPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Obligation_documents.
     * @param {obligation_documentsDeleteArgs} args - Arguments to delete one Obligation_documents.
     * @example
     * // Delete one Obligation_documents
     * const Obligation_documents = await prisma.obligation_documents.delete({
     *   where: {
     *     // ... filter to delete one Obligation_documents
     *   }
     * })
     * 
     */
    delete<T extends obligation_documentsDeleteArgs>(args: SelectSubset<T, obligation_documentsDeleteArgs<ExtArgs>>): Prisma__obligation_documentsClient<$Result.GetResult<Prisma.$obligation_documentsPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Obligation_documents.
     * @param {obligation_documentsUpdateArgs} args - Arguments to update one Obligation_documents.
     * @example
     * // Update one Obligation_documents
     * const obligation_documents = await prisma.obligation_documents.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends obligation_documentsUpdateArgs>(args: SelectSubset<T, obligation_documentsUpdateArgs<ExtArgs>>): Prisma__obligation_documentsClient<$Result.GetResult<Prisma.$obligation_documentsPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Obligation_documents.
     * @param {obligation_documentsDeleteManyArgs} args - Arguments to filter Obligation_documents to delete.
     * @example
     * // Delete a few Obligation_documents
     * const { count } = await prisma.obligation_documents.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends obligation_documentsDeleteManyArgs>(args?: SelectSubset<T, obligation_documentsDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Obligation_documents.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {obligation_documentsUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Obligation_documents
     * const obligation_documents = await prisma.obligation_documents.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends obligation_documentsUpdateManyArgs>(args: SelectSubset<T, obligation_documentsUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Obligation_documents and returns the data updated in the database.
     * @param {obligation_documentsUpdateManyAndReturnArgs} args - Arguments to update many Obligation_documents.
     * @example
     * // Update many Obligation_documents
     * const obligation_documents = await prisma.obligation_documents.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Obligation_documents and only return the `id`
     * const obligation_documentsWithIdOnly = await prisma.obligation_documents.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends obligation_documentsUpdateManyAndReturnArgs>(args: SelectSubset<T, obligation_documentsUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$obligation_documentsPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Obligation_documents.
     * @param {obligation_documentsUpsertArgs} args - Arguments to update or create a Obligation_documents.
     * @example
     * // Update or create a Obligation_documents
     * const obligation_documents = await prisma.obligation_documents.upsert({
     *   create: {
     *     // ... data to create a Obligation_documents
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Obligation_documents we want to update
     *   }
     * })
     */
    upsert<T extends obligation_documentsUpsertArgs>(args: SelectSubset<T, obligation_documentsUpsertArgs<ExtArgs>>): Prisma__obligation_documentsClient<$Result.GetResult<Prisma.$obligation_documentsPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Obligation_documents.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {obligation_documentsCountArgs} args - Arguments to filter Obligation_documents to count.
     * @example
     * // Count the number of Obligation_documents
     * const count = await prisma.obligation_documents.count({
     *   where: {
     *     // ... the filter for the Obligation_documents we want to count
     *   }
     * })
    **/
    count<T extends obligation_documentsCountArgs>(
      args?: Subset<T, obligation_documentsCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], Obligation_documentsCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Obligation_documents.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Obligation_documentsAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends Obligation_documentsAggregateArgs>(args: Subset<T, Obligation_documentsAggregateArgs>): Prisma.PrismaPromise<GetObligation_documentsAggregateType<T>>

    /**
     * Group by Obligation_documents.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {obligation_documentsGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends obligation_documentsGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: obligation_documentsGroupByArgs['orderBy'] }
        : { orderBy?: obligation_documentsGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, obligation_documentsGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetObligation_documentsGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the obligation_documents model
   */
  readonly fields: obligation_documentsFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for obligation_documents.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__obligation_documentsClient<T, Null = never, ExtArgs extends $Extensions.InternacionalalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    obligations<T extends obligationsDefaultArgs<ExtArgs> = {}>(args?: Subset<T, obligationsDefaultArgs<ExtArgs>>): Prisma__obligationsClient<$Result.GetResult<Prisma.$obligationsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    users<T extends obligation_documents$usersArgs<ExtArgs> = {}>(args?: Subset<T, obligation_documents$usersArgs<ExtArgs>>): Prisma__usersClient<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the obligation_documents model
   */
  interface obligation_documentsFieldRefs {
    readonly id: FieldRef<"obligation_documents", 'Int'>
    readonly obligation_id: FieldRef<"obligation_documents", 'BigInt'>
    readonly file_name: FieldRef<"obligation_documents", 'String'>
    readonly file_path: FieldRef<"obligation_documents", 'String'>
    readonly uploaded_by: FieldRef<"obligation_documents", 'BigInt'>
    readonly uploaded_at: FieldRef<"obligation_documents", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * obligation_documents findUnique
   */
  export type obligation_documentsFindUniqueArgs<ExtArgs extends $Extensions.InternacionalalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the obligation_documents
     */
    select?: obligation_documentsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the obligation_documents
     */
    omit?: obligation_documentsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: obligation_documentsInclude<ExtArgs> | null
    /**
     * Filter, which obligation_documents to fetch.
     */
    where: obligation_documentsWhereUniqueInput
  }

  /**
   * obligation_documents findUniqueOrThrow
   */
  export type obligation_documentsFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternacionalalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the obligation_documents
     */
    select?: obligation_documentsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the obligation_documents
     */
    omit?: obligation_documentsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: obligation_documentsInclude<ExtArgs> | null
    /**
     * Filter, which obligation_documents to fetch.
     */
    where: obligation_documentsWhereUniqueInput
  }

  /**
   * obligation_documents findFirst
   */
  export type obligation_documentsFindFirstArgs<ExtArgs extends $Extensions.InternacionalalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the obligation_documents
     */
    select?: obligation_documentsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the obligation_documents
     */
    omit?: obligation_documentsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: obligation_documentsInclude<ExtArgs> | null
    /**
     * Filter, which obligation_documents to fetch.
     */
    where?: obligation_documentsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of obligation_documents to fetch.
     */
    orderBy?: obligation_documentsOrderByWithRelationInput | obligation_documentsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for obligation_documents.
     */
    cursor?: obligation_documentsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` obligation_documents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` obligation_documents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of obligation_documents.
     */
    distinct?: Obligation_documentsScalarFieldEnum | Obligation_documentsScalarFieldEnum[]
  }

  /**
   * obligation_documents findFirstOrThrow
   */
  export type obligation_documentsFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternacionalalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the obligation_documents
     */
    select?: obligation_documentsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the obligation_documents
     */
    omit?: obligation_documentsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: obligation_documentsInclude<ExtArgs> | null
    /**
     * Filter, which obligation_documents to fetch.
     */
    where?: obligation_documentsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of obligation_documents to fetch.
     */
    orderBy?: obligation_documentsOrderByWithRelationInput | obligation_documentsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for obligation_documents.
     */
    cursor?: obligation_documentsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` obligation_documents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` obligation_documents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of obligation_documents.
     */
    distinct?: Obligation_documentsScalarFieldEnum | Obligation_documentsScalarFieldEnum[]
  }

  /**
   * obligation_documents findMany
   */
  export type obligation_documentsFindManyArgs<ExtArgs extends $Extensions.InternacionalalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the obligation_documents
     */
    select?: obligation_documentsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the obligation_documents
     */
    omit?: obligation_documentsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: obligation_documentsInclude<ExtArgs> | null
    /**
     * Filter, which obligation_documents to fetch.
     */
    where?: obligation_documentsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of obligation_documents to fetch.
     */
    orderBy?: obligation_documentsOrderByWithRelationInput | obligation_documentsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing obligation_documents.
     */
    cursor?: obligation_documentsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` obligation_documents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` obligation_documents.
     */
    skip?: number
    distinct?: Obligation_documentsScalarFieldEnum | Obligation_documentsScalarFieldEnum[]
  }

  /**
   * obligation_documents create
   */
  export type obligation_documentsCreateArgs<ExtArgs extends $Extensions.InternacionalalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the obligation_documents
     */
    select?: obligation_documentsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the obligation_documents
     */
    omit?: obligation_documentsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: obligation_documentsInclude<ExtArgs> | null
    /**
     * The data needed to create a obligation_documents.
     */
    data: XOR<obligation_documentsCreateInput, obligation_documentsUncheckedCreateInput>
  }

  /**
   * obligation_documents createMany
   */
  export type obligation_documentsCreateManyArgs<ExtArgs extends $Extensions.InternacionalalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many obligation_documents.
     */
    data: obligation_documentsCreateManyInput | obligation_documentsCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * obligation_documents createManyAndReturn
   */
  export type obligation_documentsCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternacionalalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the obligation_documents
     */
    select?: obligation_documentsSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the obligation_documents
     */
    omit?: obligation_documentsOmit<ExtArgs> | null
    /**
     * The data used to create many obligation_documents.
     */
    data: obligation_documentsCreateManyInput | obligation_documentsCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: obligation_documentsIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * obligation_documents update
   */
  export type obligation_documentsUpdateArgs<ExtArgs extends $Extensions.InternacionalalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the obligation_documents
     */
    select?: obligation_documentsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the obligation_documents
     */
    omit?: obligation_documentsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: obligation_documentsInclude<ExtArgs> | null
    /**
     * The data needed to update a obligation_documents.
     */
    data: XOR<obligation_documentsUpdateInput, obligation_documentsUncheckedUpdateInput>
    /**
     * Choose, which obligation_documents to update.
     */
    where: obligation_documentsWhereUniqueInput
  }

  /**
   * obligation_documents updateMany
   */
  export type obligation_documentsUpdateManyArgs<ExtArgs extends $Extensions.InternacionalalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update obligation_documents.
     */
    data: XOR<obligation_documentsUpdateManyMutationInput, obligation_documentsUncheckedUpdateManyInput>
    /**
     * Filter which obligation_documents to update
     */
    where?: obligation_documentsWhereInput
    /**
     * Limit how many obligation_documents to update.
     */
    limit?: number
  }

  /**
   * obligation_documents updateManyAndReturn
   */
  export type obligation_documentsUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternacionalalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the obligation_documents
     */
    select?: obligation_documentsSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the obligation_documents
     */
    omit?: obligation_documentsOmit<ExtArgs> | null
    /**
     * The data used to update obligation_documents.
     */
    data: XOR<obligation_documentsUpdateManyMutationInput, obligation_documentsUncheckedUpdateManyInput>
    /**
     * Filter which obligation_documents to update
     */
    where?: obligation_documentsWhereInput
    /**
     * Limit how many obligation_documents to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: obligation_documentsIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * obligation_documents upsert
   */
  export type obligation_documentsUpsertArgs<ExtArgs extends $Extensions.InternacionalalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the obligation_documents
     */
    select?: obligation_documentsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the obligation_documents
     */
    omit?: obligation_documentsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: obligation_documentsInclude<ExtArgs> | null
    /**
     * The filter to search for the obligation_documents to update in case it exists.
     */
    where: obligation_documentsWhereUniqueInput
    /**
     * In case the obligation_documents found by the `where` argument doesn't exist, create a new obligation_documents with this data.
     */
    create: XOR<obligation_documentsCreateInput, obligation_documentsUncheckedCreateInput>
    /**
     * In case the obligation_documents was found with the provided `where` argument, update it with this data.
     */
    update: XOR<obligation_documentsUpdateInput, obligation_documentsUncheckedUpdateInput>
  }

  /**
   * obligation_documents delete
   */
  export type obligation_documentsDeleteArgs<ExtArgs extends $Extensions.InternacionalalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the obligation_documents
     */
    select?: obligation_documentsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the obligation_documents
     */
    omit?: obligation_documentsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: obligation_documentsInclude<ExtArgs> | null
    /**
     * Filter which obligation_documents to delete.
     */
    where: obligation_documentsWhereUniqueInput
  }

  /**
   * obligation_documents deleteMany
   */
  export type obligation_documentsDeleteManyArgs<ExtArgs extends $Extensions.InternacionalalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which obligation_documents to delete
     */
    where?: obligation_documentsWhereInput
    /**
     * Limit how many obligation_documents to delete.
     */
    limit?: number
  }

  /**
   * obligation_documents.users
   */
  export type obligation_documents$usersArgs<ExtArgs extends $Extensions.InternacionalalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the users
     */
    omit?: usersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: usersInclude<ExtArgs> | null
    where?: usersWhereInput
  }

  /**
   * obligation_documents without action
   */
  export type obligation_documentsDefaultArgs<ExtArgs extends $Extensions.InternacionalalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the obligation_documents
     */
    select?: obligation_documentsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the obligation_documents
     */
    omit?: obligation_documentsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: obligation_documentsInclude<ExtArgs> | null
  }


  /**
   * Model obligation_types
   */

  export type AggregateObligation_types = {
    _count: Obligation_typesCountAggregateOutputType | null
    _avg: Obligation_typesAvgAggregateOutputType | null
    _sum: Obligation_typesSumAggregateOutputType | null
    _min: Obligation_typesMinAggregateOutputType | null
    _max: Obligation_typesMaxAggregateOutputType | null
  }

  export type Obligation_typesAvgAggregateOutputType = {
    id: number | null
  }

  export type Obligation_typesSumAggregateOutputType = {
    id: number | null
  }

  export type Obligation_typesMinAggregateOutputType = {
    id: number | null
    name: string | null
    description: string | null
  }

  export type Obligation_typesMaxAggregateOutputType = {
    id: number | null
    name: string | null
    description: string | null
  }

  export type Obligation_typesCountAggregateOutputType = {
    id: number
    name: number
    description: number
    _all: number
  }


  export type Obligation_typesAvgAggregateInputType = {
    id?: true
  }

  export type Obligation_typesSumAggregateInputType = {
    id?: true
  }

  export type Obligation_typesMinAggregateInputType = {
    id?: true
    name?: true
    description?: true
  }

  export type Obligation_typesMaxAggregateInputType = {
    id?: true
    name?: true
    description?: true
  }

  export type Obligation_typesCountAggregateInputType = {
    id?: true
    name?: true
    description?: true
    _all?: true
  }

  export type Obligation_typesAggregateArgs<ExtArgs extends $Extensions.InternacionalalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which obligation_types to aggregate.
     */
    where?: obligation_typesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of obligation_types to fetch.
     */
    orderBy?: obligation_typesOrderByWithRelationInput | obligation_typesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: obligation_typesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` obligation_types from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` obligation_types.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned obligation_types
    **/
    _count?: true | Obligation_typesCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: Obligation_typesAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: Obligation_typesSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: Obligation_typesMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: Obligation_typesMaxAggregateInputType
  }

  export type GetObligation_typesAggregateType<T extends Obligation_typesAggregateArgs> = {
        [P in keyof T & keyof AggregateObligation_types]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateObligation_types[P]>
      : GetScalarType<T[P], AggregateObligation_types[P]>
  }




  export type obligation_typesGroupByArgs<ExtArgs extends $Extensions.InternacionalalArgs = $Extensions.DefaultArgs> = {
    where?: obligation_typesWhereInput
    orderBy?: obligation_typesOrderByWithAggregationInput | obligation_typesOrderByWithAggregationInput[]
    by: Obligation_typesScalarFieldEnum[] | Obligation_typesScalarFieldEnum
    having?: obligation_typesScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: Obligation_typesCountAggregateInputType | true
    _avg?: Obligation_typesAvgAggregateInputType
    _sum?: Obligation_typesSumAggregateInputType
    _min?: Obligation_typesMinAggregateInputType
    _max?: Obligation_typesMaxAggregateInputType
  }

  export type Obligation_typesGroupByOutputType = {
    id: number
    name: string
    description: string | null
    _count: Obligation_typesCountAggregateOutputType | null
    _avg: Obligation_typesAvgAggregateOutputType | null
    _sum: Obligation_typesSumAggregateOutputType | null
    _min: Obligation_typesMinAggregateOutputType | null
    _max: Obligation_typesMaxAggregateOutputType | null
  }

  type GetObligation_typesGroupByPayload<T extends obligation_typesGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<Obligation_typesGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof Obligation_typesGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], Obligation_typesGroupByOutputType[P]>
            : GetScalarType<T[P], Obligation_typesGroupByOutputType[P]>
        }
      >
    >


  export type obligation_typesSelect<ExtArgs extends $Extensions.InternacionalalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    description?: boolean
    obligations?: boolean | obligation_types$obligationsArgs<ExtArgs>
    _count?: boolean | Obligation_typesCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["obligation_types"]>

  export type obligation_typesSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternacionalalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    description?: boolean
  }, ExtArgs["result"]["obligation_types"]>

  export type obligation_typesSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternacionalalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    description?: boolean
  }, ExtArgs["result"]["obligation_types"]>

  export type obligation_typesSelectScalar = {
    id?: boolean
    name?: boolean
    description?: boolean
  }

  export type obligation_typesOmit<ExtArgs extends $Extensions.InternacionalalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "description", ExtArgs["result"]["obligation_types"]>
  export type obligation_typesInclude<ExtArgs extends $Extensions.InternacionalalArgs = $Extensions.DefaultArgs> = {
    obligations?: boolean | obligation_types$obligationsArgs<ExtArgs>
    _count?: boolean | Obligation_typesCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type obligation_typesIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternacionalalArgs = $Extensions.DefaultArgs> = {}
  export type obligation_typesIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternacionalalArgs = $Extensions.DefaultArgs> = {}

  export type $obligation_typesPayload<ExtArgs extends $Extensions.InternacionalalArgs = $Extensions.DefaultArgs> = {
    name: "obligation_types"
    objects: {
      obligations: Prisma.$obligationsPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      name: string
      description: string | null
    }, ExtArgs["result"]["obligation_types"]>
    composites: {}
  }

  type obligation_typesGetPayload<S extends boolean | null | undefined | obligation_typesDefaultArgs> = $Result.GetResult<Prisma.$obligation_typesPayload, S>

  type obligation_typesCountArgs<ExtArgs extends $Extensions.InternacionalalArgs = $Extensions.DefaultArgs> =
    Omit<obligation_typesFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: Obligation_typesCountAggregateInputType | true
    }

  export interface obligation_typesDelegate<ExtArgs extends $Extensions.InternacionalalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['obligation_types'], meta: { name: 'obligation_types' } }
    /**
     * Find zero or one Obligation_types that matches the filter.
     * @param {obligation_typesFindUniqueArgs} args - Arguments to find a Obligation_types
     * @example
     * // Get one Obligation_types
     * const obligation_types = await prisma.obligation_types.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends obligation_typesFindUniqueArgs>(args: SelectSubset<T, obligation_typesFindUniqueArgs<ExtArgs>>): Prisma__obligation_typesClient<$Result.GetResult<Prisma.$obligation_typesPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Obligation_types that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {obligation_typesFindUniqueOrThrowArgs} args - Arguments to find a Obligation_types
     * @example
     * // Get one Obligation_types
     * const obligation_types = await prisma.obligation_types.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends obligation_typesFindUniqueOrThrowArgs>(args: SelectSubset<T, obligation_typesFindUniqueOrThrowArgs<ExtArgs>>): Prisma__obligation_typesClient<$Result.GetResult<Prisma.$obligation_typesPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Obligation_types that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {obligation_typesFindFirstArgs} args - Arguments to find a Obligation_types
     * @example
     * // Get one Obligation_types
     * const obligation_types = await prisma.obligation_types.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends obligation_typesFindFirstArgs>(args?: SelectSubset<T, obligation_typesFindFirstArgs<ExtArgs>>): Prisma__obligation_typesClient<$Result.GetResult<Prisma.$obligation_typesPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Obligation_types that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {obligation_typesFindFirstOrThrowArgs} args - Arguments to find a Obligation_types
     * @example
     * // Get one Obligation_types
     * const obligation_types = await prisma.obligation_types.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends obligation_typesFindFirstOrThrowArgs>(args?: SelectSubset<T, obligation_typesFindFirstOrThrowArgs<ExtArgs>>): Prisma__obligation_typesClient<$Result.GetResult<Prisma.$obligation_typesPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Obligation_types that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {obligation_typesFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Obligation_types
     * const obligation_types = await prisma.obligation_types.findMany()
     * 
     * // Get first 10 Obligation_types
     * const obligation_types = await prisma.obligation_types.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const obligation_typesWithIdOnly = await prisma.obligation_types.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends obligation_typesFindManyArgs>(args?: SelectSubset<T, obligation_typesFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$obligation_typesPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Obligation_types.
     * @param {obligation_typesCreateArgs} args - Arguments to create a Obligation_types.
     * @example
     * // Create one Obligation_types
     * const Obligation_types = await prisma.obligation_types.create({
     *   data: {
     *     // ... data to create a Obligation_types
     *   }
     * })
     * 
     */
    create<T extends obligation_typesCreateArgs>(args: SelectSubset<T, obligation_typesCreateArgs<ExtArgs>>): Prisma__obligation_typesClient<$Result.GetResult<Prisma.$obligation_typesPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Obligation_types.
     * @param {obligation_typesCreateManyArgs} args - Arguments to create many Obligation_types.
     * @example
     * // Create many Obligation_types
     * const obligation_types = await prisma.obligation_types.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends obligation_typesCreateManyArgs>(args?: SelectSubset<T, obligation_typesCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Obligation_types and returns the data saved in the database.
     * @param {obligation_typesCreateManyAndReturnArgs} args - Arguments to create many Obligation_types.
     * @example
     * // Create many Obligation_types
     * const obligation_types = await prisma.obligation_types.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Obligation_types and only return the `id`
     * const obligation_typesWithIdOnly = await prisma.obligation_types.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends obligation_typesCreateManyAndReturnArgs>(args?: SelectSubset<T, obligation_typesCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$obligation_typesPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Obligation_types.
     * @param {obligation_typesDeleteArgs} args - Arguments to delete one Obligation_types.
     * @example
     * // Delete one Obligation_types
     * const Obligation_types = await prisma.obligation_types.delete({
     *   where: {
     *     // ... filter to delete one Obligation_types
     *   }
     * })
     * 
     */
    delete<T extends obligation_typesDeleteArgs>(args: SelectSubset<T, obligation_typesDeleteArgs<ExtArgs>>): Prisma__obligation_typesClient<$Result.GetResult<Prisma.$obligation_typesPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Obligation_types.
     * @param {obligation_typesUpdateArgs} args - Arguments to update one Obligation_types.
     * @example
     * // Update one Obligation_types
     * const obligation_types = await prisma.obligation_types.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends obligation_typesUpdateArgs>(args: SelectSubset<T, obligation_typesUpdateArgs<ExtArgs>>): Prisma__obligation_typesClient<$Result.GetResult<Prisma.$obligation_typesPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Obligation_types.
     * @param {obligation_typesDeleteManyArgs} args - Arguments to filter Obligation_types to delete.
     * @example
     * // Delete a few Obligation_types
     * const { count } = await prisma.obligation_types.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends obligation_typesDeleteManyArgs>(args?: SelectSubset<T, obligation_typesDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Obligation_types.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {obligation_typesUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Obligation_types
     * const obligation_types = await prisma.obligation_types.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends obligation_typesUpdateManyArgs>(args: SelectSubset<T, obligation_typesUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Obligation_types and returns the data updated in the database.
     * @param {obligation_typesUpdateManyAndReturnArgs} args - Arguments to update many Obligation_types.
     * @example
     * // Update many Obligation_types
     * const obligation_types = await prisma.obligation_types.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Obligation_types and only return the `id`
     * const obligation_typesWithIdOnly = await prisma.obligation_types.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends obligation_typesUpdateManyAndReturnArgs>(args: SelectSubset<T, obligation_typesUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$obligation_typesPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Obligation_types.
     * @param {obligation_typesUpsertArgs} args - Arguments to update or create a Obligation_types.
     * @example
     * // Update or create a Obligation_types
     * const obligation_types = await prisma.obligation_types.upsert({
     *   create: {
     *     // ... data to create a Obligation_types
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Obligation_types we want to update
     *   }
     * })
     */
    upsert<T extends obligation_typesUpsertArgs>(args: SelectSubset<T, obligation_typesUpsertArgs<ExtArgs>>): Prisma__obligation_typesClient<$Result.GetResult<Prisma.$obligation_typesPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Obligation_types.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {obligation_typesCountArgs} args - Arguments to filter Obligation_types to count.
     * @example
     * // Count the number of Obligation_types
     * const count = await prisma.obligation_types.count({
     *   where: {
     *     // ... the filter for the Obligation_types we want to count
     *   }
     * })
    **/
    count<T extends obligation_typesCountArgs>(
      args?: Subset<T, obligation_typesCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], Obligation_typesCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Obligation_types.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Obligation_typesAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends Obligation_typesAggregateArgs>(args: Subset<T, Obligation_typesAggregateArgs>): Prisma.PrismaPromise<GetObligation_typesAggregateType<T>>

    /**
     * Group by Obligation_types.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {obligation_typesGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends obligation_typesGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: obligation_typesGroupByArgs['orderBy'] }
        : { orderBy?: obligation_typesGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, obligation_typesGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetObligation_typesGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the obligation_types model
   */
  readonly fields: obligation_typesFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for obligation_types.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__obligation_typesClient<T, Null = never, ExtArgs extends $Extensions.InternacionalalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    obligations<T extends obligation_types$obligationsArgs<ExtArgs> = {}>(args?: Subset<T, obligation_types$obligationsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$obligationsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the obligation_types model
   */
  interface obligation_typesFieldRefs {
    readonly id: FieldRef<"obligation_types", 'Int'>
    readonly name: FieldRef<"obligation_types", 'String'>
    readonly description: FieldRef<"obligation_types", 'String'>
  }
    

  // Custom InputTypes
  /**
   * obligation_types findUnique
   */
  export type obligation_typesFindUniqueArgs<ExtArgs extends $Extensions.InternacionalalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the obligation_types
     */
    select?: obligation_typesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the obligation_types
     */
    omit?: obligation_typesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: obligation_typesInclude<ExtArgs> | null
    /**
     * Filter, which obligation_types to fetch.
     */
    where: obligation_typesWhereUniqueInput
  }

  /**
   * obligation_types findUniqueOrThrow
   */
  export type obligation_typesFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternacionalalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the obligation_types
     */
    select?: obligation_typesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the obligation_types
     */
    omit?: obligation_typesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: obligation_typesInclude<ExtArgs> | null
    /**
     * Filter, which obligation_types to fetch.
     */
    where: obligation_typesWhereUniqueInput
  }

  /**
   * obligation_types findFirst
   */
  export type obligation_typesFindFirstArgs<ExtArgs extends $Extensions.InternacionalalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the obligation_types
     */
    select?: obligation_typesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the obligation_types
     */
    omit?: obligation_typesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: obligation_typesInclude<ExtArgs> | null
    /**
     * Filter, which obligation_types to fetch.
     */
    where?: obligation_typesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of obligation_types to fetch.
     */
    orderBy?: obligation_typesOrderByWithRelationInput | obligation_typesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for obligation_types.
     */
    cursor?: obligation_typesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` obligation_types from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` obligation_types.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of obligation_types.
     */
    distinct?: Obligation_typesScalarFieldEnum | Obligation_typesScalarFieldEnum[]
  }

  /**
   * obligation_types findFirstOrThrow
   */
  export type obligation_typesFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternacionalalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the obligation_types
     */
    select?: obligation_typesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the obligation_types
     */
    omit?: obligation_typesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: obligation_typesInclude<ExtArgs> | null
    /**
     * Filter, which obligation_types to fetch.
     */
    where?: obligation_typesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of obligation_types to fetch.
     */
    orderBy?: obligation_typesOrderByWithRelationInput | obligation_typesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for obligation_types.
     */
    cursor?: obligation_typesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` obligation_types from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` obligation_types.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of obligation_types.
     */
    distinct?: Obligation_typesScalarFieldEnum | Obligation_typesScalarFieldEnum[]
  }

  /**
   * obligation_types findMany
   */
  export type obligation_typesFindManyArgs<ExtArgs extends $Extensions.InternacionalalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the obligation_types
     */
    select?: obligation_typesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the obligation_types
     */
    omit?: obligation_typesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: obligation_typesInclude<ExtArgs> | null
    /**
     * Filter, which obligation_types to fetch.
     */
    where?: obligation_typesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of obligation_types to fetch.
     */
    orderBy?: obligation_typesOrderByWithRelationInput | obligation_typesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing obligation_types.
     */
    cursor?: obligation_typesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` obligation_types from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` obligation_types.
     */
    skip?: number
    distinct?: Obligation_typesScalarFieldEnum | Obligation_typesScalarFieldEnum[]
  }

  /**
   * obligation_types create
   */
  export type obligation_typesCreateArgs<ExtArgs extends $Extensions.InternacionalalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the obligation_types
     */
    select?: obligation_typesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the obligation_types
     */
    omit?: obligation_typesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: obligation_typesInclude<ExtArgs> | null
    /**
     * The data needed to create a obligation_types.
     */
    data: XOR<obligation_typesCreateInput, obligation_typesUncheckedCreateInput>
  }

  /**
   * obligation_types createMany
   */
  export type obligation_typesCreateManyArgs<ExtArgs extends $Extensions.InternacionalalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many obligation_types.
     */
    data: obligation_typesCreateManyInput | obligation_typesCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * obligation_types createManyAndReturn
   */
  export type obligation_typesCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternacionalalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the obligation_types
     */
    select?: obligation_typesSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the obligation_types
     */
    omit?: obligation_typesOmit<ExtArgs> | null
    /**
     * The data used to create many obligation_types.
     */
    data: obligation_typesCreateManyInput | obligation_typesCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * obligation_types update
   */
  export type obligation_typesUpdateArgs<ExtArgs extends $Extensions.InternacionalalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the obligation_types
     */
    select?: obligation_typesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the obligation_types
     */
    omit?: obligation_typesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: obligation_typesInclude<ExtArgs> | null
    /**
     * The data needed to update a obligation_types.
     */
    data: XOR<obligation_typesUpdateInput, obligation_typesUncheckedUpdateInput>
    /**
     * Choose, which obligation_types to update.
     */
    where: obligation_typesWhereUniqueInput
  }

  /**
   * obligation_types updateMany
   */
  export type obligation_typesUpdateManyArgs<ExtArgs extends $Extensions.InternacionalalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update obligation_types.
     */
    data: XOR<obligation_typesUpdateManyMutationInput, obligation_typesUncheckedUpdateManyInput>
    /**
     * Filter which obligation_types to update
     */
    where?: obligation_typesWhereInput
    /**
     * Limit how many obligation_types to update.
     */
    limit?: number
  }

  /**
   * obligation_types updateManyAndReturn
   */
  export type obligation_typesUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternacionalalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the obligation_types
     */
    select?: obligation_typesSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the obligation_types
     */
    omit?: obligation_typesOmit<ExtArgs> | null
    /**
     * The data used to update obligation_types.
     */
    data: XOR<obligation_typesUpdateManyMutationInput, obligation_typesUncheckedUpdateManyInput>
    /**
     * Filter which obligation_types to update
     */
    where?: obligation_typesWhereInput
    /**
     * Limit how many obligation_types to update.
     */
    limit?: number
  }

  /**
   * obligation_types upsert
   */
  export type obligation_typesUpsertArgs<ExtArgs extends $Extensions.InternacionalalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the obligation_types
     */
    select?: obligation_typesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the obligation_types
     */
    omit?: obligation_typesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: obligation_typesInclude<ExtArgs> | null
    /**
     * The filter to search for the obligation_types to update in case it exists.
     */
    where: obligation_typesWhereUniqueInput
    /**
     * In case the obligation_types found by the `where` argument doesn't exist, create a new obligation_types with this data.
     */
    create: XOR<obligation_typesCreateInput, obligation_typesUncheckedCreateInput>
    /**
     * In case the obligation_types was found with the provided `where` argument, update it with this data.
     */
    update: XOR<obligation_typesUpdateInput, obligation_typesUncheckedUpdateInput>
  }

  /**
   * obligation_types delete
   */
  export type obligation_typesDeleteArgs<ExtArgs extends $Extensions.InternacionalalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the obligation_types
     */
    select?: obligation_typesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the obligation_types
     */
    omit?: obligation_typesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: obligation_typesInclude<ExtArgs> | null
    /**
     * Filter which obligation_types to delete.
     */
    where: obligation_typesWhereUniqueInput
  }

  /**
   * obligation_types deleteMany
   */
  export type obligation_typesDeleteManyArgs<ExtArgs extends $Extensions.InternacionalalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which obligation_types to delete
     */
    where?: obligation_typesWhereInput
    /**
     * Limit how many obligation_types to delete.
     */
    limit?: number
  }

  /**
   * obligation_types.obligations
   */
  export type obligation_types$obligationsArgs<ExtArgs extends $Extensions.InternacionalalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the obligations
     */
    select?: obligationsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the obligations
     */
    omit?: obligationsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: obligationsInclude<ExtArgs> | null
    where?: obligationsWhereInput
    orderBy?: obligationsOrderByWithRelationInput | obligationsOrderByWithRelationInput[]
    cursor?: obligationsWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ObligationsScalarFieldEnum | ObligationsScalarFieldEnum[]
  }

  /**
   * obligation_types without action
   */
  export type obligation_typesDefaultArgs<ExtArgs extends $Extensions.InternacionalalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the obligation_types
     */
    select?: obligation_typesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the obligation_types
     */
    omit?: obligation_typesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: obligation_typesInclude<ExtArgs> | null
  }


  /**
   * Model obligations
   */

  export type AggregateObligations = {
    _count: ObligationsCountAggregateOutputType | null
    _avg: ObligationsAvgAggregateOutputType | null
    _sum: ObligationsSumAggregateOutputType | null
    _min: ObligationsMinAggregateOutputType | null
    _max: ObligationsMaxAggregateOutputType | null
  }

  export type ObligationsAvgAggregateOutputType = {
    id: number | null
    project_id: number | null
    type_id: number | null
    amount_original: Decimal | null
  }

  export type ObligationsSumAggregateOutputType = {
    id: bigint | null
    project_id: number | null
    type_id: number | null
    amount_original: Decimal | null
  }

  export type ObligationsMinAggregateOutputType = {
    id: bigint | null
    project_id: number | null
    type_id: number | null
    description: string | null
    amount_original: Decimal | null
    currency: string | null
    exchange_rate_date: Date | null
    due_date: Date | null
    status: string | null
    created_at: Date | null
  }

  export type ObligationsMaxAggregateOutputType = {
    id: bigint | null
    project_id: number | null
    type_id: number | null
    description: string | null
    amount_original: Decimal | null
    currency: string | null
    exchange_rate_date: Date | null
    due_date: Date | null
    status: string | null
    created_at: Date | null
  }

  export type ObligationsCountAggregateOutputType = {
    id: number
    project_id: number
    type_id: number
    description: number
    amount_original: number
    currency: number
    exchange_rate_date: number
    due_date: number
    status: number
    created_at: number
    _all: number
  }


  export type ObligationsAvgAggregateInputType = {
    id?: true
    project_id?: true
    type_id?: true
    amount_original?: true
  }

  export type ObligationsSumAggregateInputType = {
    id?: true
    project_id?: true
    type_id?: true
    amount_original?: true
  }

  export type ObligationsMinAggregateInputType = {
    id?: true
    project_id?: true
    type_id?: true
    description?: true
    amount_original?: true
    currency?: true
    exchange_rate_date?: true
    due_date?: true
    status?: true
    created_at?: true
  }

  export type ObligationsMaxAggregateInputType = {
    id?: true
    project_id?: true
    type_id?: true
    description?: true
    amount_original?: true
    currency?: true
    exchange_rate_date?: true
    due_date?: true
    status?: true
    created_at?: true
  }

  export type ObligationsCountAggregateInputType = {
    id?: true
    project_id?: true
    type_id?: true
    description?: true
    amount_original?: true
    currency?: true
    exchange_rate_date?: true
    due_date?: true
    status?: true
    created_at?: true
    _all?: true
  }

  export type ObligationsAggregateArgs<ExtArgs extends $Extensions.InternacionalalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which obligations to aggregate.
     */
    where?: obligationsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of obligations to fetch.
     */
    orderBy?: obligationsOrderByWithRelationInput | obligationsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: obligationsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` obligations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` obligations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned obligations
    **/
    _count?: true | ObligationsCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ObligationsAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ObligationsSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ObligationsMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ObligationsMaxAggregateInputType
  }

  export type GetObligationsAggregateType<T extends ObligationsAggregateArgs> = {
        [P in keyof T & keyof AggregateObligations]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateObligations[P]>
      : GetScalarType<T[P], AggregateObligations[P]>
  }




  export type obligationsGroupByArgs<ExtArgs extends $Extensions.InternacionalalArgs = $Extensions.DefaultArgs> = {
    where?: obligationsWhereInput
    orderBy?: obligationsOrderByWithAggregationInput | obligationsOrderByWithAggregationInput[]
    by: ObligationsScalarFieldEnum[] | ObligationsScalarFieldEnum
    having?: obligationsScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ObligationsCountAggregateInputType | true
    _avg?: ObligationsAvgAggregateInputType
    _sum?: ObligationsSumAggregateInputType
    _min?: ObligationsMinAggregateInputType
    _max?: ObligationsMaxAggregateInputType
  }

  export type ObligationsGroupByOutputType = {
    id: bigint
    project_id: number
    type_id: number
    description: string | null
    amount_original: Decimal
    currency: string
    exchange_rate_date: Date | null
    due_date: Date
    status: string
    created_at: Date
    _count: ObligationsCountAggregateOutputType | null
    _avg: ObligationsAvgAggregateOutputType | null
    _sum: ObligationsSumAggregateOutputType | null
    _min: ObligationsMinAggregateOutputType | null
    _max: ObligationsMaxAggregateOutputType | null
  }

  type GetObligationsGroupByPayload<T extends obligationsGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ObligationsGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ObligationsGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ObligationsGroupByOutputType[P]>
            : GetScalarType<T[P], ObligationsGroupByOutputType[P]>
        }
      >
    >


  export type obligationsSelect<ExtArgs extends $Extensions.InternacionalalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    project_id?: boolean
    type_id?: boolean
    description?: boolean
    amount_original?: boolean
    currency?: boolean
    exchange_rate_date?: boolean
    due_date?: boolean
    status?: boolean
    created_at?: boolean
    credits?: boolean | obligations$creditsArgs<ExtArgs>
    movement_matches?: boolean | obligations$movement_matchesArgs<ExtArgs>
    obligation_documents?: boolean | obligations$obligation_documentsArgs<ExtArgs>
    projects?: boolean | projectsDefaultArgs<ExtArgs>
    obligation_types?: boolean | obligation_typesDefaultArgs<ExtArgs>
    _count?: boolean | ObligationsCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["obligations"]>

  export type obligationsSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternacionalalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    project_id?: boolean
    type_id?: boolean
    description?: boolean
    amount_original?: boolean
    currency?: boolean
    exchange_rate_date?: boolean
    due_date?: boolean
    status?: boolean
    created_at?: boolean
    projects?: boolean | projectsDefaultArgs<ExtArgs>
    obligation_types?: boolean | obligation_typesDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["obligations"]>

  export type obligationsSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternacionalalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    project_id?: boolean
    type_id?: boolean
    description?: boolean
    amount_original?: boolean
    currency?: boolean
    exchange_rate_date?: boolean
    due_date?: boolean
    status?: boolean
    created_at?: boolean
    projects?: boolean | projectsDefaultArgs<ExtArgs>
    obligation_types?: boolean | obligation_typesDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["obligations"]>

  export type obligationsSelectScalar = {
    id?: boolean
    project_id?: boolean
    type_id?: boolean
    description?: boolean
    amount_original?: boolean
    currency?: boolean
    exchange_rate_date?: boolean
    due_date?: boolean
    status?: boolean
    created_at?: boolean
  }

  export type obligationsOmit<ExtArgs extends $Extensions.InternacionalalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "project_id" | "type_id" | "description" | "amount_original" | "currency" | "exchange_rate_date" | "due_date" | "status" | "created_at", ExtArgs["result"]["obligations"]>
  export type obligationsInclude<ExtArgs extends $Extensions.InternacionalalArgs = $Extensions.DefaultArgs> = {
    credits?: boolean | obligations$creditsArgs<ExtArgs>
    movement_matches?: boolean | obligations$movement_matchesArgs<ExtArgs>
    obligation_documents?: boolean | obligations$obligation_documentsArgs<ExtArgs>
    projects?: boolean | projectsDefaultArgs<ExtArgs>
    obligation_types?: boolean | obligation_typesDefaultArgs<ExtArgs>
    _count?: boolean | ObligationsCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type obligationsIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternacionalalArgs = $Extensions.DefaultArgs> = {
    projects?: boolean | projectsDefaultArgs<ExtArgs>
    obligation_types?: boolean | obligation_typesDefaultArgs<ExtArgs>
  }
  export type obligationsIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternacionalalArgs = $Extensions.DefaultArgs> = {
    projects?: boolean | projectsDefaultArgs<ExtArgs>
    obligation_types?: boolean | obligation_typesDefaultArgs<ExtArgs>
  }

  export type $obligationsPayload<ExtArgs extends $Extensions.InternacionalalArgs = $Extensions.DefaultArgs> = {
    name: "obligations"
    objects: {
      credits: Prisma.$creditsPayload<ExtArgs> | null
      movement_matches: Prisma.$movement_matchesPayload<ExtArgs>[]
      obligation_documents: Prisma.$obligation_documentsPayload<ExtArgs>[]
      projects: Prisma.$projectsPayload<ExtArgs>
      obligation_types: Prisma.$obligation_typesPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: bigint
      project_id: number
      type_id: number
      description: string | null
      amount_original: Prisma.Decimal
      currency: string
      exchange_rate_date: Date | null
      due_date: Date
      status: string
      created_at: Date
    }, ExtArgs["result"]["obligations"]>
    composites: {}
  }

  type obligationsGetPayload<S extends boolean | null | undefined | obligationsDefaultArgs> = $Result.GetResult<Prisma.$obligationsPayload, S>

  type obligationsCountArgs<ExtArgs extends $Extensions.InternacionalalArgs = $Extensions.DefaultArgs> =
    Omit<obligationsFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ObligationsCountAggregateInputType | true
    }

  export interface obligationsDelegate<ExtArgs extends $Extensions.InternacionalalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['obligations'], meta: { name: 'obligations' } }
    /**
     * Find zero or one Obligations that matches the filter.
     * @param {obligationsFindUniqueArgs} args - Arguments to find a Obligations
     * @example
     * // Get one Obligations
     * const obligations = await prisma.obligations.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends obligationsFindUniqueArgs>(args: SelectSubset<T, obligationsFindUniqueArgs<ExtArgs>>): Prisma__obligationsClient<$Result.GetResult<Prisma.$obligationsPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Obligations that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {obligationsFindUniqueOrThrowArgs} args - Arguments to find a Obligations
     * @example
     * // Get one Obligations
     * const obligations = await prisma.obligations.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends obligationsFindUniqueOrThrowArgs>(args: SelectSubset<T, obligationsFindUniqueOrThrowArgs<ExtArgs>>): Prisma__obligationsClient<$Result.GetResult<Prisma.$obligationsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Obligations that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {obligationsFindFirstArgs} args - Arguments to find a Obligations
     * @example
     * // Get one Obligations
     * const obligations = await prisma.obligations.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends obligationsFindFirstArgs>(args?: SelectSubset<T, obligationsFindFirstArgs<ExtArgs>>): Prisma__obligationsClient<$Result.GetResult<Prisma.$obligationsPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Obligations that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {obligationsFindFirstOrThrowArgs} args - Arguments to find a Obligations
     * @example
     * // Get one Obligations
     * const obligations = await prisma.obligations.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends obligationsFindFirstOrThrowArgs>(args?: SelectSubset<T, obligationsFindFirstOrThrowArgs<ExtArgs>>): Prisma__obligationsClient<$Result.GetResult<Prisma.$obligationsPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Obligations that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {obligationsFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Obligations
     * const obligations = await prisma.obligations.findMany()
     * 
     * // Get first 10 Obligations
     * const obligations = await prisma.obligations.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const obligationsWithIdOnly = await prisma.obligations.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends obligationsFindManyArgs>(args?: SelectSubset<T, obligationsFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$obligationsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Obligations.
     * @param {obligationsCreateArgs} args - Arguments to create a Obligations.
     * @example
     * // Create one Obligations
     * const Obligations = await prisma.obligations.create({
     *   data: {
     *     // ... data to create a Obligations
     *   }
     * })
     * 
     */
    create<T extends obligationsCreateArgs>(args: SelectSubset<T, obligationsCreateArgs<ExtArgs>>): Prisma__obligationsClient<$Result.GetResult<Prisma.$obligationsPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Obligations.
     * @param {obligationsCreateManyArgs} args - Arguments to create many Obligations.
     * @example
     * // Create many Obligations
     * const obligations = await prisma.obligations.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends obligationsCreateManyArgs>(args?: SelectSubset<T, obligationsCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Obligations and returns the data saved in the database.
     * @param {obligationsCreateManyAndReturnArgs} args - Arguments to create many Obligations.
     * @example
     * // Create many Obligations
     * const obligations = await prisma.obligations.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Obligations and only return the `id`
     * const obligationsWithIdOnly = await prisma.obligations.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends obligationsCreateManyAndReturnArgs>(args?: SelectSubset<T, obligationsCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$obligationsPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Obligations.
     * @param {obligationsDeleteArgs} args - Arguments to delete one Obligations.
     * @example
     * // Delete one Obligations
     * const Obligations = await prisma.obligations.delete({
     *   where: {
     *     // ... filter to delete one Obligations
     *   }
     * })
     * 
     */
    delete<T extends obligationsDeleteArgs>(args: SelectSubset<T, obligationsDeleteArgs<ExtArgs>>): Prisma__obligationsClient<$Result.GetResult<Prisma.$obligationsPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Obligations.
     * @param {obligationsUpdateArgs} args - Arguments to update one Obligations.
     * @example
     * // Update one Obligations
     * const obligations = await prisma.obligations.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends obligationsUpdateArgs>(args: SelectSubset<T, obligationsUpdateArgs<ExtArgs>>): Prisma__obligationsClient<$Result.GetResult<Prisma.$obligationsPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Obligations.
     * @param {obligationsDeleteManyArgs} args - Arguments to filter Obligations to delete.
     * @example
     * // Delete a few Obligations
     * const { count } = await prisma.obligations.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends obligationsDeleteManyArgs>(args?: SelectSubset<T, obligationsDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Obligations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {obligationsUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Obligations
     * const obligations = await prisma.obligations.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends obligationsUpdateManyArgs>(args: SelectSubset<T, obligationsUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Obligations and returns the data updated in the database.
     * @param {obligationsUpdateManyAndReturnArgs} args - Arguments to update many Obligations.
     * @example
     * // Update many Obligations
     * const obligations = await prisma.obligations.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Obligations and only return the `id`
     * const obligationsWithIdOnly = await prisma.obligations.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends obligationsUpdateManyAndReturnArgs>(args: SelectSubset<T, obligationsUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$obligationsPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Obligations.
     * @param {obligationsUpsertArgs} args - Arguments to update or create a Obligations.
     * @example
     * // Update or create a Obligations
     * const obligations = await prisma.obligations.upsert({
     *   create: {
     *     // ... data to create a Obligations
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Obligations we want to update
     *   }
     * })
     */
    upsert<T extends obligationsUpsertArgs>(args: SelectSubset<T, obligationsUpsertArgs<ExtArgs>>): Prisma__obligationsClient<$Result.GetResult<Prisma.$obligationsPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Obligations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {obligationsCountArgs} args - Arguments to filter Obligations to count.
     * @example
     * // Count the number of Obligations
     * const count = await prisma.obligations.count({
     *   where: {
     *     // ... the filter for the Obligations we want to count
     *   }
     * })
    **/
    count<T extends obligationsCountArgs>(
      args?: Subset<T, obligationsCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ObligationsCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Obligations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ObligationsAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ObligationsAggregateArgs>(args: Subset<T, ObligationsAggregateArgs>): Prisma.PrismaPromise<GetObligationsAggregateType<T>>

    /**
     * Group by Obligations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {obligationsGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends obligationsGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: obligationsGroupByArgs['orderBy'] }
        : { orderBy?: obligationsGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, obligationsGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetObligationsGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the obligations model
   */
  readonly fields: obligationsFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for obligations.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__obligationsClient<T, Null = never, ExtArgs extends $Extensions.InternacionalalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    credits<T extends obligations$creditsArgs<ExtArgs> = {}>(args?: Subset<T, obligations$creditsArgs<ExtArgs>>): Prisma__creditsClient<$Result.GetResult<Prisma.$creditsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    movement_matches<T extends obligations$movement_matchesArgs<ExtArgs> = {}>(args?: Subset<T, obligations$movement_matchesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$movement_matchesPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    obligation_documents<T extends obligations$obligation_documentsArgs<ExtArgs> = {}>(args?: Subset<T, obligations$obligation_documentsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$obligation_documentsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    projects<T extends projectsDefaultArgs<ExtArgs> = {}>(args?: Subset<T, projectsDefaultArgs<ExtArgs>>): Prisma__projectsClient<$Result.GetResult<Prisma.$projectsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    obligation_types<T extends obligation_typesDefaultArgs<ExtArgs> = {}>(args?: Subset<T, obligation_typesDefaultArgs<ExtArgs>>): Prisma__obligation_typesClient<$Result.GetResult<Prisma.$obligation_typesPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the obligations model
   */
  interface obligationsFieldRefs {
    readonly id: FieldRef<"obligations", 'BigInt'>
    readonly project_id: FieldRef<"obligations", 'Int'>
    readonly type_id: FieldRef<"obligations", 'Int'>
    readonly description: FieldRef<"obligations", 'String'>
    readonly amount_original: FieldRef<"obligations", 'Decimal'>
    readonly currency: FieldRef<"obligations", 'String'>
    readonly exchange_rate_date: FieldRef<"obligations", 'DateTime'>
    readonly due_date: FieldRef<"obligations", 'DateTime'>
    readonly status: FieldRef<"obligations", 'String'>
    readonly created_at: FieldRef<"obligations", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * obligations findUnique
   */
  export type obligationsFindUniqueArgs<ExtArgs extends $Extensions.InternacionalalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the obligations
     */
    select?: obligationsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the obligations
     */
    omit?: obligationsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: obligationsInclude<ExtArgs> | null
    /**
     * Filter, which obligations to fetch.
     */
    where: obligationsWhereUniqueInput
  }

  /**
   * obligations findUniqueOrThrow
   */
  export type obligationsFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternacionalalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the obligations
     */
    select?: obligationsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the obligations
     */
    omit?: obligationsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: obligationsInclude<ExtArgs> | null
    /**
     * Filter, which obligations to fetch.
     */
    where: obligationsWhereUniqueInput
  }

  /**
   * obligations findFirst
   */
  export type obligationsFindFirstArgs<ExtArgs extends $Extensions.InternacionalalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the obligations
     */
    select?: obligationsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the obligations
     */
    omit?: obligationsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: obligationsInclude<ExtArgs> | null
    /**
     * Filter, which obligations to fetch.
     */
    where?: obligationsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of obligations to fetch.
     */
    orderBy?: obligationsOrderByWithRelationInput | obligationsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for obligations.
     */
    cursor?: obligationsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` obligations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` obligations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of obligations.
     */
    distinct?: ObligationsScalarFieldEnum | ObligationsScalarFieldEnum[]
  }

  /**
   * obligations findFirstOrThrow
   */
  export type obligationsFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternacionalalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the obligations
     */
    select?: obligationsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the obligations
     */
    omit?: obligationsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: obligationsInclude<ExtArgs> | null
    /**
     * Filter, which obligations to fetch.
     */
    where?: obligationsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of obligations to fetch.
     */
    orderBy?: obligationsOrderByWithRelationInput | obligationsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for obligations.
     */
    cursor?: obligationsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` obligations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` obligations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of obligations.
     */
    distinct?: ObligationsScalarFieldEnum | ObligationsScalarFieldEnum[]
  }

  /**
   * obligations findMany
   */
  export type obligationsFindManyArgs<ExtArgs extends $Extensions.InternacionalalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the obligations
     */
    select?: obligationsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the obligations
     */
    omit?: obligationsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: obligationsInclude<ExtArgs> | null
    /**
     * Filter, which obligations to fetch.
     */
    where?: obligationsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of obligations to fetch.
     */
    orderBy?: obligationsOrderByWithRelationInput | obligationsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing obligations.
     */
    cursor?: obligationsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` obligations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` obligations.
     */
    skip?: number
    distinct?: ObligationsScalarFieldEnum | ObligationsScalarFieldEnum[]
  }

  /**
   * obligations create
   */
  export type obligationsCreateArgs<ExtArgs extends $Extensions.InternacionalalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the obligations
     */
    select?: obligationsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the obligations
     */
    omit?: obligationsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: obligationsInclude<ExtArgs> | null
    /**
     * The data needed to create a obligations.
     */
    data: XOR<obligationsCreateInput, obligationsUncheckedCreateInput>
  }

  /**
   * obligations createMany
   */
  export type obligationsCreateManyArgs<ExtArgs extends $Extensions.InternacionalalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many obligations.
     */
    data: obligationsCreateManyInput | obligationsCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * obligations createManyAndReturn
   */
  export type obligationsCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternacionalalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the obligations
     */
    select?: obligationsSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the obligations
     */
    omit?: obligationsOmit<ExtArgs> | null
    /**
     * The data used to create many obligations.
     */
    data: obligationsCreateManyInput | obligationsCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: obligationsIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * obligations update
   */
  export type obligationsUpdateArgs<ExtArgs extends $Extensions.InternacionalalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the obligations
     */
    select?: obligationsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the obligations
     */
    omit?: obligationsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: obligationsInclude<ExtArgs> | null
    /**
     * The data needed to update a obligations.
     */
    data: XOR<obligationsUpdateInput, obligationsUncheckedUpdateInput>
    /**
     * Choose, which obligations to update.
     */
    where: obligationsWhereUniqueInput
  }

  /**
   * obligations updateMany
   */
  export type obligationsUpdateManyArgs<ExtArgs extends $Extensions.InternacionalalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update obligations.
     */
    data: XOR<obligationsUpdateManyMutationInput, obligationsUncheckedUpdateManyInput>
    /**
     * Filter which obligations to update
     */
    where?: obligationsWhereInput
    /**
     * Limit how many obligations to update.
     */
    limit?: number
  }

  /**
   * obligations updateManyAndReturn
   */
  export type obligationsUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternacionalalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the obligations
     */
    select?: obligationsSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the obligations
     */
    omit?: obligationsOmit<ExtArgs> | null
    /**
     * The data used to update obligations.
     */
    data: XOR<obligationsUpdateManyMutationInput, obligationsUncheckedUpdateManyInput>
    /**
     * Filter which obligations to update
     */
    where?: obligationsWhereInput
    /**
     * Limit how many obligations to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: obligationsIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * obligations upsert
   */
  export type obligationsUpsertArgs<ExtArgs extends $Extensions.InternacionalalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the obligations
     */
    select?: obligationsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the obligations
     */
    omit?: obligationsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: obligationsInclude<ExtArgs> | null
    /**
     * The filter to search for the obligations to update in case it exists.
     */
    where: obligationsWhereUniqueInput
    /**
     * In case the obligations found by the `where` argument doesn't exist, create a new obligations with this data.
     */
    create: XOR<obligationsCreateInput, obligationsUncheckedCreateInput>
    /**
     * In case the obligations was found with the provided `where` argument, update it with this data.
     */
    update: XOR<obligationsUpdateInput, obligationsUncheckedUpdateInput>
  }

  /**
   * obligations delete
   */
  export type obligationsDeleteArgs<ExtArgs extends $Extensions.InternacionalalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the obligations
     */
    select?: obligationsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the obligations
     */
    omit?: obligationsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: obligationsInclude<ExtArgs> | null
    /**
     * Filter which obligations to delete.
     */
    where: obligationsWhereUniqueInput
  }

  /**
   * obligations deleteMany
   */
  export type obligationsDeleteManyArgs<ExtArgs extends $Extensions.InternacionalalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which obligations to delete
     */
    where?: obligationsWhereInput
    /**
     * Limit how many obligations to delete.
     */
    limit?: number
  }

  /**
   * obligations.credits
   */
  export type obligations$creditsArgs<ExtArgs extends $Extensions.InternacionalalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the credits
     */
    select?: creditsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the credits
     */
    omit?: creditsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: creditsInclude<ExtArgs> | null
    where?: creditsWhereInput
  }

  /**
   * obligations.movement_matches
   */
  export type obligations$movement_matchesArgs<ExtArgs extends $Extensions.InternacionalalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the movement_matches
     */
    select?: movement_matchesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the movement_matches
     */
    omit?: movement_matchesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: movement_matchesInclude<ExtArgs> | null
    where?: movement_matchesWhereInput
    orderBy?: movement_matchesOrderByWithRelationInput | movement_matchesOrderByWithRelationInput[]
    cursor?: movement_matchesWhereUniqueInput
    take?: number
    skip?: number
    distinct?: Movement_matchesScalarFieldEnum | Movement_matchesScalarFieldEnum[]
  }

  /**
   * obligations.obligation_documents
   */
  export type obligations$obligation_documentsArgs<ExtArgs extends $Extensions.InternacionalalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the obligation_documents
     */
    select?: obligation_documentsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the obligation_documents
     */
    omit?: obligation_documentsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: obligation_documentsInclude<ExtArgs> | null
    where?: obligation_documentsWhereInput
    orderBy?: obligation_documentsOrderByWithRelationInput | obligation_documentsOrderByWithRelationInput[]
    cursor?: obligation_documentsWhereUniqueInput
    take?: number
    skip?: number
    distinct?: Obligation_documentsScalarFieldEnum | Obligation_documentsScalarFieldEnum[]
  }

  /**
   * obligations without action
   */
  export type obligationsDefaultArgs<ExtArgs extends $Extensions.InternacionalalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the obligations
     */
    select?: obligationsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the obligations
     */
    omit?: obligationsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: obligationsInclude<ExtArgs> | null
  }


  /**
   * Model projects
   */

  export type AggregateProjects = {
    _count: ProjectsCountAggregateOutputType | null
    _avg: ProjectsAvgAggregateOutputType | null
    _sum: ProjectsSumAggregateOutputType | null
    _min: ProjectsMinAggregateOutputType | null
    _max: ProjectsMaxAggregateOutputType | null
  }

  export type ProjectsAvgAggregateOutputType = {
    id: number | null
    company_id: number | null
  }

  export type ProjectsSumAggregateOutputType = {
    id: number | null
    company_id: number | null
  }

  export type ProjectsMinAggregateOutputType = {
    id: number | null
    company_id: number | null
    code: string | null
    name: string | null
    created_at: Date | null
  }

  export type ProjectsMaxAggregateOutputType = {
    id: number | null
    company_id: number | null
    code: string | null
    name: string | null
    created_at: Date | null
  }

  export type ProjectsCountAggregateOutputType = {
    id: number
    company_id: number
    code: number
    name: number
    created_at: number
    _all: number
  }


  export type ProjectsAvgAggregateInputType = {
    id?: true
    company_id?: true
  }

  export type ProjectsSumAggregateInputType = {
    id?: true
    company_id?: true
  }

  export type ProjectsMinAggregateInputType = {
    id?: true
    company_id?: true
    code?: true
    name?: true
    created_at?: true
  }

  export type ProjectsMaxAggregateInputType = {
    id?: true
    company_id?: true
    code?: true
    name?: true
    created_at?: true
  }

  export type ProjectsCountAggregateInputType = {
    id?: true
    company_id?: true
    code?: true
    name?: true
    created_at?: true
    _all?: true
  }

  export type ProjectsAggregateArgs<ExtArgs extends $Extensions.InternacionalalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which projects to aggregate.
     */
    where?: projectsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of projects to fetch.
     */
    orderBy?: projectsOrderByWithRelationInput | projectsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: projectsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` projects from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` projects.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned projects
    **/
    _count?: true | ProjectsCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ProjectsAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ProjectsSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ProjectsMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ProjectsMaxAggregateInputType
  }

  export type GetProjectsAggregateType<T extends ProjectsAggregateArgs> = {
        [P in keyof T & keyof AggregateProjects]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateProjects[P]>
      : GetScalarType<T[P], AggregateProjects[P]>
  }




  export type projectsGroupByArgs<ExtArgs extends $Extensions.InternacionalalArgs = $Extensions.DefaultArgs> = {
    where?: projectsWhereInput
    orderBy?: projectsOrderByWithAggregationInput | projectsOrderByWithAggregationInput[]
    by: ProjectsScalarFieldEnum[] | ProjectsScalarFieldEnum
    having?: projectsScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ProjectsCountAggregateInputType | true
    _avg?: ProjectsAvgAggregateInputType
    _sum?: ProjectsSumAggregateInputType
    _min?: ProjectsMinAggregateInputType
    _max?: ProjectsMaxAggregateInputType
  }

  export type ProjectsGroupByOutputType = {
    id: number
    company_id: number
    code: string
    name: string
    created_at: Date
    _count: ProjectsCountAggregateOutputType | null
    _avg: ProjectsAvgAggregateOutputType | null
    _sum: ProjectsSumAggregateOutputType | null
    _min: ProjectsMinAggregateOutputType | null
    _max: ProjectsMaxAggregateOutputType | null
  }

  type GetProjectsGroupByPayload<T extends projectsGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ProjectsGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ProjectsGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ProjectsGroupByOutputType[P]>
            : GetScalarType<T[P], ProjectsGroupByOutputType[P]>
        }
      >
    >


  export type projectsSelect<ExtArgs extends $Extensions.InternacionalalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    company_id?: boolean
    code?: boolean
    name?: boolean
    created_at?: boolean
    bank_movements?: boolean | projects$bank_movementsArgs<ExtArgs>
    obligations?: boolean | projects$obligationsArgs<ExtArgs>
    companies?: boolean | companiesDefaultArgs<ExtArgs>
    _count?: boolean | ProjectsCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["projects"]>

  export type projectsSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternacionalalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    company_id?: boolean
    code?: boolean
    name?: boolean
    created_at?: boolean
    companies?: boolean | companiesDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["projects"]>

  export type projectsSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternacionalalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    company_id?: boolean
    code?: boolean
    name?: boolean
    created_at?: boolean
    companies?: boolean | companiesDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["projects"]>

  export type projectsSelectScalar = {
    id?: boolean
    company_id?: boolean
    code?: boolean
    name?: boolean
    created_at?: boolean
  }

  export type projectsOmit<ExtArgs extends $Extensions.InternacionalalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "company_id" | "code" | "name" | "created_at", ExtArgs["result"]["projects"]>
  export type projectsInclude<ExtArgs extends $Extensions.InternacionalalArgs = $Extensions.DefaultArgs> = {
    bank_movements?: boolean | projects$bank_movementsArgs<ExtArgs>
    obligations?: boolean | projects$obligationsArgs<ExtArgs>
    companies?: boolean | companiesDefaultArgs<ExtArgs>
    _count?: boolean | ProjectsCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type projectsIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternacionalalArgs = $Extensions.DefaultArgs> = {
    companies?: boolean | companiesDefaultArgs<ExtArgs>
  }
  export type projectsIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternacionalalArgs = $Extensions.DefaultArgs> = {
    companies?: boolean | companiesDefaultArgs<ExtArgs>
  }

  export type $projectsPayload<ExtArgs extends $Extensions.InternacionalalArgs = $Extensions.DefaultArgs> = {
    name: "projects"
    objects: {
      bank_movements: Prisma.$bank_movementsPayload<ExtArgs>[]
      obligations: Prisma.$obligationsPayload<ExtArgs>[]
      companies: Prisma.$companiesPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      company_id: number
      code: string
      name: string
      created_at: Date
    }, ExtArgs["result"]["projects"]>
    composites: {}
  }

  type projectsGetPayload<S extends boolean | null | undefined | projectsDefaultArgs> = $Result.GetResult<Prisma.$projectsPayload, S>

  type projectsCountArgs<ExtArgs extends $Extensions.InternacionalalArgs = $Extensions.DefaultArgs> =
    Omit<projectsFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ProjectsCountAggregateInputType | true
    }

  export interface projectsDelegate<ExtArgs extends $Extensions.InternacionalalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['projects'], meta: { name: 'projects' } }
    /**
     * Find zero or one Projects that matches the filter.
     * @param {projectsFindUniqueArgs} args - Arguments to find a Projects
     * @example
     * // Get one Projects
     * const projects = await prisma.projects.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends projectsFindUniqueArgs>(args: SelectSubset<T, projectsFindUniqueArgs<ExtArgs>>): Prisma__projectsClient<$Result.GetResult<Prisma.$projectsPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Projects that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {projectsFindUniqueOrThrowArgs} args - Arguments to find a Projects
     * @example
     * // Get one Projects
     * const projects = await prisma.projects.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends projectsFindUniqueOrThrowArgs>(args: SelectSubset<T, projectsFindUniqueOrThrowArgs<ExtArgs>>): Prisma__projectsClient<$Result.GetResult<Prisma.$projectsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Projects that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {projectsFindFirstArgs} args - Arguments to find a Projects
     * @example
     * // Get one Projects
     * const projects = await prisma.projects.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends projectsFindFirstArgs>(args?: SelectSubset<T, projectsFindFirstArgs<ExtArgs>>): Prisma__projectsClient<$Result.GetResult<Prisma.$projectsPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Projects that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {projectsFindFirstOrThrowArgs} args - Arguments to find a Projects
     * @example
     * // Get one Projects
     * const projects = await prisma.projects.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends projectsFindFirstOrThrowArgs>(args?: SelectSubset<T, projectsFindFirstOrThrowArgs<ExtArgs>>): Prisma__projectsClient<$Result.GetResult<Prisma.$projectsPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Projects that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {projectsFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Projects
     * const projects = await prisma.projects.findMany()
     * 
     * // Get first 10 Projects
     * const projects = await prisma.projects.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const projectsWithIdOnly = await prisma.projects.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends projectsFindManyArgs>(args?: SelectSubset<T, projectsFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$projectsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Projects.
     * @param {projectsCreateArgs} args - Arguments to create a Projects.
     * @example
     * // Create one Projects
     * const Projects = await prisma.projects.create({
     *   data: {
     *     // ... data to create a Projects
     *   }
     * })
     * 
     */
    create<T extends projectsCreateArgs>(args: SelectSubset<T, projectsCreateArgs<ExtArgs>>): Prisma__projectsClient<$Result.GetResult<Prisma.$projectsPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Projects.
     * @param {projectsCreateManyArgs} args - Arguments to create many Projects.
     * @example
     * // Create many Projects
     * const projects = await prisma.projects.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends projectsCreateManyArgs>(args?: SelectSubset<T, projectsCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Projects and returns the data saved in the database.
     * @param {projectsCreateManyAndReturnArgs} args - Arguments to create many Projects.
     * @example
     * // Create many Projects
     * const projects = await prisma.projects.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Projects and only return the `id`
     * const projectsWithIdOnly = await prisma.projects.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends projectsCreateManyAndReturnArgs>(args?: SelectSubset<T, projectsCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$projectsPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Projects.
     * @param {projectsDeleteArgs} args - Arguments to delete one Projects.
     * @example
     * // Delete one Projects
     * const Projects = await prisma.projects.delete({
     *   where: {
     *     // ... filter to delete one Projects
     *   }
     * })
     * 
     */
    delete<T extends projectsDeleteArgs>(args: SelectSubset<T, projectsDeleteArgs<ExtArgs>>): Prisma__projectsClient<$Result.GetResult<Prisma.$projectsPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Projects.
     * @param {projectsUpdateArgs} args - Arguments to update one Projects.
     * @example
     * // Update one Projects
     * const projects = await prisma.projects.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends projectsUpdateArgs>(args: SelectSubset<T, projectsUpdateArgs<ExtArgs>>): Prisma__projectsClient<$Result.GetResult<Prisma.$projectsPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Projects.
     * @param {projectsDeleteManyArgs} args - Arguments to filter Projects to delete.
     * @example
     * // Delete a few Projects
     * const { count } = await prisma.projects.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends projectsDeleteManyArgs>(args?: SelectSubset<T, projectsDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Projects.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {projectsUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Projects
     * const projects = await prisma.projects.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends projectsUpdateManyArgs>(args: SelectSubset<T, projectsUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Projects and returns the data updated in the database.
     * @param {projectsUpdateManyAndReturnArgs} args - Arguments to update many Projects.
     * @example
     * // Update many Projects
     * const projects = await prisma.projects.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Projects and only return the `id`
     * const projectsWithIdOnly = await prisma.projects.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends projectsUpdateManyAndReturnArgs>(args: SelectSubset<T, projectsUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$projectsPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Projects.
     * @param {projectsUpsertArgs} args - Arguments to update or create a Projects.
     * @example
     * // Update or create a Projects
     * const projects = await prisma.projects.upsert({
     *   create: {
     *     // ... data to create a Projects
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Projects we want to update
     *   }
     * })
     */
    upsert<T extends projectsUpsertArgs>(args: SelectSubset<T, projectsUpsertArgs<ExtArgs>>): Prisma__projectsClient<$Result.GetResult<Prisma.$projectsPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Projects.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {projectsCountArgs} args - Arguments to filter Projects to count.
     * @example
     * // Count the number of Projects
     * const count = await prisma.projects.count({
     *   where: {
     *     // ... the filter for the Projects we want to count
     *   }
     * })
    **/
    count<T extends projectsCountArgs>(
      args?: Subset<T, projectsCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ProjectsCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Projects.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectsAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ProjectsAggregateArgs>(args: Subset<T, ProjectsAggregateArgs>): Prisma.PrismaPromise<GetProjectsAggregateType<T>>

    /**
     * Group by Projects.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {projectsGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends projectsGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: projectsGroupByArgs['orderBy'] }
        : { orderBy?: projectsGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, projectsGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetProjectsGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the projects model
   */
  readonly fields: projectsFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for projects.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__projectsClient<T, Null = never, ExtArgs extends $Extensions.InternacionalalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    bank_movements<T extends projects$bank_movementsArgs<ExtArgs> = {}>(args?: Subset<T, projects$bank_movementsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$bank_movementsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    obligations<T extends projects$obligationsArgs<ExtArgs> = {}>(args?: Subset<T, projects$obligationsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$obligationsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    companies<T extends companiesDefaultArgs<ExtArgs> = {}>(args?: Subset<T, companiesDefaultArgs<ExtArgs>>): Prisma__companiesClient<$Result.GetResult<Prisma.$companiesPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the projects model
   */
  interface projectsFieldRefs {
    readonly id: FieldRef<"projects", 'Int'>
    readonly company_id: FieldRef<"projects", 'Int'>
    readonly code: FieldRef<"projects", 'String'>
    readonly name: FieldRef<"projects", 'String'>
    readonly created_at: FieldRef<"projects", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * projects findUnique
   */
  export type projectsFindUniqueArgs<ExtArgs extends $Extensions.InternacionalalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the projects
     */
    select?: projectsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the projects
     */
    omit?: projectsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: projectsInclude<ExtArgs> | null
    /**
     * Filter, which projects to fetch.
     */
    where: projectsWhereUniqueInput
  }

  /**
   * projects findUniqueOrThrow
   */
  export type projectsFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternacionalalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the projects
     */
    select?: projectsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the projects
     */
    omit?: projectsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: projectsInclude<ExtArgs> | null
    /**
     * Filter, which projects to fetch.
     */
    where: projectsWhereUniqueInput
  }

  /**
   * projects findFirst
   */
  export type projectsFindFirstArgs<ExtArgs extends $Extensions.InternacionalalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the projects
     */
    select?: projectsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the projects
     */
    omit?: projectsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: projectsInclude<ExtArgs> | null
    /**
     * Filter, which projects to fetch.
     */
    where?: projectsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of projects to fetch.
     */
    orderBy?: projectsOrderByWithRelationInput | projectsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for projects.
     */
    cursor?: projectsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` projects from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` projects.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of projects.
     */
    distinct?: ProjectsScalarFieldEnum | ProjectsScalarFieldEnum[]
  }

  /**
   * projects findFirstOrThrow
   */
  export type projectsFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternacionalalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the projects
     */
    select?: projectsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the projects
     */
    omit?: projectsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: projectsInclude<ExtArgs> | null
    /**
     * Filter, which projects to fetch.
     */
    where?: projectsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of projects to fetch.
     */
    orderBy?: projectsOrderByWithRelationInput | projectsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for projects.
     */
    cursor?: projectsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` projects from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` projects.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of projects.
     */
    distinct?: ProjectsScalarFieldEnum | ProjectsScalarFieldEnum[]
  }

  /**
   * projects findMany
   */
  export type projectsFindManyArgs<ExtArgs extends $Extensions.InternacionalalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the projects
     */
    select?: projectsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the projects
     */
    omit?: projectsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: projectsInclude<ExtArgs> | null
    /**
     * Filter, which projects to fetch.
     */
    where?: projectsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of projects to fetch.
     */
    orderBy?: projectsOrderByWithRelationInput | projectsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing projects.
     */
    cursor?: projectsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` projects from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` projects.
     */
    skip?: number
    distinct?: ProjectsScalarFieldEnum | ProjectsScalarFieldEnum[]
  }

  /**
   * projects create
   */
  export type projectsCreateArgs<ExtArgs extends $Extensions.InternacionalalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the projects
     */
    select?: projectsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the projects
     */
    omit?: projectsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: projectsInclude<ExtArgs> | null
    /**
     * The data needed to create a projects.
     */
    data: XOR<projectsCreateInput, projectsUncheckedCreateInput>
  }

  /**
   * projects createMany
   */
  export type projectsCreateManyArgs<ExtArgs extends $Extensions.InternacionalalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many projects.
     */
    data: projectsCreateManyInput | projectsCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * projects createManyAndReturn
   */
  export type projectsCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternacionalalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the projects
     */
    select?: projectsSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the projects
     */
    omit?: projectsOmit<ExtArgs> | null
    /**
     * The data used to create many projects.
     */
    data: projectsCreateManyInput | projectsCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: projectsIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * projects update
   */
  export type projectsUpdateArgs<ExtArgs extends $Extensions.InternacionalalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the projects
     */
    select?: projectsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the projects
     */
    omit?: projectsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: projectsInclude<ExtArgs> | null
    /**
     * The data needed to update a projects.
     */
    data: XOR<projectsUpdateInput, projectsUncheckedUpdateInput>
    /**
     * Choose, which projects to update.
     */
    where: projectsWhereUniqueInput
  }

  /**
   * projects updateMany
   */
  export type projectsUpdateManyArgs<ExtArgs extends $Extensions.InternacionalalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update projects.
     */
    data: XOR<projectsUpdateManyMutationInput, projectsUncheckedUpdateManyInput>
    /**
     * Filter which projects to update
     */
    where?: projectsWhereInput
    /**
     * Limit how many projects to update.
     */
    limit?: number
  }

  /**
   * projects updateManyAndReturn
   */
  export type projectsUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternacionalalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the projects
     */
    select?: projectsSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the projects
     */
    omit?: projectsOmit<ExtArgs> | null
    /**
     * The data used to update projects.
     */
    data: XOR<projectsUpdateManyMutationInput, projectsUncheckedUpdateManyInput>
    /**
     * Filter which projects to update
     */
    where?: projectsWhereInput
    /**
     * Limit how many projects to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: projectsIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * projects upsert
   */
  export type projectsUpsertArgs<ExtArgs extends $Extensions.InternacionalalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the projects
     */
    select?: projectsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the projects
     */
    omit?: projectsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: projectsInclude<ExtArgs> | null
    /**
     * The filter to search for the projects to update in case it exists.
     */
    where: projectsWhereUniqueInput
    /**
     * In case the projects found by the `where` argument doesn't exist, create a new projects with this data.
     */
    create: XOR<projectsCreateInput, projectsUncheckedCreateInput>
    /**
     * In case the projects was found with the provided `where` argument, update it with this data.
     */
    update: XOR<projectsUpdateInput, projectsUncheckedUpdateInput>
  }

  /**
   * projects delete
   */
  export type projectsDeleteArgs<ExtArgs extends $Extensions.InternacionalalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the projects
     */
    select?: projectsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the projects
     */
    omit?: projectsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: projectsInclude<ExtArgs> | null
    /**
     * Filter which projects to delete.
     */
    where: projectsWhereUniqueInput
  }

  /**
   * projects deleteMany
   */
  export type projectsDeleteManyArgs<ExtArgs extends $Extensions.InternacionalalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which projects to delete
     */
    where?: projectsWhereInput
    /**
     * Limit how many projects to delete.
     */
    limit?: number
  }

  /**
   * projects.bank_movements
   */
  export type projects$bank_movementsArgs<ExtArgs extends $Extensions.InternacionalalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the bank_movements
     */
    select?: bank_movementsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the bank_movements
     */
    omit?: bank_movementsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: bank_movementsInclude<ExtArgs> | null
    where?: bank_movementsWhereInput
    orderBy?: bank_movementsOrderByWithRelationInput | bank_movementsOrderByWithRelationInput[]
    cursor?: bank_movementsWhereUniqueInput
    take?: number
    skip?: number
    distinct?: Bank_movementsScalarFieldEnum | Bank_movementsScalarFieldEnum[]
  }

  /**
   * projects.obligations
   */
  export type projects$obligationsArgs<ExtArgs extends $Extensions.InternacionalalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the obligations
     */
    select?: obligationsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the obligations
     */
    omit?: obligationsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: obligationsInclude<ExtArgs> | null
    where?: obligationsWhereInput
    orderBy?: obligationsOrderByWithRelationInput | obligationsOrderByWithRelationInput[]
    cursor?: obligationsWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ObligationsScalarFieldEnum | ObligationsScalarFieldEnum[]
  }

  /**
   * projects without action
   */
  export type projectsDefaultArgs<ExtArgs extends $Extensions.InternacionalalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the projects
     */
    select?: projectsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the projects
     */
    omit?: projectsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: projectsInclude<ExtArgs> | null
  }


  /**
   * Model sub_accounts
   */

  export type AggregateSub_accounts = {
    _count: Sub_accountsCountAggregateOutputType | null
    _avg: Sub_accountsAvgAggregateOutputType | null
    _sum: Sub_accountsSumAggregateOutputType | null
    _min: Sub_accountsMinAggregateOutputType | null
    _max: Sub_accountsMaxAggregateOutputType | null
  }

  export type Sub_accountsAvgAggregateOutputType = {
    id: number | null
    cost_center_id: number | null
  }

  export type Sub_accountsSumAggregateOutputType = {
    id: number | null
    cost_center_id: number | null
  }

  export type Sub_accountsMinAggregateOutputType = {
    id: number | null
    cost_center_id: number | null
    code: string | null
    name: string | null
  }

  export type Sub_accountsMaxAggregateOutputType = {
    id: number | null
    cost_center_id: number | null
    code: string | null
    name: string | null
  }

  export type Sub_accountsCountAggregateOutputType = {
    id: number
    cost_center_id: number
    code: number
    name: number
    _all: number
  }


  export type Sub_accountsAvgAggregateInputType = {
    id?: true
    cost_center_id?: true
  }

  export type Sub_accountsSumAggregateInputType = {
    id?: true
    cost_center_id?: true
  }

  export type Sub_accountsMinAggregateInputType = {
    id?: true
    cost_center_id?: true
    code?: true
    name?: true
  }

  export type Sub_accountsMaxAggregateInputType = {
    id?: true
    cost_center_id?: true
    code?: true
    name?: true
  }

  export type Sub_accountsCountAggregateInputType = {
    id?: true
    cost_center_id?: true
    code?: true
    name?: true
    _all?: true
  }

  export type Sub_accountsAggregateArgs<ExtArgs extends $Extensions.InternacionalalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which sub_accounts to aggregate.
     */
    where?: sub_accountsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of sub_accounts to fetch.
     */
    orderBy?: sub_accountsOrderByWithRelationInput | sub_accountsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: sub_accountsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` sub_accounts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` sub_accounts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned sub_accounts
    **/
    _count?: true | Sub_accountsCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: Sub_accountsAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: Sub_accountsSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: Sub_accountsMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: Sub_accountsMaxAggregateInputType
  }

  export type GetSub_accountsAggregateType<T extends Sub_accountsAggregateArgs> = {
        [P in keyof T & keyof AggregateSub_accounts]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSub_accounts[P]>
      : GetScalarType<T[P], AggregateSub_accounts[P]>
  }




  export type sub_accountsGroupByArgs<ExtArgs extends $Extensions.InternacionalalArgs = $Extensions.DefaultArgs> = {
    where?: sub_accountsWhereInput
    orderBy?: sub_accountsOrderByWithAggregationInput | sub_accountsOrderByWithAggregationInput[]
    by: Sub_accountsScalarFieldEnum[] | Sub_accountsScalarFieldEnum
    having?: sub_accountsScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: Sub_accountsCountAggregateInputType | true
    _avg?: Sub_accountsAvgAggregateInputType
    _sum?: Sub_accountsSumAggregateInputType
    _min?: Sub_accountsMinAggregateInputType
    _max?: Sub_accountsMaxAggregateInputType
  }

  export type Sub_accountsGroupByOutputType = {
    id: number
    cost_center_id: number
    code: string
    name: string
    _count: Sub_accountsCountAggregateOutputType | null
    _avg: Sub_accountsAvgAggregateOutputType | null
    _sum: Sub_accountsSumAggregateOutputType | null
    _min: Sub_accountsMinAggregateOutputType | null
    _max: Sub_accountsMaxAggregateOutputType | null
  }

  type GetSub_accountsGroupByPayload<T extends sub_accountsGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<Sub_accountsGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof Sub_accountsGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], Sub_accountsGroupByOutputType[P]>
            : GetScalarType<T[P], Sub_accountsGroupByOutputType[P]>
        }
      >
    >


  export type sub_accountsSelect<ExtArgs extends $Extensions.InternacionalalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    cost_center_id?: boolean
    code?: boolean
    name?: boolean
    bank_movements?: boolean | sub_accounts$bank_movementsArgs<ExtArgs>
    cost_centers?: boolean | cost_centersDefaultArgs<ExtArgs>
    _count?: boolean | Sub_accountsCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["sub_accounts"]>

  export type sub_accountsSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternacionalalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    cost_center_id?: boolean
    code?: boolean
    name?: boolean
    cost_centers?: boolean | cost_centersDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["sub_accounts"]>

  export type sub_accountsSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternacionalalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    cost_center_id?: boolean
    code?: boolean
    name?: boolean
    cost_centers?: boolean | cost_centersDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["sub_accounts"]>

  export type sub_accountsSelectScalar = {
    id?: boolean
    cost_center_id?: boolean
    code?: boolean
    name?: boolean
  }

  export type sub_accountsOmit<ExtArgs extends $Extensions.InternacionalalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "cost_center_id" | "code" | "name", ExtArgs["result"]["sub_accounts"]>
  export type sub_accountsInclude<ExtArgs extends $Extensions.InternacionalalArgs = $Extensions.DefaultArgs> = {
    bank_movements?: boolean | sub_accounts$bank_movementsArgs<ExtArgs>
    cost_centers?: boolean | cost_centersDefaultArgs<ExtArgs>
    _count?: boolean | Sub_accountsCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type sub_accountsIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternacionalalArgs = $Extensions.DefaultArgs> = {
    cost_centers?: boolean | cost_centersDefaultArgs<ExtArgs>
  }
  export type sub_accountsIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternacionalalArgs = $Extensions.DefaultArgs> = {
    cost_centers?: boolean | cost_centersDefaultArgs<ExtArgs>
  }

  export type $sub_accountsPayload<ExtArgs extends $Extensions.InternacionalalArgs = $Extensions.DefaultArgs> = {
    name: "sub_accounts"
    objects: {
      bank_movements: Prisma.$bank_movementsPayload<ExtArgs>[]
      cost_centers: Prisma.$cost_centersPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      cost_center_id: number
      code: string
      name: string
    }, ExtArgs["result"]["sub_accounts"]>
    composites: {}
  }

  type sub_accountsGetPayload<S extends boolean | null | undefined | sub_accountsDefaultArgs> = $Result.GetResult<Prisma.$sub_accountsPayload, S>

  type sub_accountsCountArgs<ExtArgs extends $Extensions.InternacionalalArgs = $Extensions.DefaultArgs> =
    Omit<sub_accountsFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: Sub_accountsCountAggregateInputType | true
    }

  export interface sub_accountsDelegate<ExtArgs extends $Extensions.InternacionalalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['sub_accounts'], meta: { name: 'sub_accounts' } }
    /**
     * Find zero or one Sub_accounts that matches the filter.
     * @param {sub_accountsFindUniqueArgs} args - Arguments to find a Sub_accounts
     * @example
     * // Get one Sub_accounts
     * const sub_accounts = await prisma.sub_accounts.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends sub_accountsFindUniqueArgs>(args: SelectSubset<T, sub_accountsFindUniqueArgs<ExtArgs>>): Prisma__sub_accountsClient<$Result.GetResult<Prisma.$sub_accountsPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Sub_accounts that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {sub_accountsFindUniqueOrThrowArgs} args - Arguments to find a Sub_accounts
     * @example
     * // Get one Sub_accounts
     * const sub_accounts = await prisma.sub_accounts.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends sub_accountsFindUniqueOrThrowArgs>(args: SelectSubset<T, sub_accountsFindUniqueOrThrowArgs<ExtArgs>>): Prisma__sub_accountsClient<$Result.GetResult<Prisma.$sub_accountsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Sub_accounts that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {sub_accountsFindFirstArgs} args - Arguments to find a Sub_accounts
     * @example
     * // Get one Sub_accounts
     * const sub_accounts = await prisma.sub_accounts.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends sub_accountsFindFirstArgs>(args?: SelectSubset<T, sub_accountsFindFirstArgs<ExtArgs>>): Prisma__sub_accountsClient<$Result.GetResult<Prisma.$sub_accountsPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Sub_accounts that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {sub_accountsFindFirstOrThrowArgs} args - Arguments to find a Sub_accounts
     * @example
     * // Get one Sub_accounts
     * const sub_accounts = await prisma.sub_accounts.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends sub_accountsFindFirstOrThrowArgs>(args?: SelectSubset<T, sub_accountsFindFirstOrThrowArgs<ExtArgs>>): Prisma__sub_accountsClient<$Result.GetResult<Prisma.$sub_accountsPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Sub_accounts that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {sub_accountsFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Sub_accounts
     * const sub_accounts = await prisma.sub_accounts.findMany()
     * 
     * // Get first 10 Sub_accounts
     * const sub_accounts = await prisma.sub_accounts.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const sub_accountsWithIdOnly = await prisma.sub_accounts.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends sub_accountsFindManyArgs>(args?: SelectSubset<T, sub_accountsFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$sub_accountsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Sub_accounts.
     * @param {sub_accountsCreateArgs} args - Arguments to create a Sub_accounts.
     * @example
     * // Create one Sub_accounts
     * const Sub_accounts = await prisma.sub_accounts.create({
     *   data: {
     *     // ... data to create a Sub_accounts
     *   }
     * })
     * 
     */
    create<T extends sub_accountsCreateArgs>(args: SelectSubset<T, sub_accountsCreateArgs<ExtArgs>>): Prisma__sub_accountsClient<$Result.GetResult<Prisma.$sub_accountsPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Sub_accounts.
     * @param {sub_accountsCreateManyArgs} args - Arguments to create many Sub_accounts.
     * @example
     * // Create many Sub_accounts
     * const sub_accounts = await prisma.sub_accounts.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends sub_accountsCreateManyArgs>(args?: SelectSubset<T, sub_accountsCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Sub_accounts and returns the data saved in the database.
     * @param {sub_accountsCreateManyAndReturnArgs} args - Arguments to create many Sub_accounts.
     * @example
     * // Create many Sub_accounts
     * const sub_accounts = await prisma.sub_accounts.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Sub_accounts and only return the `id`
     * const sub_accountsWithIdOnly = await prisma.sub_accounts.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends sub_accountsCreateManyAndReturnArgs>(args?: SelectSubset<T, sub_accountsCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$sub_accountsPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Sub_accounts.
     * @param {sub_accountsDeleteArgs} args - Arguments to delete one Sub_accounts.
     * @example
     * // Delete one Sub_accounts
     * const Sub_accounts = await prisma.sub_accounts.delete({
     *   where: {
     *     // ... filter to delete one Sub_accounts
     *   }
     * })
     * 
     */
    delete<T extends sub_accountsDeleteArgs>(args: SelectSubset<T, sub_accountsDeleteArgs<ExtArgs>>): Prisma__sub_accountsClient<$Result.GetResult<Prisma.$sub_accountsPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Sub_accounts.
     * @param {sub_accountsUpdateArgs} args - Arguments to update one Sub_accounts.
     * @example
     * // Update one Sub_accounts
     * const sub_accounts = await prisma.sub_accounts.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends sub_accountsUpdateArgs>(args: SelectSubset<T, sub_accountsUpdateArgs<ExtArgs>>): Prisma__sub_accountsClient<$Result.GetResult<Prisma.$sub_accountsPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Sub_accounts.
     * @param {sub_accountsDeleteManyArgs} args - Arguments to filter Sub_accounts to delete.
     * @example
     * // Delete a few Sub_accounts
     * const { count } = await prisma.sub_accounts.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends sub_accountsDeleteManyArgs>(args?: SelectSubset<T, sub_accountsDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Sub_accounts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {sub_accountsUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Sub_accounts
     * const sub_accounts = await prisma.sub_accounts.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends sub_accountsUpdateManyArgs>(args: SelectSubset<T, sub_accountsUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Sub_accounts and returns the data updated in the database.
     * @param {sub_accountsUpdateManyAndReturnArgs} args - Arguments to update many Sub_accounts.
     * @example
     * // Update many Sub_accounts
     * const sub_accounts = await prisma.sub_accounts.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Sub_accounts and only return the `id`
     * const sub_accountsWithIdOnly = await prisma.sub_accounts.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends sub_accountsUpdateManyAndReturnArgs>(args: SelectSubset<T, sub_accountsUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$sub_accountsPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Sub_accounts.
     * @param {sub_accountsUpsertArgs} args - Arguments to update or create a Sub_accounts.
     * @example
     * // Update or create a Sub_accounts
     * const sub_accounts = await prisma.sub_accounts.upsert({
     *   create: {
     *     // ... data to create a Sub_accounts
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Sub_accounts we want to update
     *   }
     * })
     */
    upsert<T extends sub_accountsUpsertArgs>(args: SelectSubset<T, sub_accountsUpsertArgs<ExtArgs>>): Prisma__sub_accountsClient<$Result.GetResult<Prisma.$sub_accountsPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Sub_accounts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {sub_accountsCountArgs} args - Arguments to filter Sub_accounts to count.
     * @example
     * // Count the number of Sub_accounts
     * const count = await prisma.sub_accounts.count({
     *   where: {
     *     // ... the filter for the Sub_accounts we want to count
     *   }
     * })
    **/
    count<T extends sub_accountsCountArgs>(
      args?: Subset<T, sub_accountsCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], Sub_accountsCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Sub_accounts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Sub_accountsAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends Sub_accountsAggregateArgs>(args: Subset<T, Sub_accountsAggregateArgs>): Prisma.PrismaPromise<GetSub_accountsAggregateType<T>>

    /**
     * Group by Sub_accounts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {sub_accountsGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends sub_accountsGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: sub_accountsGroupByArgs['orderBy'] }
        : { orderBy?: sub_accountsGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, sub_accountsGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSub_accountsGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the sub_accounts model
   */
  readonly fields: sub_accountsFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for sub_accounts.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__sub_accountsClient<T, Null = never, ExtArgs extends $Extensions.InternacionalalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    bank_movements<T extends sub_accounts$bank_movementsArgs<ExtArgs> = {}>(args?: Subset<T, sub_accounts$bank_movementsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$bank_movementsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    cost_centers<T extends cost_centersDefaultArgs<ExtArgs> = {}>(args?: Subset<T, cost_centersDefaultArgs<ExtArgs>>): Prisma__cost_centersClient<$Result.GetResult<Prisma.$cost_centersPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the sub_accounts model
   */
  interface sub_accountsFieldRefs {
    readonly id: FieldRef<"sub_accounts", 'Int'>
    readonly cost_center_id: FieldRef<"sub_accounts", 'Int'>
    readonly code: FieldRef<"sub_accounts", 'String'>
    readonly name: FieldRef<"sub_accounts", 'String'>
  }
    

  // Custom InputTypes
  /**
   * sub_accounts findUnique
   */
  export type sub_accountsFindUniqueArgs<ExtArgs extends $Extensions.InternacionalalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the sub_accounts
     */
    select?: sub_accountsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the sub_accounts
     */
    omit?: sub_accountsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: sub_accountsInclude<ExtArgs> | null
    /**
     * Filter, which sub_accounts to fetch.
     */
    where: sub_accountsWhereUniqueInput
  }

  /**
   * sub_accounts findUniqueOrThrow
   */
  export type sub_accountsFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternacionalalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the sub_accounts
     */
    select?: sub_accountsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the sub_accounts
     */
    omit?: sub_accountsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: sub_accountsInclude<ExtArgs> | null
    /**
     * Filter, which sub_accounts to fetch.
     */
    where: sub_accountsWhereUniqueInput
  }

  /**
   * sub_accounts findFirst
   */
  export type sub_accountsFindFirstArgs<ExtArgs extends $Extensions.InternacionalalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the sub_accounts
     */
    select?: sub_accountsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the sub_accounts
     */
    omit?: sub_accountsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: sub_accountsInclude<ExtArgs> | null
    /**
     * Filter, which sub_accounts to fetch.
     */
    where?: sub_accountsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of sub_accounts to fetch.
     */
    orderBy?: sub_accountsOrderByWithRelationInput | sub_accountsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for sub_accounts.
     */
    cursor?: sub_accountsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` sub_accounts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` sub_accounts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of sub_accounts.
     */
    distinct?: Sub_accountsScalarFieldEnum | Sub_accountsScalarFieldEnum[]
  }

  /**
   * sub_accounts findFirstOrThrow
   */
  export type sub_accountsFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternacionalalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the sub_accounts
     */
    select?: sub_accountsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the sub_accounts
     */
    omit?: sub_accountsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: sub_accountsInclude<ExtArgs> | null
    /**
     * Filter, which sub_accounts to fetch.
     */
    where?: sub_accountsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of sub_accounts to fetch.
     */
    orderBy?: sub_accountsOrderByWithRelationInput | sub_accountsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for sub_accounts.
     */
    cursor?: sub_accountsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` sub_accounts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` sub_accounts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of sub_accounts.
     */
    distinct?: Sub_accountsScalarFieldEnum | Sub_accountsScalarFieldEnum[]
  }

  /**
   * sub_accounts findMany
   */
  export type sub_accountsFindManyArgs<ExtArgs extends $Extensions.InternacionalalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the sub_accounts
     */
    select?: sub_accountsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the sub_accounts
     */
    omit?: sub_accountsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: sub_accountsInclude<ExtArgs> | null
    /**
     * Filter, which sub_accounts to fetch.
     */
    where?: sub_accountsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of sub_accounts to fetch.
     */
    orderBy?: sub_accountsOrderByWithRelationInput | sub_accountsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing sub_accounts.
     */
    cursor?: sub_accountsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` sub_accounts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` sub_accounts.
     */
    skip?: number
    distinct?: Sub_accountsScalarFieldEnum | Sub_accountsScalarFieldEnum[]
  }

  /**
   * sub_accounts create
   */
  export type sub_accountsCreateArgs<ExtArgs extends $Extensions.InternacionalalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the sub_accounts
     */
    select?: sub_accountsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the sub_accounts
     */
    omit?: sub_accountsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: sub_accountsInclude<ExtArgs> | null
    /**
     * The data needed to create a sub_accounts.
     */
    data: XOR<sub_accountsCreateInput, sub_accountsUncheckedCreateInput>
  }

  /**
   * sub_accounts createMany
   */
  export type sub_accountsCreateManyArgs<ExtArgs extends $Extensions.InternacionalalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many sub_accounts.
     */
    data: sub_accountsCreateManyInput | sub_accountsCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * sub_accounts createManyAndReturn
   */
  export type sub_accountsCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternacionalalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the sub_accounts
     */
    select?: sub_accountsSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the sub_accounts
     */
    omit?: sub_accountsOmit<ExtArgs> | null
    /**
     * The data used to create many sub_accounts.
     */
    data: sub_accountsCreateManyInput | sub_accountsCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: sub_accountsIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * sub_accounts update
   */
  export type sub_accountsUpdateArgs<ExtArgs extends $Extensions.InternacionalalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the sub_accounts
     */
    select?: sub_accountsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the sub_accounts
     */
    omit?: sub_accountsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: sub_accountsInclude<ExtArgs> | null
    /**
     * The data needed to update a sub_accounts.
     */
    data: XOR<sub_accountsUpdateInput, sub_accountsUncheckedUpdateInput>
    /**
     * Choose, which sub_accounts to update.
     */
    where: sub_accountsWhereUniqueInput
  }

  /**
   * sub_accounts updateMany
   */
  export type sub_accountsUpdateManyArgs<ExtArgs extends $Extensions.InternacionalalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update sub_accounts.
     */
    data: XOR<sub_accountsUpdateManyMutationInput, sub_accountsUncheckedUpdateManyInput>
    /**
     * Filter which sub_accounts to update
     */
    where?: sub_accountsWhereInput
    /**
     * Limit how many sub_accounts to update.
     */
    limit?: number
  }

  /**
   * sub_accounts updateManyAndReturn
   */
  export type sub_accountsUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternacionalalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the sub_accounts
     */
    select?: sub_accountsSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the sub_accounts
     */
    omit?: sub_accountsOmit<ExtArgs> | null
    /**
     * The data used to update sub_accounts.
     */
    data: XOR<sub_accountsUpdateManyMutationInput, sub_accountsUncheckedUpdateManyInput>
    /**
     * Filter which sub_accounts to update
     */
    where?: sub_accountsWhereInput
    /**
     * Limit how many sub_accounts to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: sub_accountsIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * sub_accounts upsert
   */
  export type sub_accountsUpsertArgs<ExtArgs extends $Extensions.InternacionalalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the sub_accounts
     */
    select?: sub_accountsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the sub_accounts
     */
    omit?: sub_accountsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: sub_accountsInclude<ExtArgs> | null
    /**
     * The filter to search for the sub_accounts to update in case it exists.
     */
    where: sub_accountsWhereUniqueInput
    /**
     * In case the sub_accounts found by the `where` argument doesn't exist, create a new sub_accounts with this data.
     */
    create: XOR<sub_accountsCreateInput, sub_accountsUncheckedCreateInput>
    /**
     * In case the sub_accounts was found with the provided `where` argument, update it with this data.
     */
    update: XOR<sub_accountsUpdateInput, sub_accountsUncheckedUpdateInput>
  }

  /**
   * sub_accounts delete
   */
  export type sub_accountsDeleteArgs<ExtArgs extends $Extensions.InternacionalalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the sub_accounts
     */
    select?: sub_accountsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the sub_accounts
     */
    omit?: sub_accountsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: sub_accountsInclude<ExtArgs> | null
    /**
     * Filter which sub_accounts to delete.
     */
    where: sub_accountsWhereUniqueInput
  }

  /**
   * sub_accounts deleteMany
   */
  export type sub_accountsDeleteManyArgs<ExtArgs extends $Extensions.InternacionalalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which sub_accounts to delete
     */
    where?: sub_accountsWhereInput
    /**
     * Limit how many sub_accounts to delete.
     */
    limit?: number
  }

  /**
   * sub_accounts.bank_movements
   */
  export type sub_accounts$bank_movementsArgs<ExtArgs extends $Extensions.InternacionalalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the bank_movements
     */
    select?: bank_movementsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the bank_movements
     */
    omit?: bank_movementsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: bank_movementsInclude<ExtArgs> | null
    where?: bank_movementsWhereInput
    orderBy?: bank_movementsOrderByWithRelationInput | bank_movementsOrderByWithRelationInput[]
    cursor?: bank_movementsWhereUniqueInput
    take?: number
    skip?: number
    distinct?: Bank_movementsScalarFieldEnum | Bank_movementsScalarFieldEnum[]
  }

  /**
   * sub_accounts without action
   */
  export type sub_accountsDefaultArgs<ExtArgs extends $Extensions.InternacionalalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the sub_accounts
     */
    select?: sub_accountsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the sub_accounts
     */
    omit?: sub_accountsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: sub_accountsInclude<ExtArgs> | null
  }


  /**
   * Model uf_rates
   */

  export type AggregateUf_rates = {
    _count: Uf_ratesCountAggregateOutputType | null
    _avg: Uf_ratesAvgAggregateOutputType | null
    _sum: Uf_ratesSumAggregateOutputType | null
    _min: Uf_ratesMinAggregateOutputType | null
    _max: Uf_ratesMaxAggregateOutputType | null
  }

  export type Uf_ratesAvgAggregateOutputType = {
    uf_value: Decimal | null
  }

  export type Uf_ratesSumAggregateOutputType = {
    uf_value: Decimal | null
  }

  export type Uf_ratesMinAggregateOutputType = {
    date: Date | null
    uf_value: Decimal | null
  }

  export type Uf_ratesMaxAggregateOutputType = {
    date: Date | null
    uf_value: Decimal | null
  }

  export type Uf_ratesCountAggregateOutputType = {
    date: number
    uf_value: number
    _all: number
  }


  export type Uf_ratesAvgAggregateInputType = {
    uf_value?: true
  }

  export type Uf_ratesSumAggregateInputType = {
    uf_value?: true
  }

  export type Uf_ratesMinAggregateInputType = {
    date?: true
    uf_value?: true
  }

  export type Uf_ratesMaxAggregateInputType = {
    date?: true
    uf_value?: true
  }

  export type Uf_ratesCountAggregateInputType = {
    date?: true
    uf_value?: true
    _all?: true
  }

  export type Uf_ratesAggregateArgs<ExtArgs extends $Extensions.InternacionalalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which uf_rates to aggregate.
     */
    where?: uf_ratesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of uf_rates to fetch.
     */
    orderBy?: uf_ratesOrderByWithRelationInput | uf_ratesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: uf_ratesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` uf_rates from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` uf_rates.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned uf_rates
    **/
    _count?: true | Uf_ratesCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: Uf_ratesAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: Uf_ratesSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: Uf_ratesMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: Uf_ratesMaxAggregateInputType
  }

  export type GetUf_ratesAggregateType<T extends Uf_ratesAggregateArgs> = {
        [P in keyof T & keyof AggregateUf_rates]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUf_rates[P]>
      : GetScalarType<T[P], AggregateUf_rates[P]>
  }




  export type uf_ratesGroupByArgs<ExtArgs extends $Extensions.InternacionalalArgs = $Extensions.DefaultArgs> = {
    where?: uf_ratesWhereInput
    orderBy?: uf_ratesOrderByWithAggregationInput | uf_ratesOrderByWithAggregationInput[]
    by: Uf_ratesScalarFieldEnum[] | Uf_ratesScalarFieldEnum
    having?: uf_ratesScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: Uf_ratesCountAggregateInputType | true
    _avg?: Uf_ratesAvgAggregateInputType
    _sum?: Uf_ratesSumAggregateInputType
    _min?: Uf_ratesMinAggregateInputType
    _max?: Uf_ratesMaxAggregateInputType
  }

  export type Uf_ratesGroupByOutputType = {
    date: Date
    uf_value: Decimal
    _count: Uf_ratesCountAggregateOutputType | null
    _avg: Uf_ratesAvgAggregateOutputType | null
    _sum: Uf_ratesSumAggregateOutputType | null
    _min: Uf_ratesMinAggregateOutputType | null
    _max: Uf_ratesMaxAggregateOutputType | null
  }

  type GetUf_ratesGroupByPayload<T extends uf_ratesGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<Uf_ratesGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof Uf_ratesGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], Uf_ratesGroupByOutputType[P]>
            : GetScalarType<T[P], Uf_ratesGroupByOutputType[P]>
        }
      >
    >


  export type uf_ratesSelect<ExtArgs extends $Extensions.InternacionalalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    date?: boolean
    uf_value?: boolean
  }, ExtArgs["result"]["uf_rates"]>

  export type uf_ratesSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternacionalalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    date?: boolean
    uf_value?: boolean
  }, ExtArgs["result"]["uf_rates"]>

  export type uf_ratesSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternacionalalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    date?: boolean
    uf_value?: boolean
  }, ExtArgs["result"]["uf_rates"]>

  export type uf_ratesSelectScalar = {
    date?: boolean
    uf_value?: boolean
  }

  export type uf_ratesOmit<ExtArgs extends $Extensions.InternacionalalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"date" | "uf_value", ExtArgs["result"]["uf_rates"]>

  export type $uf_ratesPayload<ExtArgs extends $Extensions.InternacionalalArgs = $Extensions.DefaultArgs> = {
    name: "uf_rates"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      date: Date
      uf_value: Prisma.Decimal
    }, ExtArgs["result"]["uf_rates"]>
    composites: {}
  }

  type uf_ratesGetPayload<S extends boolean | null | undefined | uf_ratesDefaultArgs> = $Result.GetResult<Prisma.$uf_ratesPayload, S>

  type uf_ratesCountArgs<ExtArgs extends $Extensions.InternacionalalArgs = $Extensions.DefaultArgs> =
    Omit<uf_ratesFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: Uf_ratesCountAggregateInputType | true
    }

  export interface uf_ratesDelegate<ExtArgs extends $Extensions.InternacionalalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['uf_rates'], meta: { name: 'uf_rates' } }
    /**
     * Find zero or one Uf_rates that matches the filter.
     * @param {uf_ratesFindUniqueArgs} args - Arguments to find a Uf_rates
     * @example
     * // Get one Uf_rates
     * const uf_rates = await prisma.uf_rates.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends uf_ratesFindUniqueArgs>(args: SelectSubset<T, uf_ratesFindUniqueArgs<ExtArgs>>): Prisma__uf_ratesClient<$Result.GetResult<Prisma.$uf_ratesPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Uf_rates that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {uf_ratesFindUniqueOrThrowArgs} args - Arguments to find a Uf_rates
     * @example
     * // Get one Uf_rates
     * const uf_rates = await prisma.uf_rates.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends uf_ratesFindUniqueOrThrowArgs>(args: SelectSubset<T, uf_ratesFindUniqueOrThrowArgs<ExtArgs>>): Prisma__uf_ratesClient<$Result.GetResult<Prisma.$uf_ratesPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Uf_rates that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {uf_ratesFindFirstArgs} args - Arguments to find a Uf_rates
     * @example
     * // Get one Uf_rates
     * const uf_rates = await prisma.uf_rates.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends uf_ratesFindFirstArgs>(args?: SelectSubset<T, uf_ratesFindFirstArgs<ExtArgs>>): Prisma__uf_ratesClient<$Result.GetResult<Prisma.$uf_ratesPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Uf_rates that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {uf_ratesFindFirstOrThrowArgs} args - Arguments to find a Uf_rates
     * @example
     * // Get one Uf_rates
     * const uf_rates = await prisma.uf_rates.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends uf_ratesFindFirstOrThrowArgs>(args?: SelectSubset<T, uf_ratesFindFirstOrThrowArgs<ExtArgs>>): Prisma__uf_ratesClient<$Result.GetResult<Prisma.$uf_ratesPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Uf_rates that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {uf_ratesFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Uf_rates
     * const uf_rates = await prisma.uf_rates.findMany()
     * 
     * // Get first 10 Uf_rates
     * const uf_rates = await prisma.uf_rates.findMany({ take: 10 })
     * 
     * // Only select the `date`
     * const uf_ratesWithDateOnly = await prisma.uf_rates.findMany({ select: { date: true } })
     * 
     */
    findMany<T extends uf_ratesFindManyArgs>(args?: SelectSubset<T, uf_ratesFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$uf_ratesPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Uf_rates.
     * @param {uf_ratesCreateArgs} args - Arguments to create a Uf_rates.
     * @example
     * // Create one Uf_rates
     * const Uf_rates = await prisma.uf_rates.create({
     *   data: {
     *     // ... data to create a Uf_rates
     *   }
     * })
     * 
     */
    create<T extends uf_ratesCreateArgs>(args: SelectSubset<T, uf_ratesCreateArgs<ExtArgs>>): Prisma__uf_ratesClient<$Result.GetResult<Prisma.$uf_ratesPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Uf_rates.
     * @param {uf_ratesCreateManyArgs} args - Arguments to create many Uf_rates.
     * @example
     * // Create many Uf_rates
     * const uf_rates = await prisma.uf_rates.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends uf_ratesCreateManyArgs>(args?: SelectSubset<T, uf_ratesCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Uf_rates and returns the data saved in the database.
     * @param {uf_ratesCreateManyAndReturnArgs} args - Arguments to create many Uf_rates.
     * @example
     * // Create many Uf_rates
     * const uf_rates = await prisma.uf_rates.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Uf_rates and only return the `date`
     * const uf_ratesWithDateOnly = await prisma.uf_rates.createManyAndReturn({
     *   select: { date: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends uf_ratesCreateManyAndReturnArgs>(args?: SelectSubset<T, uf_ratesCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$uf_ratesPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Uf_rates.
     * @param {uf_ratesDeleteArgs} args - Arguments to delete one Uf_rates.
     * @example
     * // Delete one Uf_rates
     * const Uf_rates = await prisma.uf_rates.delete({
     *   where: {
     *     // ... filter to delete one Uf_rates
     *   }
     * })
     * 
     */
    delete<T extends uf_ratesDeleteArgs>(args: SelectSubset<T, uf_ratesDeleteArgs<ExtArgs>>): Prisma__uf_ratesClient<$Result.GetResult<Prisma.$uf_ratesPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Uf_rates.
     * @param {uf_ratesUpdateArgs} args - Arguments to update one Uf_rates.
     * @example
     * // Update one Uf_rates
     * const uf_rates = await prisma.uf_rates.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends uf_ratesUpdateArgs>(args: SelectSubset<T, uf_ratesUpdateArgs<ExtArgs>>): Prisma__uf_ratesClient<$Result.GetResult<Prisma.$uf_ratesPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Uf_rates.
     * @param {uf_ratesDeleteManyArgs} args - Arguments to filter Uf_rates to delete.
     * @example
     * // Delete a few Uf_rates
     * const { count } = await prisma.uf_rates.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends uf_ratesDeleteManyArgs>(args?: SelectSubset<T, uf_ratesDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Uf_rates.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {uf_ratesUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Uf_rates
     * const uf_rates = await prisma.uf_rates.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends uf_ratesUpdateManyArgs>(args: SelectSubset<T, uf_ratesUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Uf_rates and returns the data updated in the database.
     * @param {uf_ratesUpdateManyAndReturnArgs} args - Arguments to update many Uf_rates.
     * @example
     * // Update many Uf_rates
     * const uf_rates = await prisma.uf_rates.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Uf_rates and only return the `date`
     * const uf_ratesWithDateOnly = await prisma.uf_rates.updateManyAndReturn({
     *   select: { date: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends uf_ratesUpdateManyAndReturnArgs>(args: SelectSubset<T, uf_ratesUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$uf_ratesPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Uf_rates.
     * @param {uf_ratesUpsertArgs} args - Arguments to update or create a Uf_rates.
     * @example
     * // Update or create a Uf_rates
     * const uf_rates = await prisma.uf_rates.upsert({
     *   create: {
     *     // ... data to create a Uf_rates
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Uf_rates we want to update
     *   }
     * })
     */
    upsert<T extends uf_ratesUpsertArgs>(args: SelectSubset<T, uf_ratesUpsertArgs<ExtArgs>>): Prisma__uf_ratesClient<$Result.GetResult<Prisma.$uf_ratesPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Uf_rates.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {uf_ratesCountArgs} args - Arguments to filter Uf_rates to count.
     * @example
     * // Count the number of Uf_rates
     * const count = await prisma.uf_rates.count({
     *   where: {
     *     // ... the filter for the Uf_rates we want to count
     *   }
     * })
    **/
    count<T extends uf_ratesCountArgs>(
      args?: Subset<T, uf_ratesCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], Uf_ratesCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Uf_rates.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Uf_ratesAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends Uf_ratesAggregateArgs>(args: Subset<T, Uf_ratesAggregateArgs>): Prisma.PrismaPromise<GetUf_ratesAggregateType<T>>

    /**
     * Group by Uf_rates.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {uf_ratesGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends uf_ratesGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: uf_ratesGroupByArgs['orderBy'] }
        : { orderBy?: uf_ratesGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, uf_ratesGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUf_ratesGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the uf_rates model
   */
  readonly fields: uf_ratesFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for uf_rates.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__uf_ratesClient<T, Null = never, ExtArgs extends $Extensions.InternacionalalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the uf_rates model
   */
  interface uf_ratesFieldRefs {
    readonly date: FieldRef<"uf_rates", 'DateTime'>
    readonly uf_value: FieldRef<"uf_rates", 'Decimal'>
  }
    

  // Custom InputTypes
  /**
   * uf_rates findUnique
   */
  export type uf_ratesFindUniqueArgs<ExtArgs extends $Extensions.InternacionalalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the uf_rates
     */
    select?: uf_ratesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the uf_rates
     */
    omit?: uf_ratesOmit<ExtArgs> | null
    /**
     * Filter, which uf_rates to fetch.
     */
    where: uf_ratesWhereUniqueInput
  }

  /**
   * uf_rates findUniqueOrThrow
   */
  export type uf_ratesFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternacionalalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the uf_rates
     */
    select?: uf_ratesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the uf_rates
     */
    omit?: uf_ratesOmit<ExtArgs> | null
    /**
     * Filter, which uf_rates to fetch.
     */
    where: uf_ratesWhereUniqueInput
  }

  /**
   * uf_rates findFirst
   */
  export type uf_ratesFindFirstArgs<ExtArgs extends $Extensions.InternacionalalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the uf_rates
     */
    select?: uf_ratesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the uf_rates
     */
    omit?: uf_ratesOmit<ExtArgs> | null
    /**
     * Filter, which uf_rates to fetch.
     */
    where?: uf_ratesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of uf_rates to fetch.
     */
    orderBy?: uf_ratesOrderByWithRelationInput | uf_ratesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for uf_rates.
     */
    cursor?: uf_ratesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` uf_rates from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` uf_rates.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of uf_rates.
     */
    distinct?: Uf_ratesScalarFieldEnum | Uf_ratesScalarFieldEnum[]
  }

  /**
   * uf_rates findFirstOrThrow
   */
  export type uf_ratesFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternacionalalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the uf_rates
     */
    select?: uf_ratesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the uf_rates
     */
    omit?: uf_ratesOmit<ExtArgs> | null
    /**
     * Filter, which uf_rates to fetch.
     */
    where?: uf_ratesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of uf_rates to fetch.
     */
    orderBy?: uf_ratesOrderByWithRelationInput | uf_ratesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for uf_rates.
     */
    cursor?: uf_ratesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` uf_rates from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` uf_rates.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of uf_rates.
     */
    distinct?: Uf_ratesScalarFieldEnum | Uf_ratesScalarFieldEnum[]
  }

  /**
   * uf_rates findMany
   */
  export type uf_ratesFindManyArgs<ExtArgs extends $Extensions.InternacionalalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the uf_rates
     */
    select?: uf_ratesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the uf_rates
     */
    omit?: uf_ratesOmit<ExtArgs> | null
    /**
     * Filter, which uf_rates to fetch.
     */
    where?: uf_ratesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of uf_rates to fetch.
     */
    orderBy?: uf_ratesOrderByWithRelationInput | uf_ratesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing uf_rates.
     */
    cursor?: uf_ratesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` uf_rates from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` uf_rates.
     */
    skip?: number
    distinct?: Uf_ratesScalarFieldEnum | Uf_ratesScalarFieldEnum[]
  }

  /**
   * uf_rates create
   */
  export type uf_ratesCreateArgs<ExtArgs extends $Extensions.InternacionalalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the uf_rates
     */
    select?: uf_ratesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the uf_rates
     */
    omit?: uf_ratesOmit<ExtArgs> | null
    /**
     * The data needed to create a uf_rates.
     */
    data: XOR<uf_ratesCreateInput, uf_ratesUncheckedCreateInput>
  }

  /**
   * uf_rates createMany
   */
  export type uf_ratesCreateManyArgs<ExtArgs extends $Extensions.InternacionalalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many uf_rates.
     */
    data: uf_ratesCreateManyInput | uf_ratesCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * uf_rates createManyAndReturn
   */
  export type uf_ratesCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternacionalalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the uf_rates
     */
    select?: uf_ratesSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the uf_rates
     */
    omit?: uf_ratesOmit<ExtArgs> | null
    /**
     * The data used to create many uf_rates.
     */
    data: uf_ratesCreateManyInput | uf_ratesCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * uf_rates update
   */
  export type uf_ratesUpdateArgs<ExtArgs extends $Extensions.InternacionalalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the uf_rates
     */
    select?: uf_ratesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the uf_rates
     */
    omit?: uf_ratesOmit<ExtArgs> | null
    /**
     * The data needed to update a uf_rates.
     */
    data: XOR<uf_ratesUpdateInput, uf_ratesUncheckedUpdateInput>
    /**
     * Choose, which uf_rates to update.
     */
    where: uf_ratesWhereUniqueInput
  }

  /**
   * uf_rates updateMany
   */
  export type uf_ratesUpdateManyArgs<ExtArgs extends $Extensions.InternacionalalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update uf_rates.
     */
    data: XOR<uf_ratesUpdateManyMutationInput, uf_ratesUncheckedUpdateManyInput>
    /**
     * Filter which uf_rates to update
     */
    where?: uf_ratesWhereInput
    /**
     * Limit how many uf_rates to update.
     */
    limit?: number
  }

  /**
   * uf_rates updateManyAndReturn
   */
  export type uf_ratesUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternacionalalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the uf_rates
     */
    select?: uf_ratesSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the uf_rates
     */
    omit?: uf_ratesOmit<ExtArgs> | null
    /**
     * The data used to update uf_rates.
     */
    data: XOR<uf_ratesUpdateManyMutationInput, uf_ratesUncheckedUpdateManyInput>
    /**
     * Filter which uf_rates to update
     */
    where?: uf_ratesWhereInput
    /**
     * Limit how many uf_rates to update.
     */
    limit?: number
  }

  /**
   * uf_rates upsert
   */
  export type uf_ratesUpsertArgs<ExtArgs extends $Extensions.InternacionalalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the uf_rates
     */
    select?: uf_ratesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the uf_rates
     */
    omit?: uf_ratesOmit<ExtArgs> | null
    /**
     * The filter to search for the uf_rates to update in case it exists.
     */
    where: uf_ratesWhereUniqueInput
    /**
     * In case the uf_rates found by the `where` argument doesn't exist, create a new uf_rates with this data.
     */
    create: XOR<uf_ratesCreateInput, uf_ratesUncheckedCreateInput>
    /**
     * In case the uf_rates was found with the provided `where` argument, update it with this data.
     */
    update: XOR<uf_ratesUpdateInput, uf_ratesUncheckedUpdateInput>
  }

  /**
   * uf_rates delete
   */
  export type uf_ratesDeleteArgs<ExtArgs extends $Extensions.InternacionalalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the uf_rates
     */
    select?: uf_ratesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the uf_rates
     */
    omit?: uf_ratesOmit<ExtArgs> | null
    /**
     * Filter which uf_rates to delete.
     */
    where: uf_ratesWhereUniqueInput
  }

  /**
   * uf_rates deleteMany
   */
  export type uf_ratesDeleteManyArgs<ExtArgs extends $Extensions.InternacionalalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which uf_rates to delete
     */
    where?: uf_ratesWhereInput
    /**
     * Limit how many uf_rates to delete.
     */
    limit?: number
  }

  /**
   * uf_rates without action
   */
  export type uf_ratesDefaultArgs<ExtArgs extends $Extensions.InternacionalalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the uf_rates
     */
    select?: uf_ratesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the uf_rates
     */
    omit?: uf_ratesOmit<ExtArgs> | null
  }


  /**
   * Model users
   */

  export type AggregateUsers = {
    _count: UsersCountAggregateOutputType | null
    _avg: UsersAvgAggregateOutputType | null
    _sum: UsersSumAggregateOutputType | null
    _min: UsersMinAggregateOutputType | null
    _max: UsersMaxAggregateOutputType | null
  }

  export type UsersAvgAggregateOutputType = {
    id: number | null
  }

  export type UsersSumAggregateOutputType = {
    id: bigint | null
  }

  export type UsersMinAggregateOutputType = {
    id: bigint | null
    name: string | null
    email: string | null
    password_hash: string | null
    role: string | null
    created_at: Date | null
  }

  export type UsersMaxAggregateOutputType = {
    id: bigint | null
    name: string | null
    email: string | null
    password_hash: string | null
    role: string | null
    created_at: Date | null
  }

  export type UsersCountAggregateOutputType = {
    id: number
    name: number
    email: number
    password_hash: number
    role: number
    created_at: number
    _all: number
  }


  export type UsersAvgAggregateInputType = {
    id?: true
  }

  export type UsersSumAggregateInputType = {
    id?: true
  }

  export type UsersMinAggregateInputType = {
    id?: true
    name?: true
    email?: true
    password_hash?: true
    role?: true
    created_at?: true
  }

  export type UsersMaxAggregateInputType = {
    id?: true
    name?: true
    email?: true
    password_hash?: true
    role?: true
    created_at?: true
  }

  export type UsersCountAggregateInputType = {
    id?: true
    name?: true
    email?: true
    password_hash?: true
    role?: true
    created_at?: true
    _all?: true
  }

  export type UsersAggregateArgs<ExtArgs extends $Extensions.InternacionalalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which users to aggregate.
     */
    where?: usersWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of users to fetch.
     */
    orderBy?: usersOrderByWithRelationInput | usersOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: usersWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned users
    **/
    _count?: true | UsersCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: UsersAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: UsersSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UsersMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UsersMaxAggregateInputType
  }

  export type GetUsersAggregateType<T extends UsersAggregateArgs> = {
        [P in keyof T & keyof AggregateUsers]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUsers[P]>
      : GetScalarType<T[P], AggregateUsers[P]>
  }




  export type usersGroupByArgs<ExtArgs extends $Extensions.InternacionalalArgs = $Extensions.DefaultArgs> = {
    where?: usersWhereInput
    orderBy?: usersOrderByWithAggregationInput | usersOrderByWithAggregationInput[]
    by: UsersScalarFieldEnum[] | UsersScalarFieldEnum
    having?: usersScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UsersCountAggregateInputType | true
    _avg?: UsersAvgAggregateInputType
    _sum?: UsersSumAggregateInputType
    _min?: UsersMinAggregateInputType
    _max?: UsersMaxAggregateInputType
  }

  export type UsersGroupByOutputType = {
    id: bigint
    name: string
    email: string
    password_hash: string
    role: string
    created_at: Date
    _count: UsersCountAggregateOutputType | null
    _avg: UsersAvgAggregateOutputType | null
    _sum: UsersSumAggregateOutputType | null
    _min: UsersMinAggregateOutputType | null
    _max: UsersMaxAggregateOutputType | null
  }

  type GetUsersGroupByPayload<T extends usersGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UsersGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UsersGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UsersGroupByOutputType[P]>
            : GetScalarType<T[P], UsersGroupByOutputType[P]>
        }
      >
    >


  export type usersSelect<ExtArgs extends $Extensions.InternacionalalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    email?: boolean
    password_hash?: boolean
    role?: boolean
    created_at?: boolean
    bank_movements?: boolean | users$bank_movementsArgs<ExtArgs>
    obligation_documents?: boolean | users$obligation_documentsArgs<ExtArgs>
    _count?: boolean | UsersCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["users"]>

  export type usersSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternacionalalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    email?: boolean
    password_hash?: boolean
    role?: boolean
    created_at?: boolean
  }, ExtArgs["result"]["users"]>

  export type usersSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternacionalalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    email?: boolean
    password_hash?: boolean
    role?: boolean
    created_at?: boolean
  }, ExtArgs["result"]["users"]>

  export type usersSelectScalar = {
    id?: boolean
    name?: boolean
    email?: boolean
    password_hash?: boolean
    role?: boolean
    created_at?: boolean
  }

  export type usersOmit<ExtArgs extends $Extensions.InternacionalalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "email" | "password_hash" | "role" | "created_at", ExtArgs["result"]["users"]>
  export type usersInclude<ExtArgs extends $Extensions.InternacionalalArgs = $Extensions.DefaultArgs> = {
    bank_movements?: boolean | users$bank_movementsArgs<ExtArgs>
    obligation_documents?: boolean | users$obligation_documentsArgs<ExtArgs>
    _count?: boolean | UsersCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type usersIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternacionalalArgs = $Extensions.DefaultArgs> = {}
  export type usersIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternacionalalArgs = $Extensions.DefaultArgs> = {}

  export type $usersPayload<ExtArgs extends $Extensions.InternacionalalArgs = $Extensions.DefaultArgs> = {
    name: "users"
    objects: {
      bank_movements: Prisma.$bank_movementsPayload<ExtArgs>[]
      obligation_documents: Prisma.$obligation_documentsPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: bigint
      name: string
      email: string
      password_hash: string
      role: string
      created_at: Date
    }, ExtArgs["result"]["users"]>
    composites: {}
  }

  type usersGetPayload<S extends boolean | null | undefined | usersDefaultArgs> = $Result.GetResult<Prisma.$usersPayload, S>

  type usersCountArgs<ExtArgs extends $Extensions.InternacionalalArgs = $Extensions.DefaultArgs> =
    Omit<usersFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UsersCountAggregateInputType | true
    }

  export interface usersDelegate<ExtArgs extends $Extensions.InternacionalalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['users'], meta: { name: 'users' } }
    /**
     * Find zero or one Users that matches the filter.
     * @param {usersFindUniqueArgs} args - Arguments to find a Users
     * @example
     * // Get one Users
     * const users = await prisma.users.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends usersFindUniqueArgs>(args: SelectSubset<T, usersFindUniqueArgs<ExtArgs>>): Prisma__usersClient<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Users that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {usersFindUniqueOrThrowArgs} args - Arguments to find a Users
     * @example
     * // Get one Users
     * const users = await prisma.users.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends usersFindUniqueOrThrowArgs>(args: SelectSubset<T, usersFindUniqueOrThrowArgs<ExtArgs>>): Prisma__usersClient<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {usersFindFirstArgs} args - Arguments to find a Users
     * @example
     * // Get one Users
     * const users = await prisma.users.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends usersFindFirstArgs>(args?: SelectSubset<T, usersFindFirstArgs<ExtArgs>>): Prisma__usersClient<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Users that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {usersFindFirstOrThrowArgs} args - Arguments to find a Users
     * @example
     * // Get one Users
     * const users = await prisma.users.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends usersFindFirstOrThrowArgs>(args?: SelectSubset<T, usersFindFirstOrThrowArgs<ExtArgs>>): Prisma__usersClient<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {usersFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.users.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.users.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const usersWithIdOnly = await prisma.users.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends usersFindManyArgs>(args?: SelectSubset<T, usersFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Users.
     * @param {usersCreateArgs} args - Arguments to create a Users.
     * @example
     * // Create one Users
     * const Users = await prisma.users.create({
     *   data: {
     *     // ... data to create a Users
     *   }
     * })
     * 
     */
    create<T extends usersCreateArgs>(args: SelectSubset<T, usersCreateArgs<ExtArgs>>): Prisma__usersClient<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Users.
     * @param {usersCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const users = await prisma.users.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends usersCreateManyArgs>(args?: SelectSubset<T, usersCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Users and returns the data saved in the database.
     * @param {usersCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const users = await prisma.users.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Users and only return the `id`
     * const usersWithIdOnly = await prisma.users.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends usersCreateManyAndReturnArgs>(args?: SelectSubset<T, usersCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Users.
     * @param {usersDeleteArgs} args - Arguments to delete one Users.
     * @example
     * // Delete one Users
     * const Users = await prisma.users.delete({
     *   where: {
     *     // ... filter to delete one Users
     *   }
     * })
     * 
     */
    delete<T extends usersDeleteArgs>(args: SelectSubset<T, usersDeleteArgs<ExtArgs>>): Prisma__usersClient<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Users.
     * @param {usersUpdateArgs} args - Arguments to update one Users.
     * @example
     * // Update one Users
     * const users = await prisma.users.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends usersUpdateArgs>(args: SelectSubset<T, usersUpdateArgs<ExtArgs>>): Prisma__usersClient<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Users.
     * @param {usersDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.users.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends usersDeleteManyArgs>(args?: SelectSubset<T, usersDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {usersUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const users = await prisma.users.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends usersUpdateManyArgs>(args: SelectSubset<T, usersUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users and returns the data updated in the database.
     * @param {usersUpdateManyAndReturnArgs} args - Arguments to update many Users.
     * @example
     * // Update many Users
     * const users = await prisma.users.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Users and only return the `id`
     * const usersWithIdOnly = await prisma.users.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends usersUpdateManyAndReturnArgs>(args: SelectSubset<T, usersUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Users.
     * @param {usersUpsertArgs} args - Arguments to update or create a Users.
     * @example
     * // Update or create a Users
     * const users = await prisma.users.upsert({
     *   create: {
     *     // ... data to create a Users
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Users we want to update
     *   }
     * })
     */
    upsert<T extends usersUpsertArgs>(args: SelectSubset<T, usersUpsertArgs<ExtArgs>>): Prisma__usersClient<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {usersCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.users.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends usersCountArgs>(
      args?: Subset<T, usersCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UsersCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UsersAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UsersAggregateArgs>(args: Subset<T, UsersAggregateArgs>): Prisma.PrismaPromise<GetUsersAggregateType<T>>

    /**
     * Group by Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {usersGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends usersGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: usersGroupByArgs['orderBy'] }
        : { orderBy?: usersGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, usersGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUsersGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the users model
   */
  readonly fields: usersFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for users.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__usersClient<T, Null = never, ExtArgs extends $Extensions.InternacionalalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    bank_movements<T extends users$bank_movementsArgs<ExtArgs> = {}>(args?: Subset<T, users$bank_movementsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$bank_movementsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    obligation_documents<T extends users$obligation_documentsArgs<ExtArgs> = {}>(args?: Subset<T, users$obligation_documentsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$obligation_documentsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the users model
   */
  interface usersFieldRefs {
    readonly id: FieldRef<"users", 'BigInt'>
    readonly name: FieldRef<"users", 'String'>
    readonly email: FieldRef<"users", 'String'>
    readonly password_hash: FieldRef<"users", 'String'>
    readonly role: FieldRef<"users", 'String'>
    readonly created_at: FieldRef<"users", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * users findUnique
   */
  export type usersFindUniqueArgs<ExtArgs extends $Extensions.InternacionalalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the users
     */
    omit?: usersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: usersInclude<ExtArgs> | null
    /**
     * Filter, which users to fetch.
     */
    where: usersWhereUniqueInput
  }

  /**
   * users findUniqueOrThrow
   */
  export type usersFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternacionalalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the users
     */
    omit?: usersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: usersInclude<ExtArgs> | null
    /**
     * Filter, which users to fetch.
     */
    where: usersWhereUniqueInput
  }

  /**
   * users findFirst
   */
  export type usersFindFirstArgs<ExtArgs extends $Extensions.InternacionalalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the users
     */
    omit?: usersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: usersInclude<ExtArgs> | null
    /**
     * Filter, which users to fetch.
     */
    where?: usersWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of users to fetch.
     */
    orderBy?: usersOrderByWithRelationInput | usersOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for users.
     */
    cursor?: usersWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of users.
     */
    distinct?: UsersScalarFieldEnum | UsersScalarFieldEnum[]
  }

  /**
   * users findFirstOrThrow
   */
  export type usersFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternacionalalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the users
     */
    omit?: usersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: usersInclude<ExtArgs> | null
    /**
     * Filter, which users to fetch.
     */
    where?: usersWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of users to fetch.
     */
    orderBy?: usersOrderByWithRelationInput | usersOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for users.
     */
    cursor?: usersWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of users.
     */
    distinct?: UsersScalarFieldEnum | UsersScalarFieldEnum[]
  }

  /**
   * users findMany
   */
  export type usersFindManyArgs<ExtArgs extends $Extensions.InternacionalalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the users
     */
    omit?: usersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: usersInclude<ExtArgs> | null
    /**
     * Filter, which users to fetch.
     */
    where?: usersWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of users to fetch.
     */
    orderBy?: usersOrderByWithRelationInput | usersOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing users.
     */
    cursor?: usersWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` users.
     */
    skip?: number
    distinct?: UsersScalarFieldEnum | UsersScalarFieldEnum[]
  }

  /**
   * users create
   */
  export type usersCreateArgs<ExtArgs extends $Extensions.InternacionalalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the users
     */
    omit?: usersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: usersInclude<ExtArgs> | null
    /**
     * The data needed to create a users.
     */
    data: XOR<usersCreateInput, usersUncheckedCreateInput>
  }

  /**
   * users createMany
   */
  export type usersCreateManyArgs<ExtArgs extends $Extensions.InternacionalalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many users.
     */
    data: usersCreateManyInput | usersCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * users createManyAndReturn
   */
  export type usersCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternacionalalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the users
     */
    omit?: usersOmit<ExtArgs> | null
    /**
     * The data used to create many users.
     */
    data: usersCreateManyInput | usersCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * users update
   */
  export type usersUpdateArgs<ExtArgs extends $Extensions.InternacionalalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the users
     */
    omit?: usersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: usersInclude<ExtArgs> | null
    /**
     * The data needed to update a users.
     */
    data: XOR<usersUpdateInput, usersUncheckedUpdateInput>
    /**
     * Choose, which users to update.
     */
    where: usersWhereUniqueInput
  }

  /**
   * users updateMany
   */
  export type usersUpdateManyArgs<ExtArgs extends $Extensions.InternacionalalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update users.
     */
    data: XOR<usersUpdateManyMutationInput, usersUncheckedUpdateManyInput>
    /**
     * Filter which users to update
     */
    where?: usersWhereInput
    /**
     * Limit how many users to update.
     */
    limit?: number
  }

  /**
   * users updateManyAndReturn
   */
  export type usersUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternacionalalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the users
     */
    omit?: usersOmit<ExtArgs> | null
    /**
     * The data used to update users.
     */
    data: XOR<usersUpdateManyMutationInput, usersUncheckedUpdateManyInput>
    /**
     * Filter which users to update
     */
    where?: usersWhereInput
    /**
     * Limit how many users to update.
     */
    limit?: number
  }

  /**
   * users upsert
   */
  export type usersUpsertArgs<ExtArgs extends $Extensions.InternacionalalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the users
     */
    omit?: usersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: usersInclude<ExtArgs> | null
    /**
     * The filter to search for the users to update in case it exists.
     */
    where: usersWhereUniqueInput
    /**
     * In case the users found by the `where` argument doesn't exist, create a new users with this data.
     */
    create: XOR<usersCreateInput, usersUncheckedCreateInput>
    /**
     * In case the users was found with the provided `where` argument, update it with this data.
     */
    update: XOR<usersUpdateInput, usersUncheckedUpdateInput>
  }

  /**
   * users delete
   */
  export type usersDeleteArgs<ExtArgs extends $Extensions.InternacionalalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the users
     */
    omit?: usersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: usersInclude<ExtArgs> | null
    /**
     * Filter which users to delete.
     */
    where: usersWhereUniqueInput
  }

  /**
   * users deleteMany
   */
  export type usersDeleteManyArgs<ExtArgs extends $Extensions.InternacionalalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which users to delete
     */
    where?: usersWhereInput
    /**
     * Limit how many users to delete.
     */
    limit?: number
  }

  /**
   * users.bank_movements
   */
  export type users$bank_movementsArgs<ExtArgs extends $Extensions.InternacionalalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the bank_movements
     */
    select?: bank_movementsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the bank_movements
     */
    omit?: bank_movementsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: bank_movementsInclude<ExtArgs> | null
    where?: bank_movementsWhereInput
    orderBy?: bank_movementsOrderByWithRelationInput | bank_movementsOrderByWithRelationInput[]
    cursor?: bank_movementsWhereUniqueInput
    take?: number
    skip?: number
    distinct?: Bank_movementsScalarFieldEnum | Bank_movementsScalarFieldEnum[]
  }

  /**
   * users.obligation_documents
   */
  export type users$obligation_documentsArgs<ExtArgs extends $Extensions.InternacionalalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the obligation_documents
     */
    select?: obligation_documentsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the obligation_documents
     */
    omit?: obligation_documentsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: obligation_documentsInclude<ExtArgs> | null
    where?: obligation_documentsWhereInput
    orderBy?: obligation_documentsOrderByWithRelationInput | obligation_documentsOrderByWithRelationInput[]
    cursor?: obligation_documentsWhereUniqueInput
    take?: number
    skip?: number
    distinct?: Obligation_documentsScalarFieldEnum | Obligation_documentsScalarFieldEnum[]
  }

  /**
   * users without action
   */
  export type usersDefaultArgs<ExtArgs extends $Extensions.InternacionalalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the users
     */
    omit?: usersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: usersInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const Bank_accountsScalarFieldEnum: {
    id: 'id',
    company_id: 'company_id',
    bank_name: 'bank_name',
    account_no: 'account_no',
    currency: 'currency',
    created_at: 'created_at'
  };

  export type Bank_accountsScalarFieldEnum = (typeof Bank_accountsScalarFieldEnum)[keyof typeof Bank_accountsScalarFieldEnum]


  export const Bank_movementsScalarFieldEnum: {
    id: 'id',
    bank_account_id: 'bank_account_id',
    project_id: 'project_id',
    bank_date: 'bank_date',
    description: 'description',
    debit: 'debit',
    credit: 'credit',
    currency: 'currency',
    exchange_rate_date: 'exchange_rate_date',
    source: 'source',
    sub_account_id: 'sub_account_id',
    created_by: 'created_by',
    import_date: 'import_date'
  };

  export type Bank_movementsScalarFieldEnum = (typeof Bank_movementsScalarFieldEnum)[keyof typeof Bank_movementsScalarFieldEnum]


  export const CompaniesScalarFieldEnum: {
    id: 'id',
    name: 'name',
    rut: 'rut',
    address: 'address',
    created_at: 'created_at'
  };

  export type CompaniesScalarFieldEnum = (typeof CompaniesScalarFieldEnum)[keyof typeof CompaniesScalarFieldEnum]


  export const Cost_centersScalarFieldEnum: {
    id: 'id',
    code: 'code',
    name: 'name',
    parent_id: 'parent_id'
  };

  export type Cost_centersScalarFieldEnum = (typeof Cost_centersScalarFieldEnum)[keyof typeof Cost_centersScalarFieldEnum]


  export const CreditsScalarFieldEnum: {
    id: 'id',
    obligation_id: 'obligation_id',
    interest_rate_pct: 'interest_rate_pct',
    start_date: 'start_date',
    end_date: 'end_date',
    amortization_scheme: 'amortization_scheme',
    last_calculated: 'last_calculated'
  };

  export type CreditsScalarFieldEnum = (typeof CreditsScalarFieldEnum)[keyof typeof CreditsScalarFieldEnum]


  export const Movement_matchesScalarFieldEnum: {
    movement_id: 'movement_id',
    obligation_id: 'obligation_id',
    matched_amount: 'matched_amount'
  };

  export type Movement_matchesScalarFieldEnum = (typeof Movement_matchesScalarFieldEnum)[keyof typeof Movement_matchesScalarFieldEnum]


  export const Obligation_documentsScalarFieldEnum: {
    id: 'id',
    obligation_id: 'obligation_id',
    file_name: 'file_name',
    file_path: 'file_path',
    uploaded_by: 'uploaded_by',
    uploaded_at: 'uploaded_at'
  };

  export type Obligation_documentsScalarFieldEnum = (typeof Obligation_documentsScalarFieldEnum)[keyof typeof Obligation_documentsScalarFieldEnum]


  export const Obligation_typesScalarFieldEnum: {
    id: 'id',
    name: 'name',
    description: 'description'
  };

  export type Obligation_typesScalarFieldEnum = (typeof Obligation_typesScalarFieldEnum)[keyof typeof Obligation_typesScalarFieldEnum]


  export const ObligationsScalarFieldEnum: {
    id: 'id',
    project_id: 'project_id',
    type_id: 'type_id',
    description: 'description',
    amount_original: 'amount_original',
    currency: 'currency',
    exchange_rate_date: 'exchange_rate_date',
    due_date: 'due_date',
    status: 'status',
    created_at: 'created_at'
  };

  export type ObligationsScalarFieldEnum = (typeof ObligationsScalarFieldEnum)[keyof typeof ObligationsScalarFieldEnum]


  export const ProjectsScalarFieldEnum: {
    id: 'id',
    company_id: 'company_id',
    code: 'code',
    name: 'name',
    created_at: 'created_at'
  };

  export type ProjectsScalarFieldEnum = (typeof ProjectsScalarFieldEnum)[keyof typeof ProjectsScalarFieldEnum]


  export const Sub_accountsScalarFieldEnum: {
    id: 'id',
    cost_center_id: 'cost_center_id',
    code: 'code',
    name: 'name'
  };

  export type Sub_accountsScalarFieldEnum = (typeof Sub_accountsScalarFieldEnum)[keyof typeof Sub_accountsScalarFieldEnum]


  export const Uf_ratesScalarFieldEnum: {
    date: 'date',
    uf_value: 'uf_value'
  };

  export type Uf_ratesScalarFieldEnum = (typeof Uf_ratesScalarFieldEnum)[keyof typeof Uf_ratesScalarFieldEnum]


  export const UsersScalarFieldEnum: {
    id: 'id',
    name: 'name',
    email: 'email',
    password_hash: 'password_hash',
    role: 'role',
    created_at: 'created_at'
  };

  export type UsersScalarFieldEnum = (typeof UsersScalarFieldEnum)[keyof typeof UsersScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'BigInt'
   */
  export type BigIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'BigInt'>
    


  /**
   * Reference to a field of type 'BigInt[]'
   */
  export type ListBigIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'BigInt[]'>
    


  /**
   * Reference to a field of type 'Decimal'
   */
  export type DecimalFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Decimal'>
    


  /**
   * Reference to a field of type 'Decimal[]'
   */
  export type ListDecimalFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Decimal[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    
  /**
   * Deep Input Types
   */


  export type bank_accountsWhereInput = {
    AND?: bank_accountsWhereInput | bank_accountsWhereInput[]
    OR?: bank_accountsWhereInput[]
    NOT?: bank_accountsWhereInput | bank_accountsWhereInput[]
    id?: IntFilter<"bank_accounts"> | number
    company_id?: IntFilter<"bank_accounts"> | number
    bank_name?: StringFilter<"bank_accounts"> | string
    account_no?: StringFilter<"bank_accounts"> | string
    currency?: StringFilter<"bank_accounts"> | string
    created_at?: DateTimeFilter<"bank_accounts"> | Date | string
    companies?: XOR<CompaniesScalarRelationFilter, companiesWhereInput>
    bank_movements?: Bank_movementsListRelationFilter
  }

  export type bank_accountsOrderByWithRelationInput = {
    id?: SortOrder
    company_id?: SortOrder
    bank_name?: SortOrder
    account_no?: SortOrder
    currency?: SortOrder
    created_at?: SortOrder
    companies?: companiesOrderByWithRelationInput
    bank_movements?: bank_movementsOrderByRelationAggregateInput
  }

  export type bank_accountsWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    company_id_account_no?: bank_accountsCompany_idAccount_noCompoundUniqueInput
    AND?: bank_accountsWhereInput | bank_accountsWhereInput[]
    OR?: bank_accountsWhereInput[]
    NOT?: bank_accountsWhereInput | bank_accountsWhereInput[]
    company_id?: IntFilter<"bank_accounts"> | number
    bank_name?: StringFilter<"bank_accounts"> | string
    account_no?: StringFilter<"bank_accounts"> | string
    currency?: StringFilter<"bank_accounts"> | string
    created_at?: DateTimeFilter<"bank_accounts"> | Date | string
    companies?: XOR<CompaniesScalarRelationFilter, companiesWhereInput>
    bank_movements?: Bank_movementsListRelationFilter
  }, "id" | "company_id_account_no">

  export type bank_accountsOrderByWithAggregationInput = {
    id?: SortOrder
    company_id?: SortOrder
    bank_name?: SortOrder
    account_no?: SortOrder
    currency?: SortOrder
    created_at?: SortOrder
    _count?: bank_accountsCountOrderByAggregateInput
    _avg?: bank_accountsAvgOrderByAggregateInput
    _max?: bank_accountsMaxOrderByAggregateInput
    _min?: bank_accountsMinOrderByAggregateInput
    _sum?: bank_accountsSumOrderByAggregateInput
  }

  export type bank_accountsScalarWhereWithAggregatesInput = {
    AND?: bank_accountsScalarWhereWithAggregatesInput | bank_accountsScalarWhereWithAggregatesInput[]
    OR?: bank_accountsScalarWhereWithAggregatesInput[]
    NOT?: bank_accountsScalarWhereWithAggregatesInput | bank_accountsScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"bank_accounts"> | number
    company_id?: IntWithAggregatesFilter<"bank_accounts"> | number
    bank_name?: StringWithAggregatesFilter<"bank_accounts"> | string
    account_no?: StringWithAggregatesFilter<"bank_accounts"> | string
    currency?: StringWithAggregatesFilter<"bank_accounts"> | string
    created_at?: DateTimeWithAggregatesFilter<"bank_accounts"> | Date | string
  }

  export type bank_movementsWhereInput = {
    AND?: bank_movementsWhereInput | bank_movementsWhereInput[]
    OR?: bank_movementsWhereInput[]
    NOT?: bank_movementsWhereInput | bank_movementsWhereInput[]
    id?: BigIntFilter<"bank_movements"> | bigint | number
    bank_account_id?: IntFilter<"bank_movements"> | number
    project_id?: IntNullableFilter<"bank_movements"> | number | null
    bank_date?: DateTimeFilter<"bank_movements"> | Date | string
    description?: StringNullableFilter<"bank_movements"> | string | null
    debit?: DecimalNullableFilter<"bank_movements"> | Decimal | DecimalJsLike | number | string | null
    credit?: DecimalNullableFilter<"bank_movements"> | Decimal | DecimalJsLike | number | string | null
    currency?: StringFilter<"bank_movements"> | string
    exchange_rate_date?: DateTimeNullableFilter<"bank_movements"> | Date | string | null
    source?: StringFilter<"bank_movements"> | string
    sub_account_id?: IntFilter<"bank_movements"> | number
    created_by?: BigIntNullableFilter<"bank_movements"> | bigint | number | null
    import_date?: DateTimeFilter<"bank_movements"> | Date | string
    bank_accounts?: XOR<Bank_accountsScalarRelationFilter, bank_accountsWhereInput>
    users?: XOR<UsersNullableScalarRelationFilter, usersWhereInput> | null
    projects?: XOR<ProjectsNullableScalarRelationFilter, projectsWhereInput> | null
    sub_accounts?: XOR<Sub_accountsScalarRelationFilter, sub_accountsWhereInput>
    movement_matches?: Movement_matchesListRelationFilter
  }

  export type bank_movementsOrderByWithRelationInput = {
    id?: SortOrder
    bank_account_id?: SortOrder
    project_id?: SortOrderInput | SortOrder
    bank_date?: SortOrder
    description?: SortOrderInput | SortOrder
    debit?: SortOrderInput | SortOrder
    credit?: SortOrderInput | SortOrder
    currency?: SortOrder
    exchange_rate_date?: SortOrderInput | SortOrder
    source?: SortOrder
    sub_account_id?: SortOrder
    created_by?: SortOrderInput | SortOrder
    import_date?: SortOrder
    bank_accounts?: bank_accountsOrderByWithRelationInput
    users?: usersOrderByWithRelationInput
    projects?: projectsOrderByWithRelationInput
    sub_accounts?: sub_accountsOrderByWithRelationInput
    movement_matches?: movement_matchesOrderByRelationAggregateInput
  }

  export type bank_movementsWhereUniqueInput = Prisma.AtLeast<{
    id?: bigint | number
    AND?: bank_movementsWhereInput | bank_movementsWhereInput[]
    OR?: bank_movementsWhereInput[]
    NOT?: bank_movementsWhereInput | bank_movementsWhereInput[]
    bank_account_id?: IntFilter<"bank_movements"> | number
    project_id?: IntNullableFilter<"bank_movements"> | number | null
    bank_date?: DateTimeFilter<"bank_movements"> | Date | string
    description?: StringNullableFilter<"bank_movements"> | string | null
    debit?: DecimalNullableFilter<"bank_movements"> | Decimal | DecimalJsLike | number | string | null
    credit?: DecimalNullableFilter<"bank_movements"> | Decimal | DecimalJsLike | number | string | null
    currency?: StringFilter<"bank_movements"> | string
    exchange_rate_date?: DateTimeNullableFilter<"bank_movements"> | Date | string | null
    source?: StringFilter<"bank_movements"> | string
    sub_account_id?: IntFilter<"bank_movements"> | number
    created_by?: BigIntNullableFilter<"bank_movements"> | bigint | number | null
    import_date?: DateTimeFilter<"bank_movements"> | Date | string
    bank_accounts?: XOR<Bank_accountsScalarRelationFilter, bank_accountsWhereInput>
    users?: XOR<UsersNullableScalarRelationFilter, usersWhereInput> | null
    projects?: XOR<ProjectsNullableScalarRelationFilter, projectsWhereInput> | null
    sub_accounts?: XOR<Sub_accountsScalarRelationFilter, sub_accountsWhereInput>
    movement_matches?: Movement_matchesListRelationFilter
  }, "id">

  export type bank_movementsOrderByWithAggregationInput = {
    id?: SortOrder
    bank_account_id?: SortOrder
    project_id?: SortOrderInput | SortOrder
    bank_date?: SortOrder
    description?: SortOrderInput | SortOrder
    debit?: SortOrderInput | SortOrder
    credit?: SortOrderInput | SortOrder
    currency?: SortOrder
    exchange_rate_date?: SortOrderInput | SortOrder
    source?: SortOrder
    sub_account_id?: SortOrder
    created_by?: SortOrderInput | SortOrder
    import_date?: SortOrder
    _count?: bank_movementsCountOrderByAggregateInput
    _avg?: bank_movementsAvgOrderByAggregateInput
    _max?: bank_movementsMaxOrderByAggregateInput
    _min?: bank_movementsMinOrderByAggregateInput
    _sum?: bank_movementsSumOrderByAggregateInput
  }

  export type bank_movementsScalarWhereWithAggregatesInput = {
    AND?: bank_movementsScalarWhereWithAggregatesInput | bank_movementsScalarWhereWithAggregatesInput[]
    OR?: bank_movementsScalarWhereWithAggregatesInput[]
    NOT?: bank_movementsScalarWhereWithAggregatesInput | bank_movementsScalarWhereWithAggregatesInput[]
    id?: BigIntWithAggregatesFilter<"bank_movements"> | bigint | number
    bank_account_id?: IntWithAggregatesFilter<"bank_movements"> | number
    project_id?: IntNullableWithAggregatesFilter<"bank_movements"> | number | null
    bank_date?: DateTimeWithAggregatesFilter<"bank_movements"> | Date | string
    description?: StringNullableWithAggregatesFilter<"bank_movements"> | string | null
    debit?: DecimalNullableWithAggregatesFilter<"bank_movements"> | Decimal | DecimalJsLike | number | string | null
    credit?: DecimalNullableWithAggregatesFilter<"bank_movements"> | Decimal | DecimalJsLike | number | string | null
    currency?: StringWithAggregatesFilter<"bank_movements"> | string
    exchange_rate_date?: DateTimeNullableWithAggregatesFilter<"bank_movements"> | Date | string | null
    source?: StringWithAggregatesFilter<"bank_movements"> | string
    sub_account_id?: IntWithAggregatesFilter<"bank_movements"> | number
    created_by?: BigIntNullableWithAggregatesFilter<"bank_movements"> | bigint | number | null
    import_date?: DateTimeWithAggregatesFilter<"bank_movements"> | Date | string
  }

  export type companiesWhereInput = {
    AND?: companiesWhereInput | companiesWhereInput[]
    OR?: companiesWhereInput[]
    NOT?: companiesWhereInput | companiesWhereInput[]
    id?: IntFilter<"companies"> | number
    name?: StringFilter<"companies"> | string
    rut?: StringNullableFilter<"companies"> | string | null
    address?: StringNullableFilter<"companies"> | string | null
    created_at?: DateTimeFilter<"companies"> | Date | string
    bank_accounts?: Bank_accountsListRelationFilter
    projects?: ProjectsListRelationFilter
  }

  export type companiesOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    rut?: SortOrderInput | SortOrder
    address?: SortOrderInput | SortOrder
    created_at?: SortOrder
    bank_accounts?: bank_accountsOrderByRelationAggregateInput
    projects?: projectsOrderByRelationAggregateInput
  }

  export type companiesWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    name?: string
    AND?: companiesWhereInput | companiesWhereInput[]
    OR?: companiesWhereInput[]
    NOT?: companiesWhereInput | companiesWhereInput[]
    rut?: StringNullableFilter<"companies"> | string | null
    address?: StringNullableFilter<"companies"> | string | null
    created_at?: DateTimeFilter<"companies"> | Date | string
    bank_accounts?: Bank_accountsListRelationFilter
    projects?: ProjectsListRelationFilter
  }, "id" | "name">

  export type companiesOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    rut?: SortOrderInput | SortOrder
    address?: SortOrderInput | SortOrder
    created_at?: SortOrder
    _count?: companiesCountOrderByAggregateInput
    _avg?: companiesAvgOrderByAggregateInput
    _max?: companiesMaxOrderByAggregateInput
    _min?: companiesMinOrderByAggregateInput
    _sum?: companiesSumOrderByAggregateInput
  }

  export type companiesScalarWhereWithAggregatesInput = {
    AND?: companiesScalarWhereWithAggregatesInput | companiesScalarWhereWithAggregatesInput[]
    OR?: companiesScalarWhereWithAggregatesInput[]
    NOT?: companiesScalarWhereWithAggregatesInput | companiesScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"companies"> | number
    name?: StringWithAggregatesFilter<"companies"> | string
    rut?: StringNullableWithAggregatesFilter<"companies"> | string | null
    address?: StringNullableWithAggregatesFilter<"companies"> | string | null
    created_at?: DateTimeWithAggregatesFilter<"companies"> | Date | string
  }

  export type cost_centersWhereInput = {
    AND?: cost_centersWhereInput | cost_centersWhereInput[]
    OR?: cost_centersWhereInput[]
    NOT?: cost_centersWhereInput | cost_centersWhereInput[]
    id?: IntFilter<"cost_centers"> | number
    code?: StringFilter<"cost_centers"> | string
    name?: StringFilter<"cost_centers"> | string
    parent_id?: IntNullableFilter<"cost_centers"> | number | null
    cost_centers?: XOR<Cost_centersNullableScalarRelationFilter, cost_centersWhereInput> | null
    other_cost_centers?: Cost_centersListRelationFilter
    sub_accounts?: Sub_accountsListRelationFilter
  }

  export type cost_centersOrderByWithRelationInput = {
    id?: SortOrder
    code?: SortOrder
    name?: SortOrder
    parent_id?: SortOrderInput | SortOrder
    cost_centers?: cost_centersOrderByWithRelationInput
    other_cost_centers?: cost_centersOrderByRelationAggregateInput
    sub_accounts?: sub_accountsOrderByRelationAggregateInput
  }

  export type cost_centersWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    code?: string
    AND?: cost_centersWhereInput | cost_centersWhereInput[]
    OR?: cost_centersWhereInput[]
    NOT?: cost_centersWhereInput | cost_centersWhereInput[]
    name?: StringFilter<"cost_centers"> | string
    parent_id?: IntNullableFilter<"cost_centers"> | number | null
    cost_centers?: XOR<Cost_centersNullableScalarRelationFilter, cost_centersWhereInput> | null
    other_cost_centers?: Cost_centersListRelationFilter
    sub_accounts?: Sub_accountsListRelationFilter
  }, "id" | "code">

  export type cost_centersOrderByWithAggregationInput = {
    id?: SortOrder
    code?: SortOrder
    name?: SortOrder
    parent_id?: SortOrderInput | SortOrder
    _count?: cost_centersCountOrderByAggregateInput
    _avg?: cost_centersAvgOrderByAggregateInput
    _max?: cost_centersMaxOrderByAggregateInput
    _min?: cost_centersMinOrderByAggregateInput
    _sum?: cost_centersSumOrderByAggregateInput
  }

  export type cost_centersScalarWhereWithAggregatesInput = {
    AND?: cost_centersScalarWhereWithAggregatesInput | cost_centersScalarWhereWithAggregatesInput[]
    OR?: cost_centersScalarWhereWithAggregatesInput[]
    NOT?: cost_centersScalarWhereWithAggregatesInput | cost_centersScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"cost_centers"> | number
    code?: StringWithAggregatesFilter<"cost_centers"> | string
    name?: StringWithAggregatesFilter<"cost_centers"> | string
    parent_id?: IntNullableWithAggregatesFilter<"cost_centers"> | number | null
  }

  export type creditsWhereInput = {
    AND?: creditsWhereInput | creditsWhereInput[]
    OR?: creditsWhereInput[]
    NOT?: creditsWhereInput | creditsWhereInput[]
    id?: BigIntFilter<"credits"> | bigint | number
    obligation_id?: BigIntFilter<"credits"> | bigint | number
    interest_rate_pct?: DecimalFilter<"credits"> | Decimal | DecimalJsLike | number | string
    start_date?: DateTimeFilter<"credits"> | Date | string
    end_date?: DateTimeNullableFilter<"credits"> | Date | string | null
    amortization_scheme?: StringNullableFilter<"credits"> | string | null
    last_calculated?: DateTimeNullableFilter<"credits"> | Date | string | null
    obligations?: XOR<ObligationsScalarRelationFilter, obligationsWhereInput>
  }

  export type creditsOrderByWithRelationInput = {
    id?: SortOrder
    obligation_id?: SortOrder
    interest_rate_pct?: SortOrder
    start_date?: SortOrder
    end_date?: SortOrderInput | SortOrder
    amortization_scheme?: SortOrderInput | SortOrder
    last_calculated?: SortOrderInput | SortOrder
    obligations?: obligationsOrderByWithRelationInput
  }

  export type creditsWhereUniqueInput = Prisma.AtLeast<{
    id?: bigint | number
    obligation_id?: bigint | number
    AND?: creditsWhereInput | creditsWhereInput[]
    OR?: creditsWhereInput[]
    NOT?: creditsWhereInput | creditsWhereInput[]
    interest_rate_pct?: DecimalFilter<"credits"> | Decimal | DecimalJsLike | number | string
    start_date?: DateTimeFilter<"credits"> | Date | string
    end_date?: DateTimeNullableFilter<"credits"> | Date | string | null
    amortization_scheme?: StringNullableFilter<"credits"> | string | null
    last_calculated?: DateTimeNullableFilter<"credits"> | Date | string | null
    obligations?: XOR<ObligationsScalarRelationFilter, obligationsWhereInput>
  }, "id" | "obligation_id">

  export type creditsOrderByWithAggregationInput = {
    id?: SortOrder
    obligation_id?: SortOrder
    interest_rate_pct?: SortOrder
    start_date?: SortOrder
    end_date?: SortOrderInput | SortOrder
    amortization_scheme?: SortOrderInput | SortOrder
    last_calculated?: SortOrderInput | SortOrder
    _count?: creditsCountOrderByAggregateInput
    _avg?: creditsAvgOrderByAggregateInput
    _max?: creditsMaxOrderByAggregateInput
    _min?: creditsMinOrderByAggregateInput
    _sum?: creditsSumOrderByAggregateInput
  }

  export type creditsScalarWhereWithAggregatesInput = {
    AND?: creditsScalarWhereWithAggregatesInput | creditsScalarWhereWithAggregatesInput[]
    OR?: creditsScalarWhereWithAggregatesInput[]
    NOT?: creditsScalarWhereWithAggregatesInput | creditsScalarWhereWithAggregatesInput[]
    id?: BigIntWithAggregatesFilter<"credits"> | bigint | number
    obligation_id?: BigIntWithAggregatesFilter<"credits"> | bigint | number
    interest_rate_pct?: DecimalWithAggregatesFilter<"credits"> | Decimal | DecimalJsLike | number | string
    start_date?: DateTimeWithAggregatesFilter<"credits"> | Date | string
    end_date?: DateTimeNullableWithAggregatesFilter<"credits"> | Date | string | null
    amortization_scheme?: StringNullableWithAggregatesFilter<"credits"> | string | null
    last_calculated?: DateTimeNullableWithAggregatesFilter<"credits"> | Date | string | null
  }

  export type movement_matchesWhereInput = {
    AND?: movement_matchesWhereInput | movement_matchesWhereInput[]
    OR?: movement_matchesWhereInput[]
    NOT?: movement_matchesWhereInput | movement_matchesWhereInput[]
    movement_id?: BigIntFilter<"movement_matches"> | bigint | number
    obligation_id?: BigIntFilter<"movement_matches"> | bigint | number
    matched_amount?: DecimalFilter<"movement_matches"> | Decimal | DecimalJsLike | number | string
    bank_movements?: XOR<Bank_movementsScalarRelationFilter, bank_movementsWhereInput>
    obligations?: XOR<ObligationsScalarRelationFilter, obligationsWhereInput>
  }

  export type movement_matchesOrderByWithRelationInput = {
    movement_id?: SortOrder
    obligation_id?: SortOrder
    matched_amount?: SortOrder
    bank_movements?: bank_movementsOrderByWithRelationInput
    obligations?: obligationsOrderByWithRelationInput
  }

  export type movement_matchesWhereUniqueInput = Prisma.AtLeast<{
    movement_id_obligation_id?: movement_matchesMovement_idObligation_idCompoundUniqueInput
    AND?: movement_matchesWhereInput | movement_matchesWhereInput[]
    OR?: movement_matchesWhereInput[]
    NOT?: movement_matchesWhereInput | movement_matchesWhereInput[]
    movement_id?: BigIntFilter<"movement_matches"> | bigint | number
    obligation_id?: BigIntFilter<"movement_matches"> | bigint | number
    matched_amount?: DecimalFilter<"movement_matches"> | Decimal | DecimalJsLike | number | string
    bank_movements?: XOR<Bank_movementsScalarRelationFilter, bank_movementsWhereInput>
    obligations?: XOR<ObligationsScalarRelationFilter, obligationsWhereInput>
  }, "movement_id_obligation_id">

  export type movement_matchesOrderByWithAggregationInput = {
    movement_id?: SortOrder
    obligation_id?: SortOrder
    matched_amount?: SortOrder
    _count?: movement_matchesCountOrderByAggregateInput
    _avg?: movement_matchesAvgOrderByAggregateInput
    _max?: movement_matchesMaxOrderByAggregateInput
    _min?: movement_matchesMinOrderByAggregateInput
    _sum?: movement_matchesSumOrderByAggregateInput
  }

  export type movement_matchesScalarWhereWithAggregatesInput = {
    AND?: movement_matchesScalarWhereWithAggregatesInput | movement_matchesScalarWhereWithAggregatesInput[]
    OR?: movement_matchesScalarWhereWithAggregatesInput[]
    NOT?: movement_matchesScalarWhereWithAggregatesInput | movement_matchesScalarWhereWithAggregatesInput[]
    movement_id?: BigIntWithAggregatesFilter<"movement_matches"> | bigint | number
    obligation_id?: BigIntWithAggregatesFilter<"movement_matches"> | bigint | number
    matched_amount?: DecimalWithAggregatesFilter<"movement_matches"> | Decimal | DecimalJsLike | number | string
  }

  export type obligation_documentsWhereInput = {
    AND?: obligation_documentsWhereInput | obligation_documentsWhereInput[]
    OR?: obligation_documentsWhereInput[]
    NOT?: obligation_documentsWhereInput | obligation_documentsWhereInput[]
    id?: IntFilter<"obligation_documents"> | number
    obligation_id?: BigIntFilter<"obligation_documents"> | bigint | number
    file_name?: StringFilter<"obligation_documents"> | string
    file_path?: StringFilter<"obligation_documents"> | string
    uploaded_by?: BigIntNullableFilter<"obligation_documents"> | bigint | number | null
    uploaded_at?: DateTimeFilter<"obligation_documents"> | Date | string
    obligations?: XOR<ObligationsScalarRelationFilter, obligationsWhereInput>
    users?: XOR<UsersNullableScalarRelationFilter, usersWhereInput> | null
  }

  export type obligation_documentsOrderByWithRelationInput = {
    id?: SortOrder
    obligation_id?: SortOrder
    file_name?: SortOrder
    file_path?: SortOrder
    uploaded_by?: SortOrderInput | SortOrder
    uploaded_at?: SortOrder
    obligations?: obligationsOrderByWithRelationInput
    users?: usersOrderByWithRelationInput
  }

  export type obligation_documentsWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: obligation_documentsWhereInput | obligation_documentsWhereInput[]
    OR?: obligation_documentsWhereInput[]
    NOT?: obligation_documentsWhereInput | obligation_documentsWhereInput[]
    obligation_id?: BigIntFilter<"obligation_documents"> | bigint | number
    file_name?: StringFilter<"obligation_documents"> | string
    file_path?: StringFilter<"obligation_documents"> | string
    uploaded_by?: BigIntNullableFilter<"obligation_documents"> | bigint | number | null
    uploaded_at?: DateTimeFilter<"obligation_documents"> | Date | string
    obligations?: XOR<ObligationsScalarRelationFilter, obligationsWhereInput>
    users?: XOR<UsersNullableScalarRelationFilter, usersWhereInput> | null
  }, "id">

  export type obligation_documentsOrderByWithAggregationInput = {
    id?: SortOrder
    obligation_id?: SortOrder
    file_name?: SortOrder
    file_path?: SortOrder
    uploaded_by?: SortOrderInput | SortOrder
    uploaded_at?: SortOrder
    _count?: obligation_documentsCountOrderByAggregateInput
    _avg?: obligation_documentsAvgOrderByAggregateInput
    _max?: obligation_documentsMaxOrderByAggregateInput
    _min?: obligation_documentsMinOrderByAggregateInput
    _sum?: obligation_documentsSumOrderByAggregateInput
  }

  export type obligation_documentsScalarWhereWithAggregatesInput = {
    AND?: obligation_documentsScalarWhereWithAggregatesInput | obligation_documentsScalarWhereWithAggregatesInput[]
    OR?: obligation_documentsScalarWhereWithAggregatesInput[]
    NOT?: obligation_documentsScalarWhereWithAggregatesInput | obligation_documentsScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"obligation_documents"> | number
    obligation_id?: BigIntWithAggregatesFilter<"obligation_documents"> | bigint | number
    file_name?: StringWithAggregatesFilter<"obligation_documents"> | string
    file_path?: StringWithAggregatesFilter<"obligation_documents"> | string
    uploaded_by?: BigIntNullableWithAggregatesFilter<"obligation_documents"> | bigint | number | null
    uploaded_at?: DateTimeWithAggregatesFilter<"obligation_documents"> | Date | string
  }

  export type obligation_typesWhereInput = {
    AND?: obligation_typesWhereInput | obligation_typesWhereInput[]
    OR?: obligation_typesWhereInput[]
    NOT?: obligation_typesWhereInput | obligation_typesWhereInput[]
    id?: IntFilter<"obligation_types"> | number
    name?: StringFilter<"obligation_types"> | string
    description?: StringNullableFilter<"obligation_types"> | string | null
    obligations?: ObligationsListRelationFilter
  }

  export type obligation_typesOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrderInput | SortOrder
    obligations?: obligationsOrderByRelationAggregateInput
  }

  export type obligation_typesWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    name?: string
    AND?: obligation_typesWhereInput | obligation_typesWhereInput[]
    OR?: obligation_typesWhereInput[]
    NOT?: obligation_typesWhereInput | obligation_typesWhereInput[]
    description?: StringNullableFilter<"obligation_types"> | string | null
    obligations?: ObligationsListRelationFilter
  }, "id" | "name">

  export type obligation_typesOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrderInput | SortOrder
    _count?: obligation_typesCountOrderByAggregateInput
    _avg?: obligation_typesAvgOrderByAggregateInput
    _max?: obligation_typesMaxOrderByAggregateInput
    _min?: obligation_typesMinOrderByAggregateInput
    _sum?: obligation_typesSumOrderByAggregateInput
  }

  export type obligation_typesScalarWhereWithAggregatesInput = {
    AND?: obligation_typesScalarWhereWithAggregatesInput | obligation_typesScalarWhereWithAggregatesInput[]
    OR?: obligation_typesScalarWhereWithAggregatesInput[]
    NOT?: obligation_typesScalarWhereWithAggregatesInput | obligation_typesScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"obligation_types"> | number
    name?: StringWithAggregatesFilter<"obligation_types"> | string
    description?: StringNullableWithAggregatesFilter<"obligation_types"> | string | null
  }

  export type obligationsWhereInput = {
    AND?: obligationsWhereInput | obligationsWhereInput[]
    OR?: obligationsWhereInput[]
    NOT?: obligationsWhereInput | obligationsWhereInput[]
    id?: BigIntFilter<"obligations"> | bigint | number
    project_id?: IntFilter<"obligations"> | number
    type_id?: IntFilter<"obligations"> | number
    description?: StringNullableFilter<"obligations"> | string | null
    amount_original?: DecimalFilter<"obligations"> | Decimal | DecimalJsLike | number | string
    currency?: StringFilter<"obligations"> | string
    exchange_rate_date?: DateTimeNullableFilter<"obligations"> | Date | string | null
    due_date?: DateTimeFilter<"obligations"> | Date | string
    status?: StringFilter<"obligations"> | string
    created_at?: DateTimeFilter<"obligations"> | Date | string
    credits?: XOR<CreditsNullableScalarRelationFilter, creditsWhereInput> | null
    movement_matches?: Movement_matchesListRelationFilter
    obligation_documents?: Obligation_documentsListRelationFilter
    projects?: XOR<ProjectsScalarRelationFilter, projectsWhereInput>
    obligation_types?: XOR<Obligation_typesScalarRelationFilter, obligation_typesWhereInput>
  }

  export type obligationsOrderByWithRelationInput = {
    id?: SortOrder
    project_id?: SortOrder
    type_id?: SortOrder
    description?: SortOrderInput | SortOrder
    amount_original?: SortOrder
    currency?: SortOrder
    exchange_rate_date?: SortOrderInput | SortOrder
    due_date?: SortOrder
    status?: SortOrder
    created_at?: SortOrder
    credits?: creditsOrderByWithRelationInput
    movement_matches?: movement_matchesOrderByRelationAggregateInput
    obligation_documents?: obligation_documentsOrderByRelationAggregateInput
    projects?: projectsOrderByWithRelationInput
    obligation_types?: obligation_typesOrderByWithRelationInput
  }

  export type obligationsWhereUniqueInput = Prisma.AtLeast<{
    id?: bigint | number
    AND?: obligationsWhereInput | obligationsWhereInput[]
    OR?: obligationsWhereInput[]
    NOT?: obligationsWhereInput | obligationsWhereInput[]
    project_id?: IntFilter<"obligations"> | number
    type_id?: IntFilter<"obligations"> | number
    description?: StringNullableFilter<"obligations"> | string | null
    amount_original?: DecimalFilter<"obligations"> | Decimal | DecimalJsLike | number | string
    currency?: StringFilter<"obligations"> | string
    exchange_rate_date?: DateTimeNullableFilter<"obligations"> | Date | string | null
    due_date?: DateTimeFilter<"obligations"> | Date | string
    status?: StringFilter<"obligations"> | string
    created_at?: DateTimeFilter<"obligations"> | Date | string
    credits?: XOR<CreditsNullableScalarRelationFilter, creditsWhereInput> | null
    movement_matches?: Movement_matchesListRelationFilter
    obligation_documents?: Obligation_documentsListRelationFilter
    projects?: XOR<ProjectsScalarRelationFilter, projectsWhereInput>
    obligation_types?: XOR<Obligation_typesScalarRelationFilter, obligation_typesWhereInput>
  }, "id">

  export type obligationsOrderByWithAggregationInput = {
    id?: SortOrder
    project_id?: SortOrder
    type_id?: SortOrder
    description?: SortOrderInput | SortOrder
    amount_original?: SortOrder
    currency?: SortOrder
    exchange_rate_date?: SortOrderInput | SortOrder
    due_date?: SortOrder
    status?: SortOrder
    created_at?: SortOrder
    _count?: obligationsCountOrderByAggregateInput
    _avg?: obligationsAvgOrderByAggregateInput
    _max?: obligationsMaxOrderByAggregateInput
    _min?: obligationsMinOrderByAggregateInput
    _sum?: obligationsSumOrderByAggregateInput
  }

  export type obligationsScalarWhereWithAggregatesInput = {
    AND?: obligationsScalarWhereWithAggregatesInput | obligationsScalarWhereWithAggregatesInput[]
    OR?: obligationsScalarWhereWithAggregatesInput[]
    NOT?: obligationsScalarWhereWithAggregatesInput | obligationsScalarWhereWithAggregatesInput[]
    id?: BigIntWithAggregatesFilter<"obligations"> | bigint | number
    project_id?: IntWithAggregatesFilter<"obligations"> | number
    type_id?: IntWithAggregatesFilter<"obligations"> | number
    description?: StringNullableWithAggregatesFilter<"obligations"> | string | null
    amount_original?: DecimalWithAggregatesFilter<"obligations"> | Decimal | DecimalJsLike | number | string
    currency?: StringWithAggregatesFilter<"obligations"> | string
    exchange_rate_date?: DateTimeNullableWithAggregatesFilter<"obligations"> | Date | string | null
    due_date?: DateTimeWithAggregatesFilter<"obligations"> | Date | string
    status?: StringWithAggregatesFilter<"obligations"> | string
    created_at?: DateTimeWithAggregatesFilter<"obligations"> | Date | string
  }

  export type projectsWhereInput = {
    AND?: projectsWhereInput | projectsWhereInput[]
    OR?: projectsWhereInput[]
    NOT?: projectsWhereInput | projectsWhereInput[]
    id?: IntFilter<"projects"> | number
    company_id?: IntFilter<"projects"> | number
    code?: StringFilter<"projects"> | string
    name?: StringFilter<"projects"> | string
    created_at?: DateTimeFilter<"projects"> | Date | string
    bank_movements?: Bank_movementsListRelationFilter
    obligations?: ObligationsListRelationFilter
    companies?: XOR<CompaniesScalarRelationFilter, companiesWhereInput>
  }

  export type projectsOrderByWithRelationInput = {
    id?: SortOrder
    company_id?: SortOrder
    code?: SortOrder
    name?: SortOrder
    created_at?: SortOrder
    bank_movements?: bank_movementsOrderByRelationAggregateInput
    obligations?: obligationsOrderByRelationAggregateInput
    companies?: companiesOrderByWithRelationInput
  }

  export type projectsWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    company_id_code?: projectsCompany_idCodeCompoundUniqueInput
    AND?: projectsWhereInput | projectsWhereInput[]
    OR?: projectsWhereInput[]
    NOT?: projectsWhereInput | projectsWhereInput[]
    company_id?: IntFilter<"projects"> | number
    code?: StringFilter<"projects"> | string
    name?: StringFilter<"projects"> | string
    created_at?: DateTimeFilter<"projects"> | Date | string
    bank_movements?: Bank_movementsListRelationFilter
    obligations?: ObligationsListRelationFilter
    companies?: XOR<CompaniesScalarRelationFilter, companiesWhereInput>
  }, "id" | "company_id_code">

  export type projectsOrderByWithAggregationInput = {
    id?: SortOrder
    company_id?: SortOrder
    code?: SortOrder
    name?: SortOrder
    created_at?: SortOrder
    _count?: projectsCountOrderByAggregateInput
    _avg?: projectsAvgOrderByAggregateInput
    _max?: projectsMaxOrderByAggregateInput
    _min?: projectsMinOrderByAggregateInput
    _sum?: projectsSumOrderByAggregateInput
  }

  export type projectsScalarWhereWithAggregatesInput = {
    AND?: projectsScalarWhereWithAggregatesInput | projectsScalarWhereWithAggregatesInput[]
    OR?: projectsScalarWhereWithAggregatesInput[]
    NOT?: projectsScalarWhereWithAggregatesInput | projectsScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"projects"> | number
    company_id?: IntWithAggregatesFilter<"projects"> | number
    code?: StringWithAggregatesFilter<"projects"> | string
    name?: StringWithAggregatesFilter<"projects"> | string
    created_at?: DateTimeWithAggregatesFilter<"projects"> | Date | string
  }

  export type sub_accountsWhereInput = {
    AND?: sub_accountsWhereInput | sub_accountsWhereInput[]
    OR?: sub_accountsWhereInput[]
    NOT?: sub_accountsWhereInput | sub_accountsWhereInput[]
    id?: IntFilter<"sub_accounts"> | number
    cost_center_id?: IntFilter<"sub_accounts"> | number
    code?: StringFilter<"sub_accounts"> | string
    name?: StringFilter<"sub_accounts"> | string
    bank_movements?: Bank_movementsListRelationFilter
    cost_centers?: XOR<Cost_centersScalarRelationFilter, cost_centersWhereInput>
  }

  export type sub_accountsOrderByWithRelationInput = {
    id?: SortOrder
    cost_center_id?: SortOrder
    code?: SortOrder
    name?: SortOrder
    bank_movements?: bank_movementsOrderByRelationAggregateInput
    cost_centers?: cost_centersOrderByWithRelationInput
  }

  export type sub_accountsWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    code?: string
    AND?: sub_accountsWhereInput | sub_accountsWhereInput[]
    OR?: sub_accountsWhereInput[]
    NOT?: sub_accountsWhereInput | sub_accountsWhereInput[]
    cost_center_id?: IntFilter<"sub_accounts"> | number
    name?: StringFilter<"sub_accounts"> | string
    bank_movements?: Bank_movementsListRelationFilter
    cost_centers?: XOR<Cost_centersScalarRelationFilter, cost_centersWhereInput>
  }, "id" | "code">

  export type sub_accountsOrderByWithAggregationInput = {
    id?: SortOrder
    cost_center_id?: SortOrder
    code?: SortOrder
    name?: SortOrder
    _count?: sub_accountsCountOrderByAggregateInput
    _avg?: sub_accountsAvgOrderByAggregateInput
    _max?: sub_accountsMaxOrderByAggregateInput
    _min?: sub_accountsMinOrderByAggregateInput
    _sum?: sub_accountsSumOrderByAggregateInput
  }

  export type sub_accountsScalarWhereWithAggregatesInput = {
    AND?: sub_accountsScalarWhereWithAggregatesInput | sub_accountsScalarWhereWithAggregatesInput[]
    OR?: sub_accountsScalarWhereWithAggregatesInput[]
    NOT?: sub_accountsScalarWhereWithAggregatesInput | sub_accountsScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"sub_accounts"> | number
    cost_center_id?: IntWithAggregatesFilter<"sub_accounts"> | number
    code?: StringWithAggregatesFilter<"sub_accounts"> | string
    name?: StringWithAggregatesFilter<"sub_accounts"> | string
  }

  export type uf_ratesWhereInput = {
    AND?: uf_ratesWhereInput | uf_ratesWhereInput[]
    OR?: uf_ratesWhereInput[]
    NOT?: uf_ratesWhereInput | uf_ratesWhereInput[]
    date?: DateTimeFilter<"uf_rates"> | Date | string
    uf_value?: DecimalFilter<"uf_rates"> | Decimal | DecimalJsLike | number | string
  }

  export type uf_ratesOrderByWithRelationInput = {
    date?: SortOrder
    uf_value?: SortOrder
  }

  export type uf_ratesWhereUniqueInput = Prisma.AtLeast<{
    date?: Date | string
    AND?: uf_ratesWhereInput | uf_ratesWhereInput[]
    OR?: uf_ratesWhereInput[]
    NOT?: uf_ratesWhereInput | uf_ratesWhereInput[]
    uf_value?: DecimalFilter<"uf_rates"> | Decimal | DecimalJsLike | number | string
  }, "date">

  export type uf_ratesOrderByWithAggregationInput = {
    date?: SortOrder
    uf_value?: SortOrder
    _count?: uf_ratesCountOrderByAggregateInput
    _avg?: uf_ratesAvgOrderByAggregateInput
    _max?: uf_ratesMaxOrderByAggregateInput
    _min?: uf_ratesMinOrderByAggregateInput
    _sum?: uf_ratesSumOrderByAggregateInput
  }

  export type uf_ratesScalarWhereWithAggregatesInput = {
    AND?: uf_ratesScalarWhereWithAggregatesInput | uf_ratesScalarWhereWithAggregatesInput[]
    OR?: uf_ratesScalarWhereWithAggregatesInput[]
    NOT?: uf_ratesScalarWhereWithAggregatesInput | uf_ratesScalarWhereWithAggregatesInput[]
    date?: DateTimeWithAggregatesFilter<"uf_rates"> | Date | string
    uf_value?: DecimalWithAggregatesFilter<"uf_rates"> | Decimal | DecimalJsLike | number | string
  }

  export type usersWhereInput = {
    AND?: usersWhereInput | usersWhereInput[]
    OR?: usersWhereInput[]
    NOT?: usersWhereInput | usersWhereInput[]
    id?: BigIntFilter<"users"> | bigint | number
    name?: StringFilter<"users"> | string
    email?: StringFilter<"users"> | string
    password_hash?: StringFilter<"users"> | string
    role?: StringFilter<"users"> | string
    created_at?: DateTimeFilter<"users"> | Date | string
    bank_movements?: Bank_movementsListRelationFilter
    obligation_documents?: Obligation_documentsListRelationFilter
  }

  export type usersOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    password_hash?: SortOrder
    role?: SortOrder
    created_at?: SortOrder
    bank_movements?: bank_movementsOrderByRelationAggregateInput
    obligation_documents?: obligation_documentsOrderByRelationAggregateInput
  }

  export type usersWhereUniqueInput = Prisma.AtLeast<{
    id?: bigint | number
    email?: string
    AND?: usersWhereInput | usersWhereInput[]
    OR?: usersWhereInput[]
    NOT?: usersWhereInput | usersWhereInput[]
    name?: StringFilter<"users"> | string
    password_hash?: StringFilter<"users"> | string
    role?: StringFilter<"users"> | string
    created_at?: DateTimeFilter<"users"> | Date | string
    bank_movements?: Bank_movementsListRelationFilter
    obligation_documents?: Obligation_documentsListRelationFilter
  }, "id" | "email">

  export type usersOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    password_hash?: SortOrder
    role?: SortOrder
    created_at?: SortOrder
    _count?: usersCountOrderByAggregateInput
    _avg?: usersAvgOrderByAggregateInput
    _max?: usersMaxOrderByAggregateInput
    _min?: usersMinOrderByAggregateInput
    _sum?: usersSumOrderByAggregateInput
  }

  export type usersScalarWhereWithAggregatesInput = {
    AND?: usersScalarWhereWithAggregatesInput | usersScalarWhereWithAggregatesInput[]
    OR?: usersScalarWhereWithAggregatesInput[]
    NOT?: usersScalarWhereWithAggregatesInput | usersScalarWhereWithAggregatesInput[]
    id?: BigIntWithAggregatesFilter<"users"> | bigint | number
    name?: StringWithAggregatesFilter<"users"> | string
    email?: StringWithAggregatesFilter<"users"> | string
    password_hash?: StringWithAggregatesFilter<"users"> | string
    role?: StringWithAggregatesFilter<"users"> | string
    created_at?: DateTimeWithAggregatesFilter<"users"> | Date | string
  }

  export type bank_accountsCreateInput = {
    bank_name: string
    account_no: string
    currency: string
    created_at?: Date | string
    companies: companiesCreateNestedOneWithoutBank_accountsInput
    bank_movements?: bank_movementsCreateNestedManyWithoutBank_accountsInput
  }

  export type bank_accountsUncheckedCreateInput = {
    id?: number
    company_id: number
    bank_name: string
    account_no: string
    currency: string
    created_at?: Date | string
    bank_movements?: bank_movementsUncheckedCreateNestedManyWithoutBank_accountsInput
  }

  export type bank_accountsUpdateInput = {
    bank_name?: StringFieldUpdateOperationsInput | string
    account_no?: StringFieldUpdateOperationsInput | string
    currency?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    companies?: companiesUpdateOneRequiredWithoutBank_accountsNestedInput
    bank_movements?: bank_movementsUpdateManyWithoutBank_accountsNestedInput
  }

  export type bank_accountsUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    company_id?: IntFieldUpdateOperationsInput | number
    bank_name?: StringFieldUpdateOperationsInput | string
    account_no?: StringFieldUpdateOperationsInput | string
    currency?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    bank_movements?: bank_movementsUncheckedUpdateManyWithoutBank_accountsNestedInput
  }

  export type bank_accountsCreateManyInput = {
    id?: number
    company_id: number
    bank_name: string
    account_no: string
    currency: string
    created_at?: Date | string
  }

  export type bank_accountsUpdateManyMutationInput = {
    bank_name?: StringFieldUpdateOperationsInput | string
    account_no?: StringFieldUpdateOperationsInput | string
    currency?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type bank_accountsUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    company_id?: IntFieldUpdateOperationsInput | number
    bank_name?: StringFieldUpdateOperationsInput | string
    account_no?: StringFieldUpdateOperationsInput | string
    currency?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type bank_movementsCreateInput = {
    id?: bigint | number
    bank_date: Date | string
    description?: string | null
    debit?: Decimal | DecimalJsLike | number | string | null
    credit?: Decimal | DecimalJsLike | number | string | null
    currency: string
    exchange_rate_date?: Date | string | null
    source: string
    import_date?: Date | string
    bank_accounts: bank_accountsCreateNestedOneWithoutBank_movementsInput
    users?: usersCreateNestedOneWithoutBank_movementsInput
    projects?: projectsCreateNestedOneWithoutBank_movementsInput
    sub_accounts: sub_accountsCreateNestedOneWithoutBank_movementsInput
    movement_matches?: movement_matchesCreateNestedManyWithoutBank_movementsInput
  }

  export type bank_movementsUncheckedCreateInput = {
    id?: bigint | number
    bank_account_id: number
    project_id?: number | null
    bank_date: Date | string
    description?: string | null
    debit?: Decimal | DecimalJsLike | number | string | null
    credit?: Decimal | DecimalJsLike | number | string | null
    currency: string
    exchange_rate_date?: Date | string | null
    source: string
    sub_account_id: number
    created_by?: bigint | number | null
    import_date?: Date | string
    movement_matches?: movement_matchesUncheckedCreateNestedManyWithoutBank_movementsInput
  }

  export type bank_movementsUpdateInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    bank_date?: DateTimeFieldUpdateOperationsInput | Date | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    debit?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    credit?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    currency?: StringFieldUpdateOperationsInput | string
    exchange_rate_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    source?: StringFieldUpdateOperationsInput | string
    import_date?: DateTimeFieldUpdateOperationsInput | Date | string
    bank_accounts?: bank_accountsUpdateOneRequiredWithoutBank_movementsNestedInput
    users?: usersUpdateOneWithoutBank_movementsNestedInput
    projects?: projectsUpdateOneWithoutBank_movementsNestedInput
    sub_accounts?: sub_accountsUpdateOneRequiredWithoutBank_movementsNestedInput
    movement_matches?: movement_matchesUpdateManyWithoutBank_movementsNestedInput
  }

  export type bank_movementsUncheckedUpdateInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    bank_account_id?: IntFieldUpdateOperationsInput | number
    project_id?: NullableIntFieldUpdateOperationsInput | number | null
    bank_date?: DateTimeFieldUpdateOperationsInput | Date | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    debit?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    credit?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    currency?: StringFieldUpdateOperationsInput | string
    exchange_rate_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    source?: StringFieldUpdateOperationsInput | string
    sub_account_id?: IntFieldUpdateOperationsInput | number
    created_by?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    import_date?: DateTimeFieldUpdateOperationsInput | Date | string
    movement_matches?: movement_matchesUncheckedUpdateManyWithoutBank_movementsNestedInput
  }

  export type bank_movementsCreateManyInput = {
    id?: bigint | number
    bank_account_id: number
    project_id?: number | null
    bank_date: Date | string
    description?: string | null
    debit?: Decimal | DecimalJsLike | number | string | null
    credit?: Decimal | DecimalJsLike | number | string | null
    currency: string
    exchange_rate_date?: Date | string | null
    source: string
    sub_account_id: number
    created_by?: bigint | number | null
    import_date?: Date | string
  }

  export type bank_movementsUpdateManyMutationInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    bank_date?: DateTimeFieldUpdateOperationsInput | Date | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    debit?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    credit?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    currency?: StringFieldUpdateOperationsInput | string
    exchange_rate_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    source?: StringFieldUpdateOperationsInput | string
    import_date?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type bank_movementsUncheckedUpdateManyInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    bank_account_id?: IntFieldUpdateOperationsInput | number
    project_id?: NullableIntFieldUpdateOperationsInput | number | null
    bank_date?: DateTimeFieldUpdateOperationsInput | Date | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    debit?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    credit?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    currency?: StringFieldUpdateOperationsInput | string
    exchange_rate_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    source?: StringFieldUpdateOperationsInput | string
    sub_account_id?: IntFieldUpdateOperationsInput | number
    created_by?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    import_date?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type companiesCreateInput = {
    name: string
    rut?: string | null
    address?: string | null
    created_at?: Date | string
    bank_accounts?: bank_accountsCreateNestedManyWithoutCompaniesInput
    projects?: projectsCreateNestedManyWithoutCompaniesInput
  }

  export type companiesUncheckedCreateInput = {
    id?: number
    name: string
    rut?: string | null
    address?: string | null
    created_at?: Date | string
    bank_accounts?: bank_accountsUncheckedCreateNestedManyWithoutCompaniesInput
    projects?: projectsUncheckedCreateNestedManyWithoutCompaniesInput
  }

  export type companiesUpdateInput = {
    name?: StringFieldUpdateOperationsInput | string
    rut?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    bank_accounts?: bank_accountsUpdateManyWithoutCompaniesNestedInput
    projects?: projectsUpdateManyWithoutCompaniesNestedInput
  }

  export type companiesUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    rut?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    bank_accounts?: bank_accountsUncheckedUpdateManyWithoutCompaniesNestedInput
    projects?: projectsUncheckedUpdateManyWithoutCompaniesNestedInput
  }

  export type companiesCreateManyInput = {
    id?: number
    name: string
    rut?: string | null
    address?: string | null
    created_at?: Date | string
  }

  export type companiesUpdateManyMutationInput = {
    name?: StringFieldUpdateOperationsInput | string
    rut?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type companiesUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    rut?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type cost_centersCreateInput = {
    code: string
    name: string
    cost_centers?: cost_centersCreateNestedOneWithoutOther_cost_centersInput
    other_cost_centers?: cost_centersCreateNestedManyWithoutCost_centersInput
    sub_accounts?: sub_accountsCreateNestedManyWithoutCost_centersInput
  }

  export type cost_centersUncheckedCreateInput = {
    id?: number
    code: string
    name: string
    parent_id?: number | null
    other_cost_centers?: cost_centersUncheckedCreateNestedManyWithoutCost_centersInput
    sub_accounts?: sub_accountsUncheckedCreateNestedManyWithoutCost_centersInput
  }

  export type cost_centersUpdateInput = {
    code?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    cost_centers?: cost_centersUpdateOneWithoutOther_cost_centersNestedInput
    other_cost_centers?: cost_centersUpdateManyWithoutCost_centersNestedInput
    sub_accounts?: sub_accountsUpdateManyWithoutCost_centersNestedInput
  }

  export type cost_centersUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    code?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    parent_id?: NullableIntFieldUpdateOperationsInput | number | null
    other_cost_centers?: cost_centersUncheckedUpdateManyWithoutCost_centersNestedInput
    sub_accounts?: sub_accountsUncheckedUpdateManyWithoutCost_centersNestedInput
  }

  export type cost_centersCreateManyInput = {
    id?: number
    code: string
    name: string
    parent_id?: number | null
  }

  export type cost_centersUpdateManyMutationInput = {
    code?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
  }

  export type cost_centersUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    code?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    parent_id?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type creditsCreateInput = {
    id?: bigint | number
    interest_rate_pct: Decimal | DecimalJsLike | number | string
    start_date: Date | string
    end_date?: Date | string | null
    amortization_scheme?: string | null
    last_calculated?: Date | string | null
    obligations: obligationsCreateNestedOneWithoutCreditsInput
  }

  export type creditsUncheckedCreateInput = {
    id?: bigint | number
    obligation_id: bigint | number
    interest_rate_pct: Decimal | DecimalJsLike | number | string
    start_date: Date | string
    end_date?: Date | string | null
    amortization_scheme?: string | null
    last_calculated?: Date | string | null
  }

  export type creditsUpdateInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    interest_rate_pct?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    start_date?: DateTimeFieldUpdateOperationsInput | Date | string
    end_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    amortization_scheme?: NullableStringFieldUpdateOperationsInput | string | null
    last_calculated?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    obligations?: obligationsUpdateOneRequiredWithoutCreditsNestedInput
  }

  export type creditsUncheckedUpdateInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    obligation_id?: BigIntFieldUpdateOperationsInput | bigint | number
    interest_rate_pct?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    start_date?: DateTimeFieldUpdateOperationsInput | Date | string
    end_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    amortization_scheme?: NullableStringFieldUpdateOperationsInput | string | null
    last_calculated?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type creditsCreateManyInput = {
    id?: bigint | number
    obligation_id: bigint | number
    interest_rate_pct: Decimal | DecimalJsLike | number | string
    start_date: Date | string
    end_date?: Date | string | null
    amortization_scheme?: string | null
    last_calculated?: Date | string | null
  }

  export type creditsUpdateManyMutationInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    interest_rate_pct?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    start_date?: DateTimeFieldUpdateOperationsInput | Date | string
    end_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    amortization_scheme?: NullableStringFieldUpdateOperationsInput | string | null
    last_calculated?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type creditsUncheckedUpdateManyInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    obligation_id?: BigIntFieldUpdateOperationsInput | bigint | number
    interest_rate_pct?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    start_date?: DateTimeFieldUpdateOperationsInput | Date | string
    end_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    amortization_scheme?: NullableStringFieldUpdateOperationsInput | string | null
    last_calculated?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type movement_matchesCreateInput = {
    matched_amount: Decimal | DecimalJsLike | number | string
    bank_movements: bank_movementsCreateNestedOneWithoutMovement_matchesInput
    obligations: obligationsCreateNestedOneWithoutMovement_matchesInput
  }

  export type movement_matchesUncheckedCreateInput = {
    movement_id: bigint | number
    obligation_id: bigint | number
    matched_amount: Decimal | DecimalJsLike | number | string
  }

  export type movement_matchesUpdateInput = {
    matched_amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    bank_movements?: bank_movementsUpdateOneRequiredWithoutMovement_matchesNestedInput
    obligations?: obligationsUpdateOneRequiredWithoutMovement_matchesNestedInput
  }

  export type movement_matchesUncheckedUpdateInput = {
    movement_id?: BigIntFieldUpdateOperationsInput | bigint | number
    obligation_id?: BigIntFieldUpdateOperationsInput | bigint | number
    matched_amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
  }

  export type movement_matchesCreateManyInput = {
    movement_id: bigint | number
    obligation_id: bigint | number
    matched_amount: Decimal | DecimalJsLike | number | string
  }

  export type movement_matchesUpdateManyMutationInput = {
    matched_amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
  }

  export type movement_matchesUncheckedUpdateManyInput = {
    movement_id?: BigIntFieldUpdateOperationsInput | bigint | number
    obligation_id?: BigIntFieldUpdateOperationsInput | bigint | number
    matched_amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
  }

  export type obligation_documentsCreateInput = {
    file_name: string
    file_path: string
    uploaded_at?: Date | string
    obligations: obligationsCreateNestedOneWithoutObligation_documentsInput
    users?: usersCreateNestedOneWithoutObligation_documentsInput
  }

  export type obligation_documentsUncheckedCreateInput = {
    id?: number
    obligation_id: bigint | number
    file_name: string
    file_path: string
    uploaded_by?: bigint | number | null
    uploaded_at?: Date | string
  }

  export type obligation_documentsUpdateInput = {
    file_name?: StringFieldUpdateOperationsInput | string
    file_path?: StringFieldUpdateOperationsInput | string
    uploaded_at?: DateTimeFieldUpdateOperationsInput | Date | string
    obligations?: obligationsUpdateOneRequiredWithoutObligation_documentsNestedInput
    users?: usersUpdateOneWithoutObligation_documentsNestedInput
  }

  export type obligation_documentsUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    obligation_id?: BigIntFieldUpdateOperationsInput | bigint | number
    file_name?: StringFieldUpdateOperationsInput | string
    file_path?: StringFieldUpdateOperationsInput | string
    uploaded_by?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    uploaded_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type obligation_documentsCreateManyInput = {
    id?: number
    obligation_id: bigint | number
    file_name: string
    file_path: string
    uploaded_by?: bigint | number | null
    uploaded_at?: Date | string
  }

  export type obligation_documentsUpdateManyMutationInput = {
    file_name?: StringFieldUpdateOperationsInput | string
    file_path?: StringFieldUpdateOperationsInput | string
    uploaded_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type obligation_documentsUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    obligation_id?: BigIntFieldUpdateOperationsInput | bigint | number
    file_name?: StringFieldUpdateOperationsInput | string
    file_path?: StringFieldUpdateOperationsInput | string
    uploaded_by?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    uploaded_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type obligation_typesCreateInput = {
    name: string
    description?: string | null
    obligations?: obligationsCreateNestedManyWithoutObligation_typesInput
  }

  export type obligation_typesUncheckedCreateInput = {
    id?: number
    name: string
    description?: string | null
    obligations?: obligationsUncheckedCreateNestedManyWithoutObligation_typesInput
  }

  export type obligation_typesUpdateInput = {
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    obligations?: obligationsUpdateManyWithoutObligation_typesNestedInput
  }

  export type obligation_typesUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    obligations?: obligationsUncheckedUpdateManyWithoutObligation_typesNestedInput
  }

  export type obligation_typesCreateManyInput = {
    id?: number
    name: string
    description?: string | null
  }

  export type obligation_typesUpdateManyMutationInput = {
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type obligation_typesUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type obligationsCreateInput = {
    id?: bigint | number
    description?: string | null
    amount_original: Decimal | DecimalJsLike | number | string
    currency: string
    exchange_rate_date?: Date | string | null
    due_date: Date | string
    status?: string
    created_at?: Date | string
    credits?: creditsCreateNestedOneWithoutObligationsInput
    movement_matches?: movement_matchesCreateNestedManyWithoutObligationsInput
    obligation_documents?: obligation_documentsCreateNestedManyWithoutObligationsInput
    projects: projectsCreateNestedOneWithoutObligationsInput
    obligation_types: obligation_typesCreateNestedOneWithoutObligationsInput
  }

  export type obligationsUncheckedCreateInput = {
    id?: bigint | number
    project_id: number
    type_id: number
    description?: string | null
    amount_original: Decimal | DecimalJsLike | number | string
    currency: string
    exchange_rate_date?: Date | string | null
    due_date: Date | string
    status?: string
    created_at?: Date | string
    credits?: creditsUncheckedCreateNestedOneWithoutObligationsInput
    movement_matches?: movement_matchesUncheckedCreateNestedManyWithoutObligationsInput
    obligation_documents?: obligation_documentsUncheckedCreateNestedManyWithoutObligationsInput
  }

  export type obligationsUpdateInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    description?: NullableStringFieldUpdateOperationsInput | string | null
    amount_original?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    currency?: StringFieldUpdateOperationsInput | string
    exchange_rate_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    due_date?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    credits?: creditsUpdateOneWithoutObligationsNestedInput
    movement_matches?: movement_matchesUpdateManyWithoutObligationsNestedInput
    obligation_documents?: obligation_documentsUpdateManyWithoutObligationsNestedInput
    projects?: projectsUpdateOneRequiredWithoutObligationsNestedInput
    obligation_types?: obligation_typesUpdateOneRequiredWithoutObligationsNestedInput
  }

  export type obligationsUncheckedUpdateInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    project_id?: IntFieldUpdateOperationsInput | number
    type_id?: IntFieldUpdateOperationsInput | number
    description?: NullableStringFieldUpdateOperationsInput | string | null
    amount_original?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    currency?: StringFieldUpdateOperationsInput | string
    exchange_rate_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    due_date?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    credits?: creditsUncheckedUpdateOneWithoutObligationsNestedInput
    movement_matches?: movement_matchesUncheckedUpdateManyWithoutObligationsNestedInput
    obligation_documents?: obligation_documentsUncheckedUpdateManyWithoutObligationsNestedInput
  }

  export type obligationsCreateManyInput = {
    id?: bigint | number
    project_id: number
    type_id: number
    description?: string | null
    amount_original: Decimal | DecimalJsLike | number | string
    currency: string
    exchange_rate_date?: Date | string | null
    due_date: Date | string
    status?: string
    created_at?: Date | string
  }

  export type obligationsUpdateManyMutationInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    description?: NullableStringFieldUpdateOperationsInput | string | null
    amount_original?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    currency?: StringFieldUpdateOperationsInput | string
    exchange_rate_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    due_date?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type obligationsUncheckedUpdateManyInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    project_id?: IntFieldUpdateOperationsInput | number
    type_id?: IntFieldUpdateOperationsInput | number
    description?: NullableStringFieldUpdateOperationsInput | string | null
    amount_original?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    currency?: StringFieldUpdateOperationsInput | string
    exchange_rate_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    due_date?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type projectsCreateInput = {
    code: string
    name: string
    created_at?: Date | string
    bank_movements?: bank_movementsCreateNestedManyWithoutProjectsInput
    obligations?: obligationsCreateNestedManyWithoutProjectsInput
    companies: companiesCreateNestedOneWithoutProjectsInput
  }

  export type projectsUncheckedCreateInput = {
    id?: number
    company_id: number
    code: string
    name: string
    created_at?: Date | string
    bank_movements?: bank_movementsUncheckedCreateNestedManyWithoutProjectsInput
    obligations?: obligationsUncheckedCreateNestedManyWithoutProjectsInput
  }

  export type projectsUpdateInput = {
    code?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    bank_movements?: bank_movementsUpdateManyWithoutProjectsNestedInput
    obligations?: obligationsUpdateManyWithoutProjectsNestedInput
    companies?: companiesUpdateOneRequiredWithoutProjectsNestedInput
  }

  export type projectsUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    company_id?: IntFieldUpdateOperationsInput | number
    code?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    bank_movements?: bank_movementsUncheckedUpdateManyWithoutProjectsNestedInput
    obligations?: obligationsUncheckedUpdateManyWithoutProjectsNestedInput
  }

  export type projectsCreateManyInput = {
    id?: number
    company_id: number
    code: string
    name: string
    created_at?: Date | string
  }

  export type projectsUpdateManyMutationInput = {
    code?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type projectsUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    company_id?: IntFieldUpdateOperationsInput | number
    code?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type sub_accountsCreateInput = {
    code: string
    name: string
    bank_movements?: bank_movementsCreateNestedManyWithoutSub_accountsInput
    cost_centers: cost_centersCreateNestedOneWithoutSub_accountsInput
  }

  export type sub_accountsUncheckedCreateInput = {
    id?: number
    cost_center_id: number
    code: string
    name: string
    bank_movements?: bank_movementsUncheckedCreateNestedManyWithoutSub_accountsInput
  }

  export type sub_accountsUpdateInput = {
    code?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    bank_movements?: bank_movementsUpdateManyWithoutSub_accountsNestedInput
    cost_centers?: cost_centersUpdateOneRequiredWithoutSub_accountsNestedInput
  }

  export type sub_accountsUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    cost_center_id?: IntFieldUpdateOperationsInput | number
    code?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    bank_movements?: bank_movementsUncheckedUpdateManyWithoutSub_accountsNestedInput
  }

  export type sub_accountsCreateManyInput = {
    id?: number
    cost_center_id: number
    code: string
    name: string
  }

  export type sub_accountsUpdateManyMutationInput = {
    code?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
  }

  export type sub_accountsUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    cost_center_id?: IntFieldUpdateOperationsInput | number
    code?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
  }

  export type uf_ratesCreateInput = {
    date: Date | string
    uf_value: Decimal | DecimalJsLike | number | string
  }

  export type uf_ratesUncheckedCreateInput = {
    date: Date | string
    uf_value: Decimal | DecimalJsLike | number | string
  }

  export type uf_ratesUpdateInput = {
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    uf_value?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
  }

  export type uf_ratesUncheckedUpdateInput = {
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    uf_value?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
  }

  export type uf_ratesCreateManyInput = {
    date: Date | string
    uf_value: Decimal | DecimalJsLike | number | string
  }

  export type uf_ratesUpdateManyMutationInput = {
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    uf_value?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
  }

  export type uf_ratesUncheckedUpdateManyInput = {
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    uf_value?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
  }

  export type usersCreateInput = {
    id?: bigint | number
    name: string
    email: string
    password_hash: string
    role: string
    created_at?: Date | string
    bank_movements?: bank_movementsCreateNestedManyWithoutUsersInput
    obligation_documents?: obligation_documentsCreateNestedManyWithoutUsersInput
  }

  export type usersUncheckedCreateInput = {
    id?: bigint | number
    name: string
    email: string
    password_hash: string
    role: string
    created_at?: Date | string
    bank_movements?: bank_movementsUncheckedCreateNestedManyWithoutUsersInput
    obligation_documents?: obligation_documentsUncheckedCreateNestedManyWithoutUsersInput
  }

  export type usersUpdateInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password_hash?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    bank_movements?: bank_movementsUpdateManyWithoutUsersNestedInput
    obligation_documents?: obligation_documentsUpdateManyWithoutUsersNestedInput
  }

  export type usersUncheckedUpdateInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password_hash?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    bank_movements?: bank_movementsUncheckedUpdateManyWithoutUsersNestedInput
    obligation_documents?: obligation_documentsUncheckedUpdateManyWithoutUsersNestedInput
  }

  export type usersCreateManyInput = {
    id?: bigint | number
    name: string
    email: string
    password_hash: string
    role: string
    created_at?: Date | string
  }

  export type usersUpdateManyMutationInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password_hash?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type usersUncheckedUpdateManyInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password_hash?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type CompaniesScalarRelationFilter = {
    is?: companiesWhereInput
    isNot?: companiesWhereInput
  }

  export type Bank_movementsListRelationFilter = {
    every?: bank_movementsWhereInput
    some?: bank_movementsWhereInput
    none?: bank_movementsWhereInput
  }

  export type bank_movementsOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type bank_accountsCompany_idAccount_noCompoundUniqueInput = {
    company_id: number
    account_no: string
  }

  export type bank_accountsCountOrderByAggregateInput = {
    id?: SortOrder
    company_id?: SortOrder
    bank_name?: SortOrder
    account_no?: SortOrder
    currency?: SortOrder
    created_at?: SortOrder
  }

  export type bank_accountsAvgOrderByAggregateInput = {
    id?: SortOrder
    company_id?: SortOrder
  }

  export type bank_accountsMaxOrderByAggregateInput = {
    id?: SortOrder
    company_id?: SortOrder
    bank_name?: SortOrder
    account_no?: SortOrder
    currency?: SortOrder
    created_at?: SortOrder
  }

  export type bank_accountsMinOrderByAggregateInput = {
    id?: SortOrder
    company_id?: SortOrder
    bank_name?: SortOrder
    account_no?: SortOrder
    currency?: SortOrder
    created_at?: SortOrder
  }

  export type bank_accountsSumOrderByAggregateInput = {
    id?: SortOrder
    company_id?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type BigIntFilter<$PrismaModel = never> = {
    equals?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    in?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel>
    notIn?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel>
    lt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    lte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    not?: NestedBigIntFilter<$PrismaModel> | bigint | number
  }

  export type IntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type DecimalNullableFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel> | null
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel> | null
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel> | null
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalNullableFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string | null
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type BigIntNullableFilter<$PrismaModel = never> = {
    equals?: bigint | number | BigIntFieldRefInput<$PrismaModel> | null
    in?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel> | null
    notIn?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel> | null
    lt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    lte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    not?: NestedBigIntNullableFilter<$PrismaModel> | bigint | number | null
  }

  export type Bank_accountsScalarRelationFilter = {
    is?: bank_accountsWhereInput
    isNot?: bank_accountsWhereInput
  }

  export type UsersNullableScalarRelationFilter = {
    is?: usersWhereInput | null
    isNot?: usersWhereInput | null
  }

  export type ProjectsNullableScalarRelationFilter = {
    is?: projectsWhereInput | null
    isNot?: projectsWhereInput | null
  }

  export type Sub_accountsScalarRelationFilter = {
    is?: sub_accountsWhereInput
    isNot?: sub_accountsWhereInput
  }

  export type Movement_matchesListRelationFilter = {
    every?: movement_matchesWhereInput
    some?: movement_matchesWhereInput
    none?: movement_matchesWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type movement_matchesOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type bank_movementsCountOrderByAggregateInput = {
    id?: SortOrder
    bank_account_id?: SortOrder
    project_id?: SortOrder
    bank_date?: SortOrder
    description?: SortOrder
    debit?: SortOrder
    credit?: SortOrder
    currency?: SortOrder
    exchange_rate_date?: SortOrder
    source?: SortOrder
    sub_account_id?: SortOrder
    created_by?: SortOrder
    import_date?: SortOrder
  }

  export type bank_movementsAvgOrderByAggregateInput = {
    id?: SortOrder
    bank_account_id?: SortOrder
    project_id?: SortOrder
    debit?: SortOrder
    credit?: SortOrder
    sub_account_id?: SortOrder
    created_by?: SortOrder
  }

  export type bank_movementsMaxOrderByAggregateInput = {
    id?: SortOrder
    bank_account_id?: SortOrder
    project_id?: SortOrder
    bank_date?: SortOrder
    description?: SortOrder
    debit?: SortOrder
    credit?: SortOrder
    currency?: SortOrder
    exchange_rate_date?: SortOrder
    source?: SortOrder
    sub_account_id?: SortOrder
    created_by?: SortOrder
    import_date?: SortOrder
  }

  export type bank_movementsMinOrderByAggregateInput = {
    id?: SortOrder
    bank_account_id?: SortOrder
    project_id?: SortOrder
    bank_date?: SortOrder
    description?: SortOrder
    debit?: SortOrder
    credit?: SortOrder
    currency?: SortOrder
    exchange_rate_date?: SortOrder
    source?: SortOrder
    sub_account_id?: SortOrder
    created_by?: SortOrder
    import_date?: SortOrder
  }

  export type bank_movementsSumOrderByAggregateInput = {
    id?: SortOrder
    bank_account_id?: SortOrder
    project_id?: SortOrder
    debit?: SortOrder
    credit?: SortOrder
    sub_account_id?: SortOrder
    created_by?: SortOrder
  }

  export type BigIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    in?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel>
    notIn?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel>
    lt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    lte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    not?: NestedBigIntWithAggregatesFilter<$PrismaModel> | bigint | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedBigIntFilter<$PrismaModel>
    _min?: NestedBigIntFilter<$PrismaModel>
    _max?: NestedBigIntFilter<$PrismaModel>
  }

  export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type DecimalNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel> | null
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel> | null
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel> | null
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalNullableWithAggregatesFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedDecimalNullableFilter<$PrismaModel>
    _sum?: NestedDecimalNullableFilter<$PrismaModel>
    _min?: NestedDecimalNullableFilter<$PrismaModel>
    _max?: NestedDecimalNullableFilter<$PrismaModel>
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type BigIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: bigint | number | BigIntFieldRefInput<$PrismaModel> | null
    in?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel> | null
    notIn?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel> | null
    lt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    lte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    not?: NestedBigIntNullableWithAggregatesFilter<$PrismaModel> | bigint | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedBigIntNullableFilter<$PrismaModel>
    _min?: NestedBigIntNullableFilter<$PrismaModel>
    _max?: NestedBigIntNullableFilter<$PrismaModel>
  }

  export type Bank_accountsListRelationFilter = {
    every?: bank_accountsWhereInput
    some?: bank_accountsWhereInput
    none?: bank_accountsWhereInput
  }

  export type ProjectsListRelationFilter = {
    every?: projectsWhereInput
    some?: projectsWhereInput
    none?: projectsWhereInput
  }

  export type bank_accountsOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type projectsOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type companiesCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    rut?: SortOrder
    address?: SortOrder
    created_at?: SortOrder
  }

  export type companiesAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type companiesMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    rut?: SortOrder
    address?: SortOrder
    created_at?: SortOrder
  }

  export type companiesMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    rut?: SortOrder
    address?: SortOrder
    created_at?: SortOrder
  }

  export type companiesSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type Cost_centersNullableScalarRelationFilter = {
    is?: cost_centersWhereInput | null
    isNot?: cost_centersWhereInput | null
  }

  export type Cost_centersListRelationFilter = {
    every?: cost_centersWhereInput
    some?: cost_centersWhereInput
    none?: cost_centersWhereInput
  }

  export type Sub_accountsListRelationFilter = {
    every?: sub_accountsWhereInput
    some?: sub_accountsWhereInput
    none?: sub_accountsWhereInput
  }

  export type cost_centersOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type sub_accountsOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type cost_centersCountOrderByAggregateInput = {
    id?: SortOrder
    code?: SortOrder
    name?: SortOrder
    parent_id?: SortOrder
  }

  export type cost_centersAvgOrderByAggregateInput = {
    id?: SortOrder
    parent_id?: SortOrder
  }

  export type cost_centersMaxOrderByAggregateInput = {
    id?: SortOrder
    code?: SortOrder
    name?: SortOrder
    parent_id?: SortOrder
  }

  export type cost_centersMinOrderByAggregateInput = {
    id?: SortOrder
    code?: SortOrder
    name?: SortOrder
    parent_id?: SortOrder
  }

  export type cost_centersSumOrderByAggregateInput = {
    id?: SortOrder
    parent_id?: SortOrder
  }

  export type DecimalFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
  }

  export type ObligationsScalarRelationFilter = {
    is?: obligationsWhereInput
    isNot?: obligationsWhereInput
  }

  export type creditsCountOrderByAggregateInput = {
    id?: SortOrder
    obligation_id?: SortOrder
    interest_rate_pct?: SortOrder
    start_date?: SortOrder
    end_date?: SortOrder
    amortization_scheme?: SortOrder
    last_calculated?: SortOrder
  }

  export type creditsAvgOrderByAggregateInput = {
    id?: SortOrder
    obligation_id?: SortOrder
    interest_rate_pct?: SortOrder
  }

  export type creditsMaxOrderByAggregateInput = {
    id?: SortOrder
    obligation_id?: SortOrder
    interest_rate_pct?: SortOrder
    start_date?: SortOrder
    end_date?: SortOrder
    amortization_scheme?: SortOrder
    last_calculated?: SortOrder
  }

  export type creditsMinOrderByAggregateInput = {
    id?: SortOrder
    obligation_id?: SortOrder
    interest_rate_pct?: SortOrder
    start_date?: SortOrder
    end_date?: SortOrder
    amortization_scheme?: SortOrder
    last_calculated?: SortOrder
  }

  export type creditsSumOrderByAggregateInput = {
    id?: SortOrder
    obligation_id?: SortOrder
    interest_rate_pct?: SortOrder
  }

  export type DecimalWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalWithAggregatesFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedDecimalFilter<$PrismaModel>
    _sum?: NestedDecimalFilter<$PrismaModel>
    _min?: NestedDecimalFilter<$PrismaModel>
    _max?: NestedDecimalFilter<$PrismaModel>
  }

  export type Bank_movementsScalarRelationFilter = {
    is?: bank_movementsWhereInput
    isNot?: bank_movementsWhereInput
  }

  export type movement_matchesMovement_idObligation_idCompoundUniqueInput = {
    movement_id: bigint | number
    obligation_id: bigint | number
  }

  export type movement_matchesCountOrderByAggregateInput = {
    movement_id?: SortOrder
    obligation_id?: SortOrder
    matched_amount?: SortOrder
  }

  export type movement_matchesAvgOrderByAggregateInput = {
    movement_id?: SortOrder
    obligation_id?: SortOrder
    matched_amount?: SortOrder
  }

  export type movement_matchesMaxOrderByAggregateInput = {
    movement_id?: SortOrder
    obligation_id?: SortOrder
    matched_amount?: SortOrder
  }

  export type movement_matchesMinOrderByAggregateInput = {
    movement_id?: SortOrder
    obligation_id?: SortOrder
    matched_amount?: SortOrder
  }

  export type movement_matchesSumOrderByAggregateInput = {
    movement_id?: SortOrder
    obligation_id?: SortOrder
    matched_amount?: SortOrder
  }

  export type obligation_documentsCountOrderByAggregateInput = {
    id?: SortOrder
    obligation_id?: SortOrder
    file_name?: SortOrder
    file_path?: SortOrder
    uploaded_by?: SortOrder
    uploaded_at?: SortOrder
  }

  export type obligation_documentsAvgOrderByAggregateInput = {
    id?: SortOrder
    obligation_id?: SortOrder
    uploaded_by?: SortOrder
  }

  export type obligation_documentsMaxOrderByAggregateInput = {
    id?: SortOrder
    obligation_id?: SortOrder
    file_name?: SortOrder
    file_path?: SortOrder
    uploaded_by?: SortOrder
    uploaded_at?: SortOrder
  }

  export type obligation_documentsMinOrderByAggregateInput = {
    id?: SortOrder
    obligation_id?: SortOrder
    file_name?: SortOrder
    file_path?: SortOrder
    uploaded_by?: SortOrder
    uploaded_at?: SortOrder
  }

  export type obligation_documentsSumOrderByAggregateInput = {
    id?: SortOrder
    obligation_id?: SortOrder
    uploaded_by?: SortOrder
  }

  export type ObligationsListRelationFilter = {
    every?: obligationsWhereInput
    some?: obligationsWhereInput
    none?: obligationsWhereInput
  }

  export type obligationsOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type obligation_typesCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
  }

  export type obligation_typesAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type obligation_typesMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
  }

  export type obligation_typesMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
  }

  export type obligation_typesSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type CreditsNullableScalarRelationFilter = {
    is?: creditsWhereInput | null
    isNot?: creditsWhereInput | null
  }

  export type Obligation_documentsListRelationFilter = {
    every?: obligation_documentsWhereInput
    some?: obligation_documentsWhereInput
    none?: obligation_documentsWhereInput
  }

  export type ProjectsScalarRelationFilter = {
    is?: projectsWhereInput
    isNot?: projectsWhereInput
  }

  export type Obligation_typesScalarRelationFilter = {
    is?: obligation_typesWhereInput
    isNot?: obligation_typesWhereInput
  }

  export type obligation_documentsOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type obligationsCountOrderByAggregateInput = {
    id?: SortOrder
    project_id?: SortOrder
    type_id?: SortOrder
    description?: SortOrder
    amount_original?: SortOrder
    currency?: SortOrder
    exchange_rate_date?: SortOrder
    due_date?: SortOrder
    status?: SortOrder
    created_at?: SortOrder
  }

  export type obligationsAvgOrderByAggregateInput = {
    id?: SortOrder
    project_id?: SortOrder
    type_id?: SortOrder
    amount_original?: SortOrder
  }

  export type obligationsMaxOrderByAggregateInput = {
    id?: SortOrder
    project_id?: SortOrder
    type_id?: SortOrder
    description?: SortOrder
    amount_original?: SortOrder
    currency?: SortOrder
    exchange_rate_date?: SortOrder
    due_date?: SortOrder
    status?: SortOrder
    created_at?: SortOrder
  }

  export type obligationsMinOrderByAggregateInput = {
    id?: SortOrder
    project_id?: SortOrder
    type_id?: SortOrder
    description?: SortOrder
    amount_original?: SortOrder
    currency?: SortOrder
    exchange_rate_date?: SortOrder
    due_date?: SortOrder
    status?: SortOrder
    created_at?: SortOrder
  }

  export type obligationsSumOrderByAggregateInput = {
    id?: SortOrder
    project_id?: SortOrder
    type_id?: SortOrder
    amount_original?: SortOrder
  }

  export type projectsCompany_idCodeCompoundUniqueInput = {
    company_id: number
    code: string
  }

  export type projectsCountOrderByAggregateInput = {
    id?: SortOrder
    company_id?: SortOrder
    code?: SortOrder
    name?: SortOrder
    created_at?: SortOrder
  }

  export type projectsAvgOrderByAggregateInput = {
    id?: SortOrder
    company_id?: SortOrder
  }

  export type projectsMaxOrderByAggregateInput = {
    id?: SortOrder
    company_id?: SortOrder
    code?: SortOrder
    name?: SortOrder
    created_at?: SortOrder
  }

  export type projectsMinOrderByAggregateInput = {
    id?: SortOrder
    company_id?: SortOrder
    code?: SortOrder
    name?: SortOrder
    created_at?: SortOrder
  }

  export type projectsSumOrderByAggregateInput = {
    id?: SortOrder
    company_id?: SortOrder
  }

  export type Cost_centersScalarRelationFilter = {
    is?: cost_centersWhereInput
    isNot?: cost_centersWhereInput
  }

  export type sub_accountsCountOrderByAggregateInput = {
    id?: SortOrder
    cost_center_id?: SortOrder
    code?: SortOrder
    name?: SortOrder
  }

  export type sub_accountsAvgOrderByAggregateInput = {
    id?: SortOrder
    cost_center_id?: SortOrder
  }

  export type sub_accountsMaxOrderByAggregateInput = {
    id?: SortOrder
    cost_center_id?: SortOrder
    code?: SortOrder
    name?: SortOrder
  }

  export type sub_accountsMinOrderByAggregateInput = {
    id?: SortOrder
    cost_center_id?: SortOrder
    code?: SortOrder
    name?: SortOrder
  }

  export type sub_accountsSumOrderByAggregateInput = {
    id?: SortOrder
    cost_center_id?: SortOrder
  }

  export type uf_ratesCountOrderByAggregateInput = {
    date?: SortOrder
    uf_value?: SortOrder
  }

  export type uf_ratesAvgOrderByAggregateInput = {
    uf_value?: SortOrder
  }

  export type uf_ratesMaxOrderByAggregateInput = {
    date?: SortOrder
    uf_value?: SortOrder
  }

  export type uf_ratesMinOrderByAggregateInput = {
    date?: SortOrder
    uf_value?: SortOrder
  }

  export type uf_ratesSumOrderByAggregateInput = {
    uf_value?: SortOrder
  }

  export type usersCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    password_hash?: SortOrder
    role?: SortOrder
    created_at?: SortOrder
  }

  export type usersAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type usersMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    password_hash?: SortOrder
    role?: SortOrder
    created_at?: SortOrder
  }

  export type usersMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    password_hash?: SortOrder
    role?: SortOrder
    created_at?: SortOrder
  }

  export type usersSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type companiesCreateNestedOneWithoutBank_accountsInput = {
    create?: XOR<companiesCreateWithoutBank_accountsInput, companiesUncheckedCreateWithoutBank_accountsInput>
    connectOrCreate?: companiesCreateOrConnectWithoutBank_accountsInput
    connect?: companiesWhereUniqueInput
  }

  export type bank_movementsCreateNestedManyWithoutBank_accountsInput = {
    create?: XOR<bank_movementsCreateWithoutBank_accountsInput, bank_movementsUncheckedCreateWithoutBank_accountsInput> | bank_movementsCreateWithoutBank_accountsInput[] | bank_movementsUncheckedCreateWithoutBank_accountsInput[]
    connectOrCreate?: bank_movementsCreateOrConnectWithoutBank_accountsInput | bank_movementsCreateOrConnectWithoutBank_accountsInput[]
    createMany?: bank_movementsCreateManyBank_accountsInputEnvelope
    connect?: bank_movementsWhereUniqueInput | bank_movementsWhereUniqueInput[]
  }

  export type bank_movementsUncheckedCreateNestedManyWithoutBank_accountsInput = {
    create?: XOR<bank_movementsCreateWithoutBank_accountsInput, bank_movementsUncheckedCreateWithoutBank_accountsInput> | bank_movementsCreateWithoutBank_accountsInput[] | bank_movementsUncheckedCreateWithoutBank_accountsInput[]
    connectOrCreate?: bank_movementsCreateOrConnectWithoutBank_accountsInput | bank_movementsCreateOrConnectWithoutBank_accountsInput[]
    createMany?: bank_movementsCreateManyBank_accountsInputEnvelope
    connect?: bank_movementsWhereUniqueInput | bank_movementsWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type companiesUpdateOneRequiredWithoutBank_accountsNestedInput = {
    create?: XOR<companiesCreateWithoutBank_accountsInput, companiesUncheckedCreateWithoutBank_accountsInput>
    connectOrCreate?: companiesCreateOrConnectWithoutBank_accountsInput
    upsert?: companiesUpsertWithoutBank_accountsInput
    connect?: companiesWhereUniqueInput
    update?: XOR<XOR<companiesUpdateToOneWithWhereWithoutBank_accountsInput, companiesUpdateWithoutBank_accountsInput>, companiesUncheckedUpdateWithoutBank_accountsInput>
  }

  export type bank_movementsUpdateManyWithoutBank_accountsNestedInput = {
    create?: XOR<bank_movementsCreateWithoutBank_accountsInput, bank_movementsUncheckedCreateWithoutBank_accountsInput> | bank_movementsCreateWithoutBank_accountsInput[] | bank_movementsUncheckedCreateWithoutBank_accountsInput[]
    connectOrCreate?: bank_movementsCreateOrConnectWithoutBank_accountsInput | bank_movementsCreateOrConnectWithoutBank_accountsInput[]
    upsert?: bank_movementsUpsertWithWhereUniqueWithoutBank_accountsInput | bank_movementsUpsertWithWhereUniqueWithoutBank_accountsInput[]
    createMany?: bank_movementsCreateManyBank_accountsInputEnvelope
    set?: bank_movementsWhereUniqueInput | bank_movementsWhereUniqueInput[]
    disconnect?: bank_movementsWhereUniqueInput | bank_movementsWhereUniqueInput[]
    delete?: bank_movementsWhereUniqueInput | bank_movementsWhereUniqueInput[]
    connect?: bank_movementsWhereUniqueInput | bank_movementsWhereUniqueInput[]
    update?: bank_movementsUpdateWithWhereUniqueWithoutBank_accountsInput | bank_movementsUpdateWithWhereUniqueWithoutBank_accountsInput[]
    updateMany?: bank_movementsUpdateManyWithWhereWithoutBank_accountsInput | bank_movementsUpdateManyWithWhereWithoutBank_accountsInput[]
    deleteMany?: bank_movementsScalarWhereInput | bank_movementsScalarWhereInput[]
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type bank_movementsUncheckedUpdateManyWithoutBank_accountsNestedInput = {
    create?: XOR<bank_movementsCreateWithoutBank_accountsInput, bank_movementsUncheckedCreateWithoutBank_accountsInput> | bank_movementsCreateWithoutBank_accountsInput[] | bank_movementsUncheckedCreateWithoutBank_accountsInput[]
    connectOrCreate?: bank_movementsCreateOrConnectWithoutBank_accountsInput | bank_movementsCreateOrConnectWithoutBank_accountsInput[]
    upsert?: bank_movementsUpsertWithWhereUniqueWithoutBank_accountsInput | bank_movementsUpsertWithWhereUniqueWithoutBank_accountsInput[]
    createMany?: bank_movementsCreateManyBank_accountsInputEnvelope
    set?: bank_movementsWhereUniqueInput | bank_movementsWhereUniqueInput[]
    disconnect?: bank_movementsWhereUniqueInput | bank_movementsWhereUniqueInput[]
    delete?: bank_movementsWhereUniqueInput | bank_movementsWhereUniqueInput[]
    connect?: bank_movementsWhereUniqueInput | bank_movementsWhereUniqueInput[]
    update?: bank_movementsUpdateWithWhereUniqueWithoutBank_accountsInput | bank_movementsUpdateWithWhereUniqueWithoutBank_accountsInput[]
    updateMany?: bank_movementsUpdateManyWithWhereWithoutBank_accountsInput | bank_movementsUpdateManyWithWhereWithoutBank_accountsInput[]
    deleteMany?: bank_movementsScalarWhereInput | bank_movementsScalarWhereInput[]
  }

  export type bank_accountsCreateNestedOneWithoutBank_movementsInput = {
    create?: XOR<bank_accountsCreateWithoutBank_movementsInput, bank_accountsUncheckedCreateWithoutBank_movementsInput>
    connectOrCreate?: bank_accountsCreateOrConnectWithoutBank_movementsInput
    connect?: bank_accountsWhereUniqueInput
  }

  export type usersCreateNestedOneWithoutBank_movementsInput = {
    create?: XOR<usersCreateWithoutBank_movementsInput, usersUncheckedCreateWithoutBank_movementsInput>
    connectOrCreate?: usersCreateOrConnectWithoutBank_movementsInput
    connect?: usersWhereUniqueInput
  }

  export type projectsCreateNestedOneWithoutBank_movementsInput = {
    create?: XOR<projectsCreateWithoutBank_movementsInput, projectsUncheckedCreateWithoutBank_movementsInput>
    connectOrCreate?: projectsCreateOrConnectWithoutBank_movementsInput
    connect?: projectsWhereUniqueInput
  }

  export type sub_accountsCreateNestedOneWithoutBank_movementsInput = {
    create?: XOR<sub_accountsCreateWithoutBank_movementsInput, sub_accountsUncheckedCreateWithoutBank_movementsInput>
    connectOrCreate?: sub_accountsCreateOrConnectWithoutBank_movementsInput
    connect?: sub_accountsWhereUniqueInput
  }

  export type movement_matchesCreateNestedManyWithoutBank_movementsInput = {
    create?: XOR<movement_matchesCreateWithoutBank_movementsInput, movement_matchesUncheckedCreateWithoutBank_movementsInput> | movement_matchesCreateWithoutBank_movementsInput[] | movement_matchesUncheckedCreateWithoutBank_movementsInput[]
    connectOrCreate?: movement_matchesCreateOrConnectWithoutBank_movementsInput | movement_matchesCreateOrConnectWithoutBank_movementsInput[]
    createMany?: movement_matchesCreateManyBank_movementsInputEnvelope
    connect?: movement_matchesWhereUniqueInput | movement_matchesWhereUniqueInput[]
  }

  export type movement_matchesUncheckedCreateNestedManyWithoutBank_movementsInput = {
    create?: XOR<movement_matchesCreateWithoutBank_movementsInput, movement_matchesUncheckedCreateWithoutBank_movementsInput> | movement_matchesCreateWithoutBank_movementsInput[] | movement_matchesUncheckedCreateWithoutBank_movementsInput[]
    connectOrCreate?: movement_matchesCreateOrConnectWithoutBank_movementsInput | movement_matchesCreateOrConnectWithoutBank_movementsInput[]
    createMany?: movement_matchesCreateManyBank_movementsInputEnvelope
    connect?: movement_matchesWhereUniqueInput | movement_matchesWhereUniqueInput[]
  }

  export type BigIntFieldUpdateOperationsInput = {
    set?: bigint | number
    increment?: bigint | number
    decrement?: bigint | number
    multiply?: bigint | number
    divide?: bigint | number
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type NullableDecimalFieldUpdateOperationsInput = {
    set?: Decimal | DecimalJsLike | number | string | null
    increment?: Decimal | DecimalJsLike | number | string
    decrement?: Decimal | DecimalJsLike | number | string
    multiply?: Decimal | DecimalJsLike | number | string
    divide?: Decimal | DecimalJsLike | number | string
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type bank_accountsUpdateOneRequiredWithoutBank_movementsNestedInput = {
    create?: XOR<bank_accountsCreateWithoutBank_movementsInput, bank_accountsUncheckedCreateWithoutBank_movementsInput>
    connectOrCreate?: bank_accountsCreateOrConnectWithoutBank_movementsInput
    upsert?: bank_accountsUpsertWithoutBank_movementsInput
    connect?: bank_accountsWhereUniqueInput
    update?: XOR<XOR<bank_accountsUpdateToOneWithWhereWithoutBank_movementsInput, bank_accountsUpdateWithoutBank_movementsInput>, bank_accountsUncheckedUpdateWithoutBank_movementsInput>
  }

  export type usersUpdateOneWithoutBank_movementsNestedInput = {
    create?: XOR<usersCreateWithoutBank_movementsInput, usersUncheckedCreateWithoutBank_movementsInput>
    connectOrCreate?: usersCreateOrConnectWithoutBank_movementsInput
    upsert?: usersUpsertWithoutBank_movementsInput
    disconnect?: usersWhereInput | boolean
    delete?: usersWhereInput | boolean
    connect?: usersWhereUniqueInput
    update?: XOR<XOR<usersUpdateToOneWithWhereWithoutBank_movementsInput, usersUpdateWithoutBank_movementsInput>, usersUncheckedUpdateWithoutBank_movementsInput>
  }

  export type projectsUpdateOneWithoutBank_movementsNestedInput = {
    create?: XOR<projectsCreateWithoutBank_movementsInput, projectsUncheckedCreateWithoutBank_movementsInput>
    connectOrCreate?: projectsCreateOrConnectWithoutBank_movementsInput
    upsert?: projectsUpsertWithoutBank_movementsInput
    disconnect?: projectsWhereInput | boolean
    delete?: projectsWhereInput | boolean
    connect?: projectsWhereUniqueInput
    update?: XOR<XOR<projectsUpdateToOneWithWhereWithoutBank_movementsInput, projectsUpdateWithoutBank_movementsInput>, projectsUncheckedUpdateWithoutBank_movementsInput>
  }

  export type sub_accountsUpdateOneRequiredWithoutBank_movementsNestedInput = {
    create?: XOR<sub_accountsCreateWithoutBank_movementsInput, sub_accountsUncheckedCreateWithoutBank_movementsInput>
    connectOrCreate?: sub_accountsCreateOrConnectWithoutBank_movementsInput
    upsert?: sub_accountsUpsertWithoutBank_movementsInput
    connect?: sub_accountsWhereUniqueInput
    update?: XOR<XOR<sub_accountsUpdateToOneWithWhereWithoutBank_movementsInput, sub_accountsUpdateWithoutBank_movementsInput>, sub_accountsUncheckedUpdateWithoutBank_movementsInput>
  }

  export type movement_matchesUpdateManyWithoutBank_movementsNestedInput = {
    create?: XOR<movement_matchesCreateWithoutBank_movementsInput, movement_matchesUncheckedCreateWithoutBank_movementsInput> | movement_matchesCreateWithoutBank_movementsInput[] | movement_matchesUncheckedCreateWithoutBank_movementsInput[]
    connectOrCreate?: movement_matchesCreateOrConnectWithoutBank_movementsInput | movement_matchesCreateOrConnectWithoutBank_movementsInput[]
    upsert?: movement_matchesUpsertWithWhereUniqueWithoutBank_movementsInput | movement_matchesUpsertWithWhereUniqueWithoutBank_movementsInput[]
    createMany?: movement_matchesCreateManyBank_movementsInputEnvelope
    set?: movement_matchesWhereUniqueInput | movement_matchesWhereUniqueInput[]
    disconnect?: movement_matchesWhereUniqueInput | movement_matchesWhereUniqueInput[]
    delete?: movement_matchesWhereUniqueInput | movement_matchesWhereUniqueInput[]
    connect?: movement_matchesWhereUniqueInput | movement_matchesWhereUniqueInput[]
    update?: movement_matchesUpdateWithWhereUniqueWithoutBank_movementsInput | movement_matchesUpdateWithWhereUniqueWithoutBank_movementsInput[]
    updateMany?: movement_matchesUpdateManyWithWhereWithoutBank_movementsInput | movement_matchesUpdateManyWithWhereWithoutBank_movementsInput[]
    deleteMany?: movement_matchesScalarWhereInput | movement_matchesScalarWhereInput[]
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type NullableBigIntFieldUpdateOperationsInput = {
    set?: bigint | number | null
    increment?: bigint | number
    decrement?: bigint | number
    multiply?: bigint | number
    divide?: bigint | number
  }

  export type movement_matchesUncheckedUpdateManyWithoutBank_movementsNestedInput = {
    create?: XOR<movement_matchesCreateWithoutBank_movementsInput, movement_matchesUncheckedCreateWithoutBank_movementsInput> | movement_matchesCreateWithoutBank_movementsInput[] | movement_matchesUncheckedCreateWithoutBank_movementsInput[]
    connectOrCreate?: movement_matchesCreateOrConnectWithoutBank_movementsInput | movement_matchesCreateOrConnectWithoutBank_movementsInput[]
    upsert?: movement_matchesUpsertWithWhereUniqueWithoutBank_movementsInput | movement_matchesUpsertWithWhereUniqueWithoutBank_movementsInput[]
    createMany?: movement_matchesCreateManyBank_movementsInputEnvelope
    set?: movement_matchesWhereUniqueInput | movement_matchesWhereUniqueInput[]
    disconnect?: movement_matchesWhereUniqueInput | movement_matchesWhereUniqueInput[]
    delete?: movement_matchesWhereUniqueInput | movement_matchesWhereUniqueInput[]
    connect?: movement_matchesWhereUniqueInput | movement_matchesWhereUniqueInput[]
    update?: movement_matchesUpdateWithWhereUniqueWithoutBank_movementsInput | movement_matchesUpdateWithWhereUniqueWithoutBank_movementsInput[]
    updateMany?: movement_matchesUpdateManyWithWhereWithoutBank_movementsInput | movement_matchesUpdateManyWithWhereWithoutBank_movementsInput[]
    deleteMany?: movement_matchesScalarWhereInput | movement_matchesScalarWhereInput[]
  }

  export type bank_accountsCreateNestedManyWithoutCompaniesInput = {
    create?: XOR<bank_accountsCreateWithoutCompaniesInput, bank_accountsUncheckedCreateWithoutCompaniesInput> | bank_accountsCreateWithoutCompaniesInput[] | bank_accountsUncheckedCreateWithoutCompaniesInput[]
    connectOrCreate?: bank_accountsCreateOrConnectWithoutCompaniesInput | bank_accountsCreateOrConnectWithoutCompaniesInput[]
    createMany?: bank_accountsCreateManyCompaniesInputEnvelope
    connect?: bank_accountsWhereUniqueInput | bank_accountsWhereUniqueInput[]
  }

  export type projectsCreateNestedManyWithoutCompaniesInput = {
    create?: XOR<projectsCreateWithoutCompaniesInput, projectsUncheckedCreateWithoutCompaniesInput> | projectsCreateWithoutCompaniesInput[] | projectsUncheckedCreateWithoutCompaniesInput[]
    connectOrCreate?: projectsCreateOrConnectWithoutCompaniesInput | projectsCreateOrConnectWithoutCompaniesInput[]
    createMany?: projectsCreateManyCompaniesInputEnvelope
    connect?: projectsWhereUniqueInput | projectsWhereUniqueInput[]
  }

  export type bank_accountsUncheckedCreateNestedManyWithoutCompaniesInput = {
    create?: XOR<bank_accountsCreateWithoutCompaniesInput, bank_accountsUncheckedCreateWithoutCompaniesInput> | bank_accountsCreateWithoutCompaniesInput[] | bank_accountsUncheckedCreateWithoutCompaniesInput[]
    connectOrCreate?: bank_accountsCreateOrConnectWithoutCompaniesInput | bank_accountsCreateOrConnectWithoutCompaniesInput[]
    createMany?: bank_accountsCreateManyCompaniesInputEnvelope
    connect?: bank_accountsWhereUniqueInput | bank_accountsWhereUniqueInput[]
  }

  export type projectsUncheckedCreateNestedManyWithoutCompaniesInput = {
    create?: XOR<projectsCreateWithoutCompaniesInput, projectsUncheckedCreateWithoutCompaniesInput> | projectsCreateWithoutCompaniesInput[] | projectsUncheckedCreateWithoutCompaniesInput[]
    connectOrCreate?: projectsCreateOrConnectWithoutCompaniesInput | projectsCreateOrConnectWithoutCompaniesInput[]
    createMany?: projectsCreateManyCompaniesInputEnvelope
    connect?: projectsWhereUniqueInput | projectsWhereUniqueInput[]
  }

  export type bank_accountsUpdateManyWithoutCompaniesNestedInput = {
    create?: XOR<bank_accountsCreateWithoutCompaniesInput, bank_accountsUncheckedCreateWithoutCompaniesInput> | bank_accountsCreateWithoutCompaniesInput[] | bank_accountsUncheckedCreateWithoutCompaniesInput[]
    connectOrCreate?: bank_accountsCreateOrConnectWithoutCompaniesInput | bank_accountsCreateOrConnectWithoutCompaniesInput[]
    upsert?: bank_accountsUpsertWithWhereUniqueWithoutCompaniesInput | bank_accountsUpsertWithWhereUniqueWithoutCompaniesInput[]
    createMany?: bank_accountsCreateManyCompaniesInputEnvelope
    set?: bank_accountsWhereUniqueInput | bank_accountsWhereUniqueInput[]
    disconnect?: bank_accountsWhereUniqueInput | bank_accountsWhereUniqueInput[]
    delete?: bank_accountsWhereUniqueInput | bank_accountsWhereUniqueInput[]
    connect?: bank_accountsWhereUniqueInput | bank_accountsWhereUniqueInput[]
    update?: bank_accountsUpdateWithWhereUniqueWithoutCompaniesInput | bank_accountsUpdateWithWhereUniqueWithoutCompaniesInput[]
    updateMany?: bank_accountsUpdateManyWithWhereWithoutCompaniesInput | bank_accountsUpdateManyWithWhereWithoutCompaniesInput[]
    deleteMany?: bank_accountsScalarWhereInput | bank_accountsScalarWhereInput[]
  }

  export type projectsUpdateManyWithoutCompaniesNestedInput = {
    create?: XOR<projectsCreateWithoutCompaniesInput, projectsUncheckedCreateWithoutCompaniesInput> | projectsCreateWithoutCompaniesInput[] | projectsUncheckedCreateWithoutCompaniesInput[]
    connectOrCreate?: projectsCreateOrConnectWithoutCompaniesInput | projectsCreateOrConnectWithoutCompaniesInput[]
    upsert?: projectsUpsertWithWhereUniqueWithoutCompaniesInput | projectsUpsertWithWhereUniqueWithoutCompaniesInput[]
    createMany?: projectsCreateManyCompaniesInputEnvelope
    set?: projectsWhereUniqueInput | projectsWhereUniqueInput[]
    disconnect?: projectsWhereUniqueInput | projectsWhereUniqueInput[]
    delete?: projectsWhereUniqueInput | projectsWhereUniqueInput[]
    connect?: projectsWhereUniqueInput | projectsWhereUniqueInput[]
    update?: projectsUpdateWithWhereUniqueWithoutCompaniesInput | projectsUpdateWithWhereUniqueWithoutCompaniesInput[]
    updateMany?: projectsUpdateManyWithWhereWithoutCompaniesInput | projectsUpdateManyWithWhereWithoutCompaniesInput[]
    deleteMany?: projectsScalarWhereInput | projectsScalarWhereInput[]
  }

  export type bank_accountsUncheckedUpdateManyWithoutCompaniesNestedInput = {
    create?: XOR<bank_accountsCreateWithoutCompaniesInput, bank_accountsUncheckedCreateWithoutCompaniesInput> | bank_accountsCreateWithoutCompaniesInput[] | bank_accountsUncheckedCreateWithoutCompaniesInput[]
    connectOrCreate?: bank_accountsCreateOrConnectWithoutCompaniesInput | bank_accountsCreateOrConnectWithoutCompaniesInput[]
    upsert?: bank_accountsUpsertWithWhereUniqueWithoutCompaniesInput | bank_accountsUpsertWithWhereUniqueWithoutCompaniesInput[]
    createMany?: bank_accountsCreateManyCompaniesInputEnvelope
    set?: bank_accountsWhereUniqueInput | bank_accountsWhereUniqueInput[]
    disconnect?: bank_accountsWhereUniqueInput | bank_accountsWhereUniqueInput[]
    delete?: bank_accountsWhereUniqueInput | bank_accountsWhereUniqueInput[]
    connect?: bank_accountsWhereUniqueInput | bank_accountsWhereUniqueInput[]
    update?: bank_accountsUpdateWithWhereUniqueWithoutCompaniesInput | bank_accountsUpdateWithWhereUniqueWithoutCompaniesInput[]
    updateMany?: bank_accountsUpdateManyWithWhereWithoutCompaniesInput | bank_accountsUpdateManyWithWhereWithoutCompaniesInput[]
    deleteMany?: bank_accountsScalarWhereInput | bank_accountsScalarWhereInput[]
  }

  export type projectsUncheckedUpdateManyWithoutCompaniesNestedInput = {
    create?: XOR<projectsCreateWithoutCompaniesInput, projectsUncheckedCreateWithoutCompaniesInput> | projectsCreateWithoutCompaniesInput[] | projectsUncheckedCreateWithoutCompaniesInput[]
    connectOrCreate?: projectsCreateOrConnectWithoutCompaniesInput | projectsCreateOrConnectWithoutCompaniesInput[]
    upsert?: projectsUpsertWithWhereUniqueWithoutCompaniesInput | projectsUpsertWithWhereUniqueWithoutCompaniesInput[]
    createMany?: projectsCreateManyCompaniesInputEnvelope
    set?: projectsWhereUniqueInput | projectsWhereUniqueInput[]
    disconnect?: projectsWhereUniqueInput | projectsWhereUniqueInput[]
    delete?: projectsWhereUniqueInput | projectsWhereUniqueInput[]
    connect?: projectsWhereUniqueInput | projectsWhereUniqueInput[]
    update?: projectsUpdateWithWhereUniqueWithoutCompaniesInput | projectsUpdateWithWhereUniqueWithoutCompaniesInput[]
    updateMany?: projectsUpdateManyWithWhereWithoutCompaniesInput | projectsUpdateManyWithWhereWithoutCompaniesInput[]
    deleteMany?: projectsScalarWhereInput | projectsScalarWhereInput[]
  }

  export type cost_centersCreateNestedOneWithoutOther_cost_centersInput = {
    create?: XOR<cost_centersCreateWithoutOther_cost_centersInput, cost_centersUncheckedCreateWithoutOther_cost_centersInput>
    connectOrCreate?: cost_centersCreateOrConnectWithoutOther_cost_centersInput
    connect?: cost_centersWhereUniqueInput
  }

  export type cost_centersCreateNestedManyWithoutCost_centersInput = {
    create?: XOR<cost_centersCreateWithoutCost_centersInput, cost_centersUncheckedCreateWithoutCost_centersInput> | cost_centersCreateWithoutCost_centersInput[] | cost_centersUncheckedCreateWithoutCost_centersInput[]
    connectOrCreate?: cost_centersCreateOrConnectWithoutCost_centersInput | cost_centersCreateOrConnectWithoutCost_centersInput[]
    createMany?: cost_centersCreateManyCost_centersInputEnvelope
    connect?: cost_centersWhereUniqueInput | cost_centersWhereUniqueInput[]
  }

  export type sub_accountsCreateNestedManyWithoutCost_centersInput = {
    create?: XOR<sub_accountsCreateWithoutCost_centersInput, sub_accountsUncheckedCreateWithoutCost_centersInput> | sub_accountsCreateWithoutCost_centersInput[] | sub_accountsUncheckedCreateWithoutCost_centersInput[]
    connectOrCreate?: sub_accountsCreateOrConnectWithoutCost_centersInput | sub_accountsCreateOrConnectWithoutCost_centersInput[]
    createMany?: sub_accountsCreateManyCost_centersInputEnvelope
    connect?: sub_accountsWhereUniqueInput | sub_accountsWhereUniqueInput[]
  }

  export type cost_centersUncheckedCreateNestedManyWithoutCost_centersInput = {
    create?: XOR<cost_centersCreateWithoutCost_centersInput, cost_centersUncheckedCreateWithoutCost_centersInput> | cost_centersCreateWithoutCost_centersInput[] | cost_centersUncheckedCreateWithoutCost_centersInput[]
    connectOrCreate?: cost_centersCreateOrConnectWithoutCost_centersInput | cost_centersCreateOrConnectWithoutCost_centersInput[]
    createMany?: cost_centersCreateManyCost_centersInputEnvelope
    connect?: cost_centersWhereUniqueInput | cost_centersWhereUniqueInput[]
  }

  export type sub_accountsUncheckedCreateNestedManyWithoutCost_centersInput = {
    create?: XOR<sub_accountsCreateWithoutCost_centersInput, sub_accountsUncheckedCreateWithoutCost_centersInput> | sub_accountsCreateWithoutCost_centersInput[] | sub_accountsUncheckedCreateWithoutCost_centersInput[]
    connectOrCreate?: sub_accountsCreateOrConnectWithoutCost_centersInput | sub_accountsCreateOrConnectWithoutCost_centersInput[]
    createMany?: sub_accountsCreateManyCost_centersInputEnvelope
    connect?: sub_accountsWhereUniqueInput | sub_accountsWhereUniqueInput[]
  }

  export type cost_centersUpdateOneWithoutOther_cost_centersNestedInput = {
    create?: XOR<cost_centersCreateWithoutOther_cost_centersInput, cost_centersUncheckedCreateWithoutOther_cost_centersInput>
    connectOrCreate?: cost_centersCreateOrConnectWithoutOther_cost_centersInput
    upsert?: cost_centersUpsertWithoutOther_cost_centersInput
    disconnect?: cost_centersWhereInput | boolean
    delete?: cost_centersWhereInput | boolean
    connect?: cost_centersWhereUniqueInput
    update?: XOR<XOR<cost_centersUpdateToOneWithWhereWithoutOther_cost_centersInput, cost_centersUpdateWithoutOther_cost_centersInput>, cost_centersUncheckedUpdateWithoutOther_cost_centersInput>
  }

  export type cost_centersUpdateManyWithoutCost_centersNestedInput = {
    create?: XOR<cost_centersCreateWithoutCost_centersInput, cost_centersUncheckedCreateWithoutCost_centersInput> | cost_centersCreateWithoutCost_centersInput[] | cost_centersUncheckedCreateWithoutCost_centersInput[]
    connectOrCreate?: cost_centersCreateOrConnectWithoutCost_centersInput | cost_centersCreateOrConnectWithoutCost_centersInput[]
    upsert?: cost_centersUpsertWithWhereUniqueWithoutCost_centersInput | cost_centersUpsertWithWhereUniqueWithoutCost_centersInput[]
    createMany?: cost_centersCreateManyCost_centersInputEnvelope
    set?: cost_centersWhereUniqueInput | cost_centersWhereUniqueInput[]
    disconnect?: cost_centersWhereUniqueInput | cost_centersWhereUniqueInput[]
    delete?: cost_centersWhereUniqueInput | cost_centersWhereUniqueInput[]
    connect?: cost_centersWhereUniqueInput | cost_centersWhereUniqueInput[]
    update?: cost_centersUpdateWithWhereUniqueWithoutCost_centersInput | cost_centersUpdateWithWhereUniqueWithoutCost_centersInput[]
    updateMany?: cost_centersUpdateManyWithWhereWithoutCost_centersInput | cost_centersUpdateManyWithWhereWithoutCost_centersInput[]
    deleteMany?: cost_centersScalarWhereInput | cost_centersScalarWhereInput[]
  }

  export type sub_accountsUpdateManyWithoutCost_centersNestedInput = {
    create?: XOR<sub_accountsCreateWithoutCost_centersInput, sub_accountsUncheckedCreateWithoutCost_centersInput> | sub_accountsCreateWithoutCost_centersInput[] | sub_accountsUncheckedCreateWithoutCost_centersInput[]
    connectOrCreate?: sub_accountsCreateOrConnectWithoutCost_centersInput | sub_accountsCreateOrConnectWithoutCost_centersInput[]
    upsert?: sub_accountsUpsertWithWhereUniqueWithoutCost_centersInput | sub_accountsUpsertWithWhereUniqueWithoutCost_centersInput[]
    createMany?: sub_accountsCreateManyCost_centersInputEnvelope
    set?: sub_accountsWhereUniqueInput | sub_accountsWhereUniqueInput[]
    disconnect?: sub_accountsWhereUniqueInput | sub_accountsWhereUniqueInput[]
    delete?: sub_accountsWhereUniqueInput | sub_accountsWhereUniqueInput[]
    connect?: sub_accountsWhereUniqueInput | sub_accountsWhereUniqueInput[]
    update?: sub_accountsUpdateWithWhereUniqueWithoutCost_centersInput | sub_accountsUpdateWithWhereUniqueWithoutCost_centersInput[]
    updateMany?: sub_accountsUpdateManyWithWhereWithoutCost_centersInput | sub_accountsUpdateManyWithWhereWithoutCost_centersInput[]
    deleteMany?: sub_accountsScalarWhereInput | sub_accountsScalarWhereInput[]
  }

  export type cost_centersUncheckedUpdateManyWithoutCost_centersNestedInput = {
    create?: XOR<cost_centersCreateWithoutCost_centersInput, cost_centersUncheckedCreateWithoutCost_centersInput> | cost_centersCreateWithoutCost_centersInput[] | cost_centersUncheckedCreateWithoutCost_centersInput[]
    connectOrCreate?: cost_centersCreateOrConnectWithoutCost_centersInput | cost_centersCreateOrConnectWithoutCost_centersInput[]
    upsert?: cost_centersUpsertWithWhereUniqueWithoutCost_centersInput | cost_centersUpsertWithWhereUniqueWithoutCost_centersInput[]
    createMany?: cost_centersCreateManyCost_centersInputEnvelope
    set?: cost_centersWhereUniqueInput | cost_centersWhereUniqueInput[]
    disconnect?: cost_centersWhereUniqueInput | cost_centersWhereUniqueInput[]
    delete?: cost_centersWhereUniqueInput | cost_centersWhereUniqueInput[]
    connect?: cost_centersWhereUniqueInput | cost_centersWhereUniqueInput[]
    update?: cost_centersUpdateWithWhereUniqueWithoutCost_centersInput | cost_centersUpdateWithWhereUniqueWithoutCost_centersInput[]
    updateMany?: cost_centersUpdateManyWithWhereWithoutCost_centersInput | cost_centersUpdateManyWithWhereWithoutCost_centersInput[]
    deleteMany?: cost_centersScalarWhereInput | cost_centersScalarWhereInput[]
  }

  export type sub_accountsUncheckedUpdateManyWithoutCost_centersNestedInput = {
    create?: XOR<sub_accountsCreateWithoutCost_centersInput, sub_accountsUncheckedCreateWithoutCost_centersInput> | sub_accountsCreateWithoutCost_centersInput[] | sub_accountsUncheckedCreateWithoutCost_centersInput[]
    connectOrCreate?: sub_accountsCreateOrConnectWithoutCost_centersInput | sub_accountsCreateOrConnectWithoutCost_centersInput[]
    upsert?: sub_accountsUpsertWithWhereUniqueWithoutCost_centersInput | sub_accountsUpsertWithWhereUniqueWithoutCost_centersInput[]
    createMany?: sub_accountsCreateManyCost_centersInputEnvelope
    set?: sub_accountsWhereUniqueInput | sub_accountsWhereUniqueInput[]
    disconnect?: sub_accountsWhereUniqueInput | sub_accountsWhereUniqueInput[]
    delete?: sub_accountsWhereUniqueInput | sub_accountsWhereUniqueInput[]
    connect?: sub_accountsWhereUniqueInput | sub_accountsWhereUniqueInput[]
    update?: sub_accountsUpdateWithWhereUniqueWithoutCost_centersInput | sub_accountsUpdateWithWhereUniqueWithoutCost_centersInput[]
    updateMany?: sub_accountsUpdateManyWithWhereWithoutCost_centersInput | sub_accountsUpdateManyWithWhereWithoutCost_centersInput[]
    deleteMany?: sub_accountsScalarWhereInput | sub_accountsScalarWhereInput[]
  }

  export type obligationsCreateNestedOneWithoutCreditsInput = {
    create?: XOR<obligationsCreateWithoutCreditsInput, obligationsUncheckedCreateWithoutCreditsInput>
    connectOrCreate?: obligationsCreateOrConnectWithoutCreditsInput
    connect?: obligationsWhereUniqueInput
  }

  export type DecimalFieldUpdateOperationsInput = {
    set?: Decimal | DecimalJsLike | number | string
    increment?: Decimal | DecimalJsLike | number | string
    decrement?: Decimal | DecimalJsLike | number | string
    multiply?: Decimal | DecimalJsLike | number | string
    divide?: Decimal | DecimalJsLike | number | string
  }

  export type obligationsUpdateOneRequiredWithoutCreditsNestedInput = {
    create?: XOR<obligationsCreateWithoutCreditsInput, obligationsUncheckedCreateWithoutCreditsInput>
    connectOrCreate?: obligationsCreateOrConnectWithoutCreditsInput
    upsert?: obligationsUpsertWithoutCreditsInput
    connect?: obligationsWhereUniqueInput
    update?: XOR<XOR<obligationsUpdateToOneWithWhereWithoutCreditsInput, obligationsUpdateWithoutCreditsInput>, obligationsUncheckedUpdateWithoutCreditsInput>
  }

  export type bank_movementsCreateNestedOneWithoutMovement_matchesInput = {
    create?: XOR<bank_movementsCreateWithoutMovement_matchesInput, bank_movementsUncheckedCreateWithoutMovement_matchesInput>
    connectOrCreate?: bank_movementsCreateOrConnectWithoutMovement_matchesInput
    connect?: bank_movementsWhereUniqueInput
  }

  export type obligationsCreateNestedOneWithoutMovement_matchesInput = {
    create?: XOR<obligationsCreateWithoutMovement_matchesInput, obligationsUncheckedCreateWithoutMovement_matchesInput>
    connectOrCreate?: obligationsCreateOrConnectWithoutMovement_matchesInput
    connect?: obligationsWhereUniqueInput
  }

  export type bank_movementsUpdateOneRequiredWithoutMovement_matchesNestedInput = {
    create?: XOR<bank_movementsCreateWithoutMovement_matchesInput, bank_movementsUncheckedCreateWithoutMovement_matchesInput>
    connectOrCreate?: bank_movementsCreateOrConnectWithoutMovement_matchesInput
    upsert?: bank_movementsUpsertWithoutMovement_matchesInput
    connect?: bank_movementsWhereUniqueInput
    update?: XOR<XOR<bank_movementsUpdateToOneWithWhereWithoutMovement_matchesInput, bank_movementsUpdateWithoutMovement_matchesInput>, bank_movementsUncheckedUpdateWithoutMovement_matchesInput>
  }

  export type obligationsUpdateOneRequiredWithoutMovement_matchesNestedInput = {
    create?: XOR<obligationsCreateWithoutMovement_matchesInput, obligationsUncheckedCreateWithoutMovement_matchesInput>
    connectOrCreate?: obligationsCreateOrConnectWithoutMovement_matchesInput
    upsert?: obligationsUpsertWithoutMovement_matchesInput
    connect?: obligationsWhereUniqueInput
    update?: XOR<XOR<obligationsUpdateToOneWithWhereWithoutMovement_matchesInput, obligationsUpdateWithoutMovement_matchesInput>, obligationsUncheckedUpdateWithoutMovement_matchesInput>
  }

  export type obligationsCreateNestedOneWithoutObligation_documentsInput = {
    create?: XOR<obligationsCreateWithoutObligation_documentsInput, obligationsUncheckedCreateWithoutObligation_documentsInput>
    connectOrCreate?: obligationsCreateOrConnectWithoutObligation_documentsInput
    connect?: obligationsWhereUniqueInput
  }

  export type usersCreateNestedOneWithoutObligation_documentsInput = {
    create?: XOR<usersCreateWithoutObligation_documentsInput, usersUncheckedCreateWithoutObligation_documentsInput>
    connectOrCreate?: usersCreateOrConnectWithoutObligation_documentsInput
    connect?: usersWhereUniqueInput
  }

  export type obligationsUpdateOneRequiredWithoutObligation_documentsNestedInput = {
    create?: XOR<obligationsCreateWithoutObligation_documentsInput, obligationsUncheckedCreateWithoutObligation_documentsInput>
    connectOrCreate?: obligationsCreateOrConnectWithoutObligation_documentsInput
    upsert?: obligationsUpsertWithoutObligation_documentsInput
    connect?: obligationsWhereUniqueInput
    update?: XOR<XOR<obligationsUpdateToOneWithWhereWithoutObligation_documentsInput, obligationsUpdateWithoutObligation_documentsInput>, obligationsUncheckedUpdateWithoutObligation_documentsInput>
  }

  export type usersUpdateOneWithoutObligation_documentsNestedInput = {
    create?: XOR<usersCreateWithoutObligation_documentsInput, usersUncheckedCreateWithoutObligation_documentsInput>
    connectOrCreate?: usersCreateOrConnectWithoutObligation_documentsInput
    upsert?: usersUpsertWithoutObligation_documentsInput
    disconnect?: usersWhereInput | boolean
    delete?: usersWhereInput | boolean
    connect?: usersWhereUniqueInput
    update?: XOR<XOR<usersUpdateToOneWithWhereWithoutObligation_documentsInput, usersUpdateWithoutObligation_documentsInput>, usersUncheckedUpdateWithoutObligation_documentsInput>
  }

  export type obligationsCreateNestedManyWithoutObligation_typesInput = {
    create?: XOR<obligationsCreateWithoutObligation_typesInput, obligationsUncheckedCreateWithoutObligation_typesInput> | obligationsCreateWithoutObligation_typesInput[] | obligationsUncheckedCreateWithoutObligation_typesInput[]
    connectOrCreate?: obligationsCreateOrConnectWithoutObligation_typesInput | obligationsCreateOrConnectWithoutObligation_typesInput[]
    createMany?: obligationsCreateManyObligation_typesInputEnvelope
    connect?: obligationsWhereUniqueInput | obligationsWhereUniqueInput[]
  }

  export type obligationsUncheckedCreateNestedManyWithoutObligation_typesInput = {
    create?: XOR<obligationsCreateWithoutObligation_typesInput, obligationsUncheckedCreateWithoutObligation_typesInput> | obligationsCreateWithoutObligation_typesInput[] | obligationsUncheckedCreateWithoutObligation_typesInput[]
    connectOrCreate?: obligationsCreateOrConnectWithoutObligation_typesInput | obligationsCreateOrConnectWithoutObligation_typesInput[]
    createMany?: obligationsCreateManyObligation_typesInputEnvelope
    connect?: obligationsWhereUniqueInput | obligationsWhereUniqueInput[]
  }

  export type obligationsUpdateManyWithoutObligation_typesNestedInput = {
    create?: XOR<obligationsCreateWithoutObligation_typesInput, obligationsUncheckedCreateWithoutObligation_typesInput> | obligationsCreateWithoutObligation_typesInput[] | obligationsUncheckedCreateWithoutObligation_typesInput[]
    connectOrCreate?: obligationsCreateOrConnectWithoutObligation_typesInput | obligationsCreateOrConnectWithoutObligation_typesInput[]
    upsert?: obligationsUpsertWithWhereUniqueWithoutObligation_typesInput | obligationsUpsertWithWhereUniqueWithoutObligation_typesInput[]
    createMany?: obligationsCreateManyObligation_typesInputEnvelope
    set?: obligationsWhereUniqueInput | obligationsWhereUniqueInput[]
    disconnect?: obligationsWhereUniqueInput | obligationsWhereUniqueInput[]
    delete?: obligationsWhereUniqueInput | obligationsWhereUniqueInput[]
    connect?: obligationsWhereUniqueInput | obligationsWhereUniqueInput[]
    update?: obligationsUpdateWithWhereUniqueWithoutObligation_typesInput | obligationsUpdateWithWhereUniqueWithoutObligation_typesInput[]
    updateMany?: obligationsUpdateManyWithWhereWithoutObligation_typesInput | obligationsUpdateManyWithWhereWithoutObligation_typesInput[]
    deleteMany?: obligationsScalarWhereInput | obligationsScalarWhereInput[]
  }

  export type obligationsUncheckedUpdateManyWithoutObligation_typesNestedInput = {
    create?: XOR<obligationsCreateWithoutObligation_typesInput, obligationsUncheckedCreateWithoutObligation_typesInput> | obligationsCreateWithoutObligation_typesInput[] | obligationsUncheckedCreateWithoutObligation_typesInput[]
    connectOrCreate?: obligationsCreateOrConnectWithoutObligation_typesInput | obligationsCreateOrConnectWithoutObligation_typesInput[]
    upsert?: obligationsUpsertWithWhereUniqueWithoutObligation_typesInput | obligationsUpsertWithWhereUniqueWithoutObligation_typesInput[]
    createMany?: obligationsCreateManyObligation_typesInputEnvelope
    set?: obligationsWhereUniqueInput | obligationsWhereUniqueInput[]
    disconnect?: obligationsWhereUniqueInput | obligationsWhereUniqueInput[]
    delete?: obligationsWhereUniqueInput | obligationsWhereUniqueInput[]
    connect?: obligationsWhereUniqueInput | obligationsWhereUniqueInput[]
    update?: obligationsUpdateWithWhereUniqueWithoutObligation_typesInput | obligationsUpdateWithWhereUniqueWithoutObligation_typesInput[]
    updateMany?: obligationsUpdateManyWithWhereWithoutObligation_typesInput | obligationsUpdateManyWithWhereWithoutObligation_typesInput[]
    deleteMany?: obligationsScalarWhereInput | obligationsScalarWhereInput[]
  }

  export type creditsCreateNestedOneWithoutObligationsInput = {
    create?: XOR<creditsCreateWithoutObligationsInput, creditsUncheckedCreateWithoutObligationsInput>
    connectOrCreate?: creditsCreateOrConnectWithoutObligationsInput
    connect?: creditsWhereUniqueInput
  }

  export type movement_matchesCreateNestedManyWithoutObligationsInput = {
    create?: XOR<movement_matchesCreateWithoutObligationsInput, movement_matchesUncheckedCreateWithoutObligationsInput> | movement_matchesCreateWithoutObligationsInput[] | movement_matchesUncheckedCreateWithoutObligationsInput[]
    connectOrCreate?: movement_matchesCreateOrConnectWithoutObligationsInput | movement_matchesCreateOrConnectWithoutObligationsInput[]
    createMany?: movement_matchesCreateManyObligationsInputEnvelope
    connect?: movement_matchesWhereUniqueInput | movement_matchesWhereUniqueInput[]
  }

  export type obligation_documentsCreateNestedManyWithoutObligationsInput = {
    create?: XOR<obligation_documentsCreateWithoutObligationsInput, obligation_documentsUncheckedCreateWithoutObligationsInput> | obligation_documentsCreateWithoutObligationsInput[] | obligation_documentsUncheckedCreateWithoutObligationsInput[]
    connectOrCreate?: obligation_documentsCreateOrConnectWithoutObligationsInput | obligation_documentsCreateOrConnectWithoutObligationsInput[]
    createMany?: obligation_documentsCreateManyObligationsInputEnvelope
    connect?: obligation_documentsWhereUniqueInput | obligation_documentsWhereUniqueInput[]
  }

  export type projectsCreateNestedOneWithoutObligationsInput = {
    create?: XOR<projectsCreateWithoutObligationsInput, projectsUncheckedCreateWithoutObligationsInput>
    connectOrCreate?: projectsCreateOrConnectWithoutObligationsInput
    connect?: projectsWhereUniqueInput
  }

  export type obligation_typesCreateNestedOneWithoutObligationsInput = {
    create?: XOR<obligation_typesCreateWithoutObligationsInput, obligation_typesUncheckedCreateWithoutObligationsInput>
    connectOrCreate?: obligation_typesCreateOrConnectWithoutObligationsInput
    connect?: obligation_typesWhereUniqueInput
  }

  export type creditsUncheckedCreateNestedOneWithoutObligationsInput = {
    create?: XOR<creditsCreateWithoutObligationsInput, creditsUncheckedCreateWithoutObligationsInput>
    connectOrCreate?: creditsCreateOrConnectWithoutObligationsInput
    connect?: creditsWhereUniqueInput
  }

  export type movement_matchesUncheckedCreateNestedManyWithoutObligationsInput = {
    create?: XOR<movement_matchesCreateWithoutObligationsInput, movement_matchesUncheckedCreateWithoutObligationsInput> | movement_matchesCreateWithoutObligationsInput[] | movement_matchesUncheckedCreateWithoutObligationsInput[]
    connectOrCreate?: movement_matchesCreateOrConnectWithoutObligationsInput | movement_matchesCreateOrConnectWithoutObligationsInput[]
    createMany?: movement_matchesCreateManyObligationsInputEnvelope
    connect?: movement_matchesWhereUniqueInput | movement_matchesWhereUniqueInput[]
  }

  export type obligation_documentsUncheckedCreateNestedManyWithoutObligationsInput = {
    create?: XOR<obligation_documentsCreateWithoutObligationsInput, obligation_documentsUncheckedCreateWithoutObligationsInput> | obligation_documentsCreateWithoutObligationsInput[] | obligation_documentsUncheckedCreateWithoutObligationsInput[]
    connectOrCreate?: obligation_documentsCreateOrConnectWithoutObligationsInput | obligation_documentsCreateOrConnectWithoutObligationsInput[]
    createMany?: obligation_documentsCreateManyObligationsInputEnvelope
    connect?: obligation_documentsWhereUniqueInput | obligation_documentsWhereUniqueInput[]
  }

  export type creditsUpdateOneWithoutObligationsNestedInput = {
    create?: XOR<creditsCreateWithoutObligationsInput, creditsUncheckedCreateWithoutObligationsInput>
    connectOrCreate?: creditsCreateOrConnectWithoutObligationsInput
    upsert?: creditsUpsertWithoutObligationsInput
    disconnect?: creditsWhereInput | boolean
    delete?: creditsWhereInput | boolean
    connect?: creditsWhereUniqueInput
    update?: XOR<XOR<creditsUpdateToOneWithWhereWithoutObligationsInput, creditsUpdateWithoutObligationsInput>, creditsUncheckedUpdateWithoutObligationsInput>
  }

  export type movement_matchesUpdateManyWithoutObligationsNestedInput = {
    create?: XOR<movement_matchesCreateWithoutObligationsInput, movement_matchesUncheckedCreateWithoutObligationsInput> | movement_matchesCreateWithoutObligationsInput[] | movement_matchesUncheckedCreateWithoutObligationsInput[]
    connectOrCreate?: movement_matchesCreateOrConnectWithoutObligationsInput | movement_matchesCreateOrConnectWithoutObligationsInput[]
    upsert?: movement_matchesUpsertWithWhereUniqueWithoutObligationsInput | movement_matchesUpsertWithWhereUniqueWithoutObligationsInput[]
    createMany?: movement_matchesCreateManyObligationsInputEnvelope
    set?: movement_matchesWhereUniqueInput | movement_matchesWhereUniqueInput[]
    disconnect?: movement_matchesWhereUniqueInput | movement_matchesWhereUniqueInput[]
    delete?: movement_matchesWhereUniqueInput | movement_matchesWhereUniqueInput[]
    connect?: movement_matchesWhereUniqueInput | movement_matchesWhereUniqueInput[]
    update?: movement_matchesUpdateWithWhereUniqueWithoutObligationsInput | movement_matchesUpdateWithWhereUniqueWithoutObligationsInput[]
    updateMany?: movement_matchesUpdateManyWithWhereWithoutObligationsInput | movement_matchesUpdateManyWithWhereWithoutObligationsInput[]
    deleteMany?: movement_matchesScalarWhereInput | movement_matchesScalarWhereInput[]
  }

  export type obligation_documentsUpdateManyWithoutObligationsNestedInput = {
    create?: XOR<obligation_documentsCreateWithoutObligationsInput, obligation_documentsUncheckedCreateWithoutObligationsInput> | obligation_documentsCreateWithoutObligationsInput[] | obligation_documentsUncheckedCreateWithoutObligationsInput[]
    connectOrCreate?: obligation_documentsCreateOrConnectWithoutObligationsInput | obligation_documentsCreateOrConnectWithoutObligationsInput[]
    upsert?: obligation_documentsUpsertWithWhereUniqueWithoutObligationsInput | obligation_documentsUpsertWithWhereUniqueWithoutObligationsInput[]
    createMany?: obligation_documentsCreateManyObligationsInputEnvelope
    set?: obligation_documentsWhereUniqueInput | obligation_documentsWhereUniqueInput[]
    disconnect?: obligation_documentsWhereUniqueInput | obligation_documentsWhereUniqueInput[]
    delete?: obligation_documentsWhereUniqueInput | obligation_documentsWhereUniqueInput[]
    connect?: obligation_documentsWhereUniqueInput | obligation_documentsWhereUniqueInput[]
    update?: obligation_documentsUpdateWithWhereUniqueWithoutObligationsInput | obligation_documentsUpdateWithWhereUniqueWithoutObligationsInput[]
    updateMany?: obligation_documentsUpdateManyWithWhereWithoutObligationsInput | obligation_documentsUpdateManyWithWhereWithoutObligationsInput[]
    deleteMany?: obligation_documentsScalarWhereInput | obligation_documentsScalarWhereInput[]
  }

  export type projectsUpdateOneRequiredWithoutObligationsNestedInput = {
    create?: XOR<projectsCreateWithoutObligationsInput, projectsUncheckedCreateWithoutObligationsInput>
    connectOrCreate?: projectsCreateOrConnectWithoutObligationsInput
    upsert?: projectsUpsertWithoutObligationsInput
    connect?: projectsWhereUniqueInput
    update?: XOR<XOR<projectsUpdateToOneWithWhereWithoutObligationsInput, projectsUpdateWithoutObligationsInput>, projectsUncheckedUpdateWithoutObligationsInput>
  }

  export type obligation_typesUpdateOneRequiredWithoutObligationsNestedInput = {
    create?: XOR<obligation_typesCreateWithoutObligationsInput, obligation_typesUncheckedCreateWithoutObligationsInput>
    connectOrCreate?: obligation_typesCreateOrConnectWithoutObligationsInput
    upsert?: obligation_typesUpsertWithoutObligationsInput
    connect?: obligation_typesWhereUniqueInput
    update?: XOR<XOR<obligation_typesUpdateToOneWithWhereWithoutObligationsInput, obligation_typesUpdateWithoutObligationsInput>, obligation_typesUncheckedUpdateWithoutObligationsInput>
  }

  export type creditsUncheckedUpdateOneWithoutObligationsNestedInput = {
    create?: XOR<creditsCreateWithoutObligationsInput, creditsUncheckedCreateWithoutObligationsInput>
    connectOrCreate?: creditsCreateOrConnectWithoutObligationsInput
    upsert?: creditsUpsertWithoutObligationsInput
    disconnect?: creditsWhereInput | boolean
    delete?: creditsWhereInput | boolean
    connect?: creditsWhereUniqueInput
    update?: XOR<XOR<creditsUpdateToOneWithWhereWithoutObligationsInput, creditsUpdateWithoutObligationsInput>, creditsUncheckedUpdateWithoutObligationsInput>
  }

  export type movement_matchesUncheckedUpdateManyWithoutObligationsNestedInput = {
    create?: XOR<movement_matchesCreateWithoutObligationsInput, movement_matchesUncheckedCreateWithoutObligationsInput> | movement_matchesCreateWithoutObligationsInput[] | movement_matchesUncheckedCreateWithoutObligationsInput[]
    connectOrCreate?: movement_matchesCreateOrConnectWithoutObligationsInput | movement_matchesCreateOrConnectWithoutObligationsInput[]
    upsert?: movement_matchesUpsertWithWhereUniqueWithoutObligationsInput | movement_matchesUpsertWithWhereUniqueWithoutObligationsInput[]
    createMany?: movement_matchesCreateManyObligationsInputEnvelope
    set?: movement_matchesWhereUniqueInput | movement_matchesWhereUniqueInput[]
    disconnect?: movement_matchesWhereUniqueInput | movement_matchesWhereUniqueInput[]
    delete?: movement_matchesWhereUniqueInput | movement_matchesWhereUniqueInput[]
    connect?: movement_matchesWhereUniqueInput | movement_matchesWhereUniqueInput[]
    update?: movement_matchesUpdateWithWhereUniqueWithoutObligationsInput | movement_matchesUpdateWithWhereUniqueWithoutObligationsInput[]
    updateMany?: movement_matchesUpdateManyWithWhereWithoutObligationsInput | movement_matchesUpdateManyWithWhereWithoutObligationsInput[]
    deleteMany?: movement_matchesScalarWhereInput | movement_matchesScalarWhereInput[]
  }

  export type obligation_documentsUncheckedUpdateManyWithoutObligationsNestedInput = {
    create?: XOR<obligation_documentsCreateWithoutObligationsInput, obligation_documentsUncheckedCreateWithoutObligationsInput> | obligation_documentsCreateWithoutObligationsInput[] | obligation_documentsUncheckedCreateWithoutObligationsInput[]
    connectOrCreate?: obligation_documentsCreateOrConnectWithoutObligationsInput | obligation_documentsCreateOrConnectWithoutObligationsInput[]
    upsert?: obligation_documentsUpsertWithWhereUniqueWithoutObligationsInput | obligation_documentsUpsertWithWhereUniqueWithoutObligationsInput[]
    createMany?: obligation_documentsCreateManyObligationsInputEnvelope
    set?: obligation_documentsWhereUniqueInput | obligation_documentsWhereUniqueInput[]
    disconnect?: obligation_documentsWhereUniqueInput | obligation_documentsWhereUniqueInput[]
    delete?: obligation_documentsWhereUniqueInput | obligation_documentsWhereUniqueInput[]
    connect?: obligation_documentsWhereUniqueInput | obligation_documentsWhereUniqueInput[]
    update?: obligation_documentsUpdateWithWhereUniqueWithoutObligationsInput | obligation_documentsUpdateWithWhereUniqueWithoutObligationsInput[]
    updateMany?: obligation_documentsUpdateManyWithWhereWithoutObligationsInput | obligation_documentsUpdateManyWithWhereWithoutObligationsInput[]
    deleteMany?: obligation_documentsScalarWhereInput | obligation_documentsScalarWhereInput[]
  }

  export type bank_movementsCreateNestedManyWithoutProjectsInput = {
    create?: XOR<bank_movementsCreateWithoutProjectsInput, bank_movementsUncheckedCreateWithoutProjectsInput> | bank_movementsCreateWithoutProjectsInput[] | bank_movementsUncheckedCreateWithoutProjectsInput[]
    connectOrCreate?: bank_movementsCreateOrConnectWithoutProjectsInput | bank_movementsCreateOrConnectWithoutProjectsInput[]
    createMany?: bank_movementsCreateManyProjectsInputEnvelope
    connect?: bank_movementsWhereUniqueInput | bank_movementsWhereUniqueInput[]
  }

  export type obligationsCreateNestedManyWithoutProjectsInput = {
    create?: XOR<obligationsCreateWithoutProjectsInput, obligationsUncheckedCreateWithoutProjectsInput> | obligationsCreateWithoutProjectsInput[] | obligationsUncheckedCreateWithoutProjectsInput[]
    connectOrCreate?: obligationsCreateOrConnectWithoutProjectsInput | obligationsCreateOrConnectWithoutProjectsInput[]
    createMany?: obligationsCreateManyProjectsInputEnvelope
    connect?: obligationsWhereUniqueInput | obligationsWhereUniqueInput[]
  }

  export type companiesCreateNestedOneWithoutProjectsInput = {
    create?: XOR<companiesCreateWithoutProjectsInput, companiesUncheckedCreateWithoutProjectsInput>
    connectOrCreate?: companiesCreateOrConnectWithoutProjectsInput
    connect?: companiesWhereUniqueInput
  }

  export type bank_movementsUncheckedCreateNestedManyWithoutProjectsInput = {
    create?: XOR<bank_movementsCreateWithoutProjectsInput, bank_movementsUncheckedCreateWithoutProjectsInput> | bank_movementsCreateWithoutProjectsInput[] | bank_movementsUncheckedCreateWithoutProjectsInput[]
    connectOrCreate?: bank_movementsCreateOrConnectWithoutProjectsInput | bank_movementsCreateOrConnectWithoutProjectsInput[]
    createMany?: bank_movementsCreateManyProjectsInputEnvelope
    connect?: bank_movementsWhereUniqueInput | bank_movementsWhereUniqueInput[]
  }

  export type obligationsUncheckedCreateNestedManyWithoutProjectsInput = {
    create?: XOR<obligationsCreateWithoutProjectsInput, obligationsUncheckedCreateWithoutProjectsInput> | obligationsCreateWithoutProjectsInput[] | obligationsUncheckedCreateWithoutProjectsInput[]
    connectOrCreate?: obligationsCreateOrConnectWithoutProjectsInput | obligationsCreateOrConnectWithoutProjectsInput[]
    createMany?: obligationsCreateManyProjectsInputEnvelope
    connect?: obligationsWhereUniqueInput | obligationsWhereUniqueInput[]
  }

  export type bank_movementsUpdateManyWithoutProjectsNestedInput = {
    create?: XOR<bank_movementsCreateWithoutProjectsInput, bank_movementsUncheckedCreateWithoutProjectsInput> | bank_movementsCreateWithoutProjectsInput[] | bank_movementsUncheckedCreateWithoutProjectsInput[]
    connectOrCreate?: bank_movementsCreateOrConnectWithoutProjectsInput | bank_movementsCreateOrConnectWithoutProjectsInput[]
    upsert?: bank_movementsUpsertWithWhereUniqueWithoutProjectsInput | bank_movementsUpsertWithWhereUniqueWithoutProjectsInput[]
    createMany?: bank_movementsCreateManyProjectsInputEnvelope
    set?: bank_movementsWhereUniqueInput | bank_movementsWhereUniqueInput[]
    disconnect?: bank_movementsWhereUniqueInput | bank_movementsWhereUniqueInput[]
    delete?: bank_movementsWhereUniqueInput | bank_movementsWhereUniqueInput[]
    connect?: bank_movementsWhereUniqueInput | bank_movementsWhereUniqueInput[]
    update?: bank_movementsUpdateWithWhereUniqueWithoutProjectsInput | bank_movementsUpdateWithWhereUniqueWithoutProjectsInput[]
    updateMany?: bank_movementsUpdateManyWithWhereWithoutProjectsInput | bank_movementsUpdateManyWithWhereWithoutProjectsInput[]
    deleteMany?: bank_movementsScalarWhereInput | bank_movementsScalarWhereInput[]
  }

  export type obligationsUpdateManyWithoutProjectsNestedInput = {
    create?: XOR<obligationsCreateWithoutProjectsInput, obligationsUncheckedCreateWithoutProjectsInput> | obligationsCreateWithoutProjectsInput[] | obligationsUncheckedCreateWithoutProjectsInput[]
    connectOrCreate?: obligationsCreateOrConnectWithoutProjectsInput | obligationsCreateOrConnectWithoutProjectsInput[]
    upsert?: obligationsUpsertWithWhereUniqueWithoutProjectsInput | obligationsUpsertWithWhereUniqueWithoutProjectsInput[]
    createMany?: obligationsCreateManyProjectsInputEnvelope
    set?: obligationsWhereUniqueInput | obligationsWhereUniqueInput[]
    disconnect?: obligationsWhereUniqueInput | obligationsWhereUniqueInput[]
    delete?: obligationsWhereUniqueInput | obligationsWhereUniqueInput[]
    connect?: obligationsWhereUniqueInput | obligationsWhereUniqueInput[]
    update?: obligationsUpdateWithWhereUniqueWithoutProjectsInput | obligationsUpdateWithWhereUniqueWithoutProjectsInput[]
    updateMany?: obligationsUpdateManyWithWhereWithoutProjectsInput | obligationsUpdateManyWithWhereWithoutProjectsInput[]
    deleteMany?: obligationsScalarWhereInput | obligationsScalarWhereInput[]
  }

  export type companiesUpdateOneRequiredWithoutProjectsNestedInput = {
    create?: XOR<companiesCreateWithoutProjectsInput, companiesUncheckedCreateWithoutProjectsInput>
    connectOrCreate?: companiesCreateOrConnectWithoutProjectsInput
    upsert?: companiesUpsertWithoutProjectsInput
    connect?: companiesWhereUniqueInput
    update?: XOR<XOR<companiesUpdateToOneWithWhereWithoutProjectsInput, companiesUpdateWithoutProjectsInput>, companiesUncheckedUpdateWithoutProjectsInput>
  }

  export type bank_movementsUncheckedUpdateManyWithoutProjectsNestedInput = {
    create?: XOR<bank_movementsCreateWithoutProjectsInput, bank_movementsUncheckedCreateWithoutProjectsInput> | bank_movementsCreateWithoutProjectsInput[] | bank_movementsUncheckedCreateWithoutProjectsInput[]
    connectOrCreate?: bank_movementsCreateOrConnectWithoutProjectsInput | bank_movementsCreateOrConnectWithoutProjectsInput[]
    upsert?: bank_movementsUpsertWithWhereUniqueWithoutProjectsInput | bank_movementsUpsertWithWhereUniqueWithoutProjectsInput[]
    createMany?: bank_movementsCreateManyProjectsInputEnvelope
    set?: bank_movementsWhereUniqueInput | bank_movementsWhereUniqueInput[]
    disconnect?: bank_movementsWhereUniqueInput | bank_movementsWhereUniqueInput[]
    delete?: bank_movementsWhereUniqueInput | bank_movementsWhereUniqueInput[]
    connect?: bank_movementsWhereUniqueInput | bank_movementsWhereUniqueInput[]
    update?: bank_movementsUpdateWithWhereUniqueWithoutProjectsInput | bank_movementsUpdateWithWhereUniqueWithoutProjectsInput[]
    updateMany?: bank_movementsUpdateManyWithWhereWithoutProjectsInput | bank_movementsUpdateManyWithWhereWithoutProjectsInput[]
    deleteMany?: bank_movementsScalarWhereInput | bank_movementsScalarWhereInput[]
  }

  export type obligationsUncheckedUpdateManyWithoutProjectsNestedInput = {
    create?: XOR<obligationsCreateWithoutProjectsInput, obligationsUncheckedCreateWithoutProjectsInput> | obligationsCreateWithoutProjectsInput[] | obligationsUncheckedCreateWithoutProjectsInput[]
    connectOrCreate?: obligationsCreateOrConnectWithoutProjectsInput | obligationsCreateOrConnectWithoutProjectsInput[]
    upsert?: obligationsUpsertWithWhereUniqueWithoutProjectsInput | obligationsUpsertWithWhereUniqueWithoutProjectsInput[]
    createMany?: obligationsCreateManyProjectsInputEnvelope
    set?: obligationsWhereUniqueInput | obligationsWhereUniqueInput[]
    disconnect?: obligationsWhereUniqueInput | obligationsWhereUniqueInput[]
    delete?: obligationsWhereUniqueInput | obligationsWhereUniqueInput[]
    connect?: obligationsWhereUniqueInput | obligationsWhereUniqueInput[]
    update?: obligationsUpdateWithWhereUniqueWithoutProjectsInput | obligationsUpdateWithWhereUniqueWithoutProjectsInput[]
    updateMany?: obligationsUpdateManyWithWhereWithoutProjectsInput | obligationsUpdateManyWithWhereWithoutProjectsInput[]
    deleteMany?: obligationsScalarWhereInput | obligationsScalarWhereInput[]
  }

  export type bank_movementsCreateNestedManyWithoutSub_accountsInput = {
    create?: XOR<bank_movementsCreateWithoutSub_accountsInput, bank_movementsUncheckedCreateWithoutSub_accountsInput> | bank_movementsCreateWithoutSub_accountsInput[] | bank_movementsUncheckedCreateWithoutSub_accountsInput[]
    connectOrCreate?: bank_movementsCreateOrConnectWithoutSub_accountsInput | bank_movementsCreateOrConnectWithoutSub_accountsInput[]
    createMany?: bank_movementsCreateManySub_accountsInputEnvelope
    connect?: bank_movementsWhereUniqueInput | bank_movementsWhereUniqueInput[]
  }

  export type cost_centersCreateNestedOneWithoutSub_accountsInput = {
    create?: XOR<cost_centersCreateWithoutSub_accountsInput, cost_centersUncheckedCreateWithoutSub_accountsInput>
    connectOrCreate?: cost_centersCreateOrConnectWithoutSub_accountsInput
    connect?: cost_centersWhereUniqueInput
  }

  export type bank_movementsUncheckedCreateNestedManyWithoutSub_accountsInput = {
    create?: XOR<bank_movementsCreateWithoutSub_accountsInput, bank_movementsUncheckedCreateWithoutSub_accountsInput> | bank_movementsCreateWithoutSub_accountsInput[] | bank_movementsUncheckedCreateWithoutSub_accountsInput[]
    connectOrCreate?: bank_movementsCreateOrConnectWithoutSub_accountsInput | bank_movementsCreateOrConnectWithoutSub_accountsInput[]
    createMany?: bank_movementsCreateManySub_accountsInputEnvelope
    connect?: bank_movementsWhereUniqueInput | bank_movementsWhereUniqueInput[]
  }

  export type bank_movementsUpdateManyWithoutSub_accountsNestedInput = {
    create?: XOR<bank_movementsCreateWithoutSub_accountsInput, bank_movementsUncheckedCreateWithoutSub_accountsInput> | bank_movementsCreateWithoutSub_accountsInput[] | bank_movementsUncheckedCreateWithoutSub_accountsInput[]
    connectOrCreate?: bank_movementsCreateOrConnectWithoutSub_accountsInput | bank_movementsCreateOrConnectWithoutSub_accountsInput[]
    upsert?: bank_movementsUpsertWithWhereUniqueWithoutSub_accountsInput | bank_movementsUpsertWithWhereUniqueWithoutSub_accountsInput[]
    createMany?: bank_movementsCreateManySub_accountsInputEnvelope
    set?: bank_movementsWhereUniqueInput | bank_movementsWhereUniqueInput[]
    disconnect?: bank_movementsWhereUniqueInput | bank_movementsWhereUniqueInput[]
    delete?: bank_movementsWhereUniqueInput | bank_movementsWhereUniqueInput[]
    connect?: bank_movementsWhereUniqueInput | bank_movementsWhereUniqueInput[]
    update?: bank_movementsUpdateWithWhereUniqueWithoutSub_accountsInput | bank_movementsUpdateWithWhereUniqueWithoutSub_accountsInput[]
    updateMany?: bank_movementsUpdateManyWithWhereWithoutSub_accountsInput | bank_movementsUpdateManyWithWhereWithoutSub_accountsInput[]
    deleteMany?: bank_movementsScalarWhereInput | bank_movementsScalarWhereInput[]
  }

  export type cost_centersUpdateOneRequiredWithoutSub_accountsNestedInput = {
    create?: XOR<cost_centersCreateWithoutSub_accountsInput, cost_centersUncheckedCreateWithoutSub_accountsInput>
    connectOrCreate?: cost_centersCreateOrConnectWithoutSub_accountsInput
    upsert?: cost_centersUpsertWithoutSub_accountsInput
    connect?: cost_centersWhereUniqueInput
    update?: XOR<XOR<cost_centersUpdateToOneWithWhereWithoutSub_accountsInput, cost_centersUpdateWithoutSub_accountsInput>, cost_centersUncheckedUpdateWithoutSub_accountsInput>
  }

  export type bank_movementsUncheckedUpdateManyWithoutSub_accountsNestedInput = {
    create?: XOR<bank_movementsCreateWithoutSub_accountsInput, bank_movementsUncheckedCreateWithoutSub_accountsInput> | bank_movementsCreateWithoutSub_accountsInput[] | bank_movementsUncheckedCreateWithoutSub_accountsInput[]
    connectOrCreate?: bank_movementsCreateOrConnectWithoutSub_accountsInput | bank_movementsCreateOrConnectWithoutSub_accountsInput[]
    upsert?: bank_movementsUpsertWithWhereUniqueWithoutSub_accountsInput | bank_movementsUpsertWithWhereUniqueWithoutSub_accountsInput[]
    createMany?: bank_movementsCreateManySub_accountsInputEnvelope
    set?: bank_movementsWhereUniqueInput | bank_movementsWhereUniqueInput[]
    disconnect?: bank_movementsWhereUniqueInput | bank_movementsWhereUniqueInput[]
    delete?: bank_movementsWhereUniqueInput | bank_movementsWhereUniqueInput[]
    connect?: bank_movementsWhereUniqueInput | bank_movementsWhereUniqueInput[]
    update?: bank_movementsUpdateWithWhereUniqueWithoutSub_accountsInput | bank_movementsUpdateWithWhereUniqueWithoutSub_accountsInput[]
    updateMany?: bank_movementsUpdateManyWithWhereWithoutSub_accountsInput | bank_movementsUpdateManyWithWhereWithoutSub_accountsInput[]
    deleteMany?: bank_movementsScalarWhereInput | bank_movementsScalarWhereInput[]
  }

  export type bank_movementsCreateNestedManyWithoutUsersInput = {
    create?: XOR<bank_movementsCreateWithoutUsersInput, bank_movementsUncheckedCreateWithoutUsersInput> | bank_movementsCreateWithoutUsersInput[] | bank_movementsUncheckedCreateWithoutUsersInput[]
    connectOrCreate?: bank_movementsCreateOrConnectWithoutUsersInput | bank_movementsCreateOrConnectWithoutUsersInput[]
    createMany?: bank_movementsCreateManyUsersInputEnvelope
    connect?: bank_movementsWhereUniqueInput | bank_movementsWhereUniqueInput[]
  }

  export type obligation_documentsCreateNestedManyWithoutUsersInput = {
    create?: XOR<obligation_documentsCreateWithoutUsersInput, obligation_documentsUncheckedCreateWithoutUsersInput> | obligation_documentsCreateWithoutUsersInput[] | obligation_documentsUncheckedCreateWithoutUsersInput[]
    connectOrCreate?: obligation_documentsCreateOrConnectWithoutUsersInput | obligation_documentsCreateOrConnectWithoutUsersInput[]
    createMany?: obligation_documentsCreateManyUsersInputEnvelope
    connect?: obligation_documentsWhereUniqueInput | obligation_documentsWhereUniqueInput[]
  }

  export type bank_movementsUncheckedCreateNestedManyWithoutUsersInput = {
    create?: XOR<bank_movementsCreateWithoutUsersInput, bank_movementsUncheckedCreateWithoutUsersInput> | bank_movementsCreateWithoutUsersInput[] | bank_movementsUncheckedCreateWithoutUsersInput[]
    connectOrCreate?: bank_movementsCreateOrConnectWithoutUsersInput | bank_movementsCreateOrConnectWithoutUsersInput[]
    createMany?: bank_movementsCreateManyUsersInputEnvelope
    connect?: bank_movementsWhereUniqueInput | bank_movementsWhereUniqueInput[]
  }

  export type obligation_documentsUncheckedCreateNestedManyWithoutUsersInput = {
    create?: XOR<obligation_documentsCreateWithoutUsersInput, obligation_documentsUncheckedCreateWithoutUsersInput> | obligation_documentsCreateWithoutUsersInput[] | obligation_documentsUncheckedCreateWithoutUsersInput[]
    connectOrCreate?: obligation_documentsCreateOrConnectWithoutUsersInput | obligation_documentsCreateOrConnectWithoutUsersInput[]
    createMany?: obligation_documentsCreateManyUsersInputEnvelope
    connect?: obligation_documentsWhereUniqueInput | obligation_documentsWhereUniqueInput[]
  }

  export type bank_movementsUpdateManyWithoutUsersNestedInput = {
    create?: XOR<bank_movementsCreateWithoutUsersInput, bank_movementsUncheckedCreateWithoutUsersInput> | bank_movementsCreateWithoutUsersInput[] | bank_movementsUncheckedCreateWithoutUsersInput[]
    connectOrCreate?: bank_movementsCreateOrConnectWithoutUsersInput | bank_movementsCreateOrConnectWithoutUsersInput[]
    upsert?: bank_movementsUpsertWithWhereUniqueWithoutUsersInput | bank_movementsUpsertWithWhereUniqueWithoutUsersInput[]
    createMany?: bank_movementsCreateManyUsersInputEnvelope
    set?: bank_movementsWhereUniqueInput | bank_movementsWhereUniqueInput[]
    disconnect?: bank_movementsWhereUniqueInput | bank_movementsWhereUniqueInput[]
    delete?: bank_movementsWhereUniqueInput | bank_movementsWhereUniqueInput[]
    connect?: bank_movementsWhereUniqueInput | bank_movementsWhereUniqueInput[]
    update?: bank_movementsUpdateWithWhereUniqueWithoutUsersInput | bank_movementsUpdateWithWhereUniqueWithoutUsersInput[]
    updateMany?: bank_movementsUpdateManyWithWhereWithoutUsersInput | bank_movementsUpdateManyWithWhereWithoutUsersInput[]
    deleteMany?: bank_movementsScalarWhereInput | bank_movementsScalarWhereInput[]
  }

  export type obligation_documentsUpdateManyWithoutUsersNestedInput = {
    create?: XOR<obligation_documentsCreateWithoutUsersInput, obligation_documentsUncheckedCreateWithoutUsersInput> | obligation_documentsCreateWithoutUsersInput[] | obligation_documentsUncheckedCreateWithoutUsersInput[]
    connectOrCreate?: obligation_documentsCreateOrConnectWithoutUsersInput | obligation_documentsCreateOrConnectWithoutUsersInput[]
    upsert?: obligation_documentsUpsertWithWhereUniqueWithoutUsersInput | obligation_documentsUpsertWithWhereUniqueWithoutUsersInput[]
    createMany?: obligation_documentsCreateManyUsersInputEnvelope
    set?: obligation_documentsWhereUniqueInput | obligation_documentsWhereUniqueInput[]
    disconnect?: obligation_documentsWhereUniqueInput | obligation_documentsWhereUniqueInput[]
    delete?: obligation_documentsWhereUniqueInput | obligation_documentsWhereUniqueInput[]
    connect?: obligation_documentsWhereUniqueInput | obligation_documentsWhereUniqueInput[]
    update?: obligation_documentsUpdateWithWhereUniqueWithoutUsersInput | obligation_documentsUpdateWithWhereUniqueWithoutUsersInput[]
    updateMany?: obligation_documentsUpdateManyWithWhereWithoutUsersInput | obligation_documentsUpdateManyWithWhereWithoutUsersInput[]
    deleteMany?: obligation_documentsScalarWhereInput | obligation_documentsScalarWhereInput[]
  }

  export type bank_movementsUncheckedUpdateManyWithoutUsersNestedInput = {
    create?: XOR<bank_movementsCreateWithoutUsersInput, bank_movementsUncheckedCreateWithoutUsersInput> | bank_movementsCreateWithoutUsersInput[] | bank_movementsUncheckedCreateWithoutUsersInput[]
    connectOrCreate?: bank_movementsCreateOrConnectWithoutUsersInput | bank_movementsCreateOrConnectWithoutUsersInput[]
    upsert?: bank_movementsUpsertWithWhereUniqueWithoutUsersInput | bank_movementsUpsertWithWhereUniqueWithoutUsersInput[]
    createMany?: bank_movementsCreateManyUsersInputEnvelope
    set?: bank_movementsWhereUniqueInput | bank_movementsWhereUniqueInput[]
    disconnect?: bank_movementsWhereUniqueInput | bank_movementsWhereUniqueInput[]
    delete?: bank_movementsWhereUniqueInput | bank_movementsWhereUniqueInput[]
    connect?: bank_movementsWhereUniqueInput | bank_movementsWhereUniqueInput[]
    update?: bank_movementsUpdateWithWhereUniqueWithoutUsersInput | bank_movementsUpdateWithWhereUniqueWithoutUsersInput[]
    updateMany?: bank_movementsUpdateManyWithWhereWithoutUsersInput | bank_movementsUpdateManyWithWhereWithoutUsersInput[]
    deleteMany?: bank_movementsScalarWhereInput | bank_movementsScalarWhereInput[]
  }

  export type obligation_documentsUncheckedUpdateManyWithoutUsersNestedInput = {
    create?: XOR<obligation_documentsCreateWithoutUsersInput, obligation_documentsUncheckedCreateWithoutUsersInput> | obligation_documentsCreateWithoutUsersInput[] | obligation_documentsUncheckedCreateWithoutUsersInput[]
    connectOrCreate?: obligation_documentsCreateOrConnectWithoutUsersInput | obligation_documentsCreateOrConnectWithoutUsersInput[]
    upsert?: obligation_documentsUpsertWithWhereUniqueWithoutUsersInput | obligation_documentsUpsertWithWhereUniqueWithoutUsersInput[]
    createMany?: obligation_documentsCreateManyUsersInputEnvelope
    set?: obligation_documentsWhereUniqueInput | obligation_documentsWhereUniqueInput[]
    disconnect?: obligation_documentsWhereUniqueInput | obligation_documentsWhereUniqueInput[]
    delete?: obligation_documentsWhereUniqueInput | obligation_documentsWhereUniqueInput[]
    connect?: obligation_documentsWhereUniqueInput | obligation_documentsWhereUniqueInput[]
    update?: obligation_documentsUpdateWithWhereUniqueWithoutUsersInput | obligation_documentsUpdateWithWhereUniqueWithoutUsersInput[]
    updateMany?: obligation_documentsUpdateManyWithWhereWithoutUsersInput | obligation_documentsUpdateManyWithWhereWithoutUsersInput[]
    deleteMany?: obligation_documentsScalarWhereInput | obligation_documentsScalarWhereInput[]
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedBigIntFilter<$PrismaModel = never> = {
    equals?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    in?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel>
    notIn?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel>
    lt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    lte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    not?: NestedBigIntFilter<$PrismaModel> | bigint | number
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedDecimalNullableFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel> | null
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel> | null
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel> | null
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalNullableFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string | null
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedBigIntNullableFilter<$PrismaModel = never> = {
    equals?: bigint | number | BigIntFieldRefInput<$PrismaModel> | null
    in?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel> | null
    notIn?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel> | null
    lt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    lte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    not?: NestedBigIntNullableFilter<$PrismaModel> | bigint | number | null
  }

  export type NestedBigIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    in?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel>
    notIn?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel>
    lt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    lte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    not?: NestedBigIntWithAggregatesFilter<$PrismaModel> | bigint | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedBigIntFilter<$PrismaModel>
    _min?: NestedBigIntFilter<$PrismaModel>
    _max?: NestedBigIntFilter<$PrismaModel>
  }

  export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedDecimalNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel> | null
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel> | null
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel> | null
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalNullableWithAggregatesFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedDecimalNullableFilter<$PrismaModel>
    _sum?: NestedDecimalNullableFilter<$PrismaModel>
    _min?: NestedDecimalNullableFilter<$PrismaModel>
    _max?: NestedDecimalNullableFilter<$PrismaModel>
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type NestedBigIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: bigint | number | BigIntFieldRefInput<$PrismaModel> | null
    in?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel> | null
    notIn?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel> | null
    lt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    lte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    not?: NestedBigIntNullableWithAggregatesFilter<$PrismaModel> | bigint | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedBigIntNullableFilter<$PrismaModel>
    _min?: NestedBigIntNullableFilter<$PrismaModel>
    _max?: NestedBigIntNullableFilter<$PrismaModel>
  }

  export type NestedDecimalFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
  }

  export type NestedDecimalWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalWithAggregatesFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedDecimalFilter<$PrismaModel>
    _sum?: NestedDecimalFilter<$PrismaModel>
    _min?: NestedDecimalFilter<$PrismaModel>
    _max?: NestedDecimalFilter<$PrismaModel>
  }

  export type companiesCreateWithoutBank_accountsInput = {
    name: string
    rut?: string | null
    address?: string | null
    created_at?: Date | string
    projects?: projectsCreateNestedManyWithoutCompaniesInput
  }

  export type companiesUncheckedCreateWithoutBank_accountsInput = {
    id?: number
    name: string
    rut?: string | null
    address?: string | null
    created_at?: Date | string
    projects?: projectsUncheckedCreateNestedManyWithoutCompaniesInput
  }

  export type companiesCreateOrConnectWithoutBank_accountsInput = {
    where: companiesWhereUniqueInput
    create: XOR<companiesCreateWithoutBank_accountsInput, companiesUncheckedCreateWithoutBank_accountsInput>
  }

  export type bank_movementsCreateWithoutBank_accountsInput = {
    id?: bigint | number
    bank_date: Date | string
    description?: string | null
    debit?: Decimal | DecimalJsLike | number | string | null
    credit?: Decimal | DecimalJsLike | number | string | null
    currency: string
    exchange_rate_date?: Date | string | null
    source: string
    import_date?: Date | string
    users?: usersCreateNestedOneWithoutBank_movementsInput
    projects?: projectsCreateNestedOneWithoutBank_movementsInput
    sub_accounts: sub_accountsCreateNestedOneWithoutBank_movementsInput
    movement_matches?: movement_matchesCreateNestedManyWithoutBank_movementsInput
  }

  export type bank_movementsUncheckedCreateWithoutBank_accountsInput = {
    id?: bigint | number
    project_id?: number | null
    bank_date: Date | string
    description?: string | null
    debit?: Decimal | DecimalJsLike | number | string | null
    credit?: Decimal | DecimalJsLike | number | string | null
    currency: string
    exchange_rate_date?: Date | string | null
    source: string
    sub_account_id: number
    created_by?: bigint | number | null
    import_date?: Date | string
    movement_matches?: movement_matchesUncheckedCreateNestedManyWithoutBank_movementsInput
  }

  export type bank_movementsCreateOrConnectWithoutBank_accountsInput = {
    where: bank_movementsWhereUniqueInput
    create: XOR<bank_movementsCreateWithoutBank_accountsInput, bank_movementsUncheckedCreateWithoutBank_accountsInput>
  }

  export type bank_movementsCreateManyBank_accountsInputEnvelope = {
    data: bank_movementsCreateManyBank_accountsInput | bank_movementsCreateManyBank_accountsInput[]
    skipDuplicates?: boolean
  }

  export type companiesUpsertWithoutBank_accountsInput = {
    update: XOR<companiesUpdateWithoutBank_accountsInput, companiesUncheckedUpdateWithoutBank_accountsInput>
    create: XOR<companiesCreateWithoutBank_accountsInput, companiesUncheckedCreateWithoutBank_accountsInput>
    where?: companiesWhereInput
  }

  export type companiesUpdateToOneWithWhereWithoutBank_accountsInput = {
    where?: companiesWhereInput
    data: XOR<companiesUpdateWithoutBank_accountsInput, companiesUncheckedUpdateWithoutBank_accountsInput>
  }

  export type companiesUpdateWithoutBank_accountsInput = {
    name?: StringFieldUpdateOperationsInput | string
    rut?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    projects?: projectsUpdateManyWithoutCompaniesNestedInput
  }

  export type companiesUncheckedUpdateWithoutBank_accountsInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    rut?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    projects?: projectsUncheckedUpdateManyWithoutCompaniesNestedInput
  }

  export type bank_movementsUpsertWithWhereUniqueWithoutBank_accountsInput = {
    where: bank_movementsWhereUniqueInput
    update: XOR<bank_movementsUpdateWithoutBank_accountsInput, bank_movementsUncheckedUpdateWithoutBank_accountsInput>
    create: XOR<bank_movementsCreateWithoutBank_accountsInput, bank_movementsUncheckedCreateWithoutBank_accountsInput>
  }

  export type bank_movementsUpdateWithWhereUniqueWithoutBank_accountsInput = {
    where: bank_movementsWhereUniqueInput
    data: XOR<bank_movementsUpdateWithoutBank_accountsInput, bank_movementsUncheckedUpdateWithoutBank_accountsInput>
  }

  export type bank_movementsUpdateManyWithWhereWithoutBank_accountsInput = {
    where: bank_movementsScalarWhereInput
    data: XOR<bank_movementsUpdateManyMutationInput, bank_movementsUncheckedUpdateManyWithoutBank_accountsInput>
  }

  export type bank_movementsScalarWhereInput = {
    AND?: bank_movementsScalarWhereInput | bank_movementsScalarWhereInput[]
    OR?: bank_movementsScalarWhereInput[]
    NOT?: bank_movementsScalarWhereInput | bank_movementsScalarWhereInput[]
    id?: BigIntFilter<"bank_movements"> | bigint | number
    bank_account_id?: IntFilter<"bank_movements"> | number
    project_id?: IntNullableFilter<"bank_movements"> | number | null
    bank_date?: DateTimeFilter<"bank_movements"> | Date | string
    description?: StringNullableFilter<"bank_movements"> | string | null
    debit?: DecimalNullableFilter<"bank_movements"> | Decimal | DecimalJsLike | number | string | null
    credit?: DecimalNullableFilter<"bank_movements"> | Decimal | DecimalJsLike | number | string | null
    currency?: StringFilter<"bank_movements"> | string
    exchange_rate_date?: DateTimeNullableFilter<"bank_movements"> | Date | string | null
    source?: StringFilter<"bank_movements"> | string
    sub_account_id?: IntFilter<"bank_movements"> | number
    created_by?: BigIntNullableFilter<"bank_movements"> | bigint | number | null
    import_date?: DateTimeFilter<"bank_movements"> | Date | string
  }

  export type bank_accountsCreateWithoutBank_movementsInput = {
    bank_name: string
    account_no: string
    currency: string
    created_at?: Date | string
    companies: companiesCreateNestedOneWithoutBank_accountsInput
  }

  export type bank_accountsUncheckedCreateWithoutBank_movementsInput = {
    id?: number
    company_id: number
    bank_name: string
    account_no: string
    currency: string
    created_at?: Date | string
  }

  export type bank_accountsCreateOrConnectWithoutBank_movementsInput = {
    where: bank_accountsWhereUniqueInput
    create: XOR<bank_accountsCreateWithoutBank_movementsInput, bank_accountsUncheckedCreateWithoutBank_movementsInput>
  }

  export type usersCreateWithoutBank_movementsInput = {
    id?: bigint | number
    name: string
    email: string
    password_hash: string
    role: string
    created_at?: Date | string
    obligation_documents?: obligation_documentsCreateNestedManyWithoutUsersInput
  }

  export type usersUncheckedCreateWithoutBank_movementsInput = {
    id?: bigint | number
    name: string
    email: string
    password_hash: string
    role: string
    created_at?: Date | string
    obligation_documents?: obligation_documentsUncheckedCreateNestedManyWithoutUsersInput
  }

  export type usersCreateOrConnectWithoutBank_movementsInput = {
    where: usersWhereUniqueInput
    create: XOR<usersCreateWithoutBank_movementsInput, usersUncheckedCreateWithoutBank_movementsInput>
  }

  export type projectsCreateWithoutBank_movementsInput = {
    code: string
    name: string
    created_at?: Date | string
    obligations?: obligationsCreateNestedManyWithoutProjectsInput
    companies: companiesCreateNestedOneWithoutProjectsInput
  }

  export type projectsUncheckedCreateWithoutBank_movementsInput = {
    id?: number
    company_id: number
    code: string
    name: string
    created_at?: Date | string
    obligations?: obligationsUncheckedCreateNestedManyWithoutProjectsInput
  }

  export type projectsCreateOrConnectWithoutBank_movementsInput = {
    where: projectsWhereUniqueInput
    create: XOR<projectsCreateWithoutBank_movementsInput, projectsUncheckedCreateWithoutBank_movementsInput>
  }

  export type sub_accountsCreateWithoutBank_movementsInput = {
    code: string
    name: string
    cost_centers: cost_centersCreateNestedOneWithoutSub_accountsInput
  }

  export type sub_accountsUncheckedCreateWithoutBank_movementsInput = {
    id?: number
    cost_center_id: number
    code: string
    name: string
  }

  export type sub_accountsCreateOrConnectWithoutBank_movementsInput = {
    where: sub_accountsWhereUniqueInput
    create: XOR<sub_accountsCreateWithoutBank_movementsInput, sub_accountsUncheckedCreateWithoutBank_movementsInput>
  }

  export type movement_matchesCreateWithoutBank_movementsInput = {
    matched_amount: Decimal | DecimalJsLike | number | string
    obligations: obligationsCreateNestedOneWithoutMovement_matchesInput
  }

  export type movement_matchesUncheckedCreateWithoutBank_movementsInput = {
    obligation_id: bigint | number
    matched_amount: Decimal | DecimalJsLike | number | string
  }

  export type movement_matchesCreateOrConnectWithoutBank_movementsInput = {
    where: movement_matchesWhereUniqueInput
    create: XOR<movement_matchesCreateWithoutBank_movementsInput, movement_matchesUncheckedCreateWithoutBank_movementsInput>
  }

  export type movement_matchesCreateManyBank_movementsInputEnvelope = {
    data: movement_matchesCreateManyBank_movementsInput | movement_matchesCreateManyBank_movementsInput[]
    skipDuplicates?: boolean
  }

  export type bank_accountsUpsertWithoutBank_movementsInput = {
    update: XOR<bank_accountsUpdateWithoutBank_movementsInput, bank_accountsUncheckedUpdateWithoutBank_movementsInput>
    create: XOR<bank_accountsCreateWithoutBank_movementsInput, bank_accountsUncheckedCreateWithoutBank_movementsInput>
    where?: bank_accountsWhereInput
  }

  export type bank_accountsUpdateToOneWithWhereWithoutBank_movementsInput = {
    where?: bank_accountsWhereInput
    data: XOR<bank_accountsUpdateWithoutBank_movementsInput, bank_accountsUncheckedUpdateWithoutBank_movementsInput>
  }

  export type bank_accountsUpdateWithoutBank_movementsInput = {
    bank_name?: StringFieldUpdateOperationsInput | string
    account_no?: StringFieldUpdateOperationsInput | string
    currency?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    companies?: companiesUpdateOneRequiredWithoutBank_accountsNestedInput
  }

  export type bank_accountsUncheckedUpdateWithoutBank_movementsInput = {
    id?: IntFieldUpdateOperationsInput | number
    company_id?: IntFieldUpdateOperationsInput | number
    bank_name?: StringFieldUpdateOperationsInput | string
    account_no?: StringFieldUpdateOperationsInput | string
    currency?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type usersUpsertWithoutBank_movementsInput = {
    update: XOR<usersUpdateWithoutBank_movementsInput, usersUncheckedUpdateWithoutBank_movementsInput>
    create: XOR<usersCreateWithoutBank_movementsInput, usersUncheckedCreateWithoutBank_movementsInput>
    where?: usersWhereInput
  }

  export type usersUpdateToOneWithWhereWithoutBank_movementsInput = {
    where?: usersWhereInput
    data: XOR<usersUpdateWithoutBank_movementsInput, usersUncheckedUpdateWithoutBank_movementsInput>
  }

  export type usersUpdateWithoutBank_movementsInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password_hash?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    obligation_documents?: obligation_documentsUpdateManyWithoutUsersNestedInput
  }

  export type usersUncheckedUpdateWithoutBank_movementsInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password_hash?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    obligation_documents?: obligation_documentsUncheckedUpdateManyWithoutUsersNestedInput
  }

  export type projectsUpsertWithoutBank_movementsInput = {
    update: XOR<projectsUpdateWithoutBank_movementsInput, projectsUncheckedUpdateWithoutBank_movementsInput>
    create: XOR<projectsCreateWithoutBank_movementsInput, projectsUncheckedCreateWithoutBank_movementsInput>
    where?: projectsWhereInput
  }

  export type projectsUpdateToOneWithWhereWithoutBank_movementsInput = {
    where?: projectsWhereInput
    data: XOR<projectsUpdateWithoutBank_movementsInput, projectsUncheckedUpdateWithoutBank_movementsInput>
  }

  export type projectsUpdateWithoutBank_movementsInput = {
    code?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    obligations?: obligationsUpdateManyWithoutProjectsNestedInput
    companies?: companiesUpdateOneRequiredWithoutProjectsNestedInput
  }

  export type projectsUncheckedUpdateWithoutBank_movementsInput = {
    id?: IntFieldUpdateOperationsInput | number
    company_id?: IntFieldUpdateOperationsInput | number
    code?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    obligations?: obligationsUncheckedUpdateManyWithoutProjectsNestedInput
  }

  export type sub_accountsUpsertWithoutBank_movementsInput = {
    update: XOR<sub_accountsUpdateWithoutBank_movementsInput, sub_accountsUncheckedUpdateWithoutBank_movementsInput>
    create: XOR<sub_accountsCreateWithoutBank_movementsInput, sub_accountsUncheckedCreateWithoutBank_movementsInput>
    where?: sub_accountsWhereInput
  }

  export type sub_accountsUpdateToOneWithWhereWithoutBank_movementsInput = {
    where?: sub_accountsWhereInput
    data: XOR<sub_accountsUpdateWithoutBank_movementsInput, sub_accountsUncheckedUpdateWithoutBank_movementsInput>
  }

  export type sub_accountsUpdateWithoutBank_movementsInput = {
    code?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    cost_centers?: cost_centersUpdateOneRequiredWithoutSub_accountsNestedInput
  }

  export type sub_accountsUncheckedUpdateWithoutBank_movementsInput = {
    id?: IntFieldUpdateOperationsInput | number
    cost_center_id?: IntFieldUpdateOperationsInput | number
    code?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
  }

  export type movement_matchesUpsertWithWhereUniqueWithoutBank_movementsInput = {
    where: movement_matchesWhereUniqueInput
    update: XOR<movement_matchesUpdateWithoutBank_movementsInput, movement_matchesUncheckedUpdateWithoutBank_movementsInput>
    create: XOR<movement_matchesCreateWithoutBank_movementsInput, movement_matchesUncheckedCreateWithoutBank_movementsInput>
  }

  export type movement_matchesUpdateWithWhereUniqueWithoutBank_movementsInput = {
    where: movement_matchesWhereUniqueInput
    data: XOR<movement_matchesUpdateWithoutBank_movementsInput, movement_matchesUncheckedUpdateWithoutBank_movementsInput>
  }

  export type movement_matchesUpdateManyWithWhereWithoutBank_movementsInput = {
    where: movement_matchesScalarWhereInput
    data: XOR<movement_matchesUpdateManyMutationInput, movement_matchesUncheckedUpdateManyWithoutBank_movementsInput>
  }

  export type movement_matchesScalarWhereInput = {
    AND?: movement_matchesScalarWhereInput | movement_matchesScalarWhereInput[]
    OR?: movement_matchesScalarWhereInput[]
    NOT?: movement_matchesScalarWhereInput | movement_matchesScalarWhereInput[]
    movement_id?: BigIntFilter<"movement_matches"> | bigint | number
    obligation_id?: BigIntFilter<"movement_matches"> | bigint | number
    matched_amount?: DecimalFilter<"movement_matches"> | Decimal | DecimalJsLike | number | string
  }

  export type bank_accountsCreateWithoutCompaniesInput = {
    bank_name: string
    account_no: string
    currency: string
    created_at?: Date | string
    bank_movements?: bank_movementsCreateNestedManyWithoutBank_accountsInput
  }

  export type bank_accountsUncheckedCreateWithoutCompaniesInput = {
    id?: number
    bank_name: string
    account_no: string
    currency: string
    created_at?: Date | string
    bank_movements?: bank_movementsUncheckedCreateNestedManyWithoutBank_accountsInput
  }

  export type bank_accountsCreateOrConnectWithoutCompaniesInput = {
    where: bank_accountsWhereUniqueInput
    create: XOR<bank_accountsCreateWithoutCompaniesInput, bank_accountsUncheckedCreateWithoutCompaniesInput>
  }

  export type bank_accountsCreateManyCompaniesInputEnvelope = {
    data: bank_accountsCreateManyCompaniesInput | bank_accountsCreateManyCompaniesInput[]
    skipDuplicates?: boolean
  }

  export type projectsCreateWithoutCompaniesInput = {
    code: string
    name: string
    created_at?: Date | string
    bank_movements?: bank_movementsCreateNestedManyWithoutProjectsInput
    obligations?: obligationsCreateNestedManyWithoutProjectsInput
  }

  export type projectsUncheckedCreateWithoutCompaniesInput = {
    id?: number
    code: string
    name: string
    created_at?: Date | string
    bank_movements?: bank_movementsUncheckedCreateNestedManyWithoutProjectsInput
    obligations?: obligationsUncheckedCreateNestedManyWithoutProjectsInput
  }

  export type projectsCreateOrConnectWithoutCompaniesInput = {
    where: projectsWhereUniqueInput
    create: XOR<projectsCreateWithoutCompaniesInput, projectsUncheckedCreateWithoutCompaniesInput>
  }

  export type projectsCreateManyCompaniesInputEnvelope = {
    data: projectsCreateManyCompaniesInput | projectsCreateManyCompaniesInput[]
    skipDuplicates?: boolean
  }

  export type bank_accountsUpsertWithWhereUniqueWithoutCompaniesInput = {
    where: bank_accountsWhereUniqueInput
    update: XOR<bank_accountsUpdateWithoutCompaniesInput, bank_accountsUncheckedUpdateWithoutCompaniesInput>
    create: XOR<bank_accountsCreateWithoutCompaniesInput, bank_accountsUncheckedCreateWithoutCompaniesInput>
  }

  export type bank_accountsUpdateWithWhereUniqueWithoutCompaniesInput = {
    where: bank_accountsWhereUniqueInput
    data: XOR<bank_accountsUpdateWithoutCompaniesInput, bank_accountsUncheckedUpdateWithoutCompaniesInput>
  }

  export type bank_accountsUpdateManyWithWhereWithoutCompaniesInput = {
    where: bank_accountsScalarWhereInput
    data: XOR<bank_accountsUpdateManyMutationInput, bank_accountsUncheckedUpdateManyWithoutCompaniesInput>
  }

  export type bank_accountsScalarWhereInput = {
    AND?: bank_accountsScalarWhereInput | bank_accountsScalarWhereInput[]
    OR?: bank_accountsScalarWhereInput[]
    NOT?: bank_accountsScalarWhereInput | bank_accountsScalarWhereInput[]
    id?: IntFilter<"bank_accounts"> | number
    company_id?: IntFilter<"bank_accounts"> | number
    bank_name?: StringFilter<"bank_accounts"> | string
    account_no?: StringFilter<"bank_accounts"> | string
    currency?: StringFilter<"bank_accounts"> | string
    created_at?: DateTimeFilter<"bank_accounts"> | Date | string
  }

  export type projectsUpsertWithWhereUniqueWithoutCompaniesInput = {
    where: projectsWhereUniqueInput
    update: XOR<projectsUpdateWithoutCompaniesInput, projectsUncheckedUpdateWithoutCompaniesInput>
    create: XOR<projectsCreateWithoutCompaniesInput, projectsUncheckedCreateWithoutCompaniesInput>
  }

  export type projectsUpdateWithWhereUniqueWithoutCompaniesInput = {
    where: projectsWhereUniqueInput
    data: XOR<projectsUpdateWithoutCompaniesInput, projectsUncheckedUpdateWithoutCompaniesInput>
  }

  export type projectsUpdateManyWithWhereWithoutCompaniesInput = {
    where: projectsScalarWhereInput
    data: XOR<projectsUpdateManyMutationInput, projectsUncheckedUpdateManyWithoutCompaniesInput>
  }

  export type projectsScalarWhereInput = {
    AND?: projectsScalarWhereInput | projectsScalarWhereInput[]
    OR?: projectsScalarWhereInput[]
    NOT?: projectsScalarWhereInput | projectsScalarWhereInput[]
    id?: IntFilter<"projects"> | number
    company_id?: IntFilter<"projects"> | number
    code?: StringFilter<"projects"> | string
    name?: StringFilter<"projects"> | string
    created_at?: DateTimeFilter<"projects"> | Date | string
  }

  export type cost_centersCreateWithoutOther_cost_centersInput = {
    code: string
    name: string
    cost_centers?: cost_centersCreateNestedOneWithoutOther_cost_centersInput
    sub_accounts?: sub_accountsCreateNestedManyWithoutCost_centersInput
  }

  export type cost_centersUncheckedCreateWithoutOther_cost_centersInput = {
    id?: number
    code: string
    name: string
    parent_id?: number | null
    sub_accounts?: sub_accountsUncheckedCreateNestedManyWithoutCost_centersInput
  }

  export type cost_centersCreateOrConnectWithoutOther_cost_centersInput = {
    where: cost_centersWhereUniqueInput
    create: XOR<cost_centersCreateWithoutOther_cost_centersInput, cost_centersUncheckedCreateWithoutOther_cost_centersInput>
  }

  export type cost_centersCreateWithoutCost_centersInput = {
    code: string
    name: string
    other_cost_centers?: cost_centersCreateNestedManyWithoutCost_centersInput
    sub_accounts?: sub_accountsCreateNestedManyWithoutCost_centersInput
  }

  export type cost_centersUncheckedCreateWithoutCost_centersInput = {
    id?: number
    code: string
    name: string
    other_cost_centers?: cost_centersUncheckedCreateNestedManyWithoutCost_centersInput
    sub_accounts?: sub_accountsUncheckedCreateNestedManyWithoutCost_centersInput
  }

  export type cost_centersCreateOrConnectWithoutCost_centersInput = {
    where: cost_centersWhereUniqueInput
    create: XOR<cost_centersCreateWithoutCost_centersInput, cost_centersUncheckedCreateWithoutCost_centersInput>
  }

  export type cost_centersCreateManyCost_centersInputEnvelope = {
    data: cost_centersCreateManyCost_centersInput | cost_centersCreateManyCost_centersInput[]
    skipDuplicates?: boolean
  }

  export type sub_accountsCreateWithoutCost_centersInput = {
    code: string
    name: string
    bank_movements?: bank_movementsCreateNestedManyWithoutSub_accountsInput
  }

  export type sub_accountsUncheckedCreateWithoutCost_centersInput = {
    id?: number
    code: string
    name: string
    bank_movements?: bank_movementsUncheckedCreateNestedManyWithoutSub_accountsInput
  }

  export type sub_accountsCreateOrConnectWithoutCost_centersInput = {
    where: sub_accountsWhereUniqueInput
    create: XOR<sub_accountsCreateWithoutCost_centersInput, sub_accountsUncheckedCreateWithoutCost_centersInput>
  }

  export type sub_accountsCreateManyCost_centersInputEnvelope = {
    data: sub_accountsCreateManyCost_centersInput | sub_accountsCreateManyCost_centersInput[]
    skipDuplicates?: boolean
  }

  export type cost_centersUpsertWithoutOther_cost_centersInput = {
    update: XOR<cost_centersUpdateWithoutOther_cost_centersInput, cost_centersUncheckedUpdateWithoutOther_cost_centersInput>
    create: XOR<cost_centersCreateWithoutOther_cost_centersInput, cost_centersUncheckedCreateWithoutOther_cost_centersInput>
    where?: cost_centersWhereInput
  }

  export type cost_centersUpdateToOneWithWhereWithoutOther_cost_centersInput = {
    where?: cost_centersWhereInput
    data: XOR<cost_centersUpdateWithoutOther_cost_centersInput, cost_centersUncheckedUpdateWithoutOther_cost_centersInput>
  }

  export type cost_centersUpdateWithoutOther_cost_centersInput = {
    code?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    cost_centers?: cost_centersUpdateOneWithoutOther_cost_centersNestedInput
    sub_accounts?: sub_accountsUpdateManyWithoutCost_centersNestedInput
  }

  export type cost_centersUncheckedUpdateWithoutOther_cost_centersInput = {
    id?: IntFieldUpdateOperationsInput | number
    code?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    parent_id?: NullableIntFieldUpdateOperationsInput | number | null
    sub_accounts?: sub_accountsUncheckedUpdateManyWithoutCost_centersNestedInput
  }

  export type cost_centersUpsertWithWhereUniqueWithoutCost_centersInput = {
    where: cost_centersWhereUniqueInput
    update: XOR<cost_centersUpdateWithoutCost_centersInput, cost_centersUncheckedUpdateWithoutCost_centersInput>
    create: XOR<cost_centersCreateWithoutCost_centersInput, cost_centersUncheckedCreateWithoutCost_centersInput>
  }

  export type cost_centersUpdateWithWhereUniqueWithoutCost_centersInput = {
    where: cost_centersWhereUniqueInput
    data: XOR<cost_centersUpdateWithoutCost_centersInput, cost_centersUncheckedUpdateWithoutCost_centersInput>
  }

  export type cost_centersUpdateManyWithWhereWithoutCost_centersInput = {
    where: cost_centersScalarWhereInput
    data: XOR<cost_centersUpdateManyMutationInput, cost_centersUncheckedUpdateManyWithoutCost_centersInput>
  }

  export type cost_centersScalarWhereInput = {
    AND?: cost_centersScalarWhereInput | cost_centersScalarWhereInput[]
    OR?: cost_centersScalarWhereInput[]
    NOT?: cost_centersScalarWhereInput | cost_centersScalarWhereInput[]
    id?: IntFilter<"cost_centers"> | number
    code?: StringFilter<"cost_centers"> | string
    name?: StringFilter<"cost_centers"> | string
    parent_id?: IntNullableFilter<"cost_centers"> | number | null
  }

  export type sub_accountsUpsertWithWhereUniqueWithoutCost_centersInput = {
    where: sub_accountsWhereUniqueInput
    update: XOR<sub_accountsUpdateWithoutCost_centersInput, sub_accountsUncheckedUpdateWithoutCost_centersInput>
    create: XOR<sub_accountsCreateWithoutCost_centersInput, sub_accountsUncheckedCreateWithoutCost_centersInput>
  }

  export type sub_accountsUpdateWithWhereUniqueWithoutCost_centersInput = {
    where: sub_accountsWhereUniqueInput
    data: XOR<sub_accountsUpdateWithoutCost_centersInput, sub_accountsUncheckedUpdateWithoutCost_centersInput>
  }

  export type sub_accountsUpdateManyWithWhereWithoutCost_centersInput = {
    where: sub_accountsScalarWhereInput
    data: XOR<sub_accountsUpdateManyMutationInput, sub_accountsUncheckedUpdateManyWithoutCost_centersInput>
  }

  export type sub_accountsScalarWhereInput = {
    AND?: sub_accountsScalarWhereInput | sub_accountsScalarWhereInput[]
    OR?: sub_accountsScalarWhereInput[]
    NOT?: sub_accountsScalarWhereInput | sub_accountsScalarWhereInput[]
    id?: IntFilter<"sub_accounts"> | number
    cost_center_id?: IntFilter<"sub_accounts"> | number
    code?: StringFilter<"sub_accounts"> | string
    name?: StringFilter<"sub_accounts"> | string
  }

  export type obligationsCreateWithoutCreditsInput = {
    id?: bigint | number
    description?: string | null
    amount_original: Decimal | DecimalJsLike | number | string
    currency: string
    exchange_rate_date?: Date | string | null
    due_date: Date | string
    status?: string
    created_at?: Date | string
    movement_matches?: movement_matchesCreateNestedManyWithoutObligationsInput
    obligation_documents?: obligation_documentsCreateNestedManyWithoutObligationsInput
    projects: projectsCreateNestedOneWithoutObligationsInput
    obligation_types: obligation_typesCreateNestedOneWithoutObligationsInput
  }

  export type obligationsUncheckedCreateWithoutCreditsInput = {
    id?: bigint | number
    project_id: number
    type_id: number
    description?: string | null
    amount_original: Decimal | DecimalJsLike | number | string
    currency: string
    exchange_rate_date?: Date | string | null
    due_date: Date | string
    status?: string
    created_at?: Date | string
    movement_matches?: movement_matchesUncheckedCreateNestedManyWithoutObligationsInput
    obligation_documents?: obligation_documentsUncheckedCreateNestedManyWithoutObligationsInput
  }

  export type obligationsCreateOrConnectWithoutCreditsInput = {
    where: obligationsWhereUniqueInput
    create: XOR<obligationsCreateWithoutCreditsInput, obligationsUncheckedCreateWithoutCreditsInput>
  }

  export type obligationsUpsertWithoutCreditsInput = {
    update: XOR<obligationsUpdateWithoutCreditsInput, obligationsUncheckedUpdateWithoutCreditsInput>
    create: XOR<obligationsCreateWithoutCreditsInput, obligationsUncheckedCreateWithoutCreditsInput>
    where?: obligationsWhereInput
  }

  export type obligationsUpdateToOneWithWhereWithoutCreditsInput = {
    where?: obligationsWhereInput
    data: XOR<obligationsUpdateWithoutCreditsInput, obligationsUncheckedUpdateWithoutCreditsInput>
  }

  export type obligationsUpdateWithoutCreditsInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    description?: NullableStringFieldUpdateOperationsInput | string | null
    amount_original?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    currency?: StringFieldUpdateOperationsInput | string
    exchange_rate_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    due_date?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    movement_matches?: movement_matchesUpdateManyWithoutObligationsNestedInput
    obligation_documents?: obligation_documentsUpdateManyWithoutObligationsNestedInput
    projects?: projectsUpdateOneRequiredWithoutObligationsNestedInput
    obligation_types?: obligation_typesUpdateOneRequiredWithoutObligationsNestedInput
  }

  export type obligationsUncheckedUpdateWithoutCreditsInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    project_id?: IntFieldUpdateOperationsInput | number
    type_id?: IntFieldUpdateOperationsInput | number
    description?: NullableStringFieldUpdateOperationsInput | string | null
    amount_original?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    currency?: StringFieldUpdateOperationsInput | string
    exchange_rate_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    due_date?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    movement_matches?: movement_matchesUncheckedUpdateManyWithoutObligationsNestedInput
    obligation_documents?: obligation_documentsUncheckedUpdateManyWithoutObligationsNestedInput
  }

  export type bank_movementsCreateWithoutMovement_matchesInput = {
    id?: bigint | number
    bank_date: Date | string
    description?: string | null
    debit?: Decimal | DecimalJsLike | number | string | null
    credit?: Decimal | DecimalJsLike | number | string | null
    currency: string
    exchange_rate_date?: Date | string | null
    source: string
    import_date?: Date | string
    bank_accounts: bank_accountsCreateNestedOneWithoutBank_movementsInput
    users?: usersCreateNestedOneWithoutBank_movementsInput
    projects?: projectsCreateNestedOneWithoutBank_movementsInput
    sub_accounts: sub_accountsCreateNestedOneWithoutBank_movementsInput
  }

  export type bank_movementsUncheckedCreateWithoutMovement_matchesInput = {
    id?: bigint | number
    bank_account_id: number
    project_id?: number | null
    bank_date: Date | string
    description?: string | null
    debit?: Decimal | DecimalJsLike | number | string | null
    credit?: Decimal | DecimalJsLike | number | string | null
    currency: string
    exchange_rate_date?: Date | string | null
    source: string
    sub_account_id: number
    created_by?: bigint | number | null
    import_date?: Date | string
  }

  export type bank_movementsCreateOrConnectWithoutMovement_matchesInput = {
    where: bank_movementsWhereUniqueInput
    create: XOR<bank_movementsCreateWithoutMovement_matchesInput, bank_movementsUncheckedCreateWithoutMovement_matchesInput>
  }

  export type obligationsCreateWithoutMovement_matchesInput = {
    id?: bigint | number
    description?: string | null
    amount_original: Decimal | DecimalJsLike | number | string
    currency: string
    exchange_rate_date?: Date | string | null
    due_date: Date | string
    status?: string
    created_at?: Date | string
    credits?: creditsCreateNestedOneWithoutObligationsInput
    obligation_documents?: obligation_documentsCreateNestedManyWithoutObligationsInput
    projects: projectsCreateNestedOneWithoutObligationsInput
    obligation_types: obligation_typesCreateNestedOneWithoutObligationsInput
  }

  export type obligationsUncheckedCreateWithoutMovement_matchesInput = {
    id?: bigint | number
    project_id: number
    type_id: number
    description?: string | null
    amount_original: Decimal | DecimalJsLike | number | string
    currency: string
    exchange_rate_date?: Date | string | null
    due_date: Date | string
    status?: string
    created_at?: Date | string
    credits?: creditsUncheckedCreateNestedOneWithoutObligationsInput
    obligation_documents?: obligation_documentsUncheckedCreateNestedManyWithoutObligationsInput
  }

  export type obligationsCreateOrConnectWithoutMovement_matchesInput = {
    where: obligationsWhereUniqueInput
    create: XOR<obligationsCreateWithoutMovement_matchesInput, obligationsUncheckedCreateWithoutMovement_matchesInput>
  }

  export type bank_movementsUpsertWithoutMovement_matchesInput = {
    update: XOR<bank_movementsUpdateWithoutMovement_matchesInput, bank_movementsUncheckedUpdateWithoutMovement_matchesInput>
    create: XOR<bank_movementsCreateWithoutMovement_matchesInput, bank_movementsUncheckedCreateWithoutMovement_matchesInput>
    where?: bank_movementsWhereInput
  }

  export type bank_movementsUpdateToOneWithWhereWithoutMovement_matchesInput = {
    where?: bank_movementsWhereInput
    data: XOR<bank_movementsUpdateWithoutMovement_matchesInput, bank_movementsUncheckedUpdateWithoutMovement_matchesInput>
  }

  export type bank_movementsUpdateWithoutMovement_matchesInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    bank_date?: DateTimeFieldUpdateOperationsInput | Date | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    debit?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    credit?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    currency?: StringFieldUpdateOperationsInput | string
    exchange_rate_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    source?: StringFieldUpdateOperationsInput | string
    import_date?: DateTimeFieldUpdateOperationsInput | Date | string
    bank_accounts?: bank_accountsUpdateOneRequiredWithoutBank_movementsNestedInput
    users?: usersUpdateOneWithoutBank_movementsNestedInput
    projects?: projectsUpdateOneWithoutBank_movementsNestedInput
    sub_accounts?: sub_accountsUpdateOneRequiredWithoutBank_movementsNestedInput
  }

  export type bank_movementsUncheckedUpdateWithoutMovement_matchesInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    bank_account_id?: IntFieldUpdateOperationsInput | number
    project_id?: NullableIntFieldUpdateOperationsInput | number | null
    bank_date?: DateTimeFieldUpdateOperationsInput | Date | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    debit?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    credit?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    currency?: StringFieldUpdateOperationsInput | string
    exchange_rate_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    source?: StringFieldUpdateOperationsInput | string
    sub_account_id?: IntFieldUpdateOperationsInput | number
    created_by?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    import_date?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type obligationsUpsertWithoutMovement_matchesInput = {
    update: XOR<obligationsUpdateWithoutMovement_matchesInput, obligationsUncheckedUpdateWithoutMovement_matchesInput>
    create: XOR<obligationsCreateWithoutMovement_matchesInput, obligationsUncheckedCreateWithoutMovement_matchesInput>
    where?: obligationsWhereInput
  }

  export type obligationsUpdateToOneWithWhereWithoutMovement_matchesInput = {
    where?: obligationsWhereInput
    data: XOR<obligationsUpdateWithoutMovement_matchesInput, obligationsUncheckedUpdateWithoutMovement_matchesInput>
  }

  export type obligationsUpdateWithoutMovement_matchesInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    description?: NullableStringFieldUpdateOperationsInput | string | null
    amount_original?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    currency?: StringFieldUpdateOperationsInput | string
    exchange_rate_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    due_date?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    credits?: creditsUpdateOneWithoutObligationsNestedInput
    obligation_documents?: obligation_documentsUpdateManyWithoutObligationsNestedInput
    projects?: projectsUpdateOneRequiredWithoutObligationsNestedInput
    obligation_types?: obligation_typesUpdateOneRequiredWithoutObligationsNestedInput
  }

  export type obligationsUncheckedUpdateWithoutMovement_matchesInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    project_id?: IntFieldUpdateOperationsInput | number
    type_id?: IntFieldUpdateOperationsInput | number
    description?: NullableStringFieldUpdateOperationsInput | string | null
    amount_original?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    currency?: StringFieldUpdateOperationsInput | string
    exchange_rate_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    due_date?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    credits?: creditsUncheckedUpdateOneWithoutObligationsNestedInput
    obligation_documents?: obligation_documentsUncheckedUpdateManyWithoutObligationsNestedInput
  }

  export type obligationsCreateWithoutObligation_documentsInput = {
    id?: bigint | number
    description?: string | null
    amount_original: Decimal | DecimalJsLike | number | string
    currency: string
    exchange_rate_date?: Date | string | null
    due_date: Date | string
    status?: string
    created_at?: Date | string
    credits?: creditsCreateNestedOneWithoutObligationsInput
    movement_matches?: movement_matchesCreateNestedManyWithoutObligationsInput
    projects: projectsCreateNestedOneWithoutObligationsInput
    obligation_types: obligation_typesCreateNestedOneWithoutObligationsInput
  }

  export type obligationsUncheckedCreateWithoutObligation_documentsInput = {
    id?: bigint | number
    project_id: number
    type_id: number
    description?: string | null
    amount_original: Decimal | DecimalJsLike | number | string
    currency: string
    exchange_rate_date?: Date | string | null
    due_date: Date | string
    status?: string
    created_at?: Date | string
    credits?: creditsUncheckedCreateNestedOneWithoutObligationsInput
    movement_matches?: movement_matchesUncheckedCreateNestedManyWithoutObligationsInput
  }

  export type obligationsCreateOrConnectWithoutObligation_documentsInput = {
    where: obligationsWhereUniqueInput
    create: XOR<obligationsCreateWithoutObligation_documentsInput, obligationsUncheckedCreateWithoutObligation_documentsInput>
  }

  export type usersCreateWithoutObligation_documentsInput = {
    id?: bigint | number
    name: string
    email: string
    password_hash: string
    role: string
    created_at?: Date | string
    bank_movements?: bank_movementsCreateNestedManyWithoutUsersInput
  }

  export type usersUncheckedCreateWithoutObligation_documentsInput = {
    id?: bigint | number
    name: string
    email: string
    password_hash: string
    role: string
    created_at?: Date | string
    bank_movements?: bank_movementsUncheckedCreateNestedManyWithoutUsersInput
  }

  export type usersCreateOrConnectWithoutObligation_documentsInput = {
    where: usersWhereUniqueInput
    create: XOR<usersCreateWithoutObligation_documentsInput, usersUncheckedCreateWithoutObligation_documentsInput>
  }

  export type obligationsUpsertWithoutObligation_documentsInput = {
    update: XOR<obligationsUpdateWithoutObligation_documentsInput, obligationsUncheckedUpdateWithoutObligation_documentsInput>
    create: XOR<obligationsCreateWithoutObligation_documentsInput, obligationsUncheckedCreateWithoutObligation_documentsInput>
    where?: obligationsWhereInput
  }

  export type obligationsUpdateToOneWithWhereWithoutObligation_documentsInput = {
    where?: obligationsWhereInput
    data: XOR<obligationsUpdateWithoutObligation_documentsInput, obligationsUncheckedUpdateWithoutObligation_documentsInput>
  }

  export type obligationsUpdateWithoutObligation_documentsInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    description?: NullableStringFieldUpdateOperationsInput | string | null
    amount_original?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    currency?: StringFieldUpdateOperationsInput | string
    exchange_rate_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    due_date?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    credits?: creditsUpdateOneWithoutObligationsNestedInput
    movement_matches?: movement_matchesUpdateManyWithoutObligationsNestedInput
    projects?: projectsUpdateOneRequiredWithoutObligationsNestedInput
    obligation_types?: obligation_typesUpdateOneRequiredWithoutObligationsNestedInput
  }

  export type obligationsUncheckedUpdateWithoutObligation_documentsInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    project_id?: IntFieldUpdateOperationsInput | number
    type_id?: IntFieldUpdateOperationsInput | number
    description?: NullableStringFieldUpdateOperationsInput | string | null
    amount_original?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    currency?: StringFieldUpdateOperationsInput | string
    exchange_rate_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    due_date?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    credits?: creditsUncheckedUpdateOneWithoutObligationsNestedInput
    movement_matches?: movement_matchesUncheckedUpdateManyWithoutObligationsNestedInput
  }

  export type usersUpsertWithoutObligation_documentsInput = {
    update: XOR<usersUpdateWithoutObligation_documentsInput, usersUncheckedUpdateWithoutObligation_documentsInput>
    create: XOR<usersCreateWithoutObligation_documentsInput, usersUncheckedCreateWithoutObligation_documentsInput>
    where?: usersWhereInput
  }

  export type usersUpdateToOneWithWhereWithoutObligation_documentsInput = {
    where?: usersWhereInput
    data: XOR<usersUpdateWithoutObligation_documentsInput, usersUncheckedUpdateWithoutObligation_documentsInput>
  }

  export type usersUpdateWithoutObligation_documentsInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password_hash?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    bank_movements?: bank_movementsUpdateManyWithoutUsersNestedInput
  }

  export type usersUncheckedUpdateWithoutObligation_documentsInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password_hash?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    bank_movements?: bank_movementsUncheckedUpdateManyWithoutUsersNestedInput
  }

  export type obligationsCreateWithoutObligation_typesInput = {
    id?: bigint | number
    description?: string | null
    amount_original: Decimal | DecimalJsLike | number | string
    currency: string
    exchange_rate_date?: Date | string | null
    due_date: Date | string
    status?: string
    created_at?: Date | string
    credits?: creditsCreateNestedOneWithoutObligationsInput
    movement_matches?: movement_matchesCreateNestedManyWithoutObligationsInput
    obligation_documents?: obligation_documentsCreateNestedManyWithoutObligationsInput
    projects: projectsCreateNestedOneWithoutObligationsInput
  }

  export type obligationsUncheckedCreateWithoutObligation_typesInput = {
    id?: bigint | number
    project_id: number
    description?: string | null
    amount_original: Decimal | DecimalJsLike | number | string
    currency: string
    exchange_rate_date?: Date | string | null
    due_date: Date | string
    status?: string
    created_at?: Date | string
    credits?: creditsUncheckedCreateNestedOneWithoutObligationsInput
    movement_matches?: movement_matchesUncheckedCreateNestedManyWithoutObligationsInput
    obligation_documents?: obligation_documentsUncheckedCreateNestedManyWithoutObligationsInput
  }

  export type obligationsCreateOrConnectWithoutObligation_typesInput = {
    where: obligationsWhereUniqueInput
    create: XOR<obligationsCreateWithoutObligation_typesInput, obligationsUncheckedCreateWithoutObligation_typesInput>
  }

  export type obligationsCreateManyObligation_typesInputEnvelope = {
    data: obligationsCreateManyObligation_typesInput | obligationsCreateManyObligation_typesInput[]
    skipDuplicates?: boolean
  }

  export type obligationsUpsertWithWhereUniqueWithoutObligation_typesInput = {
    where: obligationsWhereUniqueInput
    update: XOR<obligationsUpdateWithoutObligation_typesInput, obligationsUncheckedUpdateWithoutObligation_typesInput>
    create: XOR<obligationsCreateWithoutObligation_typesInput, obligationsUncheckedCreateWithoutObligation_typesInput>
  }

  export type obligationsUpdateWithWhereUniqueWithoutObligation_typesInput = {
    where: obligationsWhereUniqueInput
    data: XOR<obligationsUpdateWithoutObligation_typesInput, obligationsUncheckedUpdateWithoutObligation_typesInput>
  }

  export type obligationsUpdateManyWithWhereWithoutObligation_typesInput = {
    where: obligationsScalarWhereInput
    data: XOR<obligationsUpdateManyMutationInput, obligationsUncheckedUpdateManyWithoutObligation_typesInput>
  }

  export type obligationsScalarWhereInput = {
    AND?: obligationsScalarWhereInput | obligationsScalarWhereInput[]
    OR?: obligationsScalarWhereInput[]
    NOT?: obligationsScalarWhereInput | obligationsScalarWhereInput[]
    id?: BigIntFilter<"obligations"> | bigint | number
    project_id?: IntFilter<"obligations"> | number
    type_id?: IntFilter<"obligations"> | number
    description?: StringNullableFilter<"obligations"> | string | null
    amount_original?: DecimalFilter<"obligations"> | Decimal | DecimalJsLike | number | string
    currency?: StringFilter<"obligations"> | string
    exchange_rate_date?: DateTimeNullableFilter<"obligations"> | Date | string | null
    due_date?: DateTimeFilter<"obligations"> | Date | string
    status?: StringFilter<"obligations"> | string
    created_at?: DateTimeFilter<"obligations"> | Date | string
  }

  export type creditsCreateWithoutObligationsInput = {
    id?: bigint | number
    interest_rate_pct: Decimal | DecimalJsLike | number | string
    start_date: Date | string
    end_date?: Date | string | null
    amortization_scheme?: string | null
    last_calculated?: Date | string | null
  }

  export type creditsUncheckedCreateWithoutObligationsInput = {
    id?: bigint | number
    interest_rate_pct: Decimal | DecimalJsLike | number | string
    start_date: Date | string
    end_date?: Date | string | null
    amortization_scheme?: string | null
    last_calculated?: Date | string | null
  }

  export type creditsCreateOrConnectWithoutObligationsInput = {
    where: creditsWhereUniqueInput
    create: XOR<creditsCreateWithoutObligationsInput, creditsUncheckedCreateWithoutObligationsInput>
  }

  export type movement_matchesCreateWithoutObligationsInput = {
    matched_amount: Decimal | DecimalJsLike | number | string
    bank_movements: bank_movementsCreateNestedOneWithoutMovement_matchesInput
  }

  export type movement_matchesUncheckedCreateWithoutObligationsInput = {
    movement_id: bigint | number
    matched_amount: Decimal | DecimalJsLike | number | string
  }

  export type movement_matchesCreateOrConnectWithoutObligationsInput = {
    where: movement_matchesWhereUniqueInput
    create: XOR<movement_matchesCreateWithoutObligationsInput, movement_matchesUncheckedCreateWithoutObligationsInput>
  }

  export type movement_matchesCreateManyObligationsInputEnvelope = {
    data: movement_matchesCreateManyObligationsInput | movement_matchesCreateManyObligationsInput[]
    skipDuplicates?: boolean
  }

  export type obligation_documentsCreateWithoutObligationsInput = {
    file_name: string
    file_path: string
    uploaded_at?: Date | string
    users?: usersCreateNestedOneWithoutObligation_documentsInput
  }

  export type obligation_documentsUncheckedCreateWithoutObligationsInput = {
    id?: number
    file_name: string
    file_path: string
    uploaded_by?: bigint | number | null
    uploaded_at?: Date | string
  }

  export type obligation_documentsCreateOrConnectWithoutObligationsInput = {
    where: obligation_documentsWhereUniqueInput
    create: XOR<obligation_documentsCreateWithoutObligationsInput, obligation_documentsUncheckedCreateWithoutObligationsInput>
  }

  export type obligation_documentsCreateManyObligationsInputEnvelope = {
    data: obligation_documentsCreateManyObligationsInput | obligation_documentsCreateManyObligationsInput[]
    skipDuplicates?: boolean
  }

  export type projectsCreateWithoutObligationsInput = {
    code: string
    name: string
    created_at?: Date | string
    bank_movements?: bank_movementsCreateNestedManyWithoutProjectsInput
    companies: companiesCreateNestedOneWithoutProjectsInput
  }

  export type projectsUncheckedCreateWithoutObligationsInput = {
    id?: number
    company_id: number
    code: string
    name: string
    created_at?: Date | string
    bank_movements?: bank_movementsUncheckedCreateNestedManyWithoutProjectsInput
  }

  export type projectsCreateOrConnectWithoutObligationsInput = {
    where: projectsWhereUniqueInput
    create: XOR<projectsCreateWithoutObligationsInput, projectsUncheckedCreateWithoutObligationsInput>
  }

  export type obligation_typesCreateWithoutObligationsInput = {
    name: string
    description?: string | null
  }

  export type obligation_typesUncheckedCreateWithoutObligationsInput = {
    id?: number
    name: string
    description?: string | null
  }

  export type obligation_typesCreateOrConnectWithoutObligationsInput = {
    where: obligation_typesWhereUniqueInput
    create: XOR<obligation_typesCreateWithoutObligationsInput, obligation_typesUncheckedCreateWithoutObligationsInput>
  }

  export type creditsUpsertWithoutObligationsInput = {
    update: XOR<creditsUpdateWithoutObligationsInput, creditsUncheckedUpdateWithoutObligationsInput>
    create: XOR<creditsCreateWithoutObligationsInput, creditsUncheckedCreateWithoutObligationsInput>
    where?: creditsWhereInput
  }

  export type creditsUpdateToOneWithWhereWithoutObligationsInput = {
    where?: creditsWhereInput
    data: XOR<creditsUpdateWithoutObligationsInput, creditsUncheckedUpdateWithoutObligationsInput>
  }

  export type creditsUpdateWithoutObligationsInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    interest_rate_pct?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    start_date?: DateTimeFieldUpdateOperationsInput | Date | string
    end_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    amortization_scheme?: NullableStringFieldUpdateOperationsInput | string | null
    last_calculated?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type creditsUncheckedUpdateWithoutObligationsInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    interest_rate_pct?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    start_date?: DateTimeFieldUpdateOperationsInput | Date | string
    end_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    amortization_scheme?: NullableStringFieldUpdateOperationsInput | string | null
    last_calculated?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type movement_matchesUpsertWithWhereUniqueWithoutObligationsInput = {
    where: movement_matchesWhereUniqueInput
    update: XOR<movement_matchesUpdateWithoutObligationsInput, movement_matchesUncheckedUpdateWithoutObligationsInput>
    create: XOR<movement_matchesCreateWithoutObligationsInput, movement_matchesUncheckedCreateWithoutObligationsInput>
  }

  export type movement_matchesUpdateWithWhereUniqueWithoutObligationsInput = {
    where: movement_matchesWhereUniqueInput
    data: XOR<movement_matchesUpdateWithoutObligationsInput, movement_matchesUncheckedUpdateWithoutObligationsInput>
  }

  export type movement_matchesUpdateManyWithWhereWithoutObligationsInput = {
    where: movement_matchesScalarWhereInput
    data: XOR<movement_matchesUpdateManyMutationInput, movement_matchesUncheckedUpdateManyWithoutObligationsInput>
  }

  export type obligation_documentsUpsertWithWhereUniqueWithoutObligationsInput = {
    where: obligation_documentsWhereUniqueInput
    update: XOR<obligation_documentsUpdateWithoutObligationsInput, obligation_documentsUncheckedUpdateWithoutObligationsInput>
    create: XOR<obligation_documentsCreateWithoutObligationsInput, obligation_documentsUncheckedCreateWithoutObligationsInput>
  }

  export type obligation_documentsUpdateWithWhereUniqueWithoutObligationsInput = {
    where: obligation_documentsWhereUniqueInput
    data: XOR<obligation_documentsUpdateWithoutObligationsInput, obligation_documentsUncheckedUpdateWithoutObligationsInput>
  }

  export type obligation_documentsUpdateManyWithWhereWithoutObligationsInput = {
    where: obligation_documentsScalarWhereInput
    data: XOR<obligation_documentsUpdateManyMutationInput, obligation_documentsUncheckedUpdateManyWithoutObligationsInput>
  }

  export type obligation_documentsScalarWhereInput = {
    AND?: obligation_documentsScalarWhereInput | obligation_documentsScalarWhereInput[]
    OR?: obligation_documentsScalarWhereInput[]
    NOT?: obligation_documentsScalarWhereInput | obligation_documentsScalarWhereInput[]
    id?: IntFilter<"obligation_documents"> | number
    obligation_id?: BigIntFilter<"obligation_documents"> | bigint | number
    file_name?: StringFilter<"obligation_documents"> | string
    file_path?: StringFilter<"obligation_documents"> | string
    uploaded_by?: BigIntNullableFilter<"obligation_documents"> | bigint | number | null
    uploaded_at?: DateTimeFilter<"obligation_documents"> | Date | string
  }

  export type projectsUpsertWithoutObligationsInput = {
    update: XOR<projectsUpdateWithoutObligationsInput, projectsUncheckedUpdateWithoutObligationsInput>
    create: XOR<projectsCreateWithoutObligationsInput, projectsUncheckedCreateWithoutObligationsInput>
    where?: projectsWhereInput
  }

  export type projectsUpdateToOneWithWhereWithoutObligationsInput = {
    where?: projectsWhereInput
    data: XOR<projectsUpdateWithoutObligationsInput, projectsUncheckedUpdateWithoutObligationsInput>
  }

  export type projectsUpdateWithoutObligationsInput = {
    code?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    bank_movements?: bank_movementsUpdateManyWithoutProjectsNestedInput
    companies?: companiesUpdateOneRequiredWithoutProjectsNestedInput
  }

  export type projectsUncheckedUpdateWithoutObligationsInput = {
    id?: IntFieldUpdateOperationsInput | number
    company_id?: IntFieldUpdateOperationsInput | number
    code?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    bank_movements?: bank_movementsUncheckedUpdateManyWithoutProjectsNestedInput
  }

  export type obligation_typesUpsertWithoutObligationsInput = {
    update: XOR<obligation_typesUpdateWithoutObligationsInput, obligation_typesUncheckedUpdateWithoutObligationsInput>
    create: XOR<obligation_typesCreateWithoutObligationsInput, obligation_typesUncheckedCreateWithoutObligationsInput>
    where?: obligation_typesWhereInput
  }

  export type obligation_typesUpdateToOneWithWhereWithoutObligationsInput = {
    where?: obligation_typesWhereInput
    data: XOR<obligation_typesUpdateWithoutObligationsInput, obligation_typesUncheckedUpdateWithoutObligationsInput>
  }

  export type obligation_typesUpdateWithoutObligationsInput = {
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type obligation_typesUncheckedUpdateWithoutObligationsInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type bank_movementsCreateWithoutProjectsInput = {
    id?: bigint | number
    bank_date: Date | string
    description?: string | null
    debit?: Decimal | DecimalJsLike | number | string | null
    credit?: Decimal | DecimalJsLike | number | string | null
    currency: string
    exchange_rate_date?: Date | string | null
    source: string
    import_date?: Date | string
    bank_accounts: bank_accountsCreateNestedOneWithoutBank_movementsInput
    users?: usersCreateNestedOneWithoutBank_movementsInput
    sub_accounts: sub_accountsCreateNestedOneWithoutBank_movementsInput
    movement_matches?: movement_matchesCreateNestedManyWithoutBank_movementsInput
  }

  export type bank_movementsUncheckedCreateWithoutProjectsInput = {
    id?: bigint | number
    bank_account_id: number
    bank_date: Date | string
    description?: string | null
    debit?: Decimal | DecimalJsLike | number | string | null
    credit?: Decimal | DecimalJsLike | number | string | null
    currency: string
    exchange_rate_date?: Date | string | null
    source: string
    sub_account_id: number
    created_by?: bigint | number | null
    import_date?: Date | string
    movement_matches?: movement_matchesUncheckedCreateNestedManyWithoutBank_movementsInput
  }

  export type bank_movementsCreateOrConnectWithoutProjectsInput = {
    where: bank_movementsWhereUniqueInput
    create: XOR<bank_movementsCreateWithoutProjectsInput, bank_movementsUncheckedCreateWithoutProjectsInput>
  }

  export type bank_movementsCreateManyProjectsInputEnvelope = {
    data: bank_movementsCreateManyProjectsInput | bank_movementsCreateManyProjectsInput[]
    skipDuplicates?: boolean
  }

  export type obligationsCreateWithoutProjectsInput = {
    id?: bigint | number
    description?: string | null
    amount_original: Decimal | DecimalJsLike | number | string
    currency: string
    exchange_rate_date?: Date | string | null
    due_date: Date | string
    status?: string
    created_at?: Date | string
    credits?: creditsCreateNestedOneWithoutObligationsInput
    movement_matches?: movement_matchesCreateNestedManyWithoutObligationsInput
    obligation_documents?: obligation_documentsCreateNestedManyWithoutObligationsInput
    obligation_types: obligation_typesCreateNestedOneWithoutObligationsInput
  }

  export type obligationsUncheckedCreateWithoutProjectsInput = {
    id?: bigint | number
    type_id: number
    description?: string | null
    amount_original: Decimal | DecimalJsLike | number | string
    currency: string
    exchange_rate_date?: Date | string | null
    due_date: Date | string
    status?: string
    created_at?: Date | string
    credits?: creditsUncheckedCreateNestedOneWithoutObligationsInput
    movement_matches?: movement_matchesUncheckedCreateNestedManyWithoutObligationsInput
    obligation_documents?: obligation_documentsUncheckedCreateNestedManyWithoutObligationsInput
  }

  export type obligationsCreateOrConnectWithoutProjectsInput = {
    where: obligationsWhereUniqueInput
    create: XOR<obligationsCreateWithoutProjectsInput, obligationsUncheckedCreateWithoutProjectsInput>
  }

  export type obligationsCreateManyProjectsInputEnvelope = {
    data: obligationsCreateManyProjectsInput | obligationsCreateManyProjectsInput[]
    skipDuplicates?: boolean
  }

  export type companiesCreateWithoutProjectsInput = {
    name: string
    rut?: string | null
    address?: string | null
    created_at?: Date | string
    bank_accounts?: bank_accountsCreateNestedManyWithoutCompaniesInput
  }

  export type companiesUncheckedCreateWithoutProjectsInput = {
    id?: number
    name: string
    rut?: string | null
    address?: string | null
    created_at?: Date | string
    bank_accounts?: bank_accountsUncheckedCreateNestedManyWithoutCompaniesInput
  }

  export type companiesCreateOrConnectWithoutProjectsInput = {
    where: companiesWhereUniqueInput
    create: XOR<companiesCreateWithoutProjectsInput, companiesUncheckedCreateWithoutProjectsInput>
  }

  export type bank_movementsUpsertWithWhereUniqueWithoutProjectsInput = {
    where: bank_movementsWhereUniqueInput
    update: XOR<bank_movementsUpdateWithoutProjectsInput, bank_movementsUncheckedUpdateWithoutProjectsInput>
    create: XOR<bank_movementsCreateWithoutProjectsInput, bank_movementsUncheckedCreateWithoutProjectsInput>
  }

  export type bank_movementsUpdateWithWhereUniqueWithoutProjectsInput = {
    where: bank_movementsWhereUniqueInput
    data: XOR<bank_movementsUpdateWithoutProjectsInput, bank_movementsUncheckedUpdateWithoutProjectsInput>
  }

  export type bank_movementsUpdateManyWithWhereWithoutProjectsInput = {
    where: bank_movementsScalarWhereInput
    data: XOR<bank_movementsUpdateManyMutationInput, bank_movementsUncheckedUpdateManyWithoutProjectsInput>
  }

  export type obligationsUpsertWithWhereUniqueWithoutProjectsInput = {
    where: obligationsWhereUniqueInput
    update: XOR<obligationsUpdateWithoutProjectsInput, obligationsUncheckedUpdateWithoutProjectsInput>
    create: XOR<obligationsCreateWithoutProjectsInput, obligationsUncheckedCreateWithoutProjectsInput>
  }

  export type obligationsUpdateWithWhereUniqueWithoutProjectsInput = {
    where: obligationsWhereUniqueInput
    data: XOR<obligationsUpdateWithoutProjectsInput, obligationsUncheckedUpdateWithoutProjectsInput>
  }

  export type obligationsUpdateManyWithWhereWithoutProjectsInput = {
    where: obligationsScalarWhereInput
    data: XOR<obligationsUpdateManyMutationInput, obligationsUncheckedUpdateManyWithoutProjectsInput>
  }

  export type companiesUpsertWithoutProjectsInput = {
    update: XOR<companiesUpdateWithoutProjectsInput, companiesUncheckedUpdateWithoutProjectsInput>
    create: XOR<companiesCreateWithoutProjectsInput, companiesUncheckedCreateWithoutProjectsInput>
    where?: companiesWhereInput
  }

  export type companiesUpdateToOneWithWhereWithoutProjectsInput = {
    where?: companiesWhereInput
    data: XOR<companiesUpdateWithoutProjectsInput, companiesUncheckedUpdateWithoutProjectsInput>
  }

  export type companiesUpdateWithoutProjectsInput = {
    name?: StringFieldUpdateOperationsInput | string
    rut?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    bank_accounts?: bank_accountsUpdateManyWithoutCompaniesNestedInput
  }

  export type companiesUncheckedUpdateWithoutProjectsInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    rut?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    bank_accounts?: bank_accountsUncheckedUpdateManyWithoutCompaniesNestedInput
  }

  export type bank_movementsCreateWithoutSub_accountsInput = {
    id?: bigint | number
    bank_date: Date | string
    description?: string | null
    debit?: Decimal | DecimalJsLike | number | string | null
    credit?: Decimal | DecimalJsLike | number | string | null
    currency: string
    exchange_rate_date?: Date | string | null
    source: string
    import_date?: Date | string
    bank_accounts: bank_accountsCreateNestedOneWithoutBank_movementsInput
    users?: usersCreateNestedOneWithoutBank_movementsInput
    projects?: projectsCreateNestedOneWithoutBank_movementsInput
    movement_matches?: movement_matchesCreateNestedManyWithoutBank_movementsInput
  }

  export type bank_movementsUncheckedCreateWithoutSub_accountsInput = {
    id?: bigint | number
    bank_account_id: number
    project_id?: number | null
    bank_date: Date | string
    description?: string | null
    debit?: Decimal | DecimalJsLike | number | string | null
    credit?: Decimal | DecimalJsLike | number | string | null
    currency: string
    exchange_rate_date?: Date | string | null
    source: string
    created_by?: bigint | number | null
    import_date?: Date | string
    movement_matches?: movement_matchesUncheckedCreateNestedManyWithoutBank_movementsInput
  }

  export type bank_movementsCreateOrConnectWithoutSub_accountsInput = {
    where: bank_movementsWhereUniqueInput
    create: XOR<bank_movementsCreateWithoutSub_accountsInput, bank_movementsUncheckedCreateWithoutSub_accountsInput>
  }

  export type bank_movementsCreateManySub_accountsInputEnvelope = {
    data: bank_movementsCreateManySub_accountsInput | bank_movementsCreateManySub_accountsInput[]
    skipDuplicates?: boolean
  }

  export type cost_centersCreateWithoutSub_accountsInput = {
    code: string
    name: string
    cost_centers?: cost_centersCreateNestedOneWithoutOther_cost_centersInput
    other_cost_centers?: cost_centersCreateNestedManyWithoutCost_centersInput
  }

  export type cost_centersUncheckedCreateWithoutSub_accountsInput = {
    id?: number
    code: string
    name: string
    parent_id?: number | null
    other_cost_centers?: cost_centersUncheckedCreateNestedManyWithoutCost_centersInput
  }

  export type cost_centersCreateOrConnectWithoutSub_accountsInput = {
    where: cost_centersWhereUniqueInput
    create: XOR<cost_centersCreateWithoutSub_accountsInput, cost_centersUncheckedCreateWithoutSub_accountsInput>
  }

  export type bank_movementsUpsertWithWhereUniqueWithoutSub_accountsInput = {
    where: bank_movementsWhereUniqueInput
    update: XOR<bank_movementsUpdateWithoutSub_accountsInput, bank_movementsUncheckedUpdateWithoutSub_accountsInput>
    create: XOR<bank_movementsCreateWithoutSub_accountsInput, bank_movementsUncheckedCreateWithoutSub_accountsInput>
  }

  export type bank_movementsUpdateWithWhereUniqueWithoutSub_accountsInput = {
    where: bank_movementsWhereUniqueInput
    data: XOR<bank_movementsUpdateWithoutSub_accountsInput, bank_movementsUncheckedUpdateWithoutSub_accountsInput>
  }

  export type bank_movementsUpdateManyWithWhereWithoutSub_accountsInput = {
    where: bank_movementsScalarWhereInput
    data: XOR<bank_movementsUpdateManyMutationInput, bank_movementsUncheckedUpdateManyWithoutSub_accountsInput>
  }

  export type cost_centersUpsertWithoutSub_accountsInput = {
    update: XOR<cost_centersUpdateWithoutSub_accountsInput, cost_centersUncheckedUpdateWithoutSub_accountsInput>
    create: XOR<cost_centersCreateWithoutSub_accountsInput, cost_centersUncheckedCreateWithoutSub_accountsInput>
    where?: cost_centersWhereInput
  }

  export type cost_centersUpdateToOneWithWhereWithoutSub_accountsInput = {
    where?: cost_centersWhereInput
    data: XOR<cost_centersUpdateWithoutSub_accountsInput, cost_centersUncheckedUpdateWithoutSub_accountsInput>
  }

  export type cost_centersUpdateWithoutSub_accountsInput = {
    code?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    cost_centers?: cost_centersUpdateOneWithoutOther_cost_centersNestedInput
    other_cost_centers?: cost_centersUpdateManyWithoutCost_centersNestedInput
  }

  export type cost_centersUncheckedUpdateWithoutSub_accountsInput = {
    id?: IntFieldUpdateOperationsInput | number
    code?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    parent_id?: NullableIntFieldUpdateOperationsInput | number | null
    other_cost_centers?: cost_centersUncheckedUpdateManyWithoutCost_centersNestedInput
  }

  export type bank_movementsCreateWithoutUsersInput = {
    id?: bigint | number
    bank_date: Date | string
    description?: string | null
    debit?: Decimal | DecimalJsLike | number | string | null
    credit?: Decimal | DecimalJsLike | number | string | null
    currency: string
    exchange_rate_date?: Date | string | null
    source: string
    import_date?: Date | string
    bank_accounts: bank_accountsCreateNestedOneWithoutBank_movementsInput
    projects?: projectsCreateNestedOneWithoutBank_movementsInput
    sub_accounts: sub_accountsCreateNestedOneWithoutBank_movementsInput
    movement_matches?: movement_matchesCreateNestedManyWithoutBank_movementsInput
  }

  export type bank_movementsUncheckedCreateWithoutUsersInput = {
    id?: bigint | number
    bank_account_id: number
    project_id?: number | null
    bank_date: Date | string
    description?: string | null
    debit?: Decimal | DecimalJsLike | number | string | null
    credit?: Decimal | DecimalJsLike | number | string | null
    currency: string
    exchange_rate_date?: Date | string | null
    source: string
    sub_account_id: number
    import_date?: Date | string
    movement_matches?: movement_matchesUncheckedCreateNestedManyWithoutBank_movementsInput
  }

  export type bank_movementsCreateOrConnectWithoutUsersInput = {
    where: bank_movementsWhereUniqueInput
    create: XOR<bank_movementsCreateWithoutUsersInput, bank_movementsUncheckedCreateWithoutUsersInput>
  }

  export type bank_movementsCreateManyUsersInputEnvelope = {
    data: bank_movementsCreateManyUsersInput | bank_movementsCreateManyUsersInput[]
    skipDuplicates?: boolean
  }

  export type obligation_documentsCreateWithoutUsersInput = {
    file_name: string
    file_path: string
    uploaded_at?: Date | string
    obligations: obligationsCreateNestedOneWithoutObligation_documentsInput
  }

  export type obligation_documentsUncheckedCreateWithoutUsersInput = {
    id?: number
    obligation_id: bigint | number
    file_name: string
    file_path: string
    uploaded_at?: Date | string
  }

  export type obligation_documentsCreateOrConnectWithoutUsersInput = {
    where: obligation_documentsWhereUniqueInput
    create: XOR<obligation_documentsCreateWithoutUsersInput, obligation_documentsUncheckedCreateWithoutUsersInput>
  }

  export type obligation_documentsCreateManyUsersInputEnvelope = {
    data: obligation_documentsCreateManyUsersInput | obligation_documentsCreateManyUsersInput[]
    skipDuplicates?: boolean
  }

  export type bank_movementsUpsertWithWhereUniqueWithoutUsersInput = {
    where: bank_movementsWhereUniqueInput
    update: XOR<bank_movementsUpdateWithoutUsersInput, bank_movementsUncheckedUpdateWithoutUsersInput>
    create: XOR<bank_movementsCreateWithoutUsersInput, bank_movementsUncheckedCreateWithoutUsersInput>
  }

  export type bank_movementsUpdateWithWhereUniqueWithoutUsersInput = {
    where: bank_movementsWhereUniqueInput
    data: XOR<bank_movementsUpdateWithoutUsersInput, bank_movementsUncheckedUpdateWithoutUsersInput>
  }

  export type bank_movementsUpdateManyWithWhereWithoutUsersInput = {
    where: bank_movementsScalarWhereInput
    data: XOR<bank_movementsUpdateManyMutationInput, bank_movementsUncheckedUpdateManyWithoutUsersInput>
  }

  export type obligation_documentsUpsertWithWhereUniqueWithoutUsersInput = {
    where: obligation_documentsWhereUniqueInput
    update: XOR<obligation_documentsUpdateWithoutUsersInput, obligation_documentsUncheckedUpdateWithoutUsersInput>
    create: XOR<obligation_documentsCreateWithoutUsersInput, obligation_documentsUncheckedCreateWithoutUsersInput>
  }

  export type obligation_documentsUpdateWithWhereUniqueWithoutUsersInput = {
    where: obligation_documentsWhereUniqueInput
    data: XOR<obligation_documentsUpdateWithoutUsersInput, obligation_documentsUncheckedUpdateWithoutUsersInput>
  }

  export type obligation_documentsUpdateManyWithWhereWithoutUsersInput = {
    where: obligation_documentsScalarWhereInput
    data: XOR<obligation_documentsUpdateManyMutationInput, obligation_documentsUncheckedUpdateManyWithoutUsersInput>
  }

  export type bank_movementsCreateManyBank_accountsInput = {
    id?: bigint | number
    project_id?: number | null
    bank_date: Date | string
    description?: string | null
    debit?: Decimal | DecimalJsLike | number | string | null
    credit?: Decimal | DecimalJsLike | number | string | null
    currency: string
    exchange_rate_date?: Date | string | null
    source: string
    sub_account_id: number
    created_by?: bigint | number | null
    import_date?: Date | string
  }

  export type bank_movementsUpdateWithoutBank_accountsInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    bank_date?: DateTimeFieldUpdateOperationsInput | Date | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    debit?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    credit?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    currency?: StringFieldUpdateOperationsInput | string
    exchange_rate_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    source?: StringFieldUpdateOperationsInput | string
    import_date?: DateTimeFieldUpdateOperationsInput | Date | string
    users?: usersUpdateOneWithoutBank_movementsNestedInput
    projects?: projectsUpdateOneWithoutBank_movementsNestedInput
    sub_accounts?: sub_accountsUpdateOneRequiredWithoutBank_movementsNestedInput
    movement_matches?: movement_matchesUpdateManyWithoutBank_movementsNestedInput
  }

  export type bank_movementsUncheckedUpdateWithoutBank_accountsInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    project_id?: NullableIntFieldUpdateOperationsInput | number | null
    bank_date?: DateTimeFieldUpdateOperationsInput | Date | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    debit?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    credit?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    currency?: StringFieldUpdateOperationsInput | string
    exchange_rate_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    source?: StringFieldUpdateOperationsInput | string
    sub_account_id?: IntFieldUpdateOperationsInput | number
    created_by?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    import_date?: DateTimeFieldUpdateOperationsInput | Date | string
    movement_matches?: movement_matchesUncheckedUpdateManyWithoutBank_movementsNestedInput
  }

  export type bank_movementsUncheckedUpdateManyWithoutBank_accountsInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    project_id?: NullableIntFieldUpdateOperationsInput | number | null
    bank_date?: DateTimeFieldUpdateOperationsInput | Date | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    debit?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    credit?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    currency?: StringFieldUpdateOperationsInput | string
    exchange_rate_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    source?: StringFieldUpdateOperationsInput | string
    sub_account_id?: IntFieldUpdateOperationsInput | number
    created_by?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    import_date?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type movement_matchesCreateManyBank_movementsInput = {
    obligation_id: bigint | number
    matched_amount: Decimal | DecimalJsLike | number | string
  }

  export type movement_matchesUpdateWithoutBank_movementsInput = {
    matched_amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    obligations?: obligationsUpdateOneRequiredWithoutMovement_matchesNestedInput
  }

  export type movement_matchesUncheckedUpdateWithoutBank_movementsInput = {
    obligation_id?: BigIntFieldUpdateOperationsInput | bigint | number
    matched_amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
  }

  export type movement_matchesUncheckedUpdateManyWithoutBank_movementsInput = {
    obligation_id?: BigIntFieldUpdateOperationsInput | bigint | number
    matched_amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
  }

  export type bank_accountsCreateManyCompaniesInput = {
    id?: number
    bank_name: string
    account_no: string
    currency: string
    created_at?: Date | string
  }

  export type projectsCreateManyCompaniesInput = {
    id?: number
    code: string
    name: string
    created_at?: Date | string
  }

  export type bank_accountsUpdateWithoutCompaniesInput = {
    bank_name?: StringFieldUpdateOperationsInput | string
    account_no?: StringFieldUpdateOperationsInput | string
    currency?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    bank_movements?: bank_movementsUpdateManyWithoutBank_accountsNestedInput
  }

  export type bank_accountsUncheckedUpdateWithoutCompaniesInput = {
    id?: IntFieldUpdateOperationsInput | number
    bank_name?: StringFieldUpdateOperationsInput | string
    account_no?: StringFieldUpdateOperationsInput | string
    currency?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    bank_movements?: bank_movementsUncheckedUpdateManyWithoutBank_accountsNestedInput
  }

  export type bank_accountsUncheckedUpdateManyWithoutCompaniesInput = {
    id?: IntFieldUpdateOperationsInput | number
    bank_name?: StringFieldUpdateOperationsInput | string
    account_no?: StringFieldUpdateOperationsInput | string
    currency?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type projectsUpdateWithoutCompaniesInput = {
    code?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    bank_movements?: bank_movementsUpdateManyWithoutProjectsNestedInput
    obligations?: obligationsUpdateManyWithoutProjectsNestedInput
  }

  export type projectsUncheckedUpdateWithoutCompaniesInput = {
    id?: IntFieldUpdateOperationsInput | number
    code?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    bank_movements?: bank_movementsUncheckedUpdateManyWithoutProjectsNestedInput
    obligations?: obligationsUncheckedUpdateManyWithoutProjectsNestedInput
  }

  export type projectsUncheckedUpdateManyWithoutCompaniesInput = {
    id?: IntFieldUpdateOperationsInput | number
    code?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type cost_centersCreateManyCost_centersInput = {
    id?: number
    code: string
    name: string
  }

  export type sub_accountsCreateManyCost_centersInput = {
    id?: number
    code: string
    name: string
  }

  export type cost_centersUpdateWithoutCost_centersInput = {
    code?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    other_cost_centers?: cost_centersUpdateManyWithoutCost_centersNestedInput
    sub_accounts?: sub_accountsUpdateManyWithoutCost_centersNestedInput
  }

  export type cost_centersUncheckedUpdateWithoutCost_centersInput = {
    id?: IntFieldUpdateOperationsInput | number
    code?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    other_cost_centers?: cost_centersUncheckedUpdateManyWithoutCost_centersNestedInput
    sub_accounts?: sub_accountsUncheckedUpdateManyWithoutCost_centersNestedInput
  }

  export type cost_centersUncheckedUpdateManyWithoutCost_centersInput = {
    id?: IntFieldUpdateOperationsInput | number
    code?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
  }

  export type sub_accountsUpdateWithoutCost_centersInput = {
    code?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    bank_movements?: bank_movementsUpdateManyWithoutSub_accountsNestedInput
  }

  export type sub_accountsUncheckedUpdateWithoutCost_centersInput = {
    id?: IntFieldUpdateOperationsInput | number
    code?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    bank_movements?: bank_movementsUncheckedUpdateManyWithoutSub_accountsNestedInput
  }

  export type sub_accountsUncheckedUpdateManyWithoutCost_centersInput = {
    id?: IntFieldUpdateOperationsInput | number
    code?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
  }

  export type obligationsCreateManyObligation_typesInput = {
    id?: bigint | number
    project_id: number
    description?: string | null
    amount_original: Decimal | DecimalJsLike | number | string
    currency: string
    exchange_rate_date?: Date | string | null
    due_date: Date | string
    status?: string
    created_at?: Date | string
  }

  export type obligationsUpdateWithoutObligation_typesInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    description?: NullableStringFieldUpdateOperationsInput | string | null
    amount_original?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    currency?: StringFieldUpdateOperationsInput | string
    exchange_rate_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    due_date?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    credits?: creditsUpdateOneWithoutObligationsNestedInput
    movement_matches?: movement_matchesUpdateManyWithoutObligationsNestedInput
    obligation_documents?: obligation_documentsUpdateManyWithoutObligationsNestedInput
    projects?: projectsUpdateOneRequiredWithoutObligationsNestedInput
  }

  export type obligationsUncheckedUpdateWithoutObligation_typesInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    project_id?: IntFieldUpdateOperationsInput | number
    description?: NullableStringFieldUpdateOperationsInput | string | null
    amount_original?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    currency?: StringFieldUpdateOperationsInput | string
    exchange_rate_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    due_date?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    credits?: creditsUncheckedUpdateOneWithoutObligationsNestedInput
    movement_matches?: movement_matchesUncheckedUpdateManyWithoutObligationsNestedInput
    obligation_documents?: obligation_documentsUncheckedUpdateManyWithoutObligationsNestedInput
  }

  export type obligationsUncheckedUpdateManyWithoutObligation_typesInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    project_id?: IntFieldUpdateOperationsInput | number
    description?: NullableStringFieldUpdateOperationsInput | string | null
    amount_original?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    currency?: StringFieldUpdateOperationsInput | string
    exchange_rate_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    due_date?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type movement_matchesCreateManyObligationsInput = {
    movement_id: bigint | number
    matched_amount: Decimal | DecimalJsLike | number | string
  }

  export type obligation_documentsCreateManyObligationsInput = {
    id?: number
    file_name: string
    file_path: string
    uploaded_by?: bigint | number | null
    uploaded_at?: Date | string
  }

  export type movement_matchesUpdateWithoutObligationsInput = {
    matched_amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    bank_movements?: bank_movementsUpdateOneRequiredWithoutMovement_matchesNestedInput
  }

  export type movement_matchesUncheckedUpdateWithoutObligationsInput = {
    movement_id?: BigIntFieldUpdateOperationsInput | bigint | number
    matched_amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
  }

  export type movement_matchesUncheckedUpdateManyWithoutObligationsInput = {
    movement_id?: BigIntFieldUpdateOperationsInput | bigint | number
    matched_amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
  }

  export type obligation_documentsUpdateWithoutObligationsInput = {
    file_name?: StringFieldUpdateOperationsInput | string
    file_path?: StringFieldUpdateOperationsInput | string
    uploaded_at?: DateTimeFieldUpdateOperationsInput | Date | string
    users?: usersUpdateOneWithoutObligation_documentsNestedInput
  }

  export type obligation_documentsUncheckedUpdateWithoutObligationsInput = {
    id?: IntFieldUpdateOperationsInput | number
    file_name?: StringFieldUpdateOperationsInput | string
    file_path?: StringFieldUpdateOperationsInput | string
    uploaded_by?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    uploaded_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type obligation_documentsUncheckedUpdateManyWithoutObligationsInput = {
    id?: IntFieldUpdateOperationsInput | number
    file_name?: StringFieldUpdateOperationsInput | string
    file_path?: StringFieldUpdateOperationsInput | string
    uploaded_by?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    uploaded_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type bank_movementsCreateManyProjectsInput = {
    id?: bigint | number
    bank_account_id: number
    bank_date: Date | string
    description?: string | null
    debit?: Decimal | DecimalJsLike | number | string | null
    credit?: Decimal | DecimalJsLike | number | string | null
    currency: string
    exchange_rate_date?: Date | string | null
    source: string
    sub_account_id: number
    created_by?: bigint | number | null
    import_date?: Date | string
  }

  export type obligationsCreateManyProjectsInput = {
    id?: bigint | number
    type_id: number
    description?: string | null
    amount_original: Decimal | DecimalJsLike | number | string
    currency: string
    exchange_rate_date?: Date | string | null
    due_date: Date | string
    status?: string
    created_at?: Date | string
  }

  export type bank_movementsUpdateWithoutProjectsInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    bank_date?: DateTimeFieldUpdateOperationsInput | Date | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    debit?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    credit?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    currency?: StringFieldUpdateOperationsInput | string
    exchange_rate_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    source?: StringFieldUpdateOperationsInput | string
    import_date?: DateTimeFieldUpdateOperationsInput | Date | string
    bank_accounts?: bank_accountsUpdateOneRequiredWithoutBank_movementsNestedInput
    users?: usersUpdateOneWithoutBank_movementsNestedInput
    sub_accounts?: sub_accountsUpdateOneRequiredWithoutBank_movementsNestedInput
    movement_matches?: movement_matchesUpdateManyWithoutBank_movementsNestedInput
  }

  export type bank_movementsUncheckedUpdateWithoutProjectsInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    bank_account_id?: IntFieldUpdateOperationsInput | number
    bank_date?: DateTimeFieldUpdateOperationsInput | Date | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    debit?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    credit?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    currency?: StringFieldUpdateOperationsInput | string
    exchange_rate_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    source?: StringFieldUpdateOperationsInput | string
    sub_account_id?: IntFieldUpdateOperationsInput | number
    created_by?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    import_date?: DateTimeFieldUpdateOperationsInput | Date | string
    movement_matches?: movement_matchesUncheckedUpdateManyWithoutBank_movementsNestedInput
  }

  export type bank_movementsUncheckedUpdateManyWithoutProjectsInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    bank_account_id?: IntFieldUpdateOperationsInput | number
    bank_date?: DateTimeFieldUpdateOperationsInput | Date | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    debit?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    credit?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    currency?: StringFieldUpdateOperationsInput | string
    exchange_rate_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    source?: StringFieldUpdateOperationsInput | string
    sub_account_id?: IntFieldUpdateOperationsInput | number
    created_by?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    import_date?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type obligationsUpdateWithoutProjectsInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    description?: NullableStringFieldUpdateOperationsInput | string | null
    amount_original?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    currency?: StringFieldUpdateOperationsInput | string
    exchange_rate_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    due_date?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    credits?: creditsUpdateOneWithoutObligationsNestedInput
    movement_matches?: movement_matchesUpdateManyWithoutObligationsNestedInput
    obligation_documents?: obligation_documentsUpdateManyWithoutObligationsNestedInput
    obligation_types?: obligation_typesUpdateOneRequiredWithoutObligationsNestedInput
  }

  export type obligationsUncheckedUpdateWithoutProjectsInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    type_id?: IntFieldUpdateOperationsInput | number
    description?: NullableStringFieldUpdateOperationsInput | string | null
    amount_original?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    currency?: StringFieldUpdateOperationsInput | string
    exchange_rate_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    due_date?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    credits?: creditsUncheckedUpdateOneWithoutObligationsNestedInput
    movement_matches?: movement_matchesUncheckedUpdateManyWithoutObligationsNestedInput
    obligation_documents?: obligation_documentsUncheckedUpdateManyWithoutObligationsNestedInput
  }

  export type obligationsUncheckedUpdateManyWithoutProjectsInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    type_id?: IntFieldUpdateOperationsInput | number
    description?: NullableStringFieldUpdateOperationsInput | string | null
    amount_original?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    currency?: StringFieldUpdateOperationsInput | string
    exchange_rate_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    due_date?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type bank_movementsCreateManySub_accountsInput = {
    id?: bigint | number
    bank_account_id: number
    project_id?: number | null
    bank_date: Date | string
    description?: string | null
    debit?: Decimal | DecimalJsLike | number | string | null
    credit?: Decimal | DecimalJsLike | number | string | null
    currency: string
    exchange_rate_date?: Date | string | null
    source: string
    created_by?: bigint | number | null
    import_date?: Date | string
  }

  export type bank_movementsUpdateWithoutSub_accountsInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    bank_date?: DateTimeFieldUpdateOperationsInput | Date | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    debit?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    credit?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    currency?: StringFieldUpdateOperationsInput | string
    exchange_rate_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    source?: StringFieldUpdateOperationsInput | string
    import_date?: DateTimeFieldUpdateOperationsInput | Date | string
    bank_accounts?: bank_accountsUpdateOneRequiredWithoutBank_movementsNestedInput
    users?: usersUpdateOneWithoutBank_movementsNestedInput
    projects?: projectsUpdateOneWithoutBank_movementsNestedInput
    movement_matches?: movement_matchesUpdateManyWithoutBank_movementsNestedInput
  }

  export type bank_movementsUncheckedUpdateWithoutSub_accountsInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    bank_account_id?: IntFieldUpdateOperationsInput | number
    project_id?: NullableIntFieldUpdateOperationsInput | number | null
    bank_date?: DateTimeFieldUpdateOperationsInput | Date | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    debit?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    credit?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    currency?: StringFieldUpdateOperationsInput | string
    exchange_rate_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    source?: StringFieldUpdateOperationsInput | string
    created_by?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    import_date?: DateTimeFieldUpdateOperationsInput | Date | string
    movement_matches?: movement_matchesUncheckedUpdateManyWithoutBank_movementsNestedInput
  }

  export type bank_movementsUncheckedUpdateManyWithoutSub_accountsInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    bank_account_id?: IntFieldUpdateOperationsInput | number
    project_id?: NullableIntFieldUpdateOperationsInput | number | null
    bank_date?: DateTimeFieldUpdateOperationsInput | Date | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    debit?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    credit?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    currency?: StringFieldUpdateOperationsInput | string
    exchange_rate_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    source?: StringFieldUpdateOperationsInput | string
    created_by?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    import_date?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type bank_movementsCreateManyUsersInput = {
    id?: bigint | number
    bank_account_id: number
    project_id?: number | null
    bank_date: Date | string
    description?: string | null
    debit?: Decimal | DecimalJsLike | number | string | null
    credit?: Decimal | DecimalJsLike | number | string | null
    currency: string
    exchange_rate_date?: Date | string | null
    source: string
    sub_account_id: number
    import_date?: Date | string
  }

  export type obligation_documentsCreateManyUsersInput = {
    id?: number
    obligation_id: bigint | number
    file_name: string
    file_path: string
    uploaded_at?: Date | string
  }

  export type bank_movementsUpdateWithoutUsersInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    bank_date?: DateTimeFieldUpdateOperationsInput | Date | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    debit?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    credit?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    currency?: StringFieldUpdateOperationsInput | string
    exchange_rate_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    source?: StringFieldUpdateOperationsInput | string
    import_date?: DateTimeFieldUpdateOperationsInput | Date | string
    bank_accounts?: bank_accountsUpdateOneRequiredWithoutBank_movementsNestedInput
    projects?: projectsUpdateOneWithoutBank_movementsNestedInput
    sub_accounts?: sub_accountsUpdateOneRequiredWithoutBank_movementsNestedInput
    movement_matches?: movement_matchesUpdateManyWithoutBank_movementsNestedInput
  }

  export type bank_movementsUncheckedUpdateWithoutUsersInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    bank_account_id?: IntFieldUpdateOperationsInput | number
    project_id?: NullableIntFieldUpdateOperationsInput | number | null
    bank_date?: DateTimeFieldUpdateOperationsInput | Date | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    debit?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    credit?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    currency?: StringFieldUpdateOperationsInput | string
    exchange_rate_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    source?: StringFieldUpdateOperationsInput | string
    sub_account_id?: IntFieldUpdateOperationsInput | number
    import_date?: DateTimeFieldUpdateOperationsInput | Date | string
    movement_matches?: movement_matchesUncheckedUpdateManyWithoutBank_movementsNestedInput
  }

  export type bank_movementsUncheckedUpdateManyWithoutUsersInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    bank_account_id?: IntFieldUpdateOperationsInput | number
    project_id?: NullableIntFieldUpdateOperationsInput | number | null
    bank_date?: DateTimeFieldUpdateOperationsInput | Date | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    debit?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    credit?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    currency?: StringFieldUpdateOperationsInput | string
    exchange_rate_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    source?: StringFieldUpdateOperationsInput | string
    sub_account_id?: IntFieldUpdateOperationsInput | number
    import_date?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type obligation_documentsUpdateWithoutUsersInput = {
    file_name?: StringFieldUpdateOperationsInput | string
    file_path?: StringFieldUpdateOperationsInput | string
    uploaded_at?: DateTimeFieldUpdateOperationsInput | Date | string
    obligations?: obligationsUpdateOneRequiredWithoutObligation_documentsNestedInput
  }

  export type obligation_documentsUncheckedUpdateWithoutUsersInput = {
    id?: IntFieldUpdateOperationsInput | number
    obligation_id?: BigIntFieldUpdateOperationsInput | bigint | number
    file_name?: StringFieldUpdateOperationsInput | string
    file_path?: StringFieldUpdateOperationsInput | string
    uploaded_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type obligation_documentsUncheckedUpdateManyWithoutUsersInput = {
    id?: IntFieldUpdateOperationsInput | number
    obligation_id?: BigIntFieldUpdateOperationsInput | bigint | number
    file_name?: StringFieldUpdateOperationsInput | string
    file_path?: StringFieldUpdateOperationsInput | string
    uploaded_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}