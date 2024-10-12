export interface hexdata {
    data: any,
    grid: { row: number, col: number }
}

export const viewportAdj: number = 4;

export const yAdj: number = 100.8;
export const xJump: number = 176;
export const yJump: number = 203;

export function getWidth(col:number){
    return col * xJump;
}

export function getHeight(row:number){
    return row * yJump;
}

export const buffer: number = 230;
export const hiveAdj: number = 1;