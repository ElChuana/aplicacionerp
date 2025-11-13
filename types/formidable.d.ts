declare module 'formidable' {
  export class IncomingForm {
    constructor(options?: any);
    parse: (req: any, callback?: any) => void;
    on: (event: string, callback: (...args: any[]) => void) => void;
  }
  export type Fields = any;
  export type Files = any;
}
