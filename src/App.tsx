"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { DollarSign, Plus } from "lucide-react"
import { useState, useEffect } from "react"

function App() {
  const [totalSpent, setTotalSpent] = useState(0)

  useEffect(() => {
    async function fetchTotal() {
        try {
            const response = await fetch("/api/expenses/total-spent")
            console.log('Raw response:', response)
            const text = await response.text()
            console.log('Response text:', text)
            const data = JSON.parse(text)
            setTotalSpent(data.totalSum)
        } catch (error) {
            console.error("Failed to fetch total:", error)
        }
    }
    fetchTotal()
}, [])
  const expenses = [
    { id: 1, name: 'Groceries', amount: 50.75, date: '2023-06-01', category: 'food' },
    { id: 2, name: 'Gas', amount: 30.00, date: '2023-06-02', category: 'transport' },
    { id: 3, name: 'Movie tickets', amount: 25.50, date: '2023-06-03', category: 'entertainment' },
  ]

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-background p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-2xl font-bold">Expenses</CardTitle>
          <Button size="icon" variant="ghost">
            <Plus className="h-4 w-4" />
            <span className="sr-only">Add expense</span>
          </Button>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-4 rounded-md border p-4">
            <div className="flex-1 space-y-1">
              <p className="text-sm font-medium leading-none">Total Expenses</p>
              <p className="text-2xl font-bold">{totalSpent}</p>
            </div>
            <DollarSign className="h-8 w-8 text-muted-foreground" />
          </div>
          <div className="mt-4 space-y-4">
            {expenses.map((expense) => (
              <div key={expense.id} className="flex items-center">
                <Avatar className="h-9 w-9">
                  <AvatarImage src={`https://avatar.vercel.sh/${expense.category}.png`} alt={expense.category} />
                  <AvatarFallback>{expense.category[0]}</AvatarFallback>
                </Avatar>
                <div className="ml-4 space-y-1">
                  <p className="text-sm font-medium leading-none">{expense.name}</p>
                  <p className="text-sm text-muted-foreground">{expense.date}</p>
                </div>
                <div className="ml-auto font-medium">${expense.amount.toFixed(2)}</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default App