export interface pos {
    x1: number,
    x2: number,
    y1: number,
    y2: number
}

export interface hexdata {
    data: any,
    pos: pos,
    grid: { row: number, col: number }
}

export const buffer: number = 0;

export const yAdj: number = 100.8;

export const xJump: number = 176;
export const yJump: number = 203;
