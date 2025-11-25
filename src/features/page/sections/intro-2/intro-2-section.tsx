"use client";

import { ScrollAnimatedContainer } from "@/shared/components/animations/scroll-animated-container";
import { SectionProps } from "@/shared/types/page.types";

type Intro2SectionProps = SectionProps<"intro-2">;

export function Intro2Section({
	title,
	description,
}: Intro2SectionProps) {
	return (
		<section className="mt-6 max-sm:px-6">
			{title && (
				<ScrollAnimatedContainer delay={0}>
					<h2 className="mb-4 text-center">{title}</h2>
				</ScrollAnimatedContainer>
			)}

			{description && (
				<ScrollAnimatedContainer delay={0.05}>
					<div className="mx-auto mb-12 max-w-[840px] text-center text-[14px] leading-[24px] sm:text-base lg:text-xl">
						<p>{description}</p>
					</div>
				</ScrollAnimatedContainer>
			)}
		</section>
	);
}
