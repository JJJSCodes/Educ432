"use client";

import { useState, useEffect, useRef } from "react";
import {
	ChevronDown,
	Server,
	Globe,
	AlertTriangle,
	Check,
	RefreshCw,
	Sliders,
} from "lucide-react";

interface TrustChainProps {
	isLast?: boolean;
	onScrollNext: () => void;
}

export default function TrustChain({
	isLast = false,
	onScrollNext,
}: TrustChainProps) {
	const [activeTab, setActiveTab] = useState(0);
	const [showSimulation, setShowSimulation] = useState(false);

	return (
		<div className="min-h-screen w-full flex flex-col items-center justify-center p-6 relative bg-gradient-to-br from-teal-50 to-blue-50">
			<div className="max-w-4xl mx-auto w-full">
				<h2 className="text-3xl md:text-4xl font-bold mb-8 text-center text-teal-600">
					Domain Name System + IP Addresses: The Trust Chain
					Experiment
				</h2>

				<div className="bg-white p-8 rounded-xl shadow-md border border-teal-200 mb-8">
					<p className="text-lg mb-6 text-gray-700">
            Now, let's put our cybersecurity analyst hat on and poke around to uncover security vulnerabilities in the technology. To start, let's explore the Domain Name System (DNS) and IP addresses.
						IP addresses themselves are not harmful - they're simply
						numerical identifiers for servers on the internet, just
						as google.com translates to 142.250.188.14. But how does
						your phone know that tiktok.com corresponds to its
						correct IP address? The DNS system works on trust.
					</p>

					<div className="flex border-b border-gray-200 mb-6">
						<button
							className={`px-4 py-2 font-medium ${
								activeTab === 0
									? "text-teal-600 border-b-2 border-teal-600"
									: "text-gray-500 hover:text-teal-600"
							}`}
							onClick={() => setActiveTab(0)}
						>
							DNS Resolution
						</button>
						<button
							className={`px-4 py-2 font-medium ${
								activeTab === 1
									? "text-teal-600 border-b-2 border-teal-600"
									: "text-gray-500 hover:text-teal-600"
							}`}
							onClick={() => setActiveTab(1)}
						>
							Trust Vulnerability
						</button>
						<button
							className={`px-4 py-2 font-medium ${
								activeTab === 2
									? "text-teal-600 border-b-2 border-teal-600"
									: "text-gray-500 hover:text-teal-600"
							}`}
							onClick={() => {
								setActiveTab(2);
								setShowSimulation(true);
							}}
						>
							Interactive Simulation
						</button>
					</div>

					{activeTab === 0 && <DNSResolutionExplanation />}
					{activeTab === 1 && <TrustVulnerabilityExplanation />}
					{activeTab === 2 && (
						<DNSPoisoningSimulation show={showSimulation} />
					)}
				</div>
			</div>

			{!isLast && (
				<button
					onClick={onScrollNext}
					className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center text-teal-500 hover:text-teal-600 transition-colors"
					aria-label="Scroll to next section"
				>
					<span className="mb-2 font-medium">
						Continue to Conclusion
					</span>
					<ChevronDown className="animate-bounce" />
				</button>
			)}
		</div>
	);
}

function DNSResolutionExplanation() {
	return (
		<div>
			<h3 className="text-xl font-semibold mb-4 text-teal-600">
				How DNS Resolution Works
			</h3>

			<div className="relative w-full h-64 md:h-80 mb-6 bg-blue-50 rounded-lg p-4 overflow-hidden">
				<DNSResolutionVisual />
			</div>

			<p className="mb-4 text-gray-700">
				Your device trusts your ISP's DNS server, which trusts other DNS
				servers in a hierarchical chain:
			</p>

			<ol className="space-y-2 list-decimal list-inside mb-6">
				<li className="text-gray-700">
					<span className="font-medium text-teal-600">
						DNS Resolver:
					</span>{" "}
					Your ISP's server that handles your request
				</li>
				<li className="text-gray-700">
					<span className="font-medium text-teal-600">
						Root Nameservers:
					</span>{" "}
					Direct to the correct TLD servers
				</li>
				<li className="text-gray-700">
					<span className="font-medium text-teal-600">
						TLD Nameservers:
					</span>{" "}
					Handle domains like .com, .org, .net
				</li>
				<li className="text-gray-700">
					<span className="font-medium text-teal-600">
						Authoritative Nameservers:
					</span>{" "}
					Provide the actual IP address for the domain
				</li>
			</ol>

			<div className="bg-teal-50 p-4 rounded-lg">
				<h4 className="font-medium text-teal-600 mb-2">
					Did You Know?
				</h4>
				<p className="text-gray-700">
					Popular domains like tiktok.com are cached by DNS resolvers,
					making lookups faster. Each DNS request uses a unique
					request ID (0-65,535) and random port number (1023-65,535)
					to match responses to requests.
				</p>
			</div>
		</div>
	);
}

