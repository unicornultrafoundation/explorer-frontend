import type { CSSProperties } from 'react';

export const style: CSSProperties = {
  width: '100%',
  height: 'calc(100vh - 250px)',
  outline: '1px dashed lightpink',
};

export const stylesheet: Array<cytoscape.Stylesheet> = [
  // NODES
  {
    selector: 'node[label]',
    style: {
      label: 'data(label)',
      'text-wrap': 'wrap',
      'text-max-width': '130px',
      'text-overflow-wrap': 'whitespace',
    },
  },
  {
    selector: 'node.address',
    style: {
      shape: 'round-rectangle',
      'text-valign': 'center',
      'text-halign': 'center',
      width: '150px',
      height: '50px',
      'background-color': 'papayawhip',
      'border-color': 'navy',
      'border-width': '3px',
    },
  },

  {
    selector: 'node.contract',
    style: {
      shape: 'cut-rectangle',
      'background-color': 'lightcyan',
      'border-color': 'darkturquoise',
    },
  },

  {
    selector: 'node.token',
    style: {
      shape: 'hexagon',
      'background-color': 'coral',
      'border-color': 'crimson',
    },
  },

  {
    selector: 'node.virtual',
    style: {
      shape: 'rectangle',
      'background-color': 'cornsilk',
      'border-color': 'darkmagenta',
      'border-style': 'dashed',
    },
  },

  {
    selector: 'node.nft',
    style: {
      shape: 'octagon',
      'background-color': 'lightpink',
      'border-color': 'fuchsia',
    },
  },

  // EDGES
  {
    selector: 'edge',
    style: {
      color: 'steelblue',
      'line-color': 'steelblue',
      'source-arrow-color': 'steelblue',
      'target-arrow-color': 'steelblue',
    },
  },
  {
    selector: 'edge[label]',
    style: {
      width: 2,
      label: 'data(label)',
      'target-arrow-shape': 'vee',
      'text-wrap': 'wrap',
      'text-max-width': '100px',
      'text-overflow-wrap': 'whitespace',
      'text-background-opacity': 0.9,
      color: '#000',
      'text-background-color': '#FFF',
      'text-background-shape': 'roundrectangle',
      'text-border-color': 'lightgray',
      'text-border-width': 1,
      'text-border-opacity': 1,
      'text-border-style': 'dotted',
      'text-background-padding': '4px',
    },
  },

  // EDGE LINES
  {
    selector: 'edge.bezier',
    style: {
      'curve-style': 'bezier',
      'control-point-step-size': 100,
      'control-point-distance': 50,
    },
  },
  {
    selector: 'edge.segments',
    style: {
      'curve-style': 'segments',
      'segment-distances': '-20 20 -20',
      'segment-weights': '0.1 0.5 0.9',
    },
  },
  {
    selector: 'edge.straight',
    style: {
      'curve-style': 'straight',
    },
  },
  {
    selector: 'edge.tech',
    style: {
      'line-color': 'darkgray',
      'line-style': 'dashed',
    },
  },

  // AREAS
  {
    selector: 'node.uniswap',
    style: {
      'background-color': 'honeydew',
      'border-color': 'honeydew',
      'font-size': '20px',
      'font-weight': 'bold',
    },
  },
];
