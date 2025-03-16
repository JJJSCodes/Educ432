"use client";

import { ChevronUp } from "lucide-react";

interface ConclusionProps {
	isLast?: boolean;
	onScrollNext: () => void;
}

export default function Conclusion({
	isLast = true,
	onScrollNext,
}: ConclusionProps) {
	const scrollToTop = () => {
		window.scrollTo({ top: 0, behavior: "smooth" });
	};

	return (
		<div className="min-h-screen w-full flex flex-col items-center justify-center p-6 relative bg-gradient-to-br from-orange-50 to-amber-50">
			<div className="max-w-4xl mx-auto w-full">
				<h2 className="text-3xl md:text-4xl font-bold mb-8 text-center text-orange-600">
					Conclusion
				</h2>

				<div className="bg-white p-8 rounded-xl shadow-md border border-orange-200 mb-8">
					<p className="text-lg mb-6 text-gray-700">
						Throughout this explorable, we've journeyed through the
						fundamental concepts that power the internet and make
						applications like TikTok possible.
					</p>

					<div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
						<div className="bg-amber-50 p-6 rounded-lg">
							<h3 className="text-xl font-semibold mb-3 text-amber-600">
								What We've Learned
							</h3>
							<ul className="space-y-2 list-disc list-inside">
								<li>
									IP addresses are the unique identifiers that
									allow devices to communicate and DNS
									translates domain names to IP addresses
									through a chain of trust
								</li>
								<li>
									ISPs provide the infrastructure that
									connects us to the global internet
								</li>
								<li>
									ASNs and routers direct traffic efficiently
									across networks
								</li>
								<li>
									Encryption protects our data as it travels
									across the internet
								</li>
								<li>
									The internet was originally designed to make
									things work. Security was only an
									afterthought and as we started to rely on
									the internet for identity validation and
									tasks like paying bank statements.
								</li>
							</ul>
						</div>

						<div className="bg-orange-50 p-6 rounded-lg">
							<h3 className="text-xl font-semibold mb-3 text-orange-600">
								The Bigger Picture
							</h3>
							<p className="text-gray-700">
								The assumption of trust is not effective enough
								to secure the internet. There needs to be a
								process of <b>trust</b> AND <b>validation</b> to
								ensure the data received by your device is
								truthful and not malicious.
							</p>
							<p className="mt-4 text-gray-700">
								The rhetoric around apps and companies that
								exist beyond the scope of US borders being more
								insecure is <b>incorrect</b>. From what we
								learned in this explorable, there are many ways
								bad actors can disrupt the basic functionality
								of the internet no matter the national origins
								of a company. It is important to remember that
								geopolitical narratives can only tell us so
								much.
							</p>
							<p className="mt-4 text-gray-700">
								Although there may be some valid points around
								user data being exploited by another nation's
								government, we already see these malicious acts
								actively being employed by US ISPs to collect,
								track, and monitor all devices on the internet,
								all for the sake of advertisements and
								censorship. Similar to the lessons learned in
								this explorable,{" "}
								<b>
									approach cybersecurity concerns objectively
								</b>
								. Trust but verify the narratives around
								security by using the knowledge gained in this
								explorable to delve deep into the underlying
								systems to uncover for yourself what is truly a
								security concern.
							</p>
						</div>
					</div>

					<div className="bg-gradient-to-r from-amber-100 to-orange-100 p-6 rounded-xl">
						<h3 className="text-xl font-semibold mb-4 text-center text-orange-600">
							Next Steps
						</h3>
						<p className="text-gray-700 mb-4">
							Now that you understand these concepts, you might
							notice them at work in your daily online activities.
							When you browse websites, stream videos, or use
							apps, consider the complex infrastructure making it
							all possible and the underlying security
							implications at play.
						</p>
						<p className="text-gray-700">
							For those interested in learning more, consider
							exploring topics like network security or content
							delivery networks (CDNs).
						</p>
					</div>
				</div>
			</div>

			<button
				onClick={scrollToTop}
				className="mt-8 flex flex-col items-center text-orange-500 hover:text-orange-600 transition-colors"
				aria-label="Scroll to top"
			>
				<span className="mb-2 font-medium">Back to Start</span>
				<ChevronUp className="animate-bounce" />
			</button>
		</div>
	);
}