function TrustVulnerabilityExplanation() {
	return (
		<div>
			<h3 className="text-xl font-semibold mb-4 text-teal-600">
				The Vulnerability in Trust
			</h3>

			<div className="flex items-center mb-6 bg-yellow-50 p-4 rounded-lg border-l-4 border-yellow-400">
				<AlertTriangle className="text-yellow-500 mr-3 flex-shrink-0" />
				<p className="text-gray-700">
					The DNS system was designed for speed, not security. It uses
					UDP protocol which doesn't verify the authenticity of
					responses, creating a vulnerability called DNS cache
					poisoning.
				</p>
			</div>

			<p className="mb-4 text-gray-700">
				If an attacker can guess the correct request parameters (request
				ID and port number) and respond before the legitimate
				nameserver, they can inject a malicious IP address into the DNS
				resolver's cache. This malicious IP will be cached and served to
				users, misdirecting them to a website that may look similar but
				is controlled by the attacker which can lead to credential
				theft.
			</p>

			<div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
				<div className="bg-red-50 p-4 rounded-lg">
					<h4 className="font-medium text-red-600 mb-2">
						How Cache Poisoning Works
					</h4>
					<ol className="space-y-1 list-decimal list-inside text-sm">
						<li>Attacker triggers DNS lookup for target domain</li>
						<li>Attacker floods resolver with fake responses</li>
						<li>
							If request ID and port match, fake response is
							accepted
						</li>
						<li>Malicious IP is cached and served to all users</li>
						<li>
							Users are redirected to attacker-controlled servers
						</li>
					</ol>
				</div>

				<div className="bg-blue-50 p-4 rounded-lg">
					<h4 className="font-medium text-blue-600 mb-2">
						Real-World Implications
					</h4>
					<ul className="space-y-1 list-disc list-inside text-sm">
						<li>Nations using DNS poisoning for censorship</li>
						<li>ISPs use this technique injecting middleware to collect user data and display ads</li>
						<li>Attackers redirecting banking websites</li>
						<li>Data interception without user awareness</li>
					</ul>
				</div>
			</div>

			<div className="bg-green-50 p-4 rounded-lg">
				<h4 className="font-medium text-green-600 mb-2">
					The Solution: DNSSEC
				</h4>
				<p className="text-gray-700">
					DNSSEC (DNS Security Extensions) adds cryptographic
					signatures to verify DNS responses. However, adoption is
					still limited, leaving many DNS systems vulnerable.
				</p>
			</div>
		</div>
	);
}

