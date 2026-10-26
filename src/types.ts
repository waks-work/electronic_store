export type Some<T> = { 
    readonly tag: "Some"; 
    readonly value: T 
};

export type None = {
    readonly tag: "None"
};

export type Option<T> = Some<T> | None;

export const Some = <T>(value: T): Option<T> => ({ tag: "Some", value });
export const None = <T = never>(): Option<T> => ({ tag: "None" });

export type Ok<T> = { 
    readonly tag: "Ok"; 
    readonly value: T 
};

export type Err<E> = { 
    readonly tag: "Err"; 
    readonly error: E 
};

export type Result<T, E> = Ok<T> | Err<E>;

export const Ok  = <T, E = never>(value: T): Result<T, E> => ({ tag: "Ok", value });
export const Err = <E, T = never>(error: E): Result<T, E> => ({ tag: "Err", error });

// helpers for option match 
export function match_option<T, R>(
    opt: Option<T>,
    handlers: {
        some: (val: T) => R;
        none: () => R;
    }
): R {
    return opt.tag === "Some" ? handlers.some(opt.value) : handlers.none();
}


export enum l_page_view {
    Home = "HOME",
    PDP  = "PDP"
}

export enum l_stock_status {
    in_stock     = "IN_STOCK",
    low_stock    = "LOW_STOCK",
    out_of_stock = "OUT_OF_STOCK"
}

export enum l_theme {
    light = "light",
    dark  = "dark"
}

export interface l_review {
    readonly id: string;
    readonly author: string;
    readonly rating: number;
    readonly comment: string;
    readonly date: string;
}

export interface l_product {
    readonly id: string;
    readonly title: string;
    readonly description: string;
    readonly price: number;
    readonly rating: number;
    readonly image: string;
    readonly thumbnails: readonly string[];
    readonly stockCount: number;
    readonly shippingCost: number;
    readonly details: string;
    readonly specifications: Readonly<Record<string, string>>;
    readonly category: string;
    readonly promotionTag: Option<string>;
}

export interface l_cart_item {
  readonly product: l_product;
  readonly quantity: number;
}
