import type { Area } from '@/lib/domain/area';

export type LayoutMode = 'all' | 'perSchema';

export interface CrossingAwareLayoutNode {
    id: string;
    x: number;
    y: number;
    width: number;
    height: number;
    schema?: string | null;
}

export interface CrossingAwareLayoutEdge {
    id: string;
    sourceId: string;
    targetId: string;
    weight?: number;
    kind?: 'relationship' | 'dependency';
}

export interface CrossingAwareLayoutWeights {
    Wcross: number;
    Wlen: number;
    Wspan: number;
    Wmove: number;
    Waspect: number;
    Wheight: number;
}

export interface CrossingAwareLayoutBounds {
    x: number;
    y: number;
    width: number;
    height: number;
}

export interface CreateCrossingAwareLayoutOptions {
    tables: CrossingAwareLayoutNode[];
    edges: CrossingAwareLayoutEdge[];
    areas?: Area[];
    mode?: LayoutMode;
    bounds?: CrossingAwareLayoutBounds;
    liteMode?: boolean;
    weights?: Partial<CrossingAwareLayoutWeights>;
}

type NodePosition = {
    x: number;
    y: number;
};

type ComponentLayout = {
    positions: Map<string, NodePosition>;
    width: number;
    height: number;
};

type LayoutMetrics = {
    crossings: number;
    totalEdgeLength: number;
    diagramSpan: number;
    displacement: number;
    aspectPenalty: number;
    heightPenalty: number;
};

const DEFAULT_WEIGHTS: CrossingAwareLayoutWeights = {
    Wcross: 1000,
    Wlen: 1,
    Wspan: 0.2,
    Wmove: 0.1,
    Waspect: 2.5,
    Wheight: 1.2,
};

const DEFAULT_GAP_X = 120;
const DEFAULT_GAP_Y = 100;
const LANE_GAP_X = 80;
const GROUP_GAP_X = 220;
const COMPONENT_GAP_X = 180;
const LARGE_LAYOUT_THRESHOLD = 100;
const TARGET_ASPECT_RATIO = 1.6;

const DEFAULT_ITERATIONS = {
    sweeps: 4,
    pairwisePasses: 2,
    overlapMaxIterations: 600,
};

const LITE_ITERATIONS = {
    sweeps: 2,
    pairwisePasses: 1,
    overlapMaxIterations: 220,
};

export const createCrossingAwareLayout = ({
    tables,
    edges,
    areas = [],
    mode = 'all',
    bounds,
    liteMode,
    weights,
}: CreateCrossingAwareLayoutOptions): Map<string, NodePosition> => {
    const mergedWeights: CrossingAwareLayoutWeights = {
        ...DEFAULT_WEIGHTS,
        ...weights,
    };

    if (tables.length === 0) {
        return new Map();
    }

    const effectiveLiteMode =
        liteMode ?? tables.length >= LARGE_LAYOUT_THRESHOLD;
    const iterations = effectiveLiteMode ? LITE_ITERATIONS : DEFAULT_ITERATIONS;

    const blockedAreas = bounds ? [] : areas;
    const tablesById = new Map(tables.map((table) => [table.id, table]));
    const filteredEdges = edges.filter((edge) => {
        return (
            edge.sourceId !== edge.targetId &&
            tablesById.has(edge.sourceId) &&
            tablesById.has(edge.targetId)
        );
    });

    const groups =
        mode === 'perSchema' ? groupTablesBySchema(tables) : [tables.slice()];

    const result = new Map<string, NodePosition>();

    const boundsPadding = 20;
    const originX = bounds ? bounds.x + boundsPadding : 100;
    const originY = bounds ? bounds.y + boundsPadding : 100;
    let currentGroupX = originX;

    groups.forEach((groupTables) => {
        if (groupTables.length === 0) {
            return;
        }

        const groupIds = new Set(groupTables.map((table) => table.id));
        const groupEdges = filteredEdges.filter(
            (edge) => groupIds.has(edge.sourceId) && groupIds.has(edge.targetId)
        );

        const groupLayout = createGroupLayout({
            tables: groupTables,
            edges: groupEdges,
            liteMode: effectiveLiteMode,
            iterations,
            weights: mergedWeights,
        });

        groupLayout.positions.forEach((position, tableId) => {
            result.set(tableId, {
                x: position.x + currentGroupX,
                y: position.y + originY,
            });
        });

        currentGroupX += groupLayout.width + GROUP_GAP_X;
    });

    return resolveOverlaps({
        positions: result,
        tablesById,
        blockedAreas,
        bounds,
        maxIterations: iterations.overlapMaxIterations,
    });
};