function DNSResolutionVisual() {
	const [step, setStep] = useState(0);
	const maxSteps = 4;
	const intervalRef = useRef<NodeJS.Timeout | null>(null);

	useEffect(() => {
		intervalRef.current = setInterval(() => {
			setStep((prev) => (prev + 1) % maxSteps);
		}, 2000);

		return () => {
			if (intervalRef.current) clearInterval(intervalRef.current);
		};
	}, []);

	return (
		<div className="relative w-full h-full">
			{/* Your Device */}
			<div className="absolute left-[10%] top-[50%] transform -translate-y-1/2 flex flex-col items-center">
				<div className="w-12 h-20 bg-gray-800 rounded-lg border-2 border-gray-700 relative mb-1">
					<div className="absolute inset-2 bg-blue-400 rounded-md"></div>
				</div>
				<div className="text-xs font-medium">Your Device</div>
			</div>

			{/* DNS Resolver */}
			<div className="absolute left-[30%] top-[50%] transform -translate-y-1/2 flex flex-col items-center">
				<div className="w-16 h-16 bg-teal-100 border-2 border-teal-300 rounded-lg flex items-center justify-center mb-1">
					<Server className="w-8 h-8 text-teal-500" />
				</div>
				<div className="text-xs font-medium">DNS Resolver</div>
			</div>

			{/* Root Nameserver */}
			<div className="absolute left-[50%] top-[30%] transform -translate-x-1/2 flex flex-col items-center">
				<div className="w-16 h-16 bg-blue-100 border-2 border-blue-300 rounded-lg flex items-center justify-center mb-1">
					<Globe className="w-8 h-8 text-blue-500" />
				</div>
				<div className="text-xs font-medium">Root Nameserver</div>
			</div>

			{/* TLD Nameserver */}
			<div className="absolute left-[70%] top-[50%] transform -translate-y-1/2 flex flex-col items-center">
				<div className="w-16 h-16 bg-purple-100 border-2 border-purple-300 rounded-lg flex items-center justify-center mb-1">
					<Server className="w-8 h-8 text-purple-500" />
				</div>
				<div className="text-xs font-medium">TLD Nameserver</div>
			</div>

			{/* Authoritative Nameserver */}
			<div className="absolute left-[90%] top-[70%] transform -translate-x-1/2 flex flex-col items-center">
				<div className="w-16 h-16 bg-orange-100 border-2 border-orange-300 rounded-lg flex items-center justify-center mb-1">
					<Server className="w-8 h-8 text-orange-500" />
				</div>
				<div className="text-xs font-medium">Auth. Nameserver</div>
			</div>

			{/* Connection lines */}
			<svg className="absolute inset-0 w-full h-full pointer-events-none">
				<line
					x1="15%"
					y1="50%"
					x2="25%"
					y2="50%"
					stroke={step >= 0 ? "#0d9488" : "#e5e7eb"}
					strokeWidth="2"
					strokeDasharray={step === 0 ? "5,5" : "0"}
				/>
				<line
					x1="35%"
					y1="50%"
					x2="45%"
					y2="35%"
					stroke={step >= 1 ? "#3b82f6" : "#e5e7eb"}
					strokeWidth="2"
					strokeDasharray={step === 1 ? "5,5" : "0"}
				/>
				<line
					x1="55%"
					y1="30%"
					x2="65%"
					y2="45%"
					stroke={step >= 2 ? "#8b5cf6" : "#e5e7eb"}
					strokeWidth="2"
					strokeDasharray={step === 2 ? "5,5" : "0"}
				/>
				<line
					x1="75%"
					y1="50%"
					x2="85%"
					y2="65%"
					stroke={step >= 3 ? "#f97316" : "#e5e7eb"}
					strokeWidth="2"
					strokeDasharray={step === 3 ? "5,5" : "0"}
				/>
			</svg>

			{/* Query text */}
			<div className="absolute left-0 bottom-4 right-0 text-center">
				<div className="inline-block bg-white/80 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium">
					{step === 0 && "Where is tiktok.com?"}
					{step === 1 && "Ask the Root Nameserver"}
					{step === 2 && "Ask the .com TLD Nameserver"}
					{step === 3 && "Ask TikTok's Authoritative Nameserver"}
				</div>
			</div>
		</div>
	);
}

interface DNSPoisoningSimulationProps {
	show: boolean;
}

