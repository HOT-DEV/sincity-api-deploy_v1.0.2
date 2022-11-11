export declare enum SeatsStatus {
    Available = "Available",
    Selected = "Selected",
    Taken = "Taken",
    ReservedByYou = "Reserved By You",
    ReservedByOthers = "Reserved By Others"
}
export declare enum ThemeType {
    HighOdds = "High Odds Theme",
    LowOdds = "Low Odds Theme",
    Mixed = "Mixed Theme"
}
export declare type Category = {
    sku: string;
    title: string;
    subsets?: Category[];
};
export declare type Product = {
    sku: string;
    title: string;
    price: number;
    images: string;
};
export declare type Webinar = {
    sku: string;
    productTitle: string;
    price: number;
    themeType: ThemeType;
    seatsStatus: SeatsStatus[];
    description: string;
    categories: Category[];
};