export const countEdgeCrossingsFromPositions = ({
    tables,
    edges,
    positions,
}: {
    tables: CrossingAwareLayoutNode[];
    edges: CrossingAwareLayoutEdge[];
    positions: Map<string, NodePosition>;
}): number => {
    const tablesById = new Map(tables.map((table) => [table.id, table]));

    let crossings = 0;

    for (let i = 0; i < edges.length; i += 1) {
        const edgeA = edges[i];
        const sourceA = tablesById.get(edgeA.sourceId);
        const targetA = tablesById.get(edgeA.targetId);
        const sourceAPosition = positions.get(edgeA.sourceId);
        const targetAPosition = positions.get(edgeA.targetId);

        if (!sourceA || !targetA || !sourceAPosition || !targetAPosition) {
            continue;
        }

        const a1 = centerPoint(sourceA, sourceAPosition);
        const a2 = centerPoint(targetA, targetAPosition);

        for (let j = i + 1; j < edges.length; j += 1) {
            const edgeB = edges[j];

            if (
                edgeA.sourceId === edgeB.sourceId ||
                edgeA.sourceId === edgeB.targetId ||
                edgeA.targetId === edgeB.sourceId ||
                edgeA.targetId === edgeB.targetId
            ) {
                continue;
            }

            const sourceB = tablesById.get(edgeB.sourceId);
            const targetB = tablesById.get(edgeB.targetId);
            const sourceBPosition = positions.get(edgeB.sourceId);
            const targetBPosition = positions.get(edgeB.targetId);

            if (!sourceB || !targetB || !sourceBPosition || !targetBPosition) {
                continue;
            }

            const b1 = centerPoint(sourceB, sourceBPosition);
            const b2 = centerPoint(targetB, targetBPosition);

            if (segmentsIntersect(a1, a2, b1, b2)) {
                crossings += 1;
            }
        }
    }

    return crossings;
};

const groupTablesBySchema = (
    tables: CrossingAwareLayoutNode[]
): CrossingAwareLayoutNode[][] => {
    const bySchema = new Map<string, CrossingAwareLayoutNode[]>();

    tables.forEach((table) => {
        const schemaKey = table.schema ?? '__default__';
        const schemaTables = bySchema.get(schemaKey) ?? [];
        schemaTables.push(table);
        bySchema.set(schemaKey, schemaTables);
    });

    return [...bySchema.entries()]
        .sort(([, a], [, b]) => {
            const minAX = Math.min(...a.map((table) => table.x));
            const minBX = Math.min(...b.map((table) => table.x));
            return minAX - minBX;
        })
        .map(([, schemaTables]) => schemaTables);
};

const createGroupLayout = ({
    tables,
    edges,
    liteMode,
    iterations,
    weights,
}: {
    tables: CrossingAwareLayoutNode[];
    edges: CrossingAwareLayoutEdge[];
    liteMode: boolean;
    iterations: typeof DEFAULT_ITERATIONS;
    weights: CrossingAwareLayoutWeights;
}): ComponentLayout => {
    const tableMap = new Map(tables.map((table) => [table.id, table]));
    const adjacency = buildAdjacency(tables, edges);

    const components = getConnectedComponents(
        tables.map((table) => table.id),
        adjacency,
        tableMap
    );

    const layoutByComponent = components.map((componentNodeIds) => {
        const componentTables = componentNodeIds
            .map((id) => tableMap.get(id))
            .filter((table): table is CrossingAwareLayoutNode => !!table);

        const componentEdges = edges.filter(
            (edge) =>
                componentNodeIds.includes(edge.sourceId) &&
                componentNodeIds.includes(edge.targetId)
        );

        return layoutComponent({
            tables: componentTables,
            edges: componentEdges,
            adjacency,
            liteMode,
            iterations,
            weights,
        });
    });

    const positions = new Map<string, NodePosition>();
    let offsetX = 0;
    let maxHeight = 0;

    layoutByComponent.forEach((componentLayout) => {
        componentLayout.positions.forEach((position, tableId) => {
            positions.set(tableId, {
                x: position.x + offsetX,
                y: position.y,
            });
        });

        offsetX += componentLayout.width + COMPONENT_GAP_X;
        maxHeight = Math.max(maxHeight, componentLayout.height);
    });

    return {
        positions,
        width: Math.max(0, offsetX - COMPONENT_GAP_X),
        height: maxHeight,
    };
};

const buildAdjacency = (
    tables: CrossingAwareLayoutNode[],
    edges: CrossingAwareLayoutEdge[]
): Map<string, Set<string>> => {
    const adjacency = new Map<string, Set<string>>();

    tables.forEach((table) => {
        adjacency.set(table.id, new Set());
    });

    edges.forEach((edge) => {
        adjacency.get(edge.sourceId)?.add(edge.targetId);
        adjacency.get(edge.targetId)?.add(edge.sourceId);
    });

    return adjacency;
};

const getConnectedComponents = (
    nodeIds: string[],
    adjacency: Map<string, Set<string>>,
    tableMap: Map<string, CrossingAwareLayoutNode>
): string[][] => {
    const visited = new Set<string>();
    const components: string[][] = [];

    const sortedNodeIds = nodeIds.slice().sort((a, b) => {
        const tableA = tableMap.get(a);
        const tableB = tableMap.get(b);
        if (!tableA || !tableB) return a.localeCompare(b);
        if (tableA.x !== tableB.x) return tableA.x - tableB.x;
        if (tableA.y !== tableB.y) return tableA.y - tableB.y;
        return a.localeCompare(b);
    });

    sortedNodeIds.forEach((nodeId) => {
        if (visited.has(nodeId)) {
            return;
        }

        const queue = [nodeId];
        const component: string[] = [];
        visited.add(nodeId);

        while (queue.length > 0) {
            const current = queue.shift();
            if (!current) continue;
            component.push(current);

            const neighbors = adjacency.get(current) ?? new Set<string>();
            [...neighbors].forEach((neighbor) => {
                if (!visited.has(neighbor)) {
                    visited.add(neighbor);
                    queue.push(neighbor);
                }
            });
        }

        components.push(component);
    });

    return components;
};

