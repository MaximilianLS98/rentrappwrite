// This template is meant to be sent to landlords to notify them of late rent payments. It includes the tenant's name, the amount due, the unit being rented and the due date and the property the unit belongs to.

interface EmailTemplateProps {
	tenantName: string;
	amountDue: number;
	dueDate: string;
	unit: string;
	property: string;
}

// TODO - add tenant contact information and translate to Norwegian
export const LateRentEmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
	tenantName,
	amountDue,
	dueDate,
	unit,
	property,
}) => (
	<div>
		<h1>Dear Landlord,</h1>
		<p>
			This is to inform you that {tenantName} has not paid their rent for unit {unit} at{' '}
			{property}. The amount due is {amountDue} kr and was due on {dueDate}. Please contact the
			tenant to resolve this matter.
		</p>
	</div>
);
