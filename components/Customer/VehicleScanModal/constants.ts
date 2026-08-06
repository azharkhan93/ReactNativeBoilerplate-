export const SCAN_STEP_GUIDANCE: Record<
  string,
  { readonly title: string; readonly subtitle: string }
> = {
  hood: {
    title: 'Step 1: Front Hood & Paint',
    subtitle: 'Align vehicle hood inside target box to scan for swirl marks',
  },
  side: {
    title: 'Step 2: Side Door Panels',
    subtitle: 'Align side body panels to inspect water spots & scratches',
  },
  wheels: {
    title: 'Step 3: Wheels & Rims',
    subtitle: 'Center front wheel inside target box to check brake dust',
  },
  analyzing: {
    title: 'AI Inspection in Progress',
    subtitle: 'Processing YOLO object detection & Gemini Vision paint analysis...',
  },
} as const;
