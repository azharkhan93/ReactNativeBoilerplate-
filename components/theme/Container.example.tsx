/**
 * Container Component Usage Examples
 * 
 * This file demonstrates how to use the Container component with different variants
 */

import React from 'react';
import { Container, Typography } from './index';

export function ContainerExamples() {
  return (
    <>
      {/* Column with items-center */}
      <Container variant="column-centered" gap={5}>
        <Typography variant="h3">Column Centered</Typography>
        <Typography variant="body">Item 1</Typography>
        <Typography variant="body">Item 2</Typography>
        <Typography variant="body">Item 3</Typography>
      </Container>

      {/* Column (vertical) layout */}
      <Container variant="column" gap={4}>
        <Typography variant="h2">Column Layout</Typography>
        <Typography variant="body">Stacked items vertically</Typography>
      </Container>

      {/* Row with gap and wrap */}
      <Container variant="row" gap={5} wrap>
        <Typography variant="body">Item 1</Typography>
        <Typography variant="body">Item 2</Typography>
        <Typography variant="body">Item 3</Typography>
        <Typography variant="body">Item 4</Typography>
      </Container>

      {/* Row with items centered */}
      <Container variant="centered" gap={3}>
        <Typography variant="body">Centered</Typography>
        <Typography variant="body">Items</Typography>
      </Container>

      {/* Row with space between */}
      <Container variant="between">
        <Typography variant="body">Left</Typography>
        <Typography variant="body">Right</Typography>
      </Container>

      {/* Custom combination using className */}
      <Container 
        variant="column" 
        className="items-center justify-center gap-5 p-4"
      >
        <Typography variant="h3">Custom Styling</Typography>
        <Typography variant="body">With additional classes</Typography>
      </Container>

      {/* Column with items-center and gap (most common use case) */}
      <Container variant="column-centered" gap={5} className="p-4">
        <Typography variant="h1">Main Title</Typography>
        <Typography variant="subheading">Subtitle</Typography>
        <Typography variant="body">Description text here</Typography>
      </Container>
    </>
  );
}

/**
 * Common Usage Patterns:
 * 
 * 1. Column with items centered:
 *    <Container variant="column-centered" gap={5}>
 *      {children}
 *    </Container>
 * 
 * 2. Column (vertical stack):
 *    <Container variant="column" gap={4}>
 *      {children}
 *    </Container>
 * 
 * 3. Row with wrapping:
 *    <Container variant="row" gap={5} wrap>
 *      {children}
 *    </Container>
 * 
 * 4. Row with space between:
 *    <Container variant="between">
 *      <LeftContent />
 *      <RightContent />
 *    </Container>
 * 
 * 5. Custom styling:
 *    <Container variant="column-centered" gap={5} className="p-4 bg-gray-100">
 *      {children}
 *    </Container>
 */

