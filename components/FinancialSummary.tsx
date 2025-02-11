import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowUpRight, ArrowDownRight } from "lucide-react"

interface FinancialSummaryProps {
  totalRevenue: number
  expenses: number
  netIncome: number
  occupancyRate: number
}

export function FinancialSummary({ totalRevenue, expenses, netIncome, occupancyRate }: FinancialSummaryProps) {
  
  const formatCurrency = (value: number) => {
		return new Intl.NumberFormat('nb-NO', { style: 'currency', currency: 'NOK' }).format(value);
  };

  return (
    <Card className="col-span-4">
      <CardHeader>
        <CardTitle>Finansiell oversikt</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <div className="flex flex-col">
            <span className="text-sm font-medium text-muted-foreground">Total Revenue</span>
            <span className="text-2xl font-bold">{formatCurrency(totalRevenue)}</span>
            <span className="flex items-center text-sm text-green-600">
              <ArrowUpRight className="mr-1 h-4 w-4" />
              12% from last month
            </span>
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-medium text-muted-foreground">Expenses</span>
            <span className="text-2xl font-bold">{formatCurrency(expenses)}</span>
            <span className="flex items-center text-sm text-red-600">
              <ArrowDownRight className="mr-1 h-4 w-4" />
              3% from last month
            </span>
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-medium text-muted-foreground">Net Income</span>
            <span className="text-2xl font-bold">{formatCurrency(netIncome)}</span>
            <span className="flex items-center text-sm text-green-600">
              <ArrowUpRight className="mr-1 h-4 w-4" />
              8% from last month
            </span>
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-medium text-muted-foreground">Occupancy Rate</span>
            <span className="text-2xl font-bold">{occupancyRate}%</span>
            <span className="flex items-center text-sm text-green-600">
              <ArrowUpRight className="mr-1 h-4 w-4" />
              2% from last month
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

