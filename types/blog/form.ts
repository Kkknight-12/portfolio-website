export enum CodeDisplayType {
  SIMPLE = 'simple',
  SANDBOX = 'sandbox',
}

// -----------------------------------------------------------------------------

import { CodeBlockData, SandboxCodeData, SimpleCodeData } from './content';

// Type guard
/**
 * Type guard to check if a code block is a simple code block
 * This ensures type safety and proper property access
 *
 * @param block - The code block to check
 * @returns True if the block is a simple code block, with TypeScript type inference
 */
export function isSimpleCodeBlock(
  block: CodeBlockData
): block is SimpleCodeData {
  return block.displayType === CodeDisplayType.SIMPLE;
}

/**
 * Type guard to check if a code block is a sandbox code block
 * This enables safe access to sandbox-specific properties
 *
 * @param block - The code block to check
 * @returns True if the block is a sandbox block, with TypeScript type inference
 */
export function isSandboxCodeBlock(
  blockData: CodeBlockData
): blockData is SandboxCodeData {
  return blockData.displayType === CodeDisplayType.SANDBOX;
}
