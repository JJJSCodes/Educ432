"use client";

import { useState, useRef, useEffect } from "react";
import {
	ChevronDown,
	Play,
	Pause,
	RefreshCw,
	ChevronLeft,
	ChevronRight,
} from "lucide-react";

interface TiktokDataFlowProps {
	isLast?: boolean;
	onScrollNext: () => void;
}

export default function TiktokDataFlow({
	isLast = false,
	onScrollNext,
}: TiktokDataFlowProps) {
	const [isPlaying, setIsPlaying] = useState(false);
	const [currentStep, setCurrentStep] = useState(0);
	const animationRef = useRef<number | null>(null);
	const lastUpdateTimeRef = useRef<number>(0);

	const totalSteps = 10; // Total number of animation steps

	// Animation timing control
	useEffect(() => {
		if (isPlaying) {
			let lastTimestamp = 0;

			const animate = (timestamp: number) => {
				if (!lastTimestamp) lastTimestamp = timestamp;

				const elapsed = timestamp - lastTimestamp;

				// Advance step every 2 seconds
				if (elapsed > 2000) {
					lastTimestamp = timestamp;

					setCurrentStep((prev) => {
						const nextStep = prev + 1;
						if (nextStep >= totalSteps) {
							setIsPlaying(false);
							return totalSteps - 1;
						}
						return nextStep;
					});
				}

				animationRef.current = requestAnimationFrame(animate);
			};

			animationRef.current = requestAnimationFrame(animate);
		} else if (animationRef.current) {
			cancelAnimationFrame(animationRef.current);
		}

		return () => {
			if (animationRef.current) {
				cancelAnimationFrame(animationRef.current);
			}
		};
	}, [isPlaying, totalSteps]);

	const togglePlayPause = () => {
		setIsPlaying(!isPlaying);
	};

	const resetAnimation = () => {
		setCurrentStep(0);
		setIsPlaying(false);
	};

	const goToNextStep = () => {
		if (currentStep < totalSteps - 1) {
			setCurrentStep(currentStep + 1);
		}
	};

	const goToPreviousStep = () => {
		if (currentStep > 0) {
			setCurrentStep(currentStep - 1);
		}
	};

	return (
		<div className="min-h-screen w-full flex flex-col items-center justify-center p-6 relative bg-gradient-to-br from-pink-50 to-purple-50">
			<div className="max-w-4xl mx-auto w-full">
				<h2 className="text-3xl md:text-4xl font-bold mb-8 text-center text-pink-600">
					TikTok Data Flow
				</h2>

				<div className="bg-white p-6 rounded-xl shadow-md border border-pink-200 mb-8">
					<p className="text-lg mb-6 text-gray-700">
						When you post a video to TikTok, a complex series of
						data exchanges takes place. Watch the animation below to
						see how your data travels through the internet
						infrastructure.
					</p>

					<div className="relative w-full h-[400px] md:h-[500px] bg-gray-50 rounded-lg border border-gray-200 mb-4 overflow-hidden">
						<TikTokAnimation currentStep={currentStep} />

						<div className="absolute bottom-4 left-0 right-0 flex justify-center">
							<div className="flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-md">
								<button
									onClick={goToPreviousStep}
									disabled={currentStep === 0}
									className="flex items-center justify-center w-8 h-8 rounded-full bg-purple-100 text-purple-600 hover:bg-purple-200 disabled:opacity-50 disabled:cursor-not-allowed"
								>
									<ChevronLeft size={18} />
								</button>

								<button
									onClick={togglePlayPause}
									className="flex items-center gap-1 px-3 py-1 bg-purple-600 text-white rounded-md hover:bg-purple-700"
								>
									{isPlaying ? (
										<Pause size={18} />
									) : (
										<Play size={18} />
									)}
									<span>{isPlaying ? "Pause" : "Play"}</span>
								</button>

								<button
									onClick={goToNextStep}
									disabled={currentStep === totalSteps - 1}
									className="flex items-center justify-center w-8 h-8 rounded-full bg-purple-100 text-purple-600 hover:bg-purple-200 disabled:opacity-50 disabled:cursor-not-allowed"
								>
									<ChevronRight size={18} />
								</button>

								<div className="text-sm text-gray-500 ml-2">
									Step {currentStep + 1} of {totalSteps}
								</div>

								<button
									onClick={resetAnimation}
									className="ml-2 flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200"
								>
									<RefreshCw size={16} />
								</button>
							</div>
						</div>
					</div>

					<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
						<div className="bg-pink-50 p-6 rounded-lg">
							<h3 className="text-xl font-semibold mb-3 text-pink-600">
								Key Elements
							</h3>
							<ul className="space-y-2 list-disc list-inside">
								<li>
									DNS resolution converts tiktok.com to IP
									addresses
								</li>
								<li>
									Data travels through multiple ASNs and
									routers
								</li>
								<li>
									Routers announce the best paths to reach
									destinations
								</li>
								<li>
									HTTPS encrypts all data with public/private
									keys
								</li>
							</ul>
						</div>

						<div className="bg-purple-50 p-6 rounded-lg">
							<h3 className="text-xl font-semibold mb-3 text-purple-600">
								Did You Know?
							</h3>
							<p className="text-gray-700">
								A single TikTok post can travel through dozens
								of different networks and routers, crossing
								thousands of miles in fractions of a second. The
								complex routing systems ensure your content
								reaches TikTok's servers efficiently, and then
								gets distributed to viewers around the world.
							</p>
						</div>
					</div>
				</div>
			</div>

			{!isLast && (
				<button
					onClick={onScrollNext}
					className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center text-pink-500 hover:text-pink-600 transition-colors"
					aria-label="Scroll to next section"
				>
					<span className="mb-2 font-medium">
						Explore the Trust Chain
					</span>
					<ChevronDown className="animate-bounce" />
				</button>
			)}
		</div>
	);
}