const layoutComponent = ({
    tables,
    edges,
    adjacency,
    liteMode,
    iterations,
    weights,
}: {
    tables: CrossingAwareLayoutNode[];
    edges: CrossingAwareLayoutEdge[];
    adjacency: Map<string, Set<string>>;
    liteMode: boolean;
    iterations: typeof DEFAULT_ITERATIONS;
    weights: CrossingAwareLayoutWeights;
}): ComponentLayout => {
    if (tables.length === 0) {
        return {
            positions: new Map(),
            width: 0,
            height: 0,
        };
    }

    const tableMap = new Map(tables.map((table) => [table.id, table]));
    const nodeLevels = buildLevels(tables, adjacency);
    const layers = buildInitialLayers(tables, nodeLevels);

    const originalLayerIndex = buildLayerIndexMap(layers);

    for (let sweep = 0; sweep < iterations.sweeps; sweep += 1) {
        for (let layerIdx = 1; layerIdx < layers.length; layerIdx += 1) {
            reorderLayerByBarycenter({
                layers,
                layerIdx,
                referenceLayerIdx: layerIdx - 1,
                adjacency,
            });
            improveLayerBySwap({
                layers,
                layerIdx,
                nodeLevels,
                edges,
                originalLayerIndex,
                weights,
                passes: iterations.pairwisePasses,
            });
        }

        for (let layerIdx = layers.length - 2; layerIdx >= 0; layerIdx -= 1) {
            reorderLayerByBarycenter({
                layers,
                layerIdx,
                referenceLayerIdx: layerIdx + 1,
                adjacency,
            });
            improveLayerBySwap({
                layers,
                layerIdx,
                nodeLevels,
                edges,
                originalLayerIndex,
                weights,
                passes: liteMode ? 1 : iterations.pairwisePasses,
            });
        }
    }

    return chooseCoordinateLayout({
        layers,
        tableMap,
        tables,
        edges,
        liteMode,
        weights,
    });
};

const buildLevels = (
    tables: CrossingAwareLayoutNode[],
    adjacency: Map<string, Set<string>>
): Map<string, number> => {
    const levels = new Map<string, number>();
    const tableMap = new Map(tables.map((table) => [table.id, table]));

    const sortedByDegree = tables
        .slice()
        .sort((a, b) => {
            const degreeA = adjacency.get(a.id)?.size ?? 0;
            const degreeB = adjacency.get(b.id)?.size ?? 0;
            if (degreeA !== degreeB) {
                return degreeB - degreeA;
            }
            if (a.x !== b.x) return a.x - b.x;
            if (a.y !== b.y) return a.y - b.y;
            return a.id.localeCompare(b.id);
        })
        .map((table) => table.id);

    sortedByDegree.forEach((rootId) => {
        if (levels.has(rootId)) {
            return;
        }

        const queue = [rootId];
        levels.set(rootId, 0);

        while (queue.length > 0) {
            const current = queue.shift();
            if (!current) continue;

            const currentLevel = levels.get(current) ?? 0;
            const neighbors = [...(adjacency.get(current) ?? new Set<string>())]
                .filter((neighborId) => tableMap.has(neighborId))
                .sort((a, b) => {
                    const tableA = tableMap.get(a)!;
                    const tableB = tableMap.get(b)!;
                    if (tableA.x !== tableB.x) return tableA.x - tableB.x;
                    if (tableA.y !== tableB.y) return tableA.y - tableB.y;
                    return a.localeCompare(b);
                });

            neighbors.forEach((neighbor) => {
                if (!levels.has(neighbor)) {
                    levels.set(neighbor, currentLevel + 1);
                    queue.push(neighbor);
                }
            });
        }
    });

    if (levels.size === 0 && tables.length > 0) {
        levels.set(tables[0].id, 0);
    }

    const minLevel = Math.min(...[...levels.values()]);
    if (minLevel !== 0) {
        levels.forEach((value, key) => {
            levels.set(key, value - minLevel);
        });
    }

    return levels;
};

const buildInitialLayers = (
    tables: CrossingAwareLayoutNode[],
    nodeLevels: Map<string, number>
): string[][] => {
    const layerMap = new Map<number, CrossingAwareLayoutNode[]>();

    tables.forEach((table) => {
        const level = nodeLevels.get(table.id) ?? 0;
        const current = layerMap.get(level) ?? [];
        current.push(table);
        layerMap.set(level, current);
    });

    const levels = [...layerMap.keys()].sort((a, b) => a - b);
    return levels.map((level) => {
        return (layerMap.get(level) ?? [])
            .slice()
            .sort((a, b) => {
                if (a.y !== b.y) return a.y - b.y;
                if (a.x !== b.x) return a.x - b.x;
                return a.id.localeCompare(b.id);
            })
            .map((table) => table.id);
    });
};

