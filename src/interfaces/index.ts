// Enumerations
export enum SeatsStatus {
    Available = 'Available',
    Selected = 'Selected',
    Taken = 'Taken',
    ReservedByYou = 'Reserved By You',
    ReservedByOthers = 'Reserved By Others'
}

export enum ThemeType {
    HighOdds = 'High Odds Theme',
    LowOdds = 'Low Odds Theme',
    Mixed = 'Mixed Theme'
}


// Types
export type Category = {
    sku: string,
    title: string,
    subsets?: Category[]
}

export type Product = {
    sku: string,
    title: string,
    price: number,
    images: string,
}

export type Webinar = {
    sku: string,
    productTitle: string, // webinarTitle = productTitle + 'Webinar'
    price: number,
    themeType: ThemeType,
    seatsStatus: SeatsStatus[],
    description: string,
    categories: Category[] // Full Categories from home to end
}