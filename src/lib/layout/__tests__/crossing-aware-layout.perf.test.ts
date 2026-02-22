import { describe, expect, it } from 'vitest';
import {
    createCrossingAwareLayout,
    type CrossingAwareLayoutEdge,
    type CrossingAwareLayoutNode,
} from '@/lib/layout/crossing-aware-layout';

const createNodes = (count: number): CrossingAwareLayoutNode[] => {
    return Array.from({ length: count }, (_, index) => ({
        id: `t${index}`,
        x: (index % 20) * 260,
        y: Math.floor(index / 20) * 180,
        width: 200,
        height: 120,
    }));
};

const createEdges = (count: number): CrossingAwareLayoutEdge[] => {
    const edges: CrossingAwareLayoutEdge[] = [];
    for (let i = 0; i < count * 2; i += 1) {
        const source = `t${i % count}`;
        const target = `t${(i * 7 + 11) % count}`;
        if (source === target) continue;

        edges.push({
            id: `e${i}`,
            sourceId: source,
            targetId: target,
        });
    }
    return edges;
};

describe('crossing-aware-layout performance smoke', () => {
    it('stays responsive for 50 tables', () => {
        const tables = createNodes(50);
        const edges = createEdges(50);

        const start = performance.now();
        createCrossingAwareLayout({ tables, edges, mode: 'all' });
        const duration = performance.now() - start;

        expect(duration).toBeLessThan(345);
    });

    it('stays responsive for 100 tables', () => {
        const tables = createNodes(100);
        const edges = createEdges(100);

        const start = performance.now();
        createCrossingAwareLayout({ tables, edges, mode: 'all' });
        const duration = performance.now() - start;

        expect(duration).toBeLessThan(805);
    });

    it('uses lite mode for 200 tables and remains responsive', () => {
        const tables = createNodes(200);
        const edges = createEdges(200);

        const start = performance.now();
        createCrossingAwareLayout({ tables, edges, mode: 'all' });
        const duration = performance.now() - start;

        expect(duration).toBeLessThan(1380);
    });
});
