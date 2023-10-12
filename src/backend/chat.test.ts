import {answerInternal, olderThanHalfYear} from "./chat";

describe("Order chat", () => {
    describe("older than half a year", () => {
        const today = new Date("2020-07-15");
        test("older", () => {
            expect(olderThanHalfYear(new Date("2020-01-14"), today)).toEqual(true);
        });
        test("equal", () => {
            expect(olderThanHalfYear(new Date("2020-01-15"), today)).toEqual(false);
        });
        test("younger", () => {
            expect(olderThanHalfYear(new Date("2020-01-16"), today)).toEqual(false);
        });
    });

    describe("valid order numbers", () => {
        test("order with status new", () => {
            const orders = [
                {
                    ID: 1,
                    date: new Date("2023-01-01"),
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
                    state: "new" as const
                }
            ];
            const question = "What is the status of order #1?";
            expect(answerInternal(question, new Date(2023, 6, 1), orders)).toEqual("The sales order #1 is currently in status \"new\". The order will be sent to customer John Doe in 123 Main St, 12345 Anytown, CA.");
        });
        test("order with status open", () => {
            const orders = [
                {
                    ID: 2,
                    date: new Date("2023-01-02"),
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
                    state: "open" as const
                }
            ];
            const question = "What is the status of order #2?";
            expect(answerInternal(question, new Date(2023, 6, 1), orders)).toEqual("The sales order #2 is currently in status \"open\". The order will be sent to customer Jane Doe in 456 Main St, 12345 Anytown, CA.");
        });
        test("order with status in progress", () => {
            const orders = [
                {
                    ID: 3,
                    date: new Date("2023-01-03"),
                    customerName: "Jack Doe",
                    shippingAddress: {
                        street: "789 Main St",
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
                    state: "in progress" as const
                }
            ];
            const question = "What is the status of order #3?";
            expect(answerInternal(question, new Date(2023, 6, 1), orders)).toEqual("The sales order #3 is currently in status \"in progress\". The order will be sent to customer Jack Doe in 789 Main St, 12345 Anytown, CA.");
        });
        test("order with status sent", () => {
            const orders = [
                {
                    ID: 4,
                    date: new Date("2023-01-04"),
                    customerName: "Jill Doe",
                    shippingAddress: {
                        street: "012 Main St",
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
                    state: "sent" as const
                }
            ];
            const question = "What is the status of order #4?";
            expect(answerInternal(question, new Date(2023, 6, 1), orders)).toEqual("The sales order #4 is currently in status \"sent\". The order will be sent to customer Jill Doe in 012 Main St, 12345 Anytown, CA.");
        });
        test("order with status completed", () => {
            const orders = [
                {
                    ID: 5,
                    date: new Date("2023-01-05"),
                    customerName: "Joe Doe",
                    shippingAddress: {
                        street: "345 Main St",
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
                    state: "completed" as const
                }
            ];
            const question = "What is the status of order #5?";
            expect(answerInternal(question, new Date(2023, 6, 1), orders)).toEqual("The sales order #5 is currently in status \"completed\". The order will be sent to customer Joe Doe in 345 Main St, 12345 Anytown, CA.");
        });
    });
    describe("invalid order numbers", () => {
        test("order number not found", () => {
            const orders = [
                {
                    ID: 1,
                    date: new Date("2023-01-01"),
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
                    state: "new" as const
                }
            ];
            const question = "What is the status of order #2?";
            expect(answerInternal(question, new Date(2023, 6, 1), orders)).toEqual("There is no order with order number 2.");
        });
        test("orders older than half a year", () => {
            const orders = [
                {
                    ID: 1,
                    date: new Date("2020-01-01"),
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
                    state: "new" as const
                }
            ];
            const question = "What is the status of order #1?";
            expect(answerInternal(question, new Date(2023, 6, 1), orders)).toEqual("Information about order #1 is no longer available.");
        });
        test("orders slightly older than half a year", () => {
            const orders = [
                {
                    ID: 1,
                    date: new Date("2020-01-02"),
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
                    state: "new" as const
                }
            ];
            const question = "What is the status of order #1?";
            expect(answerInternal(question, new Date(2020, 6, 3), orders)).toEqual("Information about order #1 is no longer available.");
        });
        test("orders exactly half a year old", () => {
            const orders = [
                {
                    ID: 1,
                    date: new Date("2020-01-02"),
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
                    state: "new" as const
                }
            ];
            const question = "What is the status of order #1?";
            expect(answerInternal(question, new Date(2020, 6, 2), orders)).toEqual("The sales order #1 is currently in status \"new\". The order will be sent to customer John Doe in 123 Main St, 12345 Anytown, CA.");
        });
    });
});