interface AnimationProps {
	currentStep: number;
}

function TikTokAnimation({ currentStep }: AnimationProps) {
	return (
		<div className="relative w-full h-full">
			{/* Background grid */}
			<div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAwIDEwIEwgNDAgMTAgTSAxMCAwIEwgMTAgNDAgTSAwIDIwIEwgNDAgMjAgTSAyMCAwIEwgMjAgNDAgTSAwIDMwIEwgNDAgMzAgTSAzMCAwIEwgMzAgNDAiIGZpbGw9Im5vbmUiIHN0cm9rZT0iI2UyZThmMCIgb3BhY2l0eT0iMC40IiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-50"></div>

			{/* User Device */}
			<div
				className={`absolute left-[8%] top-[40%] transition-all duration-500 ${
					currentStep >= 0 ? "opacity-100" : "opacity-0"
				}`}
			>
				<div className="flex flex-col items-center">
					<div className="w-16 h-28 bg-gray-800 rounded-xl border-4 border-gray-700 relative mb-2">
						<div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-8 h-1 bg-gray-600 rounded-full"></div>
						<div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-6 h-6 rounded-full border-2 border-gray-600"></div>
						<div
							className={`absolute inset-4 bg-gradient-to-br from-pink-400 to-purple-500 rounded-md flex items-center justify-center ${
								currentStep === 0 ? "animate-pulse" : ""
							}`}
						>
							{/* TikTok logo */}
							<svg
								className="w-6 h-6 text-white"
								fill="currentColor"
								viewBox="0 0 24 24"
							>
								<path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 005 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1-.1z" />
							</svg>
						</div>
					</div>
					<div className="text-center text-sm font-medium">
						Your Device
					</div>

					{currentStep === 0 && (
						<div className="mt-2 bg-pink-100 text-pink-800 px-3 py-1 rounded-full text-xs animate-bounce">
							Creating TikTok post
						</div>
					)}
				</div>
			</div>

			{/* ISP Building (ASN 1) - Your ISP */}
			<div
				className={`absolute left-[21%] top-[25%] transition-all duration-500 ${
					currentStep >= 1 ? "opacity-100" : "opacity-0"
				}`}
			>
				<div className="flex flex-col items-center">
					<div className="w-24 h-20 bg-red-100 border-2 border-red-300 rounded-t-lg relative">
						<div className="absolute top-1 left-1 text-xs font-bold bg-red-200 px-1 rounded">
							ASN 1
						</div>
						<div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-8 h-10 bg-red-200 border-t-2 border-l-2 border-r-2 border-red-300 rounded-t-md"></div>
						<div className="absolute top-3 left-3 w-4 h-4 bg-blue-100 border border-blue-300 rounded-sm"></div>
						<div className="absolute top-3 right-3 w-4 h-4 bg-blue-100 border border-blue-300 rounded-sm"></div>
					</div>
					<div className="text-center text-xs font-medium mt-1">
						Your ISP
					</div>

					{currentStep === 1 && (
						<div className="mt-1 bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs animate-bounce">
							Routing request
						</div>
					)}
				</div>
			</div>

			{/* Router 1 */}
			<div
				className={`absolute left-[34%] top-[26%] transition-all duration-500 ${
					currentStep >= 5 ? "opacity-100" : "opacity-0"
				}`}
			>
				<div className="flex flex-col items-center">
					<div className="w-10 h-16 bg-gray-300 border-2 border-gray-400 rounded-md relative">
						<div className="absolute top-1 left-1/2 transform -translate-x-1/2 w-6 h-2 bg-gray-400 rounded"></div>
						<div className="absolute top-4 left-1/2 transform -translate-x-1/2 w-4 h-4 rounded-full bg-gray-200 border border-gray-400 flex items-center justify-center">
							<div
								className={`w-2 h-2 rounded-full ${
									currentStep === 5
										? "bg-green-500 animate-ping"
										: "bg-gray-400"
								}`}
							></div>
						</div>
					</div>
					<div className="text-center text-xs font-medium mt-1">
						Router
					</div>

					{currentStep === 5 && (
						<div className="mt-1 bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs animate-bounce">
							Routing data
						</div>
					)}
				</div>
			</div>

			{/* ISP Building (ASN 3) - Transit ISP */}
			<div
				className={`absolute left-[47%] top-[25%] transition-all duration-500 ${
					currentStep >= 6 ? "opacity-100" : "opacity-0"
				}`}
			>
				<div className="flex flex-col items-center">
					<div className="w-24 h-20 bg-red-100 border-2 border-red-300 rounded-t-lg relative">
						<div className="absolute top-1 left-1 text-xs font-bold bg-red-200 px-1 rounded">
							ASN 3
						</div>
						<div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-8 h-10 bg-red-200 border-t-2 border-l-2 border-r-2 border-red-300 rounded-t-md"></div>
						<div className="absolute top-3 left-3 w-4 h-4 bg-blue-100 border border-blue-300 rounded-sm"></div>
						<div className="absolute top-3 right-3 w-4 h-4 bg-blue-100 border border-blue-300 rounded-sm"></div>
					</div>
					<div className="text-center text-xs font-medium mt-1">
						Transit ISP
					</div>

					{currentStep === 6 && (
						<div className="mt-1 bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs animate-bounce">
							Forwarding data
						</div>
					)}
				</div>
			</div>

			{/* Router 2 - Fixed alignment */}
			<div
				className={`absolute left-[63%] top-[26%] transition-all duration-500 ${
					currentStep >= 7 ? "opacity-100" : "opacity-0"
				}`}
			>
				<div className="flex flex-col items-center">
					<div className="w-10 h-16 bg-gray-300 border-2 border-gray-400 rounded-md relative">
						<div className="absolute top-1 left-1/2 transform -translate-x-1/2 w-6 h-2 bg-gray-400 rounded"></div>
						<div className="absolute top-4 left-1/2 transform -translate-x-1/2 w-4 h-4 rounded-full bg-gray-200 border border-gray-400 flex items-center justify-center">
							<div
								className={`w-2 h-2 rounded-full ${
									currentStep === 7
										? "bg-green-500 animate-ping"
										: "bg-gray-400"
								}`}
							></div>
						</div>
					</div>
					<div className="text-center text-xs font-medium mt-1">
						Router
					</div>

					{currentStep === 7 && (
						<div className="mt-1 bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs animate-bounce">
							Final hop
						</div>
					)}
				</div>
			</div>

			{/* New ISP Building (ASN 10) - TikTok's ISP */}
			<div
				className={`absolute left-[70%] top-[25%] transition-all duration-500 ${
					currentStep >= 8 ? "opacity-100" : "opacity-0"
				}`}
			>
				<div className="flex flex-col items-center">
					<div className="w-24 h-20 bg-red-100 border-2 border-red-300 rounded-t-lg relative">
						<div className="absolute top-1 left-1 text-xs font-bold bg-red-200 px-1 rounded">
							ASN 10
						</div>
						<div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-8 h-10 bg-red-200 border-t-2 border-l-2 border-r-2 border-red-300 rounded-t-md"></div>
						<div className="absolute top-3 left-3 w-4 h-4 bg-blue-100 border border-blue-300 rounded-sm"></div>
						<div className="absolute top-3 right-3 w-4 h-4 bg-blue-100 border border-blue-300 rounded-sm"></div>
					</div>
					<div className="text-center text-xs font-medium mt-1">
						TikTok's ISP
					</div>

					{currentStep === 8 && (
						<div className="mt-1 bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs animate-bounce">
							Connecting to CDN
						</div>
					)}
				</div>
			</div>

			{/* TikTok Servers - Repositioned */}
			<div
				className={`absolute right-[0] top-[25%] transition-all duration-500 ${
					currentStep >= 9 ? "opacity-100" : "opacity-0"
				}`}
			>
				<div className="flex flex-col items-center">
					<div className="flex flex-col space-y-1">
						<div className="w-24 h-6 bg-blue-200 border-2 border-blue-300 rounded flex items-center justify-center">
							<div className="text-[8px] font-bold">
								TikTok Server
							</div>
						</div>
						<div className="w-24 h-6 bg-blue-200 border-2 border-blue-300 rounded flex items-center justify-center">
							<div className="text-[8px] font-bold">
								TikTok Server
							</div>
						</div>
						<div className="w-24 h-6 bg-blue-200 border-2 border-blue-300 rounded flex items-center justify-center">
							<div className="text-[8px] font-bold">
								TikTok Server
							</div>
						</div>
					</div>
					<div className="text-center text-xs font-medium mt-1">
						TikTok CDN
					</div>

					{currentStep === 9 && (
						<div className="mt-1 bg-purple-100 text-purple-800 px-2 py-1 rounded-full text-xs animate-bounce">
							Decrypting & processing data
						</div>
					)}
				</div>
			</div>

			{/* DNS Resolution Section - Keep visible throughout */}
			<div
				className={`absolute left-[21%] bottom-[20%] transition-all duration-500 ${
					currentStep >= 2 ? "opacity-100" : "opacity-0"
				}`}
			>
				<div className="flex flex-col items-center">
					<div className="flex space-x-4">
						{/* DNS Resolver */}
						<div
							className={`flex flex-col items-center transition-all duration-300 ${
								currentStep === 2 ? "scale-110" : "scale-100"
							}`}
						>
							<div className="w-20 h-12 bg-blue-100 border-2 border-blue-300 rounded flex flex-col justify-center items-center">
								<div className="w-16 h-2 bg-blue-200 mb-1 rounded"></div>
								<div className="w-16 h-2 bg-blue-200 mb-1 rounded"></div>
								<div className="w-16 h-2 bg-blue-200 rounded"></div>
							</div>
							<div className="text-center text-[10px] font-medium mt-1">
								DNS Resolver
							</div>
						</div>

						{/* TLD Nameserver */}
						<div
							className={`flex flex-col items-center transition-all duration-300 ${
								currentStep === 3 ? "scale-110" : "scale-100"
							}`}
						>
							<div className="w-20 h-12 bg-blue-100 border-2 border-blue-300 rounded flex flex-col justify-center items-center">
								<div className="w-16 h-2 bg-blue-200 mb-1 rounded"></div>
								<div className="w-16 h-2 bg-blue-200 mb-1 rounded"></div>
								<div className="w-16 h-2 bg-blue-200 rounded"></div>
							</div>
							<div className="text-center text-[10px] font-medium mt-1">
								TLD Nameserver
							</div>
						</div>

						{/* .com Nameserver */}
						<div
							className={`flex flex-col items-center transition-all duration-300 ${
								currentStep === 3 ? "scale-110" : "scale-100"
							}`}
						>
							<div className="w-20 h-12 bg-blue-100 border-2 border-blue-300 rounded flex flex-col justify-center items-center">
								<div className="w-16 h-2 bg-blue-200 mb-1 rounded"></div>
								<div className="w-16 h-2 bg-blue-200 mb-1 rounded"></div>
								<div className="w-16 h-2 bg-blue-200 rounded"></div>
							</div>
							<div className="text-center text-[10px] font-medium mt-1">
								.com Nameserver
							</div>
						</div>

						{/* TikTok Nameserver */}
						<div
							className={`flex flex-col items-center transition-all duration-300 ${
								currentStep === 4 ? "scale-110" : "scale-100"
							}`}
						>
							<div className="w-20 h-12 bg-blue-100 border-2 border-blue-300 rounded flex flex-col justify-center items-center">
								<div className="w-16 h-2 bg-blue-200 mb-1 rounded"></div>
								<div className="w-16 h-2 bg-blue-200 mb-1 rounded"></div>
								<div className="w-16 h-2 bg-blue-200 rounded"></div>
							</div>
							<div className="text-center text-[10px] font-medium mt-1">
								TikTok Nameserver
							</div>
						</div>
					</div>

					{currentStep >= 2 && currentStep <= 4 && (
						<div className="mt-2 bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs">
							{currentStep === 2 && "Looking up tiktok.com"}
							{currentStep === 3 && "Finding .com servers"}
							{currentStep === 4 && "Resolving to 96.16.248.134"}
						</div>
					)}
				</div>
			</div>

			{/* Encryption - Repositioned under TikTok CDN */}
			<div
				className={`absolute right-[0%] bottom-[16%] transition-all duration-500 ${
					currentStep >= 9 ? "opacity-100" : "opacity-0"
				}`}
			>
				<div className="flex flex-col items-center">
					<div className="flex space-x-6">
						<div className="flex flex-col items-center">
							<div className="w-16 h-16 bg-green-100 border-2 border-green-300 rounded-lg flex items-center justify-center">
								<svg
									className="w-8 h-8 text-green-500"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth="2"
										d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"
									></path>
								</svg>
							</div>
							<div className="text-center text-xs font-medium mt-1">
								Public Key
							</div>
						</div>

						<div className="flex flex-col items-center">
							<div className="w-16 h-16 bg-purple-100 border-2 border-purple-300 rounded-lg flex items-center justify-center">
								<svg
									className="w-8 h-8 text-purple-500"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth="2"
										d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
									></path>
								</svg>
							</div>
							<div className="text-center text-xs font-medium mt-1">
								Private Key
							</div>
						</div>
					</div>

					{currentStep === 9 && (
						<div className="mt-2 bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-xs">
							HTTPS encryption/decryption
						</div>
					)}

					{/* Add a visual indicator for encryption/decryption */}
					{currentStep === 9 && (
						<div className="mt-2 w-full">
							<div className="flex items-center justify-center">
								<svg
									className="w-6 h-6 text-green-500 animate-pulse"
									fill="currentColor"
									viewBox="0 0 20 20"
								>
									<path
										fillRule="evenodd"
										d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13a1 1 0 102 0V9.414l1.293 1.293a1 1 0 001.414-1.414z"
										clipRule="evenodd"
									/>
								</svg>
								<div className="mx-2 text-xs text-gray-600">
									Secure Connection
								</div>
								<svg
									className="w-6 h-6 text-green-500 animate-pulse"
									fill="currentColor"
									viewBox="0 0 20 20"
								>
									<path
										fillRule="evenodd"
										d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13a1 1 0 102 0V9.414l1.293 1.293a1 1 0 001.414-1.414z"
										clipRule="evenodd"
									/>
								</svg>
							</div>
						</div>
					)}
				</div>
			</div>

			{/* IP Address Labels */}
			<div
				className={`absolute left-[20%] bottom-[13%] transition-all duration-500 ${
					currentStep >= 4 ? "opacity-100" : "opacity-0"
				}`}
			>
				<div className="bg-white/80 backdrop-blur-sm px-2 py-1 rounded text-xs font-mono">
					tiktok.com → 96.16.248.134
				</div>
			</div>

			{/* Connection lines */}
			<svg className="absolute inset-0 w-full h-full pointer-events-none">
				{/* User to ISP 1 */}
				<line
					x1="100"
					y1="200"
					x2="180"
					y2="160"
					stroke={currentStep >= 1 ? "#f472b6" : "#e5e7eb"}
					strokeWidth={currentStep >= 1 ? "2" : "1"}
					strokeDasharray={currentStep === 1 ? "5,5" : "0"}
				/>

				{/* ISP 1 to Router 1 */}
				<line
					x1="270"
					y1="160"
					x2="310"
					y2="160"
					stroke={currentStep >= 5 ? "#f472b6" : "#e5e7eb"}
					strokeWidth={currentStep >= 5 ? "2" : "1"}
					strokeDasharray={currentStep === 5 ? "5,5" : "0"}
				/>

				{/* Router 1 to ISP 3 */}
				<line
					x1="330"
					y1="160"
					x2="400"
					y2="160"
					stroke={currentStep >= 6 ? "#f472b6" : "#e5e7eb"}
					strokeWidth={currentStep >= 6 ? "2" : "1"}
					strokeDasharray={currentStep === 6 ? "5,5" : "0"}
				/>

				{/* ISP 3 to Router 2 */}
				<line
					x1="490"
					y1="160"
					x2="545"
					y2="160"
					stroke={currentStep >= 7 ? "#f472b6" : "#e5e7eb"}
					strokeWidth={currentStep >= 7 ? "2" : "1"}
					strokeDasharray={currentStep === 7 ? "5,5" : "0"}
				/>

				{/* Router 2 to TikTok ISP */}
				<line
					x1="570"
					y1="160"
					x2="605"
					y2="160"
					stroke={currentStep >= 8 ? "#f472b6" : "#e5e7eb"}
					strokeWidth={currentStep >= 8 ? "2" : "1"}
					strokeDasharray={currentStep === 8 ? "5,5" : "0"}
				/>

				{/* TikTok ISP to CDN */}
				<line
					x1="680"
					y1="160"
					x2="710"
					y2="160"
					stroke={currentStep >= 9 ? "#f472b6" : "#e5e7eb"}
					strokeWidth={currentStep >= 9 ? "2" : "1"}
					strokeDasharray={currentStep === 9 ? "5,5" : "0"}
				/>

				{/* ISP 1 to DNS */}
				<line
					x1="220"
					y1="205"
					x2="220"
					y2="300"
					stroke={currentStep >= 2 ? "#93c5fd" : "#e5e7eb"}
					strokeWidth={currentStep >= 2 ? "2" : "1"}
					strokeDasharray={currentStep === 2 ? "5,5" : "0"}
				/>
			</svg>

			{/* Data Packets */}
			{currentStep >= 1 && (
				<>
					{/* User to ISP */}
					<div
						className={`absolute left-[15%] top-[35%] transition-all duration-300 ${
							currentStep === 1 ? "opacity-100" : "opacity-0"
						}`}
					>
						<div className="flex items-center animate-pulse">
							<svg
								className="w-6 h-6 text-pink-500"
								fill="currentColor"
								viewBox="0 0 20 20"
							>
								<path
									fillRule="evenodd"
									d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13a1 1 0 102 0V9.414l1.293 1.293a1 1 0 001.414-1.414z"
									clipRule="evenodd"
								/>
							</svg>
						</div>
					</div>

					{/* ISP to DNS */}
					<div
						className={`absolute left-[25%] top-[45%] transition-all duration-300 ${
							currentStep === 2 ? "opacity-100" : "opacity-0"
						}`}
					>
						<div className="flex items-center animate-pulse">
							<svg
								className="w-6 h-6 text-blue-500"
								fill="currentColor"
								viewBox="0 0 20 20"
							>
								<path
									fillRule="evenodd"
									d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13a1 1 0 102 0V9.414l1.293 1.293a1 1 0 001.414-1.414z"
									clipRule="evenodd"
								/>
							</svg>
						</div>
					</div>

					{/* DNS Chain */}
					<div
						className={`absolute left-[40%] bottom-[30%] transition-all duration-300 ${
							currentStep === 3 || currentStep === 4
								? "opacity-100"
								: "opacity-0"
						}`}
					>
						<div className="flex items-center animate-pulse">
							<svg
								className="w-6 h-6 text-blue-500"
								fill="currentColor"
								viewBox="0 0 20 20"
							>
								<path
									fillRule="evenodd"
									d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13a1 1 0 102 0V9.414l1.293 1.293a1 1 0 001.414-1.414z"
									clipRule="evenodd"
								/>
							</svg>
						</div>
					</div>

					{/* ISP to Router 1 */}
					<div
						className={`absolute left-[33%] top-[27%] transition-all duration-300 ${
							currentStep === 5 ? "opacity-100" : "opacity-0"
						}`}
					>
						<div className="flex items-center animate-pulse">
							<svg
								className="w-6 h-6 text-pink-500"
								fill="currentColor"
								viewBox="0 0 20 20"
							>
								<path
									fillRule="evenodd"
									d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13a1 1 0 102 0V9.414l1.293 1.293a1 1 0 001.414-1.414z"
									clipRule="evenodd"
								/>
							</svg>
						</div>
					</div>

					{/* Router 1 to ISP 3 */}
					<div
						className={`absolute left-[45%] top-[35%] transition-all duration-300 ${
							currentStep === 6 ? "opacity-100" : "opacity-0"
						}`}
					>
						<div className="flex items-center animate-pulse">
							<svg
								className="w-6 h-6 text-pink-500"
								fill="currentColor"
								viewBox="0 0 20 20"
							>
								<path
									fillRule="evenodd"
									d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13a1 1 0 102 0V9.414l1.293 1.293a1 1 0 001.414-1.414z"
									clipRule="evenodd"
								/>
							</svg>
						</div>
					</div>

					{/* ISP 3 to Router 2 */}
					<div
						className={`absolute left-[58%] top-[35%] transition-all duration-300 ${
							currentStep === 7 ? "opacity-100" : "opacity-0"
						}`}
					>
						<div className="flex items-center animate-pulse">
							<svg
								className="w-6 h-6 text-pink-500"
								fill="currentColor"
								viewBox="0 0 20 20"
							>
								<path
									fillRule="evenodd"
									d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13a1 1 0 102 0V9.414l1.293 1.293a1 1 0 001.414-1.414z"
									clipRule="evenodd"
								/>
							</svg>
						</div>
					</div>

					{/* Router 2 to TikTok ISP */}
					<div
						className={`absolute left-[72%] top-[35%] transition-all duration-300 ${
							currentStep === 8 ? "opacity-100" : "opacity-0"
						}`}
					>
						<div className="flex items-center animate-pulse">
							<svg
								className="w-6 h-6 text-pink-500"
								fill="currentColor"
								viewBox="0 0 20 20"
							>
								<path
									fillRule="evenodd"
									d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13a1 1 0 102 0V9.414l1.293 1.293a1 1 0 001.414-1.414z"
									clipRule="evenodd"
								/>
							</svg>
						</div>
					</div>

					{/* TikTok ISP to CDN */}
					<div
						className={`absolute right-[15%] top-[35%] transition-all duration-300 ${
							currentStep === 9 ? "opacity-100" : "opacity-0"
						}`}
					>
						<div className="flex items-center animate-pulse">
							<svg
								className="w-6 h-6 text-pink-500"
								fill="currentColor"
								viewBox="0 0 20 20"
							>
								<path
									fillRule="evenodd"
									d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13a1 1 0 102 0V9.414l1.293 1.293a1 1 0 001.414-1.414z"
									clipRule="evenodd"
								/>
							</svg>
						</div>
					</div>
				</>
			)}

			{/* Step explanation */}
			<div className="absolute left-4 top-4 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-lg shadow-sm">
				<div className="text-sm font-medium text-gray-700">
					{currentStep === 0 &&
						"Step 1: Creating a TikTok post on your device"}
					{currentStep === 1 &&
						"Step 2: Your device sends data to your ISP"}
					{currentStep === 2 &&
						"Step 3: ISP queries DNS resolver to find tiktok.com"}
					{currentStep === 3 &&
						"Step 4: DNS resolver contacts TLD and .com nameservers"}
					{currentStep === 4 &&
						"Step 5: TikTok nameserver returns IP address 96.16.248.134"}
					{currentStep === 5 &&
						"Step 6: Your ISP routes data through the first router"}
					{currentStep === 6 &&
						"Step 7: Data travels through transit ISP network"}
					{currentStep === 7 &&
						"Step 8: Second router forwards data to next network"}
					{currentStep === 8 && "Step 9: Data reaches TikTok's ISP"}
					{currentStep === 9 &&
						"Step 10: TikTok CDN receives, decrypts and processes your post"}
				</div>
			</div>
		</div>
	);
}