const reorderLayerByBarycenter = ({
    layers,
    layerIdx,
    referenceLayerIdx,
    adjacency,
}: {
    layers: string[][];
    layerIdx: number;
    referenceLayerIdx: number;
    adjacency: Map<string, Set<string>>;
}): void => {
    const layer = layers[layerIdx];
    const referenceLayer = layers[referenceLayerIdx] ?? [];

    if (layer.length <= 1 || referenceLayer.length === 0) {
        return;
    }

    const referenceIndex = new Map<string, number>();
    referenceLayer.forEach((nodeId, idx) => {
        referenceIndex.set(nodeId, idx);
    });

    const currentIndex = new Map<string, number>();
    layer.forEach((nodeId, idx) => {
        currentIndex.set(nodeId, idx);
    });

    const scored = layer.map((nodeId) => {
        const neighbors = [...(adjacency.get(nodeId) ?? new Set<string>())];
        const references = neighbors
            .map((neighborId) => referenceIndex.get(neighborId))
            .filter((index): index is number => index !== undefined);

        if (references.length === 0) {
            return {
                nodeId,
                barycenter: currentIndex.get(nodeId) ?? 0,
                currentOrder: currentIndex.get(nodeId) ?? 0,
            };
        }

        const barycenter =
            references.reduce((acc, value) => acc + value, 0) /
            references.length;

        return {
            nodeId,
            barycenter,
            currentOrder: currentIndex.get(nodeId) ?? 0,
        };
    });

    scored.sort((a, b) => {
        if (a.barycenter !== b.barycenter) {
            return a.barycenter - b.barycenter;
        }
        if (a.currentOrder !== b.currentOrder) {
            return a.currentOrder - b.currentOrder;
        }
        return a.nodeId.localeCompare(b.nodeId);
    });

    layers[layerIdx] = scored.map((entry) => entry.nodeId);
};

const improveLayerBySwap = ({
    layers,
    layerIdx,
    nodeLevels,
    edges,
    originalLayerIndex,
    weights,
    passes,
}: {
    layers: string[][];
    layerIdx: number;
    nodeLevels: Map<string, number>;
    edges: CrossingAwareLayoutEdge[];
    originalLayerIndex: Map<string, number>;
    weights: CrossingAwareLayoutWeights;
    passes: number;
}): void => {
    const layer = layers[layerIdx];

    if (layer.length <= 1 || passes <= 0) {
        return;
    }

    for (let pass = 0; pass < passes; pass += 1) {
        let changed = false;

        for (let i = 0; i < layer.length - 1; i += 1) {
            const beforeCost = computeArrangementCost({
                layers,
                nodeLevels,
                edges,
                originalLayerIndex,
                weights,
            });

            const currentLayer = layers[layerIdx];
            [currentLayer[i], currentLayer[i + 1]] = [
                currentLayer[i + 1],
                currentLayer[i],
            ];

            const afterCost = computeArrangementCost({
                layers,
                nodeLevels,
                edges,
                originalLayerIndex,
                weights,
            });

            if (afterCost <= beforeCost) {
                changed = true;
            } else {
                [currentLayer[i], currentLayer[i + 1]] = [
                    currentLayer[i + 1],
                    currentLayer[i],
                ];
            }
        }

        if (!changed) {
            break;
        }
    }
};

const computeArrangementCost = ({
    layers,
    nodeLevels,
    edges,
    originalLayerIndex,
    weights,
}: {
    layers: string[][];
    nodeLevels: Map<string, number>;
    edges: CrossingAwareLayoutEdge[];
    originalLayerIndex: Map<string, number>;
    weights: CrossingAwareLayoutWeights;
}): number => {
    const layerIndex = buildLayerIndexMap(layers);

    const crossingCount = countPseudoCrossings({
        edges,
        nodeLevels,
        layerIndex,
    });

    let totalLength = 0;
    let displacement = 0;

    const levelValues = [...nodeLevels.values()];
    const levelSpan =
        levelValues.length > 0
            ? Math.max(...levelValues) - Math.min(...levelValues) + 1
            : 0;
    const ySpan =
        layers.length > 0
            ? Math.max(...layers.map((layer) => layer.length))
            : 0;

    const approxAspect = levelSpan / Math.max(ySpan, 1);
    const aspectPenalty =
        approxAspect < TARGET_ASPECT_RATIO
            ? Math.pow(TARGET_ASPECT_RATIO - approxAspect, 2) * ySpan * 10
            : 0;
    const targetHeight = Math.max(
        5,
        Math.ceil(Math.sqrt(Math.max(nodeLevels.size, 1)) * 1.5)
    );
    const heightOverflow = Math.max(0, ySpan - targetHeight);
    const heightPenalty = heightOverflow * heightOverflow;

    edges.forEach((edge) => {
        const sourceLevel = nodeLevels.get(edge.sourceId) ?? 0;
        const targetLevel = nodeLevels.get(edge.targetId) ?? 0;
        const sourceOrder = layerIndex.get(edge.sourceId) ?? 0;
        const targetOrder = layerIndex.get(edge.targetId) ?? 0;
        const edgeWeight = edge.weight ?? 1;

        totalLength +=
            edgeWeight *
            (Math.abs(sourceLevel - targetLevel) +
                Math.abs(sourceOrder - targetOrder));
    });

    layerIndex.forEach((index, nodeId) => {
        const originalIndex = originalLayerIndex.get(nodeId) ?? index;
        displacement += Math.abs(index - originalIndex);
    });

    return (
        weights.Wcross * crossingCount +
        weights.Wlen * totalLength +
        weights.Wspan * (levelSpan + ySpan) +
        weights.Wmove * displacement +
        weights.Waspect * aspectPenalty +
        weights.Wheight * heightPenalty
    );
};

