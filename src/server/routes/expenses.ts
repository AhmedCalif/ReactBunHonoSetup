import { Hono } from "hono";
import { z } from "zod";
import { zValidator } from '@hono/zod-validator';


const createExpenseSchema = z.object({
    title: z.string().min(3),
    amount: z.number().positive()
});

const expenseSchema = z.object({
    id: z.number().int().positive().min(1),
    title: z.string().min(3),
    amount: z.number().positive()
});

type Expense = z.infer<typeof expenseSchema>

const fakeExpenses: Expense[] = [
    {
        id: 1,
        title: "Grocery Shopping",
        amount: 156.75,
    },
    {
        id: 2,
        title: "Monthly Rent",
        amount: 1500.00,
    },
];

export const expensesRoute = new Hono()
.get("/", async (c) => {
    return c.json({ expenses: fakeExpenses }) 
})
.post("/",
    zValidator('json', createExpenseSchema), 
    async (c) => {  
        const expenseData = c.req.valid('json');
        
        const newExpense: Expense = {
            id: fakeExpenses.length + 1,
            ...expenseData
        };
        
        fakeExpenses.push(newExpense);
        return c.json({ expense: newExpense });
    })
    .get("/total-spent", (c) => {
        const totalSum = fakeExpenses.reduce((acc, expense) => acc + expense.amount, 0)
        return c.json({totalSum})
    })
.get("/:id{[0-9]+}", async (c) => {
    const id = parseInt(c.req.param('id'));
    const expense = fakeExpenses.find(expense => expense.id === id);
    
    if (!expense) {
        return c.json({ error: "Expense not found" }, 404);
    }
    
    return c.json({ expense });
})
.delete("/:id{[0-9]+}", async (c) => {
    const id = parseInt(c.req.param('id'));
    const index = fakeExpenses.findIndex(expense => expense.id === id);
    
    if (index === -1) {
        return c.json({ error: "Expense not found" }, 404);
    }
    const deletedExpense = fakeExpenses.splice(index, 1)[0];
    return c.json({ deletedExpense });
});