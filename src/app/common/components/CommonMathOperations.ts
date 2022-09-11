import {Vector2, Vector3} from "three";

export const RADIAN_MULTIPLIER = Math.PI / 180.0;
export const HOLE_OFFSET_FIX = 0.0001;

const TOLERANCE = 1e-4;

export class CommonMathOperations {

    public static areVectors2Equal(v1: Vector2, v2: Vector2): boolean {
        return (CommonMathOperations.areNumbersEqual(v1.x, v2.x) && CommonMathOperations.areNumbersEqual(v1.y, v2.y));
    }

    public static areVectors3Equal(v1: Vector3, v2: Vector3): boolean {
        return (
            CommonMathOperations.areNumbersEqual(v1.x, v2.x) &&
            CommonMathOperations.areNumbersEqual(v1.y, v2.y) &&
            CommonMathOperations.areNumbersEqual(v1.z, v2.z)
        );
    }

    public static areNumbersEqual(n1: number, n2: number): boolean {
        return Math.abs( n1 - n2) < TOLERANCE;
    }
}
