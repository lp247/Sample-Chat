interface Address {
    street: string;
    city: string;
    country: string;
    zip: string;
}

interface Article {
    name: string;
    price: number;
    quantity: number;
}

type OrderState = "new" | "open" | "in progress" | "sent" | "completed";

export interface Order {
    // Assuming the order number is in fact the ID.
    ID: number;
    date: Date;
    customerName: string;
    shippingAddress: Address;
    articles: Article[];
    state: OrderState;
}

export const SampleOrders: Order[] = [
    {
        ID: 1,
        date: new Date("2023-05-01"),
        customerName: "John Doe",
        shippingAddress: {
            street: "123 Main St",
            city: "Anytown",
            country: "CA",
            zip: "12345"
        },
        articles: [
            {
                name: "Widget",
                price: 9.99,
                quantity: 2
            },
            {
                name: "Thing",
                price: 4.99,
                quantity: 1
            }
        ],
        state: "new"
    },
    {
        ID: 2,
        date: new Date("2023-05-02"),
        customerName: "Jane Doe",
        shippingAddress: {
            street: "456 Main St",
            city: "Anytown",
            country: "CA",
            zip: "12345"
        },
        articles: [
            {
                name: "Widget",
                price: 9.99,
                quantity: 1
            },
            {
                name: "Thing",
                price: 4.99,
                quantity: 1
            }
        ],
        state: "open"
    },
    {
        ID: 3,
        date: new Date("2020-05-03"),
        customerName: "John Doe",
        shippingAddress: {
            street: "123 Main St",
            city: "Anytown",
            country: "CA",
            zip: "12345"
        },
        articles: [
            {
                name: "Widget",
                price: 9.99,
                quantity: 4
            },
            {
                name: "Thing",
                price: 4.99,
                quantity: 2
            }
        ],
        state: "in progress"
    }
];
