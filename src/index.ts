export interface hexdata {
    post: any,
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

export const buffer: number = 140;
export const hiveAdj: number = 1;