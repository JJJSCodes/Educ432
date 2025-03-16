"use client";
import { ChevronDown } from "lucide-react";
import Image from "next/image";
import IPAddressInteractive from "@/components/interactives/ip-address";
import ASNRouterInteractive from "@/components/interactives/asn-router";
import EncryptionInteractive from "@/components/interactives/encryption";

interface KeyConceptsProps {
	isLast?: boolean;
	onScrollNext: () => void;
}

export default function KeyConcepts({
	isLast = false,
	onScrollNext,
}: KeyConceptsProps) {
	return (
		<div className="min-h-screen w-full py-16 px-6">
			<div className="max-w-4xl mx-auto">
				<h2 className="text-3xl md:text-4xl font-bold mb-12 text-center text-orange-600">
					Key Concepts
				</h2>

				{/* IP Address Section */}
				<section
					className="mb-24 scroll-mt-16"
					id="ip-address"
				>
					<div className="bg-gradient-to-r from-amber-100 to-orange-100 p-8 rounded-xl shadow-md">
						<h3 className="text-2xl font-bold mb-4 text-orange-600">
							IP Addresses
						</h3>
						<div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
							<div>
								<p className="mb-4 text-gray-700">
									When writing mail to a friend, we have a
									pre-established system or protocol we must
									follow to send mail around, otherwise, mail
									there won't get to where we want it to go!
									Just as your home has a physical address,
									every device connected to the internet needs
									a unique identifier. In the mail system: You
									use a street address with a specific format
									(name, street, city, zip code). On the
									internet: Computers use IP addresses - 4
									sets of numbers from 0-255 separated by
									periods (like 192.168.1.1).
								</p>
								<p className="mb-4 text-gray-700">
									A single IP address format (IPv4) with the
									different numerical possibilities can
									provide approximately 4.2 billion unique
									addresses! But remembering all these numbers
									is challenging for humans, this is where the
									Domain Name System comes in, a system that
									converts the underlying IP addresses into
									memorable names like google.com and
									tiktok.com.
								</p>
								<p className="text-gray-700">
									At its core, the system involves requesting
									a chain of requests to multiple nameservers
									to find the IP address of a given name by
									breaking apart a name into components. For
									example, we get that the IP address for
									google.com is:{" "}
									<a
										href="https://8.8.8.8"
										target="_blank"
									>
										8.8.8.8.
									</a>{" "}
									Test this out by clicking on the link! See
									how in the search bar, instead of seeing the
									IP address of google.com, the browser
									automatically resolves it for us and
									translates the IP address into a name we
									recognize.
								</p>
							</div>
							<div>
								<h4 className="text-lg font-semibold mb-3 text-orange-500">
									Try It: Binary IP Address
								</h4>
								<p className="mb-4 text-gray-600 text-sm">
									Toggle the bits below to see how binary
									values translate to an IP address. Can you
									create your own IP address in binary?
								</p>
								<IPAddressInteractive />
							</div>
						</div>
					</div>
				</section>

				{/* ISP Section */}
				<section
					className="mb-24 scroll-mt-16"
					id="isp"
				>
					<div className="bg-gradient-to-r from-rose-100 to-pink-100 p-8 rounded-xl shadow-md">
						<h3 className="text-2xl font-bold mb-4 text-rose-600">
							Internet Service Providers (ISPs)
						</h3>
						<div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
							<div>
								<p className="mb-4 text-gray-700">
									Internet Service Providers (ISPs) are the
									companies that provide internet access to
									homes, businesses, and mobile devices. They
									maintain the infrastructure that connects
									you to the global internet.
								</p>
								<p className="mb-4 text-gray-700">
									ISPs operate at different levels: Tier 1
									ISPs form the backbone of the internet and
									connect directly to each other. Tier 2 ISPs
									connect to Tier 1 providers and also to each
									other. Tier 3 ISPs are the local providers
									that connect directly to consumers and
									businesses.
								</p>
								<p className="text-gray-700">
									When you connect to the internet, your data
									travels through your ISP's network before
									reaching the wider internet. ISPs use
									complex routing systems to direct traffic
									efficiently across their networks and to
									other ISPs.
								</p>
							</div>
							<div className="flex items-center justify-center">
								<div className="relative w-full max-w-md">
									<Image
										src="/Educ432/houses.png?height=400&width=500"
										alt="ISP Network Hierarchy"
										width={400}
										height={300}
										className="rounded-lg shadow border-2 border-white"
									/>
								</div>
							</div>
						</div>
					</div>
				</section>

				{/* ASN + Routers Section */}
				<section
					className="mb-24 scroll-mt-16"
					id="asn-routers"
				>
					<div className="bg-gradient-to-r from-purple-100 to-indigo-100 p-8 rounded-xl shadow-md">
						<h3 className="text-2xl font-bold mb-4 text-purple-600">
							ASNs & Routers
						</h3>
						<div className="grid grid-cols-1 gap-8">
							<div>
								<p className="mb-4 text-gray-700">
									What happens when you send mail to someone
									served by a different post office or in
									another country? Let's take the example that
									you live in a rural town in the US and want
									to send mail to London, it is not very
									efficient/economical to have a plane take
									mail from a rural town to London. Instead,
									the mail has to take multiple steps to go
									through many intermediary centers that are
									individually better equipped to get it to
									where it needs to go. Multiple postal
									systems must work together. Autonomous
									System Numbers (ASNs) are unique identifiers
									assigned to networks on the internet. Each
									ISP or large organization typically has its
									own ASN, which helps routers determine how
									to direct traffic between different
									networks.
								</p>
								<p className="mb-4 text-gray-700">
									Routers are the traffic directors of the
									internet. They examine the destination IP
									address of data packets and determine the
									best path to forward them. Routers
									communicate with each other using protocols
									like BGP (Border Gateway Protocol) to share
									information about network paths.
								</p>
								<p className="mb-4 text-gray-700">
									When data travels across the internet, it
									typically passes through multiple routers in
									different autonomous systems. Each router
									makes an independent decision about where to
									send the data next, based on its routing
									tables. BGP allows routers to self-promote
									itself by announcing to the network which
									connections it has and how many "hops" are
									in between it and the destination. Using
									this information, the shortest distance is
									always chosen.
								</p>
							</div>
							<div>
								<h4 className="text-lg font-semibold mb-3 text-purple-500">
									Try It: Build a Network Path
								</h4>
								<p className="mb-4 text-gray-600 text-sm">
									Place ASNs and routers between "You" and
									"Friend" to create a network path. Then
									click "Run" to see how routers announce
									routes and find the best path.
								</p>
								<ASNRouterInteractive />
							</div>
						</div>
					</div>
				</section>

				{/* Encryption Section */}
				<section
					className="mb-16 scroll-mt-16"
					id="encryption"
				>
					<div className="bg-gradient-to-r from-teal-100 to-cyan-100 p-8 rounded-xl shadow-md">
						<h3 className="text-2xl font-bold mb-4 text-teal-600">
							Encryption
						</h3>
						<div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
							<div>
								<p className="mb-4 text-gray-700">
									Encryption is the process of converting
									information into a code to prevent
									unauthorized access. It's essential for
									securing data as it travels across the
									internet, protecting everything from your
									passwords to your credit card details.
								</p>
								<p className="mb-4 text-gray-700">
									How do you ensure that only your intended
									recipient can read your messages? In the
									mail system: You place your letter in a
									sealed envelope that only the recipient
									should open. If the envelope is already
									opened at the destination, you know that
									someone opened your mail before receiving
									it. On the internet: Encryption is a
									mathematical process that scrambles your
									data so that only authorized parties with
									the correct key can access it. This way,
									while everyone can send you messages
									securely, only you can access and understand
									them. Modern encryption uses complex
									mathematical algorithms that are practically
									impossible to break without the correct key.
									Imagine you have a special lockbox that
									anyone can use to send you letters. The
									lockbox has a slot that everyone can drop
									mail into—that’s like your public key. Even
									though anyone can send a letter, only you
									have the secret key to open the mailbox and
									read what’s inside—that’s your private key.
								</p>
								<p className="text-gray-700">
									HTTPS, the secure version of HTTP, uses
									encryption to protect data exchanged between
									your browser and websites. This is why you
									see a padlock icon in your browser's address
									bar when visiting secure websites.
								</p>
							</div>
							<div>
								<h4 className="text-lg font-semibold mb-3 text-teal-500">
									Try It: Public & Private Keys
								</h4>
								<p className="mb-4 text-gray-600 text-sm">
									See how public and private keys work
									together to encrypt and decrypt messages.
								</p>
								<EncryptionInteractive />
							</div>
						</div>
					</div>
				</section>
			</div>

			{!isLast && (
				<button
					onClick={onScrollNext}
					className="mt-8 mx-auto flex flex-col items-center text-orange-500 hover:text-orange-600 transition-colors"
					aria-label="Scroll to next section"
				>
					<span className="mb-2 font-medium">
						Continue to TikTok Data Flow
					</span>
					<ChevronDown className="animate-bounce" />
				</button>
			)}
		</div>
	);
}
