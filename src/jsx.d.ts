declare global {
  namespace JSX {
    type Element = HTMLElement;
    interface IntrinsicElements {
      [elemName: string]: any;
    }
  }
}

export {};   