function DNSPoisoningSimulation({ show }: DNSPoisoningSimulationProps) {
	const [mode, setMode] = useState<"observe" | "attack">("observe");
	const [requestId, setRequestId] = useState(32768); // Middle of range 0-65535
	const [minPort, setMinPort] = useState(0); // Default min port
	const [maxPort, setMaxPort] = useState(999999); // Default max port
	const [responseTime, setResponseTime] = useState(50); // 0-100 percentage
	const [nameserver, setNameserver] = useState("closest");
	const [useRandomization, setUseRandomization] = useState(true);
	const [useDNSSEC, setUseDNSSEC] = useState(false);

	const [isAttacking, setIsAttacking] = useState(false);
	const [hasAttacked, setHasAttacked] = useState(false);
	const [attackResult, setAttackResult] = useState<null | boolean>(null);
	const [targetDomain, setTargetDomain] = useState("tiktok.com");
	const [maliciousIP, setMaliciousIP] = useState("192.168.1.100");
	const [initialID, setInitialID] = useState(0);

	// For observation mode
	const [observationCount, setObservationCount] = useState(0);
	const [observedRequests, setObservedRequests] = useState<
		Array<{ id: number; port: number }>
	>([]);

	// For attack visualization
	const [currentAttempt, setCurrentAttempt] = useState<{
		id: number;
		port: number;
	} | null>(null);
	const [attemptCount, setAttemptCount] = useState(0);
	const [maxAttempts, setMaxAttempts] = useState(0);
	const [actualRequest, setActualRequest] = useState<{
		id: number;
		port: number;
	} | null>(null);
	const [timeoutMessage, setTimeoutMessage] = useState<string>("");

	const resetSimulation = () => {
		setIsAttacking(false);
		setAttackResult(null);
		setTimeoutMessage("");
		// NOTE: currentAttempt is intentionally not cleared here
		setAttemptCount(0);
		setMaxAttempts(0);
		setActualRequest(null);
	};

	const observeRequests = () => {
		// Generate a new observed request with incremental ID and random port
		const lastId =
			observedRequests.length > 0
				? observedRequests[observedRequests.length - 1].id
				: Math.floor(Math.random() * 60000);

		const newId = (lastId + 1) % 65536; // Wrap around at 65536
		const newPort = Math.floor(Math.random() * (65535 - 1023) + 1023);

		// Hardcoded nameserver for the .com TLD nameserver
		const newRequest = {
			id: newId,
			port: newPort,
			nameserver: ".com TLD Nameserver",
		};
		setObservedRequests((prev) => [...prev, newRequest]);
		setObservationCount((prev) => prev + 1);
	};

	const launchAttack = () => {
		if (maxPort - minPort > 65000) {
			resetSimulation();
			setTimeoutMessage(
				"Attack failed: attack range too large. Try reducing port range."
			);
			setAttackResult(false);
			return;
		}
		setTimeoutMessage("");
		setIsAttacking(true);
		setAttackResult(null);
		setAttemptCount(0);

		let actualId = initialID + 1;

		if (initialID == 0) {
			let randomValue = Math.floor(Math.random() * 65536);
			setInitialID(randomValue);
			actualId = randomValue;
		} else {
			setInitialID((initialID) => initialID + 1);
		}
		const actualPort = Math.floor(Math.random() * (65535 - 1023) + 1023);
		setActualRequest({ id: actualId, port: actualPort });

		// Calculate how many attempts we'll simulate
		const portRange = maxPort - minPort;
		const attemptRange = Math.floor(portRange / 25); // Limit to 100 visual attempts for performance
		setMaxAttempts(attemptRange);

		// Start the attack simulation
		simulateAttackStep(0, attemptRange, actualId, actualPort);
	};

	const simulateAttackStep = (
		step: number,
		totalSteps: number,
		actualId: number,
		actualPort: number
	) => {
		if (step >= totalSteps) {
			// Attack finished, determine result
			finishAttack(actualId, actualPort);
			return;
		}

		// Calculate the current attempt parameters
		const attemptId = requestId;
		const portStep = Math.floor((maxPort - minPort) / totalSteps);
		const attemptPort = minPort + step * portStep;

		setCurrentAttempt({ id: attemptId, port: attemptPort });
		setAttemptCount(step + 1);

		// Determine how long to wait before next attempt (faster if response time is lower)
		const stepDelay = 2000 / totalSteps;
		const adjustedDelay = stepDelay * (responseTime / 50);

		// Schedule next step
		setTimeout(() => {
			simulateAttackStep(step + 1, totalSteps, actualId, actualPort);
		}, adjustedDelay);
	};

	const finishAttack = (actualId: number, actualPort: number) => {
		// Determine if attack was successful based on parameters
		let successProbability = 0;

		// If DNSSEC is enabled, attack is much less likely to succeed
		if (useDNSSEC) {
			successProbability = 0.05; // 5% chance
		} else {
			// Base probability affected by response time (faster = better chance)
			successProbability = (100 - responseTime) / 100;

			// If randomization is disabled, much easier to guess
			if (!useRandomization) {
				successProbability += 0.4;
			}

			// If our attack range includes the actual port, higher chance
			if (minPort <= actualPort && maxPort >= actualPort) {
				successProbability += 0.3;
			} else {
				successProbability = 0;
			}

			// If we guessed the right ID, higher chance
			if (requestId < actualId) {
				successProbability += 0.2;
			}
		}

		// Random outcome based on probability
		const success = Math.random() < successProbability;
		if (success) {
			setHasAttacked(true);
		}
		setAttackResult(success);
		setIsAttacking(false);
	};

	const switchToAttackMode = () => {
		setMode("attack");
		resetSimulation();
	};

	if (!show) return null;

	return (
		<div>
			<h3 className="text-xl font-semibold mb-4 text-teal-600">
				DNS Cache Poisoning Simulation
			</h3>

			<div className="mb-6 flex justify-center">
				<div
					className="inline-flex rounded-md shadow-sm"
					role="group"
				>
					<button
						type="button"
						className={`px-4 py-2 text-sm font-medium rounded-l-lg ${
							mode === "observe"
								? "bg-teal-600 text-white"
								: "bg-white text-gray-700 hover:bg-gray-100"
						} border border-gray-200`}
						onClick={() => setMode("observe")}
					>
						Observe DNS Requests
					</button>
					<button
						type="button"
						className={`px-4 py-2 text-sm font-medium rounded-r-lg ${
							mode === "attack"
								? "bg-red-600 text-white"
								: "bg-white text-gray-700 hover:bg-gray-100"
						} border border-gray-200`}
						onClick={switchToAttackMode}
					>
						Launch Attack
					</button>
				</div>
			</div>

			{mode === "observe" ? (
				<div className="bg-white border border-gray-200 rounded-lg p-6">
					<h4 className="font-medium text-gray-700 mb-4">
						Observe DNS Request Patterns
					</h4>

					<p className="text-gray-600 mb-4">
						Click the button below multiple times to observe how DNS
						requests are formatted. Try to identify patterns in the
						request IDs and port numbers.
					</p>

					<div className="flex justify-center mb-6">
						<button
							onClick={observeRequests}
							className="px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700"
						>
							Generate DNS Request
						</button>
					</div>

					{observedRequests.length > 0 && (
						<div className="mb-6">
							<h5 className="font-medium text-gray-700 mb-2">
								Observed Requests:
							</h5>
							<div className="bg-gray-50 p-4 rounded-lg max-h-60 overflow-y-auto">
								<table className="w-full text-sm">
									<thead>
										<tr className="border-b border-gray-200">
											<th className="text-left py-2">
												#
											</th>
											<th className="text-left py-2">
												Request ID
											</th>
											<th className="text-left py-2">
												Port Number
											</th>
											<th className="text-left py-2">
												Notes
											</th>
											<th className="text-left py-2">
												Nameserver
											</th>
										</tr>
									</thead>
									<tbody>
										{observedRequests.map((req, index) => (
											<tr
												key={index}
												className="border-b border-gray-100"
											>
												<td className="py-2">
													{index + 1}
												</td>
												<td className="py-2 font-mono">
													{req.id}
												</td>
												<td className="py-2 font-mono">
													{req.port}
												</td>
												<td className="py-2 text-xs text-gray-500">
													{index > 0 &&
														req.id ===
															(observedRequests[
																index - 1
															].id +
																1) %
																65536 &&
														"ID incremented by 1"}
													{index > 0 &&
														req.id !==
															(observedRequests[
																index - 1
															].id +
																1) %
																65536 &&
														"ID pattern changed"}
												</td>
												<td className="py-2 text-xs text-gray-500">
													{req.nameserver}
												</td>
											</tr>
										))}
									</tbody>
								</table>
							</div>

							{observedRequests.length >= 3 && (
								<div className="mt-4 bg-yellow-50 p-3 rounded-lg border border-yellow-200">
									<h5 className="font-medium text-yellow-700 mb-1">
										Observations:
									</h5>
									<ul className="list-disc list-inside text-sm text-gray-700">
										<li>
											Request IDs appear to increment by 1
											with each request
										</li>
										<li>
											Port numbers seem to be randomly
											assigned but fall between a set
											range...
										</li>
										<li>
											For success in DNS cache poisoning,
											the nameserver must be known
											beforehand
										</li>
										<li>
											To successfully poison the cache,
											you need to guess both correctly
											before the legitimate response
											arrives
										</li>
									</ul>
								</div>
							)}

							{observedRequests.length >= 5 && (
								<div className="mt-4 flex justify-center">
									<button
										onClick={switchToAttackMode}
										className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
									>
										Ready to Attack
									</button>
								</div>
							)}
						</div>
					)}
				</div>
			) : (
				<div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
					<div className="bg-white border border-gray-200 rounded-lg p-4">
						<h4 className="font-medium text-gray-700 mb-3 flex items-center">
							<Sliders className="w-4 h-4 mr-2" />
							Attack Parameters
						</h4>

						<div className="space-y-4">
							<div>
								<label className="block text-sm font-medium text-gray-600 mb-1">
									Target Domain
								</label>
								<input
									type="text"
									value={targetDomain}
									onChange={(e) =>
										setTargetDomain(e.target.value)
									}
									className="w-full px-3 py-2 border border-gray-300 rounded-md"
									disabled={isAttacking}
								/>
							</div>

							<div>
								<label className="block text-sm font-medium text-gray-600 mb-1">
									Malicious IP Address
								</label>
								<input
									type="text"
									value={maliciousIP}
									onChange={(e) =>
										setMaliciousIP(e.target.value)
									}
									className="w-full px-3 py-2 border border-gray-300 rounded-md"
									disabled={isAttacking}
								/>
							</div>

							<div>
								<label className="block text-sm font-medium text-gray-600 mb-1">
									Starting request ID: {requestId}
								</label>
								<input
									type="range"
									min="0"
									max="65535"
									value={requestId}
									onChange={(e) =>
										setRequestId(
											Number.parseInt(e.target.value)
										)
									}
									className="w-full"
									disabled={isAttacking}
								/>
								<div className="flex justify-between text-xs text-gray-500">
									<span>0</span>
									<span>65535</span>
								</div>
							</div>

							<div>
								<label className="block text-sm font-medium text-gray-600 mb-1">
									Port Range: {minPort} - {maxPort}
								</label>
								<div className="flex items-center space-x-2">
									<input
										type="number"
										min="0"
										max="999999"
										value={minPort}
										onChange={(e) =>
											setMinPort(
												Number.parseInt(e.target.value)
											)
										}
										className="w-1/2 px-3 py-2 border border-gray-300 rounded-md"
										disabled={isAttacking}
									/>
									<span>to</span>
									<input
										type="number"
										min="0"
										max="999999"
										value={maxPort}
										onChange={(e) =>
											setMaxPort(
												Number.parseInt(e.target.value)
											)
										}
										className="w-1/2 px-3 py-2 border border-gray-300 rounded-md"
										disabled={isAttacking}
									/>
								</div>
							</div>

							<div>
								<label className="block text-sm font-medium text-gray-600 mb-1">
									Attack response Time: {responseTime}% (of
									legitimate server)
								</label>
								<input
									type="range"
									min="10"
									max="100"
									value={responseTime}
									onChange={(e) =>
										setResponseTime(
											Number.parseInt(e.target.value)
										)
									}
									className="w-full"
									disabled={isAttacking}
								/>
								<div className="flex justify-between text-xs text-gray-500">
									<span>Faster</span>
									<span>Slower</span>
								</div>
							</div>
						</div>
					</div>

					<div className="bg-white border border-gray-200 rounded-lg p-4">
						<h4 className="font-medium text-gray-700 mb-3">
							DNS Server Configuration
						</h4>

						<div className="space-y-4">
							<div>
								<label className="block text-sm font-medium text-gray-600 mb-1">
									Nameserver Selection
								</label>
								<select
									value={nameserver}
									onChange={(e) =>
										setNameserver(e.target.value)
									}
									className="w-full px-3 py-2 border border-gray-300 rounded-md"
									disabled={isAttacking}
								>
									<option value="closest">
										Closest Geographic Location
									</option>
									<option value="random">
										Random Selection
									</option>
									<option value="fixed">
										Fixed Primary Server
									</option>
								</select>
							</div>

							<div className="flex items-center">
								<input
									type="checkbox"
									id="useRandomization"
									checked={useRandomization}
									onChange={(e) =>
										setUseRandomization(e.target.checked)
									}
									className="h-4 w-4 text-teal-600 rounded"
									disabled={isAttacking}
								/>
								<label
									htmlFor="useRandomization"
									className="ml-2 text-sm text-gray-700"
								>
									Use Port Randomization
								</label>
							</div>

							<div className="flex items-center">
								<input
									type="checkbox"
									id="useDNSSEC"
									checked={useDNSSEC}
									onChange={(e) =>
										setUseDNSSEC(e.target.checked)
									}
									className="h-4 w-4 text-teal-600 rounded"
									disabled={isAttacking}
								/>
								<label
									htmlFor="useDNSSEC"
									className="ml-2 text-sm text-gray-700"
								>
									Enable DNSSEC
								</label>
							</div>

							<div className="pt-4">
								<div className="relative w-full h-32 bg-gray-100 rounded-lg overflow-hidden">
									<DNSAttackVisualDetailed
										isAttacking={isAttacking}
										attackResult={attackResult}
										currentAttempt={currentAttempt}
										attemptCount={attemptCount}
										maxAttempts={maxAttempts}
										actualRequest={actualRequest}
									/>
								</div>
							</div>

							<div className="flex justify-center space-x-4">
								<button
									onClick={launchAttack}
									disabled={isAttacking}
									className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 disabled:bg-gray-300 disabled:text-gray-500"
								>
									{isAttacking
										? "Attacking..."
										: "Launch Attack"}
								</button>

								<button
									onClick={resetSimulation}
									className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 disabled:bg-gray-300 disabled:text-gray-500"
								>
									<RefreshCw className="w-4 h-4 inline mr-1" />
									Reset
								</button>
							</div>
						</div>
					</div>
				</div>
			)}
			{attackResult !== null && (
				<div
					className={`p-4 rounded-lg ${
						attackResult
							? "bg-red-50 border border-red-200"
							: "bg-green-50 border border-green-200"
					}`}
				>
					<h4
						className={`font-medium mb-2 flex items-center ${
							attackResult ? "text-red-600" : "text-green-600"
						}`}
					>
						{attackResult ? (
							<>
								<AlertTriangle className="w-5 h-5 mr-2" />
								Attack Successful!
							</>
						) : (
							<>
								<Check className="w-5 h-5 mr-2" />
								Attack Failed
							</>
						)}
					</h4>
					{timeoutMessage ? (
						<div>
							<p className="mb-2">{timeoutMessage}</p>
						</div>
					) : attackResult ? (
						<div>
							<p className="mb-2">
								Your attack successfully poisoned the DNS cache!
								Now when users try to visit {targetDomain}, they
								will be redirected to your malicious server at{" "}
								{maliciousIP}.
							</p>
							<p className="text-sm text-gray-600">
								This attack worked because{" "}
								{!useDNSSEC && "DNSSEC was disabled"}
								{!useDNSSEC &&
									!useRandomization &&
									" and port randomization was disabled"}
								{(useDNSSEC || useRandomization) &&
									" and you got lucky with your timing"}
								.
							</p>
							{actualRequest && (
								<p className="mt-2 text-sm font-mono bg-red-100 p-2 rounded">
									Actual DNS request had ID:{" "}
									{actualRequest.id} and Port:{" "}
									{actualRequest.port}
								</p>
							)}
						</div>
					) : (
						<div>
							<p className="mb-2">
								Your attack failed to poison the DNS cache.
								Users will continue to receive the legitimate IP
								address for {targetDomain}.
							</p>
							<p className="text-sm text-gray-600">
								This attack failed because{" "}
								{useDNSSEC && "DNSSEC was enabled"}
								{useDNSSEC && useRandomization && " and "}
								{useRandomization &&
									"port randomization made it difficult to guess the correct parameters"}
								{!useDNSSEC &&
									!useRandomization &&
									"your timing was off"}
								{nameserver === "random" &&
									" and the nameserver could not be guessed due to random selection."}
							</p>
							{actualRequest && (
								<p className="mt-2 text-sm font-mono bg-green-100 p-2 rounded">
									Actual DNS request had ID:{" "}
									{actualRequest.id} and Port:{" "}
									{actualRequest.port}
								</p>
							)}
						</div>
					)}
				</div>
			)}
			{hasAttacked && (
				<div className="mt-6 bg-blue-50 p-4 rounded-lg">
					<h4 className="font-medium text-blue-600 mb-2">
						Learnings
					</h4>
					<p className="text-gray-700 mb-2">
						DNS cache poisoning is based on luck and timing. Some techniques that help reduce poisoning include:
					</p>
					<ul className="list-disc list-inside text-gray-700 space-y-1">
						<li>Non-predictable nameserver selection (Randomized > Closest or Fixed)</li>
						<li>Randomized ports</li>
						<li>Use of DNSSEC</li>
					</ul>
					<p className="mt-2 text-gray-700">
						The best protection is using DNS services with DNSSEC
						enabled and keeping your devices updated.
					</p>
				</div>
			)}
		</div>
	);
}