const countPseudoCrossings = ({
    edges,
    nodeLevels,
    layerIndex,
}: {
    edges: CrossingAwareLayoutEdge[];
    nodeLevels: Map<string, number>;
    layerIndex: Map<string, number>;
}): number => {
    const edgesByLayerPair = new Map<
        string,
        Array<{ sourceOrder: number; targetOrder: number; weight: number }>
    >();

    edges.forEach((edge) => {
        const sourceLevel = nodeLevels.get(edge.sourceId);
        const targetLevel = nodeLevels.get(edge.targetId);

        if (sourceLevel === undefined || targetLevel === undefined) {
            return;
        }

        if (sourceLevel === targetLevel) {
            return;
        }

        const sourceOrder = layerIndex.get(edge.sourceId);
        const targetOrder = layerIndex.get(edge.targetId);

        if (sourceOrder === undefined || targetOrder === undefined) {
            return;
        }

        const lowLevel = Math.min(sourceLevel, targetLevel);
        const highLevel = Math.max(sourceLevel, targetLevel);

        const forwardSourceOrder =
            sourceLevel < targetLevel ? sourceOrder : targetOrder;
        const forwardTargetOrder =
            sourceLevel < targetLevel ? targetOrder : sourceOrder;

        const key = `${lowLevel}:${highLevel}`;
        const layerEdges = edgesByLayerPair.get(key) ?? [];
        layerEdges.push({
            sourceOrder: forwardSourceOrder,
            targetOrder: forwardTargetOrder,
            weight: edge.weight ?? 1,
        });
        edgesByLayerPair.set(key, layerEdges);
    });

    let crossings = 0;

    edgesByLayerPair.forEach((layerEdges) => {
        for (let i = 0; i < layerEdges.length; i += 1) {
            for (let j = i + 1; j < layerEdges.length; j += 1) {
                const edgeA = layerEdges[i];
                const edgeB = layerEdges[j];
                const sourceDiff = edgeA.sourceOrder - edgeB.sourceOrder;
                const targetDiff = edgeA.targetOrder - edgeB.targetOrder;

                if (sourceDiff === 0 || targetDiff === 0) {
                    continue;
                }

                if (sourceDiff * targetDiff < 0) {
                    crossings += edgeA.weight * edgeB.weight;
                }
            }
        }
    });

    return crossings;
};

const buildLayerIndexMap = (layers: string[][]): Map<string, number> => {
    const indexMap = new Map<string, number>();
    layers.forEach((layer) => {
        layer.forEach((nodeId, index) => {
            indexMap.set(nodeId, index);
        });
    });
    return indexMap;
};

const chooseCoordinateLayout = ({
    layers,
    tableMap,
    tables,
    edges,
    liteMode,
    weights,
}: {
    layers: string[][];
    tableMap: Map<string, CrossingAwareLayoutNode>;
    tables: CrossingAwareLayoutNode[];
    edges: CrossingAwareLayoutEdge[];
    liteMode: boolean;
    weights: CrossingAwareLayoutWeights;
}): ComponentLayout => {
    const baseline = assignCoordinatesBaseline(layers, tableMap);
    const laneLayout = assignCoordinatesWithLanes({
        layers,
        tableMap,
        liteMode,
    });

    const baselineCost = calculateLayoutCost({
        layout: baseline,
        tables,
        edges,
        weights,
    });
    const laneCost = calculateLayoutCost({
        layout: laneLayout,
        tables,
        edges,
        weights,
    });

    return laneCost <= baselineCost ? laneLayout : baseline;
};

