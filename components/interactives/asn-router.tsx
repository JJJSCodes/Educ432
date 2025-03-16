"use client";

import type React from "react";

import { useState, useRef, useEffect } from "react";
import { Plus, X, Play, ArrowRight, Trash2 } from "lucide-react";

interface Position {
	x: number;
	y: number;
}

interface ASN {
	id: string;
	name: string;
	position: Position;
	connections: string[]; // IDs of connected ASNs
}

interface Router {
	id: string;
	source: string; // ASN ID
	target: string; // ASN ID
}

interface RouteStep {
	from: string;
	to: string;
	cost: number;
}

export default function ASNRouterInteractive() {
	const [asns, setAsns] = useState<ASN[]>([
		{
			id: "your-asn",
			name: "Your ASN",
			position: { x: 100, y: 150 },
			connections: ["friend-asn"],
		},
		{
			id: "friend-asn",
			name: "Friend's ASN",
			position: { x: 500, y: 150 },
			connections: ["your-asn"],
		},
	]);

	const [routers, setRouters] = useState<Router[]>([
		{ id: "router-1", source: "your-asn", target: "friend-asn" },
	]);

	const [draggingId, setDraggingId] = useState<string | null>(null);
	const [dragOffset, setDragOffset] = useState<Position>({ x: 0, y: 0 });
	const [isSimulating, setIsSimulating] = useState(false);
	const [simulationPath, setSimulationPath] = useState<string[]>([]);
	const [simulationStep, setSimulationStep] = useState(0);
	const [isAddingConnection, setIsAddingConnection] = useState(false);
	const [connectionStart, setConnectionStart] = useState<string | null>(null);
	// Add a new state for disconnect mode
	const [isDisconnectingMode, setIsDisconnectingMode] = useState(false);
	const [routeFound, setRouteFound] = useState<boolean | null>(null);

	const canvasRef = useRef<HTMLDivElement>(null);

	// Update routers when ASN connections change
	useEffect(() => {
		const newRouters: Router[] = [];
		let routerId = 1;

		// Create a set to track unique connections
		const connectionSet = new Set<string>();

		asns.forEach((asn) => {
			asn.connections.forEach((targetId) => {
				// Create a unique key for this connection (sorted to avoid duplicates)
				const connectionKey = [asn.id, targetId].sort().join("-");

				if (!connectionSet.has(connectionKey)) {
					connectionSet.add(connectionKey);
					newRouters.push({
						id: `router-${routerId++}`,
						source: asn.id,
						target: targetId,
					});
				}
			});
		});

		setRouters(newRouters);
	}, [asns]);

	const addASN = () => {
		const newId = `asn-${asns.length + 1}`;
		const newName = `AS${Math.floor(Math.random() * 65000) + 1}`;

		// Position in the middle of the canvas
		const canvasWidth = canvasRef.current?.clientWidth || 600;
		const canvasHeight = canvasRef.current?.clientHeight || 300;

		setAsns([
			...asns,
			{
				id: newId,
				name: newName,
				position: {
					x: Math.random() * (canvasWidth - 100) + 50,
					y: Math.random() * (canvasHeight - 100) + 50,
				},
				connections: [],
			},
		]);
	};

	const removeASN = (id: string) => {
		// Don't allow removing the fixed endpoints
		if (id === "your-asn" || id === "friend-asn") return;

		// Remove this ASN
		const updatedAsns = asns.filter((asn) => asn.id !== id);

		// Remove connections to this ASN
		const updatedAsnsWithConnections = updatedAsns.map((asn) => ({
			...asn,
			connections: asn.connections.filter((conn) => conn !== id),
		}));

		setAsns(updatedAsnsWithConnections);
	};

	const startDragging = (id: string, e: React.MouseEvent) => {
		if (isAddingConnection) {
			// If we're adding a connection, set this as the start point
			setConnectionStart(id);
			return;
		}

		// Don't allow dragging the fixed endpoints
		if (id === "your-asn" || id === "friend-asn") return;

		const asn = asns.find((a) => a.id === id);
		if (!asn) return;

		setDraggingId(id);
		setDragOffset({
			x: e.clientX - asn.position.x,
			y: e.clientY - asn.position.y,
		});
	};

	const handleMouseMove = (e: React.MouseEvent) => {
		if (!draggingId) return;

		const canvasRect = canvasRef.current?.getBoundingClientRect();
		if (!canvasRect) return;

		const x = e.clientX - dragOffset.x;
		const y = e.clientY - dragOffset.y;

		// Update the position of the dragged ASN
		setAsns(
			asns.map((asn) =>
				asn.id === draggingId ? { ...asn, position: { x, y } } : asn
			)
		);
	};

	// Add a function to toggle disconnect mode
	const toggleDisconnectMode = () => {
		setIsDisconnectingMode(!isDisconnectingMode);
		setIsAddingConnection(false);
		setConnectionStart(null);
	};

	// Update the removeConnection function to work with router objects
	const removeConnection = (router: Router) => {
		const { source, target } = router;

		setAsns(
			asns.map((asn) => {
				if (asn.id === source) {
					return {
						...asn,
						connections: asn.connections.filter(
							(id) => id !== target
						),
					};
				}
				if (asn.id === target) {
					return {
						...asn,
						connections: asn.connections.filter(
							(id) => id !== source
						),
					};
				}
				return asn;
			})
		);
	};

	const handleMouseUp = (e: React.MouseEvent) => {
		if (isAddingConnection && connectionStart) {
			// Get the element under the mouse
			const element = document.elementFromPoint(e.clientX, e.clientY);
			const targetId = element?.getAttribute("data-asn-id");

			if (targetId && targetId !== connectionStart) {
				// Add connection between the two ASNs
				addConnection(connectionStart, targetId);
			}

			setConnectionStart(null);
			return;
		}

		setDraggingId(null);
	};

	// Add a handler for router clicks
	const handleRouterClick = (router: Router, e: React.MouseEvent) => {
		if (isDisconnectingMode) {
			e.stopPropagation();
			removeConnection(router);
		}
	};

	const addConnection = (sourceId: string, targetId: string) => {
		// Check if connection already exists
		const sourceASN = asns.find((asn) => asn.id === sourceId);
		if (sourceASN?.connections.includes(targetId)) return;

		// Add connection in both directions
		setAsns(
			asns.map((asn) => {
				if (asn.id === sourceId) {
					return {
						...asn,
						connections: [...asn.connections, targetId],
					};
				}
				if (asn.id === targetId) {
					return {
						...asn,
						connections: [...asn.connections, sourceId],
					};
				}
				return asn;
			})
		);
	};

	const toggleConnectionMode = () => {
		setIsAddingConnection(!isAddingConnection);
		setIsDisconnectingMode(false);
		setConnectionStart(null);
	};

	const startSimulation = () => {
		setIsSimulating(true);
		setSimulationStep(0);

		// Find shortest path using Dijkstra's algorithm
		const path = findShortestPath("your-asn", "friend-asn");
		setSimulationPath(path);
		setRouteFound(path.length > 0);
	};

	const findShortestPath = (start: string, end: string): string[] => {
		// Implementation of Dijkstra's algorithm
		const distances: Record<string, number> = {};
		const previous: Record<string, string | null> = {};
		const unvisited = new Set<string>();

		// Initialize
		asns.forEach((asn) => {
			distances[asn.id] = asn.id === start ? 0 : Number.POSITIVE_INFINITY;
			previous[asn.id] = null;
			unvisited.add(asn.id);
		});

		while (unvisited.size > 0) {
			// Find the unvisited node with the smallest distance
			let current: string | null = null;
			let smallestDistance = Number.POSITIVE_INFINITY;

			unvisited.forEach((id) => {
				if (distances[id] < smallestDistance) {
					smallestDistance = distances[id];
					current = id;
				}
			});

			if (current === null) break;
			if (current === end) break;

			unvisited.delete(current);

			// Find the ASN object
			const currentASN = asns.find((asn) => asn.id === current);
			if (!currentASN) continue;

			// Check each neighbor
			currentASN.connections.forEach((neighborId) => {
				if (!unvisited.has(neighborId)) return;

				// Calculate distance (in this case, each hop costs 1)
				const distance = distances[current!] + 1;

				if (distance < distances[neighborId]) {
					distances[neighborId] = distance;
					previous[neighborId] = current;
				}
			});
		}

		// Reconstruct the path
		const path: string[] = [];
		let current: string | null = end;

		while (current) {
			path.unshift(current);
			current = previous[current];
		}

		// If the end is not reachable, return an empty path
		if (path[0] !== start) {
			return [];
		}

		return path;
	};

	const nextSimulationStep = () => {
		if (simulationStep < simulationPath.length - 1) {
			setSimulationStep(simulationStep + 1);
		}
	};

	const resetSimulation = () => {
		setIsSimulating(false);
		setSimulationPath([]);
		setSimulationStep(0);
	};

	const getASNPosition = (id: string): Position => {
		const asn = asns.find((a) => a.id === id);
		return asn ? asn.position : { x: 0, y: 0 };
	};

	const getRouterPosition = (source: string, target: string): Position => {
		const sourcePos = getASNPosition(source);
		const targetPos = getASNPosition(target);

		return {
			x: (sourcePos.x + targetPos.x) / 2,
			y: (sourcePos.y + targetPos.y) / 2,
		};
	};

	const isInSimulationPath = (asnId: string): boolean => {
		return simulationPath.includes(asnId);
	};

	const isActiveInSimulation = (asnId: string): boolean => {
		return simulationPath[simulationStep] === asnId;
	};

	const isRouterInPath = (router: Router): boolean => {
		if (!isSimulating) return false;

		for (let i = 0; i < simulationPath.length - 1; i++) {
			const current = simulationPath[i];
			const next = simulationPath[i + 1];

			if (
				(router.source === current && router.target === next) ||
				(router.source === next && router.target === current)
			) {
				return true;
			}
		}

		return false;
	};

	return (
		<div className="bg-white p-4 rounded-lg shadow-sm">
			<div className="flex justify-between mb-4">
				<button
					onClick={addASN}
					disabled={isSimulating || isDisconnectingMode}
					className="flex items-center px-3 py-1.5 bg-indigo-100 text-indigo-700 rounded-md hover:bg-indigo-200 transition-colors disabled:bg-gray-100 disabled:text-gray-400"
				>
					<Plus
						size={16}
						className="mr-1"
					/>{" "}
					Add ASN
				</button>

				<div className="flex gap-2">
					<button
						onClick={toggleConnectionMode}
						disabled={isSimulating || isDisconnectingMode}
						className={`flex items-center px-3 py-1.5 rounded-md transition-colors ${
							isAddingConnection
								? "bg-purple-200 text-purple-700 hover:bg-purple-300"
								: "bg-purple-100 text-purple-600 hover:bg-purple-200"
						} disabled:bg-gray-100 disabled:text-gray-400`}
					>
						{isAddingConnection
							? "Cancel Connection"
							: "Add Connection"}
					</button>

					<button
						onClick={toggleDisconnectMode}
						disabled={isSimulating || isAddingConnection}
						className={`flex items-center px-3 py-1.5 rounded-md transition-colors ${
							isDisconnectingMode
								? "bg-red-200 text-red-700 hover:bg-red-300"
								: "bg-red-100 text-red-600 hover:bg-red-200"
						} disabled:bg-gray-100 disabled:text-gray-400`}
					>
						{isDisconnectingMode
							? "Cancel Disconnect"
							: "Remove Connection"}
					</button>
				</div>

				{!isSimulating ? (
					<button
						onClick={startSimulation}
						disabled={isAddingConnection || isDisconnectingMode}
						className="flex items-center px-3 py-1.5 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors disabled:bg-gray-300 disabled:text-gray-500"
					>
						<Play
							size={16}
							className="mr-1"
						/>{" "}
						Run Simulation
					</button>
				) : simulationStep < simulationPath.length - 1 ? (
					<button
						onClick={nextSimulationStep}
						className="flex items-center px-3 py-1.5 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors"
					>
						Next Step
					</button>
				) : (
					<button
						onClick={resetSimulation}
						className="flex items-center px-3 py-1.5 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors"
					>
						Reset
					</button>
				)}
			</div>

			{isAddingConnection && connectionStart && (
				<div className="mb-2 p-2 bg-purple-100 text-purple-700 rounded-md text-sm">
					Click on another ASN to create a connection from{" "}
					{asns.find((a) => a.id === connectionStart)?.name}
				</div>
			)}

			{isDisconnectingMode && (
				<div className="mb-2 p-2 bg-red-100 text-red-700 rounded-md text-sm">
					Click on a router to remove the connection between ASNs
				</div>
			)}

			<div
				ref={canvasRef}
				className="relative w-full h-[300px] border border-gray-200 rounded-lg bg-gray-50 overflow-hidden"
				onMouseMove={handleMouseMove}
				onMouseUp={handleMouseUp}
				onMouseLeave={() => {
					setDraggingId(null);
					if (isAddingConnection) setConnectionStart(null);
				}}
			>
				{/* Fixed endpoints */}
				<div
					className="absolute left-0 top-0 px-3 py-2 bg-purple-100 text-purple-700 border border-purple-300 rounded-md"
					style={{ transform: "translate(10px, 150px)" }}
				>
					You
				</div>

				<div
					className="absolute right-0 top-0 px-3 py-2 bg-purple-100 text-purple-700 border border-purple-300 rounded-md"
					style={{ transform: "translate(-10px, 150px)" }}
				>
					Friend
				</div>

				{/* Connection lines */}
				<svg className="absolute inset-0 w-full h-full pointer-events-none">
					{asns.map((asn) =>
						asn.connections.map((targetId) => {
							const target = asns.find((a) => a.id === targetId);
							if (!target) return null;

							// Only draw each connection once
							if (asn.id > targetId) return null;

							const router = routers.find(
								(r) =>
									(r.source === asn.id &&
										r.target === targetId) ||
									(r.source === targetId &&
										r.target === asn.id)
							);

							const isActive =
								isSimulating &&
								router &&
								isRouterInPath(router);

							return (
								<line
									key={`${asn.id}-${targetId}`}
									x1={asn.position.x}
									y1={asn.position.y}
									x2={target.position.x}
									y2={target.position.y}
									stroke={isActive ? "#9333ea" : "#d1d5db"}
									strokeWidth={isActive ? 3 : 1}
								/>
							);
						})
					)}
				</svg>

				{/* Routers - Updated to be clickable for disconnecting */}
				{routers.map((router) => {
					const position = getRouterPosition(
						router.source,
						router.target
					);
					const isActive = isSimulating && isRouterInPath(router);
					const sourceASN = asns.find((a) => a.id === router.source);
					const targetASN = asns.find((a) => a.id === router.target);

					return (
						<div
							key={router.id}
							onClick={(e) => handleRouterClick(router, e)}
							className={`absolute px-2 py-1 rounded-md text-xs ${
								isDisconnectingMode
									? "cursor-pointer border border-dashed border-red-400 hover:bg-red-100 hover:text-red-700"
									: ""
							} ${
								isActive
									? "bg-purple-500 text-white"
									: "bg-gray-200 text-gray-700"
							}`}
							style={{
								transform: `translate(${position.x - 25}px, ${
									position.y - 10
								}px)`,
								transition: "background-color 0.3s",
							}}
							title={
								isDisconnectingMode
									? `Disconnect ${sourceASN?.name} from ${targetASN?.name}`
									: undefined
							}
						>
							{isDisconnectingMode ? (
								<div className="flex items-center">
									<Trash2
										size={12}
										className="mr-1 text-red-500"
									/>
									Router
								</div>
							) : (
								"Router"
							)}
						</div>
					);
				})}

				{/* ASNs */}
				{asns.map((asn) => (
					<div
						key={asn.id}
						data-asn-id={asn.id}
						className={`absolute px-3 py-2 rounded-md cursor-pointer ${
							isSimulating
								? isActiveInSimulation(asn.id)
									? "bg-purple-600 text-white"
									: isInSimulationPath(asn.id)
									? "bg-purple-200 text-purple-800"
									: "bg-indigo-100 text-indigo-700"
								: "bg-indigo-100 text-indigo-700 hover:bg-indigo-200"
						} ${
							asn.id === "your-asn" || asn.id === "friend-asn"
								? ""
								: "cursor-move"
						}`}
						style={{
							transform: `translate(${asn.position.x - 40}px, ${
								asn.position.y - 15
							}px)`,
							transition: isSimulating
								? "background-color 0.3s"
								: "none",
						}}
						onMouseDown={(e) => startDragging(asn.id, e)}
					>
						{asn.name}
						{asn.id !== "your-asn" && asn.id !== "friend-asn" && (
							<button
								onClick={(e) => {
									e.stopPropagation();
									removeASN(asn.id);
								}}
								className="ml-2 text-indigo-500 hover:text-indigo-700"
								disabled={isSimulating}
							>
								<X size={14} />
							</button>
						)}
					</div>
				))}
			</div>

			{isSimulating && (
				<div className="mt-4 p-3 bg-purple-50 rounded-md">
					<h4 className="font-medium text-purple-700 mb-2">
						Simulation Progress
					</h4>
					{routeFound ? (
						<>
							<div className="flex items-center gap-2 flex-wrap">
								{simulationPath.map((asnId, index) => {
									const asn = asns.find(
										(a) => a.id === asnId
									);
									return (
										<div
											key={index}
											className="flex items-center"
										>
											<div
												className={`px-2 py-1 rounded ${
													index <= simulationStep
														? "bg-purple-500 text-white"
														: "bg-gray-200 text-gray-700"
												}`}
											>
												{asn?.name || asnId}
											</div>
											{index <
												simulationPath.length - 1 && (
												<ArrowRight
													className={`mx-1 ${
														index < simulationStep
															? "text-purple-500"
															: "text-gray-300"
													}`}
													size={16}
												/>
											)}
										</div>
									);
								})}
							</div>
							{simulationStep === simulationPath.length - 1 && (
								<div className="mt-2 text-green-600 font-medium">
									Route found! Total hops:{" "}
									{simulationPath.length - 1}
								</div>
							)}
						</>
					) : (
						<div className="mt-2 text-red-600 font-medium">
							No route found
						</div>
					)}
				</div>
			)}
		</div>
	);
}
