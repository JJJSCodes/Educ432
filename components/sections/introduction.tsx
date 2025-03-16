"use client";

import Image from "next/image";
import { ChevronDown } from "lucide-react";

interface IntroductionProps {
	isLast?: boolean;
	onScrollNext: () => void;
}

export default function Introduction({
	isLast = false,
	onScrollNext,
}: IntroductionProps) {
	return (
		<div className="min-h-screen w-full flex flex-col items-center justify-center p-6 relative">
			<div className="max-w-4xl mx-auto w-full">
				<div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
					<div className="order-2 md:order-1">
						<h1 className="text-4xl md:text-5xl font-bold mb-6 text-orange-600">
							Understanding Internet Infrastructure
						</h1>
						<p className="text-lg mb-4 text-gray-700">
							Welcome to this interactive explorable on internet
							infrastructure and cybersecurity! In this learning
							journey, you'll take on the role of a cybersecurity
							analyst called "NetGuardian" tasked with
							investigating the claims behind recent calls to ban
							TikTok due to "cybersecurity concerns." Is this just
							political rhetoric, or are there legitimate
							technical concerns? Your mission is to uncover the
							truth by understanding how the internet works, how
							data flows across networks, and how security
							measures can be compromised.
						</p>
						<p className="text-lg mb-8 text-gray-700">
							Before diving into cybersecurity concerns, we need
							to understand the basic building blocks of the
							internet. Let's explore these fundamental concepts
							through a familiar analogy: the postal mail system.
						</p>

						<div className="bg-white p-6 rounded-xl shadow-md border border-amber-200">
							<h2 className="text-xl font-semibold mb-4 text-orange-500">
								Learning Objectives
							</h2>
							<ul className="space-y-2">
								<li className="flex items-start">
									<span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-amber-100 text-orange-600 mr-2 flex-shrink-0">
										1
									</span>
									<span>
										Identify Fundamental Internet Components
									</span>
								</li>
								<li className="flex items-start">
									<span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-amber-100 text-orange-600 mr-2 flex-shrink-0">
										2
									</span>
									<span>
										Explain How Data Flows Securely Between
										Devices and Within Networks
									</span>
								</li>
								<li className="flex items-start">
									<span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-amber-100 text-orange-600 mr-2 flex-shrink-0">
										3
									</span>
									<span>
										Analyze network diagrams and system
										architectures to identify potential
										security weaknesses
									</span>
								</li>
								<li className="flex items-start">
									<span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-amber-100 text-orange-600 mr-2 flex-shrink-0">
										4
									</span>
									<span>
										Analyze real-world case studies of
										cyberattacks and their consequences
										(e.g., data breaches, ransomware
										attacks, infrastructure disruptions)
									</span>
								</li>
								<li className="flex items-start">
									<span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-amber-100 text-orange-600 mr-2 flex-shrink-0">
										5
									</span>
									<span>
										Distinguish technical vulnerabilities
										from geopolitical narratives
									</span>
								</li>
							</ul>
						</div>
					</div>

					<div className="order-1 md:order-2 flex justify-center">
						<div className="relative w-full max-w-md aspect-square">
							<Image
								src="/Educ432/robot.png?height=400&width=400"
								alt="Internet Infrastructure Visualization"
								width={400}
								height={400}
								className="rounded-xl shadow-lg border-4 border-white"
							/>
						</div>
					</div>
				</div>
			</div>

			{!isLast && (
				<button
					onClick={onScrollNext}
					className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center text-orange-500 hover:text-orange-600 transition-colors"
					aria-label="Scroll to next section"
				>
					<span className="mb-2 font-medium">
						Explore Key Concepts
					</span>
					<ChevronDown className="animate-bounce" />
				</button>
			)}
		</div>
	);
}
