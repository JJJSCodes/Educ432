"use client";

import { useEffect, useRef, useState } from "react";
import Introduction from "@/components/sections/introduction";
import KeyConcepts from "@/components/sections/key-concepts";
import TiktokDataFlow from "@/components/sections/tiktok-data-flow";
import TrustChain from "@/components/sections/trust-chain";
import Conclusion from "@/components/sections/conclusion";
import SectionBar from "@/components/section-bar";

export default function NetworkExplorable() {
	const [activeSection, setActiveSection] = useState(0);
	const [completedSections, setCompletedSections] = useState<boolean[]>([]);
	const sectionsRef = useRef<HTMLDivElement>(null);

	const sections = [
		{
			id: "introduction",
			title: "Introduction",
			component: Introduction,
		},
		{
			id: "key-concepts",
			title: "Key Concepts",
			component: KeyConcepts,
		},
		{
			id: "tiktok-data-flow",
			title: "TikTok Data Flow",
			component: TiktokDataFlow,
		},
		{
			id: "trust-chain",
			title: "DNS & IP: Trust Chain",
			component: TrustChain,
		},
		{
			id: "conclusion",
			title: "Conclusion",
			component: Conclusion,
		},
	];

	useEffect(() => {
		// Initialize completed sections array
		setCompletedSections(new Array(sections.length).fill(false));
	}, [sections.length]);

	useEffect(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						const sectionId = entry.target.id;
						const sectionIndex = sections.findIndex(
							(section) => section.id === sectionId
						);

						if (sectionIndex !== -1) {
							setActiveSection(sectionIndex);

							// Mark this section and all previous sections as completed
							setCompletedSections((prev) => {
								const updated = [...prev];
								for (let i = 0; i <= sectionIndex; i++) {
									updated[i] = true;
								}
								return updated;
							});
						}
					}
				});
			},
			{ threshold: 0.6 } // Section is considered viewed when 60% visible
		);

		// Observe all section elements
		const sectionElements = document.querySelectorAll(".section");
		sectionElements.forEach((section) => {
			observer.observe(section);
		});

		return () => {
			sectionElements.forEach((section) => {
				observer.unobserve(section);
			});
		};
	}, []);

	const scrollToSection = (index: number) => {
		const sectionElement = document.getElementById(sections[index].id);
		if (sectionElement) {
			sectionElement.scrollIntoView({ behavior: "smooth" });
		}
	};

	return (
		<div
			className="relative min-h-screen overflow-y-auto bg-gradient-to-br from-amber-50 to-orange-50"
			ref={sectionsRef}
		>
			{sections.map((section, index) => {
				const SectionComponent = section.component;
				return (
					<div
						key={section.id}
						id={section.id}
						className="section min-h-screen w-full relative"
					>
						<SectionComponent
							isLast={index === sections.length - 1}
							onScrollNext={() => scrollToSection(index + 1)}
						/>
					</div>
				);
			})}

			<SectionBar
				sections={sections}
				activeSection={activeSection}
				completedSections={completedSections}
				onSectionClick={scrollToSection}
			/>
		</div>
	);
}