// Add this new detailed visualization component
function DNSAttackVisualDetailed({
	isAttacking,
	attackResult,
	currentAttempt,
	attemptCount,
	maxAttempts,
	actualRequest,
}: {
	isAttacking: boolean;
	attackResult: boolean | null;
	currentAttempt: { id: number; port: number } | null;
	attemptCount: number;
	maxAttempts: number;
	actualRequest: { id: number; port: number } | null;
}) {
	return (
		<div className="relative w-full h-full">
			{/* Legitimate Server */}
			<div className="absolute right-4 top-4">
				<div className="flex flex-col items-center">
					<div className="w-10 h-10 bg-blue-100 border border-blue-300 rounded-lg flex items-center justify-center">
						<Server className="w-6 h-6 text-blue-500" />
					</div>
					<div className="text-[10px] mt-1">Legitimate Server</div>
				</div>
			</div>

			{/* Attacker */}
			<div className="absolute left-4 bottom-4">
				<div className="flex flex-col items-center">
					<div className="w-10 h-10 bg-red-100 border border-red-300 rounded-lg flex items-center justify-center">
						<AlertTriangle className="w-6 h-6 text-red-500" />
					</div>
					<div className="text-[10px] mt-1">Attacker</div>
				</div>
			</div>

			{/* DNS Resolver */}
			<div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
				<div className="flex flex-col items-center">
					<div className="w-12 h-12 bg-teal-100 border-2 border-teal-300 rounded-lg flex items-center justify-center">
						<Server className="w-8 h-8 text-teal-500" />
					</div>
					<div className="text-[10px] mt-1">DNS Resolver</div>
				</div>
			</div>

			{/* Attack animation */}
			{isAttacking && (
				<>
					{/* Legitimate response - only show at the end */}
					{attemptCount > maxAttempts * 0.8 && (
						<div
							className="absolute right-4 top-4 w-3 h-3 bg-blue-500 rounded-full"
							style={{
								animation: `moveToCenter 2s linear forwards`,
							}}
						/>
					)}

					{/* Attacker response */}
					<div
						className="absolute left-4 bottom-4 w-3 h-3 bg-red-500 rounded-full"
						style={{
							animation: `moveToCenter 0.5s linear forwards`,
						}}
					/>

					{/* Current attempt info */}
					{currentAttempt && (
						<div className="absolute left-1/2 bottom-2 transform -translate-x-1/2 bg-white/90 px-2 py-1 rounded text-xs font-mono">
							Attempt {attemptCount}/{maxAttempts}: ID=
							{currentAttempt.id}, Port={currentAttempt.port}
						</div>
					)}
				</>
			)}

			{/* Result indicator */}
			{attackResult !== null && (
				<div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 mt-8">
					<div
						className={`text-xs font-medium ${
							attackResult ? "text-red-600" : "text-green-600"
						}`}
					>
						{attackResult ? "Cache Poisoned!" : "Attack Failed"}
					</div>
				</div>
			)}

			{/* Show actual request when attack is complete */}
			{!isAttacking && actualRequest && (
				<div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 mt-[-30px] bg-white/90 px-2 py-1 rounded text-xs font-mono">
					Actual Request: ID={actualRequest.id}, Port=
					{actualRequest.port}
				</div>
			)}

			<style jsx>{`
				@keyframes moveToCenter {
					0% {
						transform: translate(0, 0);
					}
					100% {
						transform: translate(
							calc(50vw - 50% - 4px),
							calc(50% - 50%)
						);
					}
				}
			`}</style>
		</div>
	);
}