const assignCoordinatesBaseline = (
    layers: string[][],
    tableMap: Map<string, CrossingAwareLayoutNode>
): ComponentLayout => {
    const layerWidths = layers.map((layer) => {
        return Math.max(
            ...layer.map((nodeId) => tableMap.get(nodeId)?.width ?? 200),
            200
        );
    });

    const layerHeights = layers.map((layer) => {
        if (layer.length === 0) return 0;
        const contentHeight = layer.reduce((acc, nodeId) => {
            return acc + (tableMap.get(nodeId)?.height ?? 120);
        }, 0);
        return contentHeight + (layer.length - 1) * DEFAULT_GAP_Y;
    });

    const maxLayerHeight = Math.max(...layerHeights, 0);

    const layerX: number[] = [];
    let xCursor = 0;
    layerWidths.forEach((width) => {
        layerX.push(xCursor);
        xCursor += width + DEFAULT_GAP_X;
    });

    const positions = new Map<string, NodePosition>();

    layers.forEach((layer, layerIdx) => {
        const totalHeight = layerHeights[layerIdx];
        let yCursor = (maxLayerHeight - totalHeight) / 2;
        const x = layerX[layerIdx];

        layer.forEach((nodeId) => {
            const table = tableMap.get(nodeId);
            if (!table) return;

            positions.set(nodeId, {
                x,
                y: yCursor,
            });

            yCursor += table.height + DEFAULT_GAP_Y;
        });
    });

    const width = layerWidths.length > 0 ? xCursor - DEFAULT_GAP_X : 0;

    return {
        positions,
        width,
        height: maxLayerHeight,
    };
};

const assignCoordinatesWithLanes = ({
    layers,
    tableMap,
    liteMode,
}: {
    layers: string[][];
    tableMap: Map<string, CrossingAwareLayoutNode>;
    liteMode: boolean;
}): ComponentLayout => {
    const maxLaneCount = liteMode ? 3 : 6;
    const layerLayouts = layers.map((layer) =>
        buildLayerLaneLayout({
            layer,
            tableMap,
            maxLaneCount,
        })
    );

    const maxLayerHeight = Math.max(
        ...layerLayouts.map((layout) => layout.height),
        0
    );

    const positions = new Map<string, NodePosition>();
    let xCursor = 0;

    layerLayouts.forEach((layerLayout) => {
        const yOffset = (maxLayerHeight - layerLayout.height) / 2;

        layerLayout.nodes.forEach((node) => {
            positions.set(node.id, {
                x: xCursor + node.x,
                y: yOffset + node.y,
            });
        });

        xCursor += layerLayout.width + DEFAULT_GAP_X;
    });

    return {
        positions,
        width: layerLayouts.length > 0 ? xCursor - DEFAULT_GAP_X : 0,
        height: maxLayerHeight,
    };
};

const buildLayerLaneLayout = ({
    layer,
    tableMap,
    maxLaneCount,
}: {
    layer: string[];
    tableMap: Map<string, CrossingAwareLayoutNode>;
    maxLaneCount: number;
}): {
    width: number;
    height: number;
    nodes: Array<{ id: string; x: number; y: number }>;
} => {
    const nodes = layer
        .map((nodeId, index) => {
            const table = tableMap.get(nodeId);
            if (!table) return null;
            return {
                id: nodeId,
                width: table.width,
                height: table.height,
                originalOrder: index,
            };
        })
        .filter(
            (
                node
            ): node is {
                id: string;
                width: number;
                height: number;
                originalOrder: number;
            } => !!node
        );

    if (nodes.length === 0) {
        return { width: 0, height: 0, nodes: [] };
    }

    const singleLaneHeight =
        nodes.reduce((acc, node) => acc + node.height, 0) +
        (nodes.length - 1) * DEFAULT_GAP_Y;
    const laneCount = Math.max(
        1,
        Math.min(maxLaneCount, Math.ceil(Math.sqrt(nodes.length)))
    );
    const maxLaneHeight = Math.ceil(singleLaneHeight / laneCount);

    const lanes: Array<{
        nodes: typeof nodes;
        height: number;
        width: number;
    }> = Array.from({ length: laneCount }, () => ({
        nodes: [],
        height: 0,
        width: 0,
    }));

    const sortedForPlacement = nodes.slice().sort((a, b) => {
        if (a.height !== b.height) return b.height - a.height;
        return a.originalOrder - b.originalOrder;
    });

    sortedForPlacement.forEach((node) => {
        let selectedLane = -1;
        for (let laneIdx = 0; laneIdx < lanes.length; laneIdx += 1) {
            const lane = lanes[laneIdx];
            const nextHeight =
                lane.height +
                (lane.nodes.length > 0 ? DEFAULT_GAP_Y : 0) +
                node.height;
            if (nextHeight <= maxLaneHeight) {
                selectedLane = laneIdx;
                break;
            }
        }

        if (selectedLane === -1) {
            selectedLane = lanes.reduce((bestIdx, lane, laneIdx) => {
                return lane.height < lanes[bestIdx].height ? laneIdx : bestIdx;
            }, 0);
        }

        const lane = lanes[selectedLane];
        lane.nodes.push(node);
        lane.height +=
            (lane.nodes.length > 1 ? DEFAULT_GAP_Y : 0) + node.height;
        lane.width = Math.max(lane.width, node.width);
    });

    lanes.forEach((lane) => {
        lane.nodes.sort((a, b) => a.originalOrder - b.originalOrder);
    });

    const laneHeights = lanes.map((lane) => {
        if (lane.nodes.length === 0) return 0;
        return (
            lane.nodes.reduce((acc, node) => acc + node.height, 0) +
            (lane.nodes.length - 1) * DEFAULT_GAP_Y
        );
    });

    const maxHeight = Math.max(...laneHeights, 0);

    let laneX = 0;
    const positionedNodes: Array<{ id: string; x: number; y: number }> = [];
    lanes.forEach((lane, laneIdx) => {
        const laneHeight = laneHeights[laneIdx];
        let yCursor = (maxHeight - laneHeight) / 2;
        lane.nodes.forEach((node) => {
            positionedNodes.push({
                id: node.id,
                x: laneX,
                y: yCursor,
            });
            yCursor += node.height + DEFAULT_GAP_Y;
        });
        laneX += lane.width + LANE_GAP_X;
    });

    const width = laneX > 0 ? laneX - LANE_GAP_X : 0;

    return {
        width,
        height: maxHeight,
        nodes: positionedNodes,
    };
};

