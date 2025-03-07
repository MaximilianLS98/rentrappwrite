import { CheckIcon } from 'lucide-react';

interface Step {
	id: number;
	name: string;
}

interface StepIndicatorProps {
	steps: Step[];
	currentStep: number;
}

export function StepIndicator({ steps, currentStep }: StepIndicatorProps) {
	return (
		<div className='relative'>
			<div className='absolute top-4 left-0 right-0 h-0.5 bg-muted'>
				<div
					className='absolute top-0 left-0 h-full bg-primary transition-all duration-300'
					style={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
				/>
			</div>

			<ol className='relative z-10 flex justify-between'>
				{steps.map((step) => {
					const isCompleted = currentStep > step.id;
					const isCurrent = currentStep === step.id;

					return (
						<li key={step.id} className='flex flex-col items-center'>
							<div
								className={`
                flex h-8 w-8 items-center justify-center rounded-full border-2
                ${
					isCompleted
						? 'border-primary bg-primary text-primary-foreground'
						: isCurrent
						? 'border-primary text-primary'
						: 'border-muted bg-background'
				}
              `}>
								{isCompleted ? (
									<CheckIcon className='h-4 w-4' />
								) : (
									<span>{step.id}</span>
								)}
							</div>
							<span
								className={`
                mt-2 text-sm font-medium
                ${isCompleted || isCurrent ? 'text-primary' : 'text-muted-foreground'}
              `}>
								{step.name}
							</span>
						</li>
					);
				})}
			</ol>
		</div>
	);
}
