declare global {
  namespace JSX {
    type Element = HTMLElement | DocumentFragment;
    interface IntrinsicElements {
      [elemName: string]: any;
    }
  }
}

export {};