const calculateLayoutCost = ({
    layout,
    tables,
    edges,
    weights,
}: {
    layout: ComponentLayout;
    tables: CrossingAwareLayoutNode[];
    edges: CrossingAwareLayoutEdge[];
    weights: CrossingAwareLayoutWeights;
}): number => {
    const metrics = collectLayoutMetrics({
        layout,
        tables,
        edges,
    });

    return (
        weights.Wcross * metrics.crossings +
        weights.Wlen * metrics.totalEdgeLength +
        weights.Wspan * metrics.diagramSpan +
        weights.Wmove * metrics.displacement +
        weights.Waspect * metrics.aspectPenalty +
        weights.Wheight * metrics.heightPenalty
    );
};

const collectLayoutMetrics = ({
    layout,
    tables,
    edges,
}: {
    layout: ComponentLayout;
    tables: CrossingAwareLayoutNode[];
    edges: CrossingAwareLayoutEdge[];
}): LayoutMetrics => {
    const tableMap = new Map(tables.map((table) => [table.id, table]));
    const crossings = countEdgeCrossingsFromPositions({
        tables,
        edges,
        positions: layout.positions,
    });

    let totalEdgeLength = 0;
    edges.forEach((edge) => {
        const sourceTable = tableMap.get(edge.sourceId);
        const targetTable = tableMap.get(edge.targetId);
        const sourcePos = layout.positions.get(edge.sourceId);
        const targetPos = layout.positions.get(edge.targetId);
        if (!sourceTable || !targetTable || !sourcePos || !targetPos) return;

        const sourceCenter = centerPoint(sourceTable, sourcePos);
        const targetCenter = centerPoint(targetTable, targetPos);
        totalEdgeLength +=
            (edge.weight ?? 1) *
            (Math.abs(sourceCenter.x - targetCenter.x) +
                Math.abs(sourceCenter.y - targetCenter.y));
    });

    let displacement = 0;
    tables.forEach((table) => {
        const pos = layout.positions.get(table.id);
        if (!pos) return;
        displacement += Math.abs(pos.x - table.x) + Math.abs(pos.y - table.y);
    });

    const width = Math.max(layout.width, 1);
    const height = Math.max(layout.height, 1);
    const diagramSpan = width + height;
    const aspectRatio = width / height;
    const aspectPenalty =
        aspectRatio < TARGET_ASPECT_RATIO
            ? Math.pow(TARGET_ASPECT_RATIO - aspectRatio, 2) * height * 6
            : 0;

    const totalNodeArea = tables.reduce((acc, table) => {
        return acc + table.width * table.height;
    }, 0);
    const targetHeight = Math.max(
        700,
        Math.sqrt(Math.max(totalNodeArea, 1)) * 1.3
    );
    const heightOverflow = Math.max(0, height - targetHeight);
    const heightPenalty =
        (heightOverflow * heightOverflow) / Math.max(targetHeight / 4, 1);

    return {
        crossings,
        totalEdgeLength,
        diagramSpan,
        displacement,
        aspectPenalty,
        heightPenalty,
    };
};

const resolveOverlaps = ({
    positions,
    tablesById,
    blockedAreas,
    bounds,
    maxIterations,
}: {
    positions: Map<string, NodePosition>;
    tablesById: Map<string, CrossingAwareLayoutNode>;
    blockedAreas: Area[];
    bounds?: CrossingAwareLayoutBounds;
    maxIterations: number;
}): Map<string, NodePosition> => {
    const resolved = new Map<string, NodePosition>();

    const orderedTableIds = [...positions.keys()].sort((a, b) => {
        const posA = positions.get(a)!;
        const posB = positions.get(b)!;
        if (posA.x !== posB.x) return posA.x - posB.x;
        if (posA.y !== posB.y) return posA.y - posB.y;
        return a.localeCompare(b);
    });

    orderedTableIds.forEach((tableId) => {
        const table = tablesById.get(tableId);
        const basePosition = positions.get(tableId);
        if (!table || !basePosition) return;

        const finalPosition = findNonOverlappingPosition({
            table,
            basePosition,
            resolved,
            tablesById,
            blockedAreas,
            bounds,
            maxIterations,
        });

        resolved.set(tableId, finalPosition);
    });

    return resolved;
};

