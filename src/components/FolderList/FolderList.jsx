import { useState } from 'react';

export function node(value, parent = null) {
  return { value, parent };
}
