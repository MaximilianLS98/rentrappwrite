import { AlertTriangle } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "../ui/table";

type props = {
    latePayments: LatePayment[];
}
interface LatePayment {
    tenant: string;
    address: string;
    daysLate: number;
    amountDue: number;
    interest: number;
}

export default function LatePayments(props: props) {
    return (
		<Card key='late-payments' className='h-full overflow-auto'>
			<CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
				<CardTitle className='text-md font-medium'>Late Payments</CardTitle>
				<AlertTriangle className='h-4 w-4 text-muted-foreground' />
			</CardHeader>
			<CardContent>
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead>Tenant</TableHead>
							<TableHead>Address</TableHead>
							<TableHead>Days Late</TableHead>
							<TableHead>Amount Due</TableHead>
							<TableHead>Interest</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{props.latePayments.map((payment, index) => (
							<TableRow key={index}>
								<TableCell>{payment.tenant}</TableCell>
								<TableCell>{payment.address}</TableCell>
								<TableCell>{payment.daysLate}</TableCell>
								<TableCell>${payment.amountDue.toFixed(2)}</TableCell>
								<TableCell>${payment.interest.toFixed(2)}</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</CardContent>
		</Card>
	);
}