const findNonOverlappingPosition = ({
    table,
    basePosition,
    resolved,
    tablesById,
    blockedAreas,
    bounds,
    maxIterations,
}: {
    table: CrossingAwareLayoutNode;
    basePosition: NodePosition;
    resolved: Map<string, NodePosition>;
    tablesById: Map<string, CrossingAwareLayoutNode>;
    blockedAreas: Area[];
    bounds?: CrossingAwareLayoutBounds;
    maxIterations: number;
}): NodePosition => {
    const spiralStep = Math.max(table.width, table.height) / 2;
    let angle = 0;
    let radius = 0;

    for (let iteration = 0; iteration < maxIterations; iteration += 1) {
        const candidate = {
            x: basePosition.x + radius * Math.cos(angle),
            y: basePosition.y + radius * Math.sin(angle),
        };

        const normalizedCandidate = clampToBounds(candidate, table, bounds);

        if (
            !intersectsResolvedTables(
                normalizedCandidate,
                table,
                resolved,
                tablesById
            ) &&
            !intersectsBlockedAreas(normalizedCandidate, table, blockedAreas)
        ) {
            return normalizedCandidate;
        }

        angle += Math.PI / 4;
        if (angle >= Math.PI * 2) {
            angle = 0;
            radius += spiralStep;
        }
    }

    return clampToBounds(basePosition, table, bounds);
};

const clampToBounds = (
    position: NodePosition,
    table: CrossingAwareLayoutNode,
    bounds?: CrossingAwareLayoutBounds
): NodePosition => {
    if (!bounds) {
        return position;
    }

    const minX = bounds.x;
    const minY = bounds.y;
    const maxX = bounds.x + bounds.width - table.width;
    const maxY = bounds.y + bounds.height - table.height;

    return {
        x: Math.max(minX, Math.min(position.x, maxX)),
        y: Math.max(minY, Math.min(position.y, maxY)),
    };
};

const intersectsResolvedTables = (
    candidate: NodePosition,
    table: CrossingAwareLayoutNode,
    resolved: Map<string, NodePosition>,
    tablesById: Map<string, CrossingAwareLayoutNode>
): boolean => {
    const candidateRect = {
        x: candidate.x,
        y: candidate.y,
        width: table.width,
        height: table.height,
    };

    for (const [tableId, position] of resolved) {
        const existing = tablesById.get(tableId);
        if (!existing) continue;

        const existingRect = {
            x: position.x,
            y: position.y,
            width: existing.width,
            height: existing.height,
        };

        if (rectanglesIntersect(candidateRect, existingRect, 40)) {
            return true;
        }
    }

    return false;
};

const intersectsBlockedAreas = (
    candidate: NodePosition,
    table: CrossingAwareLayoutNode,
    blockedAreas: Area[]
): boolean => {
    if (blockedAreas.length === 0) {
        return false;
    }

    const candidateRect = {
        x: candidate.x,
        y: candidate.y,
        width: table.width,
        height: table.height,
    };

    return blockedAreas.some((area) => {
        const areaRect = {
            x: area.x,
            y: area.y,
            width: area.width,
            height: area.height,
        };

        return rectanglesIntersect(candidateRect, areaRect, 50);
    });
};

const rectanglesIntersect = (
    a: { x: number; y: number; width: number; height: number },
    b: { x: number; y: number; width: number; height: number },
    padding = 0
): boolean => {
    return !(
        a.x + a.width < b.x - padding ||
        a.x > b.x + b.width + padding ||
        a.y + a.height < b.y - padding ||
        a.y > b.y + b.height + padding
    );
};

const centerPoint = (
    table: CrossingAwareLayoutNode,
    position: NodePosition
): NodePosition => {
    return {
        x: position.x + table.width / 2,
        y: position.y + table.height / 2,
    };
};

const segmentsIntersect = (
    a1: NodePosition,
    a2: NodePosition,
    b1: NodePosition,
    b2: NodePosition
): boolean => {
    const orientation = (p: NodePosition, q: NodePosition, r: NodePosition) => {
        const value = (q.y - p.y) * (r.x - q.x) - (q.x - p.x) * (r.y - q.y);
        if (Math.abs(value) < 0.000001) return 0;
        return value > 0 ? 1 : 2;
    };

    const onSegment = (p: NodePosition, q: NodePosition, r: NodePosition) => {
        return (
            q.x <= Math.max(p.x, r.x) &&
            q.x >= Math.min(p.x, r.x) &&
            q.y <= Math.max(p.y, r.y) &&
            q.y >= Math.min(p.y, r.y)
        );
    };

    const o1 = orientation(a1, a2, b1);
    const o2 = orientation(a1, a2, b2);
    const o3 = orientation(b1, b2, a1);
    const o4 = orientation(b1, b2, a2);

    if (o1 !== o2 && o3 !== o4) {
        return true;
    }

    if (o1 === 0 && onSegment(a1, b1, a2)) return true;
    if (o2 === 0 && onSegment(a1, b2, a2)) return true;
    if (o3 === 0 && onSegment(b1, a1, b2)) return true;
    if (o4 === 0 && onSegment(b1, a2, b2)) return true;

    return false;
};
