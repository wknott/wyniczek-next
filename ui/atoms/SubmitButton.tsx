"use client";

import { Button, Spinner } from "@heroui/react";
import { useFormStatus } from "react-dom";
import type { ComponentProps, ReactNode } from "react";

type ButtonProps = ComponentProps<typeof Button>;

interface SubmitButtonProps extends Omit<ButtonProps, "type" | "isPending" | "children"> {
	children: ReactNode;
	pendingLabel?: ReactNode;
}

export const SubmitButton = ({
	children,
	pendingLabel,
	isDisabled,
	...rest
}: SubmitButtonProps) => {
	const { pending } = useFormStatus();

	return (
		<Button
			{...rest}
			type="submit"
			isDisabled={isDisabled || pending}
			isPending={pending}
		>
			{pending ? (
				<span className="inline-flex items-center gap-2">
					<Spinner color="current" size="sm" />
					{pendingLabel ?? children}
				</span>
			) : (
				children
			)}
		</Button>
	);
};